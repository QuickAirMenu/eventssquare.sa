import { Link } from '@inertiajs/react';

export function SectionHeader({ tag, title, description, link, linkText = 'اكتشف المزيد' }) {
    return (
        <div className="section-header">
            {tag && <span className="section-tag">✦ {tag}</span>}
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {link && (
                <div style={{ textAlign: 'center', marginTop: 22 }}>
                    <Link href={link} className="section-link">
                        {linkText}
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}

export function Cover({ src, alt, className = '', fallbackIcon = 'fa-solid fa-mountain-sun', eager = false }) {
    if (src) {
        return <img src={src} alt={alt || ''} loading={eager ? 'eager' : 'lazy'} className={className} />;
    }
    return (
        <div className={`cover-fallback ${className}`} role="img" aria-label={alt || 'صورة'}>
            <i className={fallbackIcon} style={{ fontSize: 42, opacity: 0.9 }} aria-hidden="true" />
        </div>
    );
}
