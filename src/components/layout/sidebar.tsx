'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookCopy, BookUp, CalendarDays } from 'lucide-react';
import { ToriiIcon } from '@/components/icons/torii-icon';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/members', label: 'Alunos', icon: Users },
  { href: '/classes', label: 'Aulas', icon: BookCopy },
  { href: '/bookings', label: 'Matricular', icon: BookUp },
  { href: '/agenda', label: 'Agenda', icon: CalendarDays },
];

// Conteúdo reutilizável da Sidebar
export function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ToriiIcon className="h-7 w-7 text-primary" />
          <span className="text-foreground">Dojo Scheduler</span>
        </Link>
        <div className="hidden md:block">
            <ThemeToggle />
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

// Componente principal da Sidebar (apenas para desktop)
export function Sidebar() {
    return (
        <aside className="w-64 flex-col bg-card border-r border-border p-6 hidden md:flex">
            <SidebarContent />
        </aside>
    );
}