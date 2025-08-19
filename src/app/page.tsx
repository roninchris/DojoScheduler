'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Swords, BookUser, BookPlus } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/context/app-context';
import { PageHeader } from '@/components/page-header';
import Image from 'next/image';

export default function DashboardPage() {
  const { state } = useAppContext();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Bem-vindo ao Dojo Scheduler"
        description="Gerencie seus alunos, aulas e agendamentos com facilidade."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{state.members.length}</div>
            <p className="text-xs text-muted-foreground">Membros ativos no sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Aulas</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{state.classes.length}</div>
            <p className="text-xs text-muted-foreground">Aulas disponíveis para agendamento</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Comece a organizar seu dojo agora mesmo.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center items-start gap-4">
              <Link href="/members/new">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <span>
                    <BookUser />
                    <span>Cadastrar Novo Aluno</span>
                  </span>
                </Button>
              </Link>
              <Link href="/classes/new">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                  <span>
                    <BookPlus />
                    <span>Criar Nova Aula</span>
                  </span>
                </Button>
              </Link>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
             <Image 
                src="https://placehold.co/600x400.png"
                alt="Dojo"
                fill
                className="object-cover"
                data-ai-hint="martial arts dojo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white">Disciplina. Força. Respeito.</h3>
                <p className="text-white/80">Os pilares do seu dojo, refletidos em sua gestão.</p>
            </div>
        </Card>
      </div>
    </div>
  );
}
