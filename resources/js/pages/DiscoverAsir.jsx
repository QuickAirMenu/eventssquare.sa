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

// تعيين الفلاتر إلى تصنيفات الوجهات الخمس المعروفة (بـ slug).
// جبلية ← معالم/منتزهات + مأكولات ومشروبات (أماكن طبيعية وتجارب محلية)
// ساحلية ← إقامة وتسوق + مأكولات ومشروبات (استجمام وضيافة)
// تاريخية ← قصور وقرى تراثية + متاحف وأسواق شعبية (تراث وثقافة)
const FILTER_MAP = {
    mountain: ['landmarks-parks', 'food-drinks'],
    coastal: ['stay-shopping', 'food-drinks'],
    heritage: ['palaces-heritage-villages', 'museums-souks'],
};

const matchesFilter = (listing, key) => {
    const cat = listing?.category;
    const slug = cat?.slug ?? '';
    const name = cat?.name ?? '';
    if (FILTER_MAP[key]?.includes(slug)) return true;
    // fallback مرن على الاسم/الـ slug (محمي بـ optional chaining) لأي تصنيف مستقبلي
    if (key === 'mountain' && (/جبل|منتزه|طبيع|مرتفع/i.test(name) || /jabal|park|mountain/i.test(slug))) return true;
    if (key === 'coastal' && (/ساحل|شاطئ/i.test(name) || /coast|beach|sea/i.test(slug))) return true;
    if (key === 'heritage' && (/تراث|تاريخ|متاحف|قصر|أسواق/i.test(name) || /heritage|histor|museum|qasr/i.test(slug))) return true;
    return false;
};

export default function DiscoverAsir({ heritageListings, listings: fullListings }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const pageProps = usePage().props;

    // Wolf يمرر قائمة listings كاملة (بالفئة category) — نعتمدها، مع مرونة عند غيابها
    const listings = fullListings ?? pageProps.listings ?? heritageListings ?? pageProps.heritageListings ?? [];

    const filtered = activeFilter === 'all' ? listings : listings.filter((l) => matchesFilter(l, activeFilter));

    return (
        <>
            <Head title="استكشف عسير">
                <meta name="description" content="استكشف عسير — جبال وسواحل وتراث في تجربة واحدة. تصفح الوجهات الجبلية والتاريخية والوجهات الساحلية وخطط لرحلتك القادمة." />
            </Head>

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

                    {filtered.length > 0 ? (
                        <div className="card-grid-sm">
                            {filtered.map((listing) => (
                                <DestinationCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-20 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.08)] text-[#16a34a]">
                                <i className="fa-solid fa-map-location-dot text-3xl" />
                            </span>
                            <h3 className="text-xl font-extrabold text-[#134527]">لا توجد وجهات في هذا التصنيف</h3>
                            <p className="mt-2 text-sm text-[#6b7280]">جرّب اختيار تصنيف آخر أو ترقب إضافة وجهات جديدة قريباً</p>
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
