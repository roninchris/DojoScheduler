
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Swords, BookPlus, BookUser, LogOut } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useAppContext } from '@/context/app-context';
import { Button } from './ui/button';

const menuItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/members', label: 'Alunos', icon: Users },
  { path: '/classes', label: 'Aulas', icon: Swords },
  { path: '/members/new', label: 'Cadastrar Aluno', icon: BookUser },
  { path: '/classes/new', label: 'Criar Aula', icon: BookPlus },
  { path: '/bookings/new', label: 'Reservar Aula', icon: BookUser },
];

export function MainNav() {
  const pathname = usePathname();
  const { dispatch } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-full">
        <SidebarMenu className="flex-grow">
        {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
            <Link href={item.path}>
                <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
                tooltip={item.label}
                >
                <span>
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                </span>
                </SidebarMenuButton>
            </Link>
            </SidebarMenuItem>
        ))}
        </SidebarMenu>
        <div className="p-2 mt-auto">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 size-5" />
                <span>Sair</span>
            </Button>
        </div>
    </div>
  );
}
