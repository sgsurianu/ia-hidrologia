# Piloto experimental de predicción hidrométrica — Quebrada La Oca

Piloto experimental de predicción hidrométrica en la quebrada La Oca (Zaragoza, Antioquia) mediante modelos estadísticos, de Machine Learning y Deep Learning, orientado a apoyar la generación temprana de alertas en el **Sistema de Alerta y Monitoreo de Antioquia (SAMA)**.

**Trabajo de Fin de Estudios** — Máster Universitario en Inteligencia Artificial  
Universidad Internacional de La Rioja (UNIR)  
Tipo de trabajo: Piloto Experimental  
Director: Joan Escamilla Fuster  
Fecha: 24 de junio de 2026

## Autores

| Autor | Responsabilidad principal |
|---|---|
| Edgar José Aparicio Pérez | Auditoría de datos (OE1), modelos estadísticos (OE3) y ML (OE4) |
| Eduardo José Daza Cuello | Estado del arte, modelos de Deep Learning (OE5) |
| Sebastián García Surianu | Dataset supervisado (OE2), resultados comparativos (OE6), coordinación con EAFIT |

## Resumen

Este proyecto diseña, implementa y evalúa un piloto de predicción hidrométrica en la quebrada La Oca utilizando datos del sensor de nivel **SN107** y el pluviómetro **SP108** administrados por SAMA. El objetivo es anticipar el nivel futuro del cauce en horizontes de **1, 2 y 3 horas**, comparando bajo una estrategia de complejidad creciente la capacidad de modelos estadísticos, de Machine Learning y de Deep Learning frente a un baseline de persistencia.

La metodología se articula en ocho pasos encadenados: auditoría de datos, construcción de un dataset supervisado, entrenamiento progresivo de modelos, evaluación con métricas hidrológicas, discusión de resultados, comparación con la literatura, análisis de viabilidad operativa e integración con SAMA. La validación sigue un esquema **walk-forward** para evitar fugas de información y reflejar el uso operacional real del sistema.

**Palabras clave:** predicción hidrométrica, alertas tempranas, SAMA, Machine Learning, Deep Learning.

## Motivación

Las inundaciones y crecientes súbitas representan una de las amenazas hidrometeorológicas de mayor impacto en Antioquia. SAMA integra sensores hidrometeorológicos, herramientas de análisis y mecanismos de comunicación para la gestión del riesgo, pero gran parte de su operación se basa en la observación de condiciones actuales y en umbrales predefinidos, lo que ofrece un tiempo de reacción limitado en cuencas de respuesta rápida.

La quebrada La Oca, en el municipio de Zaragoza, tiene antecedentes de inundaciones recurrentes y cuenta con instrumentación de SAMA. Este piloto evalúa si una capa predictiva basada en inteligencia artificial puede complementar —sin reemplazar— los mecanismos actuales de monitoreo y alerta.

### Pregunta de investigación

¿En qué medida una capa predictiva basada en modelos estadísticos, de Machine Learning y de Deep Learning, entrenada con series temporales hidrometeorológicas de SAMA, permite anticipar el nivel hidrométrico futuro de la quebrada La Oca en horizontes de 1, 2 y 3 horas, frente a un enfoque basado únicamente en persistencia y umbrales operativos?

### Hipótesis

La integración de modelos de aprendizaje automático y aprendizaje profundo, entrenados con series temporales hidrométricas y pluviométricas de SAMA, permite estimar el nivel futuro de la quebrada La Oca con un error inferior al producido por un baseline de persistencia, en horizontes de 1, 2 y 3 horas, aportando información complementaria utilizable para la activación preventiva de alertas tempranas.

## Caso de estudio

| Elemento | Detalle |
|---|---|
| Cuenca | Quebrada La Oca, municipio de Zaragoza (Antioquia, Colombia) |
| Sensor de nivel | SN107 (SN_100740) — ~493.472 registros (may 2025 – jun 2026) |
| Pluviómetro | SP108 (SP_10844) — ~96.938 registros (jun 2025 – jun 2026) |
| Frecuencia nativa | 5 / 10 / 15 minutos |
| Fuente de datos | API del Geoportal de SAMA |
| Horizontes de predicción | 1 h, 2 h y 3 h |

## Objetivos

### Objetivo general

Diseñar y evaluar un piloto experimental de predicción hidrométrica basado en inteligencia artificial, orientado a anticipar el nivel futuro de la quebrada La Oca en horizontes de 1, 2 y 3 horas, con el fin de analizar la capacidad de los modelos estadísticos, de Machine Learning y de Deep Learning para apoyar la generación temprana de alertas en SAMA.

### Objetivos específicos

| OE | Descripción |
|---|---|
| **OE1** | Caracterizar disponibilidad, calidad y cobertura de los datos hidrometeorológicos de SAMA |
| **OE2** | Construir un dataset supervisado con lags de nivel y acumulados de lluvia |
| **OE3** | Implementar modelos estadísticos baseline (persistencia, ARIMA, ARIMAX) |
| **OE4** | Implementar modelos de Machine Learning (Random Forest, XGBoost) |
| **OE5** | Implementar modelos de Deep Learning (LSTM, GRU) |
| **OE6** | Comparar el desempeño mediante MAE, RMSE, NSE y KGE |
| **OE7** | Determinar la viabilidad técnica de integrar el mejor modelo en SAMA |

## Metodología

La estrategia experimental es **comparativa y progresiva**: cada modelo más complejo debe justificarse frente al anterior. La validación utiliza un esquema **walk-forward** que entrena con datos hasta el instante *t* y evalúa en *t+1*, *t+2* y *t+3*, evitando fugas de información del futuro al pasado.

### Pipeline

```
📡 Datos SAMA
    ↓
🧹 Preprocesamiento (auditoría, limpieza, alineación temporal, features)
    ↓
🤖 Entrenamiento progresivo (persistencia → ARIMA → RF → XGBoost → LSTM → GRU)
    ↓
📊 Evaluación (MAE, RMSE, NSE, KGE por horizonte)
    ↓
🌍 Inferencia operacional
```

### Dataset supervisado

**Variables predictoras:**
- Lags de nivel: t-1, t-5, t-10, t-30, t-60 minutos
- Acumulados de lluvia: 15 min, 1 h, 3 h

**Variable objetivo:**
- `nivel_t+60min`, `nivel_t+120min`, `nivel_t+180min`

### Modelos evaluados

| Familia | Modelos |
|---|---|
| Baseline | Persistencia |
| Estadísticos | ARIMA, ARIMAX |
| Machine Learning | Random Forest, XGBoost |
| Deep Learning | LSTM, GRU |

### Métricas de evaluación

| Métrica | Sigla | Interpretación |
|---|---|---|
| Error absoluto medio | MAE | Error medio en centímetros |
| Raíz del error cuadrático medio | RMSE | Penaliza errores grandes |
| Eficiencia de Nash-Sutcliffe | NSE | Eficiencia hidrológica (ideal = 1) |
| Eficiencia de Kling-Gupta | KGE | Correlación, variabilidad y sesgo (ideal = 1) |

## Estructura del repositorio

```
ia-hidrologia/
├── src/
│   ├── data.py          # Descarga y auditoría de datos SAMA
│   ├── features.py      # Generación de lags y acumulados
│   ├── models.py        # Entrenamiento de modelos
│   ├── evaluate.py      # Cálculo de métricas y tabla comparativa
│   └── infer.py         # Inferencia operacional
├── notebooks/           # Cuadernos exploratorios (EDA)
├── tests/               # Pruebas unitarias
├── config.yaml          # Configuración experimental y semillas
├── requirements.txt     # Dependencias con versiones fijadas
└── README.md
```

> Los datos de SAMA **no se incluyen** en el repositorio por criterios de confidencialidad institucional. Se proporciona un script de descarga (`src/data/download.py`) para replicar la adquisición con credenciales autorizadas.

## Reproducibilidad

- Semillas aleatorias fijadas en `config.yaml` (`numpy`, `tensorflow`, `random`)
- Versiones de librerías registradas en `requirements.txt`
- Configuración experimental documentada en `config.yaml`
- Commits atómicos con mensajes descriptivos en el historial de Git

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sgsurianu/ia-hidrologia.git
cd ia-hidrologia

# Crear entorno virtual
python -m venv .venv
source .venv/bin/activate  # Linux/macOS

# Instalar dependencias
pip install -r requirements.txt
```

## Líneas futuras

1. **Fase 2** — Validación multicuenca en otras cuencas instrumentadas por SAMA
2. **Fase 3** — Incorporación de radar meteorológico, GOES y pronósticos IDEAM
3. **Fase 4** — Modelos híbridos HEC-RAS + IA
4. **Fase 5** — Transformers para series temporales
5. **Fase 6** — Graph Neural Networks (GNN)

## Contexto institucional

- **SAMA** — Sistema de Alerta y Monitoreo de Antioquia (DAGRAN)
- **IDEAM** — Instituto de Hidrología, Meteorología y Estudios Ambientales
- **UNGRD** — Unidad Nacional para la Gestión del Riesgo de Desastres
- Marco normativo: Ley 1523 de 2012, Política Nacional de Gestión del Riesgo, Marco de Sendai 2015–2030

## Licencia

Por definir.

## Referencias clave

- Kratzert et al. (2024) — Predicción de inundaciones con LSTM a escala global
- Muñoz et al. (2021) — Machine Learning en cuencas andinas de respuesta rápida
- Wang et al. (2023) — Revisión de Deep Learning en predicción de inundaciones
- Nevo et al. (2022) — Sistema operacional de pronóstico de inundaciones de Google
