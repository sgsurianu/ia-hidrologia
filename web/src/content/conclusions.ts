export const findings = [
  'No existe un único modelo dominante para todos los objetivos de predicción.',
  'Random Forest y XGBoost presentan el comportamiento global más consistente.',
  'Random Forest muestra especial fortaleza durante crecientes de al menos 20 cm.',
  'GRU adquiere especial relevancia en horizontes largos, particularmente en alertamiento ROJO y estimación de picos severos a 3 h.',
  'El error durante crecientes y eventos severos es sustancialmente mayor que el error global.',
  'La subestimación de crecientes constituye una limitación recurrente de los modelos.',
  'ARIMA y ARIMAX funcionan como baselines estadísticos útiles, pero fueron superados globalmente por los modelos no lineales.',
  'La mejora de ARIMAX frente a ARIMA fue pequeña; la incorporación lineal y causal de precipitación no aportó una mejora sustancial.',
  'Los resultados sobre extremos deben interpretarse con cautela por el número reducido de episodios severos independientes.',
]
export const findingsSource = 'RESUMEN_FINAL_EXPERIMENTO.md; Cap. 5.12 y 7.1'

export const oeResponses = [
  {
    id: 'OE1',
    title: 'Auditoría y caracterización de los datos',
    text: 'Se auditaron SN_1007 (≈ 296.970 obs., 10 nov 2025 – 10 jun 2026) y SP_108 en el periodo coincidente. Los datos son suficientes para el piloto, con limitaciones de continuidad, representación espacial y cantidad de eventos severos.',
  },
  {
    id: 'OE2',
    title: 'Construcción del dataset supervisado',
    text: 'Serie común a 5 min (≈ 61.207 intervalos). 18 variables tabulares para RF/XGB; secuencias 37×2 para LSTM/GRU. Targets independientes a 1/2/3 h sin predicción recursiva.',
  },
  {
    id: 'OE3',
    title: 'Modelos estadísticos',
    text: 'Persistencia MAE 2,107 / 3,834 / 5,444 cm. ARIMA(2,1,1) y ARIMAX mejoran ligeramente, pero menos que los modelos no lineales. La diferencia ARIMA–ARIMAX es mínima.',
  },
  {
    id: 'OE4',
    title: 'Machine Learning',
    text: 'XGBoost mejor MAE global a 1 h y 3 h; Random Forest a 2 h. Random Forest mejor en crecientes ≥ 20 cm en los tres horizontes, con elevada subestimación.',
  },
  {
    id: 'OE5',
    title: 'Deep Learning',
    text: 'LSTM y GRU no superan sistemáticamente a RF/XGB en métricas globales. GRU destaca a 3 h en KGE, CSI ROJO y picos severos.',
  },
  {
    id: 'OE6',
    title: 'Comparación integral',
    text: 'No hay modelo globalmente dominante. El mejor algoritmo depende del criterio (MAE global, crecientes, CSI ROJO, picos). Los mejores modelos mejoran Persistencia ~35–39 % en MAE.',
  },
  {
    id: 'OE7',
    title: 'Utilidad potencial para SAMA',
    text: 'Existe viabilidad predictiva experimental, no operacional plena. Falta caracterizar inferencia en producción, umbrales oficiales y nuevos episodios. Se recomienda modo paralelo sin activar protocolos automáticos.',
  },
]
export const oeSource = 'Cap. 7.2'

export const limitations = {
  rows: [
    { limitation: 'Una única cuenca', implication: 'No permite generalizar automáticamente a otras cuencas de SAMA' },
    { limitation: '7 episodios ≥260 cm', implication: 'Evidencia independiente limitada sobre estados elevados' },
    { limitation: '4 episodios ≥310 cm', implication: 'Las métricas de picos severos presentan alta incertidumbre' },
    { limitation: '2 episodios ≥350 cm', implication: 'El desempeño ROJO no constituye validación operacional robusta' },
    { limitation: 'TEST de aproximadamente un mes', implication: 'Representatividad estacional limitada' },
    { limitation: 'Un sensor principal de nivel', implication: 'Representación espacial hidrométrica limitada' },
    { limitation: 'Un pluviómetro principal', implication: 'La precipitación espacial de la cuenca no queda completamente representada' },
    { limitation: 'Vacíos relevantes de precipitación', implication: 'Reducen la continuidad de determinadas ventanas históricas' },
    { limitation: 'Umbrales inferidos', implication: 'Requieren validación técnica antes de un uso operacional' },
    { limitation: 'ARIMAX lineal', implication: 'Puede representar de forma limitada relaciones no lineales lluvia–nivel' },
    { limitation: 'Sin radar meteorológico', implication: 'No se representa espacialmente la precipitación sobre la cuenca' },
    { limitation: 'Sin precipitación futura pronosticada', implication: 'Limita la información disponible para horizontes mayores' },
    { limitation: 'Sin validación multicuenca', implication: 'No se conoce todavía la transferibilidad del pipeline' },
  ],
  source: 'Tabla 39, cap. 6.8',
}

export const recommendations = {
  rows: [
    { priority: 'Alta', recommendation: 'Confirmar técnicamente los umbrales hidrométricos', purpose: 'Validar 260, 310 y 350 cm antes de cualquier uso operacional' },
    { priority: 'Alta', recommendation: 'Evaluar nuevos episodios independientes', purpose: 'Determinar si los resultados se generalizan' },
    { priority: 'Alta', recommendation: 'Mantener inicialmente la capa predictiva en modo paralelo', purpose: 'Evaluar su comportamiento sin sustituir los mecanismos existentes' },
    { priority: 'Alta', recommendation: 'Analizar específicamente crecientes y picos', purpose: 'Evitar decisiones basadas únicamente en métricas globales' },
    { priority: 'Media', recommendation: 'Incorporar más puntos de precipitación', purpose: 'Mejorar la representación espacial de la cuenca' },
    { priority: 'Media', recommendation: 'Integrar radar, satélite o pronósticos meteorológicos', purpose: 'Aumentar información disponible antes del evento' },
    { priority: 'Media', recommendation: 'Repetir el pipeline en otras cuencas', purpose: 'Evaluar la transferibilidad metodológica' },
    { priority: 'Media', recommendation: 'Evaluar incertidumbre predictiva', purpose: 'Complementar las predicciones puntuales' },
    { priority: 'Futura', recommendation: 'Explorar modelos híbridos o ensembles', purpose: 'Combinar fortalezas de diferentes enfoques' },
    { priority: 'Futura', recommendation: 'Incorporar arquitecturas más complejas cuando exista más información', purpose: 'Evaluar Transformers, GNN u otros enfoques si los datos lo justifican' },
  ],
  source: 'Tabla 41, cap. 7.4',
}

export const futureLines = [
  'Ampliación temporal y validación independiente',
  'Validación multicuenca',
  'Mejora de la información meteorológica',
  'Modelos orientados específicamente a extremos',
  'Predicción probabilística e incertidumbre',
  'Combinación de modelos',
  'Integración de modelos físicos y modelos basados en datos',
  'Arquitecturas avanzadas (Transformers, GNN)',
]
export const futureSource = 'Cap. 7.5'

export const finalConclusion =
  'Los registros hidrometeorológicos de la quebrada La Oca contienen información suficiente para anticipar el nivel a 1, 2 y 3 horas con desempeño superior a Persistencia. Los modelos de árboles son los más consistentes globalmente; Random Forest destaca en crecientes; GRU aporta señales en criterios críticos a 3 h. Un buen rendimiento global no garantiza un comportamiento equivalente durante crecientes. La subestimación de ascensos y la escasez de extremos delimitan el alcance: evidencia experimental prometedora, no validación operacional definitiva.'
export const finalSource = 'Cap. 7.7'
