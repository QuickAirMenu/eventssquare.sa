import { Link } from '@inertiajs/react';
import { Cover } from '@/components/site/ui';

const STATUS = {
    upcoming: { label: 'قادمة', cls: 'upcoming' },
    ongoing: { label: 'مستمر الآن', cls: '' },
    ended: { label: 'انتهت', cls: 'ended' },
};

export default function EventCard({ event }) {
    const status = STATUS[event.status] || STATUS.upcoming;
    const date = event.starts_at
        ? new Date(event.starts_at).toLocaleDateString('ar-SA-u-ca-gregory', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <Link href={route('events.show', event.slug)} className="destination-card">
            <div className="card-img">
                <Cover src={event.cover_url} alt={event.name} className="w-full h-full object-cover" fallbackIcon="fa-solid fa-calendar-star" />
                <div className="gradient" />
                <div className="card-tags">
                    <span className={`card-tag status ${status.cls}`}>
                        <span className="status-icon" /> {status.label}
                    </span>
                    {event.venue && <span className="card-tag cat"><i className="fa-solid fa-location-dot text-[11px]" /> {event.venue}</span>}
                </div>
            </div>

            <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                {event.description && <p className="card-desc">{event.description}</p>}

                <div className="card-features">
                    <div className="card-feature">
                        <span className="feat-icon"><i className="fa-solid fa-calendar text-[13px]" /></span>
                        <div>
                            <span className="feat-label">التاريخ</span>
                            <span className="feat-value block">{date}</span>
                        </div>
                    </div>
                    <div className="card-feature">
                        <span className="feat-icon"><i className="fa-solid fa-city text-[13px]" /></span>
                        <div>
                            <span className="feat-label">المدينة</span>
                            <span className="feat-value block">{event.city?.name || 'عسير'}</span>
                        </div>
                    </div>
                </div>

                <span className="cta-button">
                    تفاصيل الفعالية
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
