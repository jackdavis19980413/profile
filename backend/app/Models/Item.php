<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Skill;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['skill_id', 'description'];

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}
