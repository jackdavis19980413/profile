<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalProfile extends Model
{
    use HasFactory;

    // protected $primaryKey = 'id';

    protected $fillable = ['firstname', 'lastname', 'email', 'subtitle', 'picture', 'caption', 'author', 'cv_file'];

    public function getRecord($query)
    {
        return $query->first();
    }
}
