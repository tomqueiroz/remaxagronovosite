import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LeadForm from '@/components/LeadForm'
import CorretoresLocator from '@/components/CorretoresLocator'
import { BRAZIL_STATES, CORRETORES } from '@/data/corretores'
import Servicos from '@/pages/Servicos'
import Fazendas from '@/pages/Fazendas'
import FazendaItapirapua from '@/pages/FazendaItapirapua'
import NotFound from '@/pages/NotFound'
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade'
import TermosUso from '@/pages/TermosUso'
import RouteMetadata from '@/components/RouteMetadata'
import { ScrollToTop } from '@/App'
import { ASSETS, NAV_LINKS } from '@/data'

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

  it('exibe somente a Fazenda Itapirapuã com os dados documentados', () => {
    const { getByRole, getByText, queryByText } = render(
      <MemoryRouter>
        <Fazendas />
      </MemoryRouter>,
    )

    expect(getByRole('heading', { level: 1 }).textContent).toContain('Fazenda Itapirapuã')
    expect(getByText('230 hectares')).not.toBeNull()
    expect(getByText('170 hectares')).not.toBeNull()
    expect(getByText('R$ 4.600.000,00')).not.toBeNull()
    expect(queryByText(/Santa Helena/i)).toBeNull()
  })

  it('mantém o submenu Fazendas restrito à Fazenda Itapirapuã', () => {
    const farmsLink = NAV_LINKS.find(link => link.label === 'Fazendas')

    expect(farmsLink?.children).toEqual([
      { label: 'Fazenda Itapirapuã', to: '/fazendas/itapirapua' },
    ])
  })

  it('navega pelo carrossel com botões, miniaturas e teclado', () => {
    const { getByRole, getByAltText } = render(
      <MemoryRouter>
        <FazendaItapirapua />
      </MemoryRouter>,
    )

    expect(getByAltText('Vista aérea de curral, cercas e estruturas rurais')).not.toBeNull()
    fireEvent.click(getByRole('button', { name: 'Mostrar próxima imagem' }))
    expect(getByAltText('Vista aérea ampla de área rural com vegetação e áreas abertas')).not.toBeNull()

    fireEvent.click(getByRole('button', { name: 'Mostrar pecuária' }))
    expect(getByAltText('Manejo de gado em ambiente rural')).not.toBeNull()

    const carousel = getByRole('group', { name: 'Imagens da Fazenda Itapirapuã' })
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    expect(getByAltText('Paisagem de vale em região rural')).not.toBeNull()
  })

  it('oferece exatamente os três perfis definidos para Itapirapuã sem enviar lead', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <FazendaItapirapua />
      </MemoryRouter>,
    )

    const profile = getByLabelText('PERFIL') as HTMLSelectElement
    expect(Array.from(profile.options).map(option => option.text)).toEqual([
      'Selecione seu perfil...',
      'Eu sou fazendeiro interessado',
      'Eu sou corretor',
      'Eu sou investidor no agro',
    ])
    expect(insert).not.toHaveBeenCalled()
  })

  it('posiciona uma âncora de rota 70 px abaixo do header fixo', () => {
    let currentScrollY = 0
    let rafId = 0
    const targetAbsoluteTop = 396
    const target = document.createElement('section')
    target.id = 'compra'
    Object.defineProperty(target, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        top: targetAbsoluteTop - currentScrollY,
        bottom: targetAbsoluteTop - currentScrollY + 100,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: targetAbsoluteTop - currentScrollY,
        toJSON: () => ({}),
      }),
    })
    document.body.appendChild(target)

    const scrollToMock = vi.spyOn(window, 'scrollTo')
    scrollToMock.mockImplementation(((options: ScrollToOptions) => {
      currentScrollY = Number(options.top ?? 0)
    }) as typeof window.scrollTo)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      rafId += 1
      callback(rafId)
      return rafId
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)

    render(
      <MemoryRouter initialEntries={['/servicos#compra']}>
        <ScrollToTop />
      </MemoryRouter>,
    )

    expect(target.getBoundingClientRect().top).toBe(70)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 326, left: 0, behavior: 'auto' })
    target.remove()
  })

  it('usa os assets locais estáveis nas imagens auditadas de Nossa Equipe', () => {
    expect(ASSETS.womanCrops35179).toBe('/images/site/especialista-em-campo.jpg')
    expect(ASSETS.hills151008).toBe('/images/site/excelencia-no-campo.jpg')
  })

  it('padroniza o e-mail institucional nas páginas jurídicas', () => {
    const privacy = render(<PoliticaPrivacidade />)
    expect(privacy.getAllByText('contatoagro@remax.com.br').length).toBeGreaterThan(0)
    expect(privacy.container.textContent).not.toContain('contato@remaxagro.com.br')
    privacy.unmount()

    const terms = render(<TermosUso />)
    expect(terms.getAllByText('contatoagro@remax.com.br').length).toBeGreaterThan(0)
    expect(terms.container.textContent).not.toContain('contato@remaxagro.com.br')
  })

  it('mantém a thumbnail social horizontal nas mudanças de rota', async () => {
    render(
      <MemoryRouter initialEntries={['/corretores']}>
        <RouteMetadata />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content)
        .toBe('https://agro.remax.com.br/images/site/remax-agro-social-share.jpg')
      expect(document.head.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content)
        .toBe('https://agro.remax.com.br/images/site/remax-agro-social-share.jpg')
    })
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
