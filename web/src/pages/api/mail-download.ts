import { sendEmail } from '../../lib/brevo';

function buildGuideHtml(firstName: string): string {
	const name = firstName || 'amiga';
	return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>5 Anclas para Volver a Ti — Semillas de Ti</title>
</head>
<body style="margin:0;padding:0;background:#f7f0e8;font-family:Georgia,'Times New Roman',serif;color:#3f2a25;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#3f2a25;">
    <tr>
      <td align="center" style="padding:28px 20px;">
        <p style="margin:0;font-size:20px;color:#f7f0e8;letter-spacing:0.3em;font-family:Georgia,serif;">Semillas de Ti ·</p>
        <p style="margin:6px 0 0;font-size:11px;color:#c5745a;letter-spacing:0.25em;text-transform:uppercase;font-family:Arial,sans-serif;">Coaching emocional · Introspección en movimiento</p>
      </td>
    </tr>
  </table>

  <!-- Body -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(63,42,37,0.08);">

          <!-- Saludo -->
          <tr>
            <td style="padding:40px 48px 0;">
              <h1 style="margin:0 0 20px;font-size:28px;font-weight:600;color:#3f2a25;line-height:1.3;">Hola, ${name} 🌱</h1>
              <p style="margin:0 0 16px;font-size:17px;line-height:1.8;color:#5a3d35;">Qué alegría que estés aquí.</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#5a3d35;">Antes de enviarte las 5 anclas, déjame contarte cómo empezó todo esto...</p>
            </td>
          </tr>

          <!-- Día 1 quote -->
          <tr>
            <td style="padding:24px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-left:3px solid #c5745a;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 8px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Día 1</p>
                    <p style="margin:0;font-size:16px;line-height:1.9;color:#3f2a25;font-style:italic;">"Me paré delante de unas flores que nacían al pie de un árbol. Estaban ahí, todas distintas y todas juntas. Compartiendo el mismo espacio sin necesidad de parecerse entre ellas.<br><br>Ahí me vino una idea clara: somos diferentes. Cada persona siente de una forma y encuentra caminos distintos para escucharse.<br><br>Hoy he sentido que mi forma de meditar aparece cuando me muevo. No he caminado para hacer kilómetros. He caminado para escucharme."</p>
                    <p style="margin:16px 0 0;font-size:13px;color:#c5745a;font-family:Arial,sans-serif;">— Zoraida Pozo Barrio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro guía -->
          <tr>
            <td style="padding:8px 48px 32px;">
              <p style="margin:0 0 12px;font-size:16px;line-height:1.8;color:#5a3d35;">Ese fue el Día 1. Y aquí estás tú, formando parte de él.</p>
              <p style="margin:0;font-size:16px;line-height:1.8;color:#5a3d35;">A continuación, las <strong>5 anclas para volver a ti</strong> que más me han ayudado y que comparto contigo con todo el cariño:</p>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #e8d5c8;margin:0;">
            </td>
          </tr>

          <!-- Ancla 1 -->
          <tr>
            <td style="padding:32px 48px 0;">
              <p style="margin:0 0 6px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Ancla 1</p>
              <h2 style="margin:0 0 12px;font-size:22px;color:#3f2a25;">Detén el ruido externo</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#5a3d35;">Antes de tomar decisiones importantes, crea un momento de pausa. El ruido externo —opiniones ajenas, redes, expectativas— nos aleja de nuestra voz interior.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#c5745a;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Ejercicio</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#3f2a25;">Cierra los ojos 2 minutos. Imagina que estás en un lugar tranquilo donde te sientes segura. Pregúntate: <em>"¿Qué necesito realmente en este momento?"</em></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ancla 2 -->
          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 6px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Ancla 2</p>
              <h2 style="margin:0 0 12px;font-size:22px;color:#3f2a25;">Nombre lo que sientes</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#5a3d35;">Las emociones no son obstáculos, son señales. Nombrarlas reduce su intensidad y te da claridad para actuar.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#c5745a;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Ejercicio</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#3f2a25;">Cuando sientas una emoción intensa, escribe: <em>"En este momento estoy sintiendo..."</em> No juzgues, solo observa y nombra. Pregúntate: "¿Qué me está diciendo esta emoción?"</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ancla 3 -->
          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 6px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Ancla 3</p>
              <h2 style="margin:0 0 12px;font-size:22px;color:#3f2a25;">Vuelve a tu cuerpo</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#5a3d35;">Las emociones viven en el cuerpo. Antes de pensar en soluciones, conecta. Caminar, respirar, sentir —así es como yo vuelvo a mí misma.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#c5745a;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Ejercicio</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#3f2a25;">Coloca tu mano en el corazón. Respira lentamente 3 veces. Pregunta a tu cuerpo: <em>"¿Dónde me estoy cuidando y dónde me estoy abandonando?"</em></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ancla 4 -->
          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 6px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Ancla 4</p>
              <h2 style="margin:0 0 12px;font-size:22px;color:#3f2a25;">Haz una pregunta poderosa</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#5a3d35;">Las preguntas cambian nuestra perspectiva. En lugar de <em>"¿por qué me pasa esto?"</em>, pregúntate desde el poder personal.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#c5745a;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Ejercicio</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#3f2a25;">Escribe 3 veces: <em>"¿Qué puedo aprender de esto?"</em> Después escribe: <em>"¿Qué haré diferente la próxima vez?"</em> Identifica una acción concreta esta semana.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ancla 5 -->
          <tr>
            <td style="padding:28px 48px 0;">
              <p style="margin:0 0 6px;font-size:11px;color:#c5745a;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">Ancla 5</p>
              <h2 style="margin:0 0 12px;font-size:22px;color:#3f2a25;">Crea tu ritual de regreso</h2>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#5a3d35;">Los hábitos pequeños y consistentes transforman más que los grandes cambios. Un ritual diario es más efectivo que un esfuerzo puntual.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f3;border-radius:10px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;color:#c5745a;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">Ejercicio</p>
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#3f2a25;">Elige un momento del día (mañana o noche). Dedica 5 minutos a escribir 3 cosas por las que estás agradecida. Inclúyelo en tu rutina durante 21 días para crear hábito.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mensaje final -->
          <tr>
            <td style="padding:36px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#3f2a25;border-radius:12px;">
                <tr>
                  <td style="padding:30px 32px;">
                    <p style="margin:0 0 10px;font-size:16px;line-height:1.8;color:#f7f0e8;font-style:italic;">"Las semillas están dentro de ti. Siempre han estado ahí."</p>
                    <p style="margin:0;font-size:13px;color:#c5745a;font-family:Arial,sans-serif;">— Zoraida</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:36px 48px 0;">
              <p style="margin:0 0 14px;font-size:16px;line-height:1.8;color:#5a3d35;">¿Quieres dar el siguiente paso y profundizar en tu proceso?</p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#5a3d35;">Reserva una <strong>llamada exploratoria gratuita</strong> de 25 minutos y vemos juntas qué tipo de acompañamiento tiene más sentido para ti ahora mismo.</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#c5745a;border-radius:50px;">
                    <a href="https://wa.me/34665694516?text=Hola%20Zoraida%2C%20acabo%20de%20recibir%20tu%20gu%C3%ADa%20y%20me%20gustar%C3%ADa%20reservar%20una%20llamada." style="display:inline-block;padding:14px 32px;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;">Hablar por WhatsApp →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Firma -->
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 4px;font-size:15px;color:#3f2a25;">Con cariño,</p>
              <p style="margin:0 0 16px;font-size:19px;font-weight:600;color:#3f2a25;">Zoraida</p>
              <p style="margin:0;font-size:13px;color:#8a6a60;font-family:Arial,sans-serif;">Coach emocional y profesional<br>zoraidapozobarrio@gmail.com · +34 665 694 516</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <p style="margin:0;font-size:12px;color:#8a6a60;font-family:Arial,sans-serif;">© 2026 Semillas de Ti · <a href="https://semillasdeti.com" style="color:#c5745a;text-decoration:none;">semillasdeti.com</a></p>
        <p style="margin:8px 0 0;font-size:11px;color:#aaa;font-family:Arial,sans-serif;">Recibiste este correo porque solicitaste la guía en semillasdeti.com.</p>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

function buildGuideText(firstName: string): string {
	const name = firstName || 'amiga';
	return `Hola, ${name}

Qué alegría que estés aquí.

Antes de enviarte las 5 anclas, déjame contarte cómo empezó todo esto...

DÍA 1:
"Me paré delante de unas flores que nacían al pie de un árbol. Estaban ahí, todas distintas y todas juntas. Y ahí me vino una idea clara: somos diferentes. Cada persona siente de una forma y encuentra caminos distintos para escucharse."

A continuación, las 5 ANCLAS PARA VOLVER A TI:

--- ANCLA 1: Detén el ruido externo ---
Antes de tomar decisiones, crea un momento de pausa.
Ejercicio: Cierra los ojos 2 minutos, imagina un lugar tranquilo y pregúntate "¿Qué necesito realmente?"

--- ANCLA 2: Nombre lo que sientes ---
Las emociones son señales. Nombrarlas reduce su intensidad.
Ejercicio: Escribe "En este momento estoy sintiendo..." sin juzgar.

--- ANCLA 3: Vuelve a tu cuerpo ---
Las emociones viven en el cuerpo. Conecta antes de pensar en soluciones.
Ejercicio: Mano en el corazón, respira 3 veces, pregunta a tu cuerpo.

--- ANCLA 4: Haz una pregunta poderosa ---
En lugar de "¿por qué me pasa esto?", pregúntate desde el poder personal.
Ejercicio: Escribe 3 veces "¿Qué puedo aprender de esto?" y luego "¿Qué haré diferente?"

--- ANCLA 5: Crea tu ritual de regreso ---
Pequeños hábitos consistentes transforman más que grandes cambios.
Ejercicio: 5 minutos diarios, 3 cosas por las que estás agradecida, 21 días.

"Las semillas están dentro de ti. Siempre han estado ahí."
— Zoraida

¿Quieres profundizar en tu proceso?
Reserva una llamada exploratoria gratuita: https://wa.me/34665694516

Con cariño,
Zoraida Pozo Barrio
zoraidapozobarrio@gmail.com

---
Recibiste este correo porque solicitaste la guía en semillasdeti.com.
© 2026 Semillas de Ti`;
}

export async function sendGuideEmail(toEmail: string, firstName: string): Promise<void> {
	await sendEmail({
		toEmail,
		toName: firstName || toEmail,
		subject: 'Tu guía "5 Anclas para Volver a Ti" 🌱',
		html: buildGuideHtml(firstName),
		text: buildGuideText(firstName),
		tags: ['lead-magnet', 'guia-5-anclas'],
	});
}
