import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { ASSETS, STATS } from '@/data'

/* ─── useCountUp hook ─────────────────────────────────────────────────────── */
function useCountUp(end: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, active])
  return count
}

/* ─── AnimatedStat ───────────────────────────────────────────────────────── */
function AnimatedStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 2000, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const formatted = count >= 1000 ? count.toLocaleString('pt-BR') : count.toString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-off-white rounded-lg p-5 border-accent-top"
    >
      <div className="text-3xl font-black text-dark-blue mb-1">
        {formatted}{suffix}
      </div>
      <div className="text-gray-500 text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  )
}

/* @section: about-hero — altura dobrada: min-h-screen, layout profissional centrado */
function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroSoilHands})` }}
      />
      {/* Overlay mais refinado: escuro na base, semi-transparente no centro */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.75) 0%, rgba(0,14,53,0.55) 50%, rgba(0,14,53,0.90) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            Quem Somos
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            A referência em<br />
            <span className="text-bridge-red">imóveis rurais</span> no Brasil
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Unimos a maior rede imobiliária do mundo à maior inteligência do agronegócio brasileiro. Cada hectare tem uma história — e sabemos como revelar seu potencial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quero-vender"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
            >
              Quero Vender <ArrowRight size={16} />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              Fale com um Especialista
            </Link>
          </div>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Role para baixo</span>
        <ChevronDown size={24} className="text-white/50" />
      </motion.div>
    </section>
  )
}

/* @section: about-intro */
function AboutIntro() {
  return (
    <section id="sobre" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="section-divider" />
          <h2 className="text-4xl font-black text-dark-blue mb-6">
            O que é a REMAX Agro?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            A REMAX Agro é uma divisão especializada em imóveis rurais da maior rede de franquias imobiliárias do mundo — a REMAX — operando em parceria estratégica com a <strong className="text-dark-blue">DATAGRO</strong>, a maior consultoria independente de inteligência do agronegócio brasileiro.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Nascemos de uma convicção simples e poderosa: <em className="text-dark-blue font-semibold">"Todo agronegócio é, antes de mais nada, um negócio imobiliário."</em> A terra é o ativo fundamental que sustenta toda a cadeia produtiva do agro — e transacioná-la exige expertise, inteligência e uma rede global que só a REMAX Agro oferece.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nossos corretores são especialistas certificados, com profundo conhecimento das principais culturas, regiões produtoras e dinâmicas de mercado. Somos a ponte entre quem produz e quem investe, entre o campo brasileiro e o capital global.
          </p>
        </div>
        <div>
          <div className="rounded-lg overflow-hidden mb-6 h-72">
            <img src={ASSETS.river218} alt="Campo brasileiro" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <AnimatedStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: datagro-partnership — título atualizado conforme solicitado */
function DatagroPartnership() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 rounded-lg overflow-hidden h-80">
          <img src={ASSETS.tractorLine12349} alt="Agronegócio brasileiro" className="w-full h-full object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <span className="section-divider" />
          {/* Título atualizado — sem logo embutido no título */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Parceria estratégica: REMAX e DATAGRO
          </h2>
          <p className="text-white/70 leading-relaxed mb-5">
            A <strong className="text-white">DATAGRO</strong> é uma consultoria agrícola independente com mais de 40 anos de atuação. Produz análises e dados primários sobre as principais commodities agrícolas — açúcar, etanol, milho, soja, proteínas animais e bioenergia — presente em mais de 50 países.
          </p>
          <p className="text-white/70 leading-relaxed mb-5">
            Com um banco de dados que reúne milhares de séries históricas e alimenta mais de 100 relatórios mensais, a DATAGRO agrega uma camada de inteligência de dados que transforma como avaliamos e negociamos propriedades rurais.
          </p>
          <p className="text-white/70 leading-relaxed">
            Juntos, REMAX e DATAGRO entregam o que o mercado nunca teve: a fusão entre alcance global de transações imobiliárias e profundidade analítica do agronegócio brasileiro.
          </p>
        </div>
      </div>
    </section>
  )
}

/* @section: mvv */
function MVV() {
  const items = [
    {
      title: 'Missão',
      text: 'Garantir o melhor serviço de intermediação imobiliária e operações especiais para propriedades rurais, investindo continuamente na formação de especialistas dedicados em todas as regiões do Brasil.',
    },
    {
      title: 'Visão',
      text: 'Ser a referência absoluta no mercado de imóveis rurais brasileiro, reconhecida pela excelência técnica, integridade nas negociações e pela capacidade de conectar o agronegócio brasileiro ao capital global.',
    },
    {
      title: 'Valores',
      text: 'Transparência total em cada transação. Especialização contínua. Respeito ao produtor e ao investidor. Inovação com responsabilidade. Compromisso com resultados concretos.',
    },
  ]
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 text-center">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-3">Nossa Essência</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-lg p-8 border-accent-top card-premium"
            >
              <h3 className="text-bridge-red text-xs font-bold uppercase tracking-widest mb-4">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* @section: ceo-about */
function CeoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-divider" />
          <h2 className="text-4xl font-black text-dark-blue mb-6">Liderança</h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            Sob a liderança do <strong className="text-dark-blue">Gabriel Pesciallo</strong>, CEO da REMAX Agro, a empresa constrói sua presença em todos os principais mercados agroimobiliários do Brasil, com foco em transações de alto padrão, fundos de investimento e produtores de grande escala.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Com visão estratégica e amplo relacionamento no setor, Gabriel lidera uma equipe de corretores certificados especializados nas principais culturas e regiões produtoras brasileiras.
          </p>
          <Link
            to="/corretores"
            className="inline-flex items-center gap-2 text-bridge-red font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all"
          >
            Conheça nossa equipe <ArrowRight size={14} />
          </Link>
        </div>
        <div className="relative">
          <div className="rounded-lg overflow-hidden h-[420px]">
            <img src={ASSETS.gabriel} alt="Gabriel Pesciallo CEO REMAX Agro" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-dark-blue text-white px-6 py-4 rounded-lg">
            <div className="font-black text-white text-lg">Gabriel Pesciallo</div>
            <div className="text-white/60 text-xs uppercase tracking-widest">CEO, REMAX Agro</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function QuemSomos() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <DatagroPartnership />
      <MVV />
      <CeoSection />
    </>
  )
}
