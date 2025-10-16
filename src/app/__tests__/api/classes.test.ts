import { GET, POST } from '@/app/api/classes/route'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('API Classes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/classes', () => {
    it('deve retornar lista de aulas ordenadas por dia da semana', async () => {
      const mockClasses = [
        {
          id: '1',
          name: 'Karatê Kids',
          dayOfWeek: 1,
          startTime: '10:00',
          endTime: '11:00',
          maxCapacity: 20,
          createdAt: new Date(),
          _count: { bookings: 5 },
        },
      ]

      ;(prisma.class.findMany as jest.Mock).mockResolvedValue(mockClasses)

      const response = await GET()
      const data = await response.json()

      expect(prisma.class.findMany).toHaveBeenCalledWith({
        orderBy: { dayOfWeek: 'asc' },
        include: {
          _count: {
            select: { bookings: true },
          },
        },
      })
      expect(data).toEqual(mockClasses)
    })
  })

  describe('POST /api/classes', () => {
    it('deve criar uma nova aula com sucesso', async () => {
      const newClass = {
        name: 'Jiu-Jitsu Avançado',
        dayOfWeek: '2',
        startTime: '19:00',
        endTime: '20:30',
        maxCapacity: '15',
      }

      const mockCreatedClass = {
        id: '2',
        name: 'Jiu-Jitsu Avançado',
        dayOfWeek: 2,
        startTime: '19:00',
        endTime: '20:30',
        maxCapacity: 15,
        createdAt: new Date(),
      }

      ;(prisma.class.create as jest.Mock).mockResolvedValue(mockCreatedClass)

      const request = {
        json: async () => newClass,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(prisma.class.create).toHaveBeenCalled()
      expect(data.name).toBe('Jiu-Jitsu Avançado')
      expect(data._count).toEqual({ bookings: 0 })
      expect(response.status).toBe(201)
    })
  })
})