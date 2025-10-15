import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/context/app-context';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/layout/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <div className="flex min-h-screen w-full">
              <Sidebar />
              {/* [MUDANÇA] Adicionado um wrapper para limitar a largura e centralizar */}
              <main className="flex-1 p-6 sm:p-8 overflow-auto">
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </main>
            </div>
            <Toaster richColors position="top-right" />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}