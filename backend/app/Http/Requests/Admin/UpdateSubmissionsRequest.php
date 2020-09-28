<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSubmissionsRequest extends FormRequest
{
     /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'=> 'required',
        	'last_name'=> 'required',
        	'email'=> 'required|email|',
        	'institution'=> 'required',
        	'department'=> 'required'
        ];
    }
    
   
    /**
     * Get the error messages that apply to the request parameters.
     *
     * @return array
     */
    public function messages()
    {
    	return [
    			'first_name.required' => 'First name field is required',
    			'last_name.required' => 'Last name field is required',
    			'email.required' => 'Email field is required',
    			'institution.required' => 'Institution field is required',
    			'department.required' => 'Departament field is required',
    	];
    }
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
    	$errors = (new ValidationException($validator))->errors();
    	throw new HttpResponseException(response()->json(['errors' => $errors
    	], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}
