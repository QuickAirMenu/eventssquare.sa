<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="profile" href="https://gmpg.org/xfn/11" />
    <link rel="icon" href="{{ asset('images/favicon.png') }}" />
    <title>@yield('title', 'الرئيسية') | Events Square</title>
    @yield('meta')
    <link rel="canonical" href="{{ url()->current() }}" />

    <!-- Google Fonts -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cairo:400,700&display=swap" media="all" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cairo:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap" media="all" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Almarai:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap" media="all" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Readex+Pro:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap" media="all" />

    <!-- CSS Local -->
    <link rel="stylesheet" href="{{ asset('css/all.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/brands.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/common.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/e-gallery.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/elementor-icons.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/favorites.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/font-cairo.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/font-roboto.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/fontawesome.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/frontend.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/frontend.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/joinchat.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/post_4170.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/post_38.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/post_4127.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/post_4538.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/post_widget-social-icons.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/regular.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/sassy-social-share-public.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/search-filter.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/solid.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/style.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/style.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/styles.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/um-profile.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/um-responsive.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/um-styles.min.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_post-6593.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-divider.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-heading.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-icon-box.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-image-box.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-image.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-rating.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-spacer.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-toggle.min.css') }}" media="all" />
    <link rel="stylesheet" href="{{ asset('css/widget_widget-video.min.css') }}" media="all" />

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-3.4.1.min.js"></script>
</head>
<body class="{{ $bodyClass ?? 'home wp-singular page-template-default page page-id-4170 wp-custom-logo wp-embed-responsive wp-theme-astra wp-child-theme-astra-child ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.6 group-blog ast-single-post ast-mobile-inherit-site-logo ast-inherit-site-logo-transparent ast-theme-transparent-header ast-hfb-header elementor-default elementor-kit-38 elementor-page elementor-page-4170' }}">

<div class="hfeed site" id="page">

    @include('layouts.header-elementor')

    <main>
        @yield('content')
    </main>

    @include('layouts.footer-elementor')

</div>

<script src="{{ asset('js/frontend.min.js') }}"></script>
<script src="{{ asset('js/elements-handlers.min.js') }}"></script>
<script src="{{ asset('js/swiper.min.js') }}"></script>
<script>
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"مشاركة على فيسبوك","shareOnTwitter":"مشاركة على تويتر","pinIt":"تثبيتها","download":"تحميل","downloadImage":"تنزيل الصورة","fullscreen":"عرض شاشة كاملة","zoom":"تكبير","share":"مشاركة","playVideo":"تشغيل الفيديو","previous":"السابق","next":"التالي","close":"إغلاق","a11yCarouselWrapperAriaLabel":"Carousel | Horizontal scrolling: Arrow Left & Right","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":true,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"حاسوب محمول","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"الشاشة العريضة","value":2400,"default_value":2400,"direction":"min","is_enabled":false}},"hasCustomBreakpoints":false},"version":"3.21.2","is_static":false,"experimentalFeatures":{"additional_custom_breakpoints":true,"container":true,"e_panel_promotions":true,"theme_builder_v2":true,"nested-elements":true,"global_classes_should_enforce_capabilities":true,"e_variables":true,"e_opt_in_v4_page":true,"e_components":true,"e_interactions":true,"e_widget_creation":true,"import-export-customization":true,"form-submissions":true},"urls":{"assets":"{{ asset('') }}","ajaxurl":"{{ url('/wp-admin/admin-ajax.php') }}","resturl":"{{ url('/wp-json/') }}"}};
</script>

@stack('scripts')
</body>
</html>
