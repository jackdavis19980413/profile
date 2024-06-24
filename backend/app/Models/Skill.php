<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = ['index', 'title', 'alt', 'src'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
