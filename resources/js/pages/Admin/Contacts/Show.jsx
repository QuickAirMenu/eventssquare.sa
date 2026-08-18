import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Badge } from '@/components/ui';
import { Link } from '@inertiajs/react';

export default function AdminContactsShow({ contact }) {
    return (
        <>
            <Head title={`رسالة من ${contact.name}`} />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-extrabold text-stone-800">تفاصيل الرسالة</h2>
                    <p className="text-sm text-stone-500">{contact.created_at}</p>
                </div>
                <Link href="/admin/contacts">
                    <Button variant="outline">العودة للرسائل</Button>
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-5 lg:col-span-1">
                    <dl className="space-y-4 text-sm">
                        <div>
                            <dt className="text-xs font-bold text-stone-500">الاسم</dt>
                            <dd className="mt-1 font-bold text-stone-800">{contact.name}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-stone-500">البريد الإلكتروني</dt>
                            <dd dir="ltr" className="mt-1 text-start text-primary-700">{contact.email}</dd>
                        </div>
                        {contact.phone && (
                            <div>
                                <dt className="text-xs font-bold text-stone-500">الجوال</dt>
                                <dd dir="ltr" className="mt-1 text-start text-stone-800">{contact.phone}</dd>
                            </div>
                        )}
                        <div>
                            <dt className="text-xs font-bold text-stone-500">الموضوع</dt>
                            <dd className="mt-1 text-stone-800">{contact.subject}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-bold text-stone-500">الحالة</dt>
                            <dd className="mt-1">
                                <Badge color={contact.is_read ? 'gray' : 'amber'}>{contact.is_read ? 'مقروءة' : 'جديدة'}</Badge>
                            </dd>
                        </div>
                    </dl>
                </Card>

                <Card className="p-5 lg:col-span-2">
                    <h3 className="mb-3 font-extrabold text-stone-800">نص الرسالة</h3>
                    <p className="whitespace-pre-wrap leading-7 text-stone-700">{contact.message}</p>

                    <div className="mt-6 flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                window.location.href = `mailto:${contact.email}?subject=رد: ${contact.subject}`;
                            }}
                        >
                            الرد عبر البريد
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                if (confirm('حذف هذه الرسالة؟')) {
                                    router.delete(`/admin/contacts/${contact.id}`, { onSuccess: () => router.visit('/admin/contacts') });
                                }
                            }}
                        >
                            حذف الرسالة
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}

AdminContactsShow.layout = (page) => <AdminLayout>{page}</AdminLayout>;
