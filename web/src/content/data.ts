export const caseStudy = {
  basin: 'Quebrada La Oca, Zaragoza (Antioquia, Colombia)',
  levelSensor: 'SN_1007 — 296.970 observaciones (10 nov 2025 – 10 jun 2026)',
  rainGauge: 'SP_108 — periodo coincidente con SN_1007 (59.834 registros)',
  levelRange: '210–413 cm (media 233,52 cm; P95 277 cm; P99 354 cm)',
  resolution: 'Cuadrícula causal de 5 minutos',
  commonSeries: '61.207 intervalos (cobertura conjunta 97,11 %)',
  horizons: '1 h, 2 h y 3 h (predicción directa, no recursiva)',
  testPeriod: '9 may 2026 22:45 UTC – 10 jun 2026',
  source: 'Cap. 4.1–4.2; README.md',
}

export const levelStats = {
  rows: [
    { stat: 'Mínimo', value: '210 cm' },
    { stat: 'Media', value: '233,52 cm' },
    { stat: 'Mediana', value: '228 cm' },
    { stat: 'Percentil 95', value: '277 cm' },
    { stat: 'Percentil 99', value: '354 cm' },
    { stat: 'Máximo', value: '413 cm' },
  ],
  source: 'Tabla 6, cap. 4.2.1',
}

export const categories = {
  rows: [
    { category: 'NORMAL', range: '210–259 cm' },
    { category: 'AMARILLO', range: '260–309 cm' },
    { category: 'NARANJA', range: '310–349 cm' },
    { category: 'ROJO', range: '350–413 cm' },
  ],
  note: 'Los umbrales 260 / 310 / 350 cm fueron inferidos del dataset. Tienen carácter experimental y no son umbrales operativos oficiales de SAMA.',
  source: 'Tabla 7, cap. 4.2.2',
}

export const coverage = {
  rows: [
    { variable: 'Nivel', intervals: 60940, coverage: '99,56 %' },
    { variable: 'Precipitación', intervals: 59699, coverage: '97,54 %' },
    { variable: 'Nivel y precipitación', intervals: 59437, coverage: '97,11 %' },
  ],
  source: 'Tabla 8, cap. 4.2.4',
}

export const historyWindow = {
  rows: [
    { history: '3 horas', availability: '86,4 %' },
    { history: '6 horas', availability: '78,1 %' },
    { history: '12 horas', availability: '64,5 %' },
    { history: '24 horas', availability: '44,7 %' },
  ],
  source: 'Tabla 9, cap. 4.2.5',
}

export const levelCorrelation = {
  rows: [
    { horizon: '1 h', correlation: 0.964 },
    { horizon: '2 h', correlation: 0.891 },
    { horizon: '3 h', correlation: 0.804 },
  ],
  source: 'Tabla 10, cap. 4.2.6',
}

export const tabularFeatures = {
  rows: [
    { variable: 'nivel_cm', description: 'Nivel conocido en el instante actual' },
    { variable: 'nivel_lag_5min', description: 'Nivel 5 minutos antes' },
    { variable: 'nivel_lag_10min', description: 'Nivel 10 minutos antes' },
    { variable: 'nivel_lag_15min', description: 'Nivel 15 minutos antes' },
    { variable: 'nivel_lag_30min', description: 'Nivel 30 minutos antes' },
    { variable: 'nivel_lag_1h', description: 'Nivel 1 hora antes' },
    { variable: 'nivel_lag_2h', description: 'Nivel 2 horas antes' },
    { variable: 'nivel_lag_3h', description: 'Nivel 3 horas antes' },
    { variable: 'nivel_cambio_5min', description: 'Cambio respecto de 5 minutos antes' },
    { variable: 'nivel_cambio_15min', description: 'Cambio respecto de 15 minutos antes' },
    { variable: 'nivel_cambio_30min', description: 'Cambio respecto de 30 minutos antes' },
    { variable: 'nivel_cambio_1h', description: 'Cambio respecto de 1 hora antes' },
    { variable: 'precip_mm', description: 'Precipitación del intervalo actual' },
    { variable: 'precip_acum_15min', description: 'Precipitación acumulada durante 15 minutos' },
    { variable: 'precip_acum_30min', description: 'Precipitación acumulada durante 30 minutos' },
    { variable: 'precip_acum_1h', description: 'Precipitación acumulada durante 1 hora' },
    { variable: 'precip_acum_2h', description: 'Precipitación acumulada durante 2 horas' },
    { variable: 'precip_acum_3h', description: 'Precipitación acumulada durante 3 horas' },
  ],
  source: 'Tabla 11, cap. 4.3.2',
}

export const supervisedSamples = {
  rows: [
    { horizon: '1 h', samples: 52802 },
    { horizon: '2 h', samples: 52739 },
    { horizon: '3 h', samples: 52725 },
  ],
  source: 'Tabla 12, cap. 4.3.4',
}

export const pipelineSteps = {
  rows: [
    {
      step: 1,
      activity: 'Auditoría de SN_1007 y SP_108',
      oe: 'OE1',
      result: 'Caracterización de calidad, continuidad y cobertura',
    },
    {
      step: 2,
      activity: 'Integración causal en cuadrícula temporal de 5 minutos y análisis de continuidad',
      oe: 'OE1, OE2',
      result: 'Serie temporal común',
    },
    {
      step: 3,
      activity: 'Construcción de variables tabulares, secuencias recurrentes y targets a 1, 2 y 3 horas',
      oe: 'OE2',
      result: 'Datasets supervisados independientes por horizonte',
    },
    {
      step: 4,
      activity: 'División cronológica Train/Validation/TEST y purga entre bloques',
      oe: 'OE2',
      result: 'Conjuntos temporalmente independientes',
    },
    {
      step: 5,
      activity: 'Entrenamiento y selección de configuraciones utilizando únicamente Train y Validation',
      oe: 'OE3, OE4, OE5',
      result: 'Configuración seleccionada por familia y horizonte',
    },
    {
      step: 6,
      activity: 'Congelación de configuraciones antes de acceder a las métricas finales de TEST',
      oe: 'OE3–OE6',
      result: 'Modelos definitivos del experimento',
    },
    {
      step: 7,
      activity: 'Evaluación fuera de muestra sobre los mismos timestamps de TEST',
      oe: 'OE6',
      result: 'Métricas globales comparables',
    },
    {
      step: 8,
      activity: 'Evaluación de crecientes, alertamiento, episodios y picos',
      oe: 'OE6, OE7',
      result: 'Caracterización del desempeño en condiciones críticas',
    },
  ],
  source: 'Tabla 3, cap. 3.3',
}

export const sequenceInfo = {
  shape: '37 pasos × 2 variables (nivel y precipitación)',
  history: '3 horas de historia más el instante actual (resolución 5 min)',
  targets: [
    'y1h(t) = nivel(t + 12)',
    'y2h(t) = nivel(t + 24)',
    'y3h(t) = nivel(t + 36)',
  ],
  note: 'Cada horizonte es un problema supervisado independiente. No se usa predicción recursiva entre horizontes.',
  source: 'Cap. 4.3.3–4.3.4',
}

export const auditNotes = [
  'SN_1007: ≈ 6.481 interrupciones > 1 min; máxima ≈ 280 minutos.',
  'SP_108 (periodo común): ≈ 96,15 % con 0 mm; máxima interrupción ≈ 39,5 horas.',
  'Las anomalías estadísticas no se eliminaron automáticamente: muchos extremos válidos estaban etiquetados como anómalos.',
  '≈ 74 % de observaciones consecutivas a 1 min con el mismo nivel; ≈ 99 % varían como máximo ±1 cm.',
  'source: Cap. 4.2.1–4.2.3; OE1',
]
