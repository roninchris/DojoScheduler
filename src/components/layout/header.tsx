'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Calendar, BookUser } from 'lucide-react';
import { ToriiIcon } from '@/components/icons/torii-icon'; // <-- [MUDANÇA] Importação do novo ícone
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Users }, // Alterado para manter consistência, mas pode voltar a ser um ícone de Dashboard se preferir
  { href: '/members', label: 'Alunos', icon: Users },
  { href: '/classes', label: 'Aulas', icon: Calendar },
  { href: '/bookings', label: 'Matrículas', icon: BookUser },
];

export function Header() {
  const pathname = usePathname();

  return (
    // [MUDANÇA] Estilo do header para um visual mais limpo
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          {/* [MUDANÇA] Ícone do logo trocado para o Torii e cor primária aplicada */}
          <ToriiIcon className="h-6 w-6 text-primary" />
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
                  // [MUDANÇA] Estilo do link ativo agora usa a cor primária
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
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