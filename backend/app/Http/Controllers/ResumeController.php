<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PersonalProfile;
use App\Http\Resources\ResumeResource;
use App\Http\Requests\ResumeRequest;
use App\Http\Requests\SocialLinkRequest;
use App\Http\Resources\SocialLinkResource;
use App\Models\Socials;

use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personal = PersonalProfile::first();

        $socialLinks = Socials::query()->get();
        $socialLinks = SocialLinkResource::collection($socialLinks);

        return inertia("Resume/Index", [
            'resume' => new ResumeResource($personal),
            'socials' => $socialLinks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Resume/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SocialLinkRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $image2 = $data['image2'] ?? null;

        if ($image && $image2) {
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
            
            $image2->move(public_path('assets/img'), $this->getFileName2($fileName));
        }
        // Storage::disk('public')->put("aaaa.txt", json_encode($data));
        Socials::create($data);

        return to_route('resume.index')
            ->with('success', 'Basic information successfully updated.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Socials $social)
    {
        $social = Socials::query('id', $social)->first();
        return inertia('Resume/Edit', [
            'social' => new SocialLinkResource($social),
        ]);
    }

    // personal base resume
    public function editpage() {
        $personal = PersonalProfile::first();

        return inertia("Resume/Basic", [
            'resume' => new ResumeResource($personal)
        ]);
    }

    public function change(ResumeRequest $request, PersonalProfile $profile)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['picture'] ?? null;
        if ($image) {
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['picture'] = 'assets/img/' . $fileName;
        }
        $cvfile = $data['cv_file'] ?? null;
        if ($cvfile) {
            $cvFileName = $cvfile->getClientOriginalName();
            $cvfile->move(public_path('assets/img'), $cvFileName);
            $data['cv_file'] = 'assets/img/' . $cvFileName;
        }
        $profile->update($data);

        return to_route('resume.index')
            ->with('success', 'Basic information successfully updated.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function socialUpdate(SocialLinkRequest $request, Socials $social)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $image2 = $data['image2'] ?? null;

        if ($image && $image2) {
            $this->deleteFile($social->src);
            $this->deleteFile(public_path('assets/img') . '/' . $this->getFileName2($social->src));

            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
            
            $image2->move(public_path('assets/img'), $this->getFileName2($fileName));
        }

        $social->update($data);

        return to_route('resume.index')
            ->with('success', 'Social link information successfully updated.');
    }

    private function getFileName2(string $filename) {
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $fileName2 = pathinfo($filename, PATHINFO_FILENAME) . '_selected.' . $extension;
        return $fileName2;
    }

    private function deleteFile(string $path) {
        if (file_exists($path)) {
            unlink($path);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function socialDelete(Socials $social)
    {
        if (!empty($social->src) && trim($social->src) !== '') {
            $this->deleteFile($social->src);
            $this->deleteFile(public_path('assets/img') . '/' . $this->getFileName2($social->src));
        }

        $social->delete();

        return to_route('resume.index')
            ->with('success', 'Social link information successfully removed.');
    }
}
