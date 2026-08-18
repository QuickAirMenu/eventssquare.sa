import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card } from '@/components/ui';

const statCards = [
    { key: 'listings', label: 'الوجهات', href: '/admin/listings', color: 'bg-primary-600', icon: '✦' },
    { key: 'events', label: 'الفعاليات', href: '/admin/events', color: 'bg-accent-500', icon: '🎟' },
    { key: 'offers', label: 'العروض', href: '/admin/offers', color: 'bg-sky-600', icon: '％' },
    { key: 'categories', label: 'التصنيفات', href: '/admin/categories', color: 'bg-stone-600', icon: '☰' },
    { key: 'cities', label: 'المدن', href: '/admin/cities', color: 'bg-emerald-600', icon: '◉' },
    { key: 'contacts', label: 'الرسائل', href: '/admin/contacts', color: 'bg-red-500', icon: '✉' },
];

export default function Dashboard({ stats, recentListings, recentEvents, recentContacts }) {
    return (
        <>
            <Head title="نظرة عامة" />

            <div className="mb-8">
                <h2 className="text-xl font-extrabold text-stone-800">نظرة عامة على المنصة</h2>
                <p className="mt-1 text-sm text-stone-500">أهلاً بك في لوحة تحكم ساحة الفعاليات</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {statCards.map((card) => (
                    <Link key={card.key} href={card.href} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <span className={`mb-3 grid h-10 w-10 place-items-center rounded-xl text-lg text-white ${card.color}`}>{card.icon}</span>
                        <p className="text-2xl font-extrabold text-stone-800">{stats?.[card.key] ?? 0}</p>
                        <p className="text-sm text-stone-500">{card.label}</p>
                    </Link>
                ))}
            </div>

            {stats?.unreadContacts > 0 && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    لديك {stats.unreadContacts} رسالة غير مقروءة
                </div>
            )}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <Card className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-extrabold text-stone-800">أحدث الوجهات</h3>
                        <Link href="/admin/listings" className="text-xs font-bold text-primary-600 hover:text-primary-700">عرض الكل</Link>
                    </div>
                    <ul className="space-y-3">
                        {recentListings?.map((item) => (
                            <li key={item.id} className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-stone-700">{item.name}</p>
                                    <p className="text-xs text-stone-400">{item.city?.name} • {item.category?.name}</p>
                                </div>
                                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${item.is_active ? 'bg-primary-50 text-primary-700' : 'bg-stone-100 text-stone-500'}`}>
                                    {item.is_active ? 'منشور' : 'مسودة'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-extrabold text-stone-800">أحدث الفعاليات</h3>
                        <Link href="/admin/events" className="text-xs font-bold text-primary-600 hover:text-primary-700">عرض الكل</Link>
                    </div>
                    <ul className="space-y-3">
                        {recentEvents?.map((item) => (
                            <li key={item.id} className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-stone-700">{item.name}</p>
                                    <p className="text-xs text-stone-400">{item.city?.name}</p>
                                </div>
                                <span className="shrink-0 rounded-full bg-accent-50 px-2 py-0.5 text-xs font-bold text-accent-700">{item.status_label}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-extrabold text-stone-800">أحدث الرسائل</h3>
                        <Link href="/admin/contacts" className="text-xs font-bold text-primary-600 hover:text-primary-700">عرض الكل</Link>
                    </div>
                    <ul className="space-y-3">
                        {recentContacts?.map((item) => (
                            <li key={item.id} className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-stone-700">{item.name}</p>
                                    <p className="truncate text-xs text-stone-400">{item.subject}</p>
                                </div>
                                {!item.read_at && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
