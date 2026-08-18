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

export default function Login() {
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
                    <div className="mx-auto w-full max-w-[460px]">
                        <div className="destination-card">
                            <div className="px-8 pb-9 pt-10 sm:px-10">
                                <div className="mb-7 text-center">
                                    <img src="/img/logo.png" alt="ساحة الفعاليات" className="mx-auto mb-5 h-[64px] w-auto" />
                                    <h1 className="text-[26px] font-extrabold text-[#134527]">أهلاً بعودتك</h1>
                                    <p className="mt-2 text-[14px] leading-[1.8] text-[#6b7280]">أكمل من حيث توقفت — فعاليات عسير ووجهاتها بانتظارك.</p>
                                </div>

                                <form onSubmit={submit} className="flex flex-col gap-5">
                                    <div>
                                        <label style={labelStyle}>البريد الإلكتروني</label>
                                        <input
                                            style={inputStyle}
                                            dir="ltr"
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => { form.setData('email', e.target.value); form.clearErrors('email'); }}
                                            placeholder="name@example.com"
                                            autoFocus
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
                                            placeholder="أدخل كلمة مرورك"
                                        />
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
                                            className="inline-flex items-center gap-2 text-[12.5px] text-[#6b7280]"
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
