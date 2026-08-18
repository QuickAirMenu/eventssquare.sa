<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\UploadsFiles;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    use UploadsFiles;

    public function index(): Response
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'author' => ['required', 'string', 'max:190'],
            'content' => ['required', 'string', 'max:2000'],
            'rating' => ['nullable', 'integer', 'between:1,5'],
            'is_active' => ['boolean'],
            'avatar' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
        $data['avatar'] = $this->uploadFile($request, 'avatar', 'avatars', 2048);

        Testimonial::create($data);

        return back()->with('success', 'تم إضافة التقييم بنجاح.');
    }

    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validate([
            'author' => ['required', 'string', 'max:190'],
            'content' => ['required', 'string', 'max:2000'],
            'rating' => ['nullable', 'integer', 'between:1,5'],
            'is_active' => ['boolean'],
            'avatar' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
        if ($avatar = $this->uploadFile($request, 'avatar', 'avatars', 2048)) {
            $this->deleteUpload($testimonial->avatar);
            $data['avatar'] = $avatar;
        }

        $testimonial->update($data);

        return back()->with('success', 'تم تحديث التقييم بنجاح.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return back()->with('success', 'تم حذف التقييم.');
    }
}
