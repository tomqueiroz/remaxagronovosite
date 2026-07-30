import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface LeadFormProps {
  source?: string
  title?: string
  subtitle?: string
  light?: boolean
}

export default function LeadForm({
  source = 'website',
  title = 'Fale com um Especialista',
  subtitle = 'Preencha o formulário e entraremos em contato em até 24 horas.',
  light = false,
}: LeadFormProps) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', profile: '' })

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) { toast.error('Por favor, preencha nome e e-mail.'); return }
    setLoading(true)
    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message || null,
        profile: form.profile || null,
        source,
        created_at: new Date().toISOString(),
      })
      if (error) {
        console.error('Supabase insert error:', error)
        toast.error('Erro ao enviar. Por favor, tente novamente.')
      } else {
        toast.success('✓ Mensagem enviada! Nossa equipe entrará em contato em até 24h.')
        setDone(true)
        setForm({ name: '', email: '', phone: '', message: '', profile: '' })
        // Reset done state after 8s to allow re-submission
        setTimeout(() => setDone(false), 8000)
      }
    } catch (err) {
      console.error('Form submit error:', err)
      toast.error('Erro de conexão. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Input classes — fundo branco/light vs dark
  const inputBase = `w-full px-4 py-3 rounded text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-bridge-red`
  const inputLight = `${inputBase} bg-white border-gray-300 text-gray-800 placeholder:text-gray-400`
  const inputDark  = `${inputBase} bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15`
  const inputClass = light ? inputLight : inputDark

  // Select classes — no modo light, força texto cinza escuro explicitamente
  const selectLight = `${inputBase} bg-white border-gray-300 text-gray-600 cursor-pointer`
  const selectDark  = `${inputBase} bg-white/10 border-white/20 text-white/80 cursor-pointer`
  const selectClass = light ? selectLight : selectDark

  const labelClass = `block text-xs font-semibold uppercase tracking-widest mb-1 ${light ? 'text-gray-500' : 'text-white/60'}`

  if (done) {
    return (
      <div className={`rounded-xl p-10 text-center ${light ? 'bg-white border border-gray-100' : 'bg-white/5 border border-white/10'}`}>
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-black mb-2 ${light ? 'text-dark-blue' : 'text-white'}`}>Mensagem recebida!</h3>
        <p className={`text-sm ${light ? 'text-gray-500' : 'text-white/60'}`}>
          Nossa equipe entrará em contato em até 24 horas pelo e-mail ou telefone informados.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="mb-6">
        <h3 className={`text-2xl font-black mb-2 ${light ? 'text-dark-blue' : 'text-white'}`}>{title}</h3>
        <p className={`text-sm ${light ? 'text-gray-500' : 'text-white/60'}`}>{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nome *</label>
          <input name="name" value={form.name} onChange={handle} placeholder="Seu nome completo" className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>E-mail *</label>
          <input name="email" type="email" value={form.email} onChange={handle} placeholder="seu@email.com" className={inputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Telefone / WhatsApp</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="+55 (00) 00000-0000" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Perfil</label>
          {/* Select com texto cinza médio legível sobre fundo branco no modo light */}
          <select name="profile" value={form.profile} onChange={handle} className={selectClass}>
            <option value="" disabled style={{ color: '#9ca3af' }}>Selecione seu perfil...</option>
            <option value="vendedor">Quero vender uma propriedade</option>
            <option value="comprador">Quero comprar / investir</option>
            <option value="avaliacao">Preciso de avaliação técnica</option>
            <option value="investidor">Investidor institucional</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Mensagem</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          rows={4}
          placeholder="Conte-nos sobre sua propriedade ou objetivo..."
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-bridge-red text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : 'Enviar Mensagem'}
      </button>

      <p className={`text-xs text-center ${light ? 'text-gray-400' : 'text-white/40'}`}>
        Seus dados estão seguros. Respondemos em até 24 horas.
      </p>
    </form>
  )
}
