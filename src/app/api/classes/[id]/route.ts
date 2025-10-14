import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/classes/:id - Deleta uma aula
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const classId = params.id;
    await prisma.class.delete({
      where: { id: classId },
    });
    // Retorna uma resposta de sucesso sem conteúdo
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Tratamento de erro genérico
    return NextResponse.json({ message: 'Erro ao deletar aula.' }, { status: 500 });
  }
}