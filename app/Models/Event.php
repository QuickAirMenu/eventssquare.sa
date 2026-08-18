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
    'city_id', 'category_id', 'name', 'name_en', 'slug',
    'description', 'venue', 'starts_at', 'ends_at',
    'cover_image', 'is_featured', 'status',
])]
class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = ['cover_url'];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'is_featured' => 'boolean',
        ];
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
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

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'ongoing' => 'مستمر الآن',
            'ended' => 'انتهت',
            default => 'قادمة',
        };
    }

    protected static function booted(): void
    {
        static::creating(function (Event $event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->name_en ?: $event->name);
            }
        });
    }
}
