import { Link } from '@inertiajs/react';
import { Cover } from '@/components/site/ui';

const CAT_ICONS = {
    castle: 'fa-solid fa-chess-rook',
    tree: 'fa-solid fa-tree',
    museum: 'fa-solid fa-landmark',
    bed: 'fa-solid fa-bed',
    utensils: 'fa-solid fa-utensils',
};

export default function DestinationCard({ listing, variant = '' }) {
    const features = [];
    if (listing.city?.name) features.push({ icon: 'fa-solid fa-location-dot', label: 'المدينة', value: listing.city.name });
    if (listing.category?.name) features.push({ icon: CAT_ICONS[listing.category.icon] || 'fa-solid fa-tag', label: 'الفئة', value: listing.category.name });

    return (
        <Link
            href={route('listings.show', listing.slug)}
            className={`destination-card ${variant}`}
        >
            <div className="card-img">
                <Cover src={listing.cover_url} alt={listing.name} className="w-full h-full object-cover" />
                <div className="gradient" />
                <div className="card-tags">
                    {listing.is_featured && (
                        <span className="card-tag">
                            <i className="fa-solid fa-star text-[11px]" /> مميزة
                        </span>
                    )}
                    {listing.category?.name && (
                        <span className="card-tag cat">
                            <i className={`${CAT_ICONS[listing.category.icon] || 'fa-solid fa-tag'} text-[11px]`} />
                            {listing.category.name}
                        </span>
                    )}
                </div>
            </div>

            <div className="card-body">
                <h3 className="card-title">{listing.name}</h3>
                {listing.summary && <p className="card-desc">{listing.summary}</p>}

                {features.length > 0 && (
                    <div className="card-features">
                        {features.map((f) => (
                            <div key={f.label} className="card-feature">
                                <span className="feat-icon"><i className={`${f.icon} text-[13px]`} /></span>
                                <div>
                                    <span className="feat-label">{f.label}</span>
                                    <span className="feat-value block truncate">{f.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <span className="cta-button">
                    استكشف الوجهة
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                </span>
            </div>
            <div className="bottom-accent" />
        </Link>
    );
}
