import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button, Card, Field, Select, Badge } from '@/components/ui';

const roleColors = { admin: 'red', editor: 'amber', user: 'gray' };

export default function AdminUsersIndex({ users }) {
    return (
        <>
            <Head title="المستخدمون" />

            <div className="mb-6">
                <h2 className="text-xl font-extrabold text-stone-800">إدارة المستخدمين</h2>
                <p className="text-sm text-stone-500">{users.length} مستخدم</p>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-bold text-stone-500">
                                <th className="px-4 py-3 text-start">الاسم</th>
                                <th className="px-4 py-3 text-start">البريد</th>
                                <th className="px-4 py-3 text-start">الجوال</th>
                                <th className="px-4 py-3 text-center">الدور</th>
                                <th className="px-4 py-3 text-center">تاريخ التسجيل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <UserRow key={user.id} user={user} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}

function UserRow({ user }) {
    const form = useForm({ role: user.role });

    const updateRole = (e) => {
        form.setData('role', e.target.value);
        form.put(`/admin/users/${user.id}`, { preserveScroll: true });
    };

    return (
        <tr className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
            <td className="px-4 py-3 font-bold text-stone-800">{user.name}</td>
            <td dir="ltr" className="px-4 py-3 text-start text-stone-600">{user.email}</td>
            <td dir="ltr" className="px-4 py-3 text-start text-stone-600">{user.phone ?? '—'}</td>
            <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Badge color={roleColors[user.role] ?? 'gray'}>{user.role}</Badge>
                    {user.role !== 'admin' && (
                        <select
                            value={form.data.role}
                            onChange={updateRole}
                            className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-xs font-bold text-stone-700"
                        >
                            <option value="user">user</option>
                            <option value="editor">editor</option>
                        </select>
                    )}
                </div>
            </td>
            <td className="px-4 py-3 text-center text-xs text-stone-500">{user.created_at}</td>
        </tr>
    );
}

AdminUsersIndex.layout = (page) => <AdminLayout>{page}</AdminLayout>;
