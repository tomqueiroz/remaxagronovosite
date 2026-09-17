import { useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Check, ArrowRight } from 'lucide-react'
import { ASSETS, SERVICES } from '@/data'
import LeadForm from '@/components/LeadForm'

/* @section: services-hero — min-h-[70vh], layout profissional centrado */
function ServicesHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.heroFarmerFence})`, backgroundPosition: 'center 35%' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,14,53,0.80) 0%, rgba(0,14,53,0.52) 50%, rgba(0,14,53,0.93) 100%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center w-full">
        <span className="inline-block text-white text-xs font-bold uppercase tracking-widest mb-6 border-b-2 border-bridge-red pb-1">
          Nossos Serviços
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
          Serviços exclusivos<br />
          <span className="text-bridge-red">para o agroimobiliário.</span>
        </h1>
        <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Do primeiro diagnóstico à conclusão do negócio — cada transação é conduzida com rigor técnico, ética e resultados concretos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servicos-lista"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors"
          >
            Ver Serviços
          </a>
          <a
            href="https://wa.me/5511915051212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/20 transition-colors"
          >
            Fale com um Especialista
          </a>
        </div>
      </div>
    </section>
  )
}

/* @section: services-detail */
function ServicesDetail() {
  const { hash } = useLocation()
  const [activeId, setActiveId] = useState<string | null>(null)

  useLayoutEffect(() => {
    const serviceId = decodeURIComponent(hash.slice(1))
    if (SERVICES.some(service => service.id === serviceId)) {
      setActiveId(serviceId)
    }
  }, [hash])

  return (
    <section id="servicos-lista" className="py-24 bg-off-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-full bg-white rounded-lg overflow-hidden border border-gray-100 card-premium scroll-mt-24"
          >
            {/* Header row */}
            <div
              className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-80 cursor-pointer"
              onClick={() => setActiveId(activeId === s.id ? null : s.id)}
            >
              {/* Image */}
              <div className="lg:col-span-2 h-52 lg:h-80 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Content */}
              <div className="lg:col-span-3 p-8 flex flex-col justify-center">
                <span className="text-bridge-red text-xs font-bold uppercase tracking-widest mb-2">
                  0{i + 1}
                </span>
                <h3 className="text-2xl font-black text-dark-blue mb-2">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-4">{s.subtitle}</p>
                <div className="flex items-center gap-2 text-bridge-red font-bold text-sm uppercase tracking-widest">
                  {activeId === s.id ? 'Recolher' : 'Ver detalhes'}
                  <motion.span
                    animate={{ rotate: activeId === s.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
              {activeId === s.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-6">{s.description}</p>
                      <Link
                        to="/contato"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-dark-blue text-white text-sm font-bold rounded hover:bg-bridge-blue transition-colors"
                      >
                        Solicitar este serviço <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div>
                      <h4 className="text-dark-blue font-bold text-sm uppercase tracking-widest mb-4">O que inclui</h4>
                      <ul className="space-y-2">
                        {s.bullets.map(b => (
                          <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
                            <Check size={14} className="mt-0.5 text-bridge-red flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* @section: services-cta */
function ServicesCTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundImage: `url(${ASSETS.tabletOrchard8467})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,14,53,0.88)' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <LeadForm
          source="servicos"
          title="Qual serviço você precisa?"
          subtitle="Nossos especialistas irão entender sua necessidade e propor a melhor solução para o seu negócio rural."
        />
      </div>
    </section>
  )
}

export default function Servicos() {
  return (
    <>
      <ServicesHero />
      <ServicesDetail />
      <ServicesCTA />
    </>
  )
}
