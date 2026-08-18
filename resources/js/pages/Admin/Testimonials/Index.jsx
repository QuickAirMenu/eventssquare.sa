import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Input, Textarea, Select, Checkbox, Badge } from '@/components/ui';

export default function AdminTestimonialsIndex({ testimonials }) {
    const [editingId, setEditingId] = useState(null);

    const editing = testimonials?.find((t) => t.id === editingId);

    const form = useForm({
        author: editing?.author ?? '',
        content: editing?.content ?? '',
        rating: editing?.rating ?? 5,
        is_active: editing?.is_active ?? true,
        avatar: null,
    });

    const resetForm = () => {
        setEditingId(null);
        form.reset();
        form.clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            form.put(`/admin/testimonials/${editingId}`, { preserveScroll: true, onSuccess: resetForm });
        } else {
            form.post('/admin/testimonials', { preserveScroll: true, onSuccess: resetForm });
        }
    };

    const startEdit = (t) => {
        setEditingId(t.id);
        form.setData({ author: t.author, content: t.content, rating: t.rating, is_active: t.is_active, avatar: null });
    };

    return (
        <>
            <Head title="التقييمات" />

            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-stone-800">إدارة التقييمات</h2>
                <p className="text-sm text-stone-500">{testimonials.length} تقييم</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="h-fit p-5">
                    <h3 className="mb-4 font-extrabold text-stone-800">{editingId ? 'تعديل التقييم' : 'إضافة تقييم'}</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <Field label="اسم الكاتب" required error={form.errors.author}>
                            <Input value={form.data.author} onChange={(e) => form.setData('author', e.target.value)} />
                        </Field>
                        <Field label="المحتوى" required error={form.errors.content}>
                            <Textarea rows={4} value={form.data.content} onChange={(e) => form.setData('content', e.target.value)} />
                        </Field>
                        <Field label="التقييم" error={form.errors.rating}>
                            <Select value={form.data.rating} onChange={(e) => form.setData('rating', e.target.value)}>
                                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</option>)}
                            </Select>
                        </Field>
                        <Field label="الصورة الرمزية" error={form.errors.avatar}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('avatar', e.target.files[0])}
                                className="block w-full text-sm text-stone-600 file:me-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary-700"
                            />
                        </Field>
                        <Checkbox label="مفعل" checked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} />
                        <div className="flex gap-2">
                            <Button type="submit" disabled={form.processing}>
                                {editingId ? 'حفظ' : 'إضافة'}
                            </Button>
                            {editingId && (
                                <Button type="button" variant="outline" onClick={resetForm}>إلغاء</Button>
                            )}
                        </div>
                    </form>
                </Card>

                <Card className="overflow-hidden lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                    <th className="px-4 py-3 text-start">الكاتب</th>
                                    <th className="px-4 py-3 text-start">المحتوى</th>
                                    <th className="px-4 py-3 text-center">التقييم</th>
                                    <th className="px-4 py-3 text-center">الحالة</th>
                                    <th className="px-4 py-3 text-end">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((t) => (
                                    <tr key={t.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                                        <td className="px-4 py-3 font-bold text-stone-800">{t.author}</td>
                                        <td className="max-w-xs truncate px-4 py-3 text-stone-600">{t.content}</td>
                                        <td className="px-4 py-3 text-center text-accent-500">{'★'.repeat(t.rating)}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Badge color={t.is_active ? 'green' : 'gray'}>{t.is_active ? 'مفعل' : 'مخفي'}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => startEdit(t)} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200">
                                                    تعديل
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('حذف هذا التقييم؟')) {
                                                            router.delete(`/admin/testimonials/${t.id}`);
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

AdminTestimonialsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
