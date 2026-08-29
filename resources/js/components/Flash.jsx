import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Flash() {
    const { flash } = usePage().props;
    const [dismissed, setDismissed] = useState(false);

    if (dismissed || (!flash?.success && !flash?.error)) {
        return null;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
            {flash.success && (
                <div className="flex items-start justify-between rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
                    <span>{flash.success}</span>
                    <button onClick={() => setDismissed(true)} className="ms-2 text-brand-600 hover:text-brand-800">
                        ✕
                    </button>
                </div>
            )}
            {flash.error && (
                <div className="flex items-start justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    <span>{flash.error}</span>
                    <button onClick={() => setDismissed(true)} className="ms-2 text-red-600 hover:text-red-800">
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}
