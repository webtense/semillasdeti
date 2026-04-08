# Plan completo de despliegue – Semillas de Ti

Este plan cubre todas las fases para lanzar la nueva landing (Astro híbrido + endpoint Brevo) de Semillas de Ti en Easypanel, incluyendo contenido, desarrollo, despliegue, newsletter y publicación en GitHub.

## 1. Contenido y diseño

1. **Definir tono y mensajes clave**
   - Marca principal: *Semillas de Ti*.
   - Firma visible: *Coaching emocional y profesional por Zoraida Pozo Barrio*.
   - CTA global: “Reserva una llamada”.
2. **Arquitectura de secciones**
   - Hero (valor + dos CTAs).
   - Quién soy (bio, valores, credenciales).
   - Cómo trabajo (método en 3 pasos).
   - Servicios (tres bloques principales).
   - Testimonios (4-6 citas).
   - Newsletter Brevo (lead magnet).
   - Contacto + WhatsApp.
   - Footer legal.
3. **Dirección visual**
   - Paleta cálida: arenas, terracotas, verdes suaves.
   - Tipografías: Playfair Display (titulares) + Source Sans 3 (texto).
   - Recursos: imágenes `public/images/hero.jpg`, `process.jpg`, `newsletter.jpg` (provenientes de los JPG existentes).

## 2. Stack y desarrollo

1. **Proyecto Astro + Tailwind** (carpeta `web/` ya creada):
   - `npm install`
   - `npx astro add tailwind`
   - `npm install @astrojs/node` para exponer `/api/newsletter`.
2. **Tailwind config**
   - Extender colores, fuentes y sombras (ver `tailwind.config.mjs`).
3. **Estilos globales**
   - `src/styles/global.css` con `@tailwind` + utilidades personalizadas.
4. **Componentes clave**
   - `src/layouts/Layout.astro`: metas, fuentes, body base.
   - `src/pages/index.astro`: landing completa.
5. **Variables de entorno**
   - `web/.env` (copiar de `.env.example`).
   - `BREVO_API_KEY`, `PUBLIC_BREVO_LIST_ID`, `PUBLIC_WHATSAPP_MESSAGE`.
6. **Build de verificación**
   - `npm run build` en `web/`.

## 3. Newsletter Brevo

1. Crear lista en Brevo y obtener su `listId`.
2. Generar API Key (`xkeysib-...`) y guardarla en `BREVO_API_KEY`.
3. El formulario `Newsletter cálida` llama a `/api/newsletter` → Brevo, por lo que no se necesitan `sibforms`.
4. Activar doble opt-in / automatizaciones desde Brevo.
5. Verificar `POST /api/newsletter` tras desplegar.

## 4. CTA WhatsApp

1. Número: `+34 665 694 516`.
2. Texto editable vía `PUBLIC_WHATSAPP_MESSAGE` (opcional).
3. Revisar botón flotante y CTA en hero/contacto.

## 5. Preparación del repositorio

1. `.gitignore` en la raíz (ya existe) ignora `node_modules`, `dist`, `.env` y subcarpetas.
2. `.env` en la raíz (contiene credenciales Easypanel, servidor, token GitHub y Brevo API).
3. `web/.env.example` documenta las variables públicas a completar.
4. Documentación en `README.md` (uso del proyecto, Brevo, GitHub, Easypanel y CI/CD).
5. `.github/workflows/deploy.yml` y `ops/systemd/semillasdeti.service` gestionan el despliegue automatizado.

## 6. Publicación en GitHub

1. Inicializar git en la raíz si aún no se hizo:
   ```bash
   git init
   git remote add origin https://github.com/webtense/semillasdeti.git
   ```
2. Commit inicial:
   ```bash
   git add .
   git commit -m "feat: primera versión landing Semillas de Ti"
   git push -u origin main
   ```
3. Tras el primer push, **rotar el token GitHub** (el actual se usó sólo para bootstrap).

## 7. Despliegue en Easypanel

1. **Acceso**
   - URL: `EASYPANEL_URL`
   - Usuario / contraseña en `.env`.
2. **Crear app**
   - Tipo: “Custom / Node app” para ejecutar `dist/server/entry.mjs`.
   - Conecta el repo o sube el código.
3. **Variables y comandos**
   - `BREVO_API_KEY`, `PUBLIC_BREVO_LIST_ID`, `PUBLIC_WHATSAPP_MESSAGE`, `PORT` (usamos `4173` sobre la interfaz docker `172.17.0.1`).
   - Build: `cd web && npm install && npm run build`.
   - Start: `cd web/dist && node ./server/entry.mjs` (el adaptador respeta `PORT`).
4. **Dominios y SSL**
   - Agregar `semillasdeti.com` y `www.semillasdeti.com`.
   - En DNS, apuntar registros A a la IP del servidor (`SERVER_HOST`).
   - Habilitar SSL Let’s Encrypt cuando propaguen.
5. **Verificaciones post deploy**
   - `https://semillasdeti.com` y `https://www.semillasdeti.com` responden.
   - Botones (WhatsApp, reserva, newsletter) operativos.
   - Lighthouse (desktop + mobile).
   - Sitemap: `https://semillasdeti.com/sitemap.xml`.
6. **Rotación de credenciales**
   - Cambiar contraseñas de Easypanel y servidor.
   - Guardar nuevas claves en un gestor seguro.

## 9. Pipeline automatizado

1. Configurar los secretos del repositorio (`SERVER_HOST`, `SERVER_USER`, `SERVER_PASSWORD`, `SERVER_SSH_PORT`).
2. Copiar `ops/systemd/semillasdeti.service` a `/etc/systemd/system/`, crear el usuario `semillasdeti` (sin shell) y ejecutar:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now semillasdeti
   ```
3. El workflow `deploy.yml` (push a `main` o manual) compila el sitio, lo sube a `/tmp` y reinicia el servicio.
4. Monitorizar ejecuciones desde la pestaña Actions y revisar `journalctl -u semillasdeti -f` en el servidor tras cada despliegue.

## 8. Mantenimiento y siguientes pasos

1. **Backups**: Habilitar copias automáticas desde Easypanel o cron en el servidor.
2. **Monitorización**: Analíticas básicas (Plausible/umami) y alertas uptime.
3. **SEO**: Alta en Google Search Console + Sitemap; revisar indexación.
4. **Newsletter**: Revisar tasas de apertura y ajustar contenidos.
5. **Roadmap**: Formularios con envío backend, blog estático, versiones en EN/ES, etc.

Con este documento tienes el plan completo y ordenado para desde contenido → desarrollo → despliegue → operación continua.
