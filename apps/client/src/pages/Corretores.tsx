import { motion } from 'framer-motion'
import { Award, MapPin, CheckCircle, BookOpen, Users, Star } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { ASSETS, SOCIAL_LINKS } from '@/data'
import LeadForm from '@/components/LeadForm'
import CorretoresLocator from '@/components/CorretoresLocator'

const DIFERENCIAIS_CORRETOR = [
  {
    icon: BookOpen,
    title: 'Formação Especializada',
    items: [
      'Programa de Certificação REMAX Agro',
      'Treinamentos técnicos especializados no agronegócio',
      'Participação ativa em eventos do agronegócio',
      'Planos de desenvolvimento individual contínuo',
    ],
  },
  {
    icon: MapPin,
    title: 'Conhecimento Regional',
    items: [
      'Familiaridade com o mercado imobiliário local',
      'Domínio dos preços regionais e critérios de valorização',
      'Rede de contatos estratégicos em cada região',
      'Contribuição nas decisões com foco na dinâmica regional',
    ],
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    items: [
      'Acompanhamento contínuo em todas as etapas',
      'Dedicação individualizada por operação',
      'Confidencialidade absoluta garantida',
      'Consultoria personalizada desde o primeiro contato até o fechamento do negócio',
    ],
  },
]

const SERVICOS_CORRETOR = [
  {
    titulo: 'Venda de Propriedades Rurais',
    desc: 'Avaliação técnica, marketing especializado e negociação para maximizar o valor do patrimônio do vendedor.',
    bullets: [
      'Valorização da terra com visão estratégica',
      'Avaliação técnica e precisa da fazenda',
      'Documentação em dia e segurança na negociação',
      'Oferta estruturada para investidores',
      'Prospecção inteligente de compradores',
    ],
  },
  {
    titulo: 'Aquisição de Áreas Rurais',
    desc: 'Prospecção e análise completa para quem quer investir com segurança e inteligência no agronegócio.',
    bullets: [
      'Prospecção estratégica de propriedades',
      'Análise vocacional completa',
      'Due diligence especializada',
      'Avaliação técnica e econômica',
      'Estruturação da negociação',
    ],
  },
  {
    titulo: 'Arrendamentos Rurais',
    desc: 'Estruturação e gestão de contratos de arrendamento com foco em produtividade e segurança jurídica.',
    bullets: [
      'Prospecção de arrendatários qualificados',
      'Avaliação de potencial produtivo',
      'Estruturação de contratos',
      'Gestão de arrendamentos',
      'Monitoramento de desempenho',
    ],
  },
  {
    titulo: 'Operações Estruturadas',
    desc: 'Soluções complexas para empresas e investidores institucionais que exigem expertise diferenciada.',
    bullets: [
      'M&A de ativos agroindustriais',
      'Financiamentos alternativos',
      'Buy to Lease, Built to Suit e Sale Lease Back',
      'Farm Flipping (compra, desenvolvimento e venda)',
      'Captação para fundos de investimento',
    ],
  },
]

const METODOLOGIA = [
  { num: '01', titulo: 'Briefing & Diagnóstico', desc: 'Entendemos em profundidade o objetivo do cliente — venda, compra, arrendamento ou operação estruturada.' },
  { num: '02', titulo: 'Pesquisa de Mercado', desc: 'Mapeamento de propriedades e compradores com dados primários DATAGRO e nossa rede nacional.' },
  { num: '03', titulo: 'Avaliação Técnica', desc: 'Laudo técnico com análise de solo, produtividade, localização, infraestrutura e comparativos regionais.' },
  { num: '04', titulo: 'Estruturação da Oferta', desc: 'Material descritivo profissional, pricing estratégico e apresentação ao perfil certo de contraparte.' },
  { num: '05', titulo: 'Negociação', desc: 'Corretores certificados conduzem a negociação com sigilo, expertise e foco no melhor resultado.' },
  { num: '06', titulo: 'Due Diligence & Fechamento', desc: 'Análise documental completa, suporte jurídico e acompanhamento até a assinatura.' },
]

function CorretoresHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${ASSETS.heroTwoFarmers})`, backgroundPosition: 'center 25%' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.78) 0%, rgba(0,14,53,0.52) 50%, rgba(0,14,53,0.95) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
            Nossa Equipe
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Além de corretores,<br /><span className="text-bridge-red">consultores estratégicos</span><br />do agronegócio.
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Especialistas certificados em transações imobiliárias rurais — expertise global combinada com profundo conhecimento do agronegócio brasileiro, apoiada pela inteligência DATAGRO.
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
              href="#equipe"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
            >
              Conhecer a Equipe
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DiferenciaisCorretor() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl md:text-5xl font-black text-dark-blue mb-4">O que faz nosso time ser único</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Especialistas certificados que combinam expertise imobiliária global com profundo conhecimento do agronegócio brasileiro.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DIFERENCIAIS_CORRETOR.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="bg-off-white rounded-xl p-8 border-t-4 border-bridge-red">
              <d.icon size={32} className="text-bridge-red mb-5" />
              <h3 className="font-black text-dark-blue text-xl mb-5">{d.title}</h3>
              <ul className="space-y-3">
                {d.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-bridge-red flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certificacao() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}>
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.soyFarmer3866286})` }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Programa de Certificação REMAX Agro</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Nossos especialistas participam de um programa de desenvolvimento profissional contínuo, que os certifica como corretores de imóveis rurais altamente capacitados — um padrão único no mercado brasileiro.
            </p>
            <div className="space-y-4 mb-10">
              {['Treinamentos técnicos especializados no agronegócio','Participação ativa em eventos do agronegócio','Planos de desenvolvimento individual contínuo','Selo exclusivo para especialistas'].map((item, i) => (
                <div key={i} className="flex items-center gap-3"><Star size={16} className="text-bridge-red flex-shrink-0" /><span className="text-white/80 text-sm">{item}</span></div>
              ))}
            </div>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors">
              <FaWhatsapp size={16} /> Fale com um Especialista Certificado
            </a>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="rounded-2xl overflow-hidden w-full h-64">
              <img src={ASSETS.womanCrops35179} alt="Especialista em campo" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="text-center">
              <img src={ASSETS.seloColor} alt="Selo Certificação REMAX Agro" className="h-24 w-auto mx-auto opacity-95" />
              <p className="text-white/50 text-xs mt-3 uppercase tracking-widest">Certificação REMAX Agro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicosCorretor() {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-4">Serviços do nosso time especializado</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Cobrimos todo o espectro de transações rurais — da venda simples às operações mais complexas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICOS_CORRETOR.map((s, i) => (
            <motion.div key={s.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border-l-4 border-bridge-red">
              <h3 className="font-black text-dark-blue text-xl mb-2">{s.titulo}</h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2"><CheckCircle size={14} className="text-bridge-red flex-shrink-0 mt-0.5" /><span className="text-gray-600 text-sm">{b}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors">
            <FaWhatsapp size={16} /> Quero ser Atendido por um Especialista
          </a>
        </div>
      </div>
    </section>
  )
}

function Metodologia() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-4">Metodologia exclusiva de negociação</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Uma metodologia estratégica para garantir os melhores resultados em imóveis rurais — do planejamento ao fechamento.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {METODOLOGIA.map((m, i) => (
            <motion.div key={m.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative bg-off-white rounded-xl p-7 overflow-hidden">
              <span className="absolute top-4 right-5 text-6xl font-black text-gray-100 leading-none select-none">{m.num}</span>
              <div className="relative z-10">
                <h3 className="font-black text-dark-blue text-base mb-2">{m.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Excelencia() {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #000e35 0%, #0c2749 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden h-72">
            <img src={ASSETS.hills151008} alt="Excelência no campo" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <span className="section-divider" />
            <h2 className="text-3xl font-black text-white mb-5">Compromisso com a excelência</h2>
            <p className="text-white/70 leading-relaxed mb-6">Na REMAX Agro, cada propriedade rural é única e cada negócio tem suas particularidades. Nossa missão é garantir que cada transação seja conduzida com:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {['Máxima segurança jurídica','Total transparência','Excelência técnica','Resultados superiores','Satisfação garantida','Sigilo absoluto'].map((item, i) => (
                <div key={i} className="flex items-center gap-2"><Award size={14} className="text-bridge-red flex-shrink-0" /><span className="text-white/80 text-sm">{item}</span></div>
              ))}
            </div>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors">
              <FaWhatsapp size={16} /> Fale com um Especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamLead() {
  return (
    <section id="equipe" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-divider mx-auto" />
          <h2 className="text-4xl font-black text-dark-blue mb-3">Nosso time de especialistas</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Conheça quem lidera as operações mais sofisticadas do mercado agroimobiliário brasileiro.</p>
        </div>
        <div className="max-w-md mx-auto">
          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-off-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-80 overflow-hidden">
              <img src={ASSETS.gabriel} alt="Gabriel Pesciallo — CEO REMAX Agro" className="w-full h-full object-cover" style={{ objectPosition: '50% 15%' }} />
            </div>
            <div className="p-7 text-center">
              <h3 className="font-black text-dark-blue text-xl">Gabriel Pesciallo</h3>
              <p className="text-bridge-red text-xs font-bold uppercase tracking-widest mt-1">CEO &amp; CORRETOR ESPECIALISTA</p>
              <a
                href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Gostaria de entrar em contato com o corretor Gabriel Pesciallo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded bg-bridge-red px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
              >
                <FaWhatsapp size={14} aria-hidden="true" /> Falar com Gabriel
              </a>
            </div>
          </motion.article>
        </div>
        {/* @section: corretores-interactive-locator */}
        <CorretoresLocator />
      </div>
    </section>
  )
}

function CorretoresLead() {
  return (
    <section className="py-24 relative" style={{ backgroundImage: `url(${ASSETS.fence256})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,14,53,0.88)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <LeadForm source="corretores" title="Quer ser atendido por um especialista REMAX Agro?" subtitle="Preencha o formulário e nosso time entra em contato rapidamente." />
        </div>
      </div>
    </section>
  )
}

export default function Corretores() {
  return (
    <>
      <CorretoresHero />
      <TeamLead />
      <DiferenciaisCorretor />
      <Certificacao />
      <ServicosCorretor />
      <Metodologia />
      <Excelencia />
      <CorretoresLead />
    </>
  )
}
