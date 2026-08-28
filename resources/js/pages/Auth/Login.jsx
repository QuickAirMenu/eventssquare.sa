import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

const inputStyle = {
    width: '100%',
    border: '2px solid #e5e7eb',
    borderRadius: 14,
    paddingBlock: 13,
    paddingInline: 16,
    paddingInlineStart: 46,
    fontSize: 15,
    fontFamily: 'inherit',
    color: '#1f2937',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
};

const labelStyle = { display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' };
const errorStyle = { marginTop: 5, fontSize: 12.5, color: '#D92315' };

const benefits = [
    { icon: 'fa-solid fa-compass', text: 'اكتشف أبرز وجهات منطقة عسير' },
    { icon: 'fa-solid fa-calendar-check', text: 'تابع فعالياتك القادمة ولا تفوّت المواعيد' },
    { icon: 'fa-solid fa-tags', text: 'احصل على العروض والتخفيضات أولاً' },
];

const decorCircle = (top, side, sideVal, size, color) => ({
    position: 'absolute',
    top,
    [side]: sideVal,
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, ${color}, transparent 70%)`,
    pointerEvents: 'none',
});

export default function Login() {
    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({ email: '', password: '', remember: false });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('login.store'));
    };

    const focusStyle = { borderColor: 'var(--green-light)', boxShadow: '0 0 0 4px rgba(22,163,74,0.12)' };

    return (
        <>
            <Head title="تسجيل الدخول" />

            <section className="section sand" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="mx-auto w-full max-w-[900px]">
                        <div className="destination-card" style={{ overflow: 'hidden' }}>
                            <div className="grid lg:grid-cols-2">
                                {/* العمود الإعلامي — يظهر على الشاشات اللوحية فما فوق */}
                                <div
                                    className="relative hidden lg:flex flex-col justify-between p-10 text-white"
                                    style={{ background: 'linear-gradient(135deg, var(--green), var(--teal))' }}
                                >
                                    <div {...decorCircle('-90px', 'right', '-60px', 320, 'rgba(22,163,74,0.4)')} />
                                    <div {...decorCircle('auto', 'left', '-70px', 280, 'rgba(14,165,233,0.3)')} style={{ bottom: '-80px' }} />

                                    <div className="relative">
                                        <img src="/img/logo-white.png" alt="ساحة الفعاليات" className="h-[52px] w-auto" />
                                        <h2 className="mt-8 text-[28px] font-extrabold leading-[1.5]">
                                            كل ما تبحث عنه في عسير...
                                            <span className="block text-[#fcd34d]">في مكان واحد</span>
                                        </h2>
                                    </div>

                                    <div className="relative mt-10 space-y-4">
                                        {benefits.map((b) => (
                                            <div key={b.text} className="flex items-center gap-3">
                                                <span
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[15px]"
                                                    style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)' }}
                                                >
                                                    <i className={b.icon} />
                                                </span>
                                                <span className="text-[14.5px] font-medium text-white/90">{b.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative mt-10 border-t border-white/20 pt-6">
                                        <p className="text-[13px] font-medium text-white/70">منصة عسير الأولى للفعاليات والوجهات</p>
                                        <p className="mt-1 flex items-center gap-2 text-[12px] text-white/60">
                                            <i className="fa-solid fa-shield-halved text-[#fcd34d]" />
                                            أكثر من 120 جهة وفعالية تُستحدث شهرياً
                                        </p>
                                    </div>
                                </div>

                                {/* العمود العلوي للموبايل */}
                                <div
                                    className="relative overflow-hidden px-6 py-6 text-white lg:hidden"
                                    style={{ background: 'linear-gradient(135deg, var(--green), var(--teal))' }}
                                >
                                    <div {...decorCircle('-60px', 'right', '-40px', 180, 'rgba(22,163,74,0.4)')} />
                                    <div className="relative flex items-center gap-3">
                                        <img src="/img/logo-white.png" alt="ساحة الفعاليات" className="h-9 w-auto" />
                                        <h2 className="text-[17px] font-extrabold">أهلاً بعودتك إلى ساحة الفعاليات</h2>
                                    </div>
                                </div>

                                {/* عمود النموذج */}
                                <div className="px-7 pb-9 pt-10 sm:px-10">
                                    <div className="mb-7 text-center lg:text-right">
                                        <h1 className="text-[24px] font-extrabold text-[#134527]">أهلاً بعودتك</h1>
                                        <p className="mt-2 text-[14px] leading-[1.8] text-[#4b5563]">أكمل من حيث توقفت — فعاليات عسير ووجهاتها بانتظارك.</p>
                                    </div>

                                    {/* رسالة نجاح flash */}
                                    {flash?.success && (
                                        <div
                                            className="mb-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#134527]"
                                            style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)' }}
                                        >
                                            <i className="fa-solid fa-circle-check text-[#16a34a]" />
                                            {flash.success}
                                        </div>
                                    )}

                                    {/* رسالة خطأ بارزة */}
                                    {(form.errors.email || form.errors.password) && (
                                        <div
                                            className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#D92315]"
                                            style={{ background: 'rgba(217,35,21,0.06)', border: '1px solid rgba(217,35,21,0.25)' }}
                                        >
                                            <i className="fa-solid fa-triangle-exclamation mt-0.5" />
                                            <span>{form.errors.email || form.errors.password}</span>
                                        </div>
                                    )}

                                    <form onSubmit={submit} className="flex flex-col gap-5">
                                        <div>
                                            <label style={labelStyle}>البريد الإلكتروني</label>
                                            <div style={{ position: 'relative' }}>
                                                <i
                                                    className="fa-solid fa-envelope"
                                                    style={{ position: 'absolute', insetInlineStart: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 14, pointerEvents: 'none' }}
                                                />
                                                <input
                                                    style={inputStyle}
                                                    dir="ltr"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={form.data.email}
                                                    onChange={(e) => { form.setData('email', e.target.value); form.clearErrors('email'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = form.errors.email ? 'var(--red)' : '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                                                    placeholder="name@example.com"
                                                    autoFocus
                                                />
                                            </div>
                                            {form.errors.email && <p style={errorStyle}>{form.errors.email}</p>}
                                        </div>

                                        <div>
                                            <label style={labelStyle}>كلمة المرور</label>
                                            <div style={{ position: 'relative' }}>
                                                <i
                                                    className="fa-solid fa-lock"
                                                    style={{ position: 'absolute', insetInlineStart: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 14, pointerEvents: 'none' }}
                                                />
                                                <input
                                                    style={{ ...inputStyle, paddingInlineEnd: 52 }}
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoComplete="current-password"
                                                    value={form.data.password}
                                                    onChange={(e) => { form.setData('password', e.target.value); form.clearErrors('password'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = form.errors.password ? 'var(--red)' : '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                                                    placeholder="أدخل كلمة مرورك"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((s) => !s)}
                                                    aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                                                    style={{ position: 'absolute', insetInlineEnd: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4b5563', fontSize: 16, cursor: 'pointer' }}
                                                >
                                                    <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
                                                </button>
                                            </div>
                                            {form.errors.password && <p style={errorStyle}>{form.errors.password}</p>}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#4b5563]">
                                                <input
                                                    type="checkbox"
                                                    checked={form.data.remember}
                                                    onChange={(e) => form.setData('remember', e.target.checked)}
                                                    className="h-4 w-4 accent-[#16a34a]"
                                                />
                                                تذكرني
                                            </label>
                                            <span
                                                className="inline-flex items-center gap-2 text-[12.5px] text-[#4b5563]"
                                                title="استعادة كلمة المرور متاحة قريباً — راسلنا عبر واتساب إن احتجت الدخول الآن."
                                            >
                                                نسيت كلمة المرور؟
                                                <span
                                                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                                                    style={{ background: 'linear-gradient(135deg, var(--green), var(--teal))' }}
                                                >
                                                    قريباً
                                                </span>
                                            </span>
                                        </div>

                                        <button type="submit" className="btn-primary w-full" disabled={form.processing} style={{ opacity: form.processing ? 0.7 : 1 }}>
                                            {form.processing ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
                                        </button>
                                    </form>

                                    <p className="mt-6 text-center text-[14px] text-[#4b5563]">
                                        ليس لديك حساب؟{' '}
                                        <Link href={route('register')} className="font-bold text-[#1f7045] hover:text-[#16a34a]">
                                            سجّل الآن
                                        </Link>
                                    </p>

                                    <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#4b5563]">
                                        <i className="fa-solid fa-lock text-[11px] text-[#16a34a]" />
                                        خصوصية بياناتك محمية بالكامل
                                    </p>
                                </div>
                            </div>
                            <div className="bottom-accent" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Login.layout = (page) => <AppLayout>{page}</AppLayout>;
