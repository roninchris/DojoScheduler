// File: src/app/agenda/page.tsx
'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { Class } from '@/lib/types';

const weekDays = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
];

export default function AgendaPage() {
  const { state } = useAppContext();
  const { classes, loading } = state;

  const classesByDay = classes.reduce((acc, currentClass) => {
    const day = currentClass.dayOfWeek;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(currentClass);
    return acc;
  }, {} as Record<number, Class[]>);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-primary mb-8">Agenda da Semana</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weekDays.map((day, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classesByDay[index] && classesByDay[index].length > 0 ? (
                classesByDay[index].map(cls => (
                  <div key={cls.id} className="p-4 rounded-lg border border-border bg-secondary/50">
                    <p className="font-semibold text-secondary-foreground">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">{cls.startTime} - {cls.endTime}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Vagas: {cls._count.bookings} / {cls.maxCapacity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma aula neste dia.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}