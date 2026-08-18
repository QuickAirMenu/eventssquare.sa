import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Badge, Pagination } from '@/components/ui';

export default function AdminListingsIndex({ listings, categories, filters }) {
    return (
        <>
            <Head title="الوجهات" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-extrabold text-stone-800">إدارة الوجهات</h2>
                    <p className="text-sm text-stone-500">{listings.total} وجهة</p>
                </div>
                <Button as="link" href="/admin/listings/create">+ إضافة وجهة</Button>
            </div>

            <Card className="p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                    <input
                        type="search"
                        defaultValue={filters?.search || ''}
                        onKeyDown={(e) => e.key === 'Enter' && router.get('/admin/listings', { ...filters, search: e.target.value }, { preserveState: true })}
                        placeholder="ابحث بالاسم..."
                        className="rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-primary-500"
                    />
                    <select
                        value={filters?.category || ''}
                        onChange={(e) => router.get('/admin/listings', { ...filters, category: e.target.value }, { preserveState: true })}
                        className="rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-primary-500"
                    >
                        <option value="">جميع التصنيفات</option>
                        {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </Card>

            <Card className="mt-4 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                <th className="px-4 py-3 text-start">الاسم</th>
                                <th className="px-4 py-3 text-start">التصنيف</th>
                                <th className="px-4 py-3 text-start">المدينة</th>
                                <th className="px-4 py-3 text-center">الحالة</th>
                                <th className="px-4 py-3 text-end">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings?.data?.map((listing) => (
                                <tr key={listing.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {listing.cover_url ? (
                                                <img src={listing.cover_url} alt="" className="h-10 w-10 rounded-lg object-cover" />
                                            ) : (
                                                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-100 text-primary-600">✦</span>
                                            )}
                                            <div>
                                                <p className="font-bold text-stone-800">{listing.name}</p>
                                                <p className="text-xs text-stone-400">{listing.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-stone-600">{listing.category?.name}</td>
                                    <td className="px-4 py-3 text-stone-600">{listing.city?.name}</td>
                                    <td className="px-4 py-3 text-center">
                                        {listing.is_featured && <span className="me-1"><Badge color="amber">مميز</Badge></span>}
                                        <Badge color={listing.is_active ? 'green' : 'gray'}>{listing.is_active ? 'منشور' : 'مسودة'}</Badge>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/listings/${listing.id}/edit`} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200">
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('هل أنت متأكد من حذف هذه الوجهة؟')) {
                                                        router.delete(`/admin/listings/${listing.id}`);
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

            <Pagination links={listings.links} />
        </>
    );
}

AdminListingsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
