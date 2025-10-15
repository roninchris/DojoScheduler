
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/layout/sidebar'; 

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Dojo Scheduler',
  description: 'Gerencie seus alunos, aulas e agendamentos com facilidade.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <AppProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 p-8 overflow-auto">
              {children}
            </main>
          </div>
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}