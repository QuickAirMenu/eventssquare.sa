import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Textarea, Select, Checkbox } from '@/components/ui';

export default function ListingForm({ listing, categories, cities }) {
    const isEdit = Boolean(listing);

    const form = useForm({
        category_id: listing?.category_id ?? '',
        city_id: listing?.city_id ?? '',
        name: listing?.name ?? '',
        name_en: listing?.name_en ?? '',
        slug: listing?.slug ?? '',
        summary: listing?.summary ?? '',
        description: listing?.description ?? '',
        summary_en: listing?.summary_en ?? '',
        description_en: listing?.description_en ?? '',
        address: listing?.address ?? '',
        latitude: listing?.latitude ?? '',
        longitude: listing?.longitude ?? '',
        phone: listing?.phone ?? '',
        website: listing?.website ?? '',
        price_halalas: listing?.price_halalas ?? '',
        cover_image: null,
        is_featured: listing?.is_featured ?? false,
        is_active: listing?.is_active ?? true,
        published_at: listing?.published_at ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? form.put(`/admin/listings/${listing.id}`) : form.post('/admin/listings');
    };

    const parents = categories?.filter((c) => !c.parent_id) ?? [];
    const subs = categories?.filter((c) => c.parent_id) ?? [];

    return (
        <>
            <Head title={isEdit ? 'تعديل وجهة' : 'إضافة وجهة'} />

            <div className="mb-6">
                <Link href="/admin/listings" className="text-sm font-semibold text-stone-500 hover:text-primary-600">← العودة للوجهات</Link>
                <h2 className="mt-1 text-xl font-extrabold text-stone-800">{isEdit ? 'تعديل الوجهة' : 'إضافة وجهة جديدة'}</h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">المعلومات الأساسية</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="اسم الوجهة (عربي)" required error={form.errors.name}>
                            <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </Field>
                        <Field label="الاسم (إنجليزي)" error={form.errors.name_en}>
                            <Input dir="ltr" value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                        </Field>
                        <Field label="رابط مختصر (Slug)" error={form.errors.slug} hint="يُملأ تلقائياً إن تُرك فارغاً">
                            <Input dir="ltr" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="التصنيف" required error={form.errors.category_id}>
                                <Select value={form.data.category_id} onChange={(e) => form.setData('category_id', e.target.value)} placeholder="اختر التصنيف">
                                    {parents.map((c) => (
                                        <optgroup key={c.id} label={c.name}>
                                            <option value={c.id}>{c.name}</option>
                                            {subs.filter((s) => s.parent_id === c.id).map((s) => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </Select>
                            </Field>
                            <Field label="المدينة" required error={form.errors.city_id}>
                                <Select value={form.data.city_id} onChange={(e) => form.setData('city_id', e.target.value)} placeholder="اختر المدينة">
                                    {cities?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                            </Field>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">الوصف</h3>
                    <div className="space-y-4">
                        <Field label="الملخص (يظهر في البطاقات)" error={form.errors.summary}>
                            <Textarea rows={2} value={form.data.summary} onChange={(e) => form.setData('summary', e.target.value)} />
                        </Field>
                        <Field label="الوصف الكامل" error={form.errors.description}>
                            <Textarea rows={6} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="الملخص (إنجليزي)" error={form.errors.summary_en}>
                                <Textarea rows={2} dir="ltr" value={form.data.summary_en} onChange={(e) => form.setData('summary_en', e.target.value)} />
                            </Field>
                            <Field label="الوصف الكامل (إنجليزي)" error={form.errors.description_en}>
                                <Textarea rows={4} dir="ltr" value={form.data.description_en} onChange={(e) => form.setData('description_en', e.target.value)} />
                            </Field>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">معلومات الاتصال والموقع</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="العنوان" error={form.errors.address}>
                            <Input value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} />
                        </Field>
                        <Field label="الهاتف" error={form.errors.phone}>
                            <Input dir="ltr" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} placeholder="+9665xxxxxxxx" />
                        </Field>
                        <Field label="الموقع الإلكتروني" error={form.errors.website}>
                            <Input dir="ltr" value={form.data.website} onChange={(e) => form.setData('website', e.target.value)} placeholder="https://..." />
                        </Field>
                        <Field label="السعر التقريبي (ريال)" error={form.errors.price_halalas}>
                            <Input dir="ltr" type="number" min="0" value={form.data.price_halalas} onChange={(e) => form.setData('price_halalas', e.target.value)} />
                        </Field>
                        <Field label="خط العرض (Latitude)" error={form.errors.latitude}>
                            <Input dir="ltr" type="number" step="any" value={form.data.latitude} onChange={(e) => form.setData('latitude', e.target.value)} />
                        </Field>
                        <Field label="خط الطول (Longitude)" error={form.errors.longitude}>
                            <Input dir="ltr" type="number" step="any" value={form.data.longitude} onChange={(e) => form.setData('longitude', e.target.value)} />
                        </Field>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 font-extrabold text-stone-800">الصور والإعدادات</h3>
                    <div className="space-y-4">
                        <Field label="صورة الغلاف" error={form.errors.cover_image}>
                            {listing?.cover_url && (
                                <img src={listing.cover_url} alt="" className="mb-2 h-32 w-48 rounded-xl object-cover" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('cover_image', e.target.files[0])}
                                className="block w-full text-sm text-stone-600 file:me-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary-700 hover:file:bg-primary-100"
                            />
                        </Field>
                        <div className="grid grid-cols-2 gap-4 sm:max-w-md">
                            <Checkbox label="وجهة مميزة" checked={form.data.is_featured} onChange={(e) => form.setData('is_featured', e.target.checked)} />
                            <Checkbox label="منشورة" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} />
                        </div>
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button as="link" href="/admin/listings" variant="outline">إلغاء</Button>
                    <Button type="submit" disabled={form.processing}>
                        {isEdit ? 'حفظ التعديلات' : 'إضافة الوجهة'}
                    </Button>
                </div>
            </form>
        </>
    );
}

ListingForm.layout = (page) => <AdminLayout>{page}</AdminLayout>;
