import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

/* @section: farms-hero */
function FarmsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-dark-blue px-6 py-24 text-white sm:py-28 lg:py-32">
      <img
        src="/images/fazenda-santa-helena/hero.jpg"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dark-blue via-dark-blue/90 to-dark-blue/45" />
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f1c58c]">Portfólio REMAX Agro</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          Fazendas selecionadas para decisões de longo prazo.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          Conheça os ativos rurais apresentados pela REMAX Agro e acesse informações organizadas para uma primeira análise da oportunidade.
        </p>
      </div>
    </section>
  )
}

/* @section: farms-portfolio */
function FarmsPortfolio() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bridge-red">Propriedade em destaque</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-dark-blue sm:text-5xl">
              Um ativo rural para conhecer em profundidade.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#657187]">
            Disponibilidade, valores e informações comerciais estão sujeitos à confirmação durante o atendimento especializado.
          </p>
        </div>

        <article className="mt-10 overflow-hidden rounded-[28px] border border-dark-blue/10 bg-[#fffdf9] shadow-xl">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <Link
              to="/fazendas/santa-helena"
              className="group relative min-h-[420px] overflow-hidden bg-dark-blue lg:min-h-[620px]"
              aria-label="Conhecer a Fazenda Santa Helena"
            >
              <img
                src="/images/fazenda-santa-helena/hero.jpg"
                alt="Vista aérea da Fazenda Santa Helena ao entardecer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-dark-blue/95 via-dark-blue/15 to-transparent" />
              <span className="absolute bottom-7 left-6 right-6 text-white sm:bottom-10 sm:left-10 sm:right-10">
                <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#f1c58c]">
                  Código REMAX AG · SH-0426 · Exclusividade
                </span>
                <span className="mt-4 block font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
                  Fazenda Santa Helena
                </span>
              </span>
            </Link>

            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-bridge-red">
                  <MapPin size={17} aria-hidden="true" /> Ribeirão Preto · SP
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight text-dark-blue sm:text-4xl">
                  Escala produtiva, estrutura operacional e potencial de expansão.
                </h3>
                <p className="mt-5 text-base leading-relaxed text-[#657187]">
                  Propriedade rural com 1.840 hectares totais e operação agrícola combinada à pecuária.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-4">
                  <div className="border-t border-dark-blue/15 pt-4">
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[#657187]">Área total</dt>
                    <dd className="mt-2 text-xl font-bold text-dark-blue">1.840 ha</dd>
                  </div>
                  <div className="border-t border-dark-blue/15 pt-4">
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[#657187]">Operação</dt>
                    <dd className="mt-2 text-xl font-bold text-dark-blue">Agrícola + pecuária</dd>
                  </div>
                </dl>

                <p className="mt-8 flex items-start gap-3 rounded-xl bg-dark-blue/[0.05] p-4 text-sm leading-relaxed text-[#657187]">
                  <ShieldCheck className="mt-0.5 shrink-0 text-bridge-red" size={19} aria-hidden="true" />
                  Consulte a página da propriedade para visualizar o resumo executivo, a galeria e solicitar o dossiê.
                </p>
              </div>

              <Link
                to="/fazendas/santa-helena"
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-dark-blue px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-bridge-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
              >
                Conhecer a propriedade <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

/* @section: farms-contact */
function FarmsContact() {
  return (
    <section className="bg-off-white px-6 pb-24 pt-4">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-[24px] bg-dark-blue px-7 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:px-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f1c58c]">Busca personalizada</p>
          <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
            Procura uma propriedade com outro perfil?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Nossa equipe pode entender seus critérios e conduzir uma busca estratégica de imóveis rurais.
          </p>
        </div>
        <Link
          to="/contato"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-bridge-red px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue"
        >
          Fale com um especialista <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default function Fazendas() {
  return (
    <div className="bg-[#f7f4ee]">
      <FarmsHero />
      <FarmsPortfolio />
      <FarmsContact />
    </div>
  )
}
