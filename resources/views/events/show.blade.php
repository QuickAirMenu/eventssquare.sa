@extends('layouts.app')
@php $bodyClass = 'single-event wp-singular page-template-default page' @endphp
@section('title', $event->title_ar . ' | Events Square')
@section('meta')
<meta name="description" content="{{ strip_tags(Str::limit($event->description_ar ?? '', 160)) }}" />
<meta property="og:title" content="{{ $event->title_ar }} | Events Square" />
<meta property="og:description" content="{{ strip_tags(Str::limit($event->description_ar ?? '', 160)) }}" />
<meta property="og:image" content="{{ $event->featuredImage ?? asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{ $event->title_ar }} | Events Square" />
<meta name="twitter:description" content="{{ strip_tags(Str::limit($event->description_ar ?? '', 160)) }}" />
<meta name="twitter:image" content="{{ $event->featuredImage ?? asset('images/logo-full.png') }}" />
@endsection
@section('content')
@php
// Try to find an image for this event
$imagePath = null;
$slug = $event->slug;
$storagePath = public_path('storage/uploads/2024');
if (is_dir($storagePath)) {
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($storagePath));
    foreach ($files as $file) {
        if ($file->isFile() && stripos($file->getFilename(), $slug) !== false) {
            $imagePath = '/storage/uploads/2024/' . $file->getFilename();
            break;
        }
    }
}
if (!$imagePath) {
    $imagePath = '/images/logo-full.png';
}
@endphp
<div class="event-hero" style="background:linear-gradient(135deg,#1a3a1a 0%,#2d5a2d 100%);padding:80px 0 60px;color:#fff;text-align:center;">
    <div class="container">
        <h1 style="font-size:42px;font-weight:800;margin:0 0 12px;">{{ $event->title_ar }}</h1>
        @if($event->category)
        <span class="badge" style="background:rgba(255,255,255,0.15);padding:6px 20px;border-radius:20px;font-size:14px;">{{ $event->category->name_ar }}</span>
        @endif
    </div>
</div>

<div class="event-info-bar" style="background:#fff;border-bottom:1px solid #e5e7eb;padding:20px 0;display:flex;justify-content:center;gap:40px;flex-wrap:wrap;">
    <div class="event-info-item" style="text-align:center;">
        <div style="font-size:24px;color:#386732;margin-bottom:4px;"><i class="far fa-calendar-alt"></i></div>
        <div style="font-size:12px;color:#6b7280;font-weight:600;">التاريخ</div>
        <div style="font-size:14px;font-weight:700;color:#1f2937;">
            @if($event->start_date)
            {{ $event->start_date->format('d/m/Y') }}
            @if($event->end_date) - {{ $event->end_date->format('d/m/Y') }} @endif
            @else غير محدد @endif
        </div>
    </div>
    <div class="event-info-item" style="text-align:center;">
        <div style="font-size:24px;color:#386732;margin-bottom:4px;"><i class="fas fa-ticket-alt"></i></div>
        <div style="font-size:12px;color:#6b7280;font-weight:600;">رسوم الدخول</div>
        <div style="font-size:14px;font-weight:700;color:#1f2937;">{{ $event->price ?: 'مجاناً' }}</div>
    </div>
    <div class="event-info-item" style="text-align:center;">
        <div style="font-size:24px;color:#386732;margin-bottom:4px;"><i class="fas fa-map-marker-alt"></i></div>
        <div style="font-size:12px;color:#6b7280;font-weight:600;">المدينة</div>
        <div style="font-size:14px;font-weight:700;color:#1f2937;">{{ $event->country?->name_ar ?: 'عسير' }}</div>
    </div>
</div>

<div class="section-main" style="padding:40px 0;">
    <div class="container" style="max-width:900px;">
        @if($event->description_ar)
        <div style="line-height:2.2;font-size:16px;color:#374151;">
            {!! nl2br(e($event->description_ar)) !!}
        </div>
        @else
        <p style="color:#9ca3af;text-align:center;padding:40px 0;">لا يوجد وصف متاح حالياً.</p>
        @endif

        @if($event->external_url)
        <div style="margin-top:30px;text-align:center;">
            <a href="{{ $event->external_url }}" target="_blank" class="btn-main" style="display:inline-flex;align-items:center;gap:8px;padding:14px 32px;">
                <i class="fas fa-external-link-alt"></i> رابط التسجيل
            </a>
        </div>
        @endif

        @if($event->location_map)
        <div style="margin-top:30px;text-align:center;">
            <a href="{{ $event->location_map }}" target="_blank" style="color:#386732;font-size:14px;">
                <i class="fas fa-map-marked-alt" style="margin-left:6px;"></i> فتح في خرائط Google
            </a>
        </div>
        @endif
    </div>
</div>

@if(isset($related) && $related->count())
<div class="section-main light" style="background:#f9fafb;padding:60px 0;">
    <div class="container">
        <div class="section-title" style="text-align:center;font-size:28px;font-weight:700;color:#1f2937;margin-bottom:8px;">فعاليات ذات صلة</div>
        <div class="section-line" style="width:60px;height:3px;background:#386732;margin:0 auto 40px;"></div>
        <div class="related-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px;">
            @foreach($related as $rel)
            <a href="{{ route('events.show', $rel->slug) }}" class="event-card" style="color:inherit;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);text-decoration:none;">
                <div class="event-card-image" style="height:140px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;">
                    <span style="font-size:36px;color:#9ca3af;"><i class="fas fa-calendar-alt"></i></span>
                </div>
                <div class="event-card-body" style="padding:16px;">
                    <h3 style="font-size:14px;font-weight:700;margin:0 0 8px;color:#1f2937;">{{ $rel->title_ar }}</h3>
                    @if($rel->start_date)
                    <div style="font-size:12px;color:#6b7280;"><i class="far fa-clock" style="margin-left:4px;"></i>{{ $rel->start_date->format('d/m/Y') }}</div>
                    @endif
                </div>
            </a>
            @endforeach
        </div>
    </div>
</div>
@endif
@endsection