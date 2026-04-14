import type { APIRoute } from 'astro';

export async function sendDownloadEmail(toEmail: string, toName: string) {
	const apiKey = import.meta.env.MAILJET_API_KEY || process.env.MAILJET_API_KEY;
	const apiSecret = import.meta.env.MAILJET_SECRET_KEY || process.env.MAILJET_SECRET_KEY;

	if (!apiKey || !apiSecret) {
		throw new Error('Mailjet credentials not configured');
	}

	const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

	const guideContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>5 Anclas para Volver a Ti</title>
    <style>
        body { font-family: Georgia, serif; line-height: 1.8; max-width: 600px; margin: 0 auto; padding: 20px; color: #3f2a25; }
        h1 { color: #8a4d3a; text-align: center; }
        h2 { color: #c5745a; margin-top: 30px; }
        .exercise { background: #f7f0e8; padding: 20px; border-radius: 10px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>5 Anclas para Volver a Ti</h1>
    <p style="text-align:center; font-style:italic;">Guía práctica de coaching emocional por Zoraida Pozo Barrio</p>
    
    <h2>Ancla 1: Detén el Ruido Externo</h2>
    <p>Antes de tomar decisiones importantes, crea un momento de pausa.</p>
    <div class="exercise">
        <strong>Ejercicio:</strong> Cierra los ojos 2 minutos, imagina un lugar tranquilo, pregúntate: "¿Qué necesito realmente?"
    </div>

    <h2>Ancla 2: Nombre lo que Sientes</h2>
    <p>Las emociones son señales. Nombrarlas reduce su intensidad.</p>
    <div class="exercise">
        <strong>Ejercicio:</strong> Escribe "Estoy sintiendo..." y observa sin juzgar.
    </div>

    <h2>Ancla 3: Vuelve a tu Cuerpo</h2>
    <p>Las emociones viven en el cuerpo. Conecta antes de pensar en soluciones.</p>
    <div class="exercise">
        <strong>Ejercicio:</strong> Mano en el corazón, respira 3 veces, pregunta a tu cuerpo.
    </div>

    <h2>Ancla 4: Haz una Pregunta Poderosa</h2>
    <p>Cambia "por qué me pasa esto?" por "¿qué puedo aprender de esto?"</p>
    <div class="exercise">
        <strong>Ejercicio:</strong> Escribe la pregunta 3 veces, luego "¿Qué haré diferente?"
    </div>

    <h2>Ancla 5: Crea un Ritual de Regreso</h2>
    <p>Pequeños hábitos consistentes transforman más que grandes cambios.</p>
    <div class="exercise">
        <strong>Ejercicio:</strong> 5 minutos, 3 cosas por las que estás agradecida, 21 días.
    </div>

    <p><strong>Recuerda:</strong> Las semillas están dentro de ti.</p>

    <div class="footer">
        <p><strong>Zoraida Pozo Barrio</strong></p>
        <p>Coach emocional y profesional</p>
        <p>zoraidapozobarrio@gmail.com</p>
        <p>© 2026 Semillas de Ti</p>
    </div>
</body>
</html>`;

	const payload = {
		Messages: [
			{
				From: {
					Email: 'webtense@gmail.com',
					Name: 'Semillas de Ti',
				},
				To: [
					{
						Email: toEmail,
						Name: toName || toEmail,
					},
				],
				Subject: 'Tu guía "5 Anclas para Volver a Ti" está aquí 🌱',
				TextPart: `Hola ${toName || ''},\n\n¡Gracias por descargar mi guía "5 Anclas para Volver a Ti"!\n\nLas 5 anclas que encontrarás:\n1. Detén el Ruido Externo\n2. Nombre lo que Sientes\n3. Vuelve a tu Cuerpo\n4. Haz una Pregunta Poderosa\n5. Crea un Ritual de Regreso\n\n¿Te gustaría profundizar en tu proceso? Escríbeme a zoraidapozobarrio@gmail.com\n\nCon cariño,\nZoraida`,
				HTMLPart: guideContent,
				CustomID: 'DownloadGuide',
			},
		],
	};

	const response = await fetch('https://api.mailjet.com/v3.1/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${auth}`,
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Mailjet error: ${response.status} - ${errorText}`);
	}

	return response.json();
}