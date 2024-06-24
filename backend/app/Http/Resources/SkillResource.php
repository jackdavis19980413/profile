<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillResource extends JsonResource
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
            'index' => $this->index,
            'title' => $this->title,
            'alt' => $this->alt,
            'src' => !(str_starts_with($this->src, 'http')) ? 
                url($this->src) : $this->src,
        ];
    }
}
