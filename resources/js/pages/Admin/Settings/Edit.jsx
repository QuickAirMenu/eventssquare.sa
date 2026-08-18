import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Textarea } from '@/components/ui';

export default function AdminSettingsEdit({ settings }) {
    const data = {};
    for (const key in settings) {
        data[key] = settings[key] ?? '';
    }

    const form = useForm(data);
    const keys = Object.keys(settings);

    const submit = (e) => {
        e.preventDefault();
        form.put('/admin/settings', { preserveScroll: true });
    };

    const isTextarea = (key) => ['about', 'mission', 'vision', 'meta_description', 'about_ar'].includes(key) || key.includes('description') || key.includes('about');

    return (
        <>
            <Head title="إعدادات الموقع" />

            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-stone-800">إعدادات الموقع</h2>
                <p className="text-sm text-stone-500">هوية الموقع، معلومات التواصل، وروابط السوشيال ميديا</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <Card className="p-5">
                    <h3 className="mb-4 font-extrabold text-stone-800">الهوية الأساسية</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {['site_name', 'tagline', 'email', 'phone', 'whatsapp', 'address'].map((key) => (
                            <Field key={key} label={labels[key] ?? key} error={form.errors[key]}>
                                <Input
                                    dir={['email', 'phone', 'whatsapp'].includes(key) ? 'ltr' : 'rtl'}
                                    value={form.data[key] ?? ''}
                                    onChange={(e) => form.setData(key, e.target.value)}
                                />
                            </Field>
                        ))}
                        {['facebook', 'instagram', 'twitter', 'youtube', 'snapchat', 'tiktok'].map((key) => (
                            <Field key={key} label={labels[key] ?? key} error={form.errors[key]}>
                                <Input dir="ltr" value={form.data[key] ?? ''} onChange={(e) => form.setData(key, e.target.value)} />
                            </Field>
                        ))}
                    </div>
                </Card>

                <Card className="p-5">
                    <h3 className="mb-4 font-extrabold text-stone-800">النصوص</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {['about', 'mission', 'vision', 'meta_description'].map((key) =>
                            isTextarea(key) ? (
                                <Field key={key} label={labels[key] ?? key} error={form.errors[key]}>
                                    <Textarea rows={4} value={form.data[key] ?? ''} onChange={(e) => form.setData(key, e.target.value)} />
                                </Field>
                            ) : (
                                <Field key={key} label={labels[key] ?? key} error={form.errors[key]}>
                                    <Input value={form.data[key] ?? ''} onChange={(e) => form.setData(key, e.target.value)} />
                                </Field>
                            )
                        )}
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={form.processing} className="min-w-40">حفظ الإعدادات</Button>
                </div>
            </form>
        </>
    );
}

const labels = {
    site_name: 'اسم الموقع',
    tagline: 'الشعار النصي (Tagline)',
    email: 'بريد التواصل',
    phone: 'رقم الهاتف',
    whatsapp: 'واتساب',
    address: 'العنوان',
    facebook: 'فيسبوك',
    instagram: 'انستقرام',
    twitter: 'إكس (تويتر)',
    youtube: 'يوتيوب',
    snapchat: 'سناب شات',
    tiktok: 'تيك توك',
    about: 'نبذة عن الموقع',
    mission: 'رسالتنا',
    vision: 'رؤيتنا',
    meta_description: 'وصف الموقع (SEO)',
};

AdminSettingsEdit.layout = (page) => <AdminLayout>{page}</AdminLayout>;
