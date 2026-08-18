import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

const channels = [
    {
        icon: 'fa-solid fa-phone',
        title: 'الهاتف',
        desc: 'اتصل بنا مباشرة خلال ساعات العمل، من الأحد إلى الخميس.',
        href: 'tel:+966500000000',
        value: '+966500000000',
        ltr: true,
    },
    {
        icon: 'fa-solid fa-envelope',
        title: 'البريد الإلكتروني',
        desc: 'أرسل استفسارك التفصيلي، وسيرد فريقنا خلال 24 ساعة.',
        href: 'mailto:crm@eventssquare-sa.com',
        value: 'crm@eventssquare-sa.com',
        ltr: true,
    },
    {
        icon: 'fa-brands fa-whatsapp',
        title: 'واتساب',
        desc: 'راسلنا في أي وقت، ونرد عليك بأسرع ما يمكن.',
        href: 'https://wa.me/966500000000',
        value: '+966500000000',
        ltr: true,
    },
];

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

export default function Contact() {
    const { flash, settings } = usePage().props;

    const phone = settings?.phone || '+966500000000';
    const whatsapp = (settings?.whatsapp || '+966500000000').replace(/[^\d]/g, '');

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.clearErrors();
            },
        });
    };

    const channelList = channels.map((c) =>
        c.title === 'الهاتف'
            ? { ...c, href: `tel:${phone.replace(/\s/g, '')}`, value: phone }
            : c.title === 'واتساب'
                ? { ...c, href: `https://wa.me/${whatsapp}`, value: settings?.whatsapp || '+966500000000' }
                : { ...c, value: settings?.email || c.value, href: `mailto:${settings?.email || c.value}` },
    );

    return (
        <>
            <Head title="تواصل معنا" />

            <section className="page-hero">
                <div className="container">
                    <h1>نسمعك... من أبها إلى حيث أنت</h1>
                    <p>اترك رسالتك وسيرد عليك فريقنا خلال 24 ساعة — أو تواصل معنا مباشرة عبر الهاتف أو واتساب.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
                        <div className="destination-card">
                            <div className="p-7 sm:p-9">
                                <h2 className="mb-6 text-[22px] font-extrabold text-[#134527]">أرسل رسالتك</h2>

                                {flash?.success && (
                                    <div
                                        className="mb-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-[14px] font-semibold text-white"
                                        style={{ background: 'linear-gradient(135deg, var(--green-light), var(--green))' }}
                                    >
                                        <i className="fa-solid fa-circle-check text-lg" />
                                        وصلتنا رسالتك — سيتواصل معك فريقنا خلال 24 ساعة.
                                    </div>
                                )}

                                <form onSubmit={submit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label style={labelStyle}>الاسم الكامل</label>
                                        <input
                                            style={inputStyle}
                                            value={form.data.name}
                                            onChange={(e) => { form.setData('name', e.target.value); form.clearErrors('name'); }}
                                            placeholder="مثال: عبدالله محمد"
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
                                        <label style={labelStyle}>رقم الجوال</label>
                                        <input
                                            style={inputStyle}
                                            dir="ltr"
                                            value={form.data.phone}
                                            onChange={(e) => { form.setData('phone', e.target.value); form.clearErrors('phone'); }}
                                            placeholder="+9665XXXXXXXX"
                                        />
                                        {form.errors.phone && <p style={errorStyle}>{form.errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>الموضوع</label>
                                        <input
                                            style={inputStyle}
                                            value={form.data.subject}
                                            onChange={(e) => { form.setData('subject', e.target.value); form.clearErrors('subject'); }}
                                            placeholder="مثال: استفسار عن فعالية قادمة"
                                        />
                                        {form.errors.subject && <p style={errorStyle}>{form.errors.subject}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label style={labelStyle}>الرسالة</label>
                                        <textarea
                                            style={{ ...inputStyle, resize: 'vertical', minHeight: 150 }}
                                            value={form.data.message}
                                            onChange={(e) => { form.setData('message', e.target.value); form.clearErrors('message'); }}
                                            placeholder="اكتب رسالتك هنا بتفصيل، وسيرد عليك فريقنا خلال 24 ساعة."
                                        />
                                        {form.errors.message && <p style={errorStyle}>{form.errors.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <button type="submit" className="btn-primary w-full" disabled={form.processing} style={{ opacity: form.processing ? 0.7 : 1 }}>
                                            {form.processing ? 'جارٍ الإرسال...' : 'أرسل رسالتك'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="bottom-accent" />
                        </div>

                        <div className="flex flex-col gap-5">
                            <h3 className="text-center text-[20px] font-extrabold text-[#134527]">قنوات تواصل مباشرة</h3>
                            {channelList.map((c) => (
                                <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="destination-card">
                                    <div className="flex items-center gap-4 p-6">
                                        <span
                                            className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full text-white"
                                            style={{ background: 'linear-gradient(135deg, var(--green-light), var(--sky))', boxShadow: '0 10px 24px rgba(22,163,74,0.3)' }}
                                        >
                                            <i className={`${c.icon} text-[20px]`} />
                                        </span>
                                        <div>
                                            <h4 className="text-[17px] font-extrabold text-[#134527]">{c.title}</h4>
                                            <p className="mt-1 text-[13px] leading-[1.7] text-[#6b7280]">{c.desc}</p>
                                            <span dir="ltr" className="mt-1.5 block text-[14px] font-bold text-[#1f7045]">{c.value}</span>
                                        </div>
                                    </div>
                                    <div className="bottom-accent" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page) => <AppLayout>{page}</AppLayout>;
