import { Navigate, useSearchParams } from 'react-router-dom'

export function ResultsPage() {
  const [params] = useSearchParams()
  const search = params.toString()
  return <Navigate to={search ? `/?${search}` : '/'} replace />
}
