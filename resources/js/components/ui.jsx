import { Link, usePage } from '@inertiajs/react';

export function Field({ label, error, required, children, hint }) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-semibold text-stone-700">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}
            {children}
            {hint && <p className="text-xs text-stone-500">{hint}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

export function Input(props) {
    return (
        <input
            {...props}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-400 shadow-sm outline-none transition focus:ring-2 ${
                props.error
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-stone-300 focus:border-primary-500 focus:ring-primary-100'
            }`}
        />
    );
}

export function Textarea(props) {
    return (
        <textarea
            {...props}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-400 shadow-sm outline-none transition focus:ring-2 ${
                props.error
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-stone-300 focus:border-primary-500 focus:ring-primary-100'
            }`}
        />
    );
}

export function Select({ options, placeholder, children, ...props }) {
    return (
        <select
            {...props}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-stone-800 shadow-sm outline-none transition focus:ring-2 ${
                props.error
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-stone-300 focus:border-primary-500 focus:ring-primary-100'
            }`}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options
                ? options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                          {opt.label}
                      </option>
                  ))
                : children}
        </select>
    );
}

export function Checkbox({ label, ...props }) {
    return (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
            <input
                type="checkbox"
                {...props}
                className="h-4 w-4 rounded border-stone-300 text-primary-600 focus:ring-primary-500"
            />
            {label}
        </label>
    );
}

export function Button({ as = 'button', variant = 'primary', size = 'md', href, children, className = '', ...props }) {
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-200',
        accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-2 focus:ring-accent-200',
        outline: 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-50',
        ghost: 'text-stone-600 hover:bg-stone-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (as === 'link' || href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button {...props} className={classes}>
            {children}
        </button>
    );
}

export function Badge({ color = 'green', children }) {
    const colors = {
        green: 'bg-primary-50 text-primary-700 border-primary-200',
        amber: 'bg-accent-50 text-accent-700 border-accent-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        blue: 'bg-sky-50 text-sky-700 border-sky-200',
        gray: 'bg-stone-100 text-stone-600 border-stone-200',
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}>
            {children}
        </span>
    );
}

export function Card({ children, className = '' }) {
    return (
        <div className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export function Pagination({ links }) {
    const { url } = usePage();

    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {links.map((link, i) => {
                if (!link.url) {
                    return (
                        <span
                            key={i}
                            className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm text-stone-400"
                        >
                            {link.label.replace(/&laquo;|&raquo;/, '')}
                        </span>
                    );
                }

                const active = link.active;

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
                            active
                                ? 'bg-primary-600 text-white'
                                : 'border border-stone-300 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                        {link.label.replace(/&laquo;|&raquo;/, '')}
                    </Link>
                );
            })}
        </nav>
    );
}
