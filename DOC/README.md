# Documentacion del Proyecto - Semillas de Ti

Este directorio centraliza la documentacion tecnica y operativa del proyecto.

## Indice

- `DOC/01-arquitectura.md`: stack, estructura y flujo de la aplicacion.
- `DOC/02-estilo-y-ui.md`: libro de estilos (branding, tipografia, color y componentes).
- `DOC/03-contenido-y-formatos.md`: modelo de contenido editable y formatos permitidos.
- `DOC/04-admin-panel.md`: uso del panel `/admin`, autenticacion y flujos de edicion.
- `DOC/05-despliegue-operacion.md`: despliegue, variables de entorno y runbook.
- `DOC/06-seguridad-checklist.md`: medidas de seguridad implementadas y pendientes.
- `DOC/07-estandares-y-formatos.md`: convenciones de desarrollo y formatos.
- `DOC/08-manual-operacion-no-tecnico.md`: guia paso a paso para editar y publicar cambios.
- `DOC/09-guia-cliente-1-pagina.md`: version ultra simple para uso diario.
- `DOC/10-guia-cliente-checklist.md`: version imprimible en formato checklist.
- `DOC/11-auditoria-seguridad-seo-2026-04.md`: hardening aplicado y estado de riesgos.

## Estado funcional actual

- Sitio principal en Astro + Tailwind con contenido dinamico basado en `web/src/data/site.json`.
- Panel de administracion disponible en `web/src/pages/admin/index.astro`.
- API de newsletter integrada con Brevo en `web/src/pages/api/newsletter.ts`.
- Carga de imagenes desde admin a `web/public/images/uploads/`.
- Flujo opcional de rebuild manual via `ADMIN_REDEPLOY_COMMAND`.

## Convencion de mantenimiento

- Toda decision tecnica nueva debe reflejarse en esta carpeta.
- Si cambia el contenido editable, actualizar `DOC/03-contenido-y-formatos.md`.
- Si cambia el estilo visual, actualizar `DOC/02-estilo-y-ui.md`.
