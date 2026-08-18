import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, Badge } from '@/components/ui';
import { Link } from '@inertiajs/react';

export default function AdminContactsIndex({ contacts }) {
    return (
        <>
            <Head title="رسائل التواصل" />

            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-stone-800">رسائل التواصل</h2>
                <p className="text-sm text-stone-500">{contacts.length} رسالة</p>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                <th className="px-4 py-3 text-start">الاسم</th>
                                <th className="px-4 py-3 text-start">البريد</th>
                                <th className="px-4 py-3 text-start">الموضوع</th>
                                <th className="px-4 py-3 text-center">الحالة</th>
                                <th className="px-4 py-3 text-center">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c) => (
                                <tr
                                    key={c.id}
                                    className={`cursor-pointer border-b border-stone-100 last:border-0 hover:bg-primary-50/40 ${c.is_read ? '' : 'bg-amber-50/60 font-bold'}`}
                                    onClick={() => router.visit(`/admin/contacts/${c.id}`)}
                                >
                                    <td className="px-4 py-3 text-stone-800">{c.name}</td>
                                    <td dir="ltr" className="px-4 py-3 text-start text-stone-600">{c.email}</td>
                                    <td className="px-4 py-3 text-stone-600">{c.subject}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Badge color={c.is_read ? 'gray' : 'amber'}>{c.is_read ? 'مقروءة' : 'جديدة'}</Badge>
                                    </td>
                                    <td className="px-4 py-3 text-center text-xs text-stone-500">{c.created_at}</td>
                                </tr>
                            ))}
                            {contacts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-4 py-10 text-center text-stone-400">لا توجد رسائل بعد</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}

AdminContactsIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
