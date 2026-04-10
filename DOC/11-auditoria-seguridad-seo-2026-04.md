# 11 - Auditoria de Seguridad y SEO (2026-04)

## Objetivo

Aplicar blindaje de seguridad prioritario y quick wins SEO visibles en Search Console.

## Cambios aplicados

### Seguridad

- Middleware reforzado con cabeceras:
  - `Content-Security-Policy`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Strict-Transport-Security` (solo prod sobre HTTPS)
- `X-Robots-Tag: noindex` en `/admin` y `/api`.
- `Cache-Control: no-store` para rutas admin.
- Endurecimiento de autenticacion:
  - comparacion segura de credenciales
  - token de sesion con username codificado
  - cookies con `sameSite=strict`.
- Upload de imagen endurecido:
  - validacion de firma de archivo (magic bytes)
  - tipos permitidos: JPG/PNG/WEBP
  - limite de tamano: 5MB.
- Endpoint de rebuild endurecido:
  - bloqueo de caracteres peligrosos de shell
  - ejecucion sin shell mediante `execFile`.
- Endpoint newsletter endurecido:
  - rate limiting por IP
  - limite de tamano de payload.

### SEO tecnico (quick wins)

- Canonical dinamico en layout global.
- Meta robots por pagina (`index/follow` o `noindex/nofollow`).
- Open Graph mejorado:
  - `og:url` dinamico
  - `og:image` absoluto
  - `og:locale` y `og:site_name`.
- Soporte de verificacion Search Console por env:
  - `PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Datos estructurados JSON-LD en home:
  - `WebSite`
  - `ProfessionalService`
  - `Person`.
- `robots.txt` creado en `web/public/robots.txt`.
- `sitemap.xml` creado en `web/src/pages/sitemap.xml.ts`.
- Admin marcado como `noindex` en layout.

## Estado de dependencias

- Actualizado a:
  - `astro@5.18.1`
  - `@astrojs/node@9.5.5`
  - `tailwindcss@3.4.19`
  - `postcss` + `autoprefixer`
- Resultado `npm audit --omit=dev`:
  - 1 vulnerabilidad moderada residual en `@astrojs/node <10.0.0`.

## Riesgo residual y siguiente paso recomendado

Para eliminar la vulnerabilidad residual del adaptador Node se requiere:

1. Actualizar a `@astrojs/node@10.x` (requiere Astro 6).
2. Actualizar runtime a Node >= 22.12.

Mientras no se migre Node a 22, el proyecto no puede compilar con Astro 6 en este entorno.

## Checklist Search Console (post-deploy)

- Enviar `https://semillasdeti.com/sitemap.xml`.
- Verificar indexacion de home con Inspeccion de URL.
- Confirmar exclusion de `/admin` y `/api` en cobertura.
- Revisar mejoras de resultados enriquecidos (Schema).
