export const crecientesCount = {
  rows: [
    { horizon: '1 h', cases: 97 },
    { horizon: '2 h', cases: 169 },
    { horizon: '3 h', cases: 242 },
  ],
  definition: 'Creciente rápida: nivel(t+h) − nivel(t) ≥ 20 cm',
  source: 'Tabla 25, cap. 5.3',
}

export const rfCrecientes = {
  rows: [
    { horizon: '1 h', mae: 17.08, rmse: 19.9, bias: -16.28, underPct: 92.78 },
    { horizon: '2 h', mae: 29.01, rmse: 38.69, bias: -23.83, underPct: 84.62 },
    { horizon: '3 h', mae: 37.47, rmse: 49.97, bias: -34.25, underPct: 88.84 },
  ],
  source: 'Tabla 26, cap. 5.3',
}

export const regimeDistribution = {
  rows: [
    { horizon: '1 h', stable: '≈ 92 %', crecientes: '1,28 %' },
    { horizon: '2 h', stable: '≈ 88 %', crecientes: '2,24 %' },
    { horizon: '3 h', stable: '≈ 84 %', crecientes: '3,21 %' },
  ],
  source: 'Tabla 27, cap. 5.4',
}

export const episodes = {
  summary: {
    ge260: 7,
    ge310: 4,
    ge350: 2,
    note: '9 fragmentos iniciales fusionados en 7 episodios (separación máxima 30 min).',
  },
  rows: [
    { id: 1, peak: 270, category: 'AMARILLO', when: '11-May 01:30' },
    { id: 2, peak: 272, category: 'AMARILLO', when: '21-May 05:35' },
    { id: 3, peak: 279, category: 'AMARILLO', when: '25-May 21:50' },
    { id: 4, peak: 375, category: 'ROJO', when: '29-May 01:20' },
    { id: 5, peak: 322, category: 'NARANJA', when: '03-Jun 07:20' },
    { id: 6, peak: 329, category: 'NARANJA', when: '05-Jun 07:35' },
    { id: 7, peak: 377, category: 'ROJO', when: '07-Jun 12:55' },
  ],
  source: 'Tabla 28, cap. 5.5; Figura 4',
}

export const eventMay = {
  title: 'Evento del 28–29 de mayo de 2026 (episodio 4)',
  traits: [
    { label: 'Nivel inmediatamente previo', value: '254 cm' },
    { label: 'Pico observado', value: '375 cm' },
    { label: 'Ascenso hasta el pico', value: '121 cm' },
    { label: 'Máximo incremento en 30 min', value: '68 cm' },
    { label: 'Máximo incremento en 1 h', value: '98 cm' },
    { label: 'Tiempo desde inicio hasta pico', value: '170 min' },
    { label: 'Precipitación en la hora previa', value: '44 mm' },
    { label: 'Precipitación en las 3 h previas', value: '49,1 mm' },
  ],
  crossings: [
    { ref: '260 cm', relative: 'inicio' },
    { ref: '310 cm', relative: '+20 min' },
    { ref: '350 cm', relative: '+60 min' },
  ],
  peaks1h: [
    { model: 'XGBoost', value: '369,97 cm' },
    { model: 'Random Forest', value: '369,02 cm' },
    { model: 'ARIMA', value: '368,35 cm' },
    { model: 'GRU', value: '363,54 cm' },
  ],
  peaks3h: [
    { model: 'GRU', value: '374,17 cm' },
    { model: 'XGBoost', value: '346,65 cm' },
    { model: 'Random Forest', value: '340,56 cm' },
    { model: 'ARIMA', value: '≈ 280 cm' },
    { model: 'Persistencia', value: '250 cm' },
  ],
  source: 'Tablas 29, 30, 34 y 35, cap. 5.6–5.10; Figura 5',
}

export const eventJune = {
  title: 'Evento del 6–7 de junio de 2026 (episodio 7)',
  notes: [
    'Pico observado: 377 cm.',
    'Incremento desde el nivel previo ≈ 119 cm.',
    'Cruce de 310 cm ≈ +45 min; cruce de 350 cm ≈ +100 min.',
    'Tiempo hasta el pico ≈ 310 min.',
    'Evolución menos explosiva y más prolongada que el evento de mayo.',
  ],
  peaks3h: [
    { model: 'GRU', value: '383,37 cm' },
    { model: 'ARIMA', value: '368,30 cm' },
    { model: 'ARIMAX', value: '368,28 cm' },
    { model: 'LSTM', value: '391,40 cm' },
    { model: 'Random Forest', value: '356,07 cm' },
    { model: 'XGBoost', value: '355,68 cm' },
  ],
  source: 'Cap. 5.6.2; Tabla 36; Figura 6',
}

export const anticipationRojo = {
  note: 'Solo 2 episodios ROJO en TEST. Todos los modelos excepto Persistencia emitieron alguna advertencia previa.',
  rows: [
    { model: 'GRU', '1h': '57,5 min', '2h': '97,5 min', '3h': '120 min' },
    { model: 'XGBoost', '1h': '57,5 min', '2h': '77,5 min', '3h': '77,5 min' },
    { model: 'LSTM', '1h': '55 min', '2h': '45 min', '3h': '97,5 min' },
    { model: 'Random Forest', '1h': '15 min', '2h': '60 min', '3h': '72,5 min' },
    { model: 'ARIMA', '1h': '55 min', '2h': '60 min', '3h': '62,5 min' },
    { model: 'ARIMAX', '1h': '55 min', '2h': '60 min', '3h': '62,5 min' },
    { model: 'Persistencia', '1h': '—', '2h': '—', '3h': '—' },
  ],
  source: 'Tabla 31, cap. 5.7',
}

/** Solo el mejor por horizonte (Tabla 32); no se inventan CSI del resto */
export const bestAlertRojo = {
  rows: [
    {
      horizon: '1 h',
      model: 'GRU',
      csi: 0.95,
      pod: 0.978,
      precision: 0.971,
      far: 0.029,
      tp: 134,
      fp: 4,
      fn: 3,
    },
    {
      horizon: '2 h',
      model: 'XGBoost',
      csi: 0.752,
      pod: 0.752,
      precision: 1.0,
      far: 0.0,
      tp: 103,
      fp: 0,
      fn: 34,
    },
    {
      horizon: '3 h',
      model: 'GRU',
      csi: 0.63,
      pod: 0.672,
      precision: 0.911,
      far: 0.089,
      tp: 92,
      fp: 9,
      fn: 45,
    },
  ],
  source: 'Tabla 32, cap. 5.8',
}

export const severePeaks = {
  rows: [
    {
      horizon: '1 h',
      model: 'Random Forest',
      mae: 10.69,
      bias: -8.83,
      underPct: 75,
    },
    {
      horizon: '2 h',
      model: 'XGBoost',
      mae: 37.19,
      bias: -37.19,
      underPct: 100,
    },
    {
      horizon: '3 h',
      model: 'GRU',
      mae: 32.14,
      bias: -28.96,
      underPct: 75,
    },
  ],
  note: 'Picos severos = máximo observado ≥ 310 cm (n = 4).',
  source: 'Tabla 33, cap. 5.9',
}

export const figures = {
  pipeline: {
    src: '/figures/figura1_pipeline.jpg',
    caption: 'Figura 1. Diseño y arquitectura del pipeline modular de predicción hidrométrica para la quebrada La Oca.',
  },
  maeGlobal: {
    src: '/figures/figura2_mae_global.png',
    caption: 'Figura 2. Error absoluto medio global por horizonte.',
  },
  crecientes: {
    src: '/figures/figura3_crecientes.png',
    caption: 'Figura 3. Error durante crecientes de al menos 20 cm.',
  },
  episodios: {
    src: '/figures/figura4_episodios.png',
    caption: 'Figura 4. Catálogo de episodios hidrométricos identificados en TEST.',
  },
  mayo: {
    src: '/figures/figura5_mayo.png',
    caption: 'Figura 5. Pronósticos durante el episodio crítico del 28–29 de mayo de 2026.',
  },
  junio: {
    src: '/figures/figura6_junio.png',
    caption: 'Figura 6. Pronósticos durante el episodio ROJO del 6–7 de junio de 2026.',
  },
  csi: {
    src: '/figures/figura7_csi_rojo.png',
    caption: 'Figura 7. Critical Success Index para estados ROJO.',
  },
  picos: {
    src: '/figures/figura8_picos.png',
    caption: 'Figura 8. Error en la magnitud de los picos severos.',
  },
}
