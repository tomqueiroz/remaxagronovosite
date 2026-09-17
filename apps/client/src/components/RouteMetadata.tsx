import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* @section: route-metadata */
const SITE_URL = 'https://agro.remax.com.br'
const SHARE_IMAGE = 'https://skyagent-artifacts.skywork.ai/router/agent/2026-06-24/prod_agent_ceac45f5-6d30-45e7-a920-9fcb97be3180/logo%20agro%20quadrado_7eed2aa722824289b703d58aebb78076.png'

const ROUTE_METADATA: Record<string, { title: string; description: string; canonical?: string }> = {
  '/': {
    title: 'Imóveis Rurais: Compra e Venda de Fazendas | REMAX Agro',
    description: 'Compra, venda, avaliação e operações estruturadas de imóveis rurais em todo o Brasil, com alcance REMAX e inteligência de dados DATAGRO.',
  },
  '/quem-somos': {
    title: 'Quem Somos | REMAX Agro — Imóveis Rurais no Brasil',
    description: 'Conheça a REMAX Agro, divisão especializada em imóveis rurais que une a rede global REMAX à inteligência do agronegócio da DATAGRO.',
  },
  '/servicos': {
    title: 'Serviços Agroimobiliários | REMAX Agro',
    description: 'Assessoria de venda, compra, avaliação de propriedades e operações estruturadas para decisões imobiliárias no agronegócio brasileiro.',
  },
  '/corretores': {
    title: 'Nossa Equipe | Especialistas em Imóveis Rurais | REMAX Agro',
    description: 'Encontre especialistas certificados em transações imobiliárias rurais, com conhecimento regional e visão estratégica do agronegócio.',
  },
  '/fazendas': {
    title: 'Fazendas | Propriedades Rurais | REMAX Agro',
    description: 'Conheça as propriedades rurais apresentadas pela REMAX Agro e acesse informações organizadas para uma primeira análise da oportunidade.',
  },
  '/fazendas/santa-helena': {
    title: 'Fazenda Santa Helena | Imóvel Rural | REMAX Agro',
    description: 'Conheça a Fazenda Santa Helena, ativo rural apresentado pela REMAX Agro com escala produtiva, infraestrutura e atendimento consultivo.',
  },
  '/newsletter': {
    title: 'Newsletter REMAX Agro | Inteligência do Agronegócio',
    description: 'Acompanhe análises, tendências e informações sobre o mercado agroimobiliário brasileiro na Newsletter REMAX Agro.',
  },
  '/contato': {
    title: 'Contato | Especialistas em Imóveis Rurais | REMAX Agro',
    description: 'Fale com um especialista REMAX Agro sobre compra, venda, avaliação e operações estruturadas de imóveis rurais.',
  },
  '/politica-de-privacidade': {
    title: 'Política de Privacidade | REMAX Agro',
    description: 'Consulte a Política de Privacidade da REMAX Agro e saiba como os dados pessoais são tratados neste site.',
  },
  '/termos-de-uso': {
    title: 'Termos de Uso | REMAX Agro',
    description: 'Consulte os Termos de Uso aplicáveis à utilização do site e dos serviços informativos da REMAX Agro.',
  },
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

export default function RouteMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = ROUTE_METADATA[pathname] ?? {
      title: 'Página não encontrada | REMAX Agro',
      description: 'A página solicitada não foi encontrada no site da REMAX Agro.',
      canonical: '/',
    }
    const canonical = `${SITE_URL}${metadata.canonical ?? pathname}`

    document.title = metadata.title
    upsertMeta('name', 'description', metadata.description)
    upsertMeta('name', 'twitter:title', metadata.title)
    upsertMeta('name', 'twitter:description', metadata.description)
    upsertMeta('name', 'twitter:image', SHARE_IMAGE)
    upsertMeta('property', 'og:title', metadata.title)
    upsertMeta('property', 'og:description', metadata.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', SHARE_IMAGE)
    upsertMeta('property', 'og:image:alt', 'REMAX Agro — compra e venda de imóveis rurais no Brasil')
    upsertCanonical(canonical)

    const structuredData = document.getElementById('structured-data-jsonld')
    if (structuredData) {
      structuredData.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'REMAX Agro',
        description: metadata.description,
        url: canonical,
      })
    }
  }, [pathname])

  return null
}
