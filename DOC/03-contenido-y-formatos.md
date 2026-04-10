# 03 - Contenido y Formatos

## Fuente de contenido

El contenido principal vive en `web/src/data/site.json`.

## Formato general

- Tipo: JSON UTF-8.
- Convencion: `snake_case` no se usa; se usa `camelCase`.
- Las rutas de imagen deben ser absolutas desde `/public`, por ejemplo: `/images/hero.jpg`.

## Bloques principales

- `brand`: nombre de marca y subtitulo.
- `navLinks[]`: enlaces internos del header.
- `hero`: titular principal, CTAs e imagen.
- `stats[]`: numeros destacados.
- `about`: presentacion de Zoraida y valores.
- `method.steps[]`: pasos del metodo de trabajo.
- `services.items[]`: servicios y beneficios.
- `testimonials.items[]`: testimonios.
- `newsletter`: copy e imagen de captacion.
- `contact`: datos de contacto y CTA de correo.
- `footer`: texto de pie de pagina.

## Limites y saneamiento

La normalizacion en `web/src/lib/content.ts` aplica:

- Recorte de longitud por campo.
- Sustitucion por fallback si un valor falta o es invalido.
- Limite de items en listas.

## Imagenes

- Subida desde admin: `POST /api/admin/upload`.
- Tipos permitidos: JPG, PNG, WEBP.
- Tamano maximo: 5MB.
- Destino: `web/public/images/uploads/`.

## Recomendaciones de formato de contenido

- Titulares: maximo 90-120 caracteres.
- Parrafos: ideal 180-450 caracteres.
- Beneficios y bullets: frases cortas y concretas.
