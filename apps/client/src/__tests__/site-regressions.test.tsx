import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LeadForm from '@/components/LeadForm'
import CorretoresLocator from '@/components/CorretoresLocator'
import Servicos from '@/pages/Servicos'
import NotFound from '@/pages/NotFound'

const insert = vi.fn(async () => ({ error: null }))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({ insert })),
  },
}))

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

afterEach(() => {
  cleanup()
  insert.mockClear()
})

describe('regressões do site REMAX Agro', () => {
  it('associa os rótulos aos campos e bloqueia e-mail inválido sem enviar lead', () => {
    const { getByLabelText, getByRole } = render(<LeadForm light />)

    const name = getByLabelText('Nome *') as HTMLInputElement
    const email = getByLabelText('E-mail *') as HTMLInputElement
    const phone = getByLabelText('Telefone / WhatsApp') as HTMLInputElement
    const profile = getByLabelText('Perfil') as HTMLSelectElement
    const message = getByLabelText('Mensagem') as HTMLTextAreaElement

    expect(name.id).not.toBe('')
    expect(email.id).not.toBe('')
    expect(phone.type).toBe('tel')
    expect(profile.id).not.toBe('')
    expect(message.id).not.toBe('')

    fireEvent.change(name, { target: { value: 'Pessoa Teste' } })
    fireEvent.change(email, { target: { value: 'email-invalido' } })
    fireEvent.submit(getByRole('button', { name: 'Enviar Mensagem' }).closest('form') as HTMLFormElement)

    expect(getByRole('alert').textContent).toContain('e-mail válido')
    expect(email.getAttribute('aria-invalid')).toBe('true')
    expect(insert).not.toHaveBeenCalled()
  })

  it('mantém todos os contatos dos corretores na central com mensagem contextual', () => {
    const { container, getAllByRole } = render(<CorretoresLocator />)
    const contactLinks = getAllByRole('link', { name: /WhatsApp da REMAX Agro/i }) as HTMLAnchorElement[]

    expect(contactLinks.length).toBeGreaterThan(0)
    for (const link of contactLinks) {
      expect(link.href.startsWith('https://wa.me/5511915051212?text=')).toBe(true)
      expect(decodeURIComponent(link.href)).toContain('Gostaria de entrar em contato com o corretor')
    }

    expect(container.querySelector('a[href^="tel:"]')).toBeNull()
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull()
  })

  it('preserva títulos semânticos e controles acessíveis nos serviços', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Servicos />
      </MemoryRouter>,
    )

    const serviceButtons = getAllByRole('button', { name: /Ver detalhes/i })

    expect(serviceButtons.length).toBeGreaterThan(0)
    for (const button of serviceButtons) {
      expect(button.querySelector('h3')).not.toBeNull()
    }
    expect(serviceButtons[0]?.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(serviceButtons[0] as HTMLButtonElement)
    expect(serviceButtons[0]?.getAttribute('aria-expanded')).toBe('true')
  })

  it('oferece retorno para a Home na página não encontrada', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )

    expect(getByRole('heading', { level: 1 }).textContent).toContain('não existe')
    expect((getByRole('link', { name: 'Voltar para a Home' }) as HTMLAnchorElement).getAttribute('href')).toBe('/')
  })
})
