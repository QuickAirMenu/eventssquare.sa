<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::with('roles')
            ->when($request->input('search'), fn ($q, $s) => $q->where(fn ($x) => $x->where('name', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%")))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => Role::pluck('name'),
            'filters' => $request->only('search'),
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'لا يمكنك تعديل دورك الخاص.');
        }

        if (! $request->user()->hasRole('admin')) {
            return back()->with('error', 'غير مصرح لك بتعديل أدوار المستخدمين.');
        }

        $validated = $request->validate([
            'role' => ['required', Rule::in(['admin', 'editor', 'user'])],
        ]);

        // Only an admin may grant the admin role, and never to the last admin.
        if ($validated['role'] === 'admin' && $user->hasRole('admin') === false) {
            $adminsCount = User::role('admin')->count();
            if ($adminsCount < 1) {
                return back()->with('error', 'يجب وجود مدير واحد على الأقل.');
            }
        }

        $user->syncRoles([$validated['role']]);

        return back()->with('success', 'تم تحديث دور المستخدم.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'لا يمكنك حذف حسابك الخاص.');
        }

        if ($user->hasRole('admin')) {
            return back()->with('error', 'لا يمكن حذف حساب مشرف.');
        }

        $user->delete();

        return back()->with('success', 'تم حذف المستخدم.');
    }
}
