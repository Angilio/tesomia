<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entite extends Model
{
    use HasFactory;

    protected $fillable = [
        'entite',
    ];

    // 🔗 Relation avec users
    public function users()
    {
        return $this->hasMany(User::class);
    }
}