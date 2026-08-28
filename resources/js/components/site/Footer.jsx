import { Link, usePage } from '@inertiajs/react';

const SOCIAL_ICONS = {
    twitter: 'fa-brands fa-x-twitter',
    snapchat: 'fa-brands fa-snapchat',
    tiktok: 'fa-brands fa-tiktok',
    instagram: 'fa-brands fa-instagram',
};

export default function Footer() {
    const { settings } = usePage().props;
    const name = settings?.site_name || 'ساحة الفعاليات';

    const socials = [
        { key: 'twitter', href: settings?.twitter },
        { key: 'snapchat', href: settings?.snapchat },
        { key: 'tiktok', href: settings?.tiktok },
        { key: 'instagram', href: settings?.instagram },
    ].filter((s) => s.href);

    return (
        <footer id="contact">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <img className="logo" src="/img/logo-white.png" alt={name} />
                        <p>{settings?.site_description || 'منصة إلكترونية تفاعلية تهتم في إثراء الحياة ورسم البهجة وخلق عالم من الخيال في معالم ووجهات سياحية أثرية متنوعة'}</p>
                        <div className="socials">
                            {socials.map((s) => (
                                <a key={s.key} className="social" href={s.href} target="_blank" rel="noopener">
                                    <i className={SOCIAL_ICONS[s.key]} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4>روابط سريعة</h4>
                        <ul className="footer-links">
                            <li><Link href={route('home')}>الرئيسية</Link></li>
                            <li><Link href={route('events.index')}>الفعاليات</Link></li>
                            <li><Link href={route('listings.index')}>الوجهات</Link></li>
                            <li><Link href={route('listings.category', 'food-drinks')}>المأكولات والمشروبات</Link></li>
                            <li><Link href={route('activities.index')}>أنشطة وتجارب</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>المنصة</h4>
                        <ul className="footer-links">
                            <li><Link href={route('offers.index')}>الإعلانات</Link></li>
                            <li><Link href={route('sales')}>المبيعات</Link></li>
                            <li><Link href={route('discover')}>استكشفها</Link></li>
                            <li><Link href={route('about')}>عن المنصة</Link></li>
                            <li><Link href={route('contact')}>تواصل معنا</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>اتصل بنا</h4>
                        <ul className="footer-contact">
                            {settings?.phone && (
                                <li>
                                    <i className="fa-solid fa-phone" />
                                    <a href={`tel:${settings.phone}`} dir="ltr">{settings.phone}</a>
                                </li>
                            )}
                            {settings?.email && (
                                <li>
                                    <i className="fa-solid fa-envelope" />
                                    <a href={`mailto:${settings.email}`} dir="ltr">{settings.email}</a>
                                </li>
                            )}
                            {settings?.whatsapp && (
                                <li>
                                    <i className="fa-brands fa-whatsapp" />
                                    <a href={`https://wa.me/${(settings.whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noopener">واتساب</a>
                                </li>
                            )}
                            <li>
                                <i className="fa-solid fa-location-dot" />
                                <span>{settings?.address || 'أبها، منطقة عسير، المملكة العربية السعودية'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="trust-logos">
                        <img className="trust-sbc" src="/img/trust-sbc.png" alt="المركز السعودي للأعمال" />
                        <img className="trust-media" src="/img/trust-media.png" alt="الهيئة العامة لتنظيم الإعلام" />
                    </div>
                    <p>جميع الحقوق محفوظة لصالح شركة {name} {new Date().getFullYear()} ©</p>
                    <div className="legal">
                        <a href="#">السياسة والخصوصية</a>
                        <a href="#">الشروط والأحكام</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
