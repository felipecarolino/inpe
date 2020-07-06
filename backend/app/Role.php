<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Role
 *
 * @package App
 * @property string $title
*/
class Role extends Model
{
    protected $fillable = ['name','description'];
    protected $hidden = [];
    
    use SoftDeletes;
    
    public static function boot()
    {
        parent::boot();

        //Role::observe(new \App\Observers\UserActionsObserver);
    }
    
    public function users()
    {
    	return $this->hasMany(User::class, 'role_id');
    }
}
