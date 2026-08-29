import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import {
    inputStyle,
    labelStyle,
    errorStyle,
    fieldIcon,
    focusStyle,
    blurStyle,
    cardStyle,
    sideCardStyle,
    submitBtnStyle,
    flashSuccessStyle,
} from '@/components/site/fieldStyles';

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

/** ظل ناعم موحّد للبطاقات الجانبية + hover خفيف عبر كلاسات Tailwind */
const sideShadow = 'shadow-[0_20px_50px_-12px_rgba(19,69,39,0.12)]';
const sideHover = 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-14px_rgba(19,69,39,0.22)]';

export default function Contact() {
    const { flash, settings, package: packageProp } = usePage().props;

    const phone = settings?.phone || '+966500000000';
    const whatsapp = (settings?.whatsapp || '+966500000000').replace(/[^\d]/g, '');
    const address = settings?.address || 'أبها، منطقة عسير، المملكة العربية السعودية';

    // الباقة المرسلة عبر query (?package=...) — متسامح: من props أولاً، ثم من window.location.search
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const selectedPackage = packageProp || urlParams.get('package') || '';

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        subject: selectedPackage ? `طلب عرض سعر - الباقة: ${selectedPackage}` : '',
        message: selectedPackage ? `أرغب بالاستفسار عن الباقة: ${selectedPackage}` : '',
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
            <Head title="تواصل معنا">
                <meta name="description" content="تواصل مع فريق ساحة الفعاليات — اترك رسالتك وسيرد عليك خلال 24 ساعة، أو راسلنا مباشرة عبر الهاتف والواتساب." />
            </Head>

            <section className="page-hero">
                <div className="container">
                    <h1>نسمعك... من أبها إلى حيث أنت</h1>
                    <p>اترك رسالتك وسيرد عليك فريقنا خلال 24 ساعة — أو تواصل معنا مباشرة عبر الهاتف أو واتساب.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_420px]">
                        {/* بطاقة النموذج */}
                        <div style={cardStyle}>
                            <div className="p-8 sm:p-10">
                                <h2 className="text-[24px] font-extrabold text-[#134527]">أرسل رسالتك</h2>
                                <p className="mt-2 text-[15px] leading-[1.8] text-[#4b5563]">
                                    سيصلنا استفسارك فوراً، وسيرد عليك الفريق خلال 24 ساعة.
                                </p>

                                {selectedPackage && (
                                    <div
                                        className="mt-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-[14px] font-semibold"
                                        style={{ ...flashSuccessStyle, color: '#134527' }}
                                    >
                                        <i className="fa-solid fa-gift text-[#16a34a]" />
                                        تم تحديد الباقة: <strong className="mr-1">{selectedPackage}</strong> — أكمل بياناتك وسيتواصل معك فريقنا.
                                    </div>
                                )}

                                {flash?.success && (
                                    <div
                                        className="mt-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-[14px] font-semibold"
                                        style={{ ...flashSuccessStyle, color: '#134527' }}
                                    >
                                        <i className="fa-solid fa-circle-check text-[#16a34a]" />
                                        وصلتنا رسالتك — سيتواصل معك فريقنا خلال 24 ساعة.
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="contact-name" style={labelStyle}>الاسم الكامل</label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fa-solid fa-user" aria-hidden="true" style={fieldIcon()} />
                                            <input
                                                id="contact-name"
                                                style={inputStyle}
                                                autoComplete="name"
                                                value={form.data.name}
                                                onChange={(e) => { form.setData('name', e.target.value); form.clearErrors('name'); }}
                                                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.name))}
                                                placeholder="مثال: عبدالله محمد"
                                            />
                                        </div>
                                        {form.errors.name && <p style={errorStyle}>{form.errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" style={labelStyle}>البريد الإلكتروني</label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fa-solid fa-envelope" aria-hidden="true" style={fieldIcon()} />
                                            <input
                                                id="contact-email"
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
                                        <label htmlFor="contact-phone" style={labelStyle}>رقم الجوال</label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fa-solid fa-phone" aria-hidden="true" style={fieldIcon()} />
                                            <input
                                                id="contact-phone"
                                                style={inputStyle}
                                                dir="ltr"
                                                type="tel"
                                                inputMode="tel"
                                                autoComplete="tel"
                                                value={form.data.phone}
                                                onChange={(e) => { form.setData('phone', e.target.value); form.clearErrors('phone'); }}
                                                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.phone))}
                                                placeholder="+9665XXXXXXXX"
                                            />
                                        </div>
                                        {form.errors.phone && <p style={errorStyle}>{form.errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-subject" style={labelStyle}>الموضوع</label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fa-solid fa-bullhorn" aria-hidden="true" style={fieldIcon()} />
                                            <input
                                                id="contact-subject"
                                                style={inputStyle}
                                                value={form.data.subject}
                                                onChange={(e) => { form.setData('subject', e.target.value); form.clearErrors('subject'); }}
                                                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.subject))}
                                                placeholder="مثال: استفسار عن فعالية قادمة"
                                            />
                                        </div>
                                        {form.errors.subject && <p style={errorStyle}>{form.errors.subject}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="contact-message" style={labelStyle}>الرسالة</label>
                                        <div style={{ position: 'relative' }}>
                                            <i className="fa-solid fa-message" aria-hidden="true" style={{ ...fieldIcon(), top: 24 }} />
                                            <textarea
                                                id="contact-message"
                                                style={{ ...inputStyle, resize: 'vertical', minHeight: 150, paddingTop: 16 }}
                                                value={form.data.message}
                                                onChange={(e) => { form.setData('message', e.target.value); form.clearErrors('message'); }}
                                                onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                                                onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle(!!form.errors.message))}
                                                placeholder="اكتب رسالتك هنا بتفصيل، وسيرد عليك فريقنا خلال 24 ساعة."
                                            />
                                        </div>
                                        {form.errors.message && <p style={errorStyle}>{form.errors.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <button
                                            type="submit"
                                            className="btn-primary w-full active:scale-[0.98]"
                                            disabled={form.processing}
                                            style={{ ...submitBtnStyle, opacity: form.processing ? 0.65 : 1, cursor: form.processing ? 'not-allowed' : 'pointer' }}
                                        >
                                            {form.processing ? (
                                                <>
                                                    <i aria-hidden="true" className="fa-solid fa-circle-notch fa-spin" />
                                                    جارٍ الإرسال...
                                                </>
                                            ) : (
                                                'أرسل رسالتك'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="bottom-accent" />
                        </div>

                        {/* العمود الجانبي */}
                        <div className="flex flex-col gap-5">
                            <div className="text-center">
                                <p className="text-[13px] font-bold text-[#16a34a]">فريقنا جاهز للإجابة</p>
                                <h3 className="mt-1 text-[22px] font-extrabold text-[#134527]">قنوات تواصل مباشرة</h3>
                            </div>

                            {channelList.map((c) => (
                                <a
                                    key={c.title}
                                    href={c.href}
                                    target={c.href.startsWith('http') ? '_blank' : undefined}
                                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`group ${sideShadow} ${sideHover} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]`}
                                    style={sideCardStyle}
                                >
                                    <div className="flex items-center gap-4 p-6">
                                        <span
                                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
                                            style={{ background: 'linear-gradient(135deg, var(--green-light), var(--sky))', boxShadow: '0 10px 22px rgba(22,163,74,0.28)' }}
                                        >
                                            <i aria-hidden="true" className={`${c.icon} text-[19px]`} />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="text-[17px] font-extrabold text-[#134527]">{c.title}</h4>
                                                <i aria-hidden="true" className="fa-solid fa-arrow-left text-[12px] text-[#16a34a] transition-transform duration-300 group-hover:-translate-x-1" />
                                            </div>
                                            <p className="mt-1 text-[13.5px] leading-[1.7] text-[#4b5563]">{c.desc}</p>
                                            <span dir="ltr" className="mt-1.5 block truncate text-[14px] font-bold text-[#1f7045]">{c.value}</span>
                                        </div>
                                    </div>
                                    <div className="bottom-accent" />
                                </a>
                            ))}

                            {/* بطاقة ساعات العمل */}
                            <div className={`${sideShadow} ${sideHover}`} style={sideCardStyle}>
                                <div className="flex items-start gap-4 p-6">
                                    <span
                                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
                                        style={{ background: 'linear-gradient(135deg, var(--teal), var(--sky))', boxShadow: '0 10px 22px rgba(18,69,87,0.28)' }}
                                    >
                                        <i aria-hidden="true" className="fa-solid fa-clock text-[19px]" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-[17px] font-extrabold text-[#134527]">ساعات العمل</h4>
                                        <div className="mt-2 space-y-1.5 text-[13.5px] leading-[1.8] text-[#4b5563]">
                                            <p className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-[#134527]">الأحد – الخميس</span>
                                                <span dir="ltr" className="font-bold text-[#1f7045]">9ص – 5م</span>
                                            </p>
                                            <p className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-[#134527]">الجمعة – السبت</span>
                                                <span className="text-[#4b5563]">إجازة أسبوعية</span>
                                            </p>
                                        </div>
                                        {settings?.address && (
                                            <p className="mt-3 flex items-start gap-2 border-t border-[#e5e7eb] pt-3 text-[13px] leading-[1.7] text-[#4b5563]">
                                                <i className="fa-solid fa-location-dot mt-0.5 text-[#16a34a]" />
                                                <span>{address}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="bottom-accent" />
                            </div>

                            {/* بطاقة الموقع */}
                            <div className={`${sideShadow} ${sideHover}`} style={sideCardStyle}>
                                <div className="p-6">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                                            style={{ background: 'linear-gradient(135deg, var(--green-light), var(--green))', boxShadow: '0 10px 22px rgba(22,163,74,0.28)' }}
                                        >
                                            <i aria-hidden="true" className="fa-solid fa-map-location-dot text-[17px]" />
                                        </span>
                                        <h4 className="text-[17px] font-extrabold text-[#134527]">موقعنا</h4>
                                    </div>
                                    <p className="mt-3 text-[14px] leading-[1.8] text-[#4b5563]">{address}</p>
                                    <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#16a34a] bg-white py-3 text-[15px] font-bold text-[#1f7045] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#16a34a] hover:text-white hover:shadow-[0_12px_28px_-8px_rgba(22,163,74,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                                    >
                                        <i aria-hidden="true" className="fa-solid fa-location-arrow text-[13px]" />
                                        افتح في خرائط جوجل
                                    </a>
                                </div>
                                <div className="bottom-accent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page) => <AppLayout>{page}</AppLayout>;