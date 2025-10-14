import { AddClassForm } from './add-class-form';
import { ClassesTable } from './classes-table';

export default function ClassesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gerenciamento de Aulas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1"><AddClassForm /></div>
        <div className="lg:col-span-2"><ClassesTable /></div>
      </div>
    </div>
  );
}