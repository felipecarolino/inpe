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

    
   

}
