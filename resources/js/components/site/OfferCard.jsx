export default function OfferCard({ offer }) {
    return (
        <a
            href={offer.link || '#'}
            target={offer.link ? '_blank' : undefined}
            rel="noopener"
            className="destination-card"
        >
            <div className="card-img" style={{ height: 220 }}>
                {offer.cover_url ? (
                    <img src={offer.cover_url} alt={offer.title} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                    <div className="cover-fallback w-full h-full">
                        <i className="fa-solid fa-bullhorn" style={{ fontSize: 40, opacity: 0.9 }} />
                    </div>
                )}
                <div className="gradient" />
                <div className="card-tags">
                    <span className="card-tag cat"><i className="fa-solid fa-tag text-[11px]" /> عرض خاص</span>
                </div>
            </div>

            <div className="card-body">
                <h3 className="card-title">{offer.title}</h3>
                {offer.description && <p className="card-desc">{offer.description}</p>}
                <span className="cta-button">
                    اطلب العرض
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                </span>
            </div>
            <div className="bottom-accent" />
        </a>
    );
}
