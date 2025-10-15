'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookCopy, PlusCircle, Loader2, Calendar, UserPlus, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Definimos um tipo para a atividade unificada
type Activity = {
  id: string;
  type: 'ADD_MEMBER' | 'ADD_CLASS' | 'ADD_BOOKING';
  description: string;
  timestamp: string;
};

export default function DashboardPage() {
  const { state } = useAppContext();
  const { members, classes, loading } = state;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch('/api/activities');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setActivitiesLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const activityIcons: { [key: string]: React.ReactNode } = {
    ADD_MEMBER: <UserPlus className="h-5 w-5 text-green-500" />,
    ADD_CLASS: <BookCopy className="h-5 w-5 text-blue-500" />,
    ADD_BOOKING: <CheckCircle className="h-5 w-5 text-primary" />,
  };

  const timeSince = (date: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `há ${Math.floor(interval)} ano(s)`;
    interval = seconds / 2592000;
    if (interval > 1) return `há ${Math.floor(interval)} mese(s)`;
    interval = seconds / 86400;
    if (interval > 1) return `há ${Math.floor(interval)} dia(s)`;
    interval = seconds / 3600;
    if (interval > 1) return `há ${Math.floor(interval)} hora(s)`;
    interval = seconds / 60;
    if (interval > 1) return `há ${Math.floor(interval)} minuto(s)`;
    return "agora mesmo";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Bem-vindo ao Dojo Scheduler</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus alunos, aulas e agendamentos com facilidade.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="transition-all duration-300 hover-lift-static">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total de Alunos</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{members.length}</div>
            <p className="text-sm text-muted-foreground">membros ativos no sistema</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-300 hover-lift-static">
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
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Ações Rápidas</h2>
          <p className="text-muted-foreground mb-6">Comece a organizar seu dojo agora mesmo.</p>
          <div className="flex flex-col gap-4 mt-auto">
            <Link href="/members"><Button className="w-full font-bold text-lg py-6 btn"><PlusCircle className="mr-2 h-5 w-5" /> Cadastrar Novo Aluno</Button></Link>
            <Link href="/classes"><Button className="w-full font-bold text-lg py-6 btn" variant="secondary"><PlusCircle className="mr-2 h-5 w-5" /> Criar Nova Aula</Button></Link>
            <Link href="/agenda"><Button className="w-full font-bold text-lg py-6 btn" variant="outline"><Calendar className="mr-2 h-5 w-5" /> Ver Agenda</Button></Link>
          </div>
        </Card>
        <Card className="flex flex-col p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Atividade Recente</h2>
          <div className="flex flex-col gap-1 -mx-6 px-6 overflow-y-auto max-h-[350px]">
            {activitiesLoading ? (
              <div className="flex justify-center items-center h-full"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="p-3 bg-background rounded-full border">{activityIcons[activity.type]}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{timeSince(activity.timestamp)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">Nenhuma atividade recente.</p>
            )}
          </div>
        </Card>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-xl h-64 mt-4 hover-lift-static transition-all duration-300">
        <img
          src="https://i.imgur.com/txQL4Fa.png"
          className="object-cover w-full h-full brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <h3 className="text-4xl font-bold text-white leading-tight">Disciplina. Força. Respeito.</h3>
          <p className="text-white/80 mt-2 max-w-lg">Os pilares do seu dojo, refletidos em sua gestão.</p>
        </div>
      </div>
    </div>
  );
}