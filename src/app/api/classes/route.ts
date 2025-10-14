import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/classes - Lista todas as aulas
// Inclui a contagem de matrículas (_count.bookings) para cada aula.
// Ordena por dia da semana para exibir em uma ordem lógica.
export async function GET() {
  const classes = await prisma.class.findMany({
    orderBy: {
      dayOfWeek: 'asc',
    },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });
  return NextResponse.json(classes);
}

// POST /api/classes - Cria uma nova aula
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Cria a nova aula no banco, garantindo que os dados numéricos sejam convertidos
    const newClass = await prisma.class.create({
      data: {
        name: data.name,
        dayOfWeek: parseInt(data.dayOfWeek, 10), // Converte string do formulário para número
        startTime: data.startTime,
        endTime: data.endTime,
        maxCapacity: parseInt(data.maxCapacity, 10), // Converte string do formulário para número
      },
    });
     // Retorna a nova aula com a contagem de matrículas (que será 0)
    const newClassWithCount = {
        ...newClass,
        _count: { bookings: 0 },
    };
    return NextResponse.json(newClassWithCount, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao criar aula.' }, { status: 500 });
  }
}