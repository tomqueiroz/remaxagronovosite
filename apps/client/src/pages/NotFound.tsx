import { Link } from 'react-router-dom'

/* @section: not-found */
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-off-white px-6 py-24 text-center">
      <div className="max-w-xl">
        <span className="section-divider mx-auto" />
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-bridge-red">Página não encontrada</p>
        <h1 className="mt-4 text-4xl font-black text-dark-blue sm:text-5xl">O endereço que você acessou não existe.</h1>
        <p className="mt-5 text-base leading-relaxed text-gray-500">Volte para a Home ou escolha uma das áreas do site para continuar.</p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center rounded bg-bridge-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-dark-red">
          Voltar para a Home
        </Link>
      </div>
    </section>
  )
}
