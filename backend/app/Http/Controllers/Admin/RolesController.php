<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;

use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\StoreRolesRequest;
use App\Http\Requests\Admin\UpdateRolesRequest;

class RolesController extends ApiController
{
    
    
    public function index()
    {
        /*if (! Gate::allows('role_access')) {
            return abort(401);
        }*/

    	$count = 5;
    	
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	
        $roles = Role::paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
    	return response($roles, 200);
    }

  
   
   
    public function create(StoreRolesRequest $request)
    {
           	
    	try{
    		
    		$role = Role::create($request->all());
    		
    		$result['data'] = $role->toArray();
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


    
    public function update(UpdateRolesRequest $request,$id)
    {
        /*if (! Gate::allows('role_edit')) {
            return abort(401);
        }*/
        
    	
    	try{
    	
    		$role = Role::findOrFail($id);
    		$role->update($request->all());
    	
    		$result['data'] = $role->toArray();
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
        /*if (! Gate::allows('role_view')) {
            return abort(401);
        }*/
    	
    	
    	try{
    		 
    		$role = Role::findOrFail($id);
    		    		 
    		$result['data'] = $role->toArray();
    		$result['status'] = true;
    		 
    	}catch(\Exception $e){
    		$result['status'] = false;
    		
    		if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected role id is invalid.';
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
        /*if (! Gate::allows('role_delete')) {
            return abort(401);
        }*/
       
   	
        try{
        	 
        	
        	$role = Role::findOrFail($id);
        	
        	 if (count($role->users)==0){
        	 	$role->delete();
        	 	
        	 	$result['data'] = $role->toArray();
        	 	$result['status'] = true;
        	 	
        	 	
        	 }
        	 else{
        	 	$result['status'] = false;
        	 	$result['data'] = $role->toArray();
        	 	$result['message'] = 'This role has users';
        	 }
        	
        	 
        	
        }catch(\Exception $e){
        	$result['status'] = false;
        	
       		 if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected role id is invalid.';
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
