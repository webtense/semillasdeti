# Guia Rapida para Cliente (1 pagina)

## Como cambiar textos o imagenes de tu web

### 1) Entra al panel

- Abre: `https://tudominio.com/admin/login`
- Escribe usuario y contrasena.
- Pulsa **Entrar al panel**.

### 2) Para subir una imagen

- En **Subir imagen**, elige tu archivo.
- Pulsa **Subir**.
- Copia la ruta que aparece (ejemplo: `/images/uploads/foto.jpg`).

### 3) Para cambiar textos

- Ve a **Contenido del sitio (JSON)**.
- Cambia solo el texto que necesites.
- Si cambias imagen, pega la ruta copiada.
- Pulsa **Guardar cambios**.

### 4) Publicar cambios

- Si existe el boton **Ejecutar rebuild**, pulsalo.
- Abre la web y refresca fuerte:
  - Windows: `Ctrl + F5`
  - Mac: `Cmd + Shift + R`

## Si algo falla

- **JSON no valido**: revisa comas y llaves.
- **Error CSRF**: recarga la pagina y vuelve a guardar.
- **No se ve el cambio**: ejecuta rebuild y refresca de nuevo.

## Antes de salir

- Comprueba que la web se ve bien en movil.
- Prueba WhatsApp y correo.
- Pulsa **Cerrar sesion** en el panel.
