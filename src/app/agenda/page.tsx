'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar, Clock, Users, BookCopy, TrendingUp } from 'lucide-react';
import type { Class } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function AgendaPage() {
  const { state } = useAppContext();
  const { classes, loading } = state;

  const classesByDay = classes.reduce((acc, currentClass) => {
    const day = currentClass.dayOfWeek;
    if (!acc[day]) acc[day] = [];
    acc[day].push(currentClass);
    return acc;
  }, {} as Record<number, Class[]>);

  Object.values(classesByDay).forEach(dayClasses => {
    dayClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const totalCapacity = classes.reduce((sum, cls) => sum + cls.maxCapacity, 0);
  const totalBookings = classes.reduce((sum, cls) => sum + cls._count.bookings, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalBookings / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Agenda da Semana</h1>
        <p className="text-muted-foreground text-lg">Visualize todas as aulas programadas para cada dia.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary/10"><BookCopy className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total de Aulas</p><p className="text-2xl font-bold">{classes.length}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary/10"><Users className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Vagas Totais</p><p className="text-2xl font-bold">{totalCapacity}</p></div></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="p-3 rounded-xl bg-primary/10"><TrendingUp className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Ocupação</p><p className="text-2xl font-bold">{occupancyRate}%</p></div></div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {weekDays.map((day, index) => {
          const dayClasses = classesByDay[index] || [];
          return (
            <Card key={index} className="stagger-item flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{day}</CardTitle>
                  <div className="text-xs font-bold bg-primary text-primary-foreground rounded-md px-2 py-1">{day.substring(0,3).toUpperCase()}</div>
                </div>
                <p className="text-xs text-muted-foreground">{dayClasses.length} {dayClasses.length === 1 ? 'aula' : 'aulas'}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-3">
                {dayClasses.length > 0 ? (
                  dayClasses.map(cls => {
                    const occupancyRate = (cls._count.bookings / cls.maxCapacity) * 100;
                    return (
                      <Link href="/classes" key={cls.id} className="block hover-lift p-4 rounded-xl border border-border bg-secondary/30 transition-all duration-300">
                        <p className="font-semibold text-foreground truncate">{cls.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><Clock className="h-3 w-3" /><span>{cls.startTime} - {cls.endTime}</span></div>
                        <div className="flex items-center gap-2 mt-3 text-xs">
                          <Users className="h-3 w-3" />
                          <span>{cls._count.bookings}/{cls.maxCapacity}</span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden ml-2"><div className={cn('h-full rounded-full', occupancyRate >= 90 ? 'bg-destructive' : occupancyRate >= 70 ? 'bg-yellow-500' : 'bg-primary')} style={{ width: `${occupancyRate}%` }} /></div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-8">
                    <Calendar className="h-8 w-8 text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">Nenhuma aula neste dia.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}