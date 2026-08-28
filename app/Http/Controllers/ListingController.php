<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\City;
use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{
    public function index(Request $request): Response
    {
        $listings = Listing::with(['category', 'city'])
            ->where('is_active', true)
            ->when($request->input('category'), fn ($q, $slug) => $q->whereHas('category', function ($c) use ($slug) {
                $c->where('slug', $slug)->orWhereHas('parent', fn ($p) => $p->where('slug', $slug));
            }))
            ->when($request->input('city'), fn ($q, $slug) => $q->whereHas('city', fn ($c) => $c->where('slug', $slug)))
            ->when($request->input('search'), fn ($q, $s) => $q->where(fn ($x) => $x->where('name', 'like', "%{$s}%")->orWhere('summary', 'like', "%{$s}%")->orWhere('description', 'like', "%{$s}%")))
            ->orderByRaw('is_featured DESC, id DESC')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Listings/Index', [
            'listings' => $listings,
            'categories' => $this->destinationSubcategories(),
            'cities' => City::where('is_active', true)->get(),
            'filters' => $request->only(['category', 'city', 'search']),
        ]);
    }

    public function byCategory(Category $category, Request $request): Response
    {
        abort_unless($category->is_active, 404);

        $ids = [$category->id, ...$category->children()->pluck('id')->all()];

        $listings = Listing::with(['category', 'city'])
            ->where('is_active', true)
            ->whereIn('category_id', $ids)
            ->when($request->input('city'), fn ($q, $slug) => $q->whereHas('city', fn ($c) => $c->where('slug', $slug)))
            ->orderByRaw('is_featured DESC, id DESC')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Listings/Index', [
            'listings' => $listings,
            'categories' => $this->destinationSubcategories(),
            'cities' => City::where('is_active', true)->get(),
            'activeCategory' => $category,
            'filters' => ['category' => $category->slug, 'city' => $request->input('city')],
        ]);
    }

    public function activities(Request $request): Response
    {
        $category = Category::where('slug', 'activities')->first();

        $listings = Listing::with(['category', 'city'])
            ->where('is_active', true)
            ->whereHas('category', fn ($q) => $q->where('type', 'activity'))
            ->when($request->input('city'), fn ($q, $slug) => $q->whereHas('city', fn ($c) => $c->where('slug', $slug)))
            ->orderByRaw('is_featured DESC, id DESC')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Listings/Index', [
            'listings' => $listings,
            'categories' => [],
            'cities' => City::where('is_active', true)->get(),
            'activeCategory' => $category,
            'filters' => ['category' => $category?->slug, 'city' => $request->input('city')],
        ]);
    }

    protected function destinationSubcategories()
    {
        return Category::where('is_active', true)
            ->whereNotNull('parent_id')
            ->where('type', 'destination')
            ->orderBy('sort_order')
            ->get(['id', 'name', 'name_en', 'slug', 'icon', 'parent_id']);
    }

    public function show(Listing $listing): Response
    {
        abort_unless($listing->is_active, 404);

        return Inertia::render('Listings/Show', [
            'listing' => $listing->load(['category', 'city']),
            'related' => Listing::with(['city'])
                ->where('is_active', true)
                ->where('category_id', $listing->category_id)
                ->where('id', '!=', $listing->id)
                ->limit(3)
                ->get(),
        ]);
    }
}
