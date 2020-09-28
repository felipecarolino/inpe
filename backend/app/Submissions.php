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
class Submissions extends Model
{
    protected $fillable = ['first_name','last_name','email','institution','department','position','website','observations','filename'];
    protected $hidden = [];
    
    use SoftDeletes;
    
    public static function boot()
    {
        parent::boot();

        //Role::observe(new \App\Observers\UserActionsObserver);
    }
    
    
}
