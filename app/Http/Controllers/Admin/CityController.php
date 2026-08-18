<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Cities/Index', [
            'cities' => City::withCount('listings')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        City::create($this->validateCity($request));

        return back()->with('success', 'تم إضافة المدينة بنجاح.');
    }

    public function update(Request $request, City $city): RedirectResponse
    {
        $city->update($this->validateCity($request));

        return back()->with('success', 'تم تحديث المدينة بنجاح.');
    }

    public function destroy(City $city): RedirectResponse
    {
        if ($city->listings()->exists()) {
            return back()->with('error', 'لا يمكن حذف مدينة تحتوي على وجهات.');
        }

        $city->delete();

        return back()->with('success', 'تم حذف المدينة.');
    }

    protected function validateCity(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:190'],
            'name_en' => ['required', 'string', 'max:190'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('cities', 'slug')->ignore($request->route('city'))],
            'is_active' => ['boolean'],
        ]);
    }
}
