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
import { UserPlus, BookCopy, CheckCircle } from 'lucide-react';


const formSchema = z.object({
  memberId: z.string({
    message: "Por favor, selecione um aluno.",
  }).nonempty("Por favor, selecione um aluno."),
  classId: z.string({
    message: "Por favor, selecione uma aula.",
  }).nonempty("Por favor, selecione uma aula."),
});


export function AddBookingForm() {
  const { state, dispatch } = useAppContext();
  const { members, classes } = state;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Definir valores padrão vazios para evitar erros de "undefined"
    defaultValues: {
      memberId: "",
      classId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Lógica de submit...
    toast.info("Realizando matrícula...");
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao realizar matrícula.');
      }
      
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
    <Card className="hover-lift transition-all duration-300">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Nova Matrícula</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Matricule um aluno em uma aula
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField control={form.control} name="memberId" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <UserPlus className="h-4 w-4 text-primary" /> Aluno
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Selecione um aluno" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="classId" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <BookCopy className="h-4 w-4 text-primary" /> Aula
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Selecione uma aula" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map((cls) => {
                      const isFull = cls._count.bookings >= cls.maxCapacity;
                      return (
                        <SelectItem key={cls.id} value={cls.id} disabled={isFull}>
                          <div className="flex items-center justify-between gap-4 w-full">
                            <span>{cls.name}</span>
                            <span className={`text-xs ${isFull ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {cls._count.bookings}/{cls.maxCapacity}
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={form.formState.isSubmitting} className="btn w-full font-bold text-lg py-6 mt-2">
              <span className="flex items-center gap-2">
                {form.formState.isSubmitting ? (
                  <><div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Matriculando...</>
                ) : (
                  <><CheckCircle className="h-5 w-5" /> Confirmar Matrícula</>
                )}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}