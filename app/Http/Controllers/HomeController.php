<?php

namespace App\Http\Controllers;

use App\Models\Event;

class HomeController extends Controller
{
    public function index()
    {
        try {
            $featured = Event::where('featured', true)->where('status', 'published')->latest()->take(6)->get();

            if ($featured->isEmpty()) {
                $featured = Event::where('status', 'published')->latest()->take(6)->get();
            }
        } catch (\Exception $e) {
            $featured = collect();
        }

        try {
            $upcoming = Event::where('status', 'published')
                ->whereNotNull('start_date')
                ->where('start_date', '>=', now())
                ->latest('start_date')
                ->take(8)
                ->get();
        } catch (\Exception $e) {
            $upcoming = collect();
        }

        try {
            $latest = Event::where('status', 'published')->latest()->take(6)->get();
        } catch (\Exception $e) {
            $latest = collect();
        }

        return view('home', compact('featured', 'upcoming', 'latest'));
    }
}
