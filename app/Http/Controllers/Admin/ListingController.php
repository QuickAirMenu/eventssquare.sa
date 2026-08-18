<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\UploadsFiles;
use App\Models\Category;
use App\Models\City;
use App\Models\Listing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{
    use UploadsFiles;

    public function index(Request $request): Response
    {
        $listings = Listing::with(['category', 'city'])
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->input('category'), fn ($q, $id) => $q->where('category_id', $id))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Listings/Index', [
            'listings' => $listings,
            'categories' => Category::orderBy('sort_order')->get(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Listings/Form', [
            'listing' => null,
            'categories' => Category::orderBy('sort_order')->get(),
            'cities' => City::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateListing($request);
        $data['cover_image'] = $this->uploadFile($request);

        Listing::create($data);

        return redirect()->route('admin.listings.index')->with('success', 'تم إضافة الوجهة بنجاح.');
    }

    public function edit(Listing $listing): Response
    {
        return Inertia::render('Admin/Listings/Form', [
            'listing' => $listing,
            'categories' => Category::orderBy('sort_order')->get(),
            'cities' => City::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Listing $listing): RedirectResponse
    {
        $data = $this->validateListing($request);
        if ($image = $this->uploadFile($request)) {
            $data['cover_image'] = $image;
        }

        $listing->update($data);

        return redirect()->route('admin.listings.index')->with('success', 'تم تحديث الوجهة بنجاح.');
    }

    public function destroy(Listing $listing): RedirectResponse
    {
        $listing->delete();

        return back()->with('success', 'تم حذف الوجهة.');
    }

    protected function validateListing(Request $request): array
    {
        return $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'city_id' => ['required', 'exists:cities,id'],
            'name' => ['required', 'string', 'max:190'],
            'name_en' => ['nullable', 'string', 'max:190'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('listings', 'slug')->ignore($request->route('listing'))],
            'summary' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'summary_en' => ['nullable', 'string', 'max:500'],
            'description_en' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:300'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'phone' => ['nullable', 'string', 'max:20'],
            'website' => ['nullable', 'url', 'max:190'],
            'price_halalas' => ['nullable', 'integer', 'min:0'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['url'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'published_at' => ['nullable', 'date'],
            'cover_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);
    }
}
