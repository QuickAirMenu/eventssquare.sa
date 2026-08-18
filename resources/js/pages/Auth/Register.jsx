import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

const inputStyle = {
    width: '100%',
    border: '2px solid #e5e7eb',
    borderRadius: 14,
    padding: '13px 16px',
    fontSize: 15,
    fontFamily: 'inherit',
    color: '#1f2937',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.3s',
};

const labelStyle = { display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' };
const errorStyle = { marginTop: 5, fontSize: 12.5, color: '#D92315' };

export default function Register() {
    const form = useForm({ name: '', email: '', password: '', password_confirmation: '' });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('register.store'));
    };

    return (
        <>
            <Head title="إنشاء حساب" />

            <section className="section sand" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="mx-auto w-full max-w-[460px]">
                        <div className="destination-card">
                            <div className="px-8 pb-9 pt-10 sm:px-10">
                                <div className="mb-7 text-center">
                                    <img src="/img/logo.png" alt="ساحة الفعاليات" className="mx-auto mb-5 h-[64px] w-auto" />
                                    <h1 className="text-[26px] font-extrabold text-[#134527]">انضم إلى ساحة الفعاليات</h1>
                                    <p className="mt-2 text-[14px] leading-[1.8] text-[#6b7280]">حساب واحد يجمع لك فعاليات عسير ووجهاتها وعروضها — خطط رحلتك القادمة بثقة.</p>
                                </div>

                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <div>
                                        <label style={labelStyle}>الاسم الكامل</label>
                                        <input
                                            style={inputStyle}
                                            value={form.data.name}
                                            onChange={(e) => { form.setData('name', e.target.value); form.clearErrors('name'); }}
                                            placeholder="مثال: سارة العسيري"
                                            autoFocus
                                        />
                                        {form.errors.name && <p style={errorStyle}>{form.errors.name}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>البريد الإلكتروني</label>
                                        <input
                                            style={inputStyle}
                                            dir="ltr"
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => { form.setData('email', e.target.value); form.clearErrors('email'); }}
                                            placeholder="name@example.com"
                                        />
                                        {form.errors.email && <p style={errorStyle}>{form.errors.email}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>كلمة المرور</label>
                                        <input
                                            style={inputStyle}
                                            dir="ltr"
                                            type="password"
                                            value={form.data.password}
                                            onChange={(e) => { form.setData('password', e.target.value); form.clearErrors('password'); }}
                                            placeholder="8 أحرف على الأقل، بأرقام ورموز"
                                        />
                                        {form.errors.password && <p style={errorStyle}>{form.errors.password}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>تأكيد كلمة المرور</label>
                                        <input
                                            style={inputStyle}
                                            dir="ltr"
                                            type="password"
                                            value={form.data.password_confirmation}
                                            onChange={(e) => { form.setData('password_confirmation', e.target.value); form.clearErrors('password_confirmation'); }}
                                            placeholder="أعد كتابة كلمة المرور نفسها"
                                        />
                                        {form.errors.password_confirmation && <p style={errorStyle}>{form.errors.password_confirmation}</p>}
                                    </div>

                                    <button type="submit" className="btn-primary w-full" disabled={form.processing} style={{ opacity: form.processing ? 0.7 : 1 }}>
                                        {form.processing ? 'جارٍ التسجيل...' : 'سجّل الآن واستكشف عسير'}
                                    </button>
                                </form>

                                <p className="mt-5 text-center text-[12.5px] leading-[1.8] text-[#6b7280]">
                                    بالتسجيل في ساحة الفعاليات، توافق على شروط الاستخدام وسياسة الخصوصية.
                                </p>

                                <p className="mt-4 text-center text-[14px] text-[#4b5563]">
                                    لديك حساب؟{' '}
                                    <Link href={route('login')} className="font-bold text-[#1f7045] hover:text-[#16a34a]">
                                        سجّل دخولك
                                    </Link>
                                </p>
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
