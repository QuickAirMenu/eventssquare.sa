import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const ICONS = {
    castle: 'fa-solid fa-chess-rook',
    tree: 'fa-solid fa-tree',
    museum: 'fa-solid fa-landmark',
    bed: 'fa-solid fa-bed',
    utensils: 'fa-solid fa-utensils',
};

export default function Navbar() {
    const { settings, auth, navigationCategories } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState(null);
    const [userOpen, setUserOpen] = useState(false);

    const subcategories = navigationCategories ?? [];

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setUserOpen(false);
    }, [location.pathname]);

    const user = auth?.user;

    return (
        <nav className={`navbar ${scrolled || mobileOpen ? 'scrolled' : ''}`} id="navbar">
            <div className="container nav-inner">
                <Link href={route('home')} className="logo">
                    <img src="/img/logo.png" alt={settings?.site_name || 'ساحة الفعاليات'} />
                </Link>

                <ul className="nav-links">
                    <li><Link href={route('home')} className="active">الرئيسية</Link></li>
                    <li><Link href={route('events.index')}>الفعاليات</Link></li>
                    <li className="dropdown">
                        <Link href={route('listings.index')}>
                            الوجهات <span className="dropdown-arrow">▾</span>
                        </Link>
                        <div className="dropdown-menu">
                            {subcategories.map((sub) => (
                                <Link key={sub.id} href={route('listings.category', sub.slug)}>
                                    <i className={`${ICONS[sub.icon] || 'fa-solid fa-location-dot'} text-xs`} /> {sub.name}
                                </Link>
                            ))}
                        </div>
                    </li>
                    <li><Link href={route('activities.index')}>الأنشطة</Link></li>
                    <li className="dropdown">
                        <Link href={route('offers.index')}>
                            الخدمات <span className="dropdown-arrow">▾</span>
                        </Link>
                        <div className="dropdown-menu">
                            <Link href={route('offers.index')}>الإعلانات</Link>
                            <Link href={route('sales')}>المبيعات</Link>
                        </div>
                    </li>
                    <li><Link href={route('discover')}>استكشفها</Link></li>
                    <li><Link href={route('about')}>عن المنصة</Link></li>
                    <li><Link href={route('contact')}>تواصل معنا</Link></li>
                </ul>

                <div className="nav-actions">
                    <div className="dropdown">
                        <button
                            className="avatar-btn"
                            title="حسابي"
                            onClick={() => setUserOpen((v) => !v)}
                            onBlur={() => setTimeout(() => setUserOpen(false), 150)}
                        >
                            <div className="avatar-circle">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </button>
                        {userOpen && (
                            <div className="dropdown-menu">
                                {user ? (
                                    <>
                                        {user.is_admin && <Link href="/admin">لوحة التحكم</Link>}
                                        <button
                                            className="w-full text-right"
                                            onClick={() => router.post(route('logout'))}
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')}>تسجيل دخول</Link>
                                        <Link href={route('register')}>إنشاء حساب</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <button className="burger" onClick={() => setMobileOpen((v) => !v)} aria-label="القائمة">
                        <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="container">
                    <div className="mobile-menu open">
                        <Link href={route('home')}>الرئيسية</Link>
                        <Link href={route('events.index')}>الفعاليات</Link>
                        <button className="mobile-drop-title" onClick={() => setMobileSub(mobileSub === 'dest' ? null : 'dest')}>
                            الوجهات <span>▾</span>
                        </button>
                        {mobileSub === 'dest' && (
                            <div className="mobile-sub open">
                                <Link href={route('listings.index')}>جميع الوجهات</Link>
                                {subcategories.map((sub) => (
                                    <Link key={sub.id} href={route('listings.category', sub.slug)}>{sub.name}</Link>
                                ))}
                            </div>
                        )}
                        <Link href={route('activities.index')}>الأنشطة</Link>
                        <Link href={route('offers.index')}>العروض والإعلانات</Link>
                        <Link href={route('discover')}>استكشفها</Link>
                        <Link href={route('about')}>عن المنصة</Link>
                        <Link href={route('contact')}>تواصل معنا</Link>
                        <div className="mobile-actions">
                            {user ? (
                                <button className="btn-login" style={{ width: '100%' }} onClick={() => router.post(route('logout'))}>
                                    تسجيل الخروج
                                </button>
                            ) : (
                                <>
                                    <Link href={route('login')} className="btn-login" style={{ width: '100%' }}>تسجيل دخول</Link>
                                    <Link href={route('register')} className="btn-signup" style={{ width: '100%' }}>إنشاء حساب</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
