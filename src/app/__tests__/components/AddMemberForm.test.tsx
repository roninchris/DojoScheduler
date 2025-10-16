import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddMemberForm } from '@/app/members/add-member-form'
import { AppProvider } from '@/context/app-context'

// Mock do fetch
global.fetch = jest.fn()

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}))

const renderWithContext = (component: React.ReactElement) => {
  // Mock das respostas da API para o AppProvider
  ;(global.fetch as jest.Mock)
    .mockResolvedValueOnce({ json: async () => [] }) // members
    .mockResolvedValueOnce({ json: async () => [] }) // classes
    .mockResolvedValueOnce({ json: async () => [] }) // bookings

  return render(<AppProvider>{component}</AppProvider>)
}

describe('AddMemberForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o formulário corretamente', async () => {
    renderWithContext(<AddMemberForm />)

    await waitFor(() => {
      expect(screen.getByText('Cadastrar Novo Aluno')).toBeInTheDocument()
    })

    expect(screen.getByPlaceholderText('Ex: Miyamoto Musashi')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('aluno@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('(99) 99999-9999')).toBeInTheDocument()
  })

  it('deve validar campo nome com menos de 3 caracteres', async () => {
    const user = userEvent.setup()
    renderWithContext(<AddMemberForm />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ex: Miyamoto Musashi')).toBeInTheDocument()
    })

    const nameInput = screen.getByPlaceholderText('Ex: Miyamoto Musashi')
    const submitButton = screen.getByRole('button', { name: /salvar aluno/i })

    await user.type(nameInput, 'Jo')
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('O nome deve ter pelo menos 3 caracteres.')
      ).toBeInTheDocument()
    })
  })

  it('deve validar formato de email inválido', async () => {
    const user = userEvent.setup()
    renderWithContext(<AddMemberForm />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('aluno@email.com')).toBeInTheDocument()
    })

    const emailInput = screen.getByPlaceholderText('aluno@email.com')
    const submitButton = screen.getByRole('button', { name: /salvar aluno/i })

    await user.type(emailInput, 'email-invalido')
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Formato de email inválido.')
      ).toBeInTheDocument()
    })
  })

  it('deve formatar telefone automaticamente', async () => {
    const user = userEvent.setup()
    renderWithContext(<AddMemberForm />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('(99) 99999-9999')).toBeInTheDocument()
    })

    const phoneInput = screen.getByPlaceholderText(
      '(99) 99999-9999'
    ) as HTMLInputElement

    await user.type(phoneInput, '11999998888')

    expect(phoneInput.value).toBe('(11) 99999-8888')
  })

  it('deve submeter o formulário com dados válidos', async () => {
    const user = userEvent.setup()
    
    // Mock para o AppProvider (3 primeiras chamadas)
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => [] })
      .mockResolvedValueOnce({ json: async () => [] })
      .mockResolvedValueOnce({ json: async () => [] })
      // Mock para o submit do formulário
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: '1',
          name: 'João Silva',
          email: 'joao@test.com',
          phone: '(11) 99999-8888',
          createdAt: new Date().toISOString(),
        }),
      })

    renderWithContext(<AddMemberForm />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ex: Miyamoto Musashi')).toBeInTheDocument()
    })

    const nameInput = screen.getByPlaceholderText('Ex: Miyamoto Musashi')
    const emailInput = screen.getByPlaceholderText('aluno@email.com')
    const phoneInput = screen.getByPlaceholderText('(99) 99999-9999')
    const submitButton = screen.getByRole('button', { name: /salvar aluno/i })

    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao@test.com')
    await user.type(phoneInput, '11999998888')
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/members',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })
  })
})