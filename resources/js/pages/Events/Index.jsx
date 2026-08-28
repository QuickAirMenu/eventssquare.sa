import { useRef, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
    const filters = usePage().props.filters ?? {};
    const activeStatus = filters.status ?? 'all';
    const activeSearch = filters.search ?? '';

    const rows = Array.isArray(events) ? events : events?.data ?? [];
    const paginator = Array.isArray(events) ? null : events;

    // تحويل تبويبات الفعاليات إلى فلترة خادمية (وليس عميلية) ليتوافق مع الترقيم
    const selectTab = (value) => {
        router.get(
            route('events.index'),
            { ...(value !== 'all' ? { status: value } : {}), ...(activeSearch ? { search: activeSearch } : {}) },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // حقل بحث مع debounce خفيف (~350ms)
    const [searchInput, setSearchInput] = useState(activeSearch);
    const searchTimer = useRef(null);
    const onSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            router.get(
                route('events.index'),
                { search: value || undefined, ...(activeStatus !== 'all' ? { status: activeStatus } : {}) },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 350);
    };

    return (
        <>
            <Head title="الفعاليات والمهرجانات">
                <meta name="description" content="تصفح فعاليات ومهرجانات عسير القادمة والمستمرة — حفلات ومعارض وأنشطة موسمية تنتظرك على مدار العام في منطقة عسير." />
            </Head>

            <section className="page-hero">
                <div className="container">
                    <h1>الفعاليات والمهرجانات</h1>
                    <p>استعد لتجارب وفعاليات عسير القادمة حيث تنتظرك لحظات لا تُنسى على مدار العام</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() => selectTab(tab.value)}
                                className={`filter-btn ${activeStatus === tab.value ? 'active' : ''}`}
                            >
                                <i className={`${tab.icon} text-[13px]`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mx-auto mb-12 max-w-xl">
                        <div className="relative">
                            <i className="fa-solid fa-magnifying-glass pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                            <input
                                type="search"
                                dir="rtl"
                                value={searchInput}
                                onChange={onSearch}
                                placeholder="ابحث في الفعاليات والمهرجانات"
                                className="w-full rounded-full border-2 border-[#e5e7eb] bg-white py-3.5 pr-11 pl-5 text-[15px] text-[#1f2937] shadow-[0_10px_30px_rgba(0,0,0,0.05)] outline-none transition focus:border-[#16a34a]"
                            />
                        </div>
                    </div>

                    {rows.length > 0 ? (
                        <>
                            <div className="card-grid-sm">
                                {rows.map((event) => (
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
