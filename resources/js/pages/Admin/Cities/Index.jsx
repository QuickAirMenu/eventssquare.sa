import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Checkbox, Badge } from '@/components/ui';

export default function AdminCitiesIndex({ cities }) {
    const form = useForm({ name: '', name_en: '', slug: '', is_active: true });

    const submit = (e) => {
        e.preventDefault();
        form.post('/admin/cities', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const edit = (city) => {
        const name = prompt('اسم المدينة (عربي):', city.name) ?? city.name;
        const name_en = prompt('الاسم (إنجليزي):', city.name_en) ?? city.name_en;
        router.put(`/admin/cities/${city.id}`, {
            name,
            name_en,
            slug: city.slug,
            is_active: city.is_active,
        });
    };

    return (
        <>
            <Head title="المدن" />

            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-stone-800">إدارة المدن</h2>
                <p className="text-sm text-stone-500">{cities.length} مدينة</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="h-fit p-5">
                    <h3 className="mb-4 font-extrabold text-stone-800">إضافة مدينة</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <Field label="اسم المدينة" required error={form.errors.name}>
                            <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </Field>
                        <Field label="الاسم (إنجليزي)" required error={form.errors.name_en}>
                            <Input dir="ltr" value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                        </Field>
                        <Field label="Slug" error={form.errors.slug}>
                            <Input dir="ltr" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </Field>
                        <Checkbox label="نشطة" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} />
                        <Button type="submit" disabled={form.processing}>إضافة المدينة</Button>
                    </form>
                </Card>

                <Card className="overflow-hidden lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                    <th className="px-4 py-3 text-start">الاسم</th>
                                    <th className="px-4 py-3 text-start">English</th>
                                    <th className="px-4 py-3 text-center">الوجهات</th>
                                    <th className="px-4 py-3 text-center">الحالة</th>
                                    <th className="px-4 py-3 text-end">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((city) => (
                                    <tr key={city.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                                        <td className="px-4 py-3 font-bold text-stone-800">{city.name}</td>
                                        <td className="px-4 py-3 text-stone-600">{city.name_en}</td>
                                        <td className="px-4 py-3 text-center text-stone-600">{city.listings_count}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Badge color={city.is_active ? 'green' : 'gray'}>{city.is_active ? 'نشطة' : 'مخفية'}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => edit(city)}
                                                    className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200"
                                                >
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`حذف مدينة ${city.name}؟`)) {
                                                            router.delete(`/admin/cities/${city.id}`);
                                                        }
                                                    }}
                                                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </>
    );
}

AdminCitiesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
