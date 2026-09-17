import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, Globe, Award, ChevronDown } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ASSETS, STATS, SERVICES, SOCIAL_LINKS } from '@/data'
import LeadForm from '@/components/LeadForm'

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

/* ─── ParallaxDivider ─────────────────────────────────────────────────────── */
function ParallaxDivider({ image, height = '280px', overlay = 'rgba(0,14,53,0.50)' }: { image: string; height?: string; overlay?: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  )
}

/* @section: hero */
const VIDEO_URL = 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/0_Sky_Film_1280x720_cb814eabc9c8459499b54692189dfa22.mp4'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background — muted autoplay loop, poster for SEO/LCP */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        poster={ASSETS.heroAerial}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,14,53,0.82) 0%, rgba(0,14,53,0.60) 100%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl"
        >
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            REMAX Agro × DATAGRO
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Todo agronegócio é,{' '}
            <span className="text-white">antes de mais nada,</span>{' '}
            <span className="text-bridge-red">um negócio imobiliário.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            A maior rede imobiliária do mundo unida à maior referência em inteligência do agronegócio brasileiro. Compra, venda, avaliação e operações estruturadas para propriedades rurais de alto padrão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/servicos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-dark-red transition-colors"
            >
              Nossos Serviços <ArrowRight size={16} />
            </Link>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              <FaWhatsapp size={16} /> Fale com um Especialista
            </a>
          </div>
        </motion.div>
      </div>
      {/* @section: hero-scroll-control */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 flex min-h-11 -translate-x-1/2 flex-col items-center gap-2 rounded px-3 text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue"
        onClick={() => {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          document.getElementById('stats')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Ir para os indicadores da REMAX Agro"
      >
        <span className="text-xs font-light uppercase tracking-widest">Role para baixo</span>
        <ChevronDown size={28} aria-hidden="true" />
        <ChevronDown size={20} className="-mt-4 opacity-50" aria-hidden="true" />
      </motion.button>
    </section>
  )
}

/* @section: stats-bar */
function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
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

  const formatted = count >= 1000
    ? count.toLocaleString('pt-BR')
    : count.toString()

  return (
    <motion.div
      ref={ref}
      key={label}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-black text-white mb-1">
        {formatted}{suffix}
      </div>
      <div className="text-white/50 text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  )
}

function StatsBar() {
  return (
    <section id="stats" className="bg-bridge-blue py-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {STATS.map((s, i) => (
          <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />
        ))}
      </div>
    </section>
  )
}

/* @section: services-preview */
function ServicesPreview() {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="section-divider" />
          <h2 className="text-4xl md:text-5xl section-title mb-4">
            O que fazemos
          </h2>
          <p className="body-text text-lg max-w-2xl">
            Serviços especializados para quem quer tomar as melhores decisões em transações imobiliárias rurais.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="card-premium border-accent-top bg-white rounded-lg overflow-hidden flex flex-col"
            >
              <div className="h-52 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-dark-blue mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.subtitle}</p>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/servicos#${s.id}`}
                    className="inline-flex items-center gap-1 text-bridge-red text-sm font-bold uppercase tracking-widest hover:gap-2 transition-all"
                  >
                    Saiba mais <ArrowRight size={14} />
                  </Link>
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-1.5 bg-bridge-red text-white text-xs font-bold rounded hover:bg-dark-red transition-colors ml-auto"
                  >
                    <FaWhatsapp size={12} /> Fale com um Especialista
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* @section: partnership */
function Partnership() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}
    >
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.tractorSunset})` }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Uma parceria que redefine o mercado agroimobiliário
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              A REMAX Agro é a união da maior rede de franquias imobiliárias do mundo com a DATAGRO — consultoria independente reconhecida globalmente com mais de 40 anos de expertise em inteligência agrícola.
            </p>
            <p className="text-white/70 leading-relaxed mb-10">
              Juntos, entregamos alcance global com profundo conhecimento local, dados das principais cadeias agropecuárias e uma rede de profissionais especializados em imóveis rurais.
            </p>
            <div className="flex items-center gap-8 mb-8">
              {/* Logo branco com vermelho — 350px, único nesta seção */}
              <img src={ASSETS.logoWhite} alt="REMAX Agro" className="w-auto" style={{ width: '350px', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bridge-red text-white font-bold text-sm rounded hover:bg-dark-red transition-colors"
            >
              <FaWhatsapp size={16} /> Fale com um Especialista
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Globe, title: 'Alcance Global', text: '140.000 corretores em 120 países' },
              { icon: TrendingUp, title: 'Inteligência de Dados', text: '40 anos de análise do agronegócio brasileiro' },
              { icon: Shield, title: 'Segurança Jurídica', text: 'Due diligence completa em todas as transações' },
              { icon: Award, title: 'Corretores Certificados', text: 'Especialistas em imóveis rurais de alto padrão' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="bg-white/8 border border-white/12 rounded-lg p-5 hover:bg-white/12 transition-colors"
              >
                <item.icon size={24} className="text-bridge-red mb-3" />
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: cultures */
function CulturesGrid() {
  const cultures = [
    { label: 'Soja', img: ASSETS.heroSoybean },
    { label: 'Milho', img: ASSETS.cornSilo },
    { label: 'Cana-de-Açúcar', img: ASSETS.cana },
    { label: 'Algodão', img: ASSETS.algodao },
    { label: 'Pecuária', img: ASSETS.neloreHerd },
    { label: 'Silvicultura', img: ASSETS.reflorestamento },
  ]
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="section-divider" />
          <h2 className="text-4xl font-black section-title mb-3">Culturas & Especialidades</h2>
          <p className="body-text text-lg">
            Expertise em todas as principais cadeias do agronegócio brasileiro.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cultures.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-lg overflow-hidden aspect-square card-premium cursor-pointer"
            >
              <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-bold text-xs leading-tight">{c.label}</span>
            </motion.div>
          ))}
        </div>
        {/* CTA cultures */}
        <div className="text-center mt-10">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-dark-red transition-colors"
          >
            <FaWhatsapp size={16} /> Fale com um Especialista
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: testimonials */
const TESTIMONIALS_MARQUEE = [
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Guilherme%20Nastari.jpeg_33fa28e0ad8d497d8f988df41c56afd9.jpg',
    nome: 'Guilherme Nastari',
    cargo: 'Diretor — DATAGRO',
    texto: 'Como diretor da DATAGRO, nossa decisão de investir na REMAX Agro foi calculada e estratégica. Após quatro décadas fornecendo inteligência analítica que orienta decisões em 50 países, identificamos que o segmento agroimobiliário ainda operava com metodologias defasadas.',
  },
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Peixoto%201.jpeg_51efed753a654dddbe562adc71865cd5.jpg',
    nome: 'Peixoto Accyoli',
    cargo: 'CEO — RE/MAX Brasil',
    texto: 'A criação da REMAX Agro foi um movimento estratégico alinhado com a vocação natural do Brasil. Com o agronegócio representando quase um quarto do PIB nacional, era essencial que a REMAX tivesse uma divisão especializada neste setor.',
  },
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Guilherme%20Nastari.jpeg_33fa28e0ad8d497d8f988df41c56afd9.jpg',
    nome: 'Guilherme Nastari',
    cargo: 'Diretor — DATAGRO',
    texto: 'A REMAX Agro não é apenas um novo negócio — é a materialização da evolução natural do setor, onde conhecimento técnico do agronegócio e excelência em transações imobiliárias finalmente convergem.',
  },
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Peixoto%203.jpeg_9def21987ff44891b7e05cb928011e58.jpg',
    nome: 'Peixoto Accyoli',
    cargo: 'CEO — RE/MAX Brasil',
    texto: 'As propriedades rurais apresentam valorização acima de 113% nos últimos 5 anos — números que impressionam qualquer investidor. A nossa REMAX Agro nasceu como uma potência, presente em todos os estados brasileiros.',
  },
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Guilherme%20Nastari.jpeg_33fa28e0ad8d497d8f988df41c56afd9.jpg',
    nome: 'Guilherme Nastari',
    cargo: 'Diretor — DATAGRO',
    texto: 'Esta joint-venture aplica nosso conhecimento técnico-científico a um setor que movimenta bilhões anualmente, mas carecia de parâmetros objetivos. Integramos nossa expertise inigualável em agro à maior rede imobiliária global.',
  },
  {
    foto: 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/Foto%20Oficial%20-%20Peixoto%201.jpeg_51efed753a654dddbe562adc71865cd5.jpg',
    nome: 'Peixoto Accyoli',
    cargo: 'CEO — RE/MAX Brasil',
    texto: 'O futuro do mercado agroimobiliário brasileiro tem um novo protagonista. E tenho orgulho de dizer que ele leva a marca REMAX. Não estamos apenas entrando neste mercado — estamos chegando para transformá-lo.',
  },
]

function TestimonialCard({ item }: { item: typeof TESTIMONIALS_MARQUEE[0] }) {
  return (
    <div className="w-full bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <span className="text-bridge-red text-5xl font-black leading-none mb-2 select-none">"</span>
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">
        {item.texto}
      </p>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <img
          src={item.foto}
          alt={item.nome}
          className="w-14 h-14 rounded-full object-cover object-top border-2 border-bridge-red/20 flex-shrink-0"
        />
        <div>
          <div className="font-bold text-dark-blue text-sm leading-tight">{item.nome}</div>
          <div className="text-gray-400 text-xs mt-0.5">{item.cargo}</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black section-title mb-3">A opinião de quem decide</h2>
          <p className="body-text">Líderes que estão transformando o mercado agroimobiliário brasileiro</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TESTIMONIALS_MARQUEE.map((item, i) => (
            <TestimonialCard key={`${item.nome}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* @section: ceo-quote */
function CeoQuote() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#000e35' }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative">
            <div className="w-72 h-80 rounded-lg overflow-hidden">
              <img src={ASSETS.gabriel} alt="Gabriel Pesciallo — CEO REMAX Agro" className="w-full h-full object-cover object-top" />
            </div>

          </div>
        </div>
        <div className="lg:col-span-3">
          <span className="text-bridge-red text-6xl font-black leading-none">"</span>
          <blockquote className="text-white text-2xl md:text-3xl font-bold leading-relaxed -mt-4 mb-6">
            Nosso negócio é garantir o melhor serviço de intermediação imobiliária e operações especiais para propriedades rurais. Cada hectare tem uma história e um potencial que nossa equipe sabe como revelar.
          </blockquote>
          <div className="mb-8">
            <div className="text-white font-black text-lg">Gabriel Pesciallo</div>
            <div className="text-white/50 text-sm">CEO, REMAX Agro</div>
          </div>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bridge-red text-white font-bold text-sm rounded hover:bg-dark-red transition-colors"
          >
            <FaWhatsapp size={16} /> Fale com um Especialista
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: home-lead */
function HomeLead() {
  return (
    <section
      className="py-24 relative"
      style={{
        backgroundImage: `url(${ASSETS.farmerTablet})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,14,53,0.85)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <LeadForm
            source="home"
            title="Fale com um Especialista"
            subtitle="Fale com um especialista REMAX Agro."
          />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <ParallaxDivider image={ASSETS.tractorSunset} height="240px" overlay="rgba(0,14,53,0.55)" />
      <Partnership />
      <CulturesGrid />
      <ParallaxDivider image={ASSETS.cowboy2117} height="240px" overlay="rgba(0,14,53,0.60)" />
      <Testimonials />
      <CeoQuote />
      <HomeLead />
    </>
  )
}
