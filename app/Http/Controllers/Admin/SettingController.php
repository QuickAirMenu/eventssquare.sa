<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    protected array $allowedKeys = [
        'site_name', 'site_tagline', 'site_description',
        'email', 'phone', 'whatsapp', 'address',
        'twitter', 'instagram', 'snapchat', 'tiktok',
        'newsletter_enabled',
    ];

    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/Edit', [
            'settings' => Setting::allSettings(),
            'allowedKeys' => $this->allowedKeys,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['nullable', 'string', 'max:190'],
            'site_tagline' => ['nullable', 'string', 'max:190'],
            'site_description' => ['nullable', 'string', 'max:1000'],
            'email' => ['nullable', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:300'],
            'twitter' => ['nullable', 'url', 'max:300'],
            'instagram' => ['nullable', 'url', 'max:300'],
            'snapchat' => ['nullable', 'url', 'max:300'],
            'tiktok' => ['nullable', 'url', 'max:300'],
            'newsletter_enabled' => ['boolean'],
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, (string) $value);
        }

        return back()->with('success', 'تم حفظ الإعدادات بنجاح.');
    }
}
