import { PageHeader } from '@/components/page-header';
import { CreateBookingForm } from './_components/create-booking-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewBookingPage() {
  return (
    <>
      <PageHeader
        title="Reservar Aula"
        description="Matricule um aluno em uma das aulas disponíveis."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Formulário de Matrícula</CardTitle>
          <CardDescription>
            Selecione o aluno e a aula desejada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateBookingForm />
        </CardContent>
      </Card>
    </>
  );
}
