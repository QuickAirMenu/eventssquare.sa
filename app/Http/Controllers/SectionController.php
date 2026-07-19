<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    protected $sections = [
        'entertainment-events' => ['title' => 'الفعاليات والمهرجانات', 'desc' => 'اكتشف أحدث الفعاليات والمهرجانات في منطقة عسير'],
        'palaces-villages' => ['title' => 'قصور وقرى تراثية', 'desc' => 'استكشف القصور والقرى التراثية في عسير'],
        'landmarks-parks' => ['title' => 'المعالم والمنتزهات', 'desc' => 'تعرف على أجمل المعالم والمنتزهات في منطقة عسير'],
        'museums-markets' => ['title' => 'متاحف وأسواق شعبية', 'desc' => 'زر المتاحف والأسواق الشعبية في عسير'],
        'food-drinks' => ['title' => 'مأكولات ومشروبات', 'desc' => 'تذوق أشهى المأكولات والمشروبات في عسير'],
        'accommodation-shopping' => ['title' => 'الإقامة والتسوق', 'desc' => 'أفضل خيارات الإقامة والتسوق في عسير'],
        'activities-experiences' => ['title' => 'أنشطة وتجارب', 'desc' => 'خض أجمل الأنشطة والتجارب في عسير'],
        'offers-ads' => ['title' => 'العروض والإعلانات', 'desc' => 'أحدث العروض والإعلانات في منطقة عسير'],
    ];

    public function index(Request $request, string $type)
    {
        $section = $this->sections[$type] ?? ['title' => 'الفعاليات', 'desc' => ''];

        $query = Event::with(['category', 'country'])->where('status', 'published');
        $query->whereHas('category', fn($q) => $q->where('slug', $type));

        if ($request->filled('city')) {
            $query->whereHas('country', fn($q) => $q->where('slug', $request->city));
        }

        if ($request->filled('search')) {
            $q = $request->search;
            $query->where(fn($b) => $b->where('title_ar', 'like', "%$q%")->orWhere('description_ar', 'like', "%$q%"));
        }

        $events = $query->latest()->paginate(12);
        $countries = \App\Models\Country::orderBy('events_count', 'desc')->take(10)->get();

        return view('section', array_merge($section, [
            'type' => $type,
            'events' => $events,
            'countries' => $countries,
        ]));
    }
}
