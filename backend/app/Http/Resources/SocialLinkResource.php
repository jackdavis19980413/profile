<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocialLinkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $extension = pathinfo($this->src, PATHINFO_EXTENSION);
        $fileName2 = pathinfo($this->src, PATHINFO_DIRNAME) . '/' . pathinfo($this->src, PATHINFO_FILENAME). '_selected.' . $extension;

        return [
            'id' => $this->id,
            'alt' => $this->alt,
            'href' => $this->href,
            'src' => !(str_starts_with($this->src, 'http')) ? 
                url($this->src) : $this->src,
            'src2' => !(str_starts_with($fileName2, 'http')) ? 
                url($fileName2) : $fileName2,
        ];
    }
}
