# Visor interactivo del TFE hidrométrico

Aplicación React (Vite + TypeScript) para explorar los resultados del piloto de predicción hidrométrica en la quebrada La Oca.

## Desarrollo

```bash
cd web
npm install
npm run dev
```

## Build de producción

```bash
cd web
npm run build
npm run preview
```

La carpeta `dist/` queda lista para despliegue estático en Vercel (`vercel.json` ya incluye rewrite SPA).

## Fuentes de datos

Todo el contenido numérico y textual proviene de:

- `piloto_experimental.ipynb`
- Memoria V8.2.2.1 (septiembre 2026)
- `README.md`
- `RESUMEN_FINAL_EXPERIMENTO.md`

Las referencias de tabla y capítulo se conservan en el código, no se muestran en pantalla.
