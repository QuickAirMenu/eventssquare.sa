@extends('layouts.app')
@php $bodyClass = 'events wp-singular page-template-default page page-id-6276' @endphp
@section('title', 'الفعاليات والمهرجانات | Events Square')
@section('meta')
<meta name="description" content="اكتشف أحدث الفعاليات والمهرجانات في منطقة عسير" />
<meta property="og:title" content="الفعاليات والمهرجانات | Events Square" />
<meta property="og:description" content="اكتشف أحدث الفعاليات والمهرجانات في منطقة عسير" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="الفعاليات والمهرجانات | Events Square" />
<meta name="twitter:description" content="اكتشف أحدث الفعاليات والمهرجانات في منطقة عسير" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container">
        <h1>الفعاليات والمهرجانات</h1>
        <p>اكتشف أحدث الفعاليات والمهرجانات في منطقة عسير</p>
    </div>
</div>

<div class="section-main" style="background:#f9fafb;min-height:60vh;">
    <div class="container">
        <form method="GET" class="filter-bar">
            <select name="type">
                <option value="">كل التصنيفات</option>
                @foreach($categories as $cat)
                <option value="{{ $cat->slug }}" {{ request('type') == $cat->slug ? 'selected' : '' }}>{{ $cat->name_ar }}</option>
                @endforeach
            </select>
            <select name="city">
                <option value="">كل المدن</option>
                @foreach($countries as $c)
                <option value="{{ $c->slug }}" {{ request('city') == $c->slug ? 'selected' : '' }}>{{ $c->name_ar }}</option>
                @endforeach
            </select>
            <input type="text" name="search" value="{{ request('search') }}" placeholder="ابحث عن فعالية...">
            <button type="submit"><i class="fas fa-search" style="margin-left:6px;"></i> بحث</button>
        </form>

        @if($events->count())
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
        <div style="margin-top:32px;">{{ $events->links() }}</div>
        @else
        <div style="text-align:center;padding:80px 0;">
            <i class="fas fa-folder-open" style="font-size:60px;color:#d1d5db;margin-bottom:16px;"></i>
            <h3 style="font-size:20px;font-weight:700;color:#6b7280;">لا توجد فعاليات</h3>
            <p style="color:#9ca3af;">لم يتم العثور على فعاليات تطابق معايير البحث</p>
        </div>
        @endif
    </div>
</div>
@endsection