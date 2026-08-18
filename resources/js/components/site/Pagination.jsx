import { router } from '@inertiajs/react';

export default function Pagination({ paginator }) {
    if (!paginator || !paginator.last_page || paginator.last_page <= 1) {
        return null;
    }

    const visit = (url) => router.visit(url, { preserveScroll: true });

    return (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-3" aria-label="التنقل بين الصفحات">
            <button
                type="button"
                disabled={!paginator.prev_page_url}
                onClick={() => visit(paginator.prev_page_url)}
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#16a34a] px-6 text-sm font-bold text-[#16a34a] transition hover:bg-[#16a34a] hover:text-white disabled:cursor-not-allowed disabled:border-[#e5e7eb] disabled:bg-transparent disabled:text-[#9ca3af]"
            >
                <i className="fa-solid fa-chevron-right text-xs" />
                السابق
            </button>
            <span className="rounded-full bg-[#f3f4f6] px-5 py-2.5 text-sm font-bold text-[#4b5563]">
                الصفحة {paginator.current_page} من {paginator.last_page}
            </span>
            <button
                type="button"
                disabled={!paginator.next_page_url}
                onClick={() => visit(paginator.next_page_url)}
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#16a34a] px-6 text-sm font-bold text-[#16a34a] transition hover:bg-[#16a34a] hover:text-white disabled:cursor-not-allowed disabled:border-[#e5e7eb] disabled:bg-transparent disabled:text-[#9ca3af]"
            >
                التالي
                <i className="fa-solid fa-chevron-left text-xs" />
            </button>
        </nav>
    );
}
