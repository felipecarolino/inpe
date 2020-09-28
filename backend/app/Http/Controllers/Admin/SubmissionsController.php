<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\StoreSubmissionsRequest;
use App\Http\Requests\Admin\UpdateSubmissionsRequest;
use App\Submissions;

class SubmissionsController extends ApiController
{
    
    
    public function index()
    {
        /*if (! Gate::allows('role_access')) {
            return abort(401);
        }*/

    	$count = 5;
    	
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	
        $submissions = Submissions::paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
    	return response($submissions, 200);
    }

  
   
   
    public function create(StoreSubmissionsRequest $request)
    {
           	
    	try{
    		 		
    		
    		
    		            
    		$submission = Submissions::create($request->all());
    		
    		
    		if ($submission){
    			
    			$file = $request->file;
    			$result_file = $this->FileUpload($file,$submission->id);
    			
    			if ($result_file['status']){
    				$submission->filename = $result_file['fileUrl'];
    				$submission->update();
    			}
    			else{
    				$submission->filename =$result_file['message'];
    				//$result['fileUrl'] = $result_file['fileUrl'];
    				//$result['messageFile'] = $result_file['message'];
    			}
    			
    			
    		}
    		$result['data'] = $submission->toArray();
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


    
    public function update(UpdateSubmissionsRequest $request,$id)
    {
        /*if (! Gate::allows('role_edit')) {
            return abort(401);
        }*/
        
    	
    	try{
    	
    		$submission = Submissions::findOrFail($id);
    		$submission->update($request->all());
    	
    		$result['data'] = $submission->toArray();
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
     * Display Contributors.
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
    		 
    		$submission = Submissions::findOrFail($id);
    		    		 
    		
    		
    		
    		$result['data'] = $submission->toArray();
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

    public function FileUpload($file,$id){
    	
    	 
    	// Folder Path For Ubuntu
    	// $folderPath = "/var/www/upload-react/";
    	// Folder Path For Window
    	

    	
    	try{
    		
	    	$filename = $file->getClientOriginalName();
	     	$ext = substr($filename,-3,3);
	     
	     	
	    	
	    	if ($ext=="csv"){
	    		
	    	
		    	//$file_tmp = $file['tmp_name'];
		    	
		    		    	
		    	$fileName = date("dmY_Hms").'_'.$id.'.'.$ext;
		    	 
		    	$destinationPath = 'uploads';
		    	
		    	$file->move($destinationPath,$fileName);
		    	
		    	$result['status'] = true;
		    	$result['message'] = 'File uploaded';
		    	$result['fileUrl'] = 'http://45.79.47.218/cvportal/backend/uploads/'.$fileName;
	    	
    		}
    		else{
    			$result['status'] = false;
    			$result['message'] = 'Only csv files are allowed';
    			$result['fileUrl'] = '';
    		}
	    		
    	
    	}catch(\Exception $e){
    		$result['status'] = false;
    		$result['message'] = 'Operation failed due to '. $e->getMessage();
    		$result['fileUrl'] = '';
    	}
    	 
    	return $result;
    	
    	
    	
    }
    
    
   
    public function destroy($id)
    {
        /*if (! Gate::allows('role_delete')) {
            return abort(401);
        }*/
       
   	
        try{
        	 
        	
        	$submission = Submissions::findOrFail($id);
        	$submission->delete();
        	$result['data'] = $submission->toArray();
        	$result['status'] = true;
        	
        	 
        	
        }catch(\Exception $e){
        	$result['status'] = false;
        	
       		 if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected submission id is invalid.';
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
