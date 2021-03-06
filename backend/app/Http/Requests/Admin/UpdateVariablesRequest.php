<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateVariablesRequest extends FormRequest
{
     /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3|unique:variables,name,'.$this->id,
           	'ra' => 'required',
        	'dec' => 'required',
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
    			'name' => 'Name field is required',
    			'ra.required' => 'RA field is required',
    			'dec.required' => 'RA field is required',
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
