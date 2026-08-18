import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import OfferCard from '@/components/site/OfferCard';
import { SectionHeader } from '@/components/site/ui';

export default function OffersIndex({ offers }) {
    const rows = Array.isArray(offers) ? offers : offers?.data ?? [];

    return (
        <>
            <Head title="العروض والإعلانات" />

            <section className="page-hero">
                <div className="container">
                    <h1>العروض والإعلانات</h1>
                    <p>اكتشف المزيد من العروض والخدمات التي تجعلك دائماً على اطلاع بكل جديد في المنطقة</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {rows.length > 0 ? (
                        <div className="card-grid-sm">
                            {rows.map((offer) => (
                                <OfferCard key={offer.id} offer={offer} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-20 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(22,163,74,0.08)] text-[#16a34a]">
                                <i className="fa-solid fa-bullhorn text-3xl" />
                            </span>
                            <h3 className="text-xl font-extrabold text-[#134527]">لا توجد عروض حالياً</h3>
                            <p className="mt-2 text-sm text-[#6b7280]">ترقب عروضنا وإعلاناتنا الجديدة قريباً</p>
                            <Link href={route('home')} className="btn-primary mt-8 inline-block text-base">
                                العودة إلى الرئيسية
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="section sand">
                <div className="container">
                    <SectionHeader
                        tag="فرصة للوصول"
                        title="هل تملك نشاطاً تجارياً في عسير؟"
                        description="اعرض عروضك وإعلاناتك أمام آلاف الزوار المهتمين بالسياحة والفعاليات في منطقة عسير"
                    />
                    <div className="text-center">
                        <Link href={route('sales')} className="btn-primary inline-flex items-center gap-2 text-base">
                            <i className="fa-solid fa-bullhorn" />
                            أعلن معنا
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

OffersIndex.layout = (page) => <AppLayout>{page}</AppLayout>;
