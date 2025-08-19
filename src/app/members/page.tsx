import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { PlusCircle } from 'lucide-react';
import { MembersTable } from './_components/members-table';

export default function MembersPage() {
  return (
    <>
      <PageHeader
        title="Alunos"
        description="Visualize e gerencie todos os membros do seu dojo."
      >
        <Link href="/members/new">
          <Button asChild>
            <span>
              <PlusCircle />
              Cadastrar Aluno
            </span>
          </Button>
        </Link>
      </PageHeader>
      <div className="rounded-lg border shadow-sm">
        <MembersTable />
      </div>
    </>
  );
}
