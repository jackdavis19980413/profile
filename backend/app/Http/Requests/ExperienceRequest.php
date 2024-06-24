<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string', 'max:255'],
            'we_date' => ['required', 'string', 'max:255'],
            'position' => ['required', 'integer'],
            'alt' => ['string', 'max:255'],
            'category' => ['required', 'boolean'],
            'image' => ['image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
        ];
    }
}
