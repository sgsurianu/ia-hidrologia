import { PageHeader, Section } from '../components/ui'
import { DataTable } from '../components/DataTable'
import { modelCards } from '../content/models'

const familyTone: Record<string, string> = {
  Baseline: 'from-mist/30 to-transparent',
  Estadístico: 'from-amber/25 to-transparent',
  'Machine Learning': 'from-cyan/25 to-transparent',
  'Deep Learning': 'from-indigo-400/25 to-transparent',
}

export function ModelsPage() {
  return (
    <div>
      <PageHeader
        kicker="OE3 · OE4 · OE5"
        title="Modelos"
        subtitle="Siete enfoques con configuraciones seleccionadas en Validation y congeladas antes de TEST."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {modelCards.map((m) => (
          <Section key={m.name} title={`${m.name} · ${m.family}`} source={m.source}>
            <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${familyTone[m.family] ?? 'from-cyan/25'}`} />
            <p className="mb-3 text-sm text-mist">{m.summary}</p>
            <DataTable
              headers={['Parámetro', 'Valor']}
              rows={m.config.map((c) => [c.param, c.value])}
            />
          </Section>
        ))}
      </div>
    </div>
  )
}
