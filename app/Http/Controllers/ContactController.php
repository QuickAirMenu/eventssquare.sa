<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:190'],
            'phone' => ['nullable', 'string', 'max:20'],
            'subject' => ['required', 'string', 'max:190'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        Contact::create($validated);

        if (($validated['subject'] ?? '') === 'اشتراك النشرة') {
            return back()->with('success', 'تم الاشتراك في النشرة بنجاح، شكراً لانضمامك!');
        }

        return back()->with('success', 'تم استلام رسالتك بنجاح، سنتواصل معك قريباً.');
    }
}
