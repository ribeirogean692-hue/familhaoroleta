'use client'

import { useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

const onlyDigits = (value: string) => value.replace(/\D/g, '')

function formatCpf(value: string) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2')
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const initialValues = {
  nome: '',
  cpf: '',
  whatsapp: '',
  endereco: '',
  banco: '',
  agencia: '',
  conta: '',
}

type Values = typeof initialValues

export function RedemptionForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Values>(initialValues)
  const [submitted, setSubmitted] = useState(false)

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const inputClass =
    'w-full rounded-xl border-2 border-primary/15 bg-background/5 px-3 py-2.5 font-sans text-sm text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-primary/60'

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resgate-titulo" className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/80 p-3 backdrop-blur-sm md:items-center md:p-6">
      <div className="my-auto w-full max-w-lg rounded-[1.75rem] border-4 border-accent bg-card p-5 text-primary shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50">Resgate de prêmio</p>
            <h2 id="resgate-titulo" className="mt-1 font-sans text-2xl font-black leading-none md:text-3xl">R$ 50.000</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar resgate" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 size={44} className="text-primary" aria-hidden="true" />
            <h3 className="font-sans text-xl font-black">Recebemos sua solicitação de resgate</h3>
            <p className="max-w-xs text-sm leading-6 text-primary/65">Aguarde contato em até 48 horas para finalizar o seu resgate.</p>
          </div>
        ) : (
          <form
            className="mt-5 flex flex-col gap-3.5"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nome" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Nome completo</label>
              <input id="nome" name="nome" autoComplete="off" placeholder="Ex.: Maria Souza Andrade" value={values.nome} onChange={(event) => update('nome', event.target.value)} className={inputClass} required />
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cpf" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">CPF</label>
                <input id="cpf" name="cpf" inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" value={values.cpf} onChange={(event) => update('cpf', formatCpf(event.target.value))} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="whatsapp" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">WhatsApp</label>
                <input id="whatsapp" name="whatsapp" inputMode="tel" autoComplete="off" placeholder="(00) 00000-0000" value={values.whatsapp} onChange={(event) => update('whatsapp', formatPhone(event.target.value))} className={inputClass} required />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="endereco" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Endereço completo</label>
              <textarea id="endereco" name="endereco" rows={2} autoComplete="off" placeholder="Rua, número, complemento, bairro, cidade e CEP" value={values.endereco} onChange={(event) => update('endereco', event.target.value)} className={`${inputClass} resize-none`} required />
            </div>

            <fieldset className="flex flex-col gap-3.5 rounded-xl border-2 border-primary/10 p-3">
              <legend className="px-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Dados para pagamento</legend>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="banco" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Banco</label>
                <input id="banco" name="banco" autoComplete="off" placeholder="Ex.: Banco Exemplo" value={values.banco} onChange={(event) => update('banco', event.target.value)} className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="agencia" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Agência</label>
                  <input id="agencia" name="agencia" inputMode="numeric" autoComplete="off" placeholder="0000" value={values.agencia} onChange={(event) => update('agencia', onlyDigits(event.target.value).slice(0, 5))} className={inputClass} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="conta" className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60">Conta</label>
                  <input id="conta" name="conta" inputMode="numeric" autoComplete="off" placeholder="00000-0" value={values.conta} onChange={(event) => update('conta', onlyDigits(event.target.value).slice(0, 8))} className={inputClass} required />
                </div>
              </div>
            </fieldset>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="font-bold">Prêmio:</p>
              <p>{values.premio}</p>
            </div>

            <button type="submit" className="mt-1 w-full rounded-full bg-accent px-6 py-3.5 font-sans text-sm font-black uppercase tracking-wide text-primary shadow-[0_5px_0_var(--color-primary)] transition-transform hover:-translate-y-0.5">
              Concluir resgate
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
