'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/app-context';
import type { Booking } from '@/lib/types';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from 'date-fns';

export function BookingsTable() {
  const { state, dispatch } = useAppContext();
  const { bookings } = state;

  const handleDelete = async (booking: Booking) => {
    toast.info(`Cancelando matrícula...`);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao cancelar matrícula.');
      dispatch({ type: 'DELETE_BOOKING', payload: booking.id });
      toast.success(`Matrícula de ${booking.member.name} cancelada!`);
    } catch (error: any) {
      toast.error('Erro ao cancelar', { description: error.message });
    }
  };

  return (
    <Card className="border-t-4 border-primary">
      <CardHeader><CardTitle>Matrículas Realizadas</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Aula</TableHead>
              <TableHead>Data da Matrícula</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.member.name}</TableCell>
                  <TableCell>{booking.class.name}</TableCell>
                  <TableCell>{format(new Date(booking.createdAt), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>Esta ação irá cancelar permanentemente a matrícula de <span className='font-bold'>{booking.member.name}</span> na aula <span className='font-bold'>{booking.class.name}</span>.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Voltar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(booking)}>Sim, cancelar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={4} className="h-24 text-center">Nenhuma matrícula realizada.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}