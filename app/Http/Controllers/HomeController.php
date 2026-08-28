<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Event;
use App\Models\Listing;
use App\Models\Offer;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $byCategory = fn (string $slug, int $limit) => Listing::with(['category', 'city'])
            ->where('is_active', true)
            ->whereHas('category', fn ($q) => $q->where('slug', $slug))
            ->orderByRaw('is_featured DESC, id DESC')
            ->limit($limit)
            ->get();

        return Inertia::render('Home', [
            'categories' => Category::withCount('listings')
                ->whereNull('parent_id')
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'subcategories' => Category::whereNotNull('parent_id')
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(['id', 'name', 'name_en', 'slug', 'parent_id']),
            'featuredListings' => Listing::with(['category', 'city'])
                ->where('is_active', true)
                ->where('is_featured', true)
                ->latest()
                ->limit(4)
                ->get(),
            'stayListings' => $byCategory('stay-shopping', 3),
            'foodListings' => $byCategory('food-drinks', 4),
            'landmarkListings' => $byCategory('landmarks-parks', 4),
            'heritageListings' => $byCategory('palaces-heritage-villages', 8),
            'upcomingEvents' => Event::with(['city', 'category'])
                ->where('starts_at', '>=', now()->subHours(6))
                ->orderBy('starts_at')
                ->limit(8)
                ->get(),
            'offers' => Offer::where('is_active', true)
                ->latest()
                ->limit(4)
                ->get(),
            'testimonials' => Testimonial::where('is_active', true)
                ->latest()
                ->limit(6)
                ->get(),
            'cities' => City::where('is_active', true)
                ->get(),
            'newsletterEnabled' => (bool) Setting::get('newsletter_enabled'),
        ]);
    }

    public function discover(): Response
    {
        $destinationSlugs = [
            'palaces-heritage-villages',
            'landmarks-parks',
            'museums-souks',
            'stay-shopping',
            'food-drinks',
        ];

        $listings = Listing::with(['category', 'city'])
            ->where('is_active', true)
            ->whereHas('category', function ($q) use ($destinationSlugs) {
                $q->where('is_active', true)
                    ->where(function ($w) use ($destinationSlugs) {
                        $w->whereIn('slug', $destinationSlugs)
                            ->orWhere('type', 'destination');
                    });
            })
            ->orderByRaw('is_featured DESC, id DESC')
            ->limit(40)
            ->get();

        $heritageListings = (clone $listings)
            ->filter(fn (Listing $l) => $l->category?->slug === 'palaces-heritage-villages')
            ->values();

        return Inertia::render('DiscoverAsir', [
            'heritageListings' => $heritageListings->isNotEmpty() ? $heritageListings : $listings,
            'listings' => $listings,
            'cities' => City::where('is_active', true)->get(),
        ]);
    }
}
