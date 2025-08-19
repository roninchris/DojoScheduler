
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppProvider, useAppContext } from '@/context/app-context';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { MainNav } from '@/components/main-nav';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Metadata object cannot be defined in a client component.
// I will comment it out but you should move it to a server component if you need it.
// export const metadata: Metadata = {
//   title: 'Dojo Scheduler',
//   description: 'Sistema de agendamento e gestão para estúdios de artes marciais.',
// };


function AppLayout({ children }: { children: React.ReactNode }) {
    const { state } = useAppContext();
    const pathname = usePathname();

    if (!state.isAuthenticated || pathname === '/login') {
        return <>{children}</>;
    }

    return (
        <>
            <ThemeSwitcher />
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-2">
                            <Logo className="text-primary size-8" />
                            <span className="text-lg font-semibold text-primary">Dojo Scheduler</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <MainNav />
                    </SidebarContent>
                </Sidebar>
                <SidebarInset>
                    <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex items-center justify-end mb-4 md:hidden">
                            <SidebarTrigger variant="outline" size="icon">
                                <Logo />
                            </SidebarTrigger>
                        </div>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <Toaster />
        </>
    )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <AppProvider>
            <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
