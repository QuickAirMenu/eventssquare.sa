<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\UploadsFiles;
use App\Models\Category;
use App\Models\City;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    use UploadsFiles;

    public function index(Request $request): Response
    {
        $events = Event::with(['city', 'category'])
            ->when($request->input('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Events/Form', [
            'event' => null,
            'cities' => City::orderBy('name')->get(),
            'categories' => Category::where('type', 'event')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateEvent($request);
        $data['cover_image'] = $this->uploadFile($request, 'cover_image', 'events');
        $data['status'] = $this->computeStatus($request->input('starts_at'), $request->input('ends_at'));

        Event::create($data);

        return redirect()->route('admin.events.index')->with('success', 'تم إضافة الفعالية بنجاح.');
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Admin/Events/Form', [
            'event' => $event,
            'cities' => City::orderBy('name')->get(),
            'categories' => Category::where('type', 'event')->orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $data = $this->validateEvent($request);
        if ($image = $this->uploadFile($request, 'cover_image', 'events')) {
            $data['cover_image'] = $image;
        }
        $data['status'] = $this->computeStatus($request->input('starts_at'), $request->input('ends_at'));

        $event->update($data);

        return redirect()->route('admin.events.index')->with('success', 'تم تحديث الفعالية بنجاح.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return back()->with('success', 'تم حذف الفعالية.');
    }

    protected function computeStatus(?string $startsAt, ?string $endsAt): string
    {
        $start = $startsAt ? \Illuminate\Support\Carbon::parse($startsAt) : null;
        $end = $endsAt ? \Illuminate\Support\Carbon::parse($endsAt) : null;

        if ($start && $start->isPast() && (! $end || $end->isFuture())) {
            return 'ongoing';
        }

        if ($end && $end->isPast()) {
            return 'ended';
        }

        return 'upcoming';
    }

    protected function validateEvent(Request $request): array
    {
        return $request->validate([
            'city_id' => ['required', 'exists:cities,id'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:190'],
            'name_en' => ['nullable', 'string', 'max:190'],
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('events', 'slug')->ignore($request->route('event'))],
            'description' => ['nullable', 'string'],
            'venue' => ['nullable', 'string', 'max:300'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'is_featured' => ['boolean'],
            'cover_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);
    }
}
