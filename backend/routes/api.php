<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['cors','api-header']], function () {
		
		Route::post('user/login', 'Admin\UsersController@login')->name('users.login');
});

//,'jwt.auth'
/*Route::group(['middleware' => ['cors','api-header']], function(){
	Route::get('/roles', 'Admin\RolesController@index')->name('roles.index');
});*/

Route::group(['middleware' => ['cors','api-header']], function(){

		Route::post('/variables/searchByName', 'Admin\VariablesController@searchByName')->name('variables.searchByName');
		Route::post('/variables/searchByCoord', 'Admin\VariablesController@searchByCoord')->name('variables.searchByCoord');
		Route::post('/variables/searchByType', 'Admin\VariablesController@searchByType')->name('variables.searchByType');
		Route::get('/variables', 'Admin\VariablesController@index')->name('variables.index');
		
		Route::get('/variables/{id}', 'Admin\VariablesController@show')->name('variables.show');;
		
		
		Route::post('/submissions', 'Admin\SubmissionsController@create')->name('submissions.create');
		//Route::post('/submissions/FileUpload', 'Admin\SubmissionsController@FileUpload')->name('submissions.fileupload');
		Route::post('/submissions/FileUpload', 'Admin\SubmissionsController@FileUpload')->name('submissions.fileupload');
		
		
});
	
	Route::group(['middleware' => ['cors','api-header','jwt.auth']], function(){
		Route::get('/roles', 'Admin\RolesController@index')->name('roles.index');
		Route::post('/roles', 'Admin\RolesController@create')->name('roles.create');
		Route::put('/roles/{id}', 'Admin\RolesController@update')->name('roles.update');
		Route::get('/roles/{id}', 'Admin\RolesController@show')->name('roles.show');
		Route::delete('/roles/{id}', 'Admin\RolesController@destroy')->name('roles.destroy');
	
		Route::get('/users', 'Admin\UsersController@index')->name('users.index');
		Route::post('/users', 'Admin\UsersController@create')->name('users.create');
		Route::put('/users/{id}', 'Admin\UsersController@update')->name('users.update');
		Route::get('/users/{id}', 'Admin\UsersController@show')->name('users.show');;
		Route::delete('/users/{id}', 'Admin\UsersController@destroy')->name('users.destroy');
	
		Route::post('/variables', 'Admin\VariablesController@create')->name('variables.create');
		Route::put('/variables/{id}', 'Admin\VariablesController@update')->name('variables.update');
		Route::delete('/variables/{id}', 'Admin\VariablesController@destroy')->name('variables.destroy');
		Route::post('user/resetPassword', 'Admin\UsersController@resetPassword')->name('users.resetPassword');
		
		Route::get('/submissions', 'Admin\SubmissionsController@index')->name('submissions.index');
		Route::put('/submissions/{id}', 'Admin\SubmissionsController@update')->name('submissions.update');
		Route::get('/submissions/{id}', 'Admin\SubmissionsController@show')->name('submissions.show');;
		Route::delete('/submissions/{id}', 'Admin\SubmissionsController@destroy')->name('submissions.destroy');
	
	});
	
Route::middleware('cors','api-header')->post('/checkToken', function (Request $request) {

		$token = str_replace("Bearer ", "", $request->header('Authorization'));
		
		if ($token){
			JWTAuth::setToken($token)->toUser();
			
			try {
				JWTAuth::parseToken()->authenticate();
				$result['message']='Token valid!';
				$result['token']=$token;
				
				return $result;
				
			} catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
			
			
			} catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			
			
			} catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
			
				
			}
		}
		else{
			$result['message']='Wrong data!';
			$result['token']=$request;
			
			return $result;
		}
		
       
       
        
});

	

	