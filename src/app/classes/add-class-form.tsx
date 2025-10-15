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
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      maxCapacity: 10,
    },
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
      toast.success(`${values.name} criada com sucesso!`);
      form.reset();
    } catch (error: any) {
      toast.error('Erro ao criar aula', { description: error.message });
    }
  }

  return (
    <Card className="border-t-4 border-primary">
      <CardHeader><CardTitle>Criar Nova Aula</CardTitle></CardHeader>
      <CardContent>
        {/* O componente <Form> apenas "envelopa" o formulário */}
        <Form {...form}>
          {/* O onSubmit e className vão na tag <form> HTML */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Aula</FormLabel>
                <FormControl><Input placeholder="Ex: Karatê Kids" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="dayOfWeek" render={({ field }) => (
              <FormItem>
                <FormLabel>Dia da Semana</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Selecione o dia" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {weekDays.map((day, index) => <SelectItem key={index} value={String(index)}>{day}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="startTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>Início</FormLabel>
                  <FormControl><Input placeholder="HH:MM" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="endTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>Fim</FormLabel>
                  <FormControl><Input placeholder="HH:MM" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="maxCapacity" render={({ field }) => (
              <FormItem>
                <FormLabel>Vagas</FormLabel>
                <FormControl><Input type="number" placeholder="10" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Aula'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}