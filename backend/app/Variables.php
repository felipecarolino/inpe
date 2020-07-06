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
class Variables extends Model
{
    protected $fillable = ['Name_RK','RAJ2000_RK','DEJ2000_RK'];
    protected $hidden = [];
    
    use SoftDeletes;
    
    public static function boot()
    {
        parent::boot();

        //Role::observe(new \App\Observers\UserActionsObserver);
    }
    
}
