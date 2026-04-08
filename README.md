# Semillas de Ti – Landing de Coaching

Landing page cálida y moderna para presentar los servicios de coaching de **Zoraida Pozo Barrio**. El sitio está construido con Astro + Tailwind y ahora utiliza el adaptador Node (modo híbrido) para exponer un endpoint propio (`/api/newsletter`) que habla con la API de Brevo.

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

### Variables necesarias (`web/.env`)

| Variable | Uso |
| --- | --- |
| `PUBLIC_BREVO_LIST_ID` | ID numérico de la lista de Brevo donde guardar los contactos |
| `PUBLIC_WHATSAPP_MESSAGE` | Mensaje precargado para el CTA de WhatsApp |
| `BREVO_API_KEY` | API Key (xkeysib-…) para consumir `https://api.brevo.com/v3/contacts` |

> El archivo `web/.env.example` trae el formato que debes seguir. Copia el contenido en `web/.env` y actualiza los valores reales.

## Configuración de la newsletter (Brevo)

1. En Brevo crea una lista para Semillas de Ti y obtén su ID numérico.
2. Genera una **API Key** tipo “Transactional & Marketing” (formato `xkeysib-...`).
3. En `web/.env` establece `BREVO_API_KEY` y `PUBLIC_BREVO_LIST_ID` con esos valores.
4. El formulario de la web envía peticiones `POST /api/newsletter` → `api.brevo.com/v3/contacts` y hace `updateEnabled=true`; no necesitas `sibforms`.
5. Activa el doble opt-in / automation desde Brevo para enviar la guía cuando el contacto entre en la lista.

## CTA de WhatsApp

Puedes personalizar el texto que aparecerá al abrir la conversación modificando `PUBLIC_WHATSAPP_MESSAGE` en `web/.env` (opcional, ya hay un mensaje por defecto en el código).

## Plan de despliegue en Easypanel

1. **Preparar el build**
   ```bash
   cd web
   npm install
   npm run build
   ```
   Genera `web/dist/` con dos carpetas importantes: `client/` (estático) y `server/` (Node standalone para `/api/newsletter`).

2. **Crear proyecto en Easypanel**
   - Accede con las credenciales guardadas en `.env` (`EASYPANEL_URL`, `EASYPANEL_USER`, `EASYPANEL_PASSWORD`).
   - Crea una app tipo “Custom (Dockerfile/Node)” para poder ejecutar el servidor Node.
   - Variables mínimas: `PORT=4173` (u otro disponible), `BREVO_API_KEY`, `PUBLIC_BREVO_LIST_ID`, `PUBLIC_WHATSAPP_MESSAGE`.

3. **Pipeline de build**
   - `Build command`: `cd web && npm install && npm run build`.
   - `Start command`: `cd web/dist && node ./server/entry.mjs`.
   - Asegúrate de que la app escuche en `process.env.PORT` (el adaptador Node ya respeta esa variable). Por defecto usamos `4173` para evitar conflictos con el puerto `8080`, ocupado por Docker.

4. **Dominios y SSL**
   - En Easypanel agrega `semillasdeti.com` y `www.semillasdeti.com`.
   - En el proveedor DNS apunta ambos registros A a `SERVER_HOST`.
   - Cuando resuelvan, habilita Let’s Encrypt.

5. **Post-deploy**
   - Verifica `/api/newsletter` con una petición `POST` de prueba.
   - Comprueba Lighthouse (desktop + mobile) y actualiza Search Console + sitemap (`/sitemap.xml`).
   - Configura backups y monitorización.

## Automatización CI/CD (GitHub Actions)

El workflow `.github/workflows/deploy.yml` permite construir y desplegar automáticamente en el servidor.

1. **Secretos requeridos en el repo**
   - `SERVER_HOST`: IP o dominio del servidor (ej. `webtenseenergy.com`).
   - `SERVER_USER`: usuario SSH (`root` según tus datos).
   - `SERVER_PASSWORD`: contraseña SSH.
   - `SERVER_SSH_PORT`: puerto (22 por defecto).

2. **¿Qué hace el workflow?**
   - Instala dependencias en `web/` y ejecuta `npm run build` (modo híbrido).
   - Comprime `web/dist` en `semillasdeti-dist.tar.gz`.
   - Copia el archivo al servidor (`/tmp`).
   - Desempaca en `/var/www/semillasdeti` y reinicia el servicio `systemctl restart semillasdeti`.

3. **Servicio del sistema**
   - Incluí `ops/systemd/semillasdeti.service` con la definición recomendada. Pasos:
     ```bash
     sudo cp ops/systemd/semillasdeti.service /etc/systemd/system/semillasdeti.service
     sudo systemctl daemon-reload
     sudo systemctl enable semillasdeti
     sudo systemctl start semillasdeti
     ```
   - Ajusta `PORT` y `User` si lo necesitas. El workflow asume que el servicio existe y se puede reiniciar.

Con esto, cada push a `main` (o ejecución manual) construirá y publicará la última versión automáticamente.

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
- **Formularios**: la newsletter ya usa la API de Brevo. Si quieres que el formulario de contacto también envíe correos, crea un endpoint similar o usa un servicio externo.

Con esto tienes el plan completo para ejecutar, desplegar y mantener la nueva web de Semillas de Ti.
