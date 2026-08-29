<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsletterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $email = Str::lower(trim($request->string('email')));

        $request->validate([
            'email' => ['required', 'email', 'max:190'],
        ]);

        $duplicate = NewsletterSubscriber::where('email', $email)->exists();

        if ($duplicate) {
            return back()->withErrors(['email' => 'هذا البريد مشترك مسبقاً في النشرة.']);
        }

        try {
            NewsletterSubscriber::create(['email' => $email]);
        } catch (QueryException) {
            return back()->withErrors(['email' => 'هذا البريد مشترك مسبقاً في النشرة.']);
        }

        return back();
    }
}