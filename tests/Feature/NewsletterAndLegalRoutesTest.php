<?php

namespace Tests\Feature;

use App\Models\NewsletterSubscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * اختبارات الدخان (Smoke) لموجة صفحات الشروط/السياسة + النشرة الإخبارية
 * (موجة إصلاحات المجتمع 2026-08-29).
 *
 * القاعدة: SQLite `:memory:` مهاجرة بالكامل لكل اختبار عبر RefreshDatabase.
 */
class NewsletterAndLegalRoutesTest extends TestCase
{
    use RefreshDatabase;

    // ——— صفحات الشروط والسياسة ———

    public function test_privacy_policy_page_returns_successful_response(): void
    {
        $this->get('/privacy-policy')->assertOk();
    }

    public function test_terms_page_returns_successful_response(): void
    {
        $this->get('/terms')->assertOk();
    }

    // ——— النشرة الإخبارية ———

    public function test_newsletter_subscribe_persists_email(): void
    {
        $this->post('/newsletter/subscribe', ['email' => 'Seeker@Example.SA'])
            ->assertRedirect();

        $this->assertDatabaseHas('newsletter_subscribers', ['email' => 'seeker@example.sa']);
        $this->assertSame(1, NewsletterSubscriber::count());
    }

    public function test_newsletter_subscribe_rejects_invalid_email(): void
    {
        $this->post('/newsletter/subscribe', ['email' => 'not-an-email'])
            ->assertSessionHasErrors('email');

        $this->assertSame(0, NewsletterSubscriber::count());
    }

    public function test_newsletter_subscribe_rejects_duplicate_email(): void
    {
        NewsletterSubscriber::create(['email' => 'already@example.sa']);

        $this->post('/newsletter/subscribe', ['email' => 'ALREADY@example.sa'])
            ->assertSessionHasErrors('email');

        $this->assertSame(1, NewsletterSubscriber::count());
    }

    public function test_contact_store_still_persists_message(): void
    {
        $this->post('/contact-us', [
            'name' => 'مختبر',
            'email' => 'tester@example.sa',
            'subject' => 'استفسار',
            'message' => 'رسالة تجريبية من اختبارات الدخان.',
        ])->assertRedirect()->assertSessionHas('success');

        $this->assertDatabaseHas('contacts', ['email' => 'tester@example.sa']);
    }
}