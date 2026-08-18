import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Badge, Pagination } from '@/components/ui';

export default function AdminEventsIndex({ events, filters }) {
    return (
        <>
            <Head title="الفعاليات" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-extrabold text-stone-800">إدارة الفعاليات</h2>
                    <p className="text-sm text-stone-500">{events.total} فعالية</p>
                </div>
                <Button as="link" href="/admin/events/create">+ إضافة فعالية</Button>
            </div>

            <Card className="p-4">
                <input
                    type="search"
                    defaultValue={filters?.search || ''}
                    onKeyDown={(e) => e.key === 'Enter' && router.get('/admin/events', { ...filters, search: e.target.value }, { preserveState: true })}
                    placeholder="ابحث بالاسم..."
                    className="w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-primary-500 sm:max-w-sm"
                />
            </Card>

            <Card className="mt-4 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                <th className="px-4 py-3 text-start">الاسم</th>
                                <th className="px-4 py-3 text-start">المدينة</th>
                                <th className="px-4 py-3 text-start">التاريخ</th>
                                <th className="px-4 py-3 text-center">الحالة</th>
                                <th className="px-4 py-3 text-end">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.data?.map((event) => (
                                <tr key={event.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                                    <td className="px-4 py-3 font-bold text-stone-800">{event.name}</td>
                                    <td className="px-4 py-3 text-stone-600">{event.city?.name}</td>
                                    <td className="px-4 py-3 text-stone-600">
                                        {new Date(event.starts_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <Badge color={event.status === 'ended' ? 'gray' : event.status === 'ongoing' ? 'blue' : 'green'}>
                                            {event.status_label}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-end">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/events/${event.id}/edit`} className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200">
                                                تعديل
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
                                                        router.delete(`/admin/events/${event.id}`);
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

            <Pagination links={events.links} />
        </>
    );
}

AdminEventsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
