import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Select, Checkbox } from '@/components/ui';

const typeLabels = {
    destination: 'وجهات',
    event: 'فعاليات',
    activity: 'أنشطة',
    offer: 'عروض',
};

export default function CategoryForm({ category, parents }) {
    const isEdit = Boolean(category);

    const form = useForm({
        parent_id: category?.parent_id ?? '',
        name: category?.name ?? '',
        name_en: category?.name_en ?? '',
        slug: category?.slug ?? '',
        type: category?.type ?? 'destination',
        icon: category?.icon ?? '',
        sort_order: category?.sort_order ?? 0,
        is_active: category?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? form.put(`/admin/categories/${category.id}`) : form.post('/admin/categories');
    };

    return (
        <>
            <Head title={isEdit ? 'تعديل تصنيف' : 'إضافة تصنيف'} />

            <div className="mb-6">
                <Link href="/admin/categories" className="text-sm font-semibold text-stone-500 hover:text-primary-600">← العودة للتصنيفات</Link>
                <h2 className="mt-1 text-xl font-extrabold text-stone-800">{isEdit ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</h2>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <Card className="max-w-2xl p-6">
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="اسم التصنيف" required error={form.errors.name}>
                                <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                            </Field>
                            <Field label="الاسم (إنجليزي)" required error={form.errors.name_en}>
                                <Input dir="ltr" value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                            </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="رابط مختصر (Slug)" error={form.errors.slug}>
                                <Input dir="ltr" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                            </Field>
                            <Field label="النوع" required error={form.errors.type}>
                                <Select value={form.data.type} onChange={(e) => form.setData('type', e.target.value)}>
                                    {Object.entries(typeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                                </Select>
                            </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="التصنيف الأب" error={form.errors.parent_id} hint="اتركه فارغاً لتصنيف رئيسي">
                                <Select value={form.data.parent_id} onChange={(e) => form.setData('parent_id', e.target.value)} placeholder="تصنيف رئيسي">
                                    {parents?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Select>
                            </Field>
                            <Field label="الأيقونة" error={form.errors.icon}>
                                <Input dir="ltr" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} placeholder="castle / tree / museum / bed / utensils" />
                            </Field>
                        </div>
                        <Field label="الترتيب" error={form.errors.sort_order}>
                            <Input dir="ltr" type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </Field>
                        <Checkbox label="تصنيف نشط" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} />
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button as="link" href="/admin/categories" variant="outline">إلغاء</Button>
                    <Button type="submit" disabled={form.processing}>
                        {isEdit ? 'حفظ التعديلات' : 'إضافة التصنيف'}
                    </Button>
                </div>
            </form>
        </>
    );
}

CategoryForm.layout = (page) => <AdminLayout>{page}</AdminLayout>;
