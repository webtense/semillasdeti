# 06 - Seguridad y Checklist

## Implementado

- [x] Login admin con usuario y contrasena por entorno.
- [x] Cookies de sesion `httpOnly`.
- [x] Firma de sesion con HMAC y expiracion.
- [x] Validacion CSRF en acciones sensibles.
- [x] Rate limit basico en login.
- [x] Validacion de tipos/tamanos en subida de imagenes.

## Recomendado (siguiente iteracion)

- [ ] Hash de contrasena admin (en vez de texto plano en env).
- [ ] Almacen de sesiones en Redis para multi-instancia.
- [ ] Auditoria persistente de acciones del admin.
- [ ] Limite de peticiones por IP para endpoints admin completos.
- [ ] Alertas de seguridad (intentos fallidos, bloqueos).

## Operativa de secretos

- Rotar claves cada 60-90 dias.
- No commitear `.env` real.
- Guardar secretos solo en gestor seguro o variables del servidor.

## Checklist antes de produccion

- [ ] `ADMIN_SESSION_SECRET` >= 32 caracteres aleatorios.
- [ ] HTTPS activo y redireccion de HTTP a HTTPS.
- [ ] Backup de `src/data/site.json` y `public/images/uploads/`.
- [ ] Prueba de login, guardado, upload y logout.
- [ ] Prueba de newsletter end-to-end.
