import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Badge } from '@/components/ui';

export default function AdminCategoriesIndex({ categories }) {
    const roots = categories?.filter((c) => !c.parent_id) ?? [];

    return (
        <>
            <Head title="التصنيفات" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-extrabold text-stone-800">إدارة التصنيفات</h2>
                    <p className="text-sm text-stone-500">{categories.length} تصنيف</p>
                </div>
                <Button as="link" href="/admin/categories/create">+ إضافة تصنيف</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {roots.map((root) => (
                    <Card key={root.id} className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-lg text-primary-600">
                                    {root.icon === 'castle' ? '🏰' : root.icon === 'tree' ? '🌲' : root.icon === 'museum' ? '🏛' : root.icon === 'bed' ? '🏨' : root.icon === 'utensils' ? '🍽' : '☰'}
                                </span>
                                <div>
                                    <p className="font-extrabold text-stone-800">{root.name}</p>
                                    <p className="text-xs text-stone-400">{root.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge color={root.is_active ? 'green' : 'gray'}>{root.is_active ? 'نشط' : 'مخفي'}</Badge>
                                <Link href={`/admin/categories/${root.id}/edit`} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200">
                                    تعديل
                                </Link>
                            </div>
                        </div>

                        {root.children_count > 0 && (
                            <div className="mt-2 space-y-2 border-t border-stone-100 pt-3">
                                {categories.filter((c) => c.parent_id === root.id).map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2">
                                        <span className="text-sm font-semibold text-stone-700">{sub.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-stone-400">{sub.listings_count} وجهة</span>
                                            <Link href={`/admin/categories/${sub.id}/edit`} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-stone-600 hover:bg-stone-100">
                                                تعديل
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </>
    );
}

AdminCategoriesIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
