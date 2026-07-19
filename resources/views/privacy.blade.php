@extends('layouts.app')
@php $bodyClass = 'privacy wp-singular page-template-default page page-id-6823' @endphp
@section('title', 'سياسة الخصوصية | Events Square')
@section('meta')
<meta name="description" content="سياسة الخصوصية لمنصة Events Square للتسويق السياحي" />
<meta property="og:title" content="سياسة الخصوصية | Events Square" />
<meta property="og:description" content="سياسة الخصوصية لمنصة Events Square للتسويق السياحي" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="سياسة الخصوصية | Events Square" />
<meta name="twitter:description" content="سياسة الخصوصية لمنصة Events Square للتسويق السياحي" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container"><h1>سياسة الخصوصية</h1><p>سياسة الخصوصية لموقع Events Square</p></div>
</div>
<div class="section-main">
    <div class="container" style="max-width:800px;line-height:2.2;font-size:15px;color:#374151;">
        <p>نحن في Events Square نلتزم بحماية خصوصية زوارنا ومستخدمينا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها عند استخدام موقعنا.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">المعلومات التي نجمعها</h2>
        <p>قد نجمع المعلومات التالية: الاسم، البريد الإلكتروني، رقم الهاتف، وأي معلومات أخرى تقدمها طواعية من خلال نماذج الاتصال أو التسجيل.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">كيف نستخدم المعلومات</h2>
        <p>نستخدم المعلومات التي نجمعها لتقديم وتحسين خدماتنا، والتواصل معك، وإرسال النشرات الإخبارية والعروض الترويجية (بموافقتك).</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">حماية المعلومات</h2>
        <p>نحن نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو التدمير.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">اتصل بنا</h2>
        <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على info@eventssquare.sa</p>
    </div>
</div>
@endsection