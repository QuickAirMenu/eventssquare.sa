<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = ['name_ar', 'name_en', 'slug', 'events_count'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
