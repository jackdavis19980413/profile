<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ResumeRequest extends FormRequest
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
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'picture' => ['image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
            'cv_file' => ['file','mimes:pdf','max:2048'],
            'subtitle' => ['required', 'string', 'max:255'],
            'caption' => ['string', 'max:255'],
            'author' => ['string', 'max:255'],
        ];
    }

}
