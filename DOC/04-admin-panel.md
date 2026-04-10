# 04 - Panel de Administracion

## Acceso

- URL: `/admin/login`
- Requiere `ADMIN_USERNAME` y `ADMIN_PASSWORD`.
- Tras login correcto redirige a `/admin`.

## Seguridad aplicada

- Sesion firmada con HMAC (`ADMIN_SESSION_SECRET`).
- Cookie de sesion: `httpOnly`, `sameSite=lax`, `secure` en produccion.
- Token CSRF en cookie + validacion de formulario.
- Rate limit basico en endpoint de login.
- Middleware protege todas las rutas `/admin`.

## Funciones del dashboard

1. Subir imagenes y obtener la ruta publica.
2. Editar el JSON completo del sitio.
3. Guardar cambios en `src/data/site.json`.
4. Ejecutar rebuild manual opcional.
5. Cerrar sesion.

## Endpoints del admin

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/admin/content`
- `POST /api/admin/upload`
- `POST /api/admin/rebuild`

## Errores frecuentes

- `csrf`: token de formulario invalido o ausente.
- `json`: formato JSON invalido.
- `upload`: formato o tamano de imagen no permitido.
- `rebuild=missing`: no existe `ADMIN_REDEPLOY_COMMAND`.
