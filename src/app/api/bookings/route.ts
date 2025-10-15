import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { memberId, classId } = body;

    if (!memberId || !classId) {
      return NextResponse.json({ message: 'Aluno e aula são obrigatórios.' }, { status: 400 });
    }

    // --- LÓGICA DE VERIFICAÇÃO ---
    // Verifica se já existe uma matrícula para este aluno nesta aula
    const existingBooking = await prisma.booking.findFirst({
      where: {
        memberId: memberId,
        classId: classId,
      },
    });

    if (existingBooking) {
      // Se a matrícula já existe, retorna um erro de conflito (409)
      return NextResponse.json({ message: 'Este aluno já está matriculado nesta aula.' }, { status: 409 });
    }
    // --- FIM DA VERIFICAÇÃO ---

    // Verifica se a aula atingiu a capacidade máxima
    const targetClass = await prisma.class.findUnique({
        where: { id: classId },
        include: { _count: { select: { bookings: true } } },
    });

    if (!targetClass) {
        return NextResponse.json({ message: 'Aula não encontrada.' }, { status: 404 });
    }
    
    if (targetClass._count.bookings >= targetClass.maxCapacity) {
        return NextResponse.json({ message: 'Esta aula já atingiu a capacidade máxima.' }, { status: 400 });
    }

    // Se tudo estiver ok, cria a nova matrícula
    const newBooking = await prisma.booking.create({
      data: {
        memberId,
        classId,
      },
      include: {
        member: true,
        class: true,
      }
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json({ message: 'Erro ao criar matrícula.' }, { status: 500 });
  }
}

// GET /api/bookings - Lista todas as matrículas com dados do aluno e da aula
export async function GET() {
    const bookings = await prisma.booking.findMany({
        include: { 
            member: true, // Inclui os dados completos do aluno
            class: true   // Inclui os dados completos da aula
        },
        orderBy: { 
            createdAt: 'desc' 
        },
    });
    return NextResponse.json(bookings);
}
