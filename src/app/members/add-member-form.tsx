'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/context/app-context';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  phone: z.string().min(8, { message: 'O telefone deve ter pelo menos 8 caracteres.' }),
});

export function AddMemberForm() {
  const { dispatch } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao cadastrar aluno.');
      }

      const newMember = await response.json();
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
      toast.success(`${values.name} foi cadastrado(a) com sucesso!`);
      form.reset();
    } catch (error: any) {
      toast.error('Erro ao cadastrar', { description: error.message });
    }
  }

  return (
    <Card className="card-hover-lift">
      <CardHeader>
        <CardTitle>Cadastrar Novo Aluno</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Ex: Miyamoto Musashi" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="aluno@email.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem><FormLabel>Celular</FormLabel><FormControl><Input placeholder="(99) 99999-9999" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full font-semibold transition-transform duration-200 hover:scale-[1.03] cursor-pointer" size="lg">
              {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Aluno'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}