import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LeadForm from '@/components/LeadForm'
import CorretoresLocator from '@/components/CorretoresLocator'
import { BRAZIL_STATES, CORRETORES } from '@/data/corretores'
import Servicos from '@/pages/Servicos'
import Fazendas from '@/pages/Fazendas'
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
  vi.useRealTimers()
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

  it('preserva os 67 corretores, 37 fotos reais e 30 áreas sem foto', () => {
    expect(CORRETORES).toHaveLength(67)
    expect(CORRETORES.filter((corretor) => corretor.photo)).toHaveLength(37)
    expect(CORRETORES.filter((corretor) => corretor.photo === null)).toHaveLength(30)
    expect(CORRETORES.some((corretor) => corretor.photo?.includes('placeholder'))).toBe(false)
    expect(BRAZIL_STATES).toHaveLength(27)
  })

  it('abre o painel somente após selecionar uma UF e mantém o contato na central', () => {
    const { container, getByRole, getAllByRole, queryByRole } = render(<CorretoresLocator />)

    expect(queryByRole('heading', { name: 'São Paulo' })).toBeNull()
    expect(getAllByRole('button', { name: /corretor|nenhum corretor/i })).toHaveLength(27)

    fireEvent.click(getByRole('button', { name: /^São Paulo:/i }))
    expect(getByRole('heading', { name: 'São Paulo' })).not.toBeNull()

    const contactLinks = getAllByRole('link', { name: /WhatsApp da REMAX Agro/i }) as HTMLAnchorElement[]
    expect(contactLinks.length).toBeGreaterThan(0)
    for (const link of contactLinks) {
      expect(link.href.startsWith('https://wa.me/5511915051212?text=')).toBe(true)
      expect(decodeURIComponent(link.href)).toContain('Gostaria de entrar em contato com o corretor')
    }

    expect(container.querySelector('a[href^="tel:"]')).toBeNull()
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull()
    expect(container.querySelector('img[alt^="Imagem ilustrativa"]')).toBeNull()
  })

  it('permite abrir por Enter e Espaço e fechar manualmente', () => {
    const { getByRole, queryByRole } = render(<CorretoresLocator />)
    const bahia = getByRole('button', { name: /^Bahia:/i })

    fireEvent.keyDown(bahia, { key: 'Enter' })
    expect(getByRole('heading', { name: 'Bahia' })).not.toBeNull()
    fireEvent.click(getByRole('button', { name: 'Fechar painel de corretores em Bahia' }))
    expect(queryByRole('heading', { name: 'Bahia' })).toBeNull()

    fireEvent.keyDown(bahia, { key: ' ' })
    expect(getByRole('heading', { name: 'Bahia' })).not.toBeNull()
  })

  it('fecha após cinco segundos de inatividade e reinicia o prazo ao rolar o conteúdo', () => {
    vi.useFakeTimers()
    const { getByLabelText, getByRole, queryByRole } = render(<CorretoresLocator />)

    fireEvent.click(getByRole('button', { name: /^São Paulo:/i }))
    const scrollContainer = getByLabelText('Corretores em São Paulo')

    act(() => vi.advanceTimersByTime(4_000))
    fireEvent.scroll(scrollContainer)
    act(() => vi.advanceTimersByTime(4_999))
    expect(getByRole('heading', { name: 'São Paulo' })).not.toBeNull()

    act(() => vi.advanceTimersByTime(1))
    expect(queryByRole('heading', { name: 'São Paulo' })).toBeNull()
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

  it('exibe somente a propriedade confirmada e direciona para a Santa Helena', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Fazendas />
      </MemoryRouter>,
    )

    expect(getByRole('heading', { level: 1 }).textContent).toContain('Fazendas selecionadas')
    expect(getByRole('heading', { level: 3 }).textContent).toContain('Escala produtiva')

    const propertyLinks = getAllByRole('link', { name: /Fazenda Santa Helena|Conhecer a propriedade/i }) as HTMLAnchorElement[]
    expect(propertyLinks).toHaveLength(2)
    for (const link of propertyLinks) expect(link.getAttribute('href')).toBe('/fazendas/santa-helena')
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
