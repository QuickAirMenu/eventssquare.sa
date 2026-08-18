import { Head, Link } from '@inertiajs/react';
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

export default function Sales() {
    return (
        <>
            <Head title="أعلن معنا" />

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
                                    <Link href={route('contact')} className={`cta-button ${p.featured ? 'featured' : ''}`} style={p.featured ? { background: 'var(--green)', color: '#fff', borderColor: 'var(--green)' } : undefined}>
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
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://wa.me/966500000000"
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
