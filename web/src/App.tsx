import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ExperimentPage } from './pages/ExperimentPage'
import { DataPage } from './pages/DataPage'
import { ModelsPage } from './pages/ModelsPage'
import { ResultsPage } from './pages/ResultsPage'
import { EventsPage } from './pages/EventsPage'
import { ConclusionsPage } from './pages/ConclusionsPage'
import { ReproducibilityPage } from './pages/ReproducibilityPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="experimento" element={<ExperimentPage />} />
          <Route path="datos" element={<DataPage />} />
          <Route path="modelos" element={<ModelsPage />} />
          <Route path="resultados" element={<ResultsPage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="conclusiones" element={<ConclusionsPage />} />
          <Route path="reproducibilidad" element={<ReproducibilityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
