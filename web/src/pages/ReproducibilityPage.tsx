import { PageHeader, Section, Callout } from '../components/ui'
import { DataTable } from '../components/DataTable'
import { environment } from '../content/models'
import { meta } from '../content/meta'

export function ReproducibilityPage() {
  return (
    <div>
      <PageHeader
        kicker="Trazabilidad"
        title="Reproducibilidad"
        subtitle="Entorno de ejecución del experimento definitivo, semilla y artefactos del notebook."
      />

      <Callout>
        Semilla aleatoria global: <strong>{environment.seed}</strong>.
      </Callout>

      <Section title="Entorno de ejecución" source={environment.source}>
        <DataTable
          headers={['Componente', 'Versión']}
          rows={environment.rows.map((r) => [r.component, r.version])}
        />
      </Section>

      <Section title="Notas metodológicas" source={environment.source}>
        <ul className="space-y-2 text-sm text-mist">
          {environment.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Section>

      <Section title="Código y repositorio" source="Anexo A / README.md">
        <ul className="space-y-2 text-sm text-mist">
          <li>
            Notebook definitivo: <code>{meta.notebook}</code>
          </li>
          <li>
            Repositorio:{' '}
            <a href={meta.repoUrl} target="_blank" rel="noreferrer">
              {meta.repoUrl}
            </a>
          </li>
          <li>
            Los CSV públicos del experimento están en la raíz del repositorio: `sn_1007_anomalias_detalle_nov.csv` y `sp_108_anomalias_detalle.csv`.
          </li>
        </ul>
      </Section>
    </div>
  )
}
