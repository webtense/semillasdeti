import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface SiteContent {
	brand: { name: string; subtitle: string };
	navLinks: Array<{ label: string; href: string }>;
	hero: {
		tagline: string;
		title: string;
		description: string;
		primaryCta: string;
		secondaryCta: string;
		image: string;
		imageAlt: string;
		badgeTitle: string;
		badgeText: string;
	};
	stats: Array<{ label: string; value: string }>;
	origin: {
		tagline: string;
		dateLabel: string;
		manifesto: string[];
		quote: string;
		insight: string;
		image1: string;
		image2: string;
		imageAlt: string;
		whatIs: { tagline: string; description: string; detail: string };
		process: { tagline: string; steps: Array<{ verb: string; detail: string }> };
		whatIsNot: { tagline: string; items: string[]; closing: string };
	};
	about: {
		tagline: string;
		title: string;
		description: string;
		bullets: string[];
		closing: string;
		valuesTitle: string;
		values: Array<{ title: string; description: string }>;
	};
	method: {
		tagline: string;
		title: string;
		description: string;
		steps: Array<{ title: string; description: string }>;
	};
	services: {
		tagline: string;
		title: string;
		description: string;
		items: Array<{ title: string; description: string; benefits: string[] }>;
	};
	testimonials: {
		tagline: string;
		title: string;
		description: string;
		items: Array<{ name: string; role: string; quote: string }>;
	};
	newsletter: {
		tagline: string;
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		cta: string;
	};
	contact: {
		tagline: string;
		title: string;
		description: string;
		whatsappNumber: string;
		whatsappLabel: string;
		email: string;
		mode: string;
		formDisclaimer: string;
		formCta: string;
		mailtoSubject: string;
	};
	footer: { description: string };
}

export const defaultSiteContent: SiteContent = {
	brand: {
		name: 'Semillas de Ti',
		subtitle: 'Coaching por Zoraida Pozo Barrio',
	},
	navLinks: [
		{ label: 'Quién soy', href: '#quien-soy' },
		{ label: 'Cómo trabajo', href: '#metodo' },
		{ label: 'Servicios', href: '#servicios' },
		{ label: 'Testimonios', href: '#testimonios' },
	],
	hero: {
		tagline: 'Coaching emocional & profesional',
		title: 'Cultiva decisiones más conscientes y una vida con dirección propia.',
		description:
			'Soy Zoraida Pozo Barrio y acompaño a mujeres y equipos a reconectar con su voz interior, a regular lo que sienten y a sostener cambios reales con mucha humanidad y estrategia.',
		primaryCta: 'Reserva una llamada',
		secondaryCta: 'Habla por WhatsApp',
		image: '/images/hero.jpg',
		imageAlt: 'Sesión de coaching Semillas de Ti',
		badgeTitle: 'Procesos guiados',
		badgeText: 'Con presencia, ciencia y sensibilidad.',
	},
	stats: [
		{ label: 'Procesos acompañados', value: '+180' },
		{ label: 'Sesiones online', value: '+950' },
		{ label: 'Valoración media', value: '4.9/5' },
	],
	origin: {
		tagline: 'De dónde nace',
		dateLabel: 'Día 1',
		manifesto: [
			'Hace tiempo contemplé crear un espacio desde el que acompañar a personas. Un espacio vinculado al coaching, pero con una base muy clara: la introspección.',
			'En mi propio camino, mirar hacia dentro ha sido una de las herramientas que más me ha ayudado. Y la escritura ha sido una forma muy poderosa de hacerlo. Esa era la semilla. Quizá nunca desapareció. Solo estaba esperando su momento.',
			'Un día caminando, me paré delante de unas flores que nacían al pie de un árbol. Estaban ahí, todas distintas y todas juntas. Compartiendo el mismo espacio sin necesidad de parecerse entre ellas.',
			'Hoy he sentido que mi forma de meditar aparece cuando me muevo. No he caminado para hacer kilómetros. He caminado para escucharme.',
		],
		quote: 'Aunque me cueste decirlo. Aunque me dé vértigo mostrarlo. Hoy empieza así. Con algo tan común como unas flores.',
		insight: 'Somos diferentes. Cada persona siente de una forma, piensa de una forma y encuentra caminos distintos para escucharse.',
		image1: '/images/flores-origen-1.jpg',
		image2: '/images/flores-origen-2.jpg',
		imageAlt: 'Flores silvestres al pie de un árbol, durante una caminata de Zoraida',
		whatIs: {
			tagline: 'Qué es',
			description: 'Semillas de Ti es un espacio para escucharse caminando.',
			detail: 'Parte de una idea sencilla: estar bien físicamente también empieza por estar bien emocionalmente. Aquí el objetivo no es contar kilómetros ni medir ritmos. Es crear un momento para escucharse, ordenar lo que se mueve dentro y cuidar lo emocional.',
		},
		process: {
			tagline: 'El proceso',
			steps: [
				{ verb: 'Camino', detail: 'Me muevo cuando puedo, con cascos, música o silencio.' },
				{ verb: 'Siento', detail: 'Dejo que aparezca lo que se mueve dentro, sin filtro.' },
				{ verb: 'Grabo', detail: 'Notas de voz espontáneas, sin editar ni juzgar.' },
				{ verb: 'Escucho', detail: 'Me siento con lo grabado y dejo que resuene.' },
				{ verb: 'Escribo', detail: 'Lo paso al cuaderno, doy forma a lo que sentí.' },
				{ verb: 'Entiendo', detail: 'Encuentro el sentido, la idea, la emoción que estaba ahí.' },
			],
		},
		whatIsNot: {
			tagline: 'Qué no es',
			items: ['No es terapia.', 'No sustituye a profesionales.', 'No es un grupo de ayuda dirigido.'],
			closing: 'Es un espacio para parar sin quedarse quieto. Para caminar, respirar, sentir, escribir y comprender. Cada uno a su manera.',
		},
	},
	about: {
		tagline: 'Quién está detrás',
		title: 'Hola, soy Zoraida',
		description:
			'Coach certificada, facilitadora de procesos emocionales y eterna aprendiz. Después de 15 años en el mundo corporativo decidí crear Semillas de Ti para acompañar con más cercanía y autenticidad.',
		bullets: [
			'Formación en Coaching Estratégico, Terapia Breve e Inteligencia Emocional',
			'Sesiones online y en Madrid / Barcelona',
			'Metodología híbrida: introspección + acciones muy concretas',
		],
		closing:
			'Trabajo desde la escucha activa, preguntas que te devuelven tu poder y herramientas que puedes aplicar la misma semana. Sin juicios. Sin promesas imposibles.',
		valuesTitle: 'Valores',
		values: [
			{ title: 'Presencia', description: 'Estar contigo en cada etapa, no sólo durante la sesión.' },
			{ title: 'Claridad', description: 'Nombrar lo que duele para liberar energía hacia lo que deseas.' },
			{ title: 'Acción amable', description: 'Pequeños compromisos que se sienten posibles y sostenibles.' },
		],
	},
	method: {
		tagline: 'Cómo trabajo',
		title: 'Un proceso vivo que parte de escucharse para crear cambios reales.',
		description: 'No importa desde dónde empiezas. Lo que importa es que algo dentro de ti quiere moverse.',
		steps: [
			{
				title: 'Exploración consciente',
				description: 'Sesión inicial para entender dónde estás, qué sientes y qué necesitas priorizar.',
			},
			{
				title: 'Diseño a medida',
				description: 'Definimos objetivos, rituales y herramientas que puedas integrar en tu rutina real.',
			},
			{
				title: 'Acompañamiento vivo',
				description: 'Seguimiento honesto, feedback y ajustes constantes para sostener los cambios en el tiempo.',
			},
		],
	},
	services: {
		tagline: 'Servicios',
		title: 'Elige el acompañamiento que necesitas',
		description:
			'Cada proceso se diseña contigo. Puedo combinar sesiones online, presenciales y espacios dedicados a tu equipo si lo necesitas.',
		items: [
			{
				title: 'Coaching Personal',
				description:
					'Navega transiciones vitales, decisiones importantes y bloqueos emocionales con claridad y autocuidado.',
				benefits: ['Sesiones 1:1 online o presenciales', 'Bitácora entre sesiones', 'Recap con próximos pasos'],
			},
			{
				title: 'Coaching Emocional',
				description:
					'Herramientas prácticas para calmar la mente, regular emociones intensas y crear nuevas narrativas sobre ti.',
				benefits: ['Mapeo de disparadores emocionales', 'Ejercicios somáticos y cognitivos', 'Plan de apoyo semanal'],
			},
			{
				title: 'Coaching Profesional',
				description:
					'Dirige tu carrera desde un lugar auténtico: liderazgo consciente, comunicación y límites sanos.',
				benefits: ['Evaluación de fortalezas', 'Plan de acción trimestral', 'Sesiones de feedback en vivo'],
			},
		],
	},
	testimonials: {
		tagline: 'Testimonios reales',
		title: 'Lo que dicen las personas que acompaño',
		description:
			'Cada historia es diferente, pero todas coinciden en algo: cuando te escuchas y cuentas con soporte, la coherencia llega.',
		items: [
			{
				name: 'Marina Coll',
				role: 'Product Manager',
				quote:
					'Llegué en pleno bloqueo profesional. Zoraida me ayudó a revisar mis creencias y a tomar decisiones desde la calma. Tres meses después cambio de rol con mucha más seguridad.',
			},
			{
				name: 'Rocío Lamas',
				role: 'Emprendedora',
				quote:
					'No es sólo coaching, es un espacio súper humano. El método de Zoraida mezcla escucha profunda y acciones concretas. Hoy disfruto de mi negocio sin sentir que me pierdo a mí misma.',
			},
			{
				name: 'Hugo Vidal',
				role: 'Director de operaciones',
				quote:
					'Trabajamos mi liderazgo y la ansiedad que arrastraba desde hacía años. Implementamos rituales sencillos y conversaciones clave con mi equipo. El impacto es brutal.',
			},
		],
	},
	newsletter: {
		tagline: 'Newsletter cálida',
		title: 'Recibe la guía “5 anclas para volver a ti”.',
		description:
			'Historias reales, ejercicios breves y recordatorios para reconectar contigo. Un correo a la semana, sin ruido.',
		image: '/images/newsletter.jpg',
		imageAlt: 'Mujer escribiendo en cuaderno',
		cta: 'Quiero la guía',
	},
	contact: {
		tagline: 'Contacto',
		title: '¿Reservamos una llamada exploratoria?',
		description: 'Sesión de 25 minutos para conocernos, revisar tus necesidades y ver si tiene sentido acompañarte.',
		whatsappNumber: '+34 665 694 516',
		whatsappLabel: 'WhatsApp',
		email: 'zoraidapozobarrio@gmail.com',
		mode: 'Online / Presencial (Madrid y Barcelona)',
		formDisclaimer: 'Este formulario es orientativo. Haz clic abajo para enviarme un correo con tu mensaje.',
		formCta: 'Enviar mensaje',
		mailtoSubject: 'Quiero reservar una llamada',
	},
	footer: {
		description: 'Coaching emocional y profesional por Zoraida Pozo Barrio.',
	},
};

const CONTENT_FILE = path.join(process.cwd(), 'src/data/site.json');

function asString(value: unknown, fallback: string, maxLength = 400) {
	if (typeof value !== 'string') {
		return fallback;
	}
	const normalized = value.trim().replace(/\r\n/g, '\n');
	if (!normalized) {
		return fallback;
	}
	return normalized.slice(0, maxLength);
}

function asStringList(value: unknown, fallback: string[], maxItems = 8, maxLength = 240) {
	if (!Array.isArray(value)) {
		return fallback;
	}
	const items = value
		.map((item) => asString(item, '', maxLength))
		.filter(Boolean)
		.slice(0, maxItems);
	return items.length > 0 ? items : fallback;
}

function asObject(value: unknown): Record<string, unknown> {
	if (value && typeof value === 'object' && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}
	return {};
}

export function normalizeContent(raw: unknown): SiteContent {
	const source = asObject(raw);
	const brand = asObject(source.brand);
	const hero = asObject(source.hero);
	const originRaw = asObject(source.origin);
	const about = asObject(source.about);
	const method = asObject(source.method);
	const services = asObject(source.services);
	const testimonials = asObject(source.testimonials);
	const newsletter = asObject(source.newsletter);
	const contact = asObject(source.contact);
	const footer = asObject(source.footer);
	const def = defaultSiteContent;

	const navLinks = Array.isArray(source.navLinks)
		? source.navLinks
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.navLinks[index] ?? defaultSiteContent.navLinks[0];
					return {
						label: asString(parsed.label, fallback.label, 80),
						href: asString(parsed.href, fallback.href, 80),
					};
				})
				.slice(0, 6)
		: defaultSiteContent.navLinks;

	const stats = Array.isArray(source.stats)
		? source.stats
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.stats[index] ?? defaultSiteContent.stats[0];
					return {
						label: asString(parsed.label, fallback.label, 80),
						value: asString(parsed.value, fallback.value, 30),
					};
				})
				.slice(0, 4)
		: defaultSiteContent.stats;

	const methodSteps = Array.isArray(method.steps)
		? method.steps
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.method.steps[index] ?? defaultSiteContent.method.steps[0];
					return {
						title: asString(parsed.title, fallback.title, 120),
						description: asString(parsed.description, fallback.description, 500),
					};
				})
				.slice(0, 6)
		: defaultSiteContent.method.steps;

	const serviceItems = Array.isArray(services.items)
		? services.items
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.services.items[index] ?? defaultSiteContent.services.items[0];
					return {
						title: asString(parsed.title, fallback.title, 120),
						description: asString(parsed.description, fallback.description, 600),
						benefits: asStringList(parsed.benefits, fallback.benefits, 8, 180),
					};
				})
				.slice(0, 6)
		: defaultSiteContent.services.items;

	const testimonialItems = Array.isArray(testimonials.items)
		? testimonials.items
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.testimonials.items[index] ?? defaultSiteContent.testimonials.items[0];
					return {
						name: asString(parsed.name, fallback.name, 100),
						role: asString(parsed.role, fallback.role, 120),
						quote: asString(parsed.quote, fallback.quote, 800),
					};
				})
				.slice(0, 8)
		: defaultSiteContent.testimonials.items;

	const values = Array.isArray(about.values)
		? about.values
				.map((entry, index) => {
					const parsed = asObject(entry);
					const fallback = defaultSiteContent.about.values[index] ?? defaultSiteContent.about.values[0];
					return {
						title: asString(parsed.title, fallback.title, 120),
						description: asString(parsed.description, fallback.description, 500),
					};
				})
				.slice(0, 8)
		: defaultSiteContent.about.values;

	const originWhatIs = asObject(originRaw.whatIs);
	const originProcess = asObject(originRaw.process);
	const originWhatIsNot = asObject(originRaw.whatIsNot);
	const originProcessSteps = Array.isArray(originProcess.steps)
		? originProcess.steps
				.map((entry, i) => {
					const parsed = asObject(entry);
					const fallback = def.origin.process.steps[i] ?? def.origin.process.steps[0];
					return {
						verb: asString(parsed.verb, fallback.verb, 80),
						detail: asString(parsed.detail, fallback.detail, 300),
					};
				})
				.slice(0, 8)
		: def.origin.process.steps;

	return {
		brand: {
			name: asString(brand.name, def.brand.name, 80),
			subtitle: asString(brand.subtitle, def.brand.subtitle, 200),
		},
		navLinks,
		hero: {
			tagline: asString(hero.tagline, defaultSiteContent.hero.tagline, 140),
			title: asString(hero.title, defaultSiteContent.hero.title, 280),
			description: asString(hero.description, defaultSiteContent.hero.description, 900),
			primaryCta: asString(hero.primaryCta, defaultSiteContent.hero.primaryCta, 80),
			secondaryCta: asString(hero.secondaryCta, defaultSiteContent.hero.secondaryCta, 80),
			image: asString(hero.image, defaultSiteContent.hero.image, 280),
			imageAlt: asString(hero.imageAlt, defaultSiteContent.hero.imageAlt, 180),
			badgeTitle: asString(hero.badgeTitle, defaultSiteContent.hero.badgeTitle, 80),
			badgeText: asString(hero.badgeText, defaultSiteContent.hero.badgeText, 180),
		},
		stats,
		origin: {
			tagline: asString(originRaw.tagline, def.origin.tagline, 140),
			dateLabel: asString(originRaw.dateLabel, def.origin.dateLabel, 80),
			manifesto: asStringList(originRaw.manifesto, def.origin.manifesto, 8, 900),
			quote: asString(originRaw.quote, def.origin.quote, 400),
			insight: asString(originRaw.insight, def.origin.insight, 400),
			image1: asString(originRaw.image1, def.origin.image1, 280),
			image2: asString(originRaw.image2, def.origin.image2, 280),
			imageAlt: asString(originRaw.imageAlt, def.origin.imageAlt, 200),
			whatIs: {
				tagline: asString(originWhatIs.tagline, def.origin.whatIs.tagline, 80),
				description: asString(originWhatIs.description, def.origin.whatIs.description, 300),
				detail: asString(originWhatIs.detail, def.origin.whatIs.detail, 900),
			},
			process: {
				tagline: asString(originProcess.tagline, def.origin.process.tagline, 80),
				steps: originProcessSteps,
			},
			whatIsNot: {
				tagline: asString(originWhatIsNot.tagline, def.origin.whatIsNot.tagline, 80),
				items: asStringList(originWhatIsNot.items, def.origin.whatIsNot.items, 8, 200),
				closing: asString(originWhatIsNot.closing, def.origin.whatIsNot.closing, 400),
			},
		},
		about: {
			tagline: asString(about.tagline, defaultSiteContent.about.tagline, 140),
			title: asString(about.title, defaultSiteContent.about.title, 180),
			description: asString(about.description, defaultSiteContent.about.description, 1200),
			bullets: asStringList(about.bullets, defaultSiteContent.about.bullets, 10, 240),
			closing: asString(about.closing, defaultSiteContent.about.closing, 1200),
			valuesTitle: asString(about.valuesTitle, defaultSiteContent.about.valuesTitle, 80),
			values,
		},
		method: {
			tagline: asString(method.tagline, def.method.tagline, 140),
			title: asString(method.title, def.method.title, 240),
			description: asString(method.description, def.method.description, 400),
			steps: methodSteps,
		},
		services: {
			tagline: asString(services.tagline, defaultSiteContent.services.tagline, 120),
			title: asString(services.title, defaultSiteContent.services.title, 240),
			description: asString(services.description, defaultSiteContent.services.description, 1200),
			items: serviceItems,
		},
		testimonials: {
			tagline: asString(testimonials.tagline, defaultSiteContent.testimonials.tagline, 120),
			title: asString(testimonials.title, defaultSiteContent.testimonials.title, 240),
			description: asString(testimonials.description, defaultSiteContent.testimonials.description, 1200),
			items: testimonialItems,
		},
		newsletter: {
			tagline: asString(newsletter.tagline, defaultSiteContent.newsletter.tagline, 120),
			title: asString(newsletter.title, defaultSiteContent.newsletter.title, 240),
			description: asString(newsletter.description, defaultSiteContent.newsletter.description, 900),
			image: asString(newsletter.image, defaultSiteContent.newsletter.image, 280),
			imageAlt: asString(newsletter.imageAlt, defaultSiteContent.newsletter.imageAlt, 180),
			cta: asString(newsletter.cta, defaultSiteContent.newsletter.cta, 80),
		},
		contact: {
			tagline: asString(contact.tagline, defaultSiteContent.contact.tagline, 120),
			title: asString(contact.title, defaultSiteContent.contact.title, 240),
			description: asString(contact.description, defaultSiteContent.contact.description, 1200),
			whatsappNumber: asString(contact.whatsappNumber, defaultSiteContent.contact.whatsappNumber, 50),
			whatsappLabel: asString(contact.whatsappLabel, defaultSiteContent.contact.whatsappLabel, 80),
			email: asString(contact.email, defaultSiteContent.contact.email, 200),
			mode: asString(contact.mode, defaultSiteContent.contact.mode, 200),
			formDisclaimer: asString(contact.formDisclaimer, defaultSiteContent.contact.formDisclaimer, 500),
			formCta: asString(contact.formCta, defaultSiteContent.contact.formCta, 80),
			mailtoSubject: asString(contact.mailtoSubject, defaultSiteContent.contact.mailtoSubject, 200),
		},
		footer: {
			description: asString(footer.description, defaultSiteContent.footer.description, 240),
		},
	};
}

async function ensureContentFile() {
	const directory = path.dirname(CONTENT_FILE);
	await mkdir(directory, { recursive: true });
	try {
		await readFile(CONTENT_FILE, 'utf-8');
	} catch {
		await writeFile(CONTENT_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
	}
}

export async function getSiteContent() {
	await ensureContentFile();
	try {
		const contentRaw = await readFile(CONTENT_FILE, 'utf-8');
		return normalizeContent(JSON.parse(contentRaw));
	} catch {
		return defaultSiteContent;
	}
}

export async function saveSiteContent(raw: unknown) {
	const normalized = normalizeContent(raw);
	await ensureContentFile();
	await writeFile(CONTENT_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
	return normalized;
}

export function getUploadDir() {
	return path.join(process.cwd(), 'public/images/uploads');
}
