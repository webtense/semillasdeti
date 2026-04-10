# 05 - Despliegue y Operacion

## Requisitos

- Node.js >= 18.17
- Variables de entorno configuradas en servidor
- Reverse proxy HTTPS (Traefik/Nginx)

## Variables de entorno

Definidas en `web/.env.example`.

- Publicas/marketing:
  - `PUBLIC_BREVO_LIST_ID`
  - `PUBLIC_WHATSAPP_MESSAGE`
- Newsletter server:
  - `BREVO_API_KEY`
- Admin:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
  - `ADMIN_REDEPLOY_COMMAND` (opcional)

## Flujo de despliegue sugerido

1. Instalar dependencias: `npm ci`
2. Build: `npm run build`
3. Levantar servidor Node (adaptador standalone)
4. Exponer con proxy HTTPS

## Operacion diaria

- Edicion de contenido desde `/admin`.
- Verificacion rapida del sitio en `/` tras guardar.
- Si aplica build manual, ejecutar boton de rebuild en admin.

## Monitoreo minimo

- Logs de proceso Node.
- Logs de proxy (4xx/5xx).
- Verificacion periodica de `api/newsletter`.
