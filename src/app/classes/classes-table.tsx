'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import type { Class } from '@/lib/types';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function ClassesTable() {
  const { state, dispatch } = useAppContext();
  const { classes } = state;

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
    <Card className="border-t-4 border-primary">
      <CardHeader><CardTitle>Aulas da Semana</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aula</TableHead>
              <TableHead>Dia</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Vagas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{weekDays[cls.dayOfWeek]}</TableCell>
                  <TableCell>{cls.startTime} - {cls.endTime}</TableCell>
                  <TableCell>{cls._count.bookings} / {cls.maxCapacity}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>Esta ação não pode ser desfeita. Isso irá deletar permanentemente a aula <span className='font-bold'>{cls.name}</span> e todas as suas matrículas.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(cls)}>Sim, deletar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5} className="h-24 text-center">Nenhuma aula cadastrada.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
