import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/members - Lista todos os alunos
// Ordena pelos mais recentes primeiro para uma melhor experiência de visualização.
export async function GET() {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return NextResponse.json(members);
}

// POST /api/members - Cria um novo aluno
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validação básica para garantir que os dados não estão vazios
    if (!data.name || !data.email || !data.phone) {
        return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const newMember = await prisma.member.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
    // Retorna o novo aluno criado com o status 201 (Created)
    return NextResponse.json(newMember, { status: 201 });
  } catch (error: any) {
    // Tratamento de erro específico para email duplicado (código P2002 do Prisma)
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Este email já está cadastrado.' }, { status: 409 }); // 409 Conflict
    }
    // Retorna um erro genérico caso algo mais dê errado
    return NextResponse.json({ message: 'Erro interno do servidor ao criar aluno.' }, { status: 500 });
  }
}