<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiExperienceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'position' => $this->position === 0 ? "left" : "right", 
            'we_date' => $this->we_date,
            'alt' => $this->alt,
            'src' => !(str_starts_with($this->src, 'http')) ? 
                url($this->src) : $this->src,
            'c_title' => $this->title,
            'c_subtitle' => $this->subtitle
        ];
    }
}
