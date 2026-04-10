# 07 - Estandares y Formatos

## Convenciones de codigo

- Lenguaje: TypeScript donde aplica.
- Formato: indentacion con tabs en archivos Astro/TS del proyecto actual.
- Nombres:
  - Archivos de librerias: `camelCase.ts`.
  - Rutas API: nombres cortos y semanticos (`login.ts`, `upload.ts`).

## Formato de commits (recomendado)

- `feat: ...` nuevas funcionalidades.
- `fix: ...` correcciones.
- `docs: ...` cambios de documentacion.
- `refactor: ...` mejoras internas sin cambio funcional.

## Formato de contenido

- JSON valido, sin comentarios.
- Rutas de imagen absolutas desde `/public`.
- Textos orientados a conversion, tono cercano y claro.

## Formato de assets

- Imagenes: `.jpg`, `.png`, `.webp`.
- Peso recomendado para web publica: < 400KB por imagen visible above-the-fold.
- Peso maximo en subida admin: 5MB.

## Formato de variables de entorno

- Definicion en `KEY="valor"`.
- Nunca versionar secretos reales.
- Plantilla oficial en `web/.env.example`.
