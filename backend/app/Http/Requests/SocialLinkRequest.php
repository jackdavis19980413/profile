<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'alt' => ['required', 'string', 'max:255'],
            'href' => ['required', 'string', 'lowercase', 'url', 'max:255'],
            'image' => ['required_with:image2', 'image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
            'image2' => ['required_with:image', 'image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
        ];
    }
}
