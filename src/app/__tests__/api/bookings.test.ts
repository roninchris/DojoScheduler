import { GET, POST } from '@/app/api/bookings/route'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('API Bookings', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/bookings', () => {
    it('deve retornar lista de matrículas com dados relacionados', async () => {
      const mockBookings = [
        {
          id: '1',
          memberId: 'm1',
          classId: 'c1',
          createdAt: new Date(),
          member: {
            id: 'm1',
            name: 'João Silva',
            email: 'joao@test.com',
            phone: '(11) 99999-9999',
            createdAt: new Date(),
          },
          class: {
            id: 'c1',
            name: 'Karatê Kids',
            dayOfWeek: 1,
            startTime: '10:00',
            endTime: '11:00',
            maxCapacity: 20,
            createdAt: new Date(),
          },
        },
      ]

      ;(prisma.booking.findMany as jest.Mock).mockResolvedValue(mockBookings)

      const response = await GET()
      const data = await response.json()

      expect(prisma.booking.findMany).toHaveBeenCalledWith({
        include: {
          member: true,
          class: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      expect(data).toEqual(mockBookings)
    })
  })

  describe('POST /api/bookings', () => {
    it('deve criar uma matrícula com sucesso', async () => {
      const newBooking = {
        memberId: 'm1',
        classId: 'c1',
      }

      const mockClass = {
        id: 'c1',
        maxCapacity: 20,
        _count: { bookings: 5 },
      }

      const mockCreatedBooking = {
        id: 'b1',
        ...newBooking,
        createdAt: new Date(),
        member: {
          id: 'm1',
          name: 'João Silva',
          email: 'joao@test.com',
          phone: '(11) 99999-9999',
          createdAt: new Date(),
        },
        class: mockClass,
      }

      ;(prisma.booking.findFirst as jest.Mock).mockResolvedValue(null)
      ;(prisma.class.findUnique as jest.Mock).mockResolvedValue(mockClass)
      ;(prisma.booking.create as jest.Mock).mockResolvedValue(mockCreatedBooking)

      const request = {
        json: async () => newBooking,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.memberId).toBe('m1')
      expect(data.classId).toBe('c1')
    })

    it('deve retornar erro 400 quando campos obrigatórios faltam', async () => {
      const invalidBooking = {
        memberId: 'm1',
      }

      const request = {
        json: async () => invalidBooking,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.message).toBe('Aluno e aula são obrigatórios.')
    })

    it('deve retornar erro 409 quando aluno já está matriculado', async () => {
      const duplicateBooking = {
        memberId: 'm1',
        classId: 'c1',
      }

      ;(prisma.booking.findFirst as jest.Mock).mockResolvedValue({
        id: 'existing',
        ...duplicateBooking,
      })

      const request = {
        json: async () => duplicateBooking,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.message).toBe('Este aluno já está matriculado nesta aula.')
    })

    it('deve retornar erro 400 quando aula está lotada', async () => {
      const newBooking = {
        memberId: 'm1',
        classId: 'c1',
      }

      const fullClass = {
        id: 'c1',
        maxCapacity: 10,
        _count: { bookings: 10 },
      }

      ;(prisma.booking.findFirst as jest.Mock).mockResolvedValue(null)
      ;(prisma.class.findUnique as jest.Mock).mockResolvedValue(fullClass)

      const request = {
        json: async () => newBooking,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.message).toBe('Esta aula já atingiu a capacidade máxima.')
    })
  })
})