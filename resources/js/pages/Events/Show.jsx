import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import EventCard from '@/components/site/EventCard';
import { SectionHeader, Cover } from '@/components/site/ui';

const STATUS = {
    upcoming: { label: 'قادمة', cls: 'bg-[#f59e0b]/95' },
    ongoing: { label: 'مستمر الآن', cls: 'bg-[#16a34a]/95' },
    ended: { label: 'انتهت', cls: 'bg-[#4b5563]/95' },
};

export default function EventShow({ event, relatedEvents }) {
    const { settings } = usePage().props;
    const status = STATUS[event.status] || STATUS.upcoming;

    // رقم الواتساب يُقرأ من الإعدادات (settings.whatsapp) — نفس المفتاح في Footer/Contact
    const whatsappNumber = (settings?.whatsapp || '+966500000000').replace(/\D/g, '');
    const bookingMsg = encodeURIComponent(`مرحبا، أود الحجز لفعالية: ${event.name}`);
    const waBookingLink = `https://wa.me/${whatsappNumber}?text=${bookingMsg}`;
    const date = event.starts_at
        ? new Date(event.starts_at).toLocaleDateString('ar-SA-u-ca-gregory', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : null;
    const time = event.starts_at
        ? new Date(event.starts_at).toLocaleTimeString('ar-SA-u-ca-gregory', { hour: '2-digit', minute: '2-digit' })
        : null;
    const endDate = event.ends_at
        ? new Date(event.ends_at).toLocaleDateString('ar-SA-u-ca-gregory', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;

    const infoRows = [
        event.category && { icon: 'fa-solid fa-tag', label: 'الفئة', value: event.category.name },
        date && { icon: 'fa-solid fa-calendar', label: 'التاريخ', value: date },
        time && { icon: 'fa-solid fa-clock', label: 'الوقت', value: time, ltr: true },
        endDate && { icon: 'fa-solid fa-flag-checkered', label: 'تاريخ الانتهاء', value: endDate },
        event.city?.name && { icon: 'fa-solid fa-city', label: 'المدينة', value: event.city.name },
        event.venue && { icon: 'fa-solid fa-location-dot', label: 'المكان', value: event.venue },
    ].filter(Boolean);

    return (
        <>
            <Head title={event.name} />

            <section className="relative h-[420px] overflow-hidden">
                <Cover src={event.cover_url} alt={event.name} eager className="absolute inset-0 h-full w-full object-cover" fallbackIcon="fa-solid fa-calendar-star" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(13,46,28,0.94) 0%, rgba(13,46,28,0.45) 45%, rgba(13,46,28,0.15) 100%)' }}
                />
                <div className="absolute inset-0">
                    <div className="container flex h-full flex-col justify-end pb-9">
                        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/80">
                            <Link href={route('home')} className="transition hover:text-white">الرئيسية</Link>
                            <span>‹</span>
                            <Link href={route('events.index')} className="transition hover:text-white">الفعاليات</Link>
                            <span>‹</span>
                            <span className="font-bold text-white">{event.name}</span>
                        </nav>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg ${status.cls}`}>
                                <i className="fa-solid fa-circle text-[7px]" />
                                {status.label}
                            </span>
                            {event.category && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/95 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                    <i className="fa-solid fa-tag text-[11px]" />
                                    {event.category.name}
                                </span>
                            )}
                        </div>
                        <h1 className="mt-3 text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl">{event.name}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-white/85">
                            {date && (
                                <span className="inline-flex items-center gap-1.5">
                                    <i className="fa-solid fa-calendar text-[#fcd34d]" />
                                    {date}
                                </span>
                            )}
                            {(event.venue || event.city?.name) && (
                                <span className="inline-flex items-center gap-1.5">
                                    <i className="fa-solid fa-location-dot text-[#fcd34d]" />
                                    {[event.venue, event.city?.name].filter(Boolean).join('، ')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <span className="section-tag">✦ عن الفعالية</span>
                            <h2 className="mb-5 mt-4 text-2xl font-extrabold text-[#134527]">تفاصيل الفعالية</h2>
                            <p className="whitespace-pre-line text-[15px] leading-9 text-[#4b5563]">
                                {event.description || 'لا يوجد وصف متاح لهذه الفعالية حالياً.'}
                            </p>
                        </div>

                        <aside className="self-start lg:sticky lg:top-32">
                            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                <h3 className="mb-6 flex items-center gap-2 border-b-2 border-[#D92315] pb-4 text-lg font-extrabold text-[#134527]">
                                    <i className="fa-solid fa-circle-info text-[#D92315]" />
                                    معلومات سريعة
                                </h3>
                                <dl className="space-y-3">
                                    {infoRows.map((row) => (
                                        <div key={row.label} className="flex items-start justify-between gap-4 rounded-xl bg-[#f9fafb] px-4 py-3">
                                            <dt className="flex shrink-0 items-center gap-2 text-xs text-[#6b7280]">
                                                <i className={`${row.icon} text-[13px] text-[#16a34a]`} />
                                                {row.label}
                                            </dt>
                                            <dd className="min-w-0 text-end text-sm font-bold text-[#1f2937]" dir={row.ltr ? 'ltr' : undefined}>
                                                {row.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#134527] to-[#124557] p-7 text-center text-white">
                                <i className="fa-solid fa-ticket text-3xl text-[#fcd34d]" />
                                <p className="mt-3 text-lg font-extrabold">هل أنت مستعد للحضور؟</p>
                                <p className="mt-1.5 text-sm leading-relaxed text-white/75">تابعنا على وسائل التواصل لمعرفة مواعيد الحجز والتذاكر</p>
                                <a
                                    href={waBookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-bold text-white transition hover:bg-[#1fb457]"
                                >
                                    <i className="fa-brands fa-whatsapp text-lg" />
                                    تواصل / احجز عبر واتساب
                                </a>
                                <Link
                                    href={route('events.index')}
                                    className="mt-3 inline-flex h-11 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-bold text-white/90 transition hover:bg-white/10"
                                >
                                    استعرض كل الفعاليات
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {relatedEvents?.length > 0 && (
                <section className="section alt">
                    <div className="container">
                        <SectionHeader tag="لا تفوّتها" title="فعاليات أخرى" description="فعاليات ومهرجانات أخرى قد تهمك" />
                        <div className="card-grid-sm">
                            {relatedEvents.map((item) => (
                                <EventCard key={item.id} event={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

EventShow.layout = (page) => <AppLayout>{page}</AppLayout>;
