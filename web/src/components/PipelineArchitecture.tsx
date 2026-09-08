function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function ModelsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.4 7.6 7.8 15.2M13.6 7.6l2.6 7.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V11.5M10.5 19V6M16 19v-8M21 19H4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 14c2.2-3 3.8-3 6 0s3.8 3 6 0 3.8-3 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 18c2.2-2.4 3.8-2.4 6 0s3.8 2.4 6 0 3.8-2.4 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const stages = [
  {
    n: '01',
    title: 'Adquisición y auditoría',
    detail: 'Cobertura, continuidad y calidad de SN_1007 y SP_108',
    icon: AuditIcon,
  },
  {
    n: '02',
    title: 'Preprocesamiento causal',
    detail: 'Grilla de 5 min · features y targets a 1, 2 y 3 h',
    icon: GridIcon,
  },
  {
    n: '03',
    title: 'Modelos y congelación',
    detail: 'Train / Val / TEST · selección sin ver TEST',
    icon: ModelsIcon,
  },
  {
    n: '04',
    title: 'Evaluación en TEST',
    detail: 'MAE, RMSE, NSE, KGE · mismos timestamps',
    icon: ChartIcon,
  },
  {
    n: '05',
    title: 'Análisis hidrológico',
    detail: 'Crecientes, umbrales, episodios y picos',
    icon: WaveIcon,
  },
]

const models = ['Persistencia', 'ARIMA', 'ARIMAX', 'RF', 'XGBoost', 'LSTM', 'GRU']

export function PipelineArchitecture() {
  return (
    <figure className="max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,28,38,0.92),rgba(6,16,24,0.96))]">
      <div className="relative px-4 py-5 md:px-6 md:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(520px 180px at 12% 0%, rgba(62,224,200,0.14), transparent 55%), radial-gradient(420px 160px at 92% 100%, rgba(244,193,110,0.1), transparent 50%)',
          }}
        />

        <div className="relative mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <SensorChip label="SN_1007" hint="Nivel" />
            <SensorChip label="SP_108" hint="Precipitación" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['1 h', '2 h', '3 h'].map((h) => (
              <span
                key={h}
                className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan-2"
              >
                Nivel {h}
              </span>
            ))}
          </div>
        </div>

        <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <svg
            aria-hidden
            className="pointer-events-none absolute top-8 right-[6%] left-[6%] hidden h-8 text-cyan/40 lg:block"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16 C80 4 140 28 220 16 S360 4 500 16 720 28 780 16 920 4 1000 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
          {stages.map((stage) => {
            const Icon = stage.icon
            return (
              <li key={stage.n} className="relative">
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
                      <Icon />
                    </span>
                    <span className="font-display text-lg tracking-tight text-cyan/80">{stage.n}</span>
                  </div>
                  <h3 className="font-display text-[1.02rem] leading-snug text-foam">{stage.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{stage.detail}</p>
                </article>
              </li>
            )
          })}
        </ol>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {models.map((name) => (
            <span
              key={name}
              className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-medium tracking-wide text-foam/90"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-white/10 px-4 py-2.5 text-xs text-mist md:px-6">
        Arquitectura modular del piloto: de sensores SAMA a predicción de nivel a 1, 2 y 3 horas.
      </figcaption>
    </figure>
  )
}

function SensorChip({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
      <span className="text-xs font-semibold text-foam">{label}</span>
      <span className="text-[11px] text-mist">{hint}</span>
    </span>
  )
}
