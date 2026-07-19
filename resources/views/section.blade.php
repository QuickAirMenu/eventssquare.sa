@extends('layouts.app')
@php $bodyClass = 'section wp-singular page-template-default page' @endphp
@section('title', ($title ?? '') . ' | Events Square')
@section('meta')
<meta name="description" content="{{ strip_tags(Str::limit($description ?? '', 160)) }}" />
<meta property="og:title" content="{{ $title ?? '' }} | Events Square" />
<meta property="og:description" content="{{ strip_tags(Str::limit($description ?? '', 160)) }}" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{ $title ?? '' }} | Events Square" />
<meta name="twitter:description" content="{{ strip_tags(Str::limit($description ?? '', 160)) }}" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container">
        <h1>{{ $title ?? '' }}</h1>
        @if(!empty($description))
        <p>{{ $description }}</p>
        @endif
    </div>
</div>

<div class="section-main" style="min-height:60vh;">
    <div class="container">
        @if(isset($events) && $events->count())
        <div class="card-grid">
            @foreach($events as $event)
            <a href="{{ route('events.show', $event->slug) }}" class="event-card" style="color:inherit;">
                <div class="event-card-image">
                    <span class="placeholder"><i class="fas fa-calendar-alt"></i></span>
                    @if($event->category)
                    <span class="event-card-badge">{{ $event->category->name_ar }}</span>
                    @endif
                </div>
                <div class="event-card-body">
                    <h3>{{ $event->title_ar }}</h3>
                    <div class="event-card-meta">
                        @if($event->start_date)
                        <span><i class="far fa-clock" style="margin-left:4px;"></i>{{ $event->start_date->format('d/m/Y') }}</span>
                        @endif
                        @if($event->country)
                        <span><i class="fas fa-map-marker-alt" style="margin-left:4px;"></i>{{ $event->country->name_ar }}</span>
                        @endif
                    </div>
                    <span class="read-more">اقرأ المزيد</span>
                </div>
            </a>
            @endforeach
        </div>
        @else
        <div style="text-align:center;padding:80px 0;">
            <i class="fas fa-folder-open" style="font-size:60px;color:#d1d5db;margin-bottom:16px;"></i>
            <h3 style="font-size:20px;font-weight:700;color:#6b7280;">لا توجد فعاليات</h3>
            <p style="color:#9ca3af;">لم يتم العثور على فعاليات في هذا القسم</p>
        </div>
        @endif
    </div>
</div>
@endsection