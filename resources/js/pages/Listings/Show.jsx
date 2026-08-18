import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import DestinationCard from '@/components/site/DestinationCard';
import { SectionHeader, Cover } from '@/components/site/ui';

export default function ListingShow({ listing, related }) {
    const gallery = listing.gallery ?? [];
    const price = listing.price_halalas ? `${(listing.price_halalas / 100).toLocaleString('ar-SA-u-ca-gregory')} ريال` : null;
    const mapUrl = listing.latitude && listing.longitude
        ? `https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`
        : null;

    const infoRows = [
        listing.category && { icon: 'fa-solid fa-tag', label: 'الفئة', value: listing.category.name },
        listing.city && { icon: 'fa-solid fa-city', label: 'المدينة', value: listing.city.name },
        listing.address && { icon: 'fa-solid fa-location-dot', label: 'العنوان', value: listing.address },
        listing.phone && { icon: 'fa-solid fa-phone', label: 'الهاتف', value: listing.phone, href: `tel:${listing.phone}`, ltr: true },
        listing.website && { icon: 'fa-solid fa-globe', label: 'الموقع الإلكتروني', value: listing.website, href: listing.website, ltr: true },
        price && { icon: 'fa-solid fa-ticket', label: 'السعر يبدأ من', value: price },
        mapUrl && { icon: 'fa-solid fa-map-location-dot', label: 'الموقع', value: 'عرض على الخريطة', href: mapUrl },
    ].filter(Boolean);

    return (
        <>
            <Head title={listing.name} />

            <section className="relative h-[420px] overflow-hidden">
                <Cover src={listing.cover_url} alt={listing.name} className="absolute inset-0 h-full w-full object-cover" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(13,46,28,0.94) 0%, rgba(13,46,28,0.45) 45%, rgba(13,46,28,0.15) 100%)' }}
                />
                <div className="absolute inset-0">
                    <div className="container flex h-full flex-col justify-end pb-9">
                        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/80">
                            <Link href={route('home')} className="transition hover:text-white">الرئيسية</Link>
                            <span>‹</span>
                            {listing.category && (
                                <>
                                    <Link href={route('listings.category', listing.category.slug)} className="transition hover:text-white">
                                        {listing.category.name}
                                    </Link>
                                    <span>‹</span>
                                </>
                            )}
                            <span className="font-bold text-white">{listing.name}</span>
                        </nav>
                        <div className="flex flex-wrap items-center gap-3">
                            {listing.category && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/95 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                    <i className="fa-solid fa-tag text-[11px]" />
                                    {listing.category.name}
                                </span>
                            )}
                            {listing.is_featured && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16a34a]/95 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                    <i className="fa-solid fa-star text-[11px]" />
                                    وجهة مميزة
                                </span>
                            )}
                        </div>
                        <h1 className="mt-3 text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl">{listing.name}</h1>
                        <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-white/85">
                            {listing.city?.name && (
                                <span className="inline-flex items-center gap-1.5">
                                    <i className="fa-solid fa-location-dot text-[#fcd34d]" />
                                    {listing.city.name}
                                </span>
                            )}
                            {listing.address && (
                                <span className="inline-flex items-center gap-1.5">
                                    <i className="fa-solid fa-house text-[#fcd34d]" />
                                    {listing.address}
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
                            <span className="section-tag">✦ عن الوجهة</span>
                            <h2 className="mb-5 mt-4 text-2xl font-extrabold text-[#134527]">نبذة تعريفية</h2>
                            <p className="whitespace-pre-line text-[15px] leading-9 text-[#4b5563]">
                                {listing.description || listing.summary || 'لا يوجد وصف متاح لهذه الوجهة حالياً.'}
                            </p>

                            {gallery.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-[#134527]">
                                        <i className="fa-solid fa-images text-[#D92315]" />
                                        معرض الصور
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {gallery.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`${listing.name} — صورة ${i + 1}`}
                                                loading="lazy"
                                                className="h-32 w-full rounded-2xl object-cover transition duration-500 hover:scale-[1.03]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="self-start lg:sticky lg:top-32">
                            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                                <h3 className="mb-6 flex items-center gap-2 border-b-2 border-[#D92315] pb-4 text-lg font-extrabold text-[#134527]">
                                    <i className="fa-solid fa-circle-info text-[#D92315]" />
                                    معلومات الوجهة
                                </h3>
                                <dl className="space-y-3">
                                    {infoRows.map((row) => (
                                        <div key={row.label} className="flex items-center justify-between gap-4 rounded-xl bg-[#f9fafb] px-4 py-3">
                                            <dt className="flex shrink-0 items-center gap-2 text-xs text-[#6b7280]">
                                                <i className={`${row.icon} text-[13px] text-[#16a34a]`} />
                                                {row.label}
                                            </dt>
                                            <dd className="min-w-0 text-sm font-bold text-[#1f2937]">
                                                {row.href ? (
                                                    <a
                                                        href={row.href}
                                                        target={row.href.startsWith('http') ? '_blank' : undefined}
                                                        rel="noreferrer"
                                                        dir={row.ltr ? 'ltr' : undefined}
                                                        className="block truncate transition hover:text-[#16a34a]"
                                                    >
                                                        {row.value}
                                                    </a>
                                                ) : (
                                                    row.value
                                                )}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                <div className="mt-7 space-y-2.5">
                                    {listing.phone && (
                                        <a
                                            href={`tel:${listing.phone}`}
                                            className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#1f7045] text-sm font-bold text-white transition hover:bg-[#134527]"
                                        >
                                            <i className="fa-solid fa-phone text-xs" />
                                            اتصل الآن
                                        </a>
                                    )}
                                    {listing.website && (
                                        <a
                                            href={listing.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#e5e7eb] text-sm font-bold text-[#1f2937] transition hover:border-[#16a34a] hover:text-[#16a34a]"
                                        >
                                            <i className="fa-solid fa-globe text-xs" />
                                            زيارة الموقع الإلكتروني
                                        </a>
                                    )}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {related?.length > 0 && (
                <section className="section alt">
                    <div className="container">
                        <SectionHeader tag="اكتشف المزيد" title="وجهات مشابهة" description="وجهات أخرى قد تعجبك ضمن نفس الفئة" />
                        <div className="card-grid-sm">
                            {related.map((item) => (
                                <DestinationCard key={item.id} listing={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

ListingShow.layout = (page) => <AppLayout>{page}</AppLayout>;
