'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';

export default function ClassesPage() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();

  const handleDeleteClass = (classId: string, className: string) => {
    dispatch({ type: 'DELETE_CLASS', payload: classId });
    toast({
        title: "Aula Removida",
        description: `A aula "${className}" foi removida com sucesso.`,
        variant: 'destructive'
      });
  };

  return (
    <>
      <PageHeader
        title="Aulas"
        description="Gerencie todas as aulas e seus horários."
      >
        <Link href="/classes/new">
          <Button asChild>
            <span>
              <PlusCircle />
              Criar Nova Aula
            </span>
          </Button>
        </Link>
      </PageHeader>
      
      {state.classes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {state.classes.map((c) => (
            <Card key={c.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{c.name}</CardTitle>
                        <CardDescription>{c.schedule}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeleteClass(c.id, c.name)}>
                        <Trash2 className="size-4" />
                        <span className="sr-only">Excluir aula</span>
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <p className="text-sm font-medium">Lotação</p>
                        <p className="text-sm text-muted-foreground">{c.enrolledMembers} / {c.capacity}</p>
                    </div>
                    <Progress value={(c.enrolledMembers / c.capacity) * 100} aria-label={`${(c.enrolledMembers / c.capacity) * 100}% de lotação`} />
                </div>
              </CardContent>
              <CardFooter>
                 <Badge variant={c.enrolledMembers >= c.capacity ? "destructive" : "secondary"}>
                    {c.enrolledMembers >= c.capacity ? "Lotada" : "Vagas disponíveis"}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">Nenhuma aula criada</h3>
            <p className="text-muted-foreground mt-2 mb-4">Comece adicionando uma nova aula para seus alunos.</p>
            <Link href="/classes/new">
                <Button asChild>
                    <span>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Criar Primeira Aula
                    </span>
                </Button>
            </Link>
        </div>
      )}
    </>
  );
}
