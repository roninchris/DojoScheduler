
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Logo } from '@/components/logo';
import { useAppContext } from '@/context/app-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { dispatch } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@dojoscheduler.com' && password === 'admin123') {
      dispatch({ type: 'LOGIN' });
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo(a) de volta.",
      });
      router.push('/');
    } else {
      toast({
        title: "Erro de Login",
        description: "Email ou senha inválidos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="text-primary size-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Dojo Scheduler</CardTitle>
          <CardDescription>
            Faça login para gerenciar sua academia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@dojoscheduler.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
