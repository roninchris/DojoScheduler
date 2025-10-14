import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

// POST /api/bookings - Cria uma nova matrícula
export async function POST(request: Request) {
    try {
        const { memberId, classId } = await request.json();

        // Passo 1: Verificar se a turma já está cheia antes de matricular
        const classToBook = await prisma.class.findUnique({
            where: { id: classId },
            include: { _count: { select: { bookings: true } } },
        });

        if (!classToBook) {
            return NextResponse.json({ message: 'Aula não encontrada.' }, { status: 404 });
        }

        if (classToBook._count.bookings >= classToBook.maxCapacity) {
            return NextResponse.json({ message: 'Esta aula já atingiu a capacidade máxima.' }, { status: 409 });
        }

        // Passo 2: Criar a matrícula se houver vagas
        const newBooking = await prisma.booking.create({
            data: { memberId, classId },
            include: { member: true, class: true } // Retorna a matrícula com os dados para o front-end
        });
        return NextResponse.json(newBooking, { status: 201 });

    } catch (error: any) {
        // Erro se o aluno já estiver matriculado nesta aula
        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'Este aluno já está matriculado nesta aula.' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Erro ao realizar matrícula.' }, { status: 500 });
    }
}