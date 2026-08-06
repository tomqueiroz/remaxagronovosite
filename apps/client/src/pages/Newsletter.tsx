/**
 * Newsletter — mostra o site original (remaxagronewsletter.skywork.website) em iframe full-height
 * com o header e footer do site novo (via Layout.tsx) por cima.
 * NÃO adicionar hero, intro ou outras seções — o conteúdo fica inteiro no iframe.
 */
export default function Newsletter() {
  return (
    <div className="w-full" style={{ minHeight: 'calc(100vh - 70px)' }}>
      <iframe
        src="https://remaxagronewsletter.skywork.website"
        title="REMAX Agro Newsletter — DATAGRO"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 70px)', display: 'block' }}
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  )
}
