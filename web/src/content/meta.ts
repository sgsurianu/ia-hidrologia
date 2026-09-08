export const meta = {
  title: 'Piloto experimental de predicción hidrométrica — Quebrada La Oca',
  subtitle:
    'Modelos estadísticos, Machine Learning y Deep Learning para apoyar la generación temprana de alertas en SAMA',
  institution: 'Universidad Internacional de La Rioja (UNIR)',
  program: 'Máster Universitario en Inteligencia Artificial',
  type: 'Piloto Experimental',
  director: 'Joan Escamilla Fuster',
  date: '9 de septiembre de 2026',
  repoUrl: 'https://github.com/sgsurianu/ia-hidrologia',
  notebook: 'piloto_experimental.ipynb',
  authors: [
    {
      name: 'Edgar José Aparicio Pérez',
      role: 'Auditoría de datos (OE1), modelos estadísticos (OE3) y ML (OE4)',
    },
    {
      name: 'Eduardo José Daza Cuello',
      role: 'Estado del arte, modelos de Deep Learning (OE5), discusión',
    },
    {
      name: 'Sebastián García Surianu',
      role: 'Dataset supervisado (OE2), resultados comparativos (OE6), coordinación con EAFIT',
    },
  ],
  keywords: [
    'predicción hidrométrica',
    'alertas tempranas',
    'SAMA',
    'aprendizaje automático',
    'aprendizaje profundo',
  ],
  question:
    '¿En qué medida los modelos estadísticos, de Machine Learning y de Deep Learning, entrenados con las series temporales hidrometeorológicas disponibles de SAMA para la quebrada La Oca, permiten anticipar su nivel hidrométrico a horizontes de 1, 2 y 3 horas y mejorar el desempeño de un baseline de persistencia, tanto en condiciones generales como durante situaciones hidrológicamente críticas?',
  hypothesis:
    'Los modelos estadísticos, de Machine Learning y de Deep Learning entrenados con series temporales hidrométricas y pluviométricas de SAMA pueden estimar el nivel futuro de la quebrada La Oca, en horizontes de 1, 2 y 3 horas, con un error inferior al producido por un baseline de persistencia, aportando capacidad predictiva adicional susceptible de ser evaluada como soporte potencial para sistemas de alerta temprana.',
  objectiveGeneral:
    'Diseñar, implementar y evaluar un piloto experimental de predicción hidrométrica basado en inteligencia artificial, orientado a anticipar el nivel futuro de la quebrada La Oca en horizontes de 1, 2 y 3 horas, con el fin de analizar la capacidad de los modelos estadísticos, de Machine Learning y de Deep Learning para apoyar la generación temprana de alertas en SAMA.',
  objectives: [
    {
      id: 'OE1',
      text: 'Caracterizar disponibilidad, calidad, frecuencia, cobertura y continuidad de SN_1007 y SP_108',
    },
    {
      id: 'OE2',
      text: 'Construir un dataset supervisado causal con nivel y precipitación; targets a 1, 2 y 3 h',
    },
    {
      id: 'OE3',
      text: 'Implementar baselines estadísticos: Persistencia, ARIMA y ARIMAX',
    },
    {
      id: 'OE4',
      text: 'Implementar Random Forest y XGBoost, con selección de hiperparámetros en validación',
    },
    {
      id: 'OE5',
      text: 'Implementar LSTM y GRU sobre secuencias temporales reales de nivel y precipitación',
    },
    {
      id: 'OE6',
      text: 'Comparar los siete enfoques en TEST (MAE, RMSE, NSE, KGE) y analizar crecientes, alertas y picos',
    },
    {
      id: 'OE7',
      text: 'Analizar utilidad potencial y limitaciones como apoyo futuro a SAMA',
    },
  ],
  disclaimer:
    'Este visor presenta resultados experimentales del TFE. No constituye un sistema operacional de alertamiento de SAMA. Los umbrales 260 / 310 / 350 cm son referencias inferidas del dataset y requieren confirmación hidrológica antes de cualquier uso oficial.',
  source: 'Memoria V8.2.2.1 (septiembre 2026); README.md; RESUMEN_FINAL_EXPERIMENTO.md',
} as const
