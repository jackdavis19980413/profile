<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::query()->get();
        $projects = ProjectResource::collection($projects);

        return inertia("Project/Index", [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;

        if ($image) {
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        Project::create($data);

        return to_route('project.index')
            ->with('success', 'New Project information successfully added.');
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
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;

        if ($image) {
            $this->deleteFile($project->src);
            $fileName = $image->getClientOriginalName();
            $image->move(public_path('assets/img'), $fileName);
            $data['src'] = 'assets/img/' . $fileName;
        }
        $project->update($data);

        return to_route('project.index')
            ->with('success', 'Project information successfully updated.');
    }

    private function deleteFile(string $path) {
        if (file_exists($path)) {
            unlink($path);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if (!empty($project->src) && trim($project->src) !== '') {
            $this->deleteFile($project->src);
        }

        $project->delete();

        return to_route('project.index')
            ->with('success', 'Project information successfully removed.');
    }
}
