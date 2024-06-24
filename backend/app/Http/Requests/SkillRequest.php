<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
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
            'index' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'alt' => ['required', 'string', 'max:255'],
            'image' => ['image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
        ];
    }
}