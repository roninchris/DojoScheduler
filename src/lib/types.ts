// Corresponde ao modelo 'Member' no Prisma
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

// Corresponde ao  modelo 'Class' no Prisma, com a contagem de matrículas
export interface Class {
  id: string;
  name: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  _count: {
    bookings: number;
  };
}

// Corresponde ao modelo 'Booking' no Prisma, com dados relacionados
// Usado principalmente no Contexto/Gerenciador de Estado
export interface Booking {
  id: string;
  memberId: string;
  classId: string;
  createdAt: string;
  member: Member;
  class: Class;
}