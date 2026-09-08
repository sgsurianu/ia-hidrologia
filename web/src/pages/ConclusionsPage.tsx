import { PageHeader, Section } from '../components/ui'
import { DataTable } from '../components/DataTable'
import {
  finalConclusion,
  finalSource,
  findings,
  findingsSource,
  futureLines,
  futureSource,
  limitations,
  oeResponses,
  oeSource,
  recommendations,
} from '../content/conclusions'

export function ConclusionsPage() {
  return (
    <div>
      <PageHeader
        kicker="Síntesis"
        title="Conclusiones"
        subtitle="Hallazgos, respuesta a OE1–OE7, limitaciones, recomendaciones para SAMA y líneas futuras."
      />

      <Section title="Hallazgos principales" source={findingsSource}>
        <ul className="space-y-3 text-sm text-mist">
          {findings.map((f) => (
            <li key={f} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Respuesta a los objetivos específicos" source={oeSource}>
        <div className="space-y-4">
          {oeResponses.map((o) => (
            <div key={o.id} className="rounded-2xl border border-white/8 bg-black/20 p-4">
              <h3 className="text-sm font-semibold text-cyan">
                {o.id} — {o.title}
              </h3>
              <p className="mt-2 text-sm text-mist">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Limitaciones" source={limitations.source}>
        <DataTable
          headers={['Limitación', 'Implicación']}
          rows={limitations.rows.map((r) => [r.limitation, r.implication])}
        />
      </Section>

      <Section title="Recomendaciones para SAMA" source={recommendations.source}>
        <DataTable
          headers={['Prioridad', 'Recomendación', 'Propósito']}
          rows={recommendations.rows.map((r) => [r.priority, r.recommendation, r.purpose])}
        />
      </Section>

      <Section title="Líneas futuras" source={futureSource}>
        <ol className="space-y-2 text-sm text-mist">
          {futureLines.map((l, i) => (
            <li key={l} className="flex gap-3">
              <span className="text-cyan">{String(i + 1).padStart(2, '0')}</span>
              {l}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Conclusión final" source={finalSource}>
        <p className="font-display text-xl leading-snug text-foam">{finalConclusion}</p>
      </Section>
    </div>
  )
}
