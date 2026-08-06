import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, TrendingUp, Shield, FileSearch, Handshake, Globe, ChevronDown } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ASSETS, SOCIAL_LINKS } from '@/data'
import LeadForm from '@/components/LeadForm'

const HERO_IMG = ASSETS.heroAerial

const STEPS = [
  {
    icon: FileSearch,
    title: '1. Avaliação Técnica',
    text: 'Levantamento completo com análise de solo, produtividade histórica, localização, infraestrutura e comparativos regionais. Laudo com metodologia reconhecida pelo mercado financeiro.',
    img: ASSETS.heroSoilHands,
  },
  {
    icon: TrendingUp,
    title: '2. Estratégia de Precificação',
    text: 'Definimos o preço justo com base em dados primários DATAGRO — milhares de séries históricas e comparativos reais de transações na sua região. Nenhum hectare subavaliado.',
    img: ASSETS.tractorLine12349,
  },
  {
    icon: Globe,
    title: '3. Marketing Global',
    text: 'Sua propriedade é apresentada a compradores qualificados no Brasil e no exterior pela maior rede imobiliária do mundo — 140 mil corretores em 120 países.',
    img: ASSETS.aerialHarvesters325698,
  },
  {
    icon: Handshake,
    title: '4. Negociação Especializada',
    text: 'Corretores certificados conduzem cada negociação com sigilo absoluto, máxima segurança e foco total em obter o melhor valor para o vendedor.',
    img: ASSETS.tabletOrchard8467,
  },
  {
    icon: Shield,
    title: '5. Due Diligence e Fechamento',
    text: 'Suporte jurídico completo: análise de matrícula, CAR, SNCR, passivos ambientais e trabalhistas. Documentação organizada, negócio seguro, assinatura tranquila.',
    img: ASSETS.hills151008,
  },
]

const DIFFERENTIALS = [
  'Maior rede imobiliária do mundo — alcance global real',
  'Inteligência de dados DATAGRO — avaliação baseada em fatos',
  'Corretores certificados exclusivamente em imóveis rurais',
  'Compradores qualificados: fundos, produtores e investidores',
  'Sigilo absoluto em todas as etapas',
  'Zero burocracia para o vendedor — cuidamos de tudo',
]

// Tipos de propriedade — apenas venda (sem aquisição, que é da página Comprar)
const TIPOS = [
  { label: 'Fazendas de Soja e Milho', img: ASSETS.heroSorghum },
  { label: 'Propriedades Pecuárias', img: ASSETS.heroNelore },
  { label: 'Áreas de Cana-de-Açúcar', img: ASSETS.heroCane },
  { label: 'Fazendas de Algodão', img: ASSETS.heroCotton },
  { label: 'Áreas de Reflorestamento', img: ASSETS.valley3781 },
  { label: 'Imóveis Rurais Mistos', img: ASSETS.heroTractorCab },
]

/* @section: hero — min-h-screen, layout profissional centrado */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundPosition: 'center 30%' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.80) 0%, rgba(0,14,53,0.55) 50%, rgba(0,14,53,0.95) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            Quero Vender
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Venda sua propriedade rural<br />
            pelo <span className="text-bridge-red">valor que ela merece.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A REMAX Agro combina a maior rede imobiliária do mundo com a inteligência agrícola da DATAGRO. Chega de subavaliação. Sua terra vale mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors shadow-lg"
            >
              <FaWhatsapp size={18} /> Fale com um Especialista
            </a>
            <a
              href="#processo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              Ver como funciona <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.getElementById('processo')?.scrollIntoView({ behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') document.getElementById('processo')?.scrollIntoView({ behavior: 'smooth' })
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">Saiba mais</span>
        <ChevronDown size={24} className="text-white/50" />
      </motion.div>
    </section>
  )
}

/* @section: venda-urgencia */
function Urgencia() {
  return (
    <section className="bg-bridge-red py-5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white font-bold text-sm md:text-base text-center sm:text-left">
          ⚡ Propriedades rurais valorizaram mais de 113% nos últimos 5 anos. Você está vendendo no momento certo.
        </p>
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-bridge-red font-bold text-xs uppercase tracking-widest rounded hover:bg-gray-100 transition-colors"
        >
          <FaWhatsapp size={14} /> Avaliação Gratuita
        </a>
      </div>
    </section>
  )
}

/* @section: processo — grid 2 colunas com imagem por step */
function Processo() {
  return (
    <section id="processo" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl md:text-5xl font-black text-dark-blue mb-4">
            Como vendemos sua propriedade
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Do primeiro contato ao fechamento — processo estruturado, transparente e focado em maximizar o valor do seu patrimônio.
          </p>
        </div>

        {/* Steps alternados imagem+texto */}
        <div className="space-y-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
            >
              {/* Imagem */}
              <div className={`h-64 md:h-auto overflow-hidden ${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Texto */}
              <div className={`bg-off-white p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-bridge-red/10 flex items-center justify-center mb-5">
                  <step.icon size={24} className="text-bridge-red" />
                </div>
                <h3 className="font-black text-dark-blue text-xl mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors shadow-lg"
          >
            <FaWhatsapp size={18} /> Quero Vender com a REMAX Agro
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: diferenciais */
function Diferenciais() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}
    >
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.aerialHarvesters325698})` }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Por que vender com a REMAX Agro?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Nenhuma outra empresa no Brasil une o alcance global da maior rede imobiliária do mundo com a inteligência de mercado da DATAGRO. Para o vendedor, isso significa: <strong className="text-white">o melhor preço, no menor prazo.</strong>
            </p>
            <div className="space-y-4 mb-10">
              {DIFFERENTIALS.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-bridge-red flex-shrink-0" />
                  <span className="text-white/80 text-sm">{d}</span>
                </motion.div>
              ))}
            </div>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
            >
              <FaWhatsapp size={16} /> Iniciar Avaliação
            </a>
          </div>
          <div className="rounded-xl overflow-hidden h-[420px]">
            <img
              src={ASSETS.redTractor90281}
              alt="Propriedade rural REMAX Agro"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: tipos — somente venda, SEM bloco de aquisição/compra */
function TiposPropriedade() {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-3">
            Vendemos qualquer tipo de propriedade rural
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Especialistas em todas as cadeias do agronegócio brasileiro.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {TIPOS.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer"
            >
              <img src={t.img} alt={t.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/85 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-bold text-sm leading-tight">{t.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
          >
            <FaWhatsapp size={16} /> Quero Avaliar Minha Propriedade
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: lead-vender */
function LeadVender() {
  return (
    <section
      className="py-24 relative"
      style={{ backgroundImage: `url(${ASSETS.heroSoybeanHands})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,14,53,0.88)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <LeadForm
            source="quero-vender"
            title="Pronto para vender com quem entende do agro?"
            subtitle="Fale com um especialista REMAX Agro."
          />
        </div>
      </div>
    </section>
  )
}

export default function QueroVender() {
  return (
    <>
      <Hero />
      <Urgencia />
      <Processo />
      <Diferenciais />
      <TiposPropriedade />
      <LeadVender />
    </>
  )
}
