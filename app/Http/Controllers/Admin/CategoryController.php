<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::withCount(['listings', 'children'])
            ->with('parent')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Form', [
            'category' => null,
            'parents' => Category::whereNull('parent_id')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Category::create($this->validateCategory($request));

        return redirect()->route('admin.categories.index')->with('success', 'تم إضافة التصنيف بنجاح.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Form', [
            'category' => $category,
            'parents' => Category::whereNull('parent_id')->where('id', '!=', $category->id)->orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $category->update($this->validateCategory($request));

        return redirect()->route('admin.categories.index')->with('success', 'تم تحديث التصنيف بنجاح.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if ($category->listings()->exists() || $category->children()->exists()) {
            return back()->with('error', 'لا يمكن حذف تصنيف يحتوي على وجهات أو تصنيفات فرعية.');
        }

        $category->delete();

        return back()->with('success', 'تم حذف التصنيف.');
    }

    protected function validateCategory(Request $request): array
    {
        return $request->validate([
            'parent_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:190'],
            'name_en' => ['required', 'string', 'max:190'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('categories', 'slug')->ignore($request->route('category'))],
            'type' => ['required', Rule::in(['destination', 'event', 'activity', 'offer'])],
            'icon' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);
    }
}
