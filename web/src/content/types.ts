export type Horizon = '1h' | '2h' | '3h'
export type ModelName =
  | 'Persistencia'
  | 'ARIMA'
  | 'ARIMAX'
  | 'Random Forest'
  | 'XGBoost'
  | 'LSTM'
  | 'GRU'

export type MetricRow = {
  model: ModelName
  mae: number
  rmse: number
  nse: number
  kge: number
}

export type Sourced<T> = T & { source: string }
