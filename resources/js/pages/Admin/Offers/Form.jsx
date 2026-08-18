import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Textarea, Checkbox } from '@/components/ui';

export default function OfferForm({ offer }) {
    const isEdit = Boolean(offer);

    const form = useForm({
        title: offer?.title ?? '',
        title_en: offer?.title_en ?? '',
        slug: offer?.slug ?? '',
        description: offer?.description ?? '',
        link: offer?.link ?? '',
        valid_from: offer?.valid_from ?? '',
        valid_until: offer?.valid_until ?? '',
        cover_image: null,
        is_active: offer?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? form.put(`/admin/offers/${offer.id}`) : form.post('/admin/offers');
    };

    return (
        <>
            <Head title={isEdit ? 'تعديل عرض' : 'إضافة عرض'} />

            <div className="mb-6">
                <Link href="/admin/offers" className="text-sm font-semibold text-stone-500 hover:text-primary-600">← العودة للعروض</Link>
                <h2 className="mt-1 text-xl font-extrabold text-stone-800">{isEdit ? 'تعديل العرض' : 'إضافة عرض جديد'}</h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">بيانات العرض</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="عنوان العرض" required error={form.errors.title}>
                            <Input value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                        </Field>
                        <Field label="العنوان (إنجليزي)" error={form.errors.title_en}>
                            <Input dir="ltr" value={form.data.title_en} onChange={(e) => form.setData('title_en', e.target.value)} />
                        </Field>
                        <Field label="رابط مختصر (Slug)" error={form.errors.slug}>
                            <Input dir="ltr" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </Field>
                        <Field label="الرابط الخارجي" error={form.errors.link}>
                            <Input dir="ltr" value={form.data.link} onChange={(e) => form.setData('link', e.target.value)} placeholder="https://..." />
                        </Field>
                        <Field label="تاريخ البدء" error={form.errors.valid_from}>
                            <Input dir="ltr" type="date" value={form.data.valid_from} onChange={(e) => form.setData('valid_from', e.target.value)} />
                        </Field>
                        <Field label="تاريخ الانتهاء" error={form.errors.valid_until}>
                            <Input dir="ltr" type="date" value={form.data.valid_until} onChange={(e) => form.setData('valid_until', e.target.value)} />
                        </Field>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">الوصف والصورة</h3>
                    <div className="space-y-4">
                        <Field label="الوصف" error={form.errors.description}>
                            <Textarea rows={4} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                        </Field>
                        <Field label="صورة العرض" error={form.errors.cover_image}>
                            {offer?.cover_url && <img src={offer.cover_url} alt="" className="mb-2 h-32 w-48 rounded-xl object-cover" />}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('cover_image', e.target.files[0])}
                                className="block w-full text-sm text-stone-600 file:me-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary-700 hover:file:bg-primary-100"
                            />
                        </Field>
                        <Checkbox label="عرض نشط" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} />
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button as="link" href="/admin/offers" variant="outline">إلغاء</Button>
                    <Button type="submit" disabled={form.processing}>
                        {isEdit ? 'حفظ التعديلات' : 'إضافة العرض'}
                    </Button>
                </div>
            </form>
        </>
    );
}

OfferForm.layout = (page) => <AdminLayout>{page}</AdminLayout>;
