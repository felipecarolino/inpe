<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\StoreUsersRequest;
use App\Http\Requests\Admin\UpdateUsersRequest;

use JWTAuth;
use JWTAuthException;

class UsersController extends ApiController
{
    
    
    public function index()
    {
        /*if (! Gate::allows('user_access')) {
            return abort(401);
        }*/

    	$count = 5;
    	
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	 
        $users = User::with('role')->paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
    	return response($users, 200);
    }

  
   
   
    public function create(StoreUsersRequest $request)
    {
           	
    	try{
    		
    		$user = User::create($request->all());
    		
    		$result['data'] = $user->toArray();
    		$result['status'] = true;
    	
    	}catch(\Exception $e){
    		$result['status'] = false;
    		$result['message'] = 'Operation failed due to '. $e->getMessage();
    	}
    	
    	if($result['status']){
    		return $this->success($result['data']);
    	}else{
    		return $this->fail($result['message']);
    	}
    	
    	
    }


    
    public function update(UpdateUsersRequest $request,$id)
    {
        /*if (! Gate::allows('user_edit')) {
            return abort(401);
        }*/
        
    	
    	try{
    	
    		$user = User::findOrFail($id);
    		$user->update($request->all());
    	
    		$result['data'] = $user->toArray();
    		$result['status'] = true;
    		 
    	}catch(\Exception $e){
    		$result['status'] = false;
    		$result['message'] = 'Operation failed due to '. $e->getMessage();
    	}
    	 
    	if($result['status']){
    		return $this->success($result['data']);
    	}else{
    		return $this->fail($result['message']);
    	}
    	
    }


    /**
     * Display Role.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        /*if (! Gate::allows('user_view')) {
            return abort(401);
        }*/
    	
    	
    	try{
    		 
    		$user = User::findOrFail($id);
    		    		 
    		$result['data'] = $user->toArray();
    		$result['status'] = true;
    		 
    	}catch(\Exception $e){
    		$result['status'] = false;
    		
    		if (str_contains($e->getMessage(),'No query results')>0){
    			$result['message'] = 'The selected user id is invalid.';
    		}
    		else{
    			$result['message'] = 'Operation failed due to '. $e->getMessage();
    		}
    		
    	}
    	
    	if($result['status']){
    		return $this->success($result['data']);
    	}else{
    		return $this->fail($result['message']);
    	}
    	
    	
    	
    	
    }


   
    public function destroy($id)
    {
        /*if (! Gate::allows('user_delete')) {
            return abort(401);
        }*/
       

        try{
        	 
        	 $user = User::findOrFail($id);
        	 
        	 $user->deleted_at = date('Y-m-d H:m:s');
        	 $user->email = $user->email."_".date('Y-m-d H:m:s');
        	 $user->username = $user->username."_".date('Y-m-d H:m:s');
        	 $user->update();
        	 
        	 $result['data'] = $user->toArray();
        	 $result['status'] = true;
        	 
        }catch(\Exception $e){
        	$result['status'] = false;
        	
        	
        	if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected user id is invalid.';
        	}
        	
        	else{
        	
        		$result['message'] = 'Operation failed due to '. $e->getMessage();
        	}
        }
         
        if($result['status']){
        	return $this->success($result['data']);
        }else{
        	return $this->fail($result['message']);
        }
       
    }

    
    private function getToken($email, $password)
    {
    	$token = null;
    	//$credentials = $request->only('email', 'password');
    	try {
    		if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
    			return response()->json([
    					'response' => 'error',
    					'message' => 'Password or email is invalid',
    					'token'=>$token
    			]);
    		}
    	} catch (JWTAuthException $e) {
    		return response()->json([
    				'response' => 'error',
    				'message' => 'Token creation failed',
    		]);
    	}
    	return $token;
    }
    public function login(Request $request)
    {
    	$user = \App\User::where('email', $request->email)->get()->first();
    	if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
    	{
    		$token = self::getToken($request->email, $request->password);
    		$user->auth_token = $token;
    		$user->save();
    		$response = ['success'=>true,'message'=>'Ok', 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];
    	}
    	else
    		$response = ['success'=>false,'data'=>[], 'message'=>'Login Failed! Invalid e-mail or password','fields'=>$request->email." ".$request->password];
    
    
    	return response()->json($response, 201);
    }
    
    public function resetPassword(Request $request){
    	
    	if ($request->get('username')==null){
    		 
    		$result['status'] = false;
    		$result['message'] = 'The username field is required';
    		return $this->fail($result['message']);
    		 
    		 
    	}
    	if ($request->get('username')!=null){
    	
    		$user = User::where("username",'=',$request->username)->first();
    	
    		if (!$user){
    			 
    			
    			$result['status'] = false;
    			$result['message'] = 'The username was not found!';
    			return $this->fail($result['message']);
    		}
    		 
    	}
    	
    	
    	 
    	 
    	if ($request->get('new_password')==null){
    	
    		$result['status'] = false;
    		$result['message'] = 'The new password field is required!';
    		return $this->fail($result['message']);
    	
    	
    	}
    	
    	if (strlen($request->get('new_password'))<6){
    	
    		$result['status'] = false;
    		$result['message'] = 'Password length must be greater than 6 characters!';
    		return $this->fail($result['message']);
    		 
    		
    	
    	}
    	
    	if ($request->get('confirm_password')==null){
    	
    		$result['status'] = false;
    		$result['message'] = 'The confirm password field is required!';
    		return $this->fail($result['message']);
    	
    	}
    	
    	$newc = $request->get('confirm_password');
    	
    	if ($newc!=$request->get('new_password')){
    	
    		$result['status'] = false;
    		$result['message'] = 'New password and confirm password did not match!!';
    		return $this->fail($result['message']);
    		
    	
    	}
    	    	
    	$user_email = User::where('username','=',$request->get('username'))->get();
    	     
    	$user = User::find($user_email[0]->id);
    	
    	$user->password = $request->get('new_password');
    		     		 
    	$user->save();
    		 
    	if ($user){ 
	    		$result['status'] = true;
	    		$result['message'] = 'Password changed Successfully!';
	    		return $this->success($result['message']);
    		}
    	else{
    			
    			$result['status'] = true;
    			$result['message'] = 'Error to change password';
    			return $this->success($result['message']);
    	}
    	
    	
    }

}
