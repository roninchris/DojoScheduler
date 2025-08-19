import { PageHeader } from '@/components/page-header';
import { AddClassForm } from './_components/add-class-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewClassPage() {
  return (
    <>
      <PageHeader
        title="Criar Nova Aula"
        description="Defina os detalhes da nova aula a ser oferecida no dojo."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Detalhes da Aula</CardTitle>
          <CardDescription>
            Insira o nome, horário e capacidade máxima de alunos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddClassForm />
        </CardContent>
      </Card>
    </>
  );
}
