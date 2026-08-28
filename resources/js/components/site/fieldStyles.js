/**
 * أنماط مشتركة للنماذج والبطاقات — ملف واحد معتمد في:
 *   - pages/Auth/Login.jsx
 *   - pages/Auth/Register.jsx
 *   - pages/Contact.jsx
 * الغرض: منع تكرار الأنماط بالنسخ اللاصق، وضمان اتساق بصري تام بين الصفحات الثلاث.
 */

/* ---------- الحقول ---------- */
export const inputStyle = {
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
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
};

export const labelStyle = {
    display: 'block',
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 600,
    color: '#134527',
};

export const errorStyle = {
    marginTop: 5,
    fontSize: 12.5,
    color: '#D92315',
};

/** أيقونة داخل الحقل — تدعم RTL عبر insetInlineStart */
export const fieldIcon = () => ({
    position: 'absolute',
    insetInlineStart: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: 14,
    pointerEvents: 'none',
});

export const focusStyle = {
    borderColor: 'var(--green-light)',
    boxShadow: '0 0 0 4px rgba(22,163,74,0.12)',
};

export const blurStyle = (hasError) => ({
    borderColor: hasError ? 'var(--red)' : '#e5e7eb',
    boxShadow: 'none',
});

/** زر إظهار/إخفاء كلمة المرور داخل الحقل */
export const eyeButtonStyle = {
    position: 'absolute',
    insetInlineEnd: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    background: 'none',
    border: 'none',
    color: '#4b5563',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 10,
    transition: 'color 0.2s ease, background 0.2s ease',
};

/* ---------- البطاقات ---------- */
/** بطاقة بيضاء نظيفة بظل ناعم متدرج — حاويات النماذج الكبيرة */
export const cardStyle = {
    background: '#fff',
    borderRadius: 24,
    border: '1px solid rgba(19,69,39,0.06)',
    boxShadow: '0 20px 50px -12px rgba(19,69,39,0.12)',
    overflow: 'hidden',
};

/** بطاقات جانبية صغيرة — يُضاف معها hover خفيف عبر كلاسات Tailwind في صفحة الاستخدام */
export const sideCardStyle = {
    background: '#fff',
    borderRadius: 20,
    border: '1px solid rgba(19,69,39,0.06)',
    overflow: 'hidden',
};

/* ---------- زر الإرسال الأساسي (أخضر) ---------- */
/** يُدمج مع كلاس .btn-primary — بديل أخضر هادئ عن الأحمر الافتراضي */
export const submitBtnStyle = {
    background: 'linear-gradient(135deg, #16a34a 0%, #134527 100%)',
    boxShadow: '0 14px 30px -10px rgba(22,163,74,0.5)',
    borderRadius: 16,
    paddingBlock: 14,
    fontSize: 16,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
};

/* ---------- العمود الترويجي (الدخول/التسجيل) ---------- */
/** خلفية هادئة: تدرج أخضر→teal مع لمسات ضوئية ناعمة بدل الدوائر المبعثرة */
export const promoStyle = {
    background:
        'radial-gradient(720px 380px at 12% -8%, rgba(255,255,255,0.12), transparent 60%),' +
        'radial-gradient(560px 340px at 108% 112%, rgba(14,165,233,0.16), transparent 55%),' +
        'linear-gradient(160deg, #134527 0%, #17533c 52%, #124557 100%)',
};

/** شريط موبايل مدمج — زوايا سفلية مستديرة تختلف عن النموذج */
export const promoMobileStyle = {
    background:
        'radial-gradient(420px 200px at 88% -30%, rgba(255,255,255,0.14), transparent 60%),' +
        'linear-gradient(135deg, #134527 0%, #17533c 55%, #124557 100%)',
    borderRadius: '0 0 26px 26px',
};

/** أيقونة الفائدة داخل دائرة زجاجية */
export const benefitIconStyle = {
    background: 'rgba(255,255,255,0.14)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.22)',
    boxShadow: '0 8px 20px -8px rgba(0,0,0,0.3)',
};

/** شريط الإحصاء الاجتماعي الزجاجي */
export const statsBarStyle = {
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: 18,
};

/* ---------- رسائل التنبيه ---------- */
export const flashSuccessStyle = {
    background: 'rgba(22,163,74,0.08)',
    border: '1px solid rgba(22,163,74,0.22)',
};

export const flashErrorStyle = {
    background: 'rgba(217,35,21,0.06)',
    border: '1px solid rgba(217,35,21,0.25)',
};