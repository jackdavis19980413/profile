<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'we_date' => $this->we_date,
            'alt' => $this->alt,
            'src' => !(str_starts_with($this->src, 'http')) ? 
                url($this->src) : $this->src,
            'position' => $this->position,
            'category' => $this->category,
        ];
    }
}
