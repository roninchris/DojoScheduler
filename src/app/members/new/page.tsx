import { PageHeader } from '@/components/page-header';
import { AddMemberForm } from './_components/add-member-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewMemberPage() {
  return (
    <>
      <PageHeader
        title="Cadastrar Novo Aluno"
        description="Preencha os dados abaixo para adicionar um novo membro ao dojo."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Informações do Aluno</CardTitle>
          <CardDescription>
            Certifique-se de que os dados estão corretos antes de salvar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddMemberForm />
        </CardContent>
      </Card>
    </>
  );
}
