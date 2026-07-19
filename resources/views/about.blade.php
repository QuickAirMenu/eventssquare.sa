@extends('layouts.app')
@php $bodyClass = 'about wp-singular page-template-default page page-id-4751' @endphp
@section('title', 'عن المنصة | Events Square')
@section('meta')
<meta name="description" content="تعرف على منصة Events Square للتسويق السياحي الرقمي في منطقة عسير" />
<meta property="og:title" content="عن المنصة | Events Square" />
<meta property="og:description" content="تعرف على منصة Events Square للتسويق السياحي الرقمي في منطقة عسير" />
<meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
<meta property="og:url" content="{{ url()->current() }}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="عن المنصة | Events Square" />
<meta name="twitter:description" content="تعرف على منصة Events Square للتسويق السياحي الرقمي في منطقة عسير" />
<meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection
@section('content')
<div class="section-hero">
    <div class="container"><h1>عن المنصة</h1><p>تعرف على Events Square</p></div>
</div>
<div class="section-main">
    <div class="container" style="max-width:800px;">
        <div style="line-height:2.2;font-size:16px;color:#374151;text-align:justify;">
            <p>منصة تسويق سياحي رقمية تقدم خدمات إعلامية وترويجية للوجهات السياحية في منطقة عسير، لتعزيز السياحة وتنمية القطاع السياحي في المنطقة.</p>
            <p>تهدف منصتنا إلى تسليط الضوء على ما تزخر به منطقة عسير من مقومات سياحية فريدة تشمل المواقع الطبيعية الخلابة، والمواقع التاريخية والتراثية، والمتاحف والأسواق الشعبية، بالإضافة إلى المأكولات والمشروبات التقليدية، وخيارات الإقامة والتسوق المتنوعة.</p>
            <h2 style="font-size:22px;font-weight:700;color:#1f2937;margin:30px 0 12px;">رؤيتنا</h2>
            <p>أن نكون المنصة الرائدة في التسويق السياحي لمنطقة عسير على مستوى المملكة العربية السعودية.</p>
            <h2 style="font-size:22px;font-weight:700;color:#1f2937;margin:30px 0 12px;">رسالتنا</h2>
            <p>تقديم خدمات إعلامية وترويجية مبتكرة ومتكاملة للوجهات السياحية في منطقة عسير، تسهم في جذب السياح وتعزيز الاقتصاد المحلي.</p>
        </div>
    </div>
</div>
@endsection