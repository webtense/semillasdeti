# 08 - Manual de Operacion (No Tecnico)

Este manual explica como actualizar la web sin tocar codigo.

## 1) Entrar al panel

1. Abre `https://tudominio.com/admin/login`.
2. Escribe usuario y contrasena de administrador.
3. Pulsa **Entrar al panel**.

Si no recuerdas las credenciales, las debe revisar la persona tecnica en variables de entorno del servidor.

## 2) Subir una imagen nueva

1. En el panel, ve a **Subir imagen**.
2. Selecciona archivo JPG, PNG o WEBP.
3. Pulsa **Subir**.
4. Copia la ruta que aparece (ejemplo: `/images/uploads/archivo.jpg`).

Recomendacion:
- Usa imagenes de menos de 1 MB para carga rapida.
- Formato recomendado para fotos: JPG o WEBP.

## 3) Editar textos y contenido

1. Baja a **Contenido del sitio (JSON)**.
2. Veras un bloque grande de texto con llaves `{}`.
3. Cambia solo los textos que necesites.
4. Si cambias una imagen, pega la ruta subida en el campo correspondiente.
5. Pulsa **Guardar cambios**.

Consejo importante:
- No borres comas, llaves ni corchetes.
- Si hay error de formato, el panel avisara con mensaje `JSON no valido`.

## 4) Publicar cambios (rebuild)

Dependiendo del servidor:

- Si el proyecto esta configurado con publicacion automatica, al guardar puede bastar.
- Si requiere paso manual, pulsa **Ejecutar rebuild** en el bloque **Rebuild / Redeploy**.

Despues:
1. Abre la web publica.
2. Refresca con `Ctrl + F5` (o `Cmd + Shift + R` en Mac).
3. Verifica que se vea el cambio.

## 5) Que se puede editar normalmente

- Titulares y parrafos de todas las secciones.
- Botones principales.
- Testimonios.
- Servicios y bullets.
- Datos de contacto.
- Imagenes del hero/newsletter y nuevas imagenes subidas.

## 6) Errores comunes y solucion rapida

- **No entra al panel**: credenciales incorrectas o sesion expirada.
- **Error CSRF**: recarga la pagina y vuelve a guardar.
- **JSON no valido**: revisa comas y llaves del bloque editado.
- **Imagen no sube**: usa JPG/PNG/WEBP y menor de 5 MB.
- **No se ven cambios**: ejecutar rebuild y limpiar cache del navegador.

## 7) Buenas practicas de contenido

- Titulares cortos y claros.
- Un mensaje principal por seccion.
- Parrafos de 2-4 lineas para lectura facil.
- CTA directos: "Reserva una llamada", "Habla por WhatsApp".

## 8) Checklist rapido antes de cerrar

- [ ] Guardaste cambios sin error.
- [ ] Revisaste la home en movil y escritorio.
- [ ] Probaste enlaces de contacto y WhatsApp.
- [ ] Verificaste que imagenes cargan bien.
- [ ] Cerraste sesion del panel.
