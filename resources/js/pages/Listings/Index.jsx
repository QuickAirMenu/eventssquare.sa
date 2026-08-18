import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import DestinationCard from '@/components/site/DestinationCard';
import Pagination from '@/components/site/Pagination';

const CAT_ICONS = {
    castle: 'fa-solid fa-chess-rook',
    tree: 'fa-solid fa-tree',
    museum: 'fa-solid fa-landmark',
    bed: 'fa-solid fa-bed',
    utensils: 'fa-solid fa-utensils',
};

export default function ListingsIndex({ listings, categories, category = null, activeCategory = null }) {
    const current = activeCategory || category;
    const rows = Array.isArray(listings) ? listings : listings?.data ?? [];
    const paginator = Array.isArray(listings) ? null : listings;

    return (
        <>
            <Head title={current ? `${current.name} — الوجهات` : 'الوجهات السياحية'} />

            <section className="page-hero">
                <div className="container">
                    <h1>{current ? current.name : 'الوجهات السياحية'}</h1>
                    <p>
                        {current
                            ? `استكشف أجمل ${current.name} في منطقة عسير بين الطبيعة والتاريخ والثقافة`
                            : 'استكشف أجمل المعالم السياحية والتراثية والوجهات المتنوعة في منطقة عسير'}
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
                        <Link
                            href={route('listings.index')}
                            className={`filter-btn ${!current ? 'active' : ''}`}
                        >
                            <i className="fa-solid fa-globe text-[13px]" />
                            الكل
                        </Link>
                        {categories?.map((c) => (
                            <Link
                                key={c.id}
                                href={route('listings.category', c.slug)}
                                className={`filter-btn ${current?.slug === c.slug ? 'active' : ''}`}
                            >
                                <i className={`${CAT_ICONS[c.icon] || 'fa-solid fa-tag'} text-[13px]`} />
                                {c.name}
                            </Link>
                        ))}
                    </div>

                    {rows.length > 0 ? (
                        <>
                            <div className="card-grid-sm">
                                {rows.map((listing) => (
                                    <DestinationCard key={listing.id} listing={listing} />
                                ))}
                            </div>
                            <Pagination paginator={paginator} />
                        </>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-20 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.08)] text-[#16a34a]">
                                <i className="fa-solid fa-map-location-dot text-3xl" />
                            </span>
                            <h3 className="text-xl font-extrabold text-[#134527]">لا توجد وجهات في هذه الفئة بعد</h3>
                            <p className="mt-2 text-sm text-[#6b7280]">ترقب إضافة وجهات جديدة قريباً</p>
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

ListingsIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
