<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PersonalProfile;
use App\Models\Socials;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Project;

use App\Http\Resources\ResumeResource;
use App\Http\Resources\SocialLinkResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\ExperienceResource;
use App\Http\Resources\ProjectResource;

class DashboardController extends Controller
{
    public function index()
    {
        $personal = PersonalProfile::first();
        $resume = new ResumeResource($personal);

        $socials = Socials::query()->get();
        $socials = SocialLinkResource::collection($socials);

        $skills = Skill::query()->get();
        $skills = SkillResource::collection($skills);

        $exps = Experience::query()->get();
        $exps = ExperienceResource::collection($exps);

        $projects = Project::query()->get();
        $projects = ProjectResource::collection($projects);

        return inertia("Dashboard", [
            'resume' => $resume,
            'socials' => $socials,
            'skills' => $skills,
            'exps' => $exps,
            'projects' => $projects,
        ]);
    }
}
