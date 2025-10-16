import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('deve combinar classes corretamente', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toContain('text-red-500')
    expect(result).toContain('bg-blue-500')
  })

  it('deve sobrescrever classes conflitantes', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('deve lidar com valores condicionais', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
  })

  it('deve ignorar valores falsy', () => {
    const result = cn('base', false, null, undefined, 'end')
    expect(result).toBe('base end')
  })
})