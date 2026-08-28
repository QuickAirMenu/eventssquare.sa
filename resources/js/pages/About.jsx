import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { SectionHeader } from '@/components/site/ui';

const features = [
    { icon: 'fa-map-location-dot', title: 'تغطية شاملة', desc: 'من أبها وخميس مشيط إلى السحاب والقرى التراثية — وجهات عسير كاملة في مكان واحد.' },
    { icon: 'fa-circle-check', title: 'محتوى موثوق', desc: 'نتحقق من تفاصيل كل وجهة وفعالية قبل نشرها، فتصلك معلومات دقيقة تستحق ثقتك.' },
    { icon: 'fa-wand-magic-sparkles', title: 'تجربة سهلة', desc: 'تصفح، قارن، واختر تجربتك خلال دقائق — واجهة صُممت لك، لا للتقنية.' },
    { icon: 'fa-hand-holding-heart', title: 'دعم المستهدفين المحليين', desc: 'نمنح أصحاب المنشآت والمواهب في عسير مساحة يصلون منها إلى جمهورهم، فينمو المحتوى المحلي وينتشر.' },
    { icon: 'fa-handshake', title: 'ربط الشركاء', desc: 'نوصلك بالجهات المنظمة والمنشآت مباشرة — بلا وسطاء وبلا دورة طويلة.' },
    { icon: 'fa-bolt', title: 'أحداث لحظية', desc: 'تابع الفعاليات الجارية والقادمة أولاً بأول، ولا تفوّت فعالية تشبه ذوقك.' },
];

const stats = [
    { number: '+120', label: 'وجهة سياحية' },
    { number: '+450', label: 'فعالية في الموسم' },
    { number: '+80', label: 'شريك معنا' },
    { number: '250,000+', label: 'زائر شهرياً' },
];

export default function About() {
    return (
        <>
            <Head title="عن المنصة">
                <meta name="description" content="تعرّف على ساحة الفعاليات — منصة عسير الإلكترونية للوجهات السياحية والفعاليات والعروض، وقصّتها في إثراء الحياة ورسم البهجة." />
            </Head>

            <section className="page-hero">
                <div className="container">
                    <h1>هنا تبدأ حكايتك مع عسير</h1>
                    <p>
                        ساحة الفعاليات منصة إلكترونية تفاعلية تهتم بإثراء الحياة ورسم البهجة في معالم ووجهات عسير السياحية.
                        <br />
                        فعاليات ووجهات وعروض وأنشطة في مكان واحد — اختر تجربتك القادمة وخطط لها في دقائق.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHeader tag="قصتنا" title="قصة المنصة" />
                    <div className="mx-auto max-w-[820px] space-y-6 text-center">
                        <p className="text-[16px] leading-[2.1] text-[#4b5563]">
                            وُلدت ساحة الفعاليات من قناعة راسخة: عسير غنية بتجاربها، وأهلها أقدر الناس على تقديمها. لذلك بنينا منصة إلكترونية تفاعلية تهتم بإثراء الحياة، ورسم البهجة، وخلق عالم من الخيال في معالم ووجهات عسير السياحية. من القصور التراثية المطلّة على الضباب، إلى المنتزهات المعلّقة بين الجبال، إلى الأسواق التي تحفظ حكايات المنطقة — نجمع هذا كله في ساحة واحدة تليق به، ونقربه من كل زائر يبحث عن تجربة تُروى وتُتذكّر.
                        </p>
                        <p className="text-[16px] leading-[2.1] text-[#4b5563]">
                            اليوم، تختصر ساحة الفعاليات على الزائر عناء البحث المتفرق؛ فعنده وجهات عسير مصنفة حسب اهتمامه، وفعالياتها تصل إليه لحظة بلحظة، وعروضها وأنشطتها في متناول يده. ولا نقف عند حدود العرض؛ فنحن نرافق أصحاب المنشآت المحلية والجهات المنظمة، ونمنحهم مساحة يوصلون منها خدماتهم إلى جمهور يبحث عنهم فعلاً. النتيجة: زائر يخطط رحلته بثقة، وشريك ينمو عمله، وعسير تظهر كما تستحق.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section alt">
                <div className="container">
                    <SectionHeader tag="مزايانا" title="لماذا ساحة الفعاليات؟" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <div key={f.title} className="destination-card">
                                <div className="flex flex-col items-center px-6 py-9 text-center">
                                    <span
                                        className="mb-5 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full text-white"
                                        style={{ background: 'linear-gradient(135deg, var(--green-light), var(--sky))', boxShadow: '0 12px 28px rgba(22,163,74,0.35)' }}
                                    >
                                        <i className={`fa-solid ${f.icon} text-2xl`} />
                                    </span>
                                    <h3 className="card-title text-[20px]">{f.title}</h3>
                                    <p className="text-[14px] leading-[1.9] text-[#6b7280]">{f.desc}</p>
                                </div>
                                <div className="bottom-accent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="band">
                        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
                            {stats.map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="text-[clamp(2.2rem,4.5vw,3.2rem)] font-extrabold leading-tight">{s.number}</div>
                                    <div className="mt-2 text-[15px] font-medium text-white/75">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section sand">
                <div className="container">
                    <SectionHeader tag="شراكة" title="عندك وجهة تليق بعسير؟" description="تواصل معنا — وصل تجربتك إلى جمهور يبحث عنها الآن." />
                    <div className="text-center">
                        <Link href={route('contact')} className="btn-primary">
                            ابدأ حديثك مع فريقنا
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

About.layout = (page) => <AppLayout>{page}</AppLayout>;
