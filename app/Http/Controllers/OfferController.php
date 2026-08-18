<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Offers/Index', [
            'offers' => Offer::where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('valid_until')->orWhere('valid_until', '>=', now()->toDateString());
                })
                ->latest()
                ->get(),
        ]);
    }
}
