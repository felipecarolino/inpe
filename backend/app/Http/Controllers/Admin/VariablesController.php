<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;

use App\Variables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\ApiController;
use App\Http\Requests\Admin\StoreVariablesRequest;
use App\Http\Requests\Admin\UpdateVariablesRequest;

class VariablesController extends ApiController
{
    
    
    public function index()
    {
        /*if (! Gate::allows('Variable_access')) {
            return abort(401);
        }*/

    	$count = 5;
    	
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	
        $variables = Variables::paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
    	return response($variables, 200);
    }

  
   
   
    public function create(StoreVariablesRequest $request)
    {
           	
    	try{
    		
    		$variable = Variables::create($request->all());
    		
    		$result['data'] = $variable->toArray();
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
    
    public function leCoord($raBD, $decBD, $star, $segArco) {
    
    	
    	$sepRAUser = array();
    	$sepDECUser = array();
    
    	$sepRABD = array();
    	$sepDECBD = array();
    
    	//separando coordenadas para facilitar sua manipulação
    	$sepRAUser = explode(" ",$raBD);
    	$sepDECUser = explode(" ",$decBD);
    
    	$sepRABD = explode(" ", $star->RAJ2000_RK);
    	$sepDECBD = explode(" ",$star->DEJ2000_RK );
    
    	//realizando o cálculo diferencial para RA
    	$difRA = abs(15 * (3600 * (int)($sepRAUser[0])
    			+ 60 * (int)($sepRAUser[1]) + (double)($sepRAUser[2]))
    			- (15 * (3600 * (int)($sepRABD[0])
    					+ 60 * (int)($sepRABD[1]) + (double)($sepRABD[2]))));
    
    	//realizando o cálculo diferencial para DEC
    	$difDEC = abs((3600 * (int)($sepDECUser[0])
    			+ 60 * (int)($sepDECUser[1]) + (double)($sepDECUser[2]))
    			- (3600 * (int)($sepDECBD[0])
    					+ 60 * (int)($sepDECBD[1]) + (double)($sepDECBD[2])));
    
    	//armazenando o valor final da conta
    	$difSec = sqrt(pow($difRA, 2) + pow($difDEC, 2));
    
    	
    	return ($difSec < $segArco);
    }
    
    public function searchByCoord(Request $request){
    	
    	
    	$ra = isset($request->ra)?$request->ra:null;
    	$dec= isset($request->dec)?$request->dec:null;
    	$segArco= isset($request->arcosec)?$request->arcosec:1;
    	
    	$count = 5;
    	 
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	 
    	
    	
    	if ($ra && $dec){
    	
    	    	try{
	    		
	    	
	    		$variables = Variables::All();
	    	
	    		
	    		$found = array();
	    		
	    		foreach($variables as $v){
	    			
	    		 if (strlen($v->RAJ2000_RK)>0 && strlen($v->DEJ2000_RK)){
	    			if ($this->leCoord($ra, $dec, $v, $segArco)){
	    				
	    					    				
	    				$found[] = $v->id;
	    			}
	    		 }
	    		}
	    		
	    	 	$variables = Variables::whereIn("id",$found)->paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
	    	 
	    		$result['data'] = $variables;
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
    	}else{
    		

    		$result['status'] = false;
    		$result['message'] = 'RA and DEC fields are required';
    		 
    	}
    	
    }
    public function searchByName(Request $request)
    {
    	
    	$count = 5;
    	 
    	$pageNumber = isset($_GET['page'])?$_GET['page']:1;
    	
    
    	try{
    		$name = isset($request->name)?$request->name:null;
    		
    		//$variables = Variables::where('Name_RK','like','%'.$name.'%')->get();
    
    		$variables = array();
    		if ($name)
    			$variables = Variables::where('Name_RK','like','%'.$name.'%')->paginate($count, ['*'], 'page', $pageNumber)->toJson(JSON_PRETTY_PRINT);
    		
    		$result['data'] = $variables;
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


    
    public function update(UpdateVariablesRequest $request,$id)
    {
        /*if (! Gate::allows('Variable_edit')) {
            return abort(401);
        }*/
        
    	
    	try{
    	
    		$variable = Variables::findOrFail($id);
    		$variable->update($request->all());
    	
    		$result['data'] = $variable->toArray();
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
     * Display Variable.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        /*if (! Gate::allows('Variable_view')) {
            return abort(401);
        }*/
    	
    	
    	try{
    		 
    		$variable = Variables::findOrFail($id);
    		    		 
    		$result['data'] = $variable->toArray();
    		$result['status'] = true;
    		 
    	}catch(\Exception $e){
    		$result['status'] = false;
    		
    		if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected Variable id is invalid.';
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
        /*if (! Gate::allows('Variable_delete')) {
            return abort(401);
        }*/
       
   	
        try{
        	 
        	
        	
        	$variable = Variables::findOrFail($id);
        	$variable->delete();
        	 
        	$result['data'] = $variable->toArray();
        	$result['status'] = true;
        	
        	 
        	
        }catch(\Exception $e){
        	$result['status'] = false;
        	
       		 if (Str::containsAll($e->getMessage(),['No query results'])){
        		$result['message'] = 'The selected Variable id is invalid.';
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
