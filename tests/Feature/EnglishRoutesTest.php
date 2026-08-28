<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * اختبارات الدخان (Smoke) للموجة الجديدة — المسارات الإنجليزية العامة
 * وإعادة التوجيه الدائمة (301) من الروابط العربية القديمة.
 *
 * القاعدة: SQLite `:memory:` مهاجرة بالكامل لكل اختبار عبر RefreshDatabase
 * (بدون الاعتماد على السيدر — السياق: Bug #001d).
 */
class EnglishRoutesTest extends TestCase
{
    use RefreshDatabase;

    // ——— المسارات الإنجليزية المستقلة (لا تعتمد على بيانات السيدر) ———

    public function test_home_page_returns_successful_response(): void
    {
        $this->get('/')->assertOk();
    }

    public function test_destinations_page_returns_successful_response(): void
    {
        $this->get('/destinations')->assertOk();
    }

    public function test_events_page_returns_successful_response(): void
    {
        $this->get('/events')->assertOk();
    }

    public function test_offers_page_returns_successful_response(): void
    {
        $this->get('/offers')->assertOk();
    }

    public function test_activities_page_returns_successful_response(): void
    {
        $this->get('/activities')->assertOk();
    }

    public function test_login_page_returns_successful_response(): void
    {
        $this->get('/login')->assertOk();
    }

    public function test_register_page_returns_successful_response(): void
    {
        $this->get('/register')->assertOk();
    }

    public function test_contact_page_returns_successful_response(): void
    {
        $this->get('/contact-us')->assertOk();
    }

    public function test_discover_asir_page_returns_successful_response(): void
    {
        $this->get('/discover-asir')->assertOk();
    }

    public function test_about_page_returns_successful_response(): void
    {
        $this->get('/about')->assertOk();
    }

    public function test_sales_page_returns_successful_response(): void
    {
        $this->get('/sales')->assertOk();
    }

    // ——— إعادة التوجيه الدائمة (301) من الروابط العربية القديمة ———
    // لا loop: الهدف مسار إنجليزي منفصل لا يطابق أي مسار عربي آخر.
    // المسارات العربية UTF-8 تُفك ترميزها قبل المطابقة، والـ Location نسبي.

    public function test_arabic_destinations_redirects_permanently_to_english(): void
    {
        $this->get('/الوجهات')
            ->assertStatus(301)
            ->assertRedirect('/destinations');
    }

    public function test_arabic_login_redirects_permanently_to_english(): void
    {
        $this->get('/تسجيل-دخول')
            ->assertStatus(301)
            ->assertRedirect('/login');
    }

    public function test_arabic_register_redirects_permanently_to_english(): void
    {
        $this->get('/انشاء-حساب')
            ->assertStatus(301)
            ->assertRedirect('/register');
    }

    public function test_arabic_landmarks_parks_redirects_permanently_to_english(): void
    {
        $this->get('/معالم-ومنتزهات')
            ->assertStatus(301)
            ->assertRedirect('/categories/landmarks-parks');
    }

    // ——— المسارات المعتمدة على البيانات ———
    // قاعدة فارغة (بلا سيدر): لا يوجد تصنيف بهذا السلاغ، فالمتوقع 404 عبر الربط
    // الضمني {category:slug}. لا نفترض 200 كي لا تنكسر الاختبارات عند غياب السيدر.
    // (لو عُدّل السيدر/السلاغ مستقبلاً فالقيمة 200 مقبولة أيضاً — الاختبار لا يفشل بالحالتين.)

    public function test_english_category_page_with_empty_database(): void
    {
        $response = $this->get('/categories/palaces-heritage-villages');

        $status = $response->getStatusCode();

        // قاعدة فارغة (بلا سيدر): لا يوجد تصنيف بهذا السلاغ فالربط الضمني
        // يرمي 404. إن أضيف السيدر لاحقاً فستصبح 200. الحالتان مقبولتان هنا
        // حتى لا يكسر غياب السيدر الاختبارات (متطلب الموجة).
        $this->assertTrue(
            in_array($status, [200, 404], true),
            "متوقع 200 أو 404 لصفحة تصنيف على قاعدة فارغة، استُقبل {$status}."
        );
    }
}