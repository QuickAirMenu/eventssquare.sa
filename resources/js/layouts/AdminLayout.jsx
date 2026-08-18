import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Flash from '@/components/Flash';

const navItems = [
    { label: 'نظرة عامة', href: '/admin', icon: '◈' },
    { label: 'الوجهات', href: '/admin/listings', icon: '✦' },
    { label: 'الفعاليات', href: '/admin/events', icon: '🎟' },
    { label: 'العروض', href: '/admin/offers', icon: '％' },
    { label: 'التصنيفات', href: '/admin/categories', icon: '☰' },
    { label: 'المدن', href: '/admin/cities', icon: '◉' },
    { label: 'التقييمات', href: '/admin/testimonials', icon: '★' },
    { label: 'الرسائل', href: '/admin/contacts', icon: '✉' },
    { label: 'المستخدمون', href: '/admin/users', icon: '👤' },
    { label: 'الإعدادات', href: '/admin/settings', icon: '⚙' },
];

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const current = navItems.find((item) =>
        item.href === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.href),
    );

    return (
        <div className="min-h-screen bg-sand-100">
            <div className="flex">
                <aside
                    className={`fixed inset-y-0 z-40 w-64 bg-stone-900 text-stone-300 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex h-16 items-center gap-2 border-b border-stone-800 px-5">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-600 text-sm font-extrabold text-white">س</span>
                        <div>
                            <p className="text-sm font-extrabold text-white">لوحة التحكم</p>
                            <p className="text-xs text-stone-500">ساحة الفعاليات</p>
                        </div>
                    </div>

                    <nav className="space-y-1 p-3">
                        {navItems.map((item) => {
                            const active = current?.href === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                                        active ? 'bg-primary-600 text-white' : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                                    }`}
                                >
                                    <span className="grid h-6 w-6 place-items-center text-base">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="absolute inset-x-0 bottom-0 border-t border-stone-800 p-3">
                        <Link href="/" className="block rounded-lg px-3 py-2 text-sm font-semibold text-stone-400 hover:bg-stone-800 hover:text-white">
                            ← عرض الموقع
                        </Link>
                    </div>
                </aside>

                {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

                <div className="min-w-0 flex-1">
                    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setOpen((v) => !v)}
                                className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
                                aria-label="القائمة"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-lg font-extrabold text-stone-800">{current?.label ?? 'لوحة التحكم'}</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/" className="hidden rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-semibold text-stone-600 hover:bg-stone-50 sm:inline-flex">
                                الموقع
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                                    {auth?.user?.name?.charAt(0) || 'م'}
                                </span>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold text-stone-800">{auth?.user?.name}</p>
                                    <p className="text-xs text-stone-500">{auth?.user?.is_admin ? 'مشرف' : 'محرر'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.post('/logout')}
                                className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                            >
                                خروج
                            </button>
                        </div>
                    </header>

                    <main className="p-4 sm:p-6">
                        <Flash />
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
