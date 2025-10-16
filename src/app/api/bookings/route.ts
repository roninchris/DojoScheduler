import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/bookings - Lista todas as matrículas com dados relacionados
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        member: true,
        class: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return NextResponse.json({ message: 'Erro ao buscar matrículas.' }, { status: 500 })
  }
}

// POST /api/bookings - Cria uma nova matrícula
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { memberId, classId } = body

    // Validação de campos obrigatórios
    if (!memberId || !classId) {
      return NextResponse.json(
        { message: 'Aluno e aula são obrigatórios.' },
        { status: 400 }
      )
    }

    // Verifica se o aluno já está matriculado nesta aula
    const existingBooking = await prisma.booking.findFirst({
      where: {
        memberId,
        classId,
      },
    })

    if (existingBooking) {
      return NextResponse.json(
        { message: 'Este aluno já está matriculado nesta aula.' },
        { status: 409 }
      )
    }

    // Verifica se a aula existe e sua capacidade
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    })

    if (!classData) {
      return NextResponse.json(
        { message: 'Aula não encontrada.' },
        { status: 404 }
      )
    }

    // Verifica se a aula está lotada
    if (classData._count.bookings >= classData.maxCapacity) {
      return NextResponse.json(
        { message: 'Esta aula já atingiu a capacidade máxima.' },
        { status: 400 }
      )
    }

    // Cria a matrícula
    const booking = await prisma.booking.create({
      data: {
        memberId,
        classId,
      },
      include: {
        member: true,
        class: {
          include: {
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Failed to create booking:', error)
    return NextResponse.json({ message: 'Erro ao criar matrícula.' }, { status: 500 })
  }
}