<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact', [
            'settings' => Setting::allSettings(),
        ]);
    }

    public function sales(): Response
    {
        return Inertia::render('Sales');
    }
}
