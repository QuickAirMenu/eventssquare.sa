import { useEffect, useState } from 'react';
import Flash from '@/components/Flash';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export default function AppLayout({ children }) {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 500);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div>
            <Navbar />

            <main>
                <Flash />
                {children}
            </main>

            <Footer />

            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="back-to-top"
                    aria-label="العودة للأعلى"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </button>
            )}
        </div>
    );
}
