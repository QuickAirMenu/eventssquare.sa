@extends('layouts.app')
@php $bodyClass = 'home wp-singular page-template-default page page-id-4170' @endphp
@section('title', 'الرئيسية')
@section('meta')
    <meta name="description" content="منصة تسويق سياحي رقمية تقدم خدمات إعلامية وترويجية للأنشطة السياحية في منطقة عسير" />
    <meta property="og:title" content="الرئيسية | Events Square" />
    <meta property="og:description" content="منصة تسويق سياحي رقمية تقدم خدمات إعلامية وترويجية للأنشطة السياحية في منطقة عسير" />
    <meta property="og:image" content="{{ asset('images/logo-full.png') }}" />
    <meta property="og:url" content="{{ url('/') }}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="الرئيسية | Events Square" />
    <meta name="twitter:description" content="منصة تسويق سياحي رقمية تقدم خدمات إعلامية وترويجية للأنشطة السياحية في منطقة عسير" />
    <meta name="twitter:image" content="{{ asset('images/logo-full.png') }}" />
@endsection

@section('content')
@include('home-page-content-final')
@endsection
