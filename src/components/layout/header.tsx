'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Calendar, BookUser } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Shield },
  { href: '/members', label: 'Alunos', icon: Users },
  { href: '/classes', label: 'Aulas', icon: Calendar },
  { href: '/bookings', label: 'Matrículas', icon: BookUser },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Shield className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          <span>Dojo Scheduler</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}