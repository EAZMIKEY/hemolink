import type {Metadata} from 'next';
import '../globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/components/ThemeContext';
import { AIModuleContainer } from '@/components/AI/AIModuleContainer';
import { GlobalMapBackground } from '@/components/ui/GlobalMapBackground';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'HemoLink – Real-time Blood Donation Network',
  description: 'Connecting donors and hospitals with speed and reliability to save lives.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-black text-foreground transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <FirebaseClientProvider>
            <ThemeProvider>
              <GlobalMapBackground />
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <AIModuleContainer />
              <Toaster />
            </ThemeProvider>
          </FirebaseClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
