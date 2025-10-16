import { renderHook, act } from '@testing-library/react'
import { AppProvider, useAppContext } from '@/context/app-context'
import { ReactNode } from 'react'

// Mock do fetch
global.fetch = jest.fn()

const wrapper = ({ children }: { children: ReactNode }) => (
  <AppProvider>{children}</AppProvider>
)

describe('AppContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => [
          {
            id: '1',
            name: 'João Silva',
            email: 'joao@test.com',
            phone: '(11) 99999-9999',
            createdAt: new Date().toISOString(),
          },
        ],
      })
      .mockResolvedValueOnce({
        json: async () => [
          {
            id: '1',
            name: 'Karatê Kids',
            dayOfWeek: 1,
            startTime: '10:00',
            endTime: '11:00',
            maxCapacity: 20,
            createdAt: new Date().toISOString(),
            _count: { bookings: 5 },
          },
        ],
      })
      .mockResolvedValueOnce({
        json: async () => [],
      })
  })

  it('deve inicializar com loading true', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    expect(result.current.state.loading).toBe(true)
  })

  it('deve adicionar um membro', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    const newMember = {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@test.com',
      phone: '(11) 98888-8888',
      createdAt: new Date().toISOString(),
    }

    act(() => {
      result.current.dispatch({ type: 'ADD_MEMBER', payload: newMember })
    })

    expect(result.current.state.members).toContainEqual(newMember)
    expect(result.current.state.members.length).toBe(2)
  })

  it('deve deletar um membro', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    act(() => {
      result.current.dispatch({ type: 'DELETE_MEMBER', payload: '1' })
    })

    expect(result.current.state.members.length).toBe(0)
  })

  it('deve adicionar uma matrícula e atualizar contagem', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    const newBooking = {
      id: 'b1',
      memberId: '1',
      classId: '1',
      createdAt: new Date().toISOString(),
      member: result.current.state.members[0],
      class: result.current.state.classes[0],
    }

    act(() => {
      result.current.dispatch({ type: 'ADD_BOOKING', payload: newBooking })
    })

    expect(result.current.state.bookings.length).toBe(1)
    expect(result.current.state.classes[0]._count.bookings).toBe(6)
  })

  it('deve deletar uma matrícula e restaurar contagem', async () => {
    const { result } = renderHook(() => useAppContext(), { wrapper })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    const booking = {
      id: 'b1',
      memberId: '1',
      classId: '1',
      createdAt: new Date().toISOString(),
      member: result.current.state.members[0],
      class: result.current.state.classes[0],
    }

    act(() => {
      result.current.dispatch({ type: 'ADD_BOOKING', payload: booking })
    })

    expect(result.current.state.classes[0]._count.bookings).toBe(6)

    act(() => {
      result.current.dispatch({ type: 'DELETE_BOOKING', payload: 'b1' })
    })

    expect(result.current.state.bookings.length).toBe(0)
    expect(result.current.state.classes[0]._count.bookings).toBe(5)
  })
})