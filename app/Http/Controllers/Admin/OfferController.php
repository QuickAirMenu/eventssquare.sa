<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\UploadsFiles;
use App\Models\Offer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    use UploadsFiles;

    public function index(Request $request): Response
    {
        $offers = Offer::when($request->input('search'), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Offers/Index', [
            'offers' => $offers,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Offers/Form', ['offer' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateOffer($request);
        $data['cover_image'] = $this->uploadFile($request, 'cover_image', 'offers');

        Offer::create($data);

        return redirect()->route('admin.offers.index')->with('success', 'تم إضافة العرض بنجاح.');
    }

    public function edit(Offer $offer): Response
    {
        return Inertia::render('Admin/Offers/Form', ['offer' => $offer]);
    }

    public function update(Request $request, Offer $offer): RedirectResponse
    {
        $data = $this->validateOffer($request);
        if ($image = $this->uploadFile($request, 'cover_image', 'offers')) {
            $data['cover_image'] = $image;
        }

        $offer->update($data);

        return redirect()->route('admin.offers.index')->with('success', 'تم تحديث العرض بنجاح.');
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        $offer->delete();

        return back()->with('success', 'تم حذف العرض.');
    }

    protected function validateOffer(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:190'],
            'title_en' => ['nullable', 'string', 'max:190'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('offers', 'slug')->ignore($request->route('offer'))],
            'description' => ['nullable', 'string'],
            'link' => ['nullable', 'url', 'starts_with:http://,https://', 'max:190'],
            'valid_from' => ['nullable', 'date'],
            'valid_until' => ['nullable', 'date', 'after_or_equal:valid_from'],
            'is_active' => ['boolean'],
            'cover_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);
    }
}
