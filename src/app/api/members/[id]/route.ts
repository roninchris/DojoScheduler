import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/members/:id - Deleta um aluno
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = params.id;
    await prisma.member.delete({
      where: { id: memberId },
    });
    // Retorna uma resposta de sucesso sem conteúdo, que é o padrão para DELETE
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    // Tratamento de erro caso o aluno não seja encontrado ou outro problema ocorra
    return NextResponse.json({ message: 'Erro ao deletar aluno.' }, { status: 500 });
  }
}