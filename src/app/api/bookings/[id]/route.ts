import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/bookings/:id - Cancela (deleta) uma matrícula
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.booking.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao cancelar matrícula.' }, { status: 500 });
  }
}