'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookCopy, BookUp } from 'lucide-react';
import { ToriiIcon } from '@/components/icons/torii-icon';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/members', label: 'Alunos', icon: Users },
  { href: '/classes', label: 'Aulas', icon: BookCopy },
  { href: '/bookings', label: 'Reservar Aula', icon: BookUp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-col bg-card border-r border-border p-6 hidden md:flex">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-10">
        <ToriiIcon className="h-7 w-7 text-primary" />
        <span className="text-foreground">Dojo Scheduler</span>
      </Link>
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
    </aside>
  );
}