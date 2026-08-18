import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Textarea, Select, Checkbox } from '@/components/ui';

export default function EventForm({ event, cities, categories }) {
    const isEdit = Boolean(event);

    const form = useForm({
        city_id: event?.city_id ?? '',
        category_id: event?.category_id ?? '',
        name: event?.name ?? '',
        name_en: event?.name_en ?? '',
        slug: event?.slug ?? '',
        description: event?.description ?? '',
        venue: event?.venue ?? '',
        starts_at: event?.starts_at ? event.starts_at.slice(0, 16) : '',
        ends_at: event?.ends_at ? event.ends_at.slice(0, 16) : '',
        cover_image: null,
        is_featured: event?.is_featured ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? form.put(`/admin/events/${event.id}`) : form.post('/admin/events');
    };

    return (
        <>
            <Head title={isEdit ? 'تعديل فعالية' : 'إضافة فعالية'} />

            <div className="mb-6">
                <Link href="/admin/events" className="text-sm font-semibold text-stone-500 hover:text-primary-600">← العودة للفعاليات</Link>
                <h2 className="mt-1 text-xl font-extrabold text-stone-800">{isEdit ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}</h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">بيانات الفعالية</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="اسم الفعالية" required error={form.errors.name}>
                            <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </Field>
                        <Field label="الاسم (إنجليزي)" error={form.errors.name_en}>
                            <Input dir="ltr" value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                        </Field>
                        <Field label="رابط مختصر (Slug)" error={form.errors.slug}>
                            <Input dir="ltr" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="المدينة" required error={form.errors.city_id}>
                                <Select value={form.data.city_id} onChange={(e) => form.setData('city_id', e.target.value)} placeholder="اختر المدينة">
                                    {cities?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                            </Field>
                            <Field label="التصنيف" error={form.errors.category_id}>
                                <Select value={form.data.category_id} onChange={(e) => form.setData('category_id', e.target.value)} placeholder="بدون">
                                    {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                            </Field>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">الموعد والمكان</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="تاريخ البدء" required error={form.errors.starts_at}>
                            <Input dir="ltr" type="datetime-local" value={form.data.starts_at} onChange={(e) => form.setData('starts_at', e.target.value)} />
                        </Field>
                        <Field label="تاريخ الانتهاء" error={form.errors.ends_at}>
                            <Input dir="ltr" type="datetime-local" value={form.data.ends_at} onChange={(e) => form.setData('ends_at', e.target.value)} />
                        </Field>
                        <Field label="المكان" error={form.errors.venue}>
                            <Input value={form.data.venue} onChange={(e) => form.setData('venue', e.target.value)} />
                        </Field>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">الوصف والصور</h3>
                    <div className="space-y-4">
                        <Field label="الوصف" error={form.errors.description}>
                            <Textarea rows={6} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                        </Field>
                        <Field label="صورة الفعالية" error={form.errors.cover_image}>
                            {event?.cover_url && (
                                <img src={event.cover_url} alt="" className="mb-2 h-32 w-48 rounded-xl object-cover" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('cover_image', e.target.files[0])}
                                className="block w-full text-sm text-stone-600 file:me-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary-700 hover:file:bg-primary-100"
                            />
                        </Field>
                        <Checkbox label="فعالية مميزة" checked={form.data.is_featured} onChange={(e) => form.setData('is_featured', e.target.checked)} />
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button as="link" href="/admin/events" variant="outline">إلغاء</Button>
                    <Button type="submit" disabled={form.processing}>
                        {isEdit ? 'حفظ التعديلات' : 'إضافة الفعالية'}
                    </Button>
                </div>
            </form>
        </>
    );
}

EventForm.layout = (page) => <AdminLayout>{page}</AdminLayout>;
