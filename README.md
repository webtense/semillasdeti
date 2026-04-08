# Semillas de Ti – Landing de Coaching

Landing page cálida y moderna para presentar los servicios de coaching de **Zoraida Pozo Barrio**. El sitio está construido con Astro + Tailwind y pensado para desplegarse como sitio estático en Easypanel bajo el dominio `semillasdeti.com`.

## Estructura del repositorio

- `web/` – Código fuente del sitio (Astro 4 + Tailwind 3).
- `public/images/` – Recursos visuales utilizados en la landing.
- `README.md` – Este documento.
- `.env` – **No versionado**. Contiene las credenciales sensibles que compartiste (Easypanel, servidor, GitHub). El archivo ya existe en local y está ignorado por git.

> Importante: todo el flujo de desarrollo (npm scripts, build, etc.) se ejecuta dentro de `web/`.

## Cómo levantar el proyecto

```bash
cd web
npm install
cp .env.example .env # y completa los valores públicos
npm run dev
```

### Variables públicas necesarias (`web/.env`)

| Variable | Uso |
| --- | --- |
| `PUBLIC_BREVO_FORM_ACTION` | URL de acción del formulario generado por Brevo (`sibforms`) |
| `PUBLIC_BREVO_LIST_ID` | ID numérico de la lista/listas de Brevo a la que se enviarán los contactos |
| `PUBLIC_WHATSAPP_MESSAGE` | Mensaje precargado para el CTA de WhatsApp |

> El archivo `web/.env.example` trae el formato que debes seguir. Copia el contenido en `web/.env` y actualiza los valores reales.

## Configuración de la newsletter (Brevo)

1. En Brevo crea un formulario tipo embebido (Marketing → Formularios → Nuevo formulario).
2. Copia la URL de acción que Brevo entrega (`https://xxx.sibforms.com/serve/...`). Ese valor va en `PUBLIC_BREVO_FORM_ACTION`.
3. Anota el `listid` asociado al formulario y colócalo en `PUBLIC_BREVO_LIST_ID`.
4. Si añades campos adicionales, respeta los nombres que Brevo espera (`FIRSTNAME`, `EMAIL`, etc.).
5. Activa el doble opt-in desde Brevo para cumplir RGPD. El formulario de la web ya incluye el check de consentimiento.

## CTA de WhatsApp

Puedes personalizar el texto que aparecerá al abrir la conversación modificando `PUBLIC_WHATSAPP_MESSAGE` en `web/.env` (opcional, ya hay un mensaje por defecto en el código).

## Plan de despliegue en Easypanel

1. **Preparar el build**
   ```bash
   cd web
   npm install
   npm run build
   ```
   Esto genera el sitio estático en `web/dist`.

2. **Crear proyecto en Easypanel**
   - Accede con las credenciales guardadas en `.env` (`EASYPANEL_URL`, `EASYPANEL_USER`, `EASYPANEL_PASSWORD`).
   - Crea una nueva app tipo “Static Site”.
   - Conecta el repositorio de GitHub `webtense/semillasdeti` o configura un despliegue manual subiendo los archivos de `dist`.

3. **Configurar dominio y SSL**
   - En Easypanel, agrega los dominios `semillasdeti.com` y `www.semillasdeti.com`.
   - En el proveedor DNS apunta ambos dominios a la IP del servidor (`SERVER_HOST`).
   - Una vez propagado, activa Let’s Encrypt en Easypanel para ambos hosts.

4. **Deploy**
   - Si usas GitHub, configura un deploy hook o ejecuta `npm run build` → subir el contenido de `dist` a la app.
   - Verifica que `/`, secciones internas, CTA de WhatsApp y formulario de newsletter funcionen correctamente.

5. **Post-deploy**
   - Activa análisis y caché desde Easypanel o con un CDN ligero.
   - Revisa Core Web Vitals con Lighthouse (desktop + mobile).
   - Registra el sitio en Google Search Console y sube el `sitemap.xml` generado automáticamente por Astro.

## Plan para subir a GitHub

1. Inicializa git en la raíz del proyecto (esta carpeta). Los binarios y `.env` ya están ignorados en `.gitignore`.
2. Usa el token de GitHub guardado en `.env` (`GITHUB_TOKEN`) para autenticarte.
3. Ejecuta:
   ```bash
   git init
   git remote add origin https://github.com/webtense/semillasdeti.git
   git add .
   git commit -m "feat: primera versión landing Semillas de Ti"
   git push -u origin main
   ```

## Seguridad y próximos pasos

- **Rotar credenciales**: después del primer push despliega nuevas contraseñas para Easypanel, servidor y token GitHub.
- **Backups**: activa copias automáticas en el servidor y guarda una copia del `.env` en un gestor seguro.
- **Formularios**: si necesitas un formulario de contacto con envío real, integra un servicio como Brevo, Formspree o una función serverless desde Easypanel.

Con esto tienes el plan completo para ejecutar, desplegar y mantener la nueva web de Semillas de Ti.
