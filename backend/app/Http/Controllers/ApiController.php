<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\PersonalProfile;
use App\Models\Socials;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\Project;

use App\Http\Resources\ResumeResource;

use App\Http\Resources\ApiSocialLinkResource;
use App\Http\Resources\ApiSkillResource;
use App\Http\Resources\ApiExperienceResource;
use App\Http\Resources\ApiProjectResource;

use Illuminate\Support\Facades\Storage;

class ApiController extends Controller
{
    public function getNavInformation() 
    {
        $resume = new ResumeResource(PersonalProfile::first());
        $socials = ApiSocialLinkResource::collection(Socials::query()->get());

        $arr = [
            "name"=> "$resume->firstname $resume->lastname",
            "picture"=> !(str_starts_with($resume->picture, 'http')) ? url($resume->picture) : $resume->picture,
            "citation"=> [
                "caption"=> $resume->caption,
                "author"=> $resume->author
            ],
            "socials" => $socials
        ];

        return json_encode($arr);
    }

    public function getContentInformation()
    {
        $resume = new ResumeResource(PersonalProfile::first());
        $skills = ApiSkillResource::collection(Skill::query()->get());
        $experiences = ApiExperienceResource::collection(Experience::query()->where("category", 0)->get());
        $educations = ApiExperienceResource::collection(Experience::query()->where("category", 1)->get());
        $projects = ApiProjectResource::collection(Project::query()->get());

        $arr = [
            "sections"=>[
                [
                    "section"=>[
                        "id"=>"about_me",
                        "firstname"=>strtoupper($resume->firstname),
                        "lastname"=>strtoupper($resume->lastname),
                        "src"=>"assets/img/console.png",
                        "typedtext"=>[]
                    ]
                ],
                [
                    "section"=>[
                        "id"=>"my_skills",
                        "title"=>"MY SKILLS",
                        "cards"=> $skills
                    ]
                ],
                [
                    "section"=>[
                        "id"=>"work_experience",
                        "title"=>"WORK EXPERIENCE",
                        "containers"=> $experiences
                    ]
                ],
                [
                    "section"=> [
                        "id"=> "education",
                        "title"=> "EDUCATION",
                        "containers"=> $educations
                    ]
                ],
                [
                    "section"=>[
                        "id"=>"projects",
                        "title"=>"PROJECTS",
                        "projects"=> $projects
                    ]
                ]
            ]
        ];
        Storage::disk('public')->put("aaaa.txt", json_encode($arr));

        return json_encode($arr);
    }

    public function getPageInformation() 
    {
        $resume = new ResumeResource(PersonalProfile::first());

        $arr = [
            "navbtns"=>[
                [
                    "id"=>"btn_aboutme",
                    "label"=>"ABOUT ME",
                    "selector"=>"#about_me"
                ],
                [
                    "id"=>"btn_myskills",
                    "label"=>"MY SKILLS",
                    "selector"=>"#my_skills"
                ],
                [
                    "id"=>"btn_work",
                    "label"=>"WORK EXPERIENCE",
                    "selector"=>"#work_experience"
                ],
                [
                    "id"=>"btn_education",
                    "label"=>"EDUCATION",
                    "selector"=>"#education"
                ],
                [
                    "id"=>"btn_projects",
                    "label"=>"PROJECTS",
                    "selector"=>"#projects"
                ]
            ],
            "navbottombtns"=>[
                [
                    "id"=>"btn_contactme",
                    "href"=>"mailto:$resume->email",
                    "label"=>"CONTACT ME"
                ],
                [
                    "id"=>"btn_viewresume",
                    "href"=>!(str_starts_with($resume->cv_file, 'http')) ? url($resume->cv_file) : $resume->cv_file,
                    "label"=>"GET MY CV"
                ]
            ]
        ];
        return json_encode($arr);
    }
}
