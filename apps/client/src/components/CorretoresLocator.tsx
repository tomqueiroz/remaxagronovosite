import { useCallback, useEffect, useMemo, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import brazilMap from '@svg-country-maps/brazil'
import { Mail, MapPin, Phone, UserRound, X } from 'lucide-react'
import {
  BRAZIL_STATES,
  CORRETORES_BY_STATE,
  COVERED_STATES,
  type Corretor,
} from '@/data/corretores'

const PANEL_CLOSE_DELAY = 5_000

const STATE_LABELS: Record<string, { x: number; y: number }> = {
  AC: { x: 47, y: 221 }, AL: { x: 574, y: 229 }, AP: { x: 342, y: 76 },
  AM: { x: 204, y: 150 }, BA: { x: 496, y: 287 }, CE: { x: 554, y: 170 },
  DF: { x: 423, y: 332 }, ES: { x: 527, y: 378 }, GO: { x: 398, y: 319 },
  MA: { x: 474, y: 178 }, MT: { x: 317, y: 309 }, MS: { x: 337, y: 405 },
  MG: { x: 466, y: 370 }, PA: { x: 371, y: 174 }, PB: { x: 584, y: 197 },
  PR: { x: 393, y: 468 }, PE: { x: 560, y: 216 }, PI: { x: 507, y: 214 },
  RJ: { x: 492, y: 423 }, RN: { x: 585, y: 174 }, RS: { x: 368, y: 556 },
  RO: { x: 191, y: 294 }, RR: { x: 222, y: 65 }, SC: { x: 416, y: 509 },
  SP: { x: 432, y: 424 }, SE: { x: 559, y: 251 }, TO: { x: 442, y: 255 },
}

type CorretoresLocatorProps = {
  certificationSeal?: string
}

function getStateName(uf: string) {
  return BRAZIL_STATES.find((state) => state.uf === uf)?.name ?? uf
}

/* @section: corretor-card */
function CorretorCard({ corretor }: { corretor: Corretor }) {
  return (
    <article className="grid grid-cols-[96px_minmax(0,1fr)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {corretor.photo ? (
        <div className="relative aspect-[3/4] min-h-32 bg-gray-100">
          <img
            src={corretor.photo}
            alt={`Foto de ${corretor.name}`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[3/4] min-h-32 border-r border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100" aria-hidden="true" />
      )}
      <div className="min-w-0 p-3.5">
        <h5 className="text-sm font-black leading-tight text-dark-blue">{corretor.name}</h5>
        <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-gray-500">
          <MapPin size={13} className="mt-0.5 shrink-0 text-bridge-red" aria-hidden="true" />
          <span>{corretor.city}</span>
        </p>
        <p className="mt-3 flex items-start gap-1.5 break-words text-xs leading-snug text-gray-600">
          <Phone size={13} className="mt-0.5 shrink-0 text-bridge-red" aria-hidden="true" />
          <span>{corretor.phone}</span>
        </p>
        <p className="mt-2 flex items-start gap-1.5 break-all text-xs leading-snug text-gray-600">
          <Mail size={13} className="mt-0.5 shrink-0 text-bridge-red" aria-hidden="true" />
          <span>{corretor.email}</span>
        </p>
      </div>
    </article>
  )
}

export default function CorretoresLocator({ certificationSeal }: CorretoresLocatorProps) {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelRef = useRef<HTMLElement | null>(null)

  const selectedCorretores = selectedState ? (CORRETORES_BY_STATE[selectedState] ?? []) : []
  const selectedName = selectedState ? getStateName(selectedState) : ''

  const locations = useMemo(
    () => brazilMap.locations.map((location) => ({ ...location, uf: location.id.toUpperCase() })),
    [],
  )

  const clearCloseTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const closePanel = useCallback(() => {
    clearCloseTimer()
    setIsPanelOpen(false)
  }, [clearCloseTimer])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    timeoutRef.current = setTimeout(() => {
      setIsPanelOpen(false)
      timeoutRef.current = null
    }, PANEL_CLOSE_DELAY)
  }, [clearCloseTimer])

  useEffect(() => {
    if (!isPanelOpen) {
      clearCloseTimer()
      return
    }

    scheduleClose()
    return clearCloseTimer
  }, [clearCloseTimer, isPanelOpen, scheduleClose, selectedState])

  const selectState = (uf: string) => {
    setSelectedState(uf)
    setIsPanelOpen(true)
  }

  const handleStateKeyDown = (event: KeyboardEvent<SVGPathElement>, uf: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectState(uf)
    }
  }

  const handlePanelBlur = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) scheduleClose()
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* @section: corretores-locator-heading */}
      <div className="relative border-b border-gray-200 bg-white px-5 py-6 pr-24 sm:px-7 sm:pr-32">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-bridge-red">
            <MapPin size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-bridge-red">Corretores certificados</p>
            <h3 className="mt-1 text-xl font-black leading-tight text-dark-blue sm:text-2xl">Encontre um corretor certificado perto de você</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">
              Selecione uma UF no mapa para conhecer os especialistas REMAX Agro disponíveis na região.
            </p>
          </div>
        </div>
        {certificationSeal && (
          <img
            src={certificationSeal}
            alt="Selo de corretor certificado REMAX Commercial Divisão Agro"
            className="absolute right-3 top-3 h-20 w-20 rounded-full object-contain sm:right-5 sm:top-4 sm:h-24 sm:w-24"
          />
        )}
      </div>

      {/* @section: corretores-state-selector-mobile */}
      <div className="border-b border-gray-200 bg-off-white p-4 lg:hidden">
        <label htmlFor="corretores-state-mobile" className="mb-2 block text-xs font-black uppercase tracking-widest text-dark-blue">
          Selecione o estado
        </label>
        <select
          id="corretores-state-mobile"
          value={selectedState ?? ''}
          onChange={(event) => selectState(event.target.value)}
          className="min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base font-semibold text-gray-700 outline-none focus:border-bridge-red focus:ring-2 focus:ring-bridge-red/20"
        >
          <option value="" disabled style={{ color: '#6b7280', backgroundColor: '#ffffff' }}>Escolha uma UF</option>
          {BRAZIL_STATES.map((state) => {
            const count = CORRETORES_BY_STATE[state.uf]?.length ?? 0
            return (
              <option key={state.uf} value={state.uf} style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>
                {state.name} ({state.uf}) — {count || 'sem'} {count === 1 ? 'corretor' : 'corretores'}
              </option>
            )
          })}
        </select>
      </div>

      {/* @section: interactive-brazil-map */}
      <div className="relative isolate flex min-h-[430px] items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-100 p-3 sm:min-h-[520px] sm:p-6 lg:min-h-[600px]">
        <svg
          viewBox={brazilMap.viewBox}
          className="h-auto max-h-[560px] w-full max-w-[560px]"
          role="group"
          aria-label="Mapa interativo do Brasil. Use Tab para navegar entre os estados e Enter ou Espaço para selecionar."
        >
          {/* Os polígonos precisam ser pintados antes das siglas. Quando cada texto ficava
              dentro do mesmo grupo do estado, polígonos posteriores encobriam rótulos
              próximos às divisas, especialmente DF, PR, RJ, RO e SC. */}
          <g data-map-layer="states">
            {locations.map((location) => {
              const uf = location.uf
              const isCovered = COVERED_STATES.has(uf)
              const isSelected = selectedState === uf
              const count = CORRETORES_BY_STATE[uf]?.length ?? 0
              return (
                <path
                  key={location.id}
                  d={location.path}
                  role="button"
                  tabIndex={0}
                  aria-label={`${location.name}: ${count ? `${count} ${count === 1 ? 'corretor' : 'corretores'}` : 'nenhum corretor cadastrado'}`}
                  aria-pressed={isSelected}
                  aria-controls="corretores-state-panel"
                  aria-expanded={isSelected && isPanelOpen}
                  onClick={() => selectState(uf)}
                  onKeyDown={(event) => handleStateKeyDown(event, uf)}
                  className="cursor-pointer stroke-white stroke-[1.8] transition-all duration-150 focus:outline-none focus-visible:stroke-dark-blue focus-visible:stroke-[4]"
                  fill={isSelected ? '#000e35' : isCovered ? '#aa1120' : '#dfe4e9'}
                >
                  <title>{location.name} — {count ? `${count} ${count === 1 ? 'corretor' : 'corretores'}` : 'sem corretor cadastrado'}</title>
                </path>
              )
            })}
          </g>
          <g data-map-layer="labels" aria-hidden="true">
            {locations.map((location) => {
              const uf = location.uf
              const label = STATE_LABELS[uf]
              const hasDarkFill = selectedState === uf || COVERED_STATES.has(uf)
              if (!label) return null

              return (
                <text
                  key={uf}
                  data-state-label={uf}
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none text-[12px] font-black"
                  fill={hasDarkFill ? '#ffffff' : '#3f4d5a'}
                  stroke={hasDarkFill ? '#000e35' : '#ffffff'}
                  strokeWidth="2.4"
                  paintOrder="stroke"
                >
                  {uf}
                </text>
              )
            })}
          </g>
        </svg>

        {/* @section: corretores-floating-panel */}
        {selectedState && isPanelOpen && (
          <section
            ref={panelRef}
            id="corretores-state-panel"
            aria-labelledby="corretores-panel-title"
            className="absolute inset-x-3 bottom-3 top-3 z-20 flex max-w-[390px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/98 shadow-2xl backdrop-blur-sm sm:inset-x-auto sm:left-4 sm:w-[360px] lg:left-5"
            tabIndex={-1}
            onPointerEnter={clearCloseTimer}
            onPointerLeave={scheduleClose}
            onPointerDown={clearCloseTimer}
            onPointerUp={scheduleClose}
            onTouchStart={clearCloseTimer}
            onTouchEnd={scheduleClose}
            onWheel={scheduleClose}
            onKeyDown={scheduleClose}
            onFocusCapture={clearCloseTimer}
            onBlurCapture={handlePanelBlur}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div aria-live="polite" aria-atomic="true">
                <p className="text-xs font-black uppercase tracking-widest text-bridge-red">{selectedState}</p>
                <h4 id="corretores-panel-title" className="mt-1 text-xl font-black text-dark-blue">{selectedName}</h4>
                <p className="mt-1 text-xs font-bold text-gray-500">
                  {selectedCorretores.length} {selectedCorretores.length === 1 ? 'especialista certificado' : 'especialistas certificados'}
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-bridge-red hover:text-bridge-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
                aria-label={`Fechar painel de corretores em ${selectedName}`}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4"
              aria-label={`Corretores em ${selectedName}`}
              onScroll={scheduleClose}
            >
              {selectedCorretores.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {selectedCorretores.map((corretor) => <CorretorCard key={corretor.id} corretor={corretor} />)}
                </div>
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center">
                  <UserRound size={38} className="mb-4 text-gray-300" aria-hidden="true" />
                  <h5 className="text-base font-black text-dark-blue">Ainda não há corretor cadastrado neste estado</h5>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Selecione outra UF ou fale com a REMAX Agro para direcionarmos seu atendimento.
                  </p>
                </div>
              )}
            </div>
            <p className="border-t border-gray-100 px-5 py-2.5 text-[10px] leading-relaxed text-gray-400">
              O painel fecha após 5 segundos sem interação. Mova o cursor, role, toque ou use o teclado para mantê-lo aberto.
            </p>
          </section>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white px-5 py-3 text-center text-[10px] leading-relaxed text-gray-400">
        Geometria do mapa baseada em MapSVG, disponibilizada sob licença Creative Commons Attribution 4.0.
      </div>
    </div>
  )
}
