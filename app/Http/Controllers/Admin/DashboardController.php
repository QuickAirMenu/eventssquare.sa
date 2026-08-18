<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\City;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Listing;
use App\Models\Offer;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'listings' => Listing::count(),
                'events' => Event::count(),
                'offers' => Offer::count(),
                'categories' => Category::count(),
                'cities' => City::count(),
                'contacts' => Contact::count(),
                'unreadContacts' => Contact::unread()->count(),
                'users' => User::count(),
            ],
            'recentListings' => Listing::with(['category', 'city'])->latest()->limit(5)->get(),
            'recentEvents' => Event::with('city')->latest()->limit(5)->get(),
            'recentContacts' => Contact::latest()->limit(5)->get(),
        ]);
    }
}
