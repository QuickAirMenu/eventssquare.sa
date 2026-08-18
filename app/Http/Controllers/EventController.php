<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $now = now();

        $events = Event::with(['city', 'category'])
            ->when($request->input('city'), fn ($q, $slug) => $q->whereHas('city', fn ($c) => $c->where('slug', $slug)))
            ->when($request->input('status'), fn ($q, $s) => $q->where('status', $s))
            ->orderBy('starts_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'cities' => City::where('is_active', true)->get(),
            'filters' => $request->only(['city', 'status']),
        ]);
    }

    public function show(Event $event): Response
    {
        return Inertia::render('Events/Show', [
            'event' => $event->load(['city', 'category']),
        ]);
    }
}
