<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function contact(Request $request): Response
    {
        return Inertia::render('Contact', [
            'settings' => Setting::allSettings(),
            'package' => trim((string) $request->query('package')),
        ]);
    }

    public function sales(): Response
    {
        return Inertia::render('Sales');
    }

    public function privacy(): Response
    {
        return Inertia::render('Legal/Privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('Legal/Terms');
    }
}
