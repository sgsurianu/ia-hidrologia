import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-8 max-w-3xl">
      {kicker ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan sm:tracking-[0.22em]">{kicker}</p>
      ) : null}
      <h1 className="page-title">{title}</h1>
      {subtitle ? (
        <p className="mt-3 max-w-full text-sm leading-relaxed text-mist sm:text-base">{subtitle}</p>
      ) : null}
    </header>
  )
}

export function Section({
  title,
  children,
  delay = 0,
}: {
  title: string
  children: ReactNode
  source?: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="mb-5 min-w-0">
      <section className="card">
        <h2 className="section-title mb-4">{title}</h2>
        {children}
      </section>
    </Reveal>
  )
}

export function Callout({
  children,
  tone = 'info',
}: {
  children: ReactNode
  tone?: 'info' | 'warn'
}) {
  const cls =
    tone === 'warn'
      ? 'border-amber/40 bg-amber/10 text-amber'
      : 'border-cyan/30 bg-cyan/10 text-cyan-2'
  return <div className={`min-w-0 rounded-2xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>{children}</div>
}
