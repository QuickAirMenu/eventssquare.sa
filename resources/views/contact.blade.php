@extends('layouts.app')
@php $bodyClass = 'contact wp-singular page-template-default page page-id-4445' @endphp
@section('title', 'تواصل معنا | Events Square')
@section('meta')
<meta name="description" content="تواصل مع فريق Events Square للاستفسارات والاقتراحات" />
<meta property="og:title" content="تواصل معنا | Events Square" />
<meta property="og:description" content="تواصل مع فريق Events Square للاستفسارات والاقتراحات" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="تواصل معنا | Events Square" />
<meta name="twitter:description" content="تواصل مع فريق Events Square للاستفسارات والاقتراحات" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container"><h1>تواصل معنا</h1><p>نحن هنا لخدمتك</p></div>
</div>
<div class="section-main">
    <div class="container" style="max-width:900px;display:grid;grid-template-columns:1fr 1fr;gap:32px;">
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:30px;">
            <h2 style="font-size:20px;font-weight:700;margin-bottom:20px;">معلومات التواصل</h2>
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
                <div style="width:44px;height:44px;background:rgba(56,103,50,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#386732;font-size:18px;"><i class="fas fa-envelope"></i></div>
                <div><strong>البريد الإلكتروني</strong><br><span style="color:#6b7280;font-size:14px;">info@eventssquare.sa</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:14px;">
                <div style="width:44px;height:44px;background:rgba(56,103,50,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#386732;font-size:18px;"><i class="fas fa-map-marker-alt"></i></div>
                <div><strong>الموقع</strong><br><span style="color:#6b7280;font-size:14px;">منطقة عسير، المملكة العربية السعودية</span></div>
            </div>
        </div>
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:30px;">
            <h2 style="font-size:20px;font-weight:700;margin-bottom:20px;">أرسل رسالة</h2>
            <form style="display:flex;flex-direction:column;gap:14px;">
                <input type="text" placeholder="الاسم" style="border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:14px;">
                <input type="email" placeholder="البريد الإلكتروني" style="border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:14px;">
                <textarea rows="4" placeholder="الرسالة" style="border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:14px;"></textarea>
                <button type="submit" class="btn-main" style="width:100%;">إرسال</button>
            </form>
        </div>
    </div>
</div>
@endsection