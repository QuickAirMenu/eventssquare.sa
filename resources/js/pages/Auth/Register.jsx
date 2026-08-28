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
    { icon: 'fa-solid fa-location-dot', text: 'احفظ وجهاتك المفضلة في عسير' },
    { icon: 'fa-solid fa-calendar-week', text: 'تلقَّ إشعارات الفعاليات القادمة' },
    { icon: 'fa-solid fa-gem', text: 'انضم إلى برنامج العروض الحصرية' },
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

function passwordScore(pw) {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score;
}

function strengthLabel(score) {
    if (score <= 1) return { text: 'ضعيفة', color: '#D92315', pct: 25 };
    if (score === 2) return { text: 'متوسطة', color: '#F59E0B', pct: 50 };
    if (score === 3) return { text: 'جيدة', color: '#F59E0B', pct: 75 };
    return { text: 'قوية', color: '#16A34A', pct: 100 };
}

export default function Register() {
    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '' });

    const score = passwordScore(form.data.password);
    const strength = strengthLabel(score);

    const submit = (e) => {
        e.preventDefault();
        form.post(route('register.store'));
    };

    const focusStyle = { borderColor: 'var(--green-light)', boxShadow: '0 0 0 4px rgba(22,163,74,0.12)' };

    return (
        <>
            <Head title="إنشاء حساب" />

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
                                            حساب واحد...
                                            <span className="block text-[#fcd34d]">يفتح لك عسير كلها</span>
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
                                            <i className="fa-solid fa-users text-[#fcd34d]" />
                                            انضم إلى آلاف الزوار الذين يخطّطون رحلاتهم معنا
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
                                        <h2 className="text-[17px] font-extrabold">انضم إلى ساحة الفعاليات</h2>
                                    </div>
                                </div>

                                {/* عمود النموذج */}
                                <div className="px-7 pb-9 pt-10 sm:px-10">
                                    <div className="mb-7 text-center lg:text-right">
                                        <h1 className="text-[24px] font-extrabold text-[#134527]">انضم إلى ساحة الفعاليات</h1>
                                        <p className="mt-2 text-[14px] leading-[1.8] text-[#4b5563]">حساب واحد يجمع لك فعاليات عسير ووجهاتها وعروضها — خطط رحلتك القادمة بثقة.</p>
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
                                    {(form.errors.email || form.errors.password || form.errors.name) && (
                                        <div
                                            className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#D92315]"
                                            style={{ background: 'rgba(217,35,21,0.06)', border: '1px solid rgba(217,35,21,0.25)' }}
                                        >
                                            <i className="fa-solid fa-triangle-exclamation mt-0.5" />
                                            <span>{form.errors.email || form.errors.password || form.errors.name}</span>
                                        </div>
                                    )}

                                    <form onSubmit={submit} className="flex flex-col gap-5">
                                        <div>
                                            <label style={labelStyle}>الاسم الكامل</label>
                                            <div style={{ position: 'relative' }}>
                                                <i
                                                    className="fa-solid fa-user"
                                                    style={{ position: 'absolute', insetInlineStart: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 14, pointerEvents: 'none' }}
                                                />
                                                <input
                                                    style={inputStyle}
                                                    type="text"
                                                    autoComplete="name"
                                                    value={form.data.name}
                                                    onChange={(e) => { form.setData('name', e.target.value); form.clearErrors('name'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = form.errors.name ? 'var(--red)' : '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                                                    placeholder="مثال: سارة العسيري"
                                                    autoFocus
                                                />
                                            </div>
                                            {form.errors.name && <p style={errorStyle}>{form.errors.name}</p>}
                                        </div>

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
                                                    autoComplete="new-password"
                                                    value={form.data.password}
                                                    onChange={(e) => { form.setData('password', e.target.value); form.clearErrors('password'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = form.errors.password ? 'var(--red)' : '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                                                    placeholder="8 أحرف على الأقل، بأرقام ورموز"
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

                                            {/* مؤشر قوة كلمة المرور */}
                                            {form.data.password && (
                                                <div className="mt-3">
                                                    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: '#e5e7eb' }}>
                                                        <div
                                                            className="h-full rounded-full transition-all duration-300"
                                                            style={{ width: `${strength.pct}%`, background: strength.color }}
                                                        />
                                                    </div>
                                                    <p className="mt-1.5 text-[12px] font-semibold" style={{ color: strength.color }}>
                                                        قوة كلمة المرور: {strength.text}
                                                    </p>
                                                </div>
                                            )}

                                            {form.errors.password && <p style={errorStyle}>{form.errors.password}</p>}
                                        </div>

                                        <div>
                                            <label style={labelStyle}>تأكيد كلمة المرور</label>
                                            <div style={{ position: 'relative' }}>
                                                <i
                                                    className="fa-solid fa-lock"
                                                    style={{ position: 'absolute', insetInlineStart: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 14, pointerEvents: 'none' }}
                                                />
                                                <input
                                                    style={{ ...inputStyle, paddingInlineEnd: 52 }}
                                                    type={showConfirm ? 'text' : 'password'}
                                                    autoComplete="new-password"
                                                    value={form.data.password_confirmation}
                                                    onChange={(e) => { form.setData('password_confirmation', e.target.value); form.clearErrors('password_confirmation'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = form.errors.password_confirmation ? 'var(--red)' : '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                                                    placeholder="أعد كتابة كلمة المرور نفسها"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm((s) => !s)}
                                                    aria-label={showConfirm ? 'إخفاء تأكيد كلمة المرور' : 'إظهار تأكيد كلمة المرور'}
                                                    style={{ position: 'absolute', insetInlineEnd: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4b5563', fontSize: 16, cursor: 'pointer' }}
                                                >
                                                    <i className={showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
                                                </button>
                                            </div>
                                            {form.errors.password_confirmation && <p style={errorStyle}>{form.errors.password_confirmation}</p>}
                                        </div>

                                        <button type="submit" className="btn-primary w-full" disabled={form.processing} style={{ opacity: form.processing ? 0.7 : 1 }}>
                                            {form.processing ? 'جارٍ التسجيل...' : 'سجّل الآن واستكشف عسير'}
                                        </button>
                                    </form>

                                    <p className="mt-5 text-center text-[12.5px] leading-[1.8] text-[#4b5563]">
                                        بالتسجيل في ساحة الفعاليات، توافق على شروط الاستخدام وسياسة الخصوصية.
                                    </p>

                                    <p className="mt-4 text-center text-[14px] text-[#4b5563]">
                                        لديك حساب؟{' '}
                                        <Link href={route('login')} className="font-bold text-[#1f7045] hover:text-[#16a34a]">
                                            سجّل دخولك
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

Register.layout = (page) => <AppLayout>{page}</AppLayout>;
