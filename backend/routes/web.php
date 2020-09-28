<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
Route::group(['middleware' => 'cors'], function(){
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
	
	Route::post('/variables/searchByName', 'Admin\VariablesController@searchByName')->name('variables.searchByName');
	Route::post('/variables/searchByCoord', 'Admin\VariablesController@searchByCoord')->name('variables.searchByCoord');
	
	Route::get('/variables', 'Admin\VariablesController@index')->name('variables.index');
	Route::post('/variables', 'Admin\VariablesController@create')->name('variables.create');
	Route::put('/variables/{id}', 'Admin\VariablesController@update')->name('variables.update');
	Route::get('/variables/{id}', 'Admin\VariablesController@show')->name('variables.show');;
	Route::delete('/variables/{id}', 'Admin\VariablesController@destroy')->name('variables.destroy');
	
});*/

	
