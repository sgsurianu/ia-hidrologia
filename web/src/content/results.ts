import type { Horizon, MetricRow, ModelName } from './types'

export const models: ModelName[] = [
  'Persistencia',
  'ARIMA',
  'ARIMAX',
  'Random Forest',
  'XGBoost',
  'LSTM',
  'GRU',
]

export const testSamples = {
  '1h': 7573,
  '2h': 7560,
  '3h': 7547,
  source: 'Tabla 13 / Tabla 4, cap. 3–4',
} as const

/** Tabla 20 */
export const metrics1h: MetricRow[] = [
  { model: 'XGBoost', mae: 1.354, rmse: 3.182, nse: 0.983, kge: 0.971 },
  { model: 'Random Forest', mae: 1.37, rmse: 3.347, nse: 0.982, kge: 0.971 },
  { model: 'LSTM', mae: 1.489, rmse: 3.872, nse: 0.975, kge: 0.985 },
  { model: 'GRU', mae: 1.592, rmse: 3.756, nse: 0.977, kge: 0.975 },
  { model: 'ARIMAX', mae: 2.017, rmse: 5.332, nse: 0.953, kge: 0.967 },
  { model: 'ARIMA', mae: 2.031, rmse: 5.381, nse: 0.952, kge: 0.966 },
  { model: 'Persistencia', mae: 2.107, rmse: 6.757, nse: 0.925, kge: 0.963 },
]

/** Tabla 21 */
export const metrics2h: MetricRow[] = [
  { model: 'Random Forest', mae: 2.339, rmse: 6.828, nse: 0.924, kge: 0.927 },
  { model: 'XGBoost', mae: 2.375, rmse: 6.821, nse: 0.924, kge: 0.916 },
  { model: 'GRU', mae: 2.398, rmse: 6.994, nse: 0.92, kge: 0.881 },
  { model: 'LSTM', mae: 2.769, rmse: 8.001, nse: 0.895, kge: 0.816 },
  { model: 'ARIMAX', mae: 3.718, rmse: 10.441, nse: 0.821, kge: 0.905 },
  { model: 'ARIMA', mae: 3.721, rmse: 10.454, nse: 0.821, kge: 0.905 },
  { model: 'Persistencia', mae: 3.834, rmse: 11.803, nse: 0.772, kge: 0.886 },
]

/** Tabla 22 */
export const metrics3h: MetricRow[] = [
  { model: 'XGBoost', mae: 3.465, rmse: 10.143, nse: 0.832, kge: 0.83 },
  { model: 'Random Forest', mae: 3.491, rmse: 10.076, nse: 0.834, kge: 0.848 },
  { model: 'GRU', mae: 3.746, rmse: 10.243, nse: 0.829, kge: 0.887 },
  { model: 'LSTM', mae: 4.066, rmse: 10.593, nse: 0.817, kge: 0.88 },
  { model: 'ARIMAX', mae: 5.328, rmse: 14.567, nse: 0.653, kge: 0.828 },
  { model: 'ARIMA', mae: 5.33, rmse: 14.575, nse: 0.653, kge: 0.828 },
  { model: 'Persistencia', mae: 5.444, rmse: 15.787, nse: 0.593, kge: 0.796 },
]

export const metricsByHorizon: Record<Horizon, { rows: MetricRow[]; source: string }> = {
  '1h': { rows: metrics1h, source: 'Tabla 20, cap. 5.1.1' },
  '2h': { rows: metrics2h, source: 'Tabla 21, cap. 5.1.2' },
  '3h': { rows: metrics3h, source: 'Tabla 22, cap. 5.1.3' },
}

/** Tabla 23 */
export const improvementVsPersistence = [
  { horizon: '1h' as Horizon, model: 'XGBoost' as ModelName, mae: 1.354, improvementPct: 35.74 },
  { horizon: '2h' as Horizon, model: 'Random Forest' as ModelName, mae: 2.339, improvementPct: 39.0 },
  { horizon: '3h' as Horizon, model: 'XGBoost' as ModelName, mae: 3.465, improvementPct: 36.35 },
]
export const improvementSource = 'Tabla 23, cap. 5.1.4'

/** Tabla 24 */
export const xgbImportance = {
  '1h': [
    { variable: 'nivel_cm', importance: 0.4957 },
    { variable: 'nivel_lag_5min', importance: 0.3549 },
    { variable: 'nivel_lag_10min', importance: 0.0555 },
    { variable: 'nivel_cambio_15min', importance: 0.0198 },
    { variable: 'precip_acum_2h', importance: 0.0149 },
  ],
  '2h': [
    { variable: 'nivel_cm', importance: 0.4589 },
    { variable: 'nivel_lag_5min', importance: 0.2564 },
    { variable: 'nivel_lag_10min', importance: 0.0512 },
    { variable: 'precip_acum_1h', importance: 0.033 },
    { variable: 'precip_acum_2h', importance: 0.0306 },
  ],
  '3h': [
    { variable: 'nivel_cm', importance: 0.3716 },
    { variable: 'nivel_lag_5min', importance: 0.24 },
    { variable: 'precip_acum_1h', importance: 0.057 },
    { variable: 'nivel_cambio_15min', importance: 0.0437 },
    { variable: 'nivel_lag_10min', importance: 0.0372 },
  ],
  source: 'Tabla 24, cap. 5.2',
}

/** Tabla 37 / Tabla 40 */
export const bestByCriterion = {
  rows: [
    {
      criterion: 'Menor MAE global',
      '1h': 'XGBoost',
      '2h': 'Random Forest',
      '3h': 'XGBoost',
      values: { '1h': '1,354 cm', '2h': '2,339 cm', '3h': '3,465 cm' },
    },
    {
      criterion: 'Crecientes ≥ 20 cm',
      '1h': 'Random Forest',
      '2h': 'Random Forest',
      '3h': 'Random Forest',
      values: { '1h': '17,08 cm', '2h': '29,01 cm', '3h': '37,47 cm' },
    },
    {
      criterion: 'CSI ROJO',
      '1h': 'GRU',
      '2h': 'XGBoost',
      '3h': 'GRU',
      values: { '1h': '0,950', '2h': '0,752', '3h': '0,630' },
    },
    {
      criterion: 'Pico severo (MAE exacto)',
      '1h': 'Random Forest',
      '2h': 'XGBoost',
      '3h': 'GRU',
      values: { '1h': '10,69 cm', '2h': '37,19 cm', '3h': '32,14 cm' },
    },
  ],
  source: 'Tabla 37 / Tabla 40, cap. 5.11 y 7.2.6',
}

export function getMetrics(horizon: Horizon, model?: ModelName | 'Todos') {
  const { rows, source } = metricsByHorizon[horizon]
  if (!model || model === 'Todos') return { rows, source }
  return { rows: rows.filter((r) => r.model === model), source }
}
