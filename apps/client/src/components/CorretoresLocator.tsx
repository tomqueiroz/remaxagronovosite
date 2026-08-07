import { useMemo, useState, type KeyboardEvent } from 'react'
import brazilMap from '@svg-country-maps/brazil'
import { Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  BRAZIL_STATES,
  CORRETORES_BY_STATE,
  CORRETOR_PLACEHOLDER,
  COVERED_STATES,
  type Corretor,
} from '@/data/corretores'

const DEFAULT_STATE = 'SP'

const STATE_LABELS: Record<string, { x: number; y: number }> = {
  AC: { x: 47, y: 221 }, AL: { x: 574, y: 229 }, AP: { x: 342, y: 76 },
  AM: { x: 204, y: 150 }, BA: { x: 496, y: 287 }, CE: { x: 554, y: 170 },
  DF: { x: 420, y: 327 }, ES: { x: 527, y: 378 }, GO: { x: 398, y: 326 },
  MA: { x: 474, y: 178 }, MT: { x: 317, y: 309 }, MS: { x: 337, y: 405 },
  MG: { x: 466, y: 370 }, PA: { x: 371, y: 174 }, PB: { x: 584, y: 197 },
  PR: { x: 393, y: 468 }, PE: { x: 560, y: 216 }, PI: { x: 507, y: 214 },
  RJ: { x: 492, y: 423 }, RN: { x: 585, y: 174 }, RS: { x: 368, y: 556 },
  RO: { x: 191, y: 294 }, RR: { x: 222, y: 65 }, SC: { x: 416, y: 509 },
  SP: { x: 432, y: 424 }, SE: { x: 559, y: 251 }, TO: { x: 442, y: 255 },
}

function getStateName(uf: string) {
  return BRAZIL_STATES.find((state) => state.uf === uf)?.name ?? uf
}

function getWhatsAppUrl(phoneHref: string) {
  return `https://wa.me/${phoneHref.replace(/\D/g, '')}`
}

function CorretorCard({ corretor }: { corretor: Corretor }) {
  const hasPhoto = Boolean(corretor.photo)

  return (
    <article className="grid grid-cols-[88px_minmax(0,1fr)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative min-h-[132px] bg-gray-100">
        <img
          src={corretor.photo ?? CORRETOR_PLACEHOLDER}
          alt={hasPhoto ? `Foto de ${corretor.name}` : `Imagem ilustrativa para ${corretor.name}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 p-3.5">
        <h4 className="text-sm font-black leading-tight text-dark-blue">{corretor.name}</h4>
        <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-gray-500">
          <MapPin size={13} className="mt-0.5 shrink-0 text-bridge-red" aria-hidden="true" />
          <span>{corretor.city}</span>
        </p>
        <div className="mt-3 space-y-1.5">
          <a
            href={`tel:${corretor.phoneHref}`}
            className="flex min-h-8 items-center gap-2 text-xs font-semibold text-gray-600 transition-colors hover:text-bridge-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
            aria-label={`Ligar para ${corretor.name}: ${corretor.phone}`}
          >
            <Phone size={13} aria-hidden="true" />
            <span>{corretor.phone}</span>
          </a>
          <a
            href={`mailto:${corretor.email}`}
            className="flex min-h-8 min-w-0 items-center gap-2 text-xs font-semibold text-gray-600 transition-colors hover:text-bridge-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
            aria-label={`Enviar e-mail para ${corretor.name}`}
          >
            <Mail size={13} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{corretor.email}</span>
          </a>
        </div>
        <a
          href={getWhatsAppUrl(corretor.phoneHref)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-9 items-center justify-center gap-1.5 rounded bg-bridge-red px-3 text-[11px] font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
          aria-label={`Conversar com ${corretor.name} pelo WhatsApp`}
        >
          <FaWhatsapp size={13} aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </article>
  )
}

export default function CorretoresLocator() {
  const [selectedState, setSelectedState] = useState(DEFAULT_STATE)
  const [previewState, setPreviewState] = useState<string | null>(null)
  const activeState = previewState ?? selectedState
  const activeCorretores = CORRETORES_BY_STATE[activeState] ?? []
  const selectedName = getStateName(activeState)

  const locations = useMemo(
    () => brazilMap.locations.map((location) => ({ ...location, uf: location.id.toUpperCase() })),
    [],
  )

  const selectState = (uf: string) => {
    setSelectedState(uf)
    setPreviewState(null)
  }

  const handleStateKeyDown = (event: KeyboardEvent<SVGPathElement>, uf: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectState(uf)
    }
  }

  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200 bg-off-white shadow-sm">
      {/* @section: corretores-locator-heading */}
      <div className="border-b border-gray-200 bg-white px-6 py-8 text-center md:px-10">
        <MapPin size={34} className="mx-auto mb-4 text-bridge-red" aria-hidden="true" />
        <h3 className="text-2xl font-black text-dark-blue md:text-3xl">Encontre um especialista por estado</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
          Explore o mapa ou escolha uma unidade federativa para conhecer todos os corretores REMAX Agro disponíveis na região.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-gray-500">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-bridge-red" />15 estados com especialistas</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-gray-300 bg-gray-100" />12 estados sem cadastro atual</span>
        </div>
      </div>

      {/* @section: corretores-state-selector-mobile */}
      <div className="border-b border-gray-200 bg-white p-5 lg:hidden">
        <label htmlFor="corretores-state-mobile" className="mb-2 block text-xs font-black uppercase tracking-widest text-dark-blue">
          Selecione o estado
        </label>
        <select
          id="corretores-state-mobile"
          value={selectedState}
          onChange={(event) => selectState(event.target.value)}
          className="min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base font-semibold text-gray-700 outline-none focus:border-bridge-red focus:ring-2 focus:ring-bridge-red/20"
        >
          {BRAZIL_STATES.map((state) => {
            const count = CORRETORES_BY_STATE[state.uf]?.length ?? 0
            return <option key={state.uf} value={state.uf}>{state.name} ({state.uf}) — {count || 'sem'} {count === 1 ? 'corretor' : 'corretores'}</option>
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        {/* @section: interactive-brazil-map */}
        <div className="flex min-h-[420px] items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4 sm:p-8 lg:min-h-[660px] lg:border-r lg:border-gray-200">
          <svg
            viewBox={brazilMap.viewBox}
            className="h-auto max-h-[590px] w-full max-w-[570px]"
            role="group"
            aria-label="Mapa interativo do Brasil. Use Tab para navegar entre os estados e Enter ou Espaço para selecionar."
          >
            {locations.map((location) => {
              const uf = location.uf
              const isCovered = COVERED_STATES.has(uf)
              const isActive = activeState === uf
              const label = STATE_LABELS[uf]
              const count = CORRETORES_BY_STATE[uf]?.length ?? 0
              return (
                <g key={location.id}>
                  <path
                    d={location.path}
                    role="button"
                    tabIndex={0}
                    aria-label={`${location.name}: ${count ? `${count} ${count === 1 ? 'corretor' : 'corretores'}` : 'nenhum corretor cadastrado'}`}
                    aria-pressed={selectedState === uf}
                    onMouseEnter={() => setPreviewState(uf)}
                    onMouseLeave={() => setPreviewState(null)}
                    onFocus={() => setPreviewState(uf)}
                    onBlur={() => setPreviewState(null)}
                    onClick={() => selectState(uf)}
                    onKeyDown={(event) => handleStateKeyDown(event, uf)}
                    className="cursor-pointer stroke-white stroke-[1.8] transition-all duration-150 focus:outline-none focus-visible:stroke-dark-blue focus-visible:stroke-[4]"
                    fill={isActive ? '#000e35' : isCovered ? '#aa1120' : '#dfe4e9'}
                  >
                    <title>{location.name} — {count ? `${count} ${count === 1 ? 'corretor' : 'corretores'}` : 'sem corretor cadastrado'}</title>
                  </path>
                  {label && (
                    <text
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none select-none text-[11px] font-black"
                      fill={isActive || isCovered ? '#ffffff' : '#51606f'}
                      aria-hidden="true"
                    >
                      {uf}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* @section: corretores-state-results */}
        <div className="min-w-0 bg-white">
          <div className="hidden border-b border-gray-200 p-6 lg:block">
            <label htmlFor="corretores-state-desktop" className="mb-2 block text-xs font-black uppercase tracking-widest text-dark-blue">
              Estado ativo
            </label>
            <select
              id="corretores-state-desktop"
              value={selectedState}
              onChange={(event) => selectState(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 outline-none focus:border-bridge-red focus:ring-2 focus:ring-bridge-red/20"
            >
              {BRAZIL_STATES.map((state) => {
                const count = CORRETORES_BY_STATE[state.uf]?.length ?? 0
                return <option key={state.uf} value={state.uf}>{state.name} ({state.uf}) — {count || 'sem'} {count === 1 ? 'corretor' : 'corretores'}</option>
              })}
            </select>
            <div className="mt-4 flex max-h-28 flex-wrap gap-2 overflow-y-auto pr-1" aria-label="Lista rápida de estados">
              {BRAZIL_STATES.map((state) => {
                const count = CORRETORES_BY_STATE[state.uf]?.length ?? 0
                const active = activeState === state.uf
                return (
                  <button
                    key={state.uf}
                    type="button"
                    onMouseEnter={() => setPreviewState(state.uf)}
                    onMouseLeave={() => setPreviewState(null)}
                    onFocus={() => setPreviewState(state.uf)}
                    onBlur={() => setPreviewState(null)}
                    onClick={() => selectState(state.uf)}
                    aria-pressed={active}
                    className={`min-h-9 rounded-md border px-2.5 text-xs font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2 ${active ? 'border-dark-blue bg-dark-blue text-white' : count ? 'border-bridge-red/30 bg-red-50 text-bridge-red hover:bg-red-100' : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    {state.uf}{count ? ` · ${count}` : ''}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-b border-gray-200 px-5 py-5 sm:px-6" aria-live="polite" aria-atomic="true">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-bridge-red">{activeState}</p>
                <h4 className="mt-1 text-2xl font-black text-dark-blue">{selectedName}</h4>
              </div>
              <p className="text-sm font-bold text-gray-500">
                {activeCorretores.length} {activeCorretores.length === 1 ? 'especialista' : 'especialistas'}
              </p>
            </div>
          </div>

          <div className="max-h-[620px] overflow-y-auto p-5 sm:p-6" tabIndex={activeCorretores.length > 5 ? 0 : undefined} aria-label={`Corretores em ${selectedName}`}>
            {activeCorretores.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {activeCorretores.map((corretor) => <CorretorCard key={corretor.id} corretor={corretor} />)}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
                <UserRound size={38} className="mb-4 text-gray-300" aria-hidden="true" />
                <h5 className="text-lg font-black text-dark-blue">Ainda não há corretor cadastrado neste estado</h5>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                  Consulte outro estado no mapa ou fale com a REMAX Agro para direcionarmos seu atendimento à equipe mais adequada.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-6 py-3 text-center text-[11px] leading-relaxed text-gray-400">
        Geometria do mapa baseada em MapSVG, disponibilizada sob licença Creative Commons Attribution 4.0.
      </div>
    </div>
  )
}
