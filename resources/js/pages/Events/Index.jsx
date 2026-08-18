import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import EventCard from '@/components/site/EventCard';
import Pagination from '@/components/site/Pagination';

const TABS = [
    { value: 'all', label: 'الكل', icon: 'fa-solid fa-globe' },
    { value: 'upcoming', label: 'قادمة', icon: 'fa-solid fa-hourglass-start' },
    { value: 'ongoing', label: 'مستمرة', icon: 'fa-solid fa-play' },
    { value: 'ended', label: 'انتهت', icon: 'fa-solid fa-circle-check' },
];

export default function EventsIndex({ events }) {
    const [status, setStatus] = useState('all');
    const rows = Array.isArray(events) ? events : events?.data ?? [];
    const paginator = Array.isArray(events) ? null : events;
    const filtered = status === 'all' ? rows : rows.filter((e) => e.status === status);

    return (
        <>
            <Head title="الفعاليات والمهرجانات" />

            <section className="page-hero">
                <div className="container">
                    <h1>الفعاليات والمهرجانات</h1>
                    <p>استعد لتجارب وفعاليات عسير القادمة حيث تنتظرك لحظات لا تُنسى على مدار العام</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => setStatus(tab.value)}
                                className={`filter-btn ${status === tab.value ? 'active' : ''}`}
                            >
                                <i className={`${tab.icon} text-[13px]`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {filtered.length > 0 ? (
                        <>
                            <div className="card-grid-sm">
                                {filtered.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                            <Pagination paginator={paginator} />
                        </>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-20 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.08)] text-[#16a34a]">
                                <i className="fa-solid fa-calendar-days text-3xl" />
                            </span>
                            <h3 className="text-xl font-extrabold text-[#134527]">لا توجد فعاليات ضمن هذا التصنيف حالياً</h3>
                            <p className="mt-2 text-sm text-[#6b7280]">ترقب فعالياتنا القادمة قريباً</p>
                            <Link href={route('home')} className="btn-primary mt-8 inline-block text-base">
                                العودة إلى الرئيسية
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

EventsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
