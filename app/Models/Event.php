<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title_ar', 'title_en', 'slug', 'description_ar', 'description_en',
        'start_date', 'end_date', 'location_name', 'location_map',
        'price', 'external_url', 'status', 'featured',
        'category_id', 'country_id', 'seo_meta', 'favorites_count', 'user_id',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'seo_meta' => 'json',
        'featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function images()
    {
        return $this->hasMany(EventImage::class)->orderBy('sort_order');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
