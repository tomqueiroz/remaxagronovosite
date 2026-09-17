import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { ASSETS, NAV_LINKS, SOCIAL_LINKS, type NavLink as NavLinkType } from '@/data'

/* @section: go-to-top */
function GoToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
      }}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-bridge-red text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-dark-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge-red focus-visible:ring-offset-2"
      aria-label="Voltar ao topo"
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  )
}

/* @section: desktop-dropdown — hover delay 1 s para o submenu não sumir rápido */
function DesktopDropdown({ link }: { link: NavLinkType }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setOpen(true)
  }

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 1000) // 1 s de delay antes de fechar
  }

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide text-white/75 hover:text-white transition-colors duration-200 rounded"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {link.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-dark-blue border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          {link.children?.map(child => (
            <Link
              key={child.to}
              to={child.to}
              className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors border-b border-white/5 last:border-0"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* @section: navbar */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setExpandedMobile(null)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-scrolled shadow-lg' : 'bg-dark-blue'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[70px]">
        {/* @section: header-brand-lockup */}
        <Link to="/" className="flex-shrink-0 flex items-center" aria-label="REMAX Agro powered by DATAGRO">
          <img
            src={ASSETS.logoBranco}
            alt="REMAX Agro"
            className="h-11 w-[155px] object-contain sm:hidden"
          />
          <span className="relative hidden h-9 w-[76px] flex-shrink-0 overflow-hidden sm:block">
            <img
              src={ASSETS.logoBranco}
              alt="REMAX Agro"
              className="absolute -left-[6.22px] -top-[5.24px] h-12 w-[85.33px] max-w-none"
            />
          </span>
          <span className="mx-[29px] hidden h-8 w-px flex-shrink-0 bg-white/25 sm:block" aria-hidden="true" />
          <span className="hidden w-[83px] flex-col items-start gap-1 leading-none sm:flex">
            <span className="text-left text-[7px] font-semibold uppercase tracking-[0.16em] text-white/55">Powered by</span>
            <span className="relative block h-3 w-[83px] overflow-hidden">
              <img
                src={ASSETS.datagroNegativo}
                alt="DATAGRO"
                className="absolute -left-[8.4px] -top-[4.35px] h-[22.5px] w-[101px] max-w-none"
              />
            </span>
          </span>
        </Link>

        {/* Desktop nav — sem ícones sociais */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link =>
            link.children ? (
              <DesktopDropdown key={link.to} link={link} />
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded ${
                    isActive
                      ? 'text-white border-b-2 border-bridge-red'
                      : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}

          <Link
            to="/contato"
            className="ml-3 inline-flex items-center gap-2 px-5 py-2 bg-bridge-red text-white text-sm font-bold rounded hover:bg-dark-red transition-colors duration-200"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-bridge-red" aria-hidden="true"><Phone size={12} /></span>
            Fale Conosco
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav id="mobile-navigation" aria-label="Navegação principal mobile" className="lg:hidden bg-dark-blue border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link =>
            link.children ? (
              <div key={link.to}>
                <button
                  className="w-full flex items-center justify-between py-3 text-sm font-semibold border-b border-white/10 text-white/70"
                  onClick={() => setExpandedMobile(expandedMobile === link.label ? null : link.label)}
                  aria-expanded={expandedMobile === link.label}
                  aria-controls={`mobile-submenu-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${expandedMobile === link.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedMobile === link.label && (
                  <div id={`mobile-submenu-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="pl-4 py-1 flex flex-col gap-1">
                    {link.children.map(child => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="py-2 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }: { isActive: boolean }) =>
                  `py-3 text-sm font-semibold border-b border-white/10 ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
          {/* Social icons mobile — removidos do drawer conforme solicitado */}
          <Link
            to="/contato"
            className="mt-3 inline-flex items-center justify-center gap-2 py-3 bg-bridge-red text-white text-sm font-bold rounded"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-bridge-red" aria-hidden="true"><Phone size={12} /></span>
            Fale Conosco
          </Link>
        </nav>
      )}
    </header>
  )
}

/* @section: footer */
function Footer() {
  return (
    <footer className="bg-dark-blue text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start lg:col-span-1">
          {/* @section: footer-brand-logo — logo branco oficial, 15% maior e alinhado à esquerda */}
          <img
            src={ASSETS.logoBranco}
            alt="REMAX Agro"
            className="mb-5 block h-auto self-start"
            style={{ width: '230px', objectFit: 'contain' }}
          />
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Todo agronegócio é, antes de mais nada, um negócio imobiliário.
          </p>
          {/* Redes sociais footer */}
          <div className="flex items-center gap-3 mb-6">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
          {/* Parceria Datagro — logo negativo (branco) -30% menor — NÃO ALTERAR SEM AUTORIZAÇÃO */}
          <div className="flex flex-col gap-2">
            <span className="text-white/40 text-xs uppercase tracking-widest">Em parceria com</span>
            <a
              href="https://portal.datagro.com/pt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-100 opacity-80 transition-opacity"
            >
              <img
                src={ASSETS.datagroNegativo}
                alt="DATAGRO"
                style={{ height: '22px', width: 'auto' }}
              />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Navegação</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mt-2 space-y-2 border-l border-white/15 pl-3">
                    {link.children.map(child => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          className="text-xs text-white/45 transition-colors hover:text-white"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Serviços</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/servicos#venda" className="hover:text-white transition-colors">Assessoria de Venda</Link></li>
            <li><Link to="/servicos#compra" className="hover:text-white transition-colors">Assessoria de Compra</Link></li>
            <li><Link to="/servicos#avaliacao" className="hover:text-white transition-colors">Avaliação de Propriedades</Link></li>
            <li><Link to="/servicos#operacoes" className="hover:text-white transition-colors">Operações Estruturadas</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contato</h4>
          <p className="text-white/50 text-xs leading-relaxed mb-4">
            Entre em contato com nossos especialistas e descubra como podemos transformar suas metas em realizações no agronegócio brasileiro.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-white/60 text-sm">
              <Phone size={14} className="mt-0.5 text-bridge-red flex-shrink-0" />
              <a href="tel:+5511915051212" className="hover:text-white transition-colors">
                +55 (11) 91505-1212
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/60 text-sm">
              <Mail size={14} className="mt-0.5 text-bridge-red flex-shrink-0" />
              <a href="mailto:contatoagro@remax.com.br" className="hover:text-white transition-colors">
                contatoagro@remax.com.br
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/60 text-sm">
              <MapPin size={14} className="mt-0.5 text-bridge-red flex-shrink-0" />
              <a href="https://agro.remax.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                AGRO.REMAX.COM.BR
              </a>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Clique e entre em contato</p>
            <div className="flex items-center gap-2">
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-green-700 text-white text-xs font-bold rounded hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={13} /> WhatsApp
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-xs font-semibold rounded hover:bg-white/20 transition-colors"
              >
                <Mail size={13} /> E-mail
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} REMAX Agro. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <img src={ASSETS.seloColor} alt="Corretor Certificado REMAX Commercial" className="h-12 w-auto opacity-90" />
            <div className="flex items-center gap-4 text-white/40 text-xs">
              <Link to="/politica-de-privacidade" className="hover:text-white/70 transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/termos-de-uso" className="hover:text-white/70 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* @section: leadster */
const LEADSTER_SCRIPT_ID = 'leadster-neurolead-script'
const LEADSTER_ACCOUNT_ID = 'lLZdETgxQb8iPXIbJi1rWtlrb'

function LeadsterWidget(): null {
  useEffect(() => {
    const leadsterWindow = window as typeof window & { neuroleadId?: string }
    leadsterWindow.neuroleadId = LEADSTER_ACCOUNT_ID

    if (document.getElementById(LEADSTER_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = LEADSTER_SCRIPT_ID
    script.src = 'https://cdn.leadster.com.br/neurolead/neurolead.min.js'
    script.charset = 'UTF-8'
    script.defer = true
    script.setAttribute('data-account', 'remaxagro')
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])
  return null
}

interface LayoutProps { children: React.ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">Ir para o conteúdo principal</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-[70px]">{children}</main>
      <Footer />
      <GoToTop />
      <LeadsterWidget />
    </>
  )
}
