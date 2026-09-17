import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import QuemSomos from '@/pages/QuemSomos'
import Servicos from '@/pages/Servicos'
import Corretores from '@/pages/Corretores'
import Newsletter from '@/pages/Newsletter'
import Fazendas from '@/pages/Fazendas'
import FazendaItapirapua from '@/pages/FazendaItapirapua'
import Contato from '@/pages/Contato'
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade'
import TermosUso from '@/pages/TermosUso'
import NotFound from '@/pages/NotFound'
import RouteMetadata from '@/components/RouteMetadata'
import { Toaster } from '@/components/ui/sonner'

/* @section: route-scroll-positioning */
export function ScrollToTop(): null {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const targetId = decodeURIComponent(hash.slice(1))
    const headerOffset = 70
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    let frame = 0
    let attempts = 0
    let stableFrames = 0
    const minimumTrackingFrames = 60
    let previousViewportTop: number | null = null
    let finished = false

    root.style.scrollBehavior = 'auto'

    const finish = () => {
      if (finished) return
      finished = true
      root.style.scrollBehavior = previousScrollBehavior
    }

    const scrollWhenReady = () => {
      const target = document.getElementById(targetId)

      if (target) {
        const viewportTop = target.getBoundingClientRect().top
        const delta = viewportTop - headerOffset

        if (Math.abs(delta) > 1) {
          window.scrollTo({
            top: Math.max(window.scrollY + delta, 0),
            left: 0,
            behavior: 'auto',
          })
        }

        const observedTop = target.getBoundingClientRect().top
        const isCorrectlyPositioned = Math.abs(observedTop - headerOffset) <= 1
        const isStable = previousViewportTop !== null && Math.abs(previousViewportTop - observedTop) <= 1
        stableFrames = isCorrectlyPositioned && isStable ? stableFrames + 1 : 0
        previousViewportTop = observedTop

        if (stableFrames >= 3 && attempts >= minimumTrackingFrames) {
          finish()
          return
        }
      }

      attempts += 1
      if (attempts < 180) frame = window.requestAnimationFrame(scrollWhenReady)
      else finish()
    }

    frame = window.requestAnimationFrame(scrollWhenReady)
    return () => {
      window.cancelAnimationFrame(frame)
      finish()
    }
  }, [pathname, hash])

  return null
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <RouteMetadata />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/servicos" element={<Servicos />} />
            {/* @section: legacy-service-redirects */}
            <Route path="/quero-vender" element={<Navigate to="/servicos#venda" replace />} />
            <Route path="/quero-comprar" element={<Navigate to="/servicos#compra" replace />} />
            <Route path="/corretores" element={<Corretores />} />
            <Route path="/fazendas" element={<Fazendas />} />
            <Route path="/fazendas/itapirapua" element={<FazendaItapirapua />} />
            {/* @section: legacy-farm-redirect */}
            <Route path="/fazendas/santa-helena" element={<Navigate to="/fazendas/itapirapua" replace />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
