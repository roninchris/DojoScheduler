'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  memberId: z.string({ required_error: 'Por favor, selecione um aluno.' }),
  classId: z.string({ required_error: 'Por favor, selecione uma aula.' }),
});

export function CreateBookingForm() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedClass = state.classes.find(c => c.id === values.classId);
    const selectedMember = state.members.find(m => m.id === values.memberId);

    if (!selectedClass || !selectedMember) {
        toast({ title: 'Erro', description: 'Aluno ou aula não encontrado.', variant: 'destructive'});
        return;
    }

    if (selectedClass.enrolledMembers >= selectedClass.capacity) {
        toast({ title: 'Aula Lotada', description: 'Não há mais vagas nesta aula.', variant: 'destructive'});
        return;
    }
    
    const existingBooking = state.bookings.find(
        b => b.classId === values.classId && b.memberId === values.memberId
    );

    if (existingBooking) {
        toast({ title: 'Matrícula Existente', description: 'Este aluno já está matriculado nesta aula.', variant: 'destructive'});
        return;
    }
    
    dispatch({ type: 'ADD_BOOKING', payload: values });
    toast({
      title: 'Matrícula Realizada!',
      description: `${selectedMember.name} foi matriculado(a) em ${selectedClass.name}.`,
    });
    router.push('/members');
  }
  
  const availableClasses = state.classes.filter(c => c.enrolledMembers < c.capacity);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aluno</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {state.members.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aula</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma aula com vagas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableClasses.length > 0 ? availableClasses.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.enrolledMembers}/{c.capacity})
                    </SelectItem>
                  )) : <SelectItem value="none" disabled>Nenhuma aula com vagas</SelectItem>}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Confirmar Matrícula</Button>
      </form>
    </Form>
  );
}
