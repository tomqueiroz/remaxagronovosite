import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, CircleDot, Clock3, Diamond, FileText, MapPin, ShieldCheck, Sparkles, X } from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const galleryImages = [
  {
    src: '/images/fazenda-santa-helena/hero.jpg',
    alt: 'Vista aérea de lavoura e sede rural da Fazenda Santa Helena',
    label: 'Vista aérea da propriedade',
  },
  {
    src: '/images/fazenda-santa-helena/lavoura.jpg',
    alt: 'Lavoura em linhas na Fazenda Santa Helena',
    label: 'Cultivo em produção',
  },
  {
    src: '/images/fazenda-santa-helena/gado.jpg',
    alt: 'Gado em pastagem na Fazenda Santa Helena',
    label: 'Operação pecuária',
  },
  {
    src: '/images/fazenda-santa-helena/estrada.jpg',
    alt: 'Estrada rural e lavoura da Fazenda Santa Helena',
    label: 'Logística interna',
  },
]

const facts = [
  { label: 'Área consolidada', value: '1.120 ha' },
  { label: 'Pluviosidade', value: '1.420 mm' },
  { label: 'Relevo', value: 'Plano a suave' },
  { label: 'Solo', value: 'Latossolo vermelho' },
]

const foundations = [
  {
    number: '01',
    eyebrow: 'Localização',
    title: 'Logística de safra',
    text: '48 km do terminal ferroviário e 22 km de usina. Acesso interno com estradas cascalhadas e pátio de carregamento.',
  },
  {
    number: '02',
    eyebrow: 'Água & solo',
    title: 'Base produtiva',
    text: 'Nascentes protegidas, dois açudes e solo profundo de textura média, com correção acompanhada por mapas de fertilidade.',
  },
  {
    number: '03',
    eyebrow: 'Infraestrutura',
    title: 'Operação pronta',
    text: 'Sede, casas de equipe, galpão de máquinas, oficina, balança e estrutura de manejo para 1.100 cabeças.',
  },
]

const overviewStats = [
  { label: 'Área total', value: '1.840 ha', note: 'matrículas integradas' },
  { label: 'Área consolidada', value: '1.120 ha', note: 'lavoura e pastagem' },
  { label: 'Atividade atual', value: 'Soja · milho', note: '+ recria nelore' },
  { label: 'Potencial', value: '+ 380 ha', note: 'expansão mapeada' },
  { label: 'Valor', value: 'R$ 248 mi', note: 'ou sob consulta' },
  { label: 'Código', value: 'SH-0426', note: 'atendimento reservado' },
]

/* @section: farm-lightbox */
function FarmLightbox({ index, onClose, onPrevious, onNext }: {
  index: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const image = galleryImages[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus()
    }
  }, [onClose, onNext, onPrevious])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-dark-blue/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria da Fazenda Santa Helena: ${image.alt}`}
      onClick={onClose}
    >
      <div ref={dialogRef} className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={event => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Fechar galeria"
        >
          <X size={22} />
        </button>
        <button
          type="button"
          onClick={onPrevious}
          className="absolute left-0 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={28} />
        </button>
        <figure className="flex max-h-full max-w-[calc(100%-96px)] flex-col items-center gap-4">
          <img src={image.src} alt={image.alt} className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl" />
          <figcaption className="text-center text-sm uppercase tracking-[0.18em] text-white/70">{image.label}</figcaption>
        </figure>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-0 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}

/* @section: farm-hero */
function FarmHero({ onOpenGallery }: { onOpenGallery: () => void }) {
  return (
    <section className="bg-[#f7f4ee] px-4 pb-14 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-12">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.82fr)] lg:gap-8">
        <div className="relative min-h-[540px] overflow-hidden rounded-[28px] bg-dark-blue shadow-2xl lg:min-h-[680px]">
          <img src="/images/fazenda-santa-helena/hero.jpg" alt="Vista aérea da Fazenda Santa Helena ao entardecer" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/95 via-dark-blue/15 to-dark-blue/10" />
          <button
            type="button"
            onClick={onOpenGallery}
            className="absolute right-5 top-5 rounded-full border border-dark-blue/60 bg-white/95 px-4 py-3 text-sm font-bold text-dark-blue shadow-lg transition-colors hover:bg-white sm:right-7 sm:top-7"
          >
            Ver galeria <span className="text-bridge-red">· {galleryImages.length} imagens</span>
          </button>
          <div className="absolute bottom-8 left-6 right-6 text-white sm:bottom-12 sm:left-10 sm:right-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#f1c58c]">Código REMAX AG · SH-0426 · Exclusividade</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">Fazenda Santa Helena</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/85 sm:text-base">
              <span className="inline-flex items-center gap-2 font-semibold"><MapPin size={16} className="text-[#f1c58c]" /> Ribeirão Preto · SP</span>
              <span aria-hidden="true">•</span>
              <span>1.840 ha totais</span>
              <span aria-hidden="true">•</span>
              <span>Operação agrícola + pecuária</span>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="rounded-[22px] border border-dark-blue/10 bg-[#fffdf9] p-6 shadow-xl sm:p-8">
            <h2 className="font-serif text-3xl leading-tight text-dark-blue sm:text-4xl">Escala para produzir. Estrutura para crescer.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#657187]">Um ativo rural completo, com logística privilegiada e múltiplas teses de expansão para quem pensa o agro como negócio de longo prazo.</p>
            <div className="mt-7 border-t border-[#dde3ea] pt-6">
              <div className="font-serif text-4xl font-bold text-dark-blue sm:text-5xl">R$ 248.000.000</div>
              <p className="mt-2 text-xs font-semibold text-[#657187]">valor de venda · sujeito à confirmação</p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6">
              {facts.map(fact => (
                <div key={fact.label} className="border-t border-[#dde3ea] pt-3">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#657187]">{fact.label}</span>
                  <strong className="mt-2 block text-base text-dark-blue sm:text-lg">{fact.value}</strong>
                </div>
              ))}
            </div>
            <a href="#contato" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-dark-blue px-5 py-4 text-center text-sm font-bold text-white transition-colors hover:bg-bridge-blue">
              Receber dossiê da propriedade <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { icon: <Sparkles size={20} strokeWidth={1.8} aria-hidden="true" />, title: 'Exclusiva REMAX Agro', text: 'Curadoria e posicionamento' },
              { icon: <Diamond size={20} strokeWidth={1.8} aria-hidden="true" />, title: 'Documentação pré-analisada', text: 'Mais segurança na decisão' },
              { icon: <CircleDot size={20} strokeWidth={1.8} aria-hidden="true" />, title: 'Especialista no agro', text: 'Atendimento consultivo' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl bg-dark-blue p-5 text-white">
                <span className="block text-[#f1c58c]">{item.icon}</span>
                <strong className="mt-4 block text-sm leading-tight">{item.title}</strong>
                <span className="mt-2 block text-xs leading-relaxed text-[#b9c9db]">{item.text}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

/* @section: farm-overview */
function FarmOverview() {
  return (
    <section id="imovel" className="scroll-mt-20 bg-[#f7f4ee] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-bridge-red">Leitura executiva</span>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-dark-blue sm:text-5xl lg:text-6xl">Um imóvel que combina operação, escala e opcionalidade.</h2>
          </div>
          <div className="text-base leading-relaxed text-[#657187] sm:text-lg">
            <p>Informação objetiva para você entender rapidamente o ativo — e decidir se vale aprofundar a conversa com um especialista REMAX Agro.</p>
            <p className="mt-5">A Santa Helena está inserida em um dos principais corredores agroindustriais do estado de São Paulo, com acesso pavimentado, disponibilidade hídrica e vocação comprovada para grãos, cana e recria de gado nelore.</p>
            <p className="mt-5">A configuração atual permite continuidade operacional desde o primeiro dia, enquanto a área de expansão abre espaço para ganho de produtividade, integração lavoura-pecuária e valorização patrimonial.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <blockquote className="self-start border-l-4 border-bridge-red py-2 pl-6 font-serif text-2xl leading-snug text-dark-blue sm:text-3xl">
            “Mais do que hectares: uma plataforma rural pronta para a próxima decisão de capital.”
          </blockquote>
          <div className="grid gap-4 sm:grid-cols-2">
            {overviewStats.map(item => (
              <article key={item.label} className="rounded-2xl border border-dark-blue/10 bg-[#fffdf9] p-6">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#657187]">{item.label}</span>
                <strong className="mt-3 block font-serif text-3xl text-dark-blue">{item.value}</strong>
                <span className="mt-2 block text-sm text-[#657187]">{item.note}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: farm-foundations */
function FarmFoundations() {
  return (
    <section id="estrutura" className="scroll-mt-20 bg-dark-blue px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f1c58c]">Tese do ativo</span>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">Os fundamentos que sustentam o negócio.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#bcc9d8]">Uma visão resumida dos elementos que impactam produtividade, risco e potencial de valorização.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {foundations.map(item => (
            <article key={item.number} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-7">
              <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#f1c58c]">{item.number} / {item.eyebrow}</span>
              <h3 className="mt-8 font-serif text-2xl leading-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#c6d3e1]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* @section: farm-gallery */
function FarmGallery({ onOpenGallery }: { onOpenGallery: (index: number) => void }) {
  return (
    <section id="galeria" className="scroll-mt-20 bg-[#f7f4ee] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-bridge-red">Imagens do ativo</span>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-dark-blue sm:text-5xl">Veja a propriedade em contexto.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#657187]">Galeria editorial para avaliar escala, topografia, operação e paisagem antes do contato.</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-[1.35fr_0.65fr] md:grid-rows-2">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => onOpenGallery(index)}
              className={`group relative min-h-[230px] overflow-hidden rounded-2xl text-left ${index === 0 ? 'md:row-span-2 md:min-h-[520px]' : ''}`}
              aria-label={`Abrir imagem: ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-dark-blue/75 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">{image.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* @section: farm-contact */
function FarmContact() {
  return (
    <section id="contato" className="scroll-mt-20 bg-[#f7f4ee] px-4 pb-20 pt-4 sm:px-6 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="rounded-[22px] bg-dark-blue p-7 text-white sm:p-9">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f1c58c]">Próximo passo</span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-5xl">Conheça os detalhes que não cabem em um anúncio.</h2>
          <p className="mt-5 text-sm leading-relaxed text-[#c6d3e1]">O atendimento começa depois que você entende o imóvel. Nossa equipe prepara o recorte certo para o seu perfil de investimento.</p>
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="font-serif text-2xl">Converse com quem conhece o ativo e o agro.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c6d3e1]">Receba o dossiê, confirme disponibilidade e agende uma conversa reservada com um corretor especializado REMAX Agro.</p>
            <div className="mt-7 grid gap-3 text-sm text-[#c6d3e1]">
              <span className="flex items-center gap-3"><Clock3 size={17} className="shrink-0 text-[#f1c58c]" aria-hidden="true" /> Resposta em até 24 horas úteis</span>
              <span className="flex items-center gap-3"><ShieldCheck size={17} className="shrink-0 text-[#f1c58c]" aria-hidden="true" /> Atendimento confidencial e consultivo</span>
              <span className="flex items-center gap-3"><FileText size={17} className="shrink-0 text-[#f1c58c]" aria-hidden="true" /> Materiais técnicos sob demanda</span>
            </div>
          </div>
        </div>
        <div className="rounded-[22px] border border-[#dde3ea] bg-[#fffdf9] p-6 shadow-xl sm:p-9">
          <LeadForm
            source="fazenda-santa-helena"
            title="Solicitar contato de especialista"
            subtitle="Preencha seus dados para receber o próximo passo sobre a Fazenda Santa Helena."
            light
          />
        </div>
      </div>
    </section>
  )
}

export default function FazendaSantaHelena() {
  const [activeImage, setActiveImage] = useState<number | null>(null)

  const closeGallery = () => setActiveImage(null)
  const showPrevious = () => setActiveImage(current => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length)
  const showNext = () => setActiveImage(current => current === null ? null : (current + 1) % galleryImages.length)

  return (
    <div className="bg-[#f7f4ee]">
      <FarmHero onOpenGallery={() => setActiveImage(0)} />
      <FarmOverview />
      <FarmFoundations />
      <FarmGallery onOpenGallery={setActiveImage} />
      <FarmContact />
      {activeImage !== null && (
        <FarmLightbox index={activeImage} onClose={closeGallery} onPrevious={showPrevious} onNext={showNext} />
      )}
    </div>
  )
}
