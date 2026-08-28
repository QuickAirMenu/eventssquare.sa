import { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { SectionHeader } from '@/components/site/ui';
import DestinationCard from '@/components/site/DestinationCard';
import EventCard from '@/components/site/EventCard';
import OfferCard from '@/components/site/OfferCard';

function RowSlider({ items, render }) {
    const [offset, setOffset] = useState(0);
    const max = Math.max(0, items.length - 4);
    const move = (dir) => setOffset((o) => Math.min(max, Math.max(0, o + dir)));

    return (
        <div className="slider-wrap" style={{ overflow: 'hidden' }}>
            <div
                className="slider-track"
                style={{ transform: `translateX(calc(${offset} * (100% + 26px) / 4))` }}
            >
                {items.map((item, i) => render(item, i))}
            </div>
            <div className="slider-nav">
                <button type="button" className="slider-btn" onClick={() => move(-1)}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" className="slider-btn" onClick={() => move(1)}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}

export default function Home({
    featuredListings = [],
    stayListings = [],
    foodListings = [],
    landmarkListings = [],
    heritageListings = [],
    upcomingEvents = [],
    offers = [],
    testimonials = [],
    newsletterEnabled = true,
}) {
    const [heroIndex, setHeroIndex] = useState(0);
    const [tIndex, setTIndex] = useState(0);
    const [nlEmail, setNlEmail] = useState('');
    const [nlDone, setNlDone] = useState(false);

    const heroSlides = [
        {
            image: '/img/hero-01.jpeg',
            kicker: 'أهلاً بعسير',
            pre: 'حيث تلتقي السحب بالجبال تبدأ حكاية ',
            word: 'عسير',
            post: '',
            buttons: [
                { label: 'ابدأ الرحلة الآن', href: route('listings.index'), primary: true },
                { label: 'استكشف الوجهات', href: route('listings.index') },
            ],
        },
        {
            image: '/img/hero-02.jpeg',
            kicker: 'تراثٌ يتحدث',
            pre: 'عبق ',
            word: 'التاريخ',
            post: ' في قصور عسير العريقة',
            buttons: [
                { label: 'رحلة إلى الماضي', href: route('listings.category', 'palaces-heritage-villages'), primary: true },
            ],
        },
        {
            image: '/img/hero-03.jpeg',
            kicker: 'لحظات لا تُنسى',
            pre: 'مغامرات وفعاليات ',
            word: 'لا تُنسى',
            post: ' في قلب عسير',
            buttons: [
                { label: 'تصفح الفعاليات', href: route('events.index'), primary: true },
                { label: 'خطط تجربتك', href: route('events.index') },
            ],
        },
        {
            image: '/img/hero-04.jpeg',
            kicker: 'أصالة الجبال',
            pre: 'بين ',
            word: 'الجبال',
            post: ' والضباب ترتسم لوحة عسير',
            buttons: [
                { label: 'اكتشف الطبيعة', href: route('discover'), primary: true },
                { label: 'الوجهات', href: route('listings.index') },
            ],
        },
        {
            image: '/img/hero-05.jpeg',
            kicker: 'نكهة الجنوب',
            pre: 'أصالة ',
            word: 'المطبخ',
            post: ' العسيري بنكهة لا تُنسى',
            buttons: [
                { label: 'تذوّق العسير', href: route('listings.category', 'food-drinks'), primary: true },
                { label: 'جولة المطاعم', href: route('listings.category', 'food-drinks') },
            ],
        },
        {
            image: '/img/hero-06.jpeg',
            kicker: 'موسم من البهجة',
            pre: 'فعاليات ',
            word: 'الاحتفاء',
            post: ' تزين سماء عسير',
            buttons: [
                { label: 'تصفح الفعاليات', href: route('events.index'), primary: true },
                { label: 'خطط زيارتك', href: route('events.index') },
            ],
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIndex((i) => (i + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const moveHero = (dir) => setHeroIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);

    const subscribe = (e) => {
        e.preventDefault();
        router.post(
            route('contact.store'),
            { name: 'مشترك النشرة', subject: 'اشتراك النشرة', message: 'اشتراك في النشرة البريدية', email: nlEmail },
            { onSuccess: () => setNlDone(true) }
        );
    };

    return (
        <>
            <Head title="اكتشف عسير | ساحة الفعاليات">
                <meta name="description" content="اكتشف عسير مع ساحة الفعاليات — وجهات سياحية وفعاليات ومهرجانات وعروض من أبها إلى جبال المنطقة وسواحلها في مكان واحد." />
            </Head>

            <section className="hero" id="home">
                {heroSlides.map((s, i) => (
                    <div
                        key={s.image}
                        className={`hero-slide${i === heroIndex ? ' active' : ''}`}
                        style={{ backgroundImage: `url(${s.image})` }}
                    >
                        {i === heroIndex && (
                            <div className="hero-content">
                                <span className="hero-kicker">{s.kicker}</span>
                                <h1>{s.pre}<span>{s.word}</span>{s.post}</h1>
                                <div className="hero-buttons">
                                    {s.buttons.map((b) => (
                                        <Link key={b.label} href={b.href} className={b.primary ? 'btn-primary shimmer' : 'btn-outline'}>
                                            {b.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <button type="button" className="hero-arrow next" onClick={() => moveHero(1)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                </button>
                <button type="button" className="hero-arrow prev" onClick={() => moveHero(-1)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="hero-dots">
                    {heroSlides.map((s, i) => (
                        <button
                            key={s.image}
                            type="button"
                            className={`hero-dot${i === heroIndex ? ' active' : ''}`}
                            onClick={() => setHeroIndex(i)}
                        />
                    ))}
                </div>
                <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                    <div className="mouse"><div className="wheel" /></div>
                    <div className="scroll-text">اكتشف المزيد</div>
                </div>
            </section>

            <section className="section" id="featured">
                <div className="container">
                    <SectionHeader
                        tag="وجهات مميزة"
                        title="خطط لقضاء إجازة استثنائية!"
                        description="تعرّف على أجمل الوجهات التي تمنحك تجربة متكاملة وجمالًا لا يضاهى، واختر ما يناسبك لتصنع إجازة تُحكى وتُتذكّر"
                    />
                    <div className="card-grid">
                        {featuredListings.map((listing) => (
                            <DestinationCard key={listing.id || listing.slug} listing={listing} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt" id="stay">
                <div className="container">
                    <div className="band">
                        <SectionHeader
                            tag="إقامة وتسوق"
                            title="إقامة مريحة وتسوق لا يُنسى"
                            description="من الفنادق الفاخرة والشاليهات الهادئة إلى المتاجر التي تروي ذوقك، اجمع بين راحة الإقامة ومتعة التسوق في تجربة واحدة متكاملة"
                        />
                        <div className="band-cards">
                            {stayListings.map((listing) => (
                                <DestinationCard key={listing.id || listing.slug} listing={listing} variant="band-card" />
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 40 }}>
                            <Link href={route('listings.category', 'stay-shopping')} className="section-link">
                                اكتشف المزيد
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section sand" id="food">
                <div className="container">
                    <SectionHeader
                        tag="مأكولات ومشروبات"
                        title="رحلة في عالم النكهات"
                        description="استعد لتجربة لا تُنسى يلتقي فيها الطعم الرفيع بجولة فريدة بين المذاقات المحلية الأصيلة والأطباق العالمية الشهية"
                        link={route('listings.category', 'food-drinks')}
                    />
                    <div className="card-grid">
                        {foodListings.map((listing) => (
                            <DestinationCard key={listing.id || listing.slug} listing={listing} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" id="offers">
                <div className="container">
                    <SectionHeader
                        tag="عروض وخدمات"
                        title="عروض وخدمات بانتظارك"
                        description="تصفح أحدث العروض والخدمات الحصرية، وكن دائمًا على اطلاع بكل جديد لتنال أفضل التجارب بأفضل الأسعار"
                        link={route('offers.index')}
                    />
                    <div className="card-grid three">
                        {offers.map((offer) => (
                            <OfferCard key={offer.id || offer.slug} offer={offer} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt" id="destinations">
                <div className="container">
                    <SectionHeader
                        tag="معالم ووجهات"
                        title="أبرز المعالم والوجهات"
                        description="خياراتنا المختارة بعناية لأجمل المعالم والوجهات التي تجسّد سحر عسير بجبالها وسهولها وتاريخها العريق"
                        link={route('listings.category', 'landmarks-parks')}
                    />
                    <div className="card-grid">
                        {landmarkListings.map((listing) => (
                            <DestinationCard key={listing.id || listing.slug} listing={listing} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section sand" id="heritage">
                <div className="container">
                    <SectionHeader
                        tag="تراث وثقافة"
                        title="أصالة تروي الحكاية"
                        description="تجربة تمزج بين الجمال التاريخي والتنوع الثقافي في قصور وقرى تراثية شامخة عبر الزمن"
                    />
                    {heritageListings.length > 0 && (
                        <RowSlider
                            items={heritageListings}
                            render={(listing) => <DestinationCard key={listing.id || listing.slug} listing={listing} />}
                        />
                    )}
                </div>
            </section>

            <section className="section" id="events">
                <div className="container">
                    <SectionHeader
                        tag="فعاليات قادمة"
                        title="فعاليات تنتظرك"
                        description="استعد لتجارب وفعاليات عسير القادمة، حيث تنتظرك لحظات فريدة وذكريات لا تُنسى"
                    />
                    {upcomingEvents.length > 0 && (
                        <RowSlider
                            items={upcomingEvents}
                            render={(event) => <EventCard key={event.id || event.slug} event={event} />}
                        />
                    )}
                </div>
            </section>

            <section className="section sand" id="testimonials">
                <div className="container">
                    <SectionHeader
                        tag="ماذا يقولون عنا"
                        title="ماذا يقول العملاء عنا"
                        description="اكتشف عسير — تجارب حقيقية من زوار المنصة"
                    />
                    {testimonials.length > 0 && (
                        <div className="testimonials">
                            <div className="t-slider">
                                <div className="t-track" style={{ transform: `translateX(${tIndex * 100}%)` }}>
                                    {testimonials.map((t) => (
                                        <div key={t.id || t.author} className="t-card">
                                            <div className="quote-icon">
                                                <i className="fa-solid fa-quote-right" />
                                            </div>
                                            <div className="stars">
                                                {Array.from({ length: 5 }).map((_, s) => (
                                                    <i
                                                        key={s}
                                                        className="fa-solid fa-star"
                                                        style={{ color: s < (t.rating || 5) ? '#f59e0b' : '#d1d5db' }}
                                                    />
                                                ))}
                                            </div>
                                            <p className="t-text">{t.content}</p>
                                            <div className="t-name">{t.author}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="slider-nav">
                                <button
                                    type="button"
                                    className="slider-btn"
                                    onClick={() => setTIndex((i) => Math.max(0, i - 1))}
                                >
                                    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    type="button"
                                    className="slider-btn"
                                    onClick={() => setTIndex((i) => Math.min(testimonials.length - 1, i + 1))}
                                >
                                    <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {newsletterEnabled && (
                <section className="newsletter" id="newsletter">
                    <div className="container">
                        <div className="nl-card">
                            <div className="nl-inner">
                                <h3>الاشتراك في النشرة الإخبارية</h3>
                                <p>اشترك الآن ليصلك كل جديد من فعاليات ووجهات وعروض منطقة عسير</p>
                                <form className="nl-form" onSubmit={subscribe}>
                                    <input
                                        type="email"
                                        value={nlEmail}
                                        onChange={(e) => setNlEmail(e.target.value)}
                                        placeholder="ادخل البريد الإلكتروني"
                                        required
                                    />
                                    <button type="submit" className="btn-primary shimmer">اشترك الآن</button>
                                </form>
                                <div className="nl-success" style={{ display: nlDone ? 'block' : 'none' }}>
                                    ✓ تم الاشتراك بنجاح، شكراً لانضمامك!
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

Home.layout = (page) => <AppLayout>{page}</AppLayout>;
