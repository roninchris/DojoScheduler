import { AddMemberForm } from './add-member-form';
import { MembersTable } from './members-table';

export default function MembersPage() {
  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold">Gerenciamento de Alunos</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <AddMemberForm />
            </div>
            <div className="lg:col-span-2">
                <MembersTable />
            </div>
        </div>
    </div>
  );
}