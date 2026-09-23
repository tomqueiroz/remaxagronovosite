import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LeadForm from '@/components/LeadForm'
import CorretoresLocator from '@/components/CorretoresLocator'
import Layout from '@/components/Layout'
import { BRAZIL_STATES, CORRETORES } from '@/data/corretores'
import Contato from '@/pages/Contato'
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
    expect(profile.options[0]?.style.color).toBe('#6b7280')
    expect(profile.options[0]?.style.backgroundColor).toBe('#ffffff')
    expect(profile.options[1]?.style.color).toBe('#1f2937')
    expect(profile.options[1]?.style.backgroundColor).toBe('#ffffff')

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

  it('abre o painel somente após selecionar uma UF e exibe foto, cidade e WhatsApp institucional personalizado', () => {
    const { container, getByAltText, getByLabelText, getByRole, getAllByRole, getAllByText, getByText, queryByRole } = render(<CorretoresLocator />)

    expect(queryByRole('heading', { name: 'São Paulo' })).toBeNull()
    expect(getAllByRole('button', { name: /corretor|nenhum corretor/i })).toHaveLength(27)
    expect(getByRole('heading', { name: 'Encontre um corretor certificado perto de você' })).not.toBeNull()

    const stateLayer = container.querySelector('[data-map-layer="states"]')
    const labelLayer = container.querySelector('[data-map-layer="labels"]')
    const renderedLabels = Array.from(container.querySelectorAll<SVGTextElement>('[data-state-label]'))
    expect(stateLayer).not.toBeNull()
    expect(labelLayer).not.toBeNull()
    expect(renderedLabels).toHaveLength(27)
    expect(renderedLabels.map(label => label.dataset.stateLabel).sort()).toEqual(
      BRAZIL_STATES.map(state => state.uf).sort(),
    )
    expect(labelLayer?.previousElementSibling).toBe(stateLayer)
    for (const label of renderedLabels) {
      expect(label.getAttribute('paint-order')).toBe('stroke')
      expect(Number(label.getAttribute('stroke-width'))).toBeGreaterThanOrEqual(2)
    }

    const adjustedCoordinates = {
      AP: [342, 68], AM: [160, 150], CE: [535, 170], MA: [440, 178],
      PA: [324, 174], PI: [471, 214], PR: [356, 478], RO: [181, 271],
      RR: [190, 57], RS: [328, 566], SC: [364, 519], SP: [398, 434], TO: [403, 255],
    } as const
    for (const [uf, [x, y]] of Object.entries(adjustedCoordinates)) {
      const label = container.querySelector<SVGTextElement>(`[data-state-label="${uf}"]`)
      expect(label?.getAttribute('x')).toBe(String(x))
      expect(label?.getAttribute('y')).toBe(String(y))
    }

    const mobileSelector = getByLabelText('Selecione o estado') as HTMLSelectElement
    expect(mobileSelector.options[0]?.style.color).toBe('#6b7280')
    expect(mobileSelector.options[1]?.style.color).toBe('#1f2937')
    expect(mobileSelector.options[1]?.style.backgroundColor).toBe('#ffffff')

    fireEvent.click(getByRole('button', { name: /^São Paulo:/i }))
    expect(getByRole('heading', { name: 'São Paulo' })).not.toBeNull()
    expect(getByText('Angel Cáceres')).not.toBeNull()
    expect(container.textContent).not.toContain('(16) 996239696')
    expect(container.textContent).not.toContain('angelcaceres@remax.com.br')
    expect(getAllByText('Ribeirão Preto/SP').length).toBeGreaterThan(0)
    expect(getByAltText('Imagem neutra para Angel Cáceres').getAttribute('src'))
      .toBe('/images/corretores/web/corretor-placeholder.svg')

    expect(container.querySelector('a[href^="tel:"]')).toBeNull()
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull()
    expect(container.querySelector('[data-lucide="phone"]')).toBeNull()
    expect(container.querySelector('[data-lucide="mail"]')).toBeNull()

    fireEvent.change(mobileSelector, { target: { value: 'PA' } })
    expect(getByRole('heading', { name: 'Pará' })).not.toBeNull()
    expect(getByText('Bruno Ribeiro Lopes')).not.toBeNull()
    expect(getByText('Belém/PA')).not.toBeNull()
    expect(getByAltText('Foto de Bruno Ribeiro Lopes').getAttribute('src'))
      .toBe('/images/corretores/web/bruno-ribeiro-lopes.webp')

    const brunoWhatsApp = getByRole('link', {
      name: 'Falar no WhatsApp institucional sobre Bruno Ribeiro Lopes, de Belém/PA',
    }) as HTMLAnchorElement
    const brunoUrl = new URL(brunoWhatsApp.href)
    expect(`${brunoUrl.origin}${brunoUrl.pathname}`).toBe('https://wa.me/5511915051212')
    expect(brunoUrl.searchParams.get('text')).toBe(
      'Gostaria de entrar em contato com o corretor Bruno Ribeiro Lopes, de Belém/PA.',
    )
    expect(brunoWhatsApp.href).not.toContain('corretor.phoneHref')
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

  it('substitui Áreas de Atuação por um CTA para o topo de Nossos Serviços', () => {
    const { container, getByRole, queryByRole, queryByText } = render(
      <MemoryRouter>
        <Contato />
      </MemoryRouter>,
    )

    expect(queryByRole('heading', { name: /Área de Atuação/i })).toBeNull()
    expect(queryByText(/Presença em todos os principais polos agrícolas/i)).toBeNull()

    const servicesLink = getByRole('link', { name: 'Conheça Nossos Serviços' }) as HTMLAnchorElement
    expect(servicesLink.getAttribute('href')).toBe('/servicos')
    expect(container.querySelector('[data-section="contato-areas"]')).toBeNull()
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

  it('mantém as rotas de Fazendas no dataset, mas oculta seus links no menu e no footer', () => {
    const farmsLink = NAV_LINKS.find(link => link.label === 'Fazendas')

    expect(farmsLink?.children).toEqual([
      { label: 'Fazenda Itapirapuã', to: '/fazendas/itapirapua' },
    ])

    const { container, getByRole } = render(
      <MemoryRouter>
        <Layout><p>Conteúdo</p></Layout>
      </MemoryRouter>,
    )

    expect(container.querySelector('a[href="/fazendas"]')).toBeNull()
    expect(container.querySelector('a[href="/fazendas/itapirapua"]')).toBeNull()

    fireEvent.click(getByRole('button', { name: 'Abrir menu' }))
    expect(container.querySelector('#mobile-navigation a[href="/fazendas"]')).toBeNull()
    expect(container.querySelector('#mobile-navigation a[href="/fazendas/itapirapua"]')).toBeNull()
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
      value: () => {
        const animationOffset = rafId < 10 ? 20 : 0
        const top = targetAbsoluteTop + animationOffset - currentScrollY

        return {
          top,
          bottom: top + 100,
          left: 0,
          right: 100,
          width: 100,
          height: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        }
      },
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
