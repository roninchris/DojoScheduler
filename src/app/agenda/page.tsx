'use client';

import { useAppContext } from '@/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar, Clock, Users, BookCopy, TrendingUp } from 'lucide-react';
import type { Class } from '@/lib/types';

const weekDays = [
  { full: "Domingo", short: "DOM" },
  { full: "Segunda-feira", short: "SEG" },
  { full: "Terça-feira", short: "TER" },
  { full: "Quarta-feira", short: "QUA" },
  { full: "Quinta-feira", short: "QUI" },
  { full: "Sexta-feira", short: "SEX" },
  { full: "Sábado", short: "SÁB" }
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

  // Sort classes by start time within each day
  Object.keys(classesByDay).forEach(day => {
    classesByDay[Number(day)].sort((a, b) => {
      const timeA = a.startTime.split(':').map(Number);
      const timeB = b.startTime.split(':').map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="relative">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-primary/20" />
        </div>
      </div>
    );
  }

  const totalCapacity = classes.reduce((sum, cls) => sum + cls.maxCapacity, 0);
  const totalBookings = classes.reduce((sum, cls) => sum + cls._count.bookings, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalBookings / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="animate-fade-in space-y-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Agenda da Semana</h1>
          <p className="text-muted-foreground text-lg">
            Visualize todas as aulas programadas para cada dia
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="stats-card group cursor-default">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <BookCopy className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Aulas</p>
                  <p className="text-2xl font-bold">{classes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card group cursor-default">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vagas Totais</p>
                  <p className="text-2xl font-bold">{totalCapacity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stats-card group cursor-default bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ocupação</p>
                  <p className="text-2xl font-bold">{occupancyRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="divider-red" />

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {weekDays.map((day, index) => {
          const dayClasses = classesByDay[index] || [];
          const dayCapacity = dayClasses.reduce((sum, cls) => sum + cls.maxCapacity, 0);
          const dayBookings = dayClasses.reduce((sum, cls) => sum + cls._count.bookings, 0);
          const dayOccupancy = dayCapacity > 0 ? Math.round((dayBookings / dayCapacity) * 100) : 0;

          return (
            <Card 
              key={index} 
              className="card-with-glow shadow-xl stagger-item hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{day.full}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dayClasses.length} {dayClasses.length === 1 ? 'aula' : 'aulas'}
                      </p>
                    </div>
                  </div>
                  <div className="badge text-xs">
                    {day.short}
                  </div>
                </div>

                {/* Day Stats */}
                {dayClasses.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Ocupação do dia</span>
                      <span className="font-semibold">{dayOccupancy}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          dayOccupancy >= 90 ? 'bg-destructive' :
                          dayOccupancy >= 70 ? 'bg-yellow-500' :
                          'bg-primary'
                        }`}
                        style={{ width: `${dayOccupancy}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-3">
                {dayClasses.length > 0 ? (
                  dayClasses.map((cls, classIndex) => {
                    const occupancyRate = (cls._count.bookings / cls.maxCapacity) * 100;
                    return (
                      <div 
                        key={cls.id} 
                        className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-secondary/30 hover:from-secondary/50 hover:to-secondary/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md group cursor-pointer"
                        style={{ animationDelay: `${(index * 0.1) + (classIndex * 0.05)}s` }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                            <BookCopy className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                              {cls.name}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{cls.startTime} - {cls.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-muted-foreground">Vagas</span>
                                  <span className="font-semibold">
                                    {cls._count.bookings}/{cls.maxCapacity}
                                  </span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-500 ${
                                      occupancyRate >= 90 ? 'bg-destructive' :
                                      occupancyRate >= 70 ? 'bg-yellow-500' :
                                      'bg-primary'
                                    }`}
                                    style={{ width: `${occupancyRate}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            {occupancyRate >= 90 && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-destructive animate-fade-in">
                                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                                Quase lotado
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nenhuma aula neste dia.
                    </p>
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