import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import QuemSomos from '@/pages/QuemSomos'
import Servicos from '@/pages/Servicos'
import Corretores from '@/pages/Corretores'
import Newsletter from '@/pages/Newsletter'
import FazendaSantaHelena from '@/pages/FazendaSantaHelena'
import Contato from '@/pages/Contato'
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade'
import TermosUso from '@/pages/TermosUso'
import NotFound from '@/pages/NotFound'
import RouteMetadata from '@/components/RouteMetadata'
import { Toaster } from '@/components/ui/sonner'

function ScrollToTop(): null {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const targetId = decodeURIComponent(hash.slice(1))
    const headerOffset = 70
    let frame = 0
    let attempts = 0
    let previousTop: number | null = null
    let stableFrames = 0

    const scrollWhenReady = () => {
      const target = document.getElementById(targetId)

      if (target) {
        const top = Math.max(target.getBoundingClientRect().top + window.scrollY - headerOffset, 0)
        window.scrollTo({ top, left: 0, behavior: 'auto' })

        if (previousTop !== null && Math.abs(previousTop - top) < 1) stableFrames += 1
        else stableFrames = 0

        previousTop = top
        if (stableFrames >= 3) return
      }

      attempts += 1
      if (attempts < 60) frame = window.requestAnimationFrame(scrollWhenReady)
    }

    frame = window.requestAnimationFrame(scrollWhenReady)
    return () => window.cancelAnimationFrame(frame)
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
            <Route path="/fazendas/santa-helena" element={<FazendaSantaHelena />} />
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
