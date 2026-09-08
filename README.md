# Piloto experimental de predicción hidrométrica — Quebrada La Oca

Piloto experimental de predicción hidrométrica en la quebrada La Oca (Zaragoza, Antioquia) mediante modelos estadísticos, de Machine Learning y Deep Learning, orientado a apoyar la generación temprana de alertas en el **Sistema de Alerta y Monitoreo de Antioquia (SAMA)**.

**Trabajo de Fin de Estudios** — Máster Universitario en Inteligencia Artificial  
Universidad Internacional de La Rioja (UNIR)  
Tipo de trabajo: Piloto Experimental  
Director: Joan Escamilla Fuster  
Fecha: 9 de septiembre de 2026

## Autores

| Autor | Responsabilidad principal |
|---|---|
| Edgar José Aparicio Pérez | Auditoría de datos (OE1), modelos estadísticos (OE3) y ML (OE4) |
| Eduardo José Daza Cuello | Estado del arte, modelos de Deep Learning (OE5), discusión |
| Sebastián García Surianu | Dataset supervisado (OE2), resultados comparativos (OE6), coordinación con EAFIT |

## Resumen

Este proyecto diseña, implementa y evalúa un piloto de predicción hidrométrica para la quebrada La Oca utilizando registros del sensor de nivel **SN_1007** y del pluviómetro **SP_108**, administrados por SAMA. El objetivo es anticipar el nivel del cauce en horizontes de **1, 2 y 3 horas**, comparando Persistencia, ARIMA, ARIMAX, Random Forest, XGBoost, LSTM y GRU.

A partir de un dataset supervisado con retardos de nivel y acumulados de precipitación, los modelos se evaluaron **fuera de muestra** sobre el periodo TEST. Los mejores resultados globales fueron:

| Horizonte | Mejor MAE | Modelo | Mejora frente a Persistencia |
|---|---|---|---|
| 1 h | 1,354 cm | XGBoost | 35,7 % |
| 2 h | 2,339 cm | Random Forest | 39,0 % |
| 3 h | 3,465 cm | XGBoost | 36,3 % |

No existe un modelo universalmente superior: Random Forest destacó en crecientes ≥ 20 cm, mientras que GRU fue especialmente relevante en alertamiento ROJO y picos severos a 3 horas. La principal limitación es la tendencia a subestimar crecientes rápidas y picos extremos.

**Palabras clave:** predicción hidrométrica; alertas tempranas; SAMA; aprendizaje automático; aprendizaje profundo.

## Motivación

Las inundaciones y crecientes súbitas son una de las amenazas hidrometeorológicas de mayor impacto en Antioquia. SAMA integra sensores, análisis y comunicación para la gestión del riesgo, pero un sistema basado principalmente en la observación presente ofrece un margen limitado de anticipación en cuencas de respuesta rápida.

Este piloto evalúa si una capa predictiva basada en datos puede complementar —sin reemplazar— los mecanismos actuales de monitoreo y alerta.

### Pregunta de investigación

¿En qué medida los modelos estadísticos, de Machine Learning y de Deep Learning, entrenados con las series temporales hidrometeorológicas disponibles de SAMA para la quebrada La Oca, permiten anticipar su nivel hidrométrico a horizontes de 1, 2 y 3 horas y mejorar el desempeño de un baseline de persistencia, tanto en condiciones generales como durante situaciones hidrológicamente críticas?

### Hipótesis

Los modelos estadísticos, de Machine Learning y de Deep Learning entrenados con series temporales hidrométricas y pluviométricas de SAMA pueden estimar el nivel futuro de la quebrada La Oca, en horizontes de 1, 2 y 3 horas, con un error inferior al producido por un baseline de persistencia, aportando capacidad predictiva adicional susceptible de ser evaluada como soporte potencial para sistemas de alerta temprana.

## Caso de estudio

| Elemento | Detalle |
|---|---|
| Cuenca | Quebrada La Oca, Zaragoza (Antioquia, Colombia) |
| Sensor de nivel | SN_1007 — 296.970 observaciones (10 nov 2025 – 10 jun 2026) |
| Pluviómetro | SP_108 — periodo coincidente con SN_1007 (59.834 registros) |
| Nivel observado | 210–413 cm (media 233,52 cm; P95 277 cm; P99 354 cm) |
| Resolución experimental | Cuadrícula causal de 5 minutos |
| Serie común | 61.207 intervalos (cobertura conjunta 97,11 %) |
| Horizontes | 1 h, 2 h y 3 h (predicción directa, no recursiva) |
| TEST | 9 may 2026 22:45 UTC – 10 jun 2026 |

Los umbrales **260 / 310 / 350 cm** (AMARILLO / NARANJA / ROJO) se infirieron de las categorías del dataset. Tienen carácter experimental y deben confirmarse con el equipo de hidrología antes de usarse como umbrales operativos oficiales de SAMA.

## Objetivos

### Objetivo general

Diseñar, implementar y evaluar un piloto experimental de predicción hidrométrica basado en inteligencia artificial, orientado a anticipar el nivel futuro de la quebrada La Oca en horizontes de 1, 2 y 3 horas, con el fin de analizar la capacidad de los modelos estadísticos, de Machine Learning y de Deep Learning para apoyar la generación temprana de alertas en SAMA.

### Objetivos específicos

| OE | Descripción |
|---|---|
| **OE1** | Caracterizar disponibilidad, calidad, frecuencia, cobertura y continuidad de SN_1007 y SP_108 |
| **OE2** | Construir un dataset supervisado causal con nivel y precipitación; targets a 1, 2 y 3 h |
| **OE3** | Implementar baselines estadísticos: Persistencia, ARIMA y ARIMAX |
| **OE4** | Implementar Random Forest y XGBoost, con selección de hiperparámetros en validación |
| **OE5** | Implementar LSTM y GRU sobre secuencias temporales reales de nivel y precipitación |
| **OE6** | Comparar los siete enfoques en TEST (MAE, RMSE, NSE, KGE) y analizar crecientes, alertas y picos |
| **OE7** | Analizar utilidad potencial y limitaciones como apoyo futuro a SAMA |

## Metodología

La estrategia es **comparativa y progresiva**. Las configuraciones se eligen solo con Train y Validation, se **congelan** y TEST se usa únicamente para la evaluación final fuera de muestra. No hay *shuffle* ni uso de información futura.

Walk-forward se aplica específicamente a **ARIMA y ARIMAX**. Random Forest, XGBoost, LSTM y GRU se desarrollan con separación cronológica Train / Validation / TEST y purga temporal entre bloques.

### Pipeline

```
1. Auditoría SN_1007 y SP_108
        ↓
2. Integración causal a 5 min y análisis de continuidad
        ↓
3. Datasets supervisados (tabulares y secuencias) + targets 1/2/3 h
        ↓
4. Split cronológico Train / Validation / TEST + purga
        ↓
5. Entrenamiento y selección de configuraciones (sin TEST)
        ↓
6. Congelación de configuraciones
        ↓
7. Evaluación fuera de muestra (mismos timestamps por horizonte)
        ↓
8. Análisis de crecientes, alertamiento, episodios y picos
```

### Representación de los datos

**Modelos tabulares (Random Forest, XGBoost)** — 18 variables:

- Nivel actual y retardos: 5, 10, 15, 30 min; 1, 2 y 3 h
- Cambios de nivel: 5, 15, 30 min y 1 h
- Precipitación actual y acumulados: 15, 30 min; 1, 2 y 3 h

**Redes recurrentes (LSTM, GRU):** secuencias reales de **37 pasos × 2 variables** (nivel y precipitación), equivalentes a 3 h de historia más el instante actual.

**Targets independientes:** `nivel(t+12)`, `nivel(t+24)` y `nivel(t+36)` en la grilla de 5 min. No se usa predicción recursiva entre horizontes.

### Modelos evaluados

| Familia | Modelos | Configuración definitiva |
|---|---|---|
| Baseline | Persistencia | ŷ(t+h) = y(t) |
| Estadísticos | ARIMA, ARIMAX | ARIMA(2,1,1); precipitación antecedente causal en ARIMAX |
| Machine Learning | Random Forest, XGBoost | `RF_sqrt`; `XGB_regularizado` |
| Deep Learning | LSTM, GRU | 64 → 32 → Dense 32 → salida |

### Métricas

**Globales:** MAE, RMSE, NSE y KGE.

**Complementarias (condiciones críticas):**

- Crecientes rápidas: incremento futuro ≥ 20 cm
- Alertamiento experimental: POD, FAR, CSI, F1 (umbrales 260 / 310 / 350 cm)
- Picos: error en el instante exacto del máximo y máximo pronosticado durante el episodio

## Resultados principales (TEST)

Muestras TEST: 7.573 (1 h), 7.560 (2 h) y 7.547 (3 h).

### MAE global (cm)

| Modelo | 1 h | 2 h | 3 h |
|---|---:|---:|---:|
| XGBoost | **1,354** | 2,375 | **3,465** |
| Random Forest | 1,370 | **2,339** | 3,491 |
| LSTM | 1,489 | 2,769 | 4,066 |
| GRU | 1,592 | 2,398 | 3,746 |
| ARIMAX | 2,017 | 3,718 | 5,328 |
| ARIMA | 2,031 | 3,721 | 5,330 |
| Persistencia | 2,107 | 3,834 | 5,444 |

### Mejor modelo según criterio

| Criterio | 1 h | 2 h | 3 h |
|---|---|---|---|
| MAE global | XGBoost | Random Forest | XGBoost |
| Crecientes ≥ 20 cm | Random Forest | Random Forest | Random Forest |
| CSI ROJO | GRU | XGBoost | GRU |
| Pico severo | Random Forest | XGBoost | GRU |

### Hallazgos

- Random Forest y XGBoost son los más consistentes a nivel global.
- Random Forest tiene el menor error en crecientes ≥ 20 cm (MAE 17,08 / 29,01 / 37,47 cm).
- GRU gana relevancia a 3 h en KGE, CSI ROJO y picos severos.
- ARIMA y ARIMAX superan ligeramente a Persistencia; la precipitación lineal en ARIMAX aporta muy poco.
- El error en crecientes es mucho mayor que el error global. La subestimación es sistemática (≈ 85–93 % de las crecientes).
- En TEST hay evidencia limitada de extremos: **7** episodios ≥ 260 cm, **4** ≥ 310 cm y **2** ≥ 350 cm.

El TFE **no** es un sistema operacional de alertas. Justifica una fase posterior de validación, en paralelo con los mecanismos actuales de SAMA.

## Cómo reproducir el experimento

El experimento definitivo está en [`piloto_experimental.ipynb`](piloto_experimental.ipynb) (34 celdas, pensado para Google Colab). Semilla: **42**.

### Entorno de la ejecución final

| Componente | Versión |
|---|---|
| Python | 3.12.13 |
| numpy | 2.0.2 |
| pandas | 2.2.2 |
| scikit-learn | 1.6.1 |
| statsmodels | 0.14.6 |
| xgboost | 3.3.0 |
| tensorflow | 2.20.0 |
| pyarrow | 18.1.0 |

### Datos de entrada (no incluidos en el repositorio)

Por confidencialidad institucional, los CSV de SAMA no se publican. El notebook espera:

- `sn_1007_anomalias_detalle_nov.csv`
- `sp_108_anomalias_detalle.csv`

### Ejecución

1. Abrir `piloto_experimental.ipynb` en Colab o en un entorno local con GPU opcional (útil para LSTM/GRU).
2. Colocar los CSV en la ruta indicada al inicio del notebook.
3. Ejecutar las celdas en orden (auditoría → dataset → modelos → TEST → análisis hidrológico → exportación).

Las configuraciones se congelan **antes** de calcular métricas de TEST. No debe hacerse *tuning* posterior sobre ese periodo.

Un resumen numérico del cierre experimental está en [`RESUMEN_FINAL_EXPERIMENTO.md`](RESUMEN_FINAL_EXPERIMENTO.md).

## Estructura del repositorio

```
ia-hidrologia/
├── piloto_experimental.ipynb     # Experimento definitivo (OE1–OE7)
├── RESUMEN_FINAL_EXPERIMENTO.md  # Síntesis de resultados TEST
├── v1.1_TFM.ipynb                # Exploración preliminar
├── README.md
└── .gitignore
```

Los datos de SAMA, modelos entrenados y salidas locales quedan fuera del control de versiones (`.gitignore` excluye `*.csv`, `*.parquet` y `data/`).

## Limitaciones

- Una sola cuenca y un TEST de aproximadamente un mes.
- Pocos episodios severos independientes.
- Un único pluviómetro: precipitación puntual, no espacial.
- Vacíos en SP_108 (interrupción máxima ≈ 39,5 h).
- Solo precipitación antecedente; no hay lluvia futura ni radar/pronóstico.
- Umbrales de alerta inferidos, no oficiales.

## Trabajo futuro

1. Nuevos periodos de observación y validación independiente
2. Replicación del pipeline en otras cuencas de SAMA
3. Más información meteorológica (pluviómetros, radar, satélite, pronósticos)
4. Modelos orientados a extremos (pérdidas ponderadas, regímenes, probabilística)
5. Ensembles e integración con modelos físicos (HEC-RAS / HEC-HMS)
6. Arquitecturas avanzadas (Transformers, GNN) cuando haya más datos

## Contexto institucional

- **SAMA** — Sistema de Alerta y Monitoreo de Antioquia (DAGRAN)
- **IDEAM** — Instituto de Hidrología, Meteorología y Estudios Ambientales
- **UNGRD** — Unidad Nacional para la Gestión del Riesgo de Desastres
- Marco normativo: Ley 1523 de 2012, Política Nacional de Gestión del Riesgo, Marco de Sendai 2015–2030

## Licencia

Código del TFE: **MIT**.  
Los datos de SAMA siguen la política de datos del Sistema de Alerta y Monitoreo de Antioquia y no forman parte de esta licencia.

## Visor web interactivo

Hay un visor React en [`web/`](web/) para explorar resultados por horizonte, modelos, eventos críticos y conclusiones:

```bash
cd web
npm install
npm run dev
```

Build estático (preparado para Vercel): `npm run build`.

## Referencias clave

- Kratzert et al. (2024). *Global prediction of extreme floods in ungauged watersheds.* Nature.
- Muñoz et al. (2021). *Flood early warning systems using machine learning techniques.* Hydrology.
- Muñoz et al. (2018). *Flash-flood forecasting in an Andean mountain catchment.* Water.
- Wang et al. (2023). *Is the LSTM model better than RNN for flood forecasting tasks?* Water.
- Nevo et al. (2022). *Flood forecasting with machine learning models in an operational framework.* HESS.
- Liu et al. (2025). *From RNNs to Transformers: Benchmarking deep learning architectures for hydrologic prediction.* HESS.
