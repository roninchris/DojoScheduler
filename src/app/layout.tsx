import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner'; // Importe o Toaster do sonner

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Dojo Scheduler',
  description: 'Sistema de agendamento para academias de artes marciais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <AppProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8">
              {children}
            </main>
          </div>
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}