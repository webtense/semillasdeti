# 02 - Libro de Estilos y UI

## Identidad visual

La marca busca cercania, calma y profesionalidad.

- Tono: calido, humano, sin rigidez corporativa.
- Enfoque visual: editorial + bienestar.

## Paleta oficial

Definida en `web/tailwind.config.mjs`.

- `sand`: `#f7f0e8`
- `terra`: `#c5745a`
- `sienna`: `#8a4d3a`
- `sage`: `#6c8a6c`
- `cacao`: `#3f2a25`
- `clay`: `#edd8cb`

## Tipografias

- Serif titulares: `Playfair Display`
- Sans cuerpo: `Source Sans 3`

## Principios de composicion

- Mucho aire vertical (`py-20`) para lectura pausada.
- Tarjetas suaves (`.soft-card`) para bloques de contenido.
- Header sticky con blur para continuidad de navegacion.
- Botones principales redondeados para sensacion de cercania.

## Componentes base

- `section-shell`: contenedor maximo y paddings globales.
- `tagline`: etiqueta superior en mayusculas con tracking amplio.
- `soft-card`: superficie translúcida con borde y sombra suave.

## Reglas de copy UI

- Frases en 2a persona cuando se habla al usuario.
- CTA claros y accionables (`Reserva una llamada`, `Quiero la guia`).
- Evitar tecnicismos en bloques publicos.

## Responsive

- Mobile first.
- Navegacion principal completa en `md+`.
- Grids de 1 -> 2 -> 3 columnas segun seccion.
