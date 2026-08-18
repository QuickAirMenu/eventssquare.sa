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
            'stayListings' => $byCategory('الإقامة-والتسوق', 3),
            'foodListings' => $byCategory('مأكولات-ومشروبات', 4),
            'landmarkListings' => $byCategory('معالم-ومنتزهات', 4),
            'heritageListings' => $byCategory('قصور-وقرى-تراثية', 8),
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
        return Inertia::render('DiscoverAsir', [
            'heritageListings' => Listing::with(['category', 'city'])
                ->where('is_active', true)
                ->whereHas('category', fn ($q) => $q->where('type', 'destination'))
                ->inRandomOrder()
                ->limit(6)
                ->get(),
            'cities' => City::where('is_active', true)->get(),
        ]);
    }
}
