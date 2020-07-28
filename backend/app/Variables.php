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
    protected $fillable = ['name','ra','dec','per'];
    protected $hidden = [];
    
    use SoftDeletes;
    
    public static function boot()
    {
        parent::boot();

        //Role::observe(new \App\Observers\UserActionsObserver);
    }
    
}
