import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { SectionHeader } from '@/components/site/ui';

const packages = [
    {
        name: 'الباقة الأساسية',
        price: '500',
        features: [
            'إدراج وجهتك في دليل الوجهات داخل فئتك',
            'اسمك ووصفك ورقم تواصلك في صفحتك',
            'صورة رئيسية تعرّف بعلامتك',
            'تحديث بياناتك مرة كل شهر',
            'تقرير مشاهدات أساسي شهرياً',
        ],
        cta: 'ابدأ بالباقة الأساسية',
        featured: false,
    },
    {
        name: 'الباقة المميزة',
        badge: 'الأكثر طلباً',
        price: '1200',
        features: [
            'كل مزايا الباقة الأساسية',
            'ظهور بارز في أعلى نتائج فئتك',
            'صور إضافية تُظهر تفاصيل وجهتك',
            'ظهور متجدد في الصفحة الرئيسية أسبوعياً',
            'تقرير أداء تفصيلي: مشاهدات، نقرات، وطلبات تواصل',
        ],
        cta: 'ارتقِ بالباقة المميزة',
        featured: true,
    },
    {
        name: 'الباقة الاستثنائية',
        price: '3000',
        features: [
            'كل مزايا الباقة المميزة',
            'بانر إعلاني في الصفحة الرئيسية',
            'مقال أو تقرير تعريفي بعلامتك شهرياً',
            'نشر فعالياتك في قسم الفعاليات لحظة إطلاقها',
            'مدير حساب مخصص وتقرير أداء أسبوعي',
        ],
        cta: 'احجز الباقة الاستثنائية',
        featured: false,
    },
];

const benefits = [
    { icon: 'fa-chart-line', title: 'وصول أوسع', desc: 'اعرض ما تقدمه لآلاف الزوار الذين يزورون المنصة شهرياً بحثاً عن وجهات عسير وفعالياتها.' },
    { icon: 'fa-users-viewfinder', title: 'جمهور مستهدف', desc: 'زوارنا يخططون لرحلاتهم فعلاً — يصلك إعلانك في لحظة القرار، لا في لحظة المرور العابر.' },
    { icon: 'fa-chart-column', title: 'تقارير واضحة', desc: 'تعرف عدد من شاهد إعلانك ومن تواصل معك، فتقيس أثر كل ريال تنفقه.' },
    { icon: 'fa-headset', title: 'دعم قريب', desc: 'فريقنا يرد على استفساراتك خلال 24 ساعة، ويرافقك من أول إعلان حتى قياس نتائجه.' },
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

const errorStyle = { marginTop: 5, fontSize: 12.5, color: '#D92315' };

export default function Sales() {
    const { settings } = usePage().props;

    // رقم الواتساب يُقرأ من الإعدادات (settings.whatsapp) — نفس المفتاح في Footer/Contact
    const whatsappRaw = settings?.whatsapp || '+966500000000';
    const whatsappNumber = whatsappRaw.replace(/\D/g, '');
    const waLink = `https://wa.me/${whatsappNumber}`;

    const quoteForm = useForm({ name: '', phone: '', package: '', message: '', subject: '' });

    const submitQuote = (e) => {
        e.preventDefault();
        // subject يُشتق من الباقة المختارة، ويُرسل مع rest الحقول عبر contact.store
        const quotePackage = quoteForm.data.package || 'باقة عامة';
        quoteForm.setData('subject', `طلب عرض سعر - ${quotePackage}`);
        quoteForm.post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                quoteForm.reset();
                quoteForm.clearErrors();
            },
        });
    };

    return (
        <>
            <Head title="أعلن معنا">
                <meta name="description" content="ضع علامتك في قلب عسير — باقات إعلانية وتجارية لعرض وجهتك أمام آلاف زوار ساحة الفعاليات شهرياً، مع وصول مستهدف وتقارير واضحة." />
            </Head>

            <section className="page-hero">
                <div className="container">
                    <h1>ضع علامتك في قلب عسير</h1>
                    <p>
                        آلاف زوار ساحة الفعاليات يبحثون شهرياً عن وجهات عسير وفعالياتها وعروضها.
                        <br />
                        احجز مساحتك الإعلانية، واعرض ما تقدمه على الجمهور المناسب في لحظة القرار.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHeader tag="الباقات" title="اختر الباقة التي تناسب هدفك" />
                    <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
                        {packages.map((p) => (
                            <div
                                key={p.name}
                                className="destination-card relative"
                                style={p.featured ? { border: '2px solid var(--green-light)', boxShadow: '0 25px 60px -15px rgba(31,112,69,0.28)' } : undefined}
                            >
                                {p.badge && (
                                    <span
                                        className="absolute -top-4 right-1/2 z-10 translate-x-1/2 rounded-full px-5 py-1.5 text-[13px] font-bold text-white"
                                        style={{ background: 'linear-gradient(135deg, var(--green), var(--teal))', boxShadow: '0 10px 24px rgba(19,69,39,0.35)' }}
                                    >
                                        {p.badge}
                                    </span>
                                )}
                                <div className="px-7 pb-7 pt-9 text-center">
                                    <h3 className="card-title text-[22px]">{p.name}</h3>
                                    <div className="mt-3 flex items-end justify-center gap-2">
                                        <span className="text-[42px] font-extrabold leading-none text-[#134527]">{p.price}</span>
                                        <span className="pb-1 text-[15px] font-semibold text-[#6b7280]">ريال/شهرياً</span>
                                    </div>
                                    <ul className="mx-auto mt-6 mb-7 flex max-w-[320px] flex-col gap-3 text-right">
                                        {p.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.8] text-[#4b5563]">
                                                <i className="fa-solid fa-check mt-1.5 shrink-0 text-[13px] text-[#16a34a]" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={route('contact', { package: p.name })} className={`cta-button ${p.featured ? 'featured' : ''}`} style={p.featured ? { background: 'var(--green)', color: '#fff', borderColor: 'var(--green)' } : undefined}>
                                        {p.cta}
                                    </Link>
                                </div>
                                <div className="bottom-accent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHeader tag="مزايا الإعلان" title="لماذا تعلن معنا؟" />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((b) => (
                            <div key={b.title} className="destination-card">
                                <div className="flex flex-col items-center px-6 py-8 text-center">
                                    <span
                                        className="mb-4 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full text-white"
                                        style={{ background: 'linear-gradient(135deg, var(--green-light), var(--sky))', boxShadow: '0 12px 28px rgba(22,163,74,0.35)' }}
                                    >
                                        <i className={`fa-solid ${b.icon} text-[22px]`} />
                                    </span>
                                    <h3 className="card-title text-[19px]">{b.title}</h3>
                                    <p className="text-[13.5px] leading-[1.9] text-[#6b7280]">{b.desc}</p>
                                </div>
                                <div className="bottom-accent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section sand">
                <div className="container">
                    <SectionHeader
                        tag="ابدأ الآن"
                        title="اطلب عرض سعر مخصصاً"
                        description="أرسل بياناتك، ويعود إليك فريقنا بعرض يوازن هدفك وميزانيتك خلال 24 ساعة — بدون التزام من طرفك."
                    />

                    <div className="mx-auto mb-12 max-w-3xl">
                        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-9">
                            {quoteForm.recentlySuccessful && (
                                <div
                                    className="mb-6 flex items-center gap-3 rounded-2xl px-5 py-4 text-[14px] font-semibold text-white"
                                    style={{ background: 'linear-gradient(135deg, var(--green-light), var(--green))' }}
                                >
                                    <i className="fa-solid fa-circle-check text-lg" />
                                    وصل طلبك بنجاح — سيعود إليك فريقنا بعرض سعر مخصص خلال 24 ساعة.
                                </div>
                            )}

                            <form onSubmit={submitQuote} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label style={{ display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' }}>
                                        الاسم
                                    </label>
                                    <input
                                        style={inputStyle}
                                        value={quoteForm.data.name}
                                        onChange={(e) => { quoteForm.setData('name', e.target.value); quoteForm.clearErrors('name'); }}
                                        placeholder="اسمك الكامل"
                                    />
                                    {quoteForm.errors.name && <p style={errorStyle}>{quoteForm.errors.name}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' }}>
                                        رقم الجوال
                                    </label>
                                    <input
                                        style={inputStyle}
                                        dir="ltr"
                                        type="tel"
                                        inputMode="tel"
                                        value={quoteForm.data.phone}
                                        onChange={(e) => { quoteForm.setData('phone', e.target.value); quoteForm.clearErrors('phone'); }}
                                        placeholder="+9665XXXXXXXX"
                                    />
                                    {quoteForm.errors.phone && <p style={errorStyle}>{quoteForm.errors.phone}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' }}>
                                        الباقة المطلوبة
                                    </label>
                                    <select
                                        style={{ ...inputStyle, appearance: 'auto' }}
                                        value={quoteForm.data.package}
                                        onChange={(e) => { quoteForm.setData('package', e.target.value); quoteForm.clearErrors('package'); }}
                                    >
                                        <option value="">— اختر باقة —</option>
                                        {packages.map((p) => (
                                            <option key={p.name} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                    {quoteForm.errors.package && <p style={errorStyle}>{quoteForm.errors.package}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <label style={{ display: 'block', marginBottom: 7, fontSize: 14, fontWeight: 600, color: '#134527' }}>
                                        رسالتك
                                    </label>
                                    <textarea
                                        style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                                        value={quoteForm.data.message}
                                        onChange={(e) => { quoteForm.setData('message', e.target.value); quoteForm.clearErrors('message'); }}
                                        placeholder="حدثنا عن نشاطك واحتياجاتك، لنجهّز لك عرضاً مخصصاً."
                                    />
                                    {quoteForm.errors.message && <p style={errorStyle}>{quoteForm.errors.message}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <button type="submit" className="btn-primary w-full" disabled={quoteForm.processing} style={{ opacity: quoteForm.processing ? 0.7 : 1 }}>
                                        {quoteForm.processing ? 'جارٍ الإرسال...' : 'أرسل طلب عرض السعر'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ background: '#25D366', boxShadow: '0 10px 30px rgba(37,211,102,0.4)' }}
                        >
                            <i className="fa-brands fa-whatsapp text-xl" />
                            اطلب عرضك عبر واتساب
                        </a>
                        <Link href={route('contact')} className="btn-primary">
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

Sales.layout = (page) => <AppLayout>{page}</AppLayout>;
