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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome da aula deve ter pelo menos 3 caracteres.',
  }),
  schedule: z.string().min(5, {
    message: 'Por favor, insira um horário válido.',
  }),
  capacity: z.coerce.number().int().positive({
    message: 'A capacidade deve ser um número positivo.',
  }),
});

export function AddClassForm() {
  const { dispatch } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      schedule: '',
      capacity: 10,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newClass = {
      id: new Date().toISOString(),
      ...values,
      enrolledMembers: 0,
    };
    dispatch({ type: 'ADD_CLASS', payload: newClass });
    toast({
      title: 'Aula Criada!',
      description: `A aula "${values.name}" foi criada com sucesso.`,
    });
    router.push('/classes');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Aula</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Karatê Shotokan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Segundas e Quartas, 19:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade Máxima</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar Aula</Button>
      </form>
    </Form>
  );
}
