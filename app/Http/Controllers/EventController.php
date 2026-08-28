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

        $search = trim((string) $request->input('search'));

        $events = Event::with(['city', 'category'])
            ->when($request->input('city'), fn ($q, $slug) => $q->whereHas('city', fn ($c) => $c->where('slug', $slug)))
            ->when($request->input('status'), fn ($q, $s) => $q->where('status', $s))
            ->when($search !== '', fn ($q) => $q->where(fn ($qq) => $qq->where('title', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%")))
            ->orderBy('starts_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Events/Index', [
            'events' => $events,
            'cities' => City::where('is_active', true)->get(),
            'filters' => $request->only(['city', 'status', 'search']),
        ]);
    }

    public function show(Event $event): Response
    {
        return Inertia::render('Events/Show', [
            'event' => $event->load(['city', 'category']),
            'relatedEvents' => Event::with(['city'])
                ->where('id', '!=', $event->id)
                ->where('starts_at', '>=', now()->subHours(6))
                ->orderBy('starts_at')
                ->limit(3)
                ->get(),
        ]);
    }
}
