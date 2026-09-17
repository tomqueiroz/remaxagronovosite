import { useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import LeadForm from '@/components/LeadForm'

const galleryImages = [
  {
    src: '/images/fazenda-itapirapua/itapirapua-01.webp',
    alt: 'Vista aérea de curral, cercas e estruturas rurais',
    label: 'Infraestrutura rural',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-02.webp',
    alt: 'Vista aérea ampla de área rural com vegetação e áreas abertas',
    label: 'Contexto territorial',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-03.webp',
    alt: 'Paisagem rural ao entardecer',
    label: 'Paisagem rural',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-04.webp',
    alt: 'Máquina agrícola trabalhando em área de cultivo',
    label: 'Operação agrícola',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-05.webp',
    alt: 'Colheita mecanizada em área agrícola',
    label: 'Produção rural',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-06.webp',
    alt: 'Paisagem de vale em região rural',
    label: 'Território',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-07.webp',
    alt: 'Manejo de gado em ambiente rural',
    label: 'Pecuária',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-08.webp',
    alt: 'Rebanho em área de pastagem',
    label: 'Pastagem',
  },
  {
    src: '/images/fazenda-itapirapua/itapirapua-09.webp',
    alt: 'Cerca e paisagem de propriedade rural',
    label: 'Estrutura de campo',
  },
]

const propertyRows = [
  { label: 'Área total', value: '230 hectares' },
  { label: 'Área consolidada', value: '170 hectares' },
  { label: 'Atividade atual', value: 'Pastagem — 135 ha, mais de 10 divisões' },
  { label: 'Altitude média', value: '450 metros' },
  { label: 'Pluviosidade média', value: '1.500 mm/ano' },
  { label: 'Perfil de relevo', value: 'Ondulado' },
  { label: 'Perfil de solo', value: 'Não informado no dossiê' },
  {
    label: 'Infraestrutura e recursos',
    value: 'Casa sede, casa para funcionários, depósito, curral, cercas, energia monofásica, poço artesiano e represas',
  },
]

const profileOptions = [
  { value: 'fazendeiro-interessado', label: 'Eu sou fazendeiro interessado' },
  { value: 'corretor', label: 'Eu sou corretor' },
  { value: 'investidor-agro', label: 'Eu sou investidor no agro' },
]

/* @section: farm-introduction */
function FarmIntroduction() {
  return (
    <section className="bg-dark-blue px-4 pb-14 pt-12 text-white sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-end lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-xs">
            <span className="inline-flex items-center gap-2 text-white">
              <MapPin size={14} className="text-bridge-red" aria-hidden="true" />
              Itapirapuã · Goiás
            </span>
            <span className="h-4 w-px bg-white/25" aria-hidden="true" />
            <span>Propriedade rural à venda</span>
          </div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[#e39aa2]">Fazendas REMAX Agro</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.05] text-white md:text-6xl lg:text-7xl">
            Fazenda Itapirapuã
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg">
            Ativo rural com área consolidada, infraestrutura operacional instalada e atividade atual de pastagem em Itapirapuã, Goiás.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.055] p-5 shadow-2xl sm:p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Valor de venda</span>
          <strong className="mt-3 block font-black text-3xl text-white sm:text-4xl">R$ 4.600.000,00</strong>
          <p className="mt-2 text-xs leading-relaxed text-white/55">Valor, disponibilidade e condições sujeitos à confirmação.</p>
          <a
            href="#contato"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-bridge-red px-5 py-4 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-dark-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue"
          >
            Solicitar informações <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: farm-carousel */
function FarmCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeImage = galleryImages[activeIndex]

  const selectImage = (index: number) => {
    setActiveIndex(index)
    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    thumbnailRefs.current[index]?.scrollIntoView?.({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  const showPrevious = () => selectImage((activeIndex - 1 + galleryImages.length) % galleryImages.length)
  const showNext = () => selectImage((activeIndex + 1) % galleryImages.length)

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-2xl bg-[#d9ddd7] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-4"
        role="group"
        aria-roledescription="carrossel"
        aria-label="Imagens da Fazenda Itapirapuã"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            showPrevious()
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            showNext()
          }
        }}
      >
        <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.53/1]">
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-full w-full object-cover"
            fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          />
        </div>
        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-dark-blue/10 bg-white/95 text-dark-blue shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red sm:left-4"
          aria-label="Mostrar imagem anterior"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-dark-blue/10 bg-white/95 text-dark-blue shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red sm:right-4"
          aria-label="Mostrar próxima imagem"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-dark-blue/80 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-white">
          {activeIndex + 1} / {galleryImages.length}
        </span>
      </div>

      <div
        className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] sm:gap-3"
        aria-label="Miniaturas da galeria"
      >
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            ref={(element) => { thumbnailRefs.current[index] = element }}
            type="button"
            onClick={() => selectImage(index)}
            className={`relative h-[70px] w-[92px] shrink-0 snap-center overflow-hidden rounded-lg border-2 bg-[#d9ddd7] transition sm:h-[82px] sm:w-[112px] ${
              activeIndex === index
                ? 'border-bridge-red shadow-sm'
                : 'border-transparent opacity-75 hover:opacity-100 focus-visible:border-bridge-red focus-visible:opacity-100'
            }`}
            aria-label={`Mostrar ${image.label.toLowerCase()}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          >
            <img src={image.src} alt="" className="h-full w-full object-cover" loading={index > 1 ? 'lazy' : 'eager'} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#778091]">
        Imagens fornecidas para apresentação comercial. Características e condições devem ser confirmadas em visita e diligência técnica.
      </p>
    </div>
  )
}

/* @section: property-facts */
function PropertyFacts() {
  return (
    <aside className="rounded-2xl border border-dark-blue/10 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
      <div className="h-[3px] w-12 bg-bridge-red" aria-hidden="true" />
      <h2 className="mt-5 font-black text-3xl leading-tight text-dark-blue">Ficha da propriedade</h2>
      <table className="mt-7 w-full border-collapse text-left">
        <caption className="sr-only">Dados documentados da Fazenda Itapirapuã</caption>
        <tbody>
          {propertyRows.map((row) => (
            <tr key={row.label} className="border-b border-dark-blue/10 last:border-b-0">
              <th scope="row" className="block pb-1 pt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#657187] sm:table-cell sm:w-[36%] sm:py-4 sm:pr-4 sm:align-top">
                {row.label}
              </th>
              <td className="block pb-4 text-sm font-medium leading-relaxed text-dark-blue sm:table-cell sm:py-4 sm:align-top">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 rounded-xl bg-[#f5f7fa] p-4 text-xs leading-relaxed text-[#5f697a]">
        Dados extraídos do dossiê comercial. Informações de solo, potencial produtivo, disponibilidade, valor e condições devem ser confirmadas durante a diligência técnica.
      </div>
    </aside>
  )
}

/* @section: farm-property-overview */
function FarmPropertyOverview() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[minmax(0,1.58fr)_minmax(350px,0.92fr)] lg:items-start lg:gap-8">
        <FarmCarousel />
        <PropertyFacts />
      </div>
    </section>
  )
}

/* @section: farm-territory */
function FarmTerritory() {
  return (
    <section className="border-t border-dark-blue/10 bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <figure className="overflow-hidden rounded-2xl border border-dark-blue/10 bg-white shadow-sm">
          <img
            src="/images/fazenda-itapirapua/mapa-itapirapua.webp"
            alt="Mapa aéreo com o perímetro da Fazenda Itapirapuã destacado em amarelo"
            className="aspect-[1.19/1] h-auto w-full object-cover"
            loading="lazy"
          />
          <figcaption className="border-t border-dark-blue/10 px-4 py-3 text-xs leading-relaxed text-[#657187]">
            Base cartográfica indicada no dossiê: BASEMAP (ESRI) / SICAR.
          </figcaption>
        </figure>

        <div>
          <div className="h-[3px] w-12 bg-bridge-red" aria-hidden="true" />
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-bridge-red">Território e contexto</p>
          <h2 className="mt-3 text-4xl font-black leading-[1.05] text-dark-blue md:text-5xl">
            Itapirapuã e o contexto agropecuário regional.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-[#5f697a]">
            <p>
              Localizada em Itapirapuã, Goiás, a propriedade reúne 230 hectares, dos quais 170 hectares correspondem à área consolidada. O dossiê registra altitude média de 450 metros, pluviosidade média anual de 1.500 mm e relevo ondulado.
            </p>
            <p>
              A operação atual é de pastagem, com 135 hectares distribuídos em mais de 10 divisões. A estrutura documentada inclui casa sede, casa para funcionários, depósito, curral, cercas, energia elétrica monofásica, poço artesiano e represas.
            </p>
            <p>
              A REMAX Agro conduz a aproximação comercial e apoia a organização das informações para a diligência do ativo. Análises de solo, potencial produtivo e eventuais alternativas de uso dependem de avaliação técnica específica.
            </p>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#cddbec] bg-[#edf4fc] p-5 text-sm leading-relaxed text-dark-blue">
            <ShieldCheck className="mt-0.5 shrink-0 text-bridge-red" size={19} aria-hidden="true" />
            <p><strong>Próxima etapa recomendada:</strong> solicitação do material técnico completo, visita programada e validação de solo, aptidão, água, matrícula e condições operacionais.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: farm-lead-capture */
function FarmLeadCapture() {
  return (
    <section id="contato" className="scroll-mt-20 bg-dark-blue px-4 py-16 text-white sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">
        <div className="lg:pt-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e39aa2]">Atendimento REMAX Agro</p>
          <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.05] text-white md:text-5xl">
            Receba o dossiê completo da Fazenda Itapirapuã.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65">
            Informe seu interesse para conversar com um especialista, receber documentação comercial e organizar os próximos passos de visita e diligência.
          </p>
          <div className="mt-9 grid gap-4 text-sm text-white/65">
            <span className="flex items-center gap-3"><FileText size={18} className="shrink-0 text-[#e39aa2]" aria-hidden="true" /> Materiais técnicos sob demanda</span>
            <span className="flex items-center gap-3"><ShieldCheck size={18} className="shrink-0 text-[#e39aa2]" aria-hidden="true" /> Atendimento confidencial e consultivo</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.055] p-5 shadow-2xl sm:p-8">
          <LeadForm
            source="fazenda-itapirapua"
            title="Fale sobre esta fazenda"
            subtitle="Nossa equipe entrará em contato para apresentar os detalhes do ativo."
            profileLabel="PERFIL"
            profileOptions={profileOptions}
          />
        </div>
      </div>
    </section>
  )
}

export default function FazendaItapirapua() {
  return (
    <div className="overflow-x-clip bg-[#f7f4ee]">
      <FarmIntroduction />
      <FarmPropertyOverview />
      <FarmTerritory />
      <FarmLeadCapture />
    </div>
  )
}
