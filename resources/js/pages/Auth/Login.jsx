import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import {
    inputStyle,
    labelStyle,
    errorStyle,
    fieldIcon,
    focusStyle,
    blurStyle,
    eyeButtonStyle,
    cardStyle,
    promoStyle,
    promoMobileStyle,
    benefitIconStyle,
    statsBarStyle,
    submitBtnStyle,
    flashSuccessStyle,
    flashErrorStyle,
} from '@/components/site/fieldStyles';

const benefits = [
    { icon: 'fa-solid fa-compass', text: 'اكتشف أبرز وجهات منطقة عسير' },
    { icon: 'fa-solid fa-calendar-check', text: 'تابع فعالياتك القادمة ولا تفوّت المواعيد' },
    { icon: 'fa-solid fa-tags', text: 'احصل على العروض والتخفيضات أولاً' },
];

const stats = [
    { value: '+120', label: 'فعالية شهرياً' },
    { value: '+40', label: 'وجهة مميزة' },
    { value: '+18', label: 'محافظة مغطاة' },
];

export default function Login() {
    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({ email: '', password: '', remember: false });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('login.store'));
    };

    return (
        <>
            <Head title="تسجيل الدخول" />

            <section className="section sand" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="mx-auto w-full max-w-[920px]">
                        <div style={cardStyle}>
                            <div className="grid lg:grid-cols-2">
                                {/* العمود الترويجي — شاشات لوحية فما فوق */}
                                <div
                                    className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex"
                                    style={promoStyle}
                                >
                                    <span
                                        className="pointer-events-none absolute inset-x-10 top-0 h-px"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
                                    />

                                    <div className="relative">
                                        <img src="/img/logo-white.png" alt="ساحة الفعاليات" className="h-[50px] w-auto" />
                                        <div className="mt-9">
                                            <h2 className="text-[27px] font-extrabold leading-[1.6]">
                                                مرحباً بعودتك…
                                                <span className="block text-[#fcd34d]">عسير بانتظارك</span>
                                            </h2>
                                            <p className="mt-3 text-[13.5px] leading-[1.9] text-white/70">
                                                سجّل دخولك لتجد فعالياتك ووجهاتك وعروضك في مكان واحد.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative mt-10 space-y-4">
                                        {benefits.map((b) => (
                                            <div key={b.text} className="flex items-center gap-3.5">
                                                <span
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[15px]"
                                                    style={benefitIconStyle}
                                                >
                                                    <i className={b.icon} aria-hidden="true" />
                                                </span>
                                                <span className="text-[14.5px] font-medium leading-[1.7] text-white/90">{b.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative mt-10">
                                        <div className="grid grid-cols-3 divide-x divide-white/15 p-1" style={statsBarStyle}>
                                            {stats.map((s) => (
                                                <div key={s.label} className="rounded-2xl px-2 py-3 text-center">
                                                    <p className="text-[21px] font-extrabold leading-none text-white">{s.value}</p>
                                                    <p className="mt-1.5 text-[11px] font-medium text-white/70">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-5 flex items-center justify-center gap-2 text-[12px] text-white/60">
                                            <i className="fa-solid fa-shield-halved text-[#fcd34d]" aria-hidden="true" />
                                            منصة عسير الأولى للفعاليات والوجهات — بياناتك محمية بالكامل
                                        </p>
                                    </div>
                                </div>

                                {/* الشريط المدمج للموبايل */}
                                <div className="relative overflow-hidden px-6 py-5 text-white lg:hidden" style={promoMobileStyle}>
                                    <div className="relative flex items-center gap-3">
                                        <img src="/img/logo-white.png" alt="ساحة الفعاليات" className="h-8 w-auto" />
                                        <div className="min-w-0">
                                            <h2 className="text-[15px] font-extrabold leading-snug">أهلاً بعودتك إلى ساحة الفعاليات</h2>
                                            <p className="mt-0.5 text-[11.5px] text-white/70">فعالياتك ووجهاتك في انتظارك</p>
                                        </div>
                                    </div>
                                </div>

                                {/* عمود النموذج */}
                                <div className="px-7 pb-10 pt-10 sm:px-10">
                                    <div className="mb-8 text-center lg:text-right">
                                        <h1 className="text-[26px] font-extrabold text-[#134527]">أهلاً بعودتك</h1>
                                        <p className="mt-2 text-[13.5px] leading-[1.9] text-[#4b5563]">
                                            أكمل من حيث توقفت — فعاليات عسير ووجهاتها بانتظارك.
                                        </p>
                                    </div>

                                    {/* رسالة نجاح flash */}
                                    {flash?.success && (
                                        <div
                                            className="mb-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#134527]"
                                            style={flashSuccessStyle}
                                        >
                                            <i className="fa-solid fa-circle-check text-[#16a34a]" aria-hidden="true" />
                                            {flash.success}
                                        </div>
                                    )}

                                    {/* رسالة خطأ بارزة */}
                                    {(form.errors.email || form.errors.password) && (
                                        <div
                                            className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#D92315]"
                                            style={flashErrorStyle}
                                        >
                                            <i className="fa-solid fa-triangle-exclamation mt-0.5" aria-hidden="true" />
                                            <span>{form.errors.email || form.errors.password}</span>
                                        </div>
                                    )}

                                    <form onSubmit={submit} className="flex flex-col gap-5">
                                        <div>
                                            <label style={labelStyle}>البريد الإلكتروني</label>
                                            <div style={{ position: 'relative' }}>
                                                <i className="fa-solid fa-envelope" aria-hidden="true" style={fieldIcon()} />
                                                <input
                                                    style={inputStyle}
                                                    dir="ltr"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={form.data.email}
                                                    onChange={(e) => { form.setData('email', e.target.value); form.clearErrors('email'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.email))}
                                                    placeholder="name@example.com"
                                                    autoFocus
                                                />
                                            </div>
                                            {form.errors.email && <p style={errorStyle}>{form.errors.email}</p>}
                                        </div>

                                        <div>
                                            <label style={labelStyle}>كلمة المرور</label>
                                            <div style={{ position: 'relative' }}>
                                                <i className="fa-solid fa-lock" aria-hidden="true" style={fieldIcon()} />
                                                <input
                                                    style={{ ...inputStyle, paddingInlineEnd: 52 }}
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoComplete="current-password"
                                                    value={form.data.password}
                                                    onChange={(e) => { form.setData('password', e.target.value); form.clearErrors('password'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.password))}
                                                    placeholder="أدخل كلمة مرورك"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((s) => !s)}
                                                    aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                                                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                                                    style={eyeButtonStyle}
                                                >
                                                    <i aria-hidden="true" className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
                                                </button>
                                            </div>
                                            {form.errors.password && <p style={errorStyle}>{form.errors.password}</p>}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex cursor-pointer items-center gap-2.5 rounded-lg py-2 text-[13px] font-medium text-[#4b5563]">
                                                <input
                                                    type="checkbox"
                                                    checked={form.data.remember}
                                                    onChange={(e) => form.setData('remember', e.target.checked)}
                                                    className="h-5 w-5 cursor-pointer accent-[#16a34a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
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
                                                    style={{ background: 'linear-gradient(135deg, var(--green-light), var(--teal))' }}
                                                >
                                                    قريباً
                                                </span>
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn-primary w-full active:scale-[0.98]"
                                            disabled={form.processing}
                                            style={{ ...submitBtnStyle, opacity: form.processing ? 0.65 : 1, cursor: form.processing ? 'not-allowed' : 'pointer' }}
                                        >
                                            {form.processing ? (
                                                <>
                                                    <i aria-hidden="true" className="fa-solid fa-circle-notch fa-spin" />
                                                    جارٍ الدخول...
                                                </>
                                            ) : (
                                                'تسجيل الدخول'
                                            )}
                                        </button>
                                    </form>

                                    <p className="mt-6 text-center text-[14px] text-[#4b5563]">
                                        ليس لديك حساب؟{' '}
                                        <Link href={route('register')} className="font-bold text-[#1f7045] hover:text-[#16a34a]">
                                            سجّل الآن
                                        </Link>
                                    </p>

                                    <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#4b5563]">
                                        <i className="fa-solid fa-lock text-[11px] text-[#16a34a]" aria-hidden="true" />
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