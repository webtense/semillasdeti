# 01 - Arquitectura

## Resumen

Semillas de Ti es una web de marketing con panel de administracion propio.

- Framework: Astro 4
- UI: Tailwind CSS
- Runtime: Node adapter (`@astrojs/node`) en modo `standalone`
- Salida: `hybrid` (SSR + prerender selectivo)
- Idioma principal: Espanol

## Estructura principal

- `web/src/pages/index.astro`: home publica.
- `web/src/pages/admin/login.astro`: login del panel admin.
- `web/src/pages/admin/index.astro`: dashboard admin.
- `web/src/pages/api/newsletter.ts`: endpoint para Brevo.
- `web/src/pages/api/admin/*.ts`: endpoints admin (login, logout, content, upload, rebuild).
- `web/src/lib/content.ts`: lectura, normalizacion y guardado de contenido.
- `web/src/lib/auth.ts`: sesiones, firma HMAC, cookies y CSRF.
- `web/src/middleware.ts`: proteccion de rutas `/admin`.
- `web/src/data/site.json`: contenido editable central.

## Flujo de render

1. Peticion a `/`.
2. `index.astro` carga contenido desde `getSiteContent()`.
3. Se renderiza con datos normalizados (texto, imagenes, secciones).

## Flujo admin

1. Login en `/admin/login`.
2. `POST /api/admin/login` valida credenciales y crea cookies de sesion + CSRF.
3. Middleware permite acceso a `/admin` solo con sesion valida.
4. Dashboard permite:
   - Subir imagenes.
   - Editar JSON de contenido.
   - Ejecutar comando de rebuild opcional.

## Persistencia de contenido

- Fuente primaria: `web/src/data/site.json`.
- Escritura: `saveSiteContent()` valida y guarda JSON.
- Beneficio: cambios persistentes en archivo versionable y auditable.
