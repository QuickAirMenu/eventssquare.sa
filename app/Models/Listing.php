<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable([
    'category_id', 'city_id', 'name', 'name_en', 'slug',
    'summary', 'description', 'summary_en', 'description_en',
    'address', 'latitude', 'longitude', 'phone', 'website',
    'price_halalas', 'cover_image', 'gallery',
    'is_featured', 'is_active', 'published_at',
])]
class Listing extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = ['cover_url'];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'gallery' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function getCoverUrlAttribute(): ?string
    {
        if (! $this->cover_image) {
            return null;
        }

        return str_starts_with($this->cover_image, '/')
            ? asset($this->cover_image)
            : Storage::disk('public')->url($this->cover_image);
    }

    protected static function booted(): void
    {
        static::creating(function (Listing $listing) {
            if (empty($listing->slug)) {
                $listing->slug = Str::slug($listing->name_en ?: $listing->name);
            }
        });
    }
}
