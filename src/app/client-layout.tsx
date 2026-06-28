'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <LocaleProvider> {/* Wrap everything with LocaleProvider */}
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "min-h-screen" : ""}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster position="top-right" richColors closeButton />
    </LocaleProvider>
  );
}