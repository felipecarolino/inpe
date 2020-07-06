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
            'Name_RK' => 'required',
        	'RAJ2000_RK' => 'required',
        	'DEJ2000_RK' => 'required',
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
    			'Name_RK' => 'required|unique:variables,Name_RK,'.$this->id,
    			'RAJ2000_RK.required' => 'RA field is required',
    			'DEJ2000_RK.required' => 'RA field is required',
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
