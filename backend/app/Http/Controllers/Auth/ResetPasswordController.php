<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }
    
    public function changePassword(Request $request)
    {
    	 
    	$user = Auth::getUser();
    	$this->validator($request->all())->validate();
    	if (Hash::check($request->get('current_password'), $user->password)) {
    		$user->password = $request->get('new_password');
    		$user->save();
    		return redirect($this->redirectTo)->with('success', 'A senha foi alterada com sucesso!');
    	} else {
    		 
    		 
    		//return redirect()->back()->withInput()->withErrors(['SenhaAtual', utf8_encode('A senha atual está incorreta')]);
    		return redirect()->back()->withErrors('A senha atual está incorreta');
    	}
    }
    
    /**
     * Get a validator for an incoming change password request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
    	return Validator::make($data, [
    			'current_password' => 'required|min:6',
    			'new_password' => 'required|min:6|confirmed',
    	]);
    }
}
