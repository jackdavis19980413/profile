<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResumeResource extends JsonResource
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
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'subtitle' => $this->subtitle,
            'picture' => !(str_starts_with($this->picture, 'http')) ? 
                url($this->picture) : $this->picture,
            'cv_file' => !(str_starts_with($this->cv_file, 'http')) ? 
                url($this->cv_file) : $this->cv_file,
            'caption' => $this->caption,
            'author' => $this->author,
        ];
    }
}
