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
    { icon: 'fa-solid fa-location-dot', text: 'احفظ وجهاتك المفضلة في عسير' },
    { icon: 'fa-solid fa-calendar-week', text: 'تلقَّ إشعارات الفعاليات القادمة' },
    { icon: 'fa-solid fa-gem', text: 'انضم إلى برنامج العروض الحصرية' },
];

const stats = [
    { value: '+120', label: 'فعالية شهرياً' },
    { value: '+40', label: 'وجهة مميزة' },
    { value: '+18', label: 'محافظة مغطاة' },
];

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

    return (
        <>
            <Head title="إنشاء حساب" />

            <section className="section sand" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="mx-auto w-full max-w-[1040px]">
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
                                            <h2 className="text-[31px] font-extrabold leading-[1.6]">
                                                انضم إلينا…
                                                <span className="block text-[#fcd34d]">وابدأ رحلتك في عسير</span>
                                            </h2>
                                            <p className="mt-3 text-[15px] leading-[1.9] text-white/80">
                                                حساب واحد يجمع لك الفعاليات والوجهات والعروض الحصرية.
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
                                                <span className="text-[16px] font-medium leading-[1.8] text-white/90">{b.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="relative mt-10">
                                        <div className="grid grid-cols-3 divide-x divide-white/15 p-1" style={statsBarStyle}>
                                            {stats.map((s) => (
                                                <div key={s.label} className="rounded-2xl px-2 py-3 text-center">
                                                    <p className="text-[22px] font-extrabold leading-none text-white">{s.value}</p>
                                                    <p className="mt-1.5 text-[12.5px] font-medium text-white/80">{s.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-white/75">
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
                                            <h2 className="text-[15px] font-extrabold leading-snug">انضم إلى ساحة الفعاليات</h2>
                                            <p className="mt-0.5 text-[11.5px] text-white/70">حساب واحد… فعاليات ووجهات وعروض</p>
                                        </div>
                                    </div>
                                </div>

                                {/* عمود النموذج */}
                                <div className="px-7 pb-10 pt-10 sm:px-10">
                                    <div className="mb-8 text-center lg:text-right">
                                        <h1 className="text-[30px] font-extrabold text-[#134527]">انضم إلى ساحة الفعاليات</h1>
                                        <p className="mt-2 text-[15px] leading-[1.9] text-[#4b5563]">
                                            حساب واحد يجمع لك فعاليات عسير ووجهاتها وعروضها — خطط رحلتك القادمة بثقة.
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
                                    {(form.errors.email || form.errors.password || form.errors.name) && (
                                        <div
                                            className="mb-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-[#D92315]"
                                            style={flashErrorStyle}
                                        >
                                            <i className="fa-solid fa-triangle-exclamation mt-0.5" aria-hidden="true" />
                                            <span>{form.errors.email || form.errors.password || form.errors.name}</span>
                                        </div>
                                    )}

                                    <form onSubmit={submit} className="flex flex-col gap-6">
                                        <div>
                                            <label style={labelStyle}>الاسم الكامل</label>
                                            <div style={{ position: 'relative' }}>
                                                <i className="fa-solid fa-user" aria-hidden="true" style={fieldIcon()} />
                                                <input
                                                    style={inputStyle}
                                                    type="text"
                                                    autoComplete="name"
                                                    value={form.data.name}
                                                    onChange={(e) => { form.setData('name', e.target.value); form.clearErrors('name'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.name))}
                                                    placeholder="مثال: سارة العسيري"
                                                    autoFocus
                                                />
                                            </div>
                                            {form.errors.name && <p style={errorStyle}>{form.errors.name}</p>}
                                        </div>

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
                                                    autoComplete="new-password"
                                                    value={form.data.password}
                                                    onChange={(e) => { form.setData('password', e.target.value); form.clearErrors('password'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.password))}
                                                    placeholder="8 أحرف على الأقل، بأرقام ورموز"
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

                                            {/* مؤشر قوة كلمة المرور */}
                                            {form.data.password && (
                                                <div className="mt-3">
                                                    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: '#e5e7eb' }}>
                                                        <div
                                                            className="h-full rounded-full transition-all duration-300"
                                                            style={{ width: `${strength.pct}%`, background: strength.color }}
                                                        />
                                                    </div>
                                                    <p className="mt-1.5 text-[13px] font-semibold" style={{ color: strength.color }}>
                                                        قوة كلمة المرور: {strength.text}
                                                    </p>
                                                </div>
                                            )}

                                            {form.errors.password && <p style={errorStyle}>{form.errors.password}</p>}
                                        </div>

                                        <div>
                                            <label style={labelStyle}>تأكيد كلمة المرور</label>
                                            <div style={{ position: 'relative' }}>
                                                <i className="fa-solid fa-lock" aria-hidden="true" style={fieldIcon()} />
                                                <input
                                                    style={{ ...inputStyle, paddingInlineEnd: 52 }}
                                                    type={showConfirm ? 'text' : 'password'}
                                                    autoComplete="new-password"
                                                    value={form.data.password_confirmation}
                                                    onChange={(e) => { form.setData('password_confirmation', e.target.value); form.clearErrors('password_confirmation'); }}
                                                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.password_confirmation))}
                                                    placeholder="أعد كتابة كلمة المرور نفسها"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirm((s) => !s)}
                                                    aria-label={showConfirm ? 'إخفاء تأكيد كلمة المرور' : 'إظهار تأكيد كلمة المرور'}
                                                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                                                    style={eyeButtonStyle}
                                                >
                                                    <i aria-hidden="true" className={showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
                                                </button>
                                            </div>
                                            {form.data.password_confirmation && form.data.password && form.data.password !== form.data.password_confirmation && (
                                                <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#D92315]">
                                                    <i aria-hidden="true" className="fa-solid fa-triangle-exclamation text-[11px]" />
                                                    كلمتا المرور غير متطابقتين
                                                </p>
                                            )}
                                            {form.errors.password_confirmation && <p style={errorStyle}>{form.errors.password_confirmation}</p>}
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
                                                    جارٍ التسجيل...
                                                </>
                                            ) : (
                                                'سجّل الآن'
                                            )}
                                        </button>
                                    </form>

                                    <p className="mt-5 text-center text-[14px] font-medium leading-[1.9] text-[#374151]">
                                        بالتسجيل في ساحة الفعاليات، توافق على شروط الاستخدام وسياسة الخصوصية.
                                    </p>

                                    <p className="mt-4 text-center text-[15px] text-[#4b5563]">
                                        لديك حساب؟{' '}
                                        <Link href={route('login')} className="font-bold text-[#1f7045] hover:text-[#16a34a]">
                                            سجّل دخولك
                                        </Link>
                                    </p>

                                    <p className="mt-4 flex items-center justify-center gap-2 text-[13.5px] text-[#4b5563]">
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

Register.layout = (page) => <AppLayout>{page}</AppLayout>;