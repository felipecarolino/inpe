<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
        	'username' => 'required|min:3|unique:users,username,'.$this->route('user'),
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$this->route('user'), 		
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id,deleted_at,NULL'
          
        ];
    }
    
    public function messages()
    {
    	return [
    			/*'username.required' => 'The username field is required',
    			'username.unique' => 'The username has already been taken',
    			'name.required' => 'Name field is required',
    			'password.required' => 'The password field is required',
    			//'password.min' => 'The password must be at least 6.',
    			'role_id.required' => 'The role field is required',
    			'email.required' => 'The email field is required',
    			'email.unique' => 'The email has already been taken',
    			'email.email' => 'The field must be a valid email address.',*/
    			
    	];
    }
    
    protected function failedValidation(Validator $validator)
    {
    	$errors = (new ValidationException($validator))->errors();
    	throw new HttpResponseException(response()->json(['errors' => $errors
    	], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}
