'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/app-context';
import { toast } from 'sonner';

const formSchema = z.object({
  memberId: z.string().nonempty({ message: 'Selecione um aluno.' }),
  classId: z.string().nonempty({ message: 'Selecione uma aula.' }),
});

export function AddBookingForm() {
  const { state, dispatch } = useAppContext();
  const { members, classes } = state;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.info("Realizando matrícula...");
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(await response.json().then(d => d.message));
      
      const newBooking = await response.json();
      dispatch({ type: 'ADD_BOOKING', payload: newBooking });
      const memberName = members.find(m => m.id === values.memberId)?.name;
      toast.success(`Matrícula de ${memberName} realizada com sucesso!`);
      form.reset();
    } catch (error: any) {
      toast.error('Erro ao matricular', { description: error.message });
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Nova Matrícula</CardTitle></CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="memberId" render={({ field }) => (
              <FormItem><FormLabel>Aluno</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione um aluno" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {members.map((member) => <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>)}
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="classId" render={({ field }) => (
              <FormItem><FormLabel>Aula</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione uma aula" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id} disabled={cls._count.bookings >= cls.maxCapacity}>
                        {cls.name} ({cls._count.bookings}/{cls.maxCapacity} vagas)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Matriculando...' : 'Confirmar Matrícula'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}