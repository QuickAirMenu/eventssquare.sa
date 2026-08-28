<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable([
    'title', 'title_en', 'slug', 'description',
    'cover_image', 'link', 'valid_from', 'valid_until', 'is_active',
])]
class Offer extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = ['cover_url'];

    protected function casts(): array
    {
        return [
            'valid_from' => 'date',
            'valid_until' => 'date',
            'is_active' => 'boolean',
        ];
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

    protected function link(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value !== null && ! str_starts_with($value, 'http') ? null : $value,
        );
    }

    protected static function booted(): void
    {
        static::creating(function (Offer $offer) {
            if (empty($offer->slug)) {
                $offer->slug = Str::slug($offer->title_en ?: $offer->title);
            }
        });
    }
}
