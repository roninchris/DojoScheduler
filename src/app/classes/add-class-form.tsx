'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/app-context';
import { toast } from 'sonner';
import { BookCopy, Calendar, Clock, Users, Sparkles } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  dayOfWeek: z.string().nonempty({ message: 'Selecione um dia da semana.' }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato HH:MM inválido.'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato HH:MM inválido.'),
  maxCapacity: z.coerce.number().int().min(1, { message: 'A capacidade deve ser no mínimo 1.' }),
});

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export function AddClassForm() {
  const { dispatch } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: { name: '', dayOfWeek: '', startTime: '', endTime: '', maxCapacity: 10 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.info("Criando nova aula...");
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(await response.json().then(d => d.message) || 'Falha ao criar aula.');
      
      const newClass = await response.json();
      dispatch({ type: 'ADD_CLASS', payload: newClass });
      toast.success(`${values.name} criada com sucesso!`, {
        description: 'A nova aula está disponível para agendamento.',
      });
      form.reset();
    } catch (error: any) {
      toast.error('Erro ao criar aula', { description: error.message });
    }
  }

  return (
    <Card className="card-with-glow border-t-4 border-primary shadow-xl animate-smooth-scroll">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookCopy className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Criar Nova Aula</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Configure os detalhes da nova turma
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Nome da Aula
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Karatê Kids" 
                    className="input transition-all duration-300 focus:scale-[1.02]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="animate-fade-in" />
              </FormItem>
            )} />
            <FormField control={form.control} name="dayOfWeek" render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4 text-primary" />
                  Dia da Semana
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                      <SelectValue placeholder="Selecione o dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {weekDays.map((day, index) => (
                      <SelectItem 
                        key={index} 
                        value={String(index)}
                        className="cursor-pointer hover:bg-primary/10 transition-colors duration-200"
                      >
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="animate-fade-in" />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="startTime" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4 text-primary" />
                    Início
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="HH:MM" 
                      className="input transition-all duration-300 focus:scale-[1.02]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="animate-fade-in" />
                </FormItem>
              )} />
              <FormField control={form.control} name="endTime" render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4 text-primary" />
                    Fim
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="HH:MM" 
                      className="input transition-all duration-300 focus:scale-[1.02]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="animate-fade-in" />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="maxCapacity" render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 font-semibold">
                  <Users className="h-4 w-4 text-primary" />
                  Capacidade Máxima
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="10" 
                    className="input transition-all duration-300 focus:scale-[1.02]" 
                    {...field} 
                  />
                </FormControl>
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
                    Salvando...
                  </>
                ) : (
                  <>
                    <BookCopy className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    Salvar Aula
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