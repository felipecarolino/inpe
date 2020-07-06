<?php
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Auth\Notifications\ResetPassword;
use Hash;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\ResetPassword;

/**
 * Class User
 *
 * @package App
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $role
 * @property string $remember_token
 * @property integer $ativo
*/
class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;
    protected $fillable = ['name', 'email', 'password', 'remember_token', 'role_id','username'];
    protected $hidden = ['password', 'remember_token'];
    
    
    public static function boot()
    {
        parent::boot();

        //User::observe(new \App\Observers\UserObserver);
    }
    
    /**
     * Hash password
     * @param $input
     */
    public function setPasswordAttribute($input)
    {
        if ($input)
            $this->attributes['password'] = app('hash')->needsRehash($input) ? Hash::make($input) : $input;
    }
    

    /**
     * Set to null if empty
     * @param $input
     */
    public function setRoleIdAttribute($input)
    {
        $this->attributes['role_id'] = $input ? $input : null;
    }

    
    
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
    
       
    
    public function userRegistrationNotify($user)
    {
    	
    	$this->notify(new UserRegisteredNotification($user));
    }
    

   public function sendPasswordResetNotification($token)
    {
       $this->notify(new ResetPassword($token));
    }
    
    public function getUsernameForPasswordReset()
    {
    	return $this->username;
    }
    
    
}
