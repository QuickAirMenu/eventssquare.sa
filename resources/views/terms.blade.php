@extends('layouts.app')
@php $bodyClass = 'terms wp-singular page-template-default page page-id-6797' @endphp
@section('title', 'الشروط والأحكام | Events Square')
@section('meta')
<meta name="description" content="الشروط والأحكام الخاصة بمنصة Events Square للتسويق السياحي" />
<meta property="og:title" content="الشروط والأحكام | Events Square" />
<meta property="og:description" content="الشروط والأحكام الخاصة بمنصة Events Square للتسويق السياحي" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="الشروط والأحكام | Events Square" />
<meta name="twitter:description" content="الشروط والأحكام الخاصة بمنصة Events Square للتسويق السياحي" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container"><h1>الشروط والأحكام</h1></div>
</div>
<div class="section-main">
    <div class="container" style="max-width:800px;line-height:2.2;font-size:15px;color:#374151;">
        <p>يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام موقع Events Square. باستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">قبول الشروط</h2>
        <p>باستخدامك لهذا الموقع، فإنك تقر بأنك قرأت وفهمت وتوافق على الالتزام بهذه الشروط والأحكام.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">استخدام الموقع</h2>
        <p>أنت توافق على استخدام الموقع فقط للأغراض القانونية وبطريقة لا تنتهك حقوق الآخرين أو تقيد أو تمنع استخدامهم للموقع.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">الملكية الفكرية</h2>
        <p>جميع المحتويات المعروضة على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملك لـ Events Square أو مرخصة له، ومحمية بموجب قوانين الملكية الفكرية.</p>
        <h2 style="font-size:20px;font-weight:700;color:#1f2937;margin:30px 0 12px;">تعديل الشروط</h2>
        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة، ويعتبر استمرارك في استخدام الموقع بعد النشر قبولاً للتعديلات.</p>
    </div>
</div>
@endsection