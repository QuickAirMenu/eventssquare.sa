import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import DestinationCard from '@/components/site/DestinationCard';
import { SectionHeader } from '@/components/site/ui';

const filters = [
    { key: 'all', label: 'الكل', icon: 'fa-solid fa-globe' },
    { key: 'mountain', label: 'جبلية', icon: 'fa-solid fa-mountain-sun' },
    { key: 'coastal', label: 'ساحلية', icon: 'fa-solid fa-umbrella-beach' },
    { key: 'heritage', label: 'تاريخية', icon: 'fa-solid fa-landmark' },
];

export default function DiscoverAsir({ heritageListings }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const pageProps = usePage().props;

    const listings = heritageListings ?? pageProps.heritageListings ?? [];

    return (
        <>
            <Head title="استكشف عسير" />

            <section className="page-hero">
                <div className="container">
                    <h1>استكشف عسير</h1>
                    <p>الطبيعة والثقافة والمغامرة — وجهة متكاملة من الجمال التاريخي والتنوع الثقافي بين جبال عسير وسواحلها.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                type="button"
                                className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f.key)}
                            >
                                <i className={`${f.icon} text-[13px]`} />
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {listings.length > 0 ? (
                        <div className="card-grid-sm">
                            {listings.map((listing) => (
                                <DestinationCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-20 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.08)] text-[#16a34a]">
                                <i className="fa-solid fa-map-location-dot text-3xl" />
                            </span>
                            <h3 className="text-xl font-extrabold text-[#134527]">لا توجد وجهات بعد</h3>
                            <p className="mt-2 text-sm text-[#6b7280]">ترقب إضافة وجهات جديدة قريباً</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="section sand">
                <div className="container">
                    <SectionHeader
                        tag="الخطوة التالية"
                        title="جاهز تستكشف وجهات عسير بنفسك؟"
                        description="تصفح دليل الوجهات الكامل — قصور تراثية، منتزهات، مطاعم وأكثر — واختر ما يناسب رحلتك القادمة."
                    />
                    <div className="text-center">
                        <Link href={route('listings.index')} className="btn-primary">
                            تصفح دليل الوجهات
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

DiscoverAsir.layout = (page) => <AppLayout>{page}</AppLayout>;
