import { Link, useSearchParams } from 'react-router-dom'
import { meta } from '../content/meta'
import { improvementVsPersistence } from '../content/results'
import { Section } from '../components/ui'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Reveal } from '../components/Reveal'
import { ResultsExplorer } from '../components/ResultsExplorer'
import type { Horizon } from '../content/types'

export function HomePage() {
  const [params, setParams] = useSearchParams()

  const openHorizon = (h: Horizon) => {
    const next = new URLSearchParams(params)
    next.set('h', h)
    next.set('v', 'global')
    setParams(next, { replace: true })
    document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 md:rounded-[2rem] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan sm:tracking-[0.24em]">
          Piloto experimental · Quebrada La Oca
        </p>
        <h1 className="page-title mt-3 max-w-4xl">Resultados del experimento</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
          {meta.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn px-5 py-2.5" to="/eventos">
            Eventos críticos
          </Link>
          <Link className="btn px-5 py-2.5" to="/experimento">
            Metodología
          </Link>
          <button
            type="button"
            className="btn px-5 py-2.5"
            onClick={() => document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contexto del TFE
          </button>
        </div>
      </div>

      <div className="mt-6 mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {improvementVsPersistence.map((item, i) => (
          <Reveal key={item.horizon} delay={0.06 * i}>
            <button
              type="button"
              onClick={() => openHorizon(item.horizon)}
              className="card w-full text-left"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                Mejor MAE · {item.horizon}
              </p>
              <p className="mt-4 font-display text-4xl tracking-tight text-foam sm:text-5xl">
                <AnimatedNumber value={item.mae} />
                <span className="ml-1 text-2xl text-mist">cm</span>
              </p>
              <p className="mt-3 text-sm text-cyan-2">{item.model}</p>
              <p className="mt-2 text-sm text-mist">
                {item.improvementPct} % frente a Persistencia · toca para filtrar
              </p>
            </button>
          </Reveal>
        ))}
      </div>

      <ResultsExplorer />

      <div id="contexto" className="mt-10">
        <Section title="Ficha académica" source={meta.source}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="text-mist">Institución</dt>
              <dd className="mt-1 font-medium">{meta.institution}</dd>
            </div>
            <div>
              <dt className="text-mist">Programa</dt>
              <dd className="mt-1 font-medium">{meta.program}</dd>
            </div>
            <div>
              <dt className="text-mist">Tipo</dt>
              <dd className="mt-1 font-medium">{meta.type}</dd>
            </div>
            <div>
              <dt className="text-mist">Director</dt>
              <dd className="mt-1 font-medium">{meta.director}</dd>
            </div>
          </dl>
          <ul className="mt-6 space-y-3 text-sm">
            {meta.authors.map((a) => (
              <li key={a.name} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="text-foam">{a.name}</strong>
                <span className="mt-1 block text-mist">{a.role}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pregunta de investigación" source="Cap. 1.2">
          <p className="font-display text-xl leading-snug text-foam">{meta.question}</p>
        </Section>

        <Section title="Hipótesis" source="Cap. 1.3">
          <p className="leading-relaxed text-mist">{meta.hypothesis}</p>
        </Section>

        <Section title="Objetivos específicos" source="Cap. 3.2">
          <div className="grid gap-3 md:grid-cols-2">
            {meta.objectives.map((o) => (
              <div key={o.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">{o.id}</p>
                <p className="mt-2 text-sm text-foam">{o.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
