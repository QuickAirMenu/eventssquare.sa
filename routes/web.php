<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\CityController as AdminCityController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\ListingController as AdminListingController;
use App\Http\Controllers\Admin\OfferController as AdminOfferController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

// ——— المسارات العامة (إنجليزية) ———

Route::get('/destinations', [ListingController::class, 'index'])->name('listings.index');
Route::get('/listings/{listing:slug}', [ListingController::class, 'show'])->name('listings.show');

Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{event:slug}', [EventController::class, 'show'])->name('events.show');

Route::get('/offers', [OfferController::class, 'index'])->name('offers.index');

Route::get('/activities', [ListingController::class, 'activities'])->name('activities.index');

Route::get('/discover-asir', [HomeController::class, 'discover'])->name('discover');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/sales', [PageController::class, 'sales'])->name('sales');
Route::get('/contact-us', [PageController::class, 'contact'])->name('contact');
Route::post('/contact-us', [ContactController::class, 'store'])->middleware('throttle:3,10')->name('contact.store');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->middleware('throttle:5,1')->name('login.store');

    Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1')->name('register.store');
});

Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::resource('listings', AdminListingController::class);
    Route::resource('events', AdminEventController::class);
    Route::resource('offers', AdminOfferController::class);
    Route::resource('categories', AdminCategoryController::class);
    Route::resource('cities', AdminCityController::class)->except(['create', 'edit']);
    Route::resource('testimonials', TestimonialController::class)->except(['create', 'edit']);
    Route::resource('contacts', AdminContactController::class)->only(['index', 'show', 'destroy']);
    Route::resource('users', UserController::class)->only(['index', 'update', 'destroy'])->middleware('role:admin');
    Route::get('settings', [SettingController::class, 'edit'])->middleware('role:admin')->name('settings.edit');
    Route::put('settings', [SettingController::class, 'update'])->middleware('role:admin')->name('settings.update');
});

// فئات الوجهات — مسار إنجليزي صريح (لا يبتلع المسارات الثابتة أعلاه)
Route::get('/categories/{category:slug}', [ListingController::class, 'byCategory'])->name('listings.category');

// ——— إعادة توجيه دائمة (301) من الروابط العربية القديمة ———
// (GET فقط — المواقع القديمة لا تنشر POST)
// (Route::redirect تستعمل RedirectController القابل للتعمية — آمنة مع route:cache)
Route::redirect('/الوجهات', '/destinations', 301);
Route::redirect('/فعاليات-ومهرجانات', '/events', 301);
Route::redirect('/العروض-والاعلانات', '/offers', 301);
Route::redirect('/أنشطة-وتجارب', '/activities', 301);
Route::redirect('/تسجيل-دخول', '/login', 301);
Route::redirect('/انشاء-حساب', '/register', 301);

// فئات الوجهات القديمة — من السلاغ العربي إلى المسار الإنجليزي الجديد
Route::redirect('/قصور-وقرى-تراثية', '/categories/palaces-heritage-villages', 301);
Route::redirect('/معالم-ومنتزهات', '/categories/landmarks-parks', 301);
Route::redirect('/متاحف-وأسواق-شعبية', '/categories/museums-souks', 301);
Route::redirect('/الإقامة-والتسوق', '/categories/stay-shopping', 301);
Route::redirect('/مأكولات-ومشروبات', '/categories/food-drinks', 301);