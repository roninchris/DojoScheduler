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
import { UserPlus, BookCopy, CheckCircle, AlertCircle } from 'lucide-react';

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
      toast.success(`Matrícula de ${memberName} realizada com sucesso!`, {
        description: 'O aluno já pode participar da aula.',
      });
      form.reset();
    } catch (error: any) {
      toast.error('Erro ao matricular', { description: error.message });
    }
  }

  return (
    <Card className="card-with-glow border-t-4 border-primary shadow-xl animate-smooth-scroll">
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
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <UserPlus className="h-4 w-4 text-primary" />
                  Aluno
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                      <SelectValue placeholder="Selecione um aluno" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem 
                        key={member.id} 
                        value={member.id}
                        className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserPlus className="h-3 w-3 text-primary" />
                          </div>
                          {member.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="animate-fade-in" />
              </FormItem>
            )} />
            <FormField control={form.control} name="classId" render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <BookCopy className="h-4 w-4 text-primary" />
                  Aula
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                      <SelectValue placeholder="Selecione uma aula" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map((cls) => {
                      const isFull = cls._count.bookings >= cls.maxCapacity;
                      const occupancyRate = (cls._count.bookings / cls.maxCapacity) * 100;
                      return (
                        <SelectItem 
                          key={cls.id} 
                          value={cls.id} 
                          disabled={isFull}
                          className="cursor-pointer hover:bg-primary/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-center justify-between gap-4 w-full">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookCopy className="h-3 w-3 text-primary" />
                              </div>
                              <span>{cls.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    occupancyRate >= 90 ? 'bg-destructive' :
                                    occupancyRate >= 70 ? 'bg-yellow-500' :
                                    'bg-primary'
                                  }`}
                                  style={{ width: `${occupancyRate}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {cls._count.bookings}/{cls.maxCapacity}
                              </span>
                              {isFull ? (
                                <AlertCircle className="h-3 w-3 text-destructive" />
                              ) : (
                                <CheckCircle className="h-3 w-3 text-primary" />
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage className="animate-fade-in" />
              </FormItem>
            )} />
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting} 
              className="btn w-full font-bold text-lg py-6 mt-2 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {form.formState.isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Matriculando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    Confirmar Matrícula
                  </>
                )}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}