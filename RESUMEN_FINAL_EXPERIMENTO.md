# Predicción de nivel — Quebrada La Oca

## Resumen final del experimento

Exportación generada: `2026-08-13T05:49:43.666316+00:00`

Horizontes evaluados: **1 h, 2 h y 3 h**.

Modelos evaluados:

- Persistencia
- ARIMA
- ARIMAX
- Random Forest
- XGBoost
- LSTM
- GRU

## Resultados por horizonte

### Horizonte 1h

- Mejor MAE global: **XGBoost**, MAE = 1.354 cm.
- Mejora de MAE frente a persistencia: **35.7%**.
- Mejor desempeño en crecientes >=20 cm: **Random Forest**, MAE = 17.08 cm.
- Subestimación en crecientes del mejor modelo: 92.8%.
- Mejor equilibrio de alertamiento ROJO: **GRU**, CSI = 0.950, POD = 0.978, FAR = 0.029.
- Mejor estimación del pico severo: **Random Forest**, MAE del pico exacto = 10.69 cm.

### Horizonte 2h

- Mejor MAE global: **Random Forest**, MAE = 2.339 cm.
- Mejora de MAE frente a persistencia: **39.0%**.
- Mejor desempeño en crecientes >=20 cm: **Random Forest**, MAE = 29.01 cm.
- Subestimación en crecientes del mejor modelo: 84.6%.
- Mejor equilibrio de alertamiento ROJO: **XGBoost**, CSI = 0.752, POD = 0.752, FAR = 0.000.
- Mejor estimación del pico severo: **XGBoost**, MAE del pico exacto = 37.19 cm.

### Horizonte 3h

- Mejor MAE global: **XGBoost**, MAE = 3.465 cm.
- Mejora de MAE frente a persistencia: **36.3%**.
- Mejor desempeño en crecientes >=20 cm: **Random Forest**, MAE = 37.47 cm.
- Subestimación en crecientes del mejor modelo: 88.8%.
- Mejor equilibrio de alertamiento ROJO: **GRU**, CSI = 0.630, POD = 0.672, FAR = 0.089.
- Mejor estimación del pico severo: **GRU**, MAE del pico exacto = 32.14 cm.

## Conclusiones generales

- No existe un único modelo dominante para todos los objetivos de predicción.
- Random Forest y XGBoost presentan el comportamiento global más consistente.
- Random Forest muestra especial fortaleza durante crecientes de al menos 20 cm.
- GRU adquiere especial relevancia en horizontes largos, particularmente en alertamiento ROJO y estimación de picos severos a 3 h.
- El error durante crecientes y eventos severos es sustancialmente mayor que el error global.
- La subestimación de crecientes constituye una limitación recurrente de los modelos.
- ARIMA y ARIMAX funcionan como baselines estadísticos útiles, pero fueron superados globalmente por los modelos no lineales.
- La mejora de ARIMAX frente a ARIMA fue pequeña, por lo que la incorporación lineal y causal de precipitación no aportó una mejora sustancial.
- Los resultados sobre extremos deben interpretarse con cautela debido al número reducido de episodios severos independientes disponibles.

## Limitaciones cuantitativas del periodo TEST

- Episodios hidrométricos identificados: **7**.
- Episodios con pico >=310 cm: **4**.
- Episodios con pico >=350 cm: **2**.
- Picos severos evaluables: **4**.
- Cruces ROJO evaluables: **2**.

Los umbrales **260 / 310 / 350 cm** utilizados en la evaluación fueron inferidos de las categorías presentes en el dataset y deben ser confirmados por el equipo de hidrología antes de considerarse umbrales operativos oficiales.

## Interpretación metodológica

Los resultados corresponden exclusivamente al periodo fuera de muestra utilizado como TEST. Las configuraciones de los modelos fueron fijadas antes de observar estas métricas y no se realizó tuning posterior.

La generalización operacional requiere validación con un mayor número de episodios severos independientes y, preferiblemente, con periodos adicionales o nuevas cuencas.

## Archivos principales

- `tablas/`: resultados numéricos del experimento.
- `figuras/`: visualizaciones finales en PNG y PDF.
- `modelos/`: modelos finales entrenados.
- `datasets/`: datasets procesados utilizados durante el análisis.