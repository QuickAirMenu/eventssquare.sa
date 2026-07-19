<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Category;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with(['category', 'country'])->where('status', 'published');

        if ($request->filled('type')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->type);
            });
        }

        if ($request->filled('city')) {
            $query->whereHas('country', function ($q) use ($request) {
                $q->where('slug', $request->city);
            });
        }

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(function ($builder) use ($q) {
                $builder->where('title_ar', 'like', "%$q%")
                    ->orWhere('description_ar', 'like', "%$q%");
            });
        }

        $events = $query->latest()->paginate(12);
        $categories = Category::where('type', 'tag')->get();
        $countries = \App\Models\Country::orderBy('events_count', 'desc')->take(10)->get();

        return view('events.index', compact('events', 'categories', 'countries'));
    }

    public function show($slug)
    {
        $decoded = urldecode($slug);

        $event = Event::with(['category', 'country', 'images'])
            ->where('status', 'published')
            ->where(function ($q) use ($slug, $decoded) {
                $q->where('slug', $slug)
                  ->orWhere('slug', $decoded);
            })
            ->first();

        if (!$event) {
            $search = str_replace('-', ' ', $decoded);
            $event = Event::with(['category', 'country', 'images'])
                ->where('status', 'published')
                ->where('title_ar', 'like', "%$search%")
                ->first();
        }

        if (!$event) {
            abort(404);
        }

        $related = Event::where('status', 'published')
            ->where('category_id', $event->category_id)
            ->where('id', '!=', $event->id)
            ->latest()
            ->take(4)
            ->get();

        return view('events.show', compact('event', 'related'));
    }
}
