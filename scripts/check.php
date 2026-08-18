<?php

require __DIR__.'/../vendor/autoload.php';

use App\Models\Category;
use App\Models\City;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Listing;
use App\Models\Offer;
use App\Models\Testimonial;
use App\Models\User;

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$rows = [
    'cities' => City::count(),
    'categories' => Category::count(),
    'listings' => Listing::count(),
    'events' => Event::count(),
    'offers' => Offer::count(),
    'testimonials' => Testimonial::count(),
    'users' => User::count(),
    'contacts' => Contact::count(),
    'settings' => \App\Models\Setting::count(),
];

foreach ($rows as $key => $value) {
    echo "{$key}: {$value}\n";
}

echo 'admin_roles: '.(User::where('email', 'admin@eventssquare-sa.com')->first()?->getRoleNames()->implode(',') ?? 'none')."\n";
