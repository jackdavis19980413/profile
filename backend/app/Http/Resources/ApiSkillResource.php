<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiSkillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $arr = [];
        foreach ($this->items as $one) {
            array_push($arr, $one->description);
        }
        
        return [
            'id' => $this->index,
            'title' => $this->title,
            'alt' => $this->alt,
            'src' => !(str_starts_with($this->src, 'http')) ? 
                url($this->src) : $this->src,
            'item' => $arr
        ];
    }
}
