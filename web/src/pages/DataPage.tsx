import { PageHeader, Section, Callout } from '../components/ui'
import { DataTable } from '../components/DataTable'
import {
  auditNotes,
  categories,
  coverage,
  historyWindow,
  levelCorrelation,
  levelStats,
  sequenceInfo,
  supervisedSamples,
  tabularFeatures,
} from '../content/data'

export function DataPage() {
  return (
    <div>
      <PageHeader
        kicker="OE1 · OE2"
        title="Datos"
        subtitle="Auditoría OE1, umbrales experimentales, features tabulares y secuencias para Deep Learning."
      />

      <Callout tone="warn">{categories.note}</Callout>

      <Section title="Estadísticos de SN_1007" source={levelStats.source}>
        <DataTable
          headers={['Estadístico', 'Nivel']}
          rows={levelStats.rows.map((r) => [r.stat, r.value])}
        />
      </Section>

      <Section title="Categorías e umbrales inferidos" source={categories.source}>
        <DataTable
          headers={['Categoría', 'Rango observado']}
          rows={categories.rows.map((r) => [r.category, r.range])}
        />
      </Section>

      <Section title="Cobertura de la serie común (5 min)" source={coverage.source}>
        <DataTable
          headers={['Variable', 'Intervalos', 'Cobertura']}
          rows={coverage.rows.map((r) => [r.variable, r.intervals.toLocaleString('es-CO'), r.coverage])}
        />
      </Section>

      <Section title="Disponibilidad según ventana histórica" source={historyWindow.source}>
        <DataTable
          headers={['Historia requerida', 'Disponibilidad aproximada']}
          rows={historyWindow.rows.map((r) => [r.history, r.availability])}
        />
      </Section>

      <Section title="Correlación nivel actual–nivel futuro" source={levelCorrelation.source}>
        <DataTable
          headers={['Horizonte', 'Correlación']}
          rows={levelCorrelation.rows.map((r) => [r.horizon, r.correlation])}
        />
      </Section>

      <Section title="18 variables tabulares (RF / XGBoost)" source={tabularFeatures.source}>
        <DataTable
          headers={['Variable', 'Descripción']}
          rows={tabularFeatures.rows.map((r) => [r.variable, r.description])}
        />
      </Section>

      <Section title="Secuencias LSTM / GRU" source={sequenceInfo.source}>
        <p className="text-sm text-mist">Forma: <strong className="text-foam">{sequenceInfo.shape}</strong></p>
        <p className="mt-1 text-sm text-mist">{sequenceInfo.history}</p>
        <ul className="mt-2 space-y-1 text-sm text-cyan-2">
          {sequenceInfo.targets.map((t) => (
            <li key={t}>
              <code>{t}</code>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-mist">{sequenceInfo.note}</p>
      </Section>

      <Section title="Muestras supervisadas por horizonte" source={supervisedSamples.source}>
        <DataTable
          headers={['Horizonte', 'Muestras']}
          rows={supervisedSamples.rows.map((r) => [r.horizon, r.samples.toLocaleString('es-CO')])}
        />
      </Section>

      <Section title="Notas de auditoría" source="Cap. 4.2">
        <ul className="space-y-2 text-sm text-mist">
          {auditNotes.filter((n) => !n.startsWith('source')).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
