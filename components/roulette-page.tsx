'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ChevronRight, Gift, Play, ShieldCheck, Sparkles, Star, Trophy, Users, WandSparkles } from 'lucide-react'
import { RedemptionForm } from '@/components/redemption-form'

const prizes = [
  { label: 'R$ 1.000', short: 'R$ 1 mil' },
  { label: 'R$ 20', short: 'R$ 20' },
  { label: 'R$ 500', short: 'R$ 500' },
  { label: 'Gire de novo', short: 'De novo' },
  { label: 'R$ 50.000', short: 'R$ 50 mil' },
  { label: 'R$ 50', short: 'R$ 50' },
  { label: 'R$ 2.000', short: 'R$ 2 mil' },
  { label: 'Gire de novo', short: 'De novo' },
]

const celebrities = [
  { name: 'Ana Maria Braga', role: 'Novas experiências', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8qD7Dqt1Vd2yGBfb7jhCjTQ8HMRJvr.png' },
  { name: 'Angélica', role: 'Encontros inesquecíveis', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ure2PPyBqGHa2N61cYA09kEKbO8Kge.png' },
  { name: 'Thiaguinho', role: 'Momentos para guardar', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LWOzPJ6uEKOTGaST6AMPy8JGownotQ.png' },
  { name: 'Gio Antonelli', role: 'Experiências únicas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XjY1KGGXweXnpDfvwk8QGqmMq9lKba.png' },
  { name: 'Bianca Boca Rosa', role: 'Surpresas especiais', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygdHvUmqYwNaloGlWX96iYRWe103h3.png' },
]

const FREE_SPINS_KEY = 'familhao-giros-gratis'
const TOTAL_FREE_SPINS = 3

function readStoredFreeSpins() {
  try {
    const stored = window.localStorage.getItem(FREE_SPINS_KEY)
    if (stored === null) return TOTAL_FREE_SPINS
    const parsed = Number.parseInt(stored, 10)
    if (!Number.isFinite(parsed)) return TOTAL_FREE_SPINS
    return Math.min(Math.max(parsed, 0), TOTAL_FREE_SPINS)
  } catch {
    return TOTAL_FREE_SPINS
  }
}

export function RoulettePage() {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  // começa com o total no servidor e no primeiro paint do cliente; o saldo
  // salvo é restaurado após a montagem para não causar mismatch de hidratação
  const [freeSpins, setFreeSpins] = useState(TOTAL_FREE_SPINS)
  const [redeeming, setRedeeming] = useState(false)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    setFreeSpins(readStoredFreeSpins())
    setRestored(true)
  }, [])

  useEffect(() => {
    if (!restored) return
    try {
      window.localStorage.setItem(FREE_SPINS_KEY, String(freeSpins))
    } catch {
      // armazenamento indisponível (ex.: navegação privada): o saldo segue apenas em memória
    }
  }, [restored, freeSpins])

  function spin() {
    if (spinning || freeSpins <= 0) return
    const nextSpin = TOTAL_FREE_SPINS - freeSpins + 1
    const winner = nextSpin <= 2 ? 3 : 4
    const segment = 360 / prizes.length
    const target = 360 * 6 + (360 - winner * segment - segment / 2)
    setSpinning(true)
    setResult(null)
    setFreeSpins((current) => current - 1)
    setRotation((current) => current + target)
    window.setTimeout(() => {
      setResult(prizes[winner].label)
      setSpinning(false)
    }, 4200)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a href="#inicio" className="inline-flex items-center" aria-label="Famílhao início">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K7FapATf0XH2EOoXgqROfxf6Wx1mAr.png" alt="FAMÍLHÃO" className="h-12 w-auto md:h-14" />
        </a>
        <nav className="hidden items-center gap-7 font-mono text-xs font-bold uppercase tracking-[0.14em] text-foreground/75 md:flex" aria-label="Navegação principal">
          <a href="#experiencias" className="transition-colors hover:text-accent">Experiências</a>
          <a href="#familia" className="transition-colors hover:text-accent">A família</a>
          <a href="#como-funciona" className="transition-colors hover:text-accent">Como funciona</a>
        </nav>
      </header>

      <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-4 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pb-24 md:pt-12">
        <div className="relative z-10 text-center md:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-primary/50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent"><Sparkles size={14} aria-hidden="true" /> A sorte pode virar hoje</p>
          <h1 className="max-w-xl font-sans text-5xl font-black leading-[0.94] tracking-[-0.06em] text-balance md:text-7xl">Gire a roleta.<br /><span className="text-accent">Ganhe de verdade.</span></h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-7 text-foreground/75 md:mx-0">Uma chance rápida, divertida e cheia de prêmios para deixar o seu dia mais feliz.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm"><Trophy size={17} className="text-primary" /> Prêmios instantâneos</div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm"><ShieldCheck size={17} className="text-primary" /> Jogo seguro</div>
          </div>
          <a href="#como-funciona" className="mt-9 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent underline decoration-accent/40 underline-offset-8">Descubra como jogar <ArrowDown size={14} /></a>
        </div>

        <div className="relative flex min-h-[430px] items-center justify-center md:min-h-[560px]">
          <div className="absolute size-[88vw] max-h-[500px] max-w-[500px] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-2 h-6 w-[65vw] max-w-80 rounded-[50%] bg-primary/35 blur-xl md:bottom-10 md:h-8" aria-hidden="true" />
          <div className="relative flex size-[88vw] max-h-[345px] max-w-[345px] items-center justify-center rounded-full border-[6px] border-primary bg-primary p-1.5 shadow-[0_12px_0_rgba(37,12,83,0.4),0_22px_45px_rgba(37,12,83,0.38)] md:size-[500px] md:border-[12px] md:p-3">
            <div className="absolute inset-2 rounded-full border-2 border-accent/60 md:inset-3" aria-hidden="true" />
            <div className="absolute -top-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center drop-shadow-[0_5px_4px_rgba(37,12,83,0.5)]" aria-hidden="true"><div className="h-3 w-10 rounded-t-full bg-card md:w-14" /><div className="h-0 w-0 border-x-[20px] border-t-[42px] border-x-transparent border-t-accent md:border-x-[26px] md:border-t-[52px]" /></div>
            <div className="relative size-full rounded-full border-[6px] border-accent/90 bg-card p-2 transition-transform duration-[4200ms] ease-[cubic-bezier(0.12,0.75,0.2,1)] md:border-[8px] md:p-3" style={{ transform: `rotate(${rotation}deg)`, boxShadow: 'inset 0 0 0 3px rgba(54,16,112,.45), inset 0 0 35px rgba(54,16,112,.35)' }} aria-label="Roleta de prêmios">
              <div className="relative size-full overflow-hidden rounded-full border-2 border-primary/25" style={{ background: 'conic-gradient(from -22.5deg, var(--color-secondary) 0deg 45deg, var(--color-accent) 45deg 90deg, var(--color-secondary) 90deg 135deg, var(--color-accent) 135deg 180deg, var(--color-secondary) 180deg 225deg, var(--color-accent) 225deg 270deg, var(--color-secondary) 270deg 315deg, var(--color-accent) 315deg 360deg)' }}>
                <div className="pointer-events-none absolute inset-0 opacity-45" style={{ background: 'repeating-conic-gradient(from -22.5deg, transparent 0deg 43.6deg, var(--color-primary) 43.6deg 45deg)' }} aria-hidden="true" />
                <svg className="pointer-events-none absolute inset-0 z-10 size-full" viewBox="0 0 100 100" aria-hidden="true">{prizes.map((prize, index) => <text key={`${prize.label}-${index}`} x="50" y="16" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${index * 45} 50 50)`} className="fill-primary font-sans text-[4.1px] font-black uppercase tracking-[0.08px]">{prize.short}</text>)}</svg>
                <div className="absolute left-1/2 top-1/2 flex size-[82px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[6px] border-accent bg-primary text-center font-sans text-xs font-black uppercase leading-3 text-accent shadow-[0_5px_0_rgba(37,12,83,0.45)] md:size-[108px] md:text-sm">GIRE<br />AQUI<span className="mt-1 text-[8px] font-bold text-card/60 md:text-[9px]">SUA CHANCE</span></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-14 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-card/40 bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent shadow-lg">{freeSpins > 0 ? `${freeSpins} giros grátis` : 'Giros encerrados'}</div>
          <button onClick={freeSpins === 0 ? () => setRedeeming(true) : spin} disabled={spinning} className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border-4 border-card bg-accent px-7 py-3.5 font-sans text-base font-black uppercase tracking-wide text-primary shadow-[0_6px_0_var(--color-primary),0_12px_20px_rgba(37,12,83,0.3)] transition-all hover:-translate-y-1 hover:brightness-105 disabled:cursor-wait disabled:opacity-70 md:px-14 md:py-4 md:text-lg" aria-label={freeSpins === 0 ? 'Resgatar prêmio' : 'Girar roleta'}>{spinning ? 'Girando...' : freeSpins === 0 ? 'Resgatar prêmio' : 'Girar agora'}</button>
        </div>
      </section>

      <section id="beneficios" className="bg-secondary px-5 py-16 text-primary md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] border-2 border-primary/10 bg-card px-6 py-8 md:grid-cols-[1fr_0.95fr] md:px-12 md:py-12">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary/55">Um clube para chamar de seu</p>
            <h2 className="mt-4 font-sans text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">O clube de benefícios da família brasileira.</h2>
            <p className="mt-6 text-lg leading-8 text-primary/70">No FAMÍLHÃO, você tem a chance de ficar milionário todo mês e seu dinheiro volta em produtos, serviços e experiências exclusivas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Produtos que fazem sentido', 'Serviços para facilitar', 'Experiências exclusivas'].map((benefit) => <span key={benefit} className="rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-accent">{benefit}</span>)}
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m14lBl43uwygd55U25wZApwpjhuYBT.png" alt="Avião, sacola de compras, panela, óculos, doce e símbolo de porcentagem representando benefícios" className="w-full max-w-xl object-contain" /></div>
        </div>
      </section>

      <section id="familia" className="bg-primary px-5 py-20 text-card md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">A família aumentou</p><h2 className="mt-4 font-sans text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">Viva experiências únicas com suas celebridades favoritas.</h2><p className="mt-5 max-w-xl text-lg leading-7 text-card/70">Mais encontros, mais histórias para contar e mais motivos para celebrar junto. O FAMÍLHÃO ficou ainda maior.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{celebrities.map((celebrity, index) => <article key={celebrity.name} className="group relative overflow-hidden rounded-[2rem] border border-card/15 bg-card/10 p-3 transition-transform hover:-translate-y-2"><div className="relative overflow-hidden rounded-[1.5rem]"><img src={celebrity.image} alt={`Celebridade ${celebrity.name}`} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute right-3 top-3 font-mono text-xs text-card/80">0{index + 1}</span></div><div className="px-2 pb-2 pt-4"><h3 className="font-sans text-xl font-black leading-none">{celebrity.name}</h3><p className="mt-2 text-sm text-card/60">{celebrity.role}</p></div></article>)}</div>
        </div>
      </section>

      <section id="experiencias" className="bg-card px-5 py-20 text-primary md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary/55">Muito além da roleta</p><h2 className="mt-3 max-w-2xl font-sans text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">Aqui, cada giro pode virar uma memória.</h2></div><WandSparkles className="size-12 text-primary/30" /></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Dinheiro no bolso', 'Momentos em família', 'Encontros especiais', 'Surpresas toda semana'].map((item, index) => <div key={item} className="rounded-[1.5rem] border-2 border-primary/10 p-6"><span className="font-mono text-sm font-bold text-primary/45">0{index + 1}</span><h3 className="mt-14 font-sans text-2xl font-black leading-none">{item}</h3><p className="mt-3 text-sm leading-6 text-primary/60">Prêmios e experiências pensados para celebrar o que realmente importa.</p></div>)}</div></div>
      </section>

      <section id="como-funciona" className="border-y border-primary/10 bg-secondary px-5 py-20 text-primary md:px-10 md:py-24"><div className="mx-auto max-w-6xl text-center"><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary/55">É fácil participar</p><h2 className="mt-3 font-sans text-4xl font-black tracking-[-0.05em] md:text-5xl">Três passos e muita sorte.</h2><div className="mt-12 grid gap-8 md:grid-cols-3">{[['1', 'Entre na brincadeira', 'Faça seu cadastro para liberar a sua chance.'], ['2', 'Gire a roleta', 'Clique em girar e deixe a sorte escolher.'], ['3', 'Comemore', 'Confira o resultado e aproveite seu prêmio.']].map(([number, title, description]) => <div key={number} className="flex flex-col items-center"><div className="flex size-16 items-center justify-center rounded-full bg-primary font-sans text-2xl font-black text-accent">{number}</div><h3 className="mt-5 font-sans text-xl font-black">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-primary/65">{description}</p></div>)}</div></div></section>

      <section className="px-5 py-16 md:px-10"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-[2rem] border border-accent/30 bg-primary px-7 py-10 text-center md:flex-row md:px-12 md:text-left"><div><div className="flex items-center justify-center gap-1 text-accent md:justify-start">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="currentColor" />)}</div><h2 className="mt-3 font-sans text-3xl font-black text-card">A diversão é para toda a família.</h2><p className="mt-2 text-card/65">Jogue, compartilhe e torça junto.</p></div><button onClick={spin} className="flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-sans font-black text-primary shadow-[0_6px_0_rgba(255,248,237,0.18)]">Girar minha roleta <ChevronRight /></button></div></section>

      <footer className="border-t border-primary/10 bg-card px-5 py-12 text-primary md:px-10 md:py-16"><div className="mx-auto flex max-w-7xl flex-col gap-8"><div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K7FapATf0XH2EOoXgqROfxf6Wx1mAr.png" alt="FAMÍLHÃO" className="h-12 w-auto self-start rounded-md bg-primary px-3 py-2" /><div className="max-w-2xl text-sm leading-6 text-primary/70"><p className="font-bold text-primary">Engajamento e Intermediação S.A – CNPJ 49.520.113/0001-07</p><p>Alameda Rio Negro, 585, Bloco C, 12º Andar – CEP 06454-000, Barueri, São Paulo</p></div></div><div className="border-t border-primary/10 pt-6 text-xs leading-5 text-primary/55"><p>Participação válida para maiores de 18 anos, capazes, com CPF regular e residentes no Brasil, nas promoções: (i) FAMILHÃO - MILHÕES DE BOAS NOTÍCIAS – Certificado de Autorização SPA/MF nº 04.048228/2026, Assinatura Familhão e/ou Pacotes Extras adquiridos entre 25/03/26 e 26/07/26, com sorteios mensais de R$ 1 milhão, entregue via certificado de ouro. (ii) ACHOU, LEVOU - Certificado de Autorização SPA/MF nº 05.047975/2026, Assinatura Achou, Levou do Familhão, adquirida entre 01/03/26 e 31/05/26, 1 chance de concorrer aos brindes de at�� R$500 em créditos no catálogo Achou, Levou; (iii) VIAGEM FAMILHÃO – Certificado de Autorização SPA/MF nº 04.047756/2026, Assinatura Familhão e/ou Pacotes Extras adquiridos entre 09/02/2026 e 31/05/2026, com sorteios semanais de 1 pacote de viagem (Cruzeiro no Brasil, Resort no Brasil ou Orlando-EUA) para o contemplado + 1 acompanhante adulto e 2 crianças OU para o contemplado + 2 acompanhantes adultos.</p><p className="mt-4">Antes de participar, consulte condições de participação, datas dos sorteios, limites de participação por CPF e premiação nos Regulamentos em www.familhao.com.br e app.achoulevou.com.br/painel/achou-levou. Imagens ilustrativas.</p></div><div className="flex flex-col gap-2 text-xs text-primary/45 md:flex-row md:items-center md:justify-between"><span>© Copyright 2026 – Familhão. Todos os direitos reservados.</span><span className="inline-flex items-center gap-2"><Sparkles size={14} /> Jogue com responsabilidade.</span></div></div></footer>

      {result && !redeeming && <div role="dialog" aria-live="polite" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-primary/70 p-4 backdrop-blur-sm"><div className="my-auto max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[2rem] border-4 border-accent bg-card p-6 text-center shadow-2xl md:p-8"><div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-accent text-primary"><Trophy size={32} /></div><p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary/60">{result === 'Gire de novo' ? 'Mais uma chance' : 'Resultado da roleta'}</p><h2 className="mt-2 font-sans text-4xl font-black text-primary">{result}</h2><p className="mt-3 text-foreground/65">{result === 'Gire de novo' ? 'Você ainda tem uma rodada grátis disponível.' : 'Parabéns! Você chegou ao resultado final da sua rodada.'}</p>{result === 'R$ 50.000' && <button type="button" onClick={() => setRedeeming(true)} className="mt-7 w-full rounded-full bg-accent px-7 py-3.5 font-sans font-black text-primary shadow-[0_5px_0_var(--color-primary)]">Resgatar prêmio de R$ 50 mil</button>}<button onClick={() => setResult(null)} className="mt-4 rounded-full bg-primary px-7 py-3 font-sans font-black text-accent">Continuar</button></div></div>}

      {redeeming && <RedemptionForm onClose={() => setRedeeming(false)} />}
    </main>
  )
}
