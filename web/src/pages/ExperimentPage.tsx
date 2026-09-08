import { PageHeader, Section, Callout } from '../components/ui'
import { DataTable } from '../components/DataTable'
import { PipelineArchitecture } from '../components/PipelineArchitecture'
import { caseStudy, pipelineSteps } from '../content/data'
import { meta } from '../content/meta'

export function ExperimentPage() {
  return (
    <div>
      <PageHeader
        kicker="Metodología"
        title="El experimento"
        subtitle="Caso de estudio, pipeline metodológico y control temporal Train / Validation / TEST."
      />

      <Section title="Caso de estudio" source={caseStudy.source}>
        <DataTable
          headers={['Elemento', 'Detalle']}
          rows={[
            ['Cuenca', caseStudy.basin],
            ['Sensor de nivel', caseStudy.levelSensor],
            ['Pluviómetro', caseStudy.rainGauge],
            ['Nivel observado', caseStudy.levelRange],
            ['Resolución', caseStudy.resolution],
            ['Serie común', caseStudy.commonSeries],
            ['Horizontes', caseStudy.horizons],
            ['TEST', caseStudy.testPeriod],
          ]}
        />
      </Section>

      <Section title="Objetivo general" source="Cap. 3.1">
        <p className="font-display text-xl leading-snug text-foam">{meta.objectiveGeneral}</p>
      </Section>

      <Section title="Figura 1 — Arquitectura del pipeline">
        <PipelineArchitecture />
      </Section>

      <Section title="Pipeline experimental (8 pasos)" source={pipelineSteps.source}>
        <ol className="space-y-3">
          {pipelineSteps.rows.map((r) => (
            <li key={r.step} className="flex gap-4 rounded-2xl border border-white/8 bg-black/20 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan text-sm font-bold text-night">
                {r.step}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-foam">{r.activity}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan">{r.oe}</p>
                <p className="mt-1 text-sm text-mist">{r.result}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Control de fuga de información" source="Cap. 3.3.4–3.3.7">
        <ul className="space-y-2 text-sm text-mist">
          <li>División cronológica Train / Validation / TEST sin shuffle.</li>
          <li>Purga temporal entre bloques según el horizonte.</li>
          <li>Selección de configuraciones solo con Train y Validation.</li>
          <li>Congelación de configuraciones antes de calcular métricas de TEST.</li>
          <li>Todos los modelos de un horizonte se evalúan sobre los mismos timestamps.</li>
          <li>Walk-forward se usa específicamente en ARIMA y ARIMAX; no es la validación global de los siete modelos.</li>
        </ul>
        <div className="mt-4">
          <Callout>
            TEST definitivo: 9 de mayo de 2026, 22:45 UTC – 10 de junio de 2026.
          </Callout>
        </div>
      </Section>
    </div>
  )
}
