import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageSquare, ChevronDown } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ASSETS } from '@/data'
import LeadForm from '@/components/LeadForm'

/* @section: contato-hero — min-h-[70vh], layout centrado */
function ContatoHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroFarmerField})` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.78) 0%, rgba(0,14,53,0.55) 50%, rgba(0,14,53,0.92) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            Entre em Contato
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Vamos conversar<br />
            <span className="text-bridge-red">sobre seu negócio.</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Nossa equipe de especialistas está pronta para atender você em qualquer etapa da sua transação imobiliária rural — do primeiro contato ao fechamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511915051212?text=Olá!%20Vim%20pelo%20site%20da%20REMAX%20Agro%20e%20gostaria%20de%20conversar%20com%20um%20especialista."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp size={18} /> WhatsApp Direto
            </a>
            <a
              href="#contato-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              Preencher Formulário
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* @section: contato-main */
function ContatoMain() {
  const infos = [
    {
      icon: Phone,
      label: 'Central de Atendimento',
      value: '+55 (11) 91505-1212',
      sub: 'WhatsApp disponível',
      href: 'tel:+5511915051212',
    },
    {
      icon: Mail,
      label: 'E-mail',
      value: 'contatoagro@remax.com.br',
      sub: 'Respondemos em até 24h',
      href: 'mailto:contatoagro@remax.com.br',
    },
    {
      icon: MapPin,
      label: 'Portal Oficial',
      value: 'AGRO.REMAX.COM.BR',
      sub: 'Atendemos todo o Brasil',
      href: 'https://agro.remax.com.br',
    },
    {
      icon: Clock,
      label: 'Horário de Atendimento',
      value: 'Segunda a Sexta',
      sub: '9h às 18h (horário de Brasília)',
      href: null,
    },
  ]

  return (
    <section id="contato-form" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 bg-off-white rounded-lg p-10"
        >
          <LeadForm
            source="contato"
            title="Envie sua mensagem"
            subtitle="Preencha o formulário e um especialista entrará em contato em até 24 horas."
            light={true}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="mb-8">
            <span className="section-divider" />
            <h2 className="text-3xl font-black text-dark-blue mb-3">Informações de Contato</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Estamos prontos para atender você em qualquer etapa da sua transação imobiliária rural.
            </p>
          </div>

          {infos.map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-5 bg-off-white rounded-lg border border-gray-100 hover:border-bridge-red/30 transition-colors card-premium"
            >
              <div className="w-10 h-10 rounded-lg bg-bridge-red/10 flex items-center justify-center flex-shrink-0">
                <info.icon size={18} className="text-bridge-red" />
              </div>
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">{info.label}</div>
                {info.href ? (
                  <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-dark-blue font-bold text-sm hover:text-bridge-red transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <div className="text-dark-blue font-bold text-sm">{info.value}</div>
                )}
                <div className="text-gray-400 text-xs">{info.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5511915051212?text=Olá!%20Vim%20pelo%20site%20da%20REMAX%20Agro%20e%20gostaria%20de%20conversar%20com%20um%20especialista."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full font-bold text-sm"
          >
            <MessageSquare size={20} />
            Conversar pelo WhatsApp
          </a>
          {/* logos removidos — não duplicar aqui */}
        </motion.div>
      </div>
    </section>
  )
}

/* @section: contato-services-cta */
function ContatoServicesCTA() {
  return (
    <section className="bg-off-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/servicos"
          className="flex min-h-20 w-full items-center justify-center rounded-lg bg-bridge-red px-8 py-6 text-center text-base font-black uppercase tracking-widest text-white transition-colors hover:bg-dark-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2 sm:text-lg"
        >
          Conheça Nossos Serviços
        </Link>
      </div>
    </section>
  )
}

export default function Contato() {
  return (
    <>
      <ContatoHero />
      <ContatoMain />
      <ContatoServicesCTA />
      <FaqSection />
    </>
  )
}


/* @section: faq */
const FAQ_ITEMS = [
  {
    q: 'O que é a REMAX Agro?',
    a: 'A REMAX Agro é a divisão especializada em imóveis rurais da maior rede de franquias imobiliárias do mundo — a REMAX — operando em parceria estratégica com a DATAGRO, a maior consultoria independente de inteligência do agronegócio brasileiro.',
  },
  {
    q: 'Como funciona a venda de uma propriedade rural com a REMAX Agro?',
    a: 'Nossa metodologia inclui: precificação estratégica com dados de mercado, elaboração de material técnico completo, marketing nacional e internacional, negociação conduzida por especialistas e suporte jurídico completo até o fechamento.',
  },
  {
    q: 'Qual a diferença entre a REMAX Agro e outras imobiliárias rurais?',
    a: 'A REMAX Agro combina uma rede global de mais de 9.000 agências em 120 países com inteligência de dados das principais cadeias agropecuárias, contando com profissionais especializados em imóveis rurais em todo o território nacional.',
  },
  {
    q: 'Quais tipos de propriedades rurais a REMAX Agro trabalha?',
    a: 'Atuamos com propriedades rurais de todos os perfis, desde imóveis menores até grandes fazendas, com foco nas principais cadeias produtivas do Brasil: soja, milho, cana-de-açúcar, algodão, pecuária, silvicultura e outras.',
  },
  {
    q: 'Em quais regiões do Brasil a REMAX Agro atende?',
    a: 'Atendemos todo o Brasil, com foco nos principais polos agrícolas e nas principais cadeias do agro.',
  },
  {
    q: 'Como é feita a avaliação de uma propriedade rural?',
    a: 'Produzimos documentos técnicos completos, com informações sobre solo, clima, relevo, produtividade histórica, infraestrutura, análise de regularização documental e de áreas naturais, comparativos regionais e perspectivas de valorização – o necessário para tomar as melhores decisões.',
  },
  {
    q: 'O que é due diligence rural e por que é importante?',
    a: 'Due diligence rural é a análise completa da documentação de uma propriedade antes da compra: matrícula, CAR, SNCR, reserva legal, passivos ambientais, trabalhistas e fiscais. Evita surpresas pós-compra e garante segurança jurídica total na transação.',
  },
  {
    q: 'O que são operações estruturadas no agronegócio?',
    a: 'São soluções para transações complexas: M&A de ativos agroindustriais, financiamentos alternativos, Buy to Lease, Built to Suit, Sale Lease Back, Farm Flipping e captação para fundos de investimento. A REMAX Agro coordena essas operações do início ao fim.',
  },
  {
    q: 'Quanto tempo leva para vender uma fazenda?',
    a: 'O prazo varia conforme o tipo, a região, o valor, a documentação e as condições de mercado. Nossa equipe estrutura a divulgação e a negociação da propriedade e acompanha cada etapa até o fechamento.',
  },
  {
    q: 'Como entrar em contato com um especialista REMAX Agro?',
    a: 'Você pode nos contatar pelo WhatsApp (11) 91505-1212, por e-mail em contatoagro@remax.com.br ou preenchendo o formulário nesta página. Respondemos em até 24 horas.',
  },
]

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 bg-white" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-3">Perguntas Frequentes</h2>
          <p className="text-gray-500 text-lg">Tudo que você precisa saber sobre transações de imóveis rurais com a REMAX Agro.</p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-off-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bridge-red"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-bold text-dark-blue text-sm pr-4" itemProp="name">{item.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-bridge-red flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={open !== i}
                className="px-6 py-5 bg-white border-t border-gray-100"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
