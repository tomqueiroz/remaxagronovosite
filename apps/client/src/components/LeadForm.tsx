import { useEffect, useId, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface ProfileOption {
  value: string
  label: string
}

interface LeadFormProps {
  source?: string
  title?: string
  subtitle?: string
  light?: boolean
  profileLabel?: string
  profileOptions?: ReadonlyArray<ProfileOption>
}

type LeadFormState = {
  name: string
  email: string
  phone: string
  message: string
  profile: string
}

const EMPTY_FORM: LeadFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  profile: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_PROFILE_OPTIONS: ReadonlyArray<ProfileOption> = [
  { value: 'vendedor', label: 'Quero vender uma propriedade' },
  { value: 'comprador', label: 'Quero comprar / investir' },
  { value: 'avaliacao', label: 'Preciso de avaliação técnica' },
  { value: 'investidor', label: 'Investidor institucional' },
  { value: 'outro', label: 'Outro' },
]

export default function LeadForm({
  source = 'website',
  title = 'Fale com um Especialista',
  subtitle = 'Preencha o formulário e entraremos em contato em até 24 horas.',
  light = false,
  profileLabel = 'Perfil',
  profileOptions = DEFAULT_PROFILE_OPTIONS,
}: LeadFormProps) {
  const formId = useId()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState<LeadFormState>(EMPTY_FORM)

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(() => setDone(false), 8000)
    return () => window.clearTimeout(timer)
  }, [done])

  const handle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormError('')
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name || !email) {
      const message = 'Por favor, preencha nome e e-mail.'
      setFormError(message)
      toast.error(message)
      return
    }

    if (!EMAIL_PATTERN.test(email)) {
      const message = 'Informe um endereço de e-mail válido.'
      setFormError(message)
      toast.error(message)
      return
    }

    setLoading(true)
    setFormError('')
    try {
      const { error } = await supabase.from('leads').insert({
        name,
        email,
        phone: form.phone.trim() || null,
        message: form.message.trim() || null,
        profile: form.profile || null,
        source,
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Supabase insert error:', error)
        const message = 'Erro ao enviar. Por favor, tente novamente.'
        setFormError(message)
        toast.error(message)
      } else {
        toast.success('Mensagem enviada! Nossa equipe entrará em contato em até 24h.')
        setDone(true)
        setForm(EMPTY_FORM)
      }
    } catch (error) {
      console.error('Form submit error:', error)
      const message = 'Erro de conexão. Por favor, tente novamente.'
      setFormError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const inputBase = 'w-full rounded border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-bridge-red'
  const inputLight = `${inputBase} border-gray-300 bg-white text-gray-800 placeholder:text-gray-400`
  const inputDark = `${inputBase} border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:bg-white/15`
  const inputClass = light ? inputLight : inputDark
  const selectLight = `${inputBase} cursor-pointer border-gray-300 bg-white text-gray-600`
  const selectDark = `${inputBase} cursor-pointer border-white/20 bg-white/10 text-white/80`
  const selectClass = light ? selectLight : selectDark
  const labelClass = `mb-1 block text-xs font-semibold uppercase tracking-widest ${light ? 'text-gray-500' : 'text-white/60'}`

  if (done) {
    return (
      <div
        className={`rounded-xl p-10 text-center ${light ? 'border border-gray-100 bg-white' : 'border border-white/10 bg-white/5'}`}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`mb-2 text-xl font-black ${light ? 'text-dark-blue' : 'text-white'}`}>Mensagem recebida!</h3>
        <p className={`text-sm ${light ? 'text-gray-500' : 'text-white/60'}`}>
          Nossa equipe entrará em contato em até 24 horas pelo e-mail ou telefone informados.
        </p>
      </div>
    )
  }

  const nameId = `${formId}-name`
  const emailId = `${formId}-email`
  const phoneId = `${formId}-phone`
  const profileId = `${formId}-profile`
  const messageId = `${formId}-message`
  const errorId = `${formId}-error`

  return (
    <form onSubmit={submit} className="space-y-4" aria-describedby={formError ? errorId : undefined} noValidate>
      <div className="mb-6">
        <h3 className={`mb-2 text-2xl font-black ${light ? 'text-dark-blue' : 'text-white'}`}>{title}</h3>
        <p className={`text-sm ${light ? 'text-gray-500' : 'text-white/60'}`}>{subtitle}</p>
      </div>

      {formError && (
        <p id={errorId} role="alert" className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {formError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className={labelClass}>Nome *</label>
          <input
            id={nameId}
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Seu nome completo"
            autoComplete="name"
            className={inputClass}
            required
            aria-required="true"
            aria-invalid={Boolean(formError && !form.name.trim())}
          />
        </div>
        <div>
          <label htmlFor={emailId} className={labelClass}>E-mail *</label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="seu@email.com"
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            required
            aria-required="true"
            aria-invalid={Boolean(formError && (!form.email.trim() || !EMAIL_PATTERN.test(form.email.trim())))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={phoneId} className={labelClass}>Telefone / WhatsApp</label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handle}
            placeholder="+55 (00) 00000-0000"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={profileId} className={labelClass}>{profileLabel}</label>
          <select id={profileId} name="profile" value={form.profile} onChange={handle} autoComplete="off" className={selectClass}>
            <option value="" disabled style={{ color: '#9ca3af' }}>Selecione seu perfil...</option>
            {profileOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className={labelClass}>Mensagem</label>
        <textarea
          id={messageId}
          name="message"
          value={form.message}
          onChange={handle}
          rows={4}
          placeholder="Conte-nos sobre sua propriedade ou objetivo..."
          autoComplete="off"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded bg-bridge-red py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : 'Enviar Mensagem'}
      </button>

      <p className={`text-center text-xs ${light ? 'text-gray-400' : 'text-white/40'}`}>
        Seus dados estão seguros. Respondemos em até 24 horas.
      </p>
    </form>
  )
}
