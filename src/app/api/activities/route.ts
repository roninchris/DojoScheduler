import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const latestMembers = await prisma.member.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const latestClasses = await prisma.class.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const latestBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        member: true,
        class: true,
      },
    });

    // Mapeia cada tipo de evento para um formato unificado
    const activities = [
      ...latestMembers.map((m: { id: number; name: string; createdAt: Date }) => ({
        id: m.id,
        type: 'ADD_MEMBER',
        description: `${m.name} foi registrado(a).`,
        timestamp: m.createdAt,
      })),
      ...latestClasses.map((c: { id: number; name: string; createdAt: Date }) => ({
        id: c.id,
        type: 'ADD_CLASS',
        description: `A aula "${c.name}" foi criada.`,
        timestamp: c.createdAt,
      })),
      ...latestBookings.map((b: { id: number; member: { name: string }; class: { name: string }; createdAt: Date }) => ({
        id: b.id,
        type: 'ADD_BOOKING',
        description: `${b.member.name} se matriculou em "${b.class.name}".`,
        timestamp: b.createdAt,
      })),
    ];

    // Ordena todas as atividades pela data e pega as 5 mais recentes
    const sortedActivities = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    return NextResponse.json(sortedActivities);
  } catch (error) {
    console.error('Failed to fetch recent activities:', error);
    return NextResponse.json({ message: 'Erro ao buscar atividades recentes.' }, { status: 500 });
  }
}