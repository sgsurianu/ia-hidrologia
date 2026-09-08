import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MetricRow } from '../content/types'
import { useMediaQuery } from './useMediaQuery'

const COLORS: Record<string, string> = {
  Persistencia: '#7d8b96',
  ARIMA: '#f4c16e',
  ARIMAX: '#ef8f6e',
  'Random Forest': '#3ee0c8',
  XGBoost: '#d7ece7',
  LSTM: '#6cb6ff',
  GRU: '#8b7bff',
}

const tick = { fill: '#90a8b3', fontSize: 11 }

const tooltipStyle = {
  background: '#0d222c',
  border: '1px solid rgba(158,214,204,0.2)',
  borderRadius: 12,
  color: '#e8f4f1',
}

export function MetricBarChart({
  rows,
  metric,
}: {
  rows: MetricRow[]
  metric: 'mae' | 'rmse' | 'nse' | 'kge'
}) {
  const narrow = useMediaQuery('(max-width: 767px)')
  const data = rows.map((r) => ({
    model: r.model,
    value: r[metric],
    fill: COLORS[r.model] ?? '#3ee0c8',
  }))
  const label =
    metric === 'mae'
      ? 'MAE (cm)'
      : metric === 'rmse'
        ? 'RMSE (cm)'
        : metric.toUpperCase()

  return (
    <div>
      <div className="h-80 w-full min-w-0">
        <ResponsiveContainer>
          {narrow ? (
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(158,214,204,0.12)" />
              <XAxis type="number" tick={tick} />
              <YAxis type="category" dataKey="model" width={108} tick={tick} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v as number, label]} />
              <Bar dataKey="value" name={label} radius={[0, 10, 10, 0]}>
                {data.map((d) => (
                  <Cell key={d.model} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(158,214,204,0.12)" />
              <XAxis dataKey="model" angle={-25} textAnchor="end" interval={0} tick={tick} />
              <YAxis tick={tick} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v as number, label]} />
              <Bar dataKey="value" name={label} radius={[10, 10, 0, 0]}>
                {data.map((d) => (
                  <Cell key={d.model} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SimpleBarChart({
  data,
  xKey,
  yKey,
  yLabel,
}: {
  data: Record<string, string | number>[]
  xKey: string
  yKey: string
  yLabel: string
}) {
  const narrow = useMediaQuery('(max-width: 767px)')

  return (
    <div>
      <div className="h-64 w-full min-w-0">
        <ResponsiveContainer>
          {narrow ? (
            <BarChart data={data} layout="vertical" margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(158,214,204,0.12)" />
              <XAxis type="number" tick={tick} />
              <YAxis type="category" dataKey={xKey} width={118} tick={tick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={yKey} name={yLabel} fill="#3ee0c8" radius={[0, 10, 10, 0]} />
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(158,214,204,0.12)" />
              <XAxis dataKey={xKey} tick={tick} />
              <YAxis tick={tick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={yKey} name={yLabel} fill="#3ee0c8" radius={[10, 10, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
