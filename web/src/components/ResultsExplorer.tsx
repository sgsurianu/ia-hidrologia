import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Callout, Section } from './ui'
import { DataTable } from './DataTable'
import { MetricBarChart, SimpleBarChart } from './MetricChart'
import { SegmentedControl } from './SegmentedControl'
import { AnimatedNumber } from './AnimatedNumber'
import { modelCards } from '../content/models'
import {
  bestByCriterion,
  getMetrics,
  improvementVsPersistence,
  models,
  testSamples,
  xgbImportance,
} from '../content/results'
import { figures } from '../content/events'
import { FigureImage } from './FigureImage'
import type { Horizon, ModelName } from '../content/types'

type MetricKey = 'mae' | 'rmse' | 'nse' | 'kge'
type ViewKey = 'global' | 'crecientes' | 'alertas' | 'picos'

function parseHorizon(v: string | null): Horizon {
  if (v === '2h' || v === '3h') return v
  return '1h'
}

function parseModel(v: string | null): ModelName | 'Todos' {
  if (!v || v === 'Todos') return 'Todos'
  return models.includes(v as ModelName) ? (v as ModelName) : 'Todos'
}

function parseView(v: string | null): ViewKey {
  if (v === 'crecientes' || v === 'alertas' || v === 'picos') return v
  return 'global'
}

export function ResultsExplorer() {
  const [params, setParams] = useSearchParams()
  const horizon = parseHorizon(params.get('h'))
  const model = parseModel(params.get('m'))
  const view = parseView(params.get('v'))
  const [metric, setMetric] = useState<MetricKey>('mae')

  const patch = (next: { h?: Horizon; m?: ModelName | 'Todos'; v?: ViewKey }) => {
    const merged = new URLSearchParams(params)
    if (next.h) merged.set('h', next.h)
    if (next.m) merged.set('m', next.m)
    if (next.v) merged.set('v', next.v)
    setParams(merged, { replace: true })
  }

  const { rows } = useMemo(() => getMetrics(horizon, model), [horizon, model])
  const allRows = getMetrics(horizon, 'Todos').rows
  const best = improvementVsPersistence.find((i) => i.horizon === horizon)
  const modelCard = modelCards.find((c) => c.name === model)
  const importance = xgbImportance[horizon]

  return (
    <div id="resultados">
      <div className="sticky z-30 mb-6 space-y-2 rounded-3xl border border-white/10 bg-night/80 p-3 backdrop-blur-xl md:space-y-3 md:p-4" style={{ top: 'var(--header-h, 4.5rem)' }}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan sm:tracking-[0.18em]">
          Explorar TEST
        </p>
        <SegmentedControl
          group="horizon-pill"
          value={horizon}
          onChange={(h) => patch({ h })}
          options={[
            { id: '1h', label: '1 hora' },
            { id: '2h', label: '2 horas' },
            { id: '3h', label: '3 horas' },
          ]}
        />
        <div className="chip-scroll">
          <button type="button" className={`btn shrink-0 ${model === 'Todos' ? 'btn-active' : ''}`} onClick={() => patch({ m: 'Todos' })}>
            Todos
          </button>
          {models.map((name) => (
            <button
              key={name}
              type="button"
              className={`btn shrink-0 ${model === name ? 'btn-active' : ''}`}
              onClick={() => patch({ m: name })}
            >
              {name}
            </button>
          ))}
        </div>
        <SegmentedControl
          group="view-pill"
          value={view}
          onChange={(v) => patch({ v })}
          options={[
            { id: 'global', label: 'Global' },
            { id: 'crecientes', label: 'Crecientes' },
            { id: 'alertas', label: 'Alertas ROJO' },
            { id: 'picos', label: 'Picos' },
          ]}
        />
      </div>

      <Callout>
        Muestras TEST: 1 h = {testSamples['1h'].toLocaleString('es-CO')}, 2 h ={' '}
        {testSamples['2h'].toLocaleString('es-CO')}, 3 h = {testSamples['3h'].toLocaleString('es-CO')}.
      </Callout>

      {view === 'global' ? (
        <>
          {best ? (
            <Section title={`Mejor MAE global · ${horizon}`}>
              <p className="font-display text-4xl text-foam">
                <AnimatedNumber value={best.mae} /> cm
              </p>
              <p className="mt-2 text-mist">
                <strong className="text-cyan-2">{best.model}</strong> · {best.improvementPct} % de mejora frente a Persistencia
              </p>
            </Section>
          ) : null}

          <Section title="Ranking de métricas">
            <div className="mb-4">
              <SegmentedControl
                group="metric-pill"
                value={metric}
                onChange={setMetric}
                options={[
                  { id: 'mae', label: 'MAE' },
                  { id: 'rmse', label: 'RMSE' },
                  { id: 'nse', label: 'NSE' },
                  { id: 'kge', label: 'KGE' },
                ]}
              />
            </div>
            <MetricBarChart rows={model === 'Todos' ? allRows : rows} metric={metric} />
            <div className="mt-4">
              <DataTable
                headers={['Modelo', 'MAE (cm)', 'RMSE (cm)', 'NSE', 'KGE']}
                rows={(model === 'Todos' ? allRows : rows).map((r) => [
                  r.model,
                  r.mae,
                  r.rmse,
                  r.nse,
                  r.kge,
                ])}
              />
            </div>
          </Section>

          {model !== 'Todos' && modelCard ? (
            <Section title={`Ficha · ${modelCard.name}`}>
              <p className="mb-3 text-sm text-mist">{modelCard.summary}</p>
              <DataTable
                headers={['Parámetro', 'Valor']}
                rows={modelCard.config.map((c) => [c.param, c.value])}
              />
              <div className="mt-4">
                <DataTable
                  headers={['Métrica', 'Valor']}
                  rows={rows.flatMap((r) => [
                    ['MAE (cm)', r.mae],
                    ['RMSE (cm)', r.rmse],
                    ['NSE', r.nse],
                    ['KGE', r.kge],
                  ])}
                />
              </div>
            </Section>
          ) : null}

          <Section title={`Importancia XGBoost · ${horizon}`}>
            <SimpleBarChart
              data={importance}
              xKey="variable"
              yKey="importance"
              yLabel="Importancia relativa"
            />
            <Callout>
              Valores de importancia interna del modelo; no deben interpretarse como evidencia de causalidad hidrológica.
            </Callout>
          </Section>

          <Section title="Figura 2 — MAE global">
            <FigureImage src={figures.maeGlobal.src} caption={figures.maeGlobal.caption} />
          </Section>
        </>
      ) : null}

      {view === 'crecientes' ? (
        <Section title="Vista crecientes">
          <Callout>
            El detalle tabular interactivo de crecientes ≥ 20 cm está en Eventos críticos. Aquí se muestra la figura oficial del TFE.
          </Callout>
          <div className="mt-3">
            <FigureImage src={figures.crecientes.src} caption={figures.crecientes.caption} />
          </div>
        </Section>
      ) : null}

      {view === 'alertas' ? (
        <Section title="Vista alertas ROJO">
          <Callout tone="warn">
            Solo se tabulan los mejores CSI por horizonte. La gráfica compara los siete modelos.
          </Callout>
          <div className="mt-3">
            <FigureImage src={figures.csi.src} caption={figures.csi.caption} />
          </div>
        </Section>
      ) : null}

      {view === 'picos' ? (
        <Section title="Vista picos">
          <FigureImage src={figures.picos.src} caption={figures.picos.caption} />
        </Section>
      ) : null}

      <Section title="Quién gana según criterio">
        <DataTable
          headers={['Criterio', '1 h', '2 h', '3 h']}
          rows={bestByCriterion.rows.map((r) => [
            r.criterion,
            `${r['1h']} (${r.values['1h']})`,
            `${r['2h']} (${r.values['2h']})`,
            `${r['3h']} (${r.values['3h']})`,
          ])}
        />
      </Section>
    </div>
  )
}
