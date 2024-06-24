<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Experience::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }
        if (request("category")) {
            $query->where("category", request("category"));
        }

        $exps = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Experience/Index", [
            'exps' => ExperienceResource::collection($exps),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Experience/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExperienceRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;

        if ($image) {
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        Experience::create($data);

        return to_route('experience.index')
            ->with('success', 'New Experience information successfully added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Experience $experience)
    {
        return inertia('Experience/Edit', [
            'experience' => new ExperienceResource($experience),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExperienceRequest $request, Experience $experience)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        if ($image) {
            $this->deleteFile($experience->src);
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        $experience->update($data);

        return to_route('experience.index')
            ->with('success', 'Experience information successfully updated.');
    }

    private function deleteFile(string $path) {
        if (file_exists($path)) {
            unlink($path);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Experience $experience)
    {
        if (!empty($experience->src) && trim($experience->src) !== '') {
            $this->deleteFile($experience->src);
        }

        $experience->delete();

        return to_route('experience.index')
            ->with('success', 'Experience information successfully removed.');
    }
}
