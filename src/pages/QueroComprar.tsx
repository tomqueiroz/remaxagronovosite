import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Search, BarChart3, FileCheck, Scale, ShieldCheck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ASSETS, SOCIAL_LINKS } from '@/data'
import LeadForm from '@/components/LeadForm'

const HERO_IMG = 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/48396_0a7c3a957fc0443682dda202a1cbbe56.jpg'

const STEPS = [
  {
    icon: Search,
    title: '1. Prospecção Estratégica',
    text: 'Mapeamos propriedades off-market e no mercado que atendem ao seu perfil — cultura, região, tamanho, potencial produtivo e orçamento. Nenhuma oportunidade escapa.',
  },
  {
    icon: BarChart3,
    title: '2. Análise de Potencial',
    text: 'Avaliação vocacional completa com dados primários DATAGRO: histórico de produtividade, análise de solo, ciclos de commodities e perspectivas de valorização. Você investe com certeza.',
  },
  {
    icon: FileCheck,
    title: '3. Due Diligence Especializada',
    text: 'Análise completa de matrícula, CAR, SNCR, reserva legal, passivos ambientais, trabalhistas e fiscais. Sua compra sai limpa do papel até o campo.',
  },
  {
    icon: Scale,
    title: '4. Avaliação Técnica e Econômica',
    text: 'Laudo de avaliação com metodologia reconhecida pelo mercado financeiro. Fundos de investimento confiam — você também pode.',
  },
  {
    icon: ShieldCheck,
    title: '5. Estruturação da Negociação',
    text: 'Corretores certificados conduzem a negociação protegendo seus interesses, estruturam o contrato e garantem segurança jurídica no fechamento.',
  },
]

const BENEFICIOS = [
  'Acesso a propriedades exclusivas — inclusive off-market',
  'Inteligência DATAGRO para decisões baseadas em dados reais',
  'Due diligence completa — zero surpresa pós-compra',
  'Rede global: REMAX em 120 países atrai vendedores qualificados',
  'Corretores especializados em cada região produtora',
  'Suporte completo: da busca à assinatura',
]

const PERFIS = [
  { titulo: 'Produtor Rural', descricao: 'Você já produz e quer expandir sua área ou diversificar culturas. Temos as melhores propriedades nas regiões certas.' },
  { titulo: 'Investidor Pessoa Física', descricao: 'Terra é o ativo que mais valorizou no Brasil — 113% em 5 anos. Invista com segurança e expertise.' },
  { titulo: 'Fundo de Investimento', descricao: 'Laudos técnicos, due diligence robusta e operações estruturadas para portfólios institucionais de alta complexidade.' },
  { titulo: 'Empresa Agroindustrial', descricao: 'M&A de ativos, Farm Flipping, Sale Leaseback e operações estruturadas. Soluções sob medida para o seu negócio.' },
]

/* @section: hero — min-h-screen, layout profissional centrado */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})`, backgroundPosition: 'center 35%' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.80) 0%, rgba(0,14,53,0.52) 50%, rgba(0,14,53,0.95) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            Quero Comprar
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Encontre a propriedade rural<br />
            <span className="text-bridge-red">certa para o seu objetivo.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Produção, expansão ou investimento — a REMAX Agro mapeia, analisa e negocia a propriedade ideal com inteligência de dados DATAGRO e alcance global.
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
              href="#processo-compra"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              Como funciona <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* @section: compra-destaque */
function Destaque() {
  return (
    <section className="bg-dark-blue py-5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white font-bold text-sm md:text-base text-center sm:text-left">
          Mais de 9.000 agências REMAX em 120 países conectadas à busca da sua propriedade ideal no Brasil.
        </p>
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-bridge-red text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
        >
          <FaWhatsapp size={14} /> Começar Busca
        </a>
      </div>
    </section>
  )
}

/* @section: perfis */
function Perfis() {
  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-3">Para quem é este serviço?</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Atendemos todos os perfis de compradores com soluções personalizadas.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFIS.map((p, i) => (
            <motion.div
              key={p.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-7 border-t-4 border-bridge-red shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-black text-dark-blue text-base mb-3">{p.titulo}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.descricao}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
          >
            <FaWhatsapp size={16} /> Me Identifico — Quero Conversar
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: processo-compra */
function ProcessoCompra() {
  return (
    <section id="processo-compra" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl md:text-5xl font-black text-dark-blue mb-4">
            Nossa metodologia de compra
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Um processo estruturado e seguro do briefing ao fechamento — para você investir com total confiança.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-off-white rounded-xl p-7 border-l-4 border-bridge-red"
            >
              <step.icon size={32} className="text-bridge-red mb-4" />
              <h3 className="font-black text-dark-blue text-lg mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors shadow-lg"
          >
            <FaWhatsapp size={18} /> Quero Encontrar Minha Propriedade
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: beneficios */
function Beneficios() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}
    >
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.cattle1704})` }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-xl overflow-hidden h-[400px]">
            <img
              src={ASSETS.aerialRedTractor379633}
              alt="Vista aérea de propriedade rural"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="section-divider" />
            <h2 className="text-4xl font-black text-white mb-6">
              Compre com segurança e inteligência
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Com a REMAX Agro, você não compra apenas terra — você investe com dados reais, expertise certificada e a garantia da maior rede imobiliária do mundo do seu lado.
            </p>
            <div className="space-y-4 mb-10">
              {BENEFICIOS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-bridge-red flex-shrink-0" />
                  <span className="text-white/80 text-sm">{b}</span>
                </motion.div>
              ))}
            </div>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
            >
              <FaWhatsapp size={16} /> Iniciar Busca de Propriedades
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* @section: lead-comprar */
function LeadComprar() {
  return (
    <section
      className="py-24 relative"
      style={{ backgroundImage: `url(${ASSETS.tabletField133010})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,14,53,0.88)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <LeadForm
            source="quero-comprar"
            title="Nos conte o que você está buscando"
            subtitle="Um especialista REMAX Agro entra em contato com as melhores propriedades para o seu perfil."
          />
        </div>
      </div>
    </section>
  )
}

export default function QueroComprar() {
  return (
    <>
      <Hero />
      <Destaque />
      <Perfis />
      <ProcessoCompra />
      <Beneficios />
      <LeadComprar />
    </>
  )
}
