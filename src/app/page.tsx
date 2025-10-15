'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookCopy, PlusCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const { state } = useAppContext();
  const { members, classes, loading } = state;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Seção de Boas-vindas */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Bem-vindo ao Dojo Scheduler</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus alunos, aulas e agendamentos com facilidade.</p>
      </div>

      {/* Seção de Estatísticas */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total de Alunos</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{members.length}</div>
            <p className="text-sm text-muted-foreground">membros ativos no sistema</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total de Aulas</CardTitle>
            <BookCopy className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{classes.length}</div>
            <p className="text-sm text-muted-foreground">aulas disponíveis para agendamento</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Seção de Ações Rápidas e Imagem */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Ações Rápidas</h2>
          <p className="text-muted-foreground mb-6">Comece a organizar seu dojo agora mesmo.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Link href="/members" className="w-full">
              <Button className="w-full font-bold text-lg py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform duration-200 hover:scale-105" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Cadastrar Novo Aluno
              </Button>
            </Link>
            <Link href="/classes" className="w-full">
               <Button className="w-full font-bold text-lg py-6 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border shadow-md transition-transform duration-200 hover:scale-105" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Criar Nova Aula
              </Button>
            </Link>
          </div>
        </Card>
        <div className="relative rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-red-lg">
          <Image
            src="https://placehold.co/600x400/212121/FFFFFF?text=|"
            alt="Dojo"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-3xl font-bold text-white">Disciplina. Força. Respeito.</h3>
            <p className="text-white/80 mt-1">Os pilares do seu dojo, refletidos em sua gestão.</p>
          </div>
        </div>
      </div>
    </div>
  );
}