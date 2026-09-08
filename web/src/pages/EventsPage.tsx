import { useEffect } from 'react'
import { PageHeader, Section, Callout } from '../components/ui'
import { DataTable } from '../components/DataTable'
import { FigureImage } from '../components/FigureImage'
import { SimpleBarChart } from '../components/MetricChart'
import {
  anticipationRojo,
  bestAlertRojo,
  crecientesCount,
  episodes,
  eventJune,
  eventMay,
  figures,
  regimeDistribution,
  rfCrecientes,
  severePeaks,
} from '../content/events'

export function EventsPage() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div>
      <PageHeader
        kicker="Hidrología crítica"
        title="Eventos críticos"
        subtitle="Crecientes rápidas, episodios TEST, alertamiento ROJO experimental y picos severos."
      />

      <Callout tone="warn">
        Umbrales 260 / 310 / 350 cm inferidos del dataset. En TEST solo hay 2 episodios ROJO (≥ 350 cm);
        las métricas asociadas no constituyen validación operacional.
      </Callout>

      <div id="crecientes">
        <Section title="Crecientes ≥ 20 cm" source={crecientesCount.source}>
          <p className="mb-3 text-sm text-mist">{crecientesCount.definition}</p>
          <DataTable
            headers={['Horizonte', 'Casos']}
            rows={crecientesCount.rows.map((r) => [r.horizon, r.cases])}
          />
        </Section>

        <Section title="Random Forest durante crecientes" source={rfCrecientes.source}>
          <DataTable
            headers={['Horizonte', 'MAE (cm)', 'RMSE (cm)', 'BIAS (cm)', 'Casos subestimados']}
            rows={rfCrecientes.rows.map((r) => [
              r.horizon,
              r.mae,
              r.rmse,
              r.bias,
              `${r.underPct} %`,
            ])}
          />
          <div className="mt-4">
            <SimpleBarChart
              data={rfCrecientes.rows.map((r) => ({ horizon: r.horizon, mae: r.mae }))}
              xKey="horizon"
              yKey="mae"
              yLabel="MAE crecientes (cm)"
            />
          </div>
        </Section>

        <Section title="Distribución de régimen en TEST" source={regimeDistribution.source}>
          <DataTable
            headers={['Horizonte', 'Cambios −5 a +5 cm', 'Crecientes ≥ 20 cm']}
            rows={regimeDistribution.rows.map((r) => [r.horizon, r.stable, r.crecientes])}
          />
        </Section>

        <Section title="Figura 3 — Error en crecientes">
          <FigureImage src={figures.crecientes.src} caption={figures.crecientes.caption} />
        </Section>
      </div>

      <div id="episodios">
        <Section title="Catálogo de episodios" source={episodes.source}>
          <p className="mb-3 text-sm text-mist">
            n ≥ 260 cm: {episodes.summary.ge260} · n ≥ 310 cm: {episodes.summary.ge310} · n ≥ 350 cm:{' '}
            {episodes.summary.ge350}. {episodes.summary.note}
          </p>
          <DataTable
            headers={['Episodio', 'Pico (cm)', 'Categoría máxima', 'Marca temporal']}
            rows={episodes.rows.map((r) => [r.id, r.peak, r.category, r.when])}
          />
          <div className="mt-4">
            <FigureImage src={figures.episodios.src} caption={figures.episodios.caption} />
          </div>
        </Section>

        <Section title={eventMay.title} source={eventMay.source}>
          <DataTable
            headers={['Característica', 'Valor']}
            rows={eventMay.traits.map((t) => [t.label, t.value])}
          />
          <h3 className="mt-4 mb-2 text-sm font-semibold">Cruces de referencia</h3>
          <DataTable
            headers={['Referencia', 'Tiempo relativo']}
            rows={eventMay.crossings.map((c) => [c.ref, c.relative])}
          />
          <h3 className="mt-4 mb-2 text-sm font-semibold">Pico a 1 h</h3>
          <DataTable
            headers={['Modelo', 'Pico pronosticado']}
            rows={eventMay.peaks1h.map((p) => [p.model, p.value])}
          />
          <h3 className="mt-4 mb-2 text-sm font-semibold">Pico a 3 h</h3>
          <DataTable
            headers={['Modelo', 'Predicción a 3 h']}
            rows={eventMay.peaks3h.map((p) => [p.model, p.value])}
          />
          <div className="mt-4">
            <FigureImage src={figures.mayo.src} caption={figures.mayo.caption} />
          </div>
        </Section>

        <Section title={eventJune.title} source={eventJune.source}>
          <ul className="mb-3 space-y-1 text-sm text-mist">
            {eventJune.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <DataTable
            headers={['Modelo', 'Predicción a 3 h']}
            rows={eventJune.peaks3h.map((p) => [p.model, p.value])}
          />
          <div className="mt-4">
            <FigureImage src={figures.junio.src} caption={figures.junio.caption} />
          </div>
        </Section>
      </div>

      <div id="alertas">
        <Section title="Anticipación media de episodios ROJO" source={anticipationRojo.source}>
          <Callout>{anticipationRojo.note}</Callout>
          <div className="mt-3">
            <DataTable
              headers={['Modelo', '1 h', '2 h', '3 h']}
              rows={anticipationRojo.rows.map((r) => [r.model, r['1h'], r['2h'], r['3h']])}
            />
          </div>
        </Section>

        <Section title="Mejor alertamiento ROJO por horizonte" source={bestAlertRojo.source}>
          <DataTable
            headers={['Horizonte', 'Modelo', 'CSI', 'POD', 'Precisión', 'FAR', 'TP', 'FP', 'FN']}
            rows={bestAlertRojo.rows.map((r) => [
              r.horizon,
              r.model,
              r.csi,
              r.pod,
              r.precision,
              r.far,
              r.tp,
              r.fp,
              r.fn,
            ])}
          />
          <div className="mt-4">
            <FigureImage src={figures.csi.src} caption={figures.csi.caption} />
          </div>
        </Section>
      </div>

      <div id="picos">
        <Section title="Mejor predicción exacta de picos severos" source={severePeaks.source}>
          <p className="mb-3 text-sm text-mist">{severePeaks.note}</p>
          <DataTable
            headers={['Horizonte', 'Mejor modelo', 'MAE del pico (cm)', 'BIAS (cm)', 'Subestimación']}
            rows={severePeaks.rows.map((r) => [
              r.horizon,
              r.model,
              r.mae,
              r.bias,
              `${r.underPct} %`,
            ])}
          />
          <div className="mt-4">
            <FigureImage src={figures.picos.src} caption={figures.picos.caption} />
          </div>
        </Section>
      </div>
    </div>
  )
}
