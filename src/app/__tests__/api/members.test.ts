import { GET, POST } from '@/app/api/members/route'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('API Members', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/members', () => {
    it('deve retornar lista de alunos', async () => {
      const mockMembers = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@test.com',
          phone: '(11) 99999-9999',
          createdAt: new Date(),
        },
      ]

      ;(prisma.member.findMany as jest.Mock).mockResolvedValue(mockMembers)

      const response = await GET()
      const data = await response.json()

      expect(prisma.member.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
      expect(data).toEqual(mockMembers)
      expect(response.status).toBe(200)
    })
  })

  describe('POST /api/members', () => {
    it('deve criar um novo aluno com sucesso', async () => {
      const newMember = {
        name: 'Maria Santos',
        email: 'maria@test.com',
        phone: '(11) 98888-8888',
      }

      const mockCreatedMember = {
        id: '2',
        ...newMember,
        createdAt: new Date(),
      }

      ;(prisma.member.create as jest.Mock).mockResolvedValue(mockCreatedMember)

      const request = {
        json: async () => newMember,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(prisma.member.create).toHaveBeenCalledWith({
        data: newMember,
      })
      expect(data).toEqual(mockCreatedMember)
      expect(response.status).toBe(201)
    })

    it('deve retornar erro 400 quando campos obrigatórios faltam', async () => {
      const invalidData = {
        name: 'João',
      }

      const request = {
        json: async () => invalidData,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.message).toBe('Todos os campos são obrigatórios.')
    })

    it('deve retornar erro 409 quando email já existe', async () => {
      const duplicateMember = {
        name: 'João Silva',
        email: 'joao@test.com',
        phone: '(11) 99999-9999',
      }

      ;(prisma.member.create as jest.Mock).mockRejectedValue({
        code: 'P2002',
      })

      const request = {
        json: async () => duplicateMember,
      } as any

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.message).toBe('Este email já está cadastrado.')
    })
  })
})