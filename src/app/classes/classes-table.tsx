'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, BookCopy, Calendar, Clock, Users, Search } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import type { Class } from '@/lib/types';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function ClassesTable() {
  const { state, dispatch } = useAppContext();
  const { classes } = state;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    weekDays[cls.dayOfWeek].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (cls: Class) => {
    toast.info(`Deletando ${cls.name}...`);
    try {
      const response = await fetch(`/api/classes/${cls.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao deletar aula.');
      dispatch({ type: 'DELETE_CLASS', payload: cls.id });
      toast.success(`${cls.name} foi deletada com sucesso!`);
    } catch (error: any) {
      toast.error('Erro ao deletar', { description: error.message });
    }
  };

  return (
    <Card className="card-with-glow border-t-4 border-primary shadow-xl animate-smooth-scroll">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookCopy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Aulas da Semana</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredClasses.length} {filteredClasses.length === 1 ? 'aula' : 'aulas'}
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou dia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Aula</TableHead>
                <TableHead className="font-bold">Dia</TableHead>
                <TableHead className="font-bold">Horário</TableHead>
                <TableHead className="font-bold">Vagas</TableHead>
                <TableHead className="text-right font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls, index) => {
                  const occupancyRate = (cls._count.bookings / cls.maxCapacity) * 100;
                  return (
                    <TableRow 
                      key={cls.id}
                      className="stagger-item hover:bg-secondary/50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <BookCopy className="h-5 w-5 text-primary" />
                          </div>
                          <span className="group-hover:text-primary transition-colors duration-300">
                            {cls.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="badge text-xs">
                            {weekDays[cls.dayOfWeek]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {cls.startTime} - {cls.endTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[100px]">
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
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
                          <span className="text-sm font-medium whitespace-nowrap">
                            {cls._count.bookings} / {cls.maxCapacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="hover:bg-destructive/10 hover:scale-110 transition-all duration-300 group/btn"
                            >
                              <Trash2 className="h-4 w-4 text-destructive group-hover/btn:animate-pulse" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="animate-fade-in">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso irá deletar permanentemente a aula
                                <span className='font-bold text-foreground'> {cls.name}</span> e todas as suas matrículas.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="transition-all duration-300 hover:scale-105">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(cls)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300 hover:scale-105"
                              >
                                Sim, deletar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32">
                    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <BookCopy className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {searchTerm ? 'Nenhuma aula encontrada.' : 'Nenhuma aula cadastrada.'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}