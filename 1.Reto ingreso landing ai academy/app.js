(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WHATSAPP_BASE = 'https://wa.me/573052105674?text=';

  /* ------------------------------------------------------------------------
     1. Datos reales de Campuslands AI Academy
     ------------------------------------------------------------------------ */

  const PERSONAS = {
    empresa: {
      tag: 'ÓRBITA EMPRESARIAL',
      title: 'Casos reales, resultados y aplicación inmediata',
      desc: 'Partimos de una tarea que tu equipo ya hace hoy —reportes, propuestas o atención— para llevarla a producción sin ejemplos genéricos.',
      plan: 'Odyssey · A medida',
      focus: 'Agentes y flujos con n8n',
      recPreset: { size: 'company', time: 'custom', goal: 'strategy' }
    },
    lider: {
      tag: 'ÓRBITA DE EQUIPO',
      title: 'Ahorro de tiempo con las herramientas que ya usan',
      desc: 'Estandarizamos prompts, agentes por rol y automatizaciones de seguimiento para que tu equipo deje de repetir trabajo manual.',
      plan: 'Booster (8 h) / Liftoff (12 h)',
      focus: 'Prompting avanzado + flujos',
      recPreset: { size: 'team', time: '8_12h', goal: 'productivity' }
    },
    independiente: {
      tag: 'ÓRBITA PROFESIONAL',
      title: 'Claridad paso a paso desde la primera sesión',
      desc: 'Construyes tu primer asistente diario para redactar propuestas, investigar con fuentes y diferenciarte frente al mercado.',
      plan: 'Ignition (4 h) / Nebula (24/7)',
      focus: 'Asistente diario y productividad',
      recPreset: { size: 'solo', time: '4h', goal: 'basics' }
    }
  };

  const TERRITORIES = {
    aprender: {
      title: 'Aprender:',
      text: 'Conceptos y habilidades base de IA, explicados sin jerga ni rodeos para entender qué herramienta usar en cada tarea.'
    },
    aplicar: {
      title: 'Aplicar:',
      text: 'Resolver tareas concretas del trabajo diario con IA —correos, minutas, análisis y propuestas— desde la primera sesión.'
    },
    construir: {
      title: 'Construir:',
      text: 'Crear automatizaciones, agentes personalizados y flujos reales con n8n y herramientas conectadas (AI Academy Lab).'
    },
    transformar: {
      title: 'Transformar:',
      text: 'Impactar decisiones, procesos operativos y resultados medibles de toda la empresa.'
    }
  };

  const TOOLS = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      glyph: 'CG',
      category: 'asistentes',
      categoryLabel: 'ASISTENTES Y TEXTO',
      tagline: 'Asistente conversacional para ideas y código',
      description: 'Potencia tu flujo creativo y técnico con respuestas contextualizadas, generación de contenido y soporte en múltiples lenguajes.',
      highlights: ['Redacción inteligente', 'Desarrollo y depuración', 'Flujos personalizados'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'claude',
      name: 'Claude',
      glyph: 'CL',
      category: 'asistentes',
      categoryLabel: 'ASISTENTES Y TEXTO',
      tagline: 'IA colaborativa con atención al detalle',
      description: 'Diseñada para equipos que requieren precisión, auditoría de documentos extensos y redacción clara en sus procesos.',
      highlights: ['Memoria extendida', 'Verificación y control', 'Precisión corporativa'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      glyph: 'GM',
      category: 'asistentes',
      categoryLabel: 'ASISTENTES Y TEXTO',
      tagline: 'Visión multimodal impulsada por Google',
      description: 'Analiza texto, imágenes y datos complejos para crear soluciones integradas con el ecosistema de Google Workspace.',
      highlights: ['Procesamiento multimodal', 'Insights a escala', 'Google Workspace'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'copilot-m365',
      name: 'Microsoft Copilot',
      glyph: 'MC',
      category: 'asistentes',
      categoryLabel: 'ASISTENTES Y TEXTO',
      tagline: 'Asistencia integrada en el ecosistema Microsoft',
      description: 'Automatiza documentos, presentaciones y análisis en hojas de cálculo con extensiones para aplicaciones empresariales.',
      highlights: ['Microsoft 365', 'Reportes automáticos', 'Seguridad empresarial'],
      mission: 'Desde Misión Booster (8 h)'
    },
    {
      id: 'notion-ai',
      name: 'Notion AI',
      glyph: 'NA',
      category: 'asistentes',
      categoryLabel: 'ASISTENTES Y TEXTO',
      tagline: 'Organización y contenido en un solo espacio',
      description: 'Transforma tus documentos, bases de datos y proyectos con automatización de texto y resúmenes inteligentes.',
      highlights: ['Resúmenes automáticos', 'Notas e ideas', 'Integración Notion'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'make',
      name: 'Make',
      glyph: 'MK',
      category: 'automatizacion',
      categoryLabel: 'AUTOMATIZACIÓN',
      tagline: 'Orquestación visual de procesos',
      description: 'Diseña escenarios visuales con IA para conectar servicios, transformar datos y escalar operaciones sin fricción.',
      highlights: ['Editor visual', 'Conectores amplios', 'Monitoreo real'],
      mission: 'Desde Misión Liftoff (12 h)'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      glyph: 'ZP',
      category: 'automatizacion',
      categoryLabel: 'AUTOMATIZACIÓN',
      tagline: 'Automatización con inteligencia contextual',
      description: 'Conecta aplicaciones y flujos de trabajo con agentes que comprenden la intención y ejecutan procesos multietapa sin código.',
      highlights: ['Sin código', 'Plantillas inteligentes', 'Flujos multietapa'],
      mission: 'Desde Misión Booster (8 h)'
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      glyph: 'PX',
      category: 'investigacion',
      categoryLabel: 'INVESTIGACIÓN Y REUNIONES',
      tagline: 'Investigación asistida por IA',
      description: 'Encuentra respuestas verificables con referencias, análisis comparativo de mercado y navegación enfocada en fuentes.',
      highlights: ['Citas en contexto', 'Temas relacionados', 'Descubrimiento enfocado'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      glyph: 'NB',
      category: 'investigacion',
      categoryLabel: 'INVESTIGACIÓN Y REUNIONES',
      tagline: 'Tu asistente de investigación personalizado',
      description: 'Sube tus documentos, manuales y notas para obtener resúmenes, hacer preguntas y generar guías basadas en tus propias fuentes.',
      highlights: ['Fuentes propias', 'Resúmenes y guías', 'Escritura contextual'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'read-ai',
      name: 'Read AI',
      glyph: 'RA',
      category: 'investigacion',
      categoryLabel: 'INVESTIGACIÓN Y REUNIONES',
      tagline: 'Resúmenes y análisis inteligentes para reuniones',
      description: 'Genera automáticamente resúmenes, transcripciones y puntos clave de tus reuniones virtuales para enfocarte en la conversación.',
      highlights: ['Transcripciones automáticas', 'Temas clave', 'Acuerdos accionables'],
      mission: 'Desde Misión Ignition (4 h)'
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      glyph: 'EL',
      category: 'multimedia',
      categoryLabel: 'VOZ, VIDEO Y DISEÑO',
      tagline: 'Voces sintéticas realistas y locución con IA',
      description: 'Genera audio de alta calidad en múltiples idiomas y acentos para crear cápsulas de formación, guías y contenido personalizado.',
      highlights: ['Audio natural', 'Multilenguaje', 'Voces personalizables'],
      mission: 'Desde Misión Booster (8 h)'
    },
    {
      id: 'heygen',
      name: 'HeyGen',
      glyph: 'HG',
      category: 'multimedia',
      categoryLabel: 'VOZ, VIDEO Y DISEÑO',
      tagline: 'Creación de avatares y videos con IA',
      description: 'Produce videos explicativos y capacitación interna utilizando avatares personalizables, sincronización labial y traducción.',
      highlights: ['Avatares personalizables', 'Traducción de video', 'Videos desde texto'],
      mission: 'Desde Misión Booster (8 h)'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      glyph: 'MJ',
      category: 'multimedia',
      categoryLabel: 'VOZ, VIDEO Y DISEÑO',
      tagline: 'Diseño visual impulsado por prompts',
      description: 'Crea conceptos visuales, prototipos de campaña y piezas gráficas de referencia con dirección artística precisa.',
      highlights: ['Alta fidelidad', 'Estilos consistentes', 'Iteración rápida'],
      mission: 'Desde Misión Booster (8 h)'
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      glyph: 'GH',
      category: 'codigo',
      categoryLabel: 'CÓDIGO Y DESARROLLO',
      tagline: 'Colaborador de código en tiempo real',
      description: 'Aumenta la productividad de tus repositorios con sugerencias contextuales, generación de pruebas y refactorización guiada.',
      highlights: ['Múltiples lenguajes', 'Explicaciones de código', 'Integración en editor'],
      mission: 'En Misión Odyssey / Perfiles técnicos'
    }
  ];

  const PROMPT_CASES = {
    comercial: {
      generico: {
        input: '“Escríbeme un correo para venderle cursos de IA a una empresa en Bucaramanga.”',
        output: '“Estimado cliente, somos una empresa innovadora que ofrece revolucionarios cursos de inteligencia artificial para llevar su negocio al futuro...”\n\nResultado plano, genérico y fácil de ignorar en la bandeja de entrada.'
      },
      academy: {
        input: '“Actúa como consultor B2B de Campuslands AI Academy. Redacta un correo corto (máx. 110 palabras) para un gerente comercial en Santander cuyo equipo tarda 4 h semanales consolidando cotizaciones. Abre con ese problema, propón un piloto práctico de 4 h y cierra con una sola pregunta para agendar llamada.”',
        output: '“¿Cuántas horas pierde tu equipo comercial armando cotizaciones a mano cada viernes?\n\nEn Campuslands AI Academy ayudamos a equipos en Bucaramanga a automatizar resúmenes de reuniones y propuestas comerciales en sesiones prácticas de 4 horas, sobre sus propios formatos reales.\n\n¿Te muestro en 15 minutos cómo se vería aplicado a tu flujo actual?”'
      }
    },
    reunion: {
      generico: {
        input: '“Resume esta transcripción de reunión.”',
        output: 'Un bloque largo de texto narrativo donde se mezclan comentarios sueltos con decisiones importantes, sin responsables ni fechas.'
      },
      academy: {
        input: '“Analiza esta transcripción de Read AI. Extrae: 1) máximo 3 decisiones tomadas, 2) tabla de tareas con responsable y fecha límite, y 3) riesgos sin resolver. Si falta algún responsable, márcalo como POR CONFIRMAR.”',
        output: '1. Decisiones: Aprobar piloto Booster de 8 h para área de operaciones.\n2. Tareas:\n• Mafe Góngora — Enviar cronograma · Jueves\n• Santiago Laguado — Definir caso n8n · Viernes\n• Responsable de datos — POR CONFIRMAR.'
      }
    },
    flujo: {
      generico: {
        input: '“¿Cómo automatizo mis formularios con IA?”',
        output: 'Una lista teórica de 10 herramientas sin orden ni conexión entre sí, sin indicar disparadores ni validaciones.'
      },
      academy: {
        input: '“Diseña un flujo en n8n: disparador cuando entra un registro en Google Forms, clasifica la necesidad con Claude según 3 rutas (Ignition, Booster, Odyssey), guarda fila en Google Sheets y envía notificación breve al canal de WhatsApp/Slack del equipo.”',
        output: 'Nodo 1: Webhook / Google Forms Trigger → Nodo 2: Clasificador JSON (Claude) → Nodo 3: Switch por tamaño de equipo → Nodo 4: Google Sheets Append → Nodo 5: Alerta con enlace directo y datos listos.'
      }
    }
  };

  const PLANS = {
    IGNITION: {
      stage: 'FASE 01 · 4 HORAS',
      name: 'IGNITION',
      includes: [
        'Comprende el impacto real de la IA en tu industria',
        'Domina la IA generativa de tu elección como asistente diario',
        'Conoce las 10 herramientas de IA más relevantes',
        'Aprende a crear agentes básicos de IA en vivo'
      ]
    },
    BOOSTER: {
      stage: 'FASE 02 · 8 HORAS',
      name: 'BOOSTER',
      includes: [
        'Todo Ignition con enfoque profesional avanzado',
        'Técnicas de prompting para resultados precisos',
        'Domina 2 herramientas de IA a tu elección',
        'Construye agentes personalizados para tu rol'
      ]
    },
    LIFTOFF: {
      stage: 'FASE 03 · 12 HORAS',
      name: 'LIFTOFF',
      includes: [
        'Todo Booster enfocado en escalar tu operación',
        'Domina una herramienta de IA adicional elegida',
        'Aprende a automatizar procesos reales con n8n',
        'Diseña flujos automáticos aplicados a tu negocio'
      ]
    },
    ODYSSEY: {
      stage: 'EXPEDICIÓN · PERSONALIZADO',
      name: 'ODYSSEY',
      includes: [
        'Programa 100% personalizado para tu empresa',
        'Elige herramientas, duración y profundidad',
        'Casos de uso reales según tu industria y roles',
        'Acompañamiento estratégico con sesiones tácticas'
      ]
    },
    NEBULA: {
      stage: 'ÓRBITA · PREGRABADO',
      name: 'NEBULA',
      includes: [
        'Contenidos organizados por niveles de aprendizaje',
        'Evaluaciones continuas para medir el progreso',
        'Acceso flexible 24/7 a materiales, recursos y actualizaciones',
        'Comunidad activa de soporte y aprendizaje colaborativo'
      ]
    }
  };

  const CASES = {
    empresario: {
      role: 'Empresario / Emprendedor',
      beforeHeading: 'Decisiones lentas y carga comercial manual',
      before: 'Procesos comerciales manuales, lanzamientos lentos y decisiones a ciegas por falta de contenido y reportes actualizados.',
      beforeTag: 'Fricción semanal en ventas y seguimiento',
      afterHeading: 'Asistentes comerciales y métricas en minutos',
      after: 'Asistentes de IA que crean correos, propuestas y reportes en minutos, con métricas claras para escalar ventas sin fricción.',
      afterTag: 'Misión sugerida: Booster (8 h) u Odyssey'
    },
    innovacion: {
      role: 'Director(a) de Innovación',
      beforeHeading: 'Pilotos desconectados sin evidencia de retorno',
      before: 'Pilotos desconectados que no escalan y escasa evidencia para justificar inversión ante la dirección.',
      beforeTag: 'Iniciativas aisladas sin adopción real',
      afterHeading: 'Workshops con agentes funcionales y métricas',
      after: 'Workshops intensivos de 4 h con agentes funcionales, casos de uso claros y métricas de eficiencia listas para presentar.',
      afterTag: 'Misión sugerida: Ignition (4 h) u Odyssey'
    },
    independiente: {
      role: 'Profesional Independiente',
      beforeHeading: 'Horas atrapadas en tareas operativas repetitivas',
      before: 'Demasiado tiempo en tareas repetitivas, poco foco en vender y mínima diferenciación frente al mercado.',
      beforeTag: 'Baja capacidad para atender más clientes',
      afterHeading: 'Propuestas y seguimiento en segundos',
      after: 'Prompts estratégicos que generan propuestas, automatizan el seguimiento y entregan resultados personalizados en segundos.',
      afterTag: 'Misión sugerida: Ignition (4 h) o Nebula'
    },
    rrhh: {
      role: 'Líder de RR. HH.',
      beforeHeading: 'Onboarding genérico y acompañamiento manual',
      before: 'Onboarding genérico, procesos manuales y nulo acompañamiento adaptado a cada rol.',
      beforeTag: 'Curva de aprendizaje lenta por área',
      afterHeading: 'Rutas adaptadas con bots de soporte continuo',
      after: 'Rutas de microlearning con bots que guían, responden dudas y capturan feedback continuo de forma automática.',
      afterTag: 'Misión sugerida: Liftoff (12 h) u Odyssey'
    }
  };

  const LEGAL_TEXTS = {
    privacidad: {
      title: 'Política de privacidad',
      html: '<p>Campuslands AI Academy protege los datos suministrados en los formularios de inscripción, diagnóstico y canales de contacto por WhatsApp.</p><p>La información recolectada se utiliza exclusivamente para coordinar sesiones de formación, validar certificaciones oficiales y acompañar a los equipos inscritos conforme a la normativa colombiana de protección de datos personales.</p>'
    },
    terminos: {
      title: 'Términos de uso',
      html: '<p>Las misiones Ignition (4 h), Booster (8 h), Liftoff (12 h), Odyssey (personalizado) y Nebula (pregrabado) se imparten en modalidad presencial en Campuslands, presencial en sede del cliente o virtual, previa confirmación de agenda.</p><p>Los certificados se emiten tras validar la participación y cumplimiento de horas o evaluaciones correspondientes.</p>'
    }
  };

  /* ------------------------------------------------------------------------
     2. Progreso orbital, rail lateral y revelación por scroll
     ------------------------------------------------------------------------ */

  const progressBar = document.getElementById('orbitProgressBar');
  const railCode = document.getElementById('railStageCode');
  const railPercent = document.getElementById('railPercent');
  const railDots = Array.from(document.querySelectorAll('.rail-dot'));
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav .nav-link:not(.nav-link-external)'));
  const sections = Array.from(document.querySelectorAll('main > section[data-stage]'));
  const orbitRings = Array.from(document.querySelectorAll('.orbit-ring'));

  function updateScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    const pct = Math.round(ratio * 100);

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (railPercent) railPercent.textContent = `${pct}%`;

    const midpoint = window.scrollY + window.innerHeight * 0.38;
    let activeSection = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= midpoint) activeSection = sec;
    }

    if (activeSection) {
      const stage = activeSection.dataset.stage || '00';
      const id = activeSection.id;
      if (railCode) railCode.textContent = stage;
      railDots.forEach(dot => {
        dot.classList.toggle('is-active', dot.dataset.section === id);
      });
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Revelado con IntersectionObserver
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealItems.forEach(el => revealObs.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------------
     3. Menú móvil accesible
     ------------------------------------------------------------------------ */

  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function setDrawerOpen(isOpen) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    mobileDrawer.hidden = !isOpen;
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const currentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!currentlyOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Hero interactivo (paralaje sutil + selector de visitante)
     ------------------------------------------------------------------------ */

  const heroSection = document.getElementById('hero');
  if (heroSection && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('pointermove', event => {
      const rect = heroSection.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      orbitRings.forEach((ring, idx) => {
        const depth = (idx + 1) * 10;
        ring.style.transform = `translate(calc(-50% + ${nx * depth}px), calc(-50% + ${ny * depth}px))`;
      });
    });
  }

  const personaPills = Array.from(document.querySelectorAll('.visitor-pill'));
  const personaTelemetryTag = document.getElementById('personaTelemetryTag');
  const personaPanelTitle = document.getElementById('personaPanelTitle');
  const personaPanelDesc = document.getElementById('personaPanelDesc');
  const personaSuggestedPlan = document.getElementById('personaSuggestedPlan');
  const personaFocus = document.getElementById('personaFocus');
  const personaActionLink = document.getElementById('personaActionLink');

  let currentRecState = { size: 'team', time: '8_12h', goal: 'productivity' };

  function applyPersona(key) {
    const data = PERSONAS[key];
    if (!data) return;

    personaPills.forEach(btn => {
      const active = btn.dataset.persona === key;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (personaTelemetryTag) personaTelemetryTag.textContent = data.tag;
    if (personaPanelTitle) personaPanelTitle.textContent = data.title;
    if (personaPanelDesc) personaPanelDesc.textContent = data.desc;
    if (personaSuggestedPlan) personaSuggestedPlan.textContent = data.plan;
    if (personaFocus) personaFocus.textContent = data.focus;

    // Sincronizar recomendador con el perfil elegido
    currentRecState = { ...data.recPreset };
    syncRecommenderUI();
    renderRecommendation();
  }

  personaPills.forEach(btn => {
    btn.addEventListener('click', () => applyPersona(btn.dataset.persona));
  });

  if (personaActionLink) {
    personaActionLink.addEventListener('click', () => {
      syncRecommenderUI();
      renderRecommendation();
    });
  }

  /* ------------------------------------------------------------------------
     5. Cuatro territorios interactivos
     ------------------------------------------------------------------------ */

  const territoryTabs = Array.from(document.querySelectorAll('.territory-tab'));
  const territoryOutput = document.getElementById('territoryOutput');

  territoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.territory;
      const item = TERRITORIES[key];
      if (!item || !territoryOutput) return;

      territoryTabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      territoryOutput.innerHTML = `<strong class="territory-output-title">${item.title}</strong><span class="territory-output-text">${item.text}</span>`;
    });
  });

  /* ------------------------------------------------------------------------
     6. Constelación de 14 herramientas + Inspector + Lab de Prompt
     ------------------------------------------------------------------------ */

  const constellationNodesEl = document.getElementById('constellationNodes');
  const filterPills = Array.from(document.querySelectorAll('.filter-pill'));
  const inspectorIcon = document.getElementById('toolInspectorIcon');
  const inspectorCategory = document.getElementById('toolCategoryTag');
  const inspectorName = document.getElementById('toolInspectorName');
  const inspectorTagline = document.getElementById('toolInspectorTagline');
  const inspectorDesc = document.getElementById('toolInspectorDesc');
  const inspectorHighlights = document.getElementById('toolHighlights');
  const inspectorMissionRef = document.getElementById('toolMissionRef');

  let selectedToolId = TOOLS[0].id;
  let activeFilter = 'all';

  function renderToolInspector(tool) {
    if (!tool) return;
    if (inspectorIcon) inspectorIcon.textContent = tool.glyph;
    if (inspectorCategory) inspectorCategory.textContent = tool.categoryLabel;
    if (inspectorName) inspectorName.textContent = tool.name;
    if (inspectorTagline) inspectorTagline.textContent = tool.tagline;
    if (inspectorDesc) inspectorDesc.textContent = tool.description;
    if (inspectorMissionRef) inspectorMissionRef.textContent = tool.mission;
    if (inspectorHighlights) {
      inspectorHighlights.innerHTML = tool.highlights
        .map(h => `<span class="tool-highlight-chip">${h}</span>`)
        .join('');
    }
  }

  function renderConstellation() {
    if (!constellationNodesEl) return;
    constellationNodesEl.innerHTML = '';

    TOOLS.forEach(tool => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tool-node';
      const matchesFilter = activeFilter === 'all' || tool.category === activeFilter;
      if (!matchesFilter) btn.classList.add('is-dimmed');
      if (tool.id === selectedToolId) btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', String(tool.id === selectedToolId));
      btn.innerHTML = `<span class="tool-node-glyph">${tool.glyph}</span><span>${tool.name}</span>`;
      btn.addEventListener('click', () => {
        selectedToolId = tool.id;
        renderConstellation();
        renderToolInspector(tool);
      });
      constellationNodesEl.appendChild(btn);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.filter;
      filterPills.forEach(p => p.classList.toggle('is-active', p === pill));

      const firstMatch = TOOLS.find(t => activeFilter === 'all' || t.category === activeFilter);
      if (firstMatch && activeFilter !== 'all') {
        selectedToolId = firstMatch.id;
        renderToolInspector(firstMatch);
      }
      renderConstellation();
    });
  });

  renderConstellation();
  renderToolInspector(TOOLS[0]);

  // Prompt Lab
  const promptCaseTabs = Array.from(document.querySelectorAll('.prompt-case-tab'));
  const promptModeBtns = Array.from(document.querySelectorAll('.prompt-mode-btn'));
  const promptInputLabel = document.getElementById('promptInputLabel');
  const promptOutputLabel = document.getElementById('promptOutputLabel');
  const promptInputText = document.getElementById('promptInputText');
  const promptOutputText = document.getElementById('promptOutputText');

  let activePromptCase = 'comercial';
  let activePromptMode = 'academy';

  function renderPromptLab() {
    const scenario = PROMPT_CASES[activePromptCase];
    if (!scenario) return;
    const data = scenario[activePromptMode];

    if (promptInputLabel) {
      promptInputLabel.textContent =
        activePromptMode === 'academy' ? 'LO QUE ESCRIBES (MÉTODO AI ACADEMY)' : 'LO QUE ESCRIBES (GENÉRICO)';
    }
    if (promptOutputLabel) {
      promptOutputLabel.textContent =
        activePromptMode === 'academy' ? 'RESULTADO LISTO PARA USAR' : 'RESULTADO GENÉRICO';
    }
    if (promptInputText) promptInputText.textContent = data.input;
    if (promptOutputText) promptOutputText.textContent = data.output;
  }

  promptCaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activePromptCase = tab.dataset.promptCase;
      promptCaseTabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      renderPromptLab();
    });
  });

  promptModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activePromptMode = btn.dataset.promptMode;
      promptModeBtns.forEach(b => b.classList.toggle('is-active', b === btn));
      renderPromptLab();
    });
  });

  renderPromptLab();

  /* ------------------------------------------------------------------------
     7. Recomendador de planes y vista tarjetas / tabla
     ------------------------------------------------------------------------ */

  const recGroups = Array.from(document.querySelectorAll('.rec-options'));
  const resetRecBtn = document.getElementById('resetRecommenderBtn');
  const recStage = document.getElementById('recStage');
  const recMatch = document.getElementById('recMatch');
  const recPlanName = document.getElementById('recPlanName');
  const recReason = document.getElementById('recReason');
  const recIncludes = document.getElementById('recIncludes');
  const recInscribirBtn = document.getElementById('recInscribirBtn');
  const recWhatsappBtn = document.getElementById('recWhatsappBtn');
  const planCards = Array.from(document.querySelectorAll('.plan-card'));

  function computeRecommendedPlan(state) {
    if (state.size === 'company' || state.time === 'custom' || state.goal === 'strategy') {
      return {
        key: 'ODYSSEY',
        match: 'Ajuste óptimo · Empresa',
        reason: 'Al buscar una ruta adaptada a tu empresa y sus áreas, Odyssey diseña herramientas, duración y casos de uso reales a la medida.'
      };
    }
    if (state.time === 'self') {
      return {
        key: 'NEBULA',
        match: 'Ajuste óptimo · 24/7',
        reason: 'Si necesitas avanzar a tu ritmo en cualquier horario, Nebula te da acceso 24/7 por niveles, evaluaciones y comunidad de soporte.'
      };
    }
    if (state.goal === 'automation') {
      return {
        key: 'LIFTOFF',
        match: 'Ajuste óptimo · Automatización',
        reason: 'Tu objetivo requiere ir más allá de los prompts: en Liftoff (12 h) construyes flujos automáticos reales con n8n aplicados a tu operación.'
      };
    }
    if (state.time === '4h' && state.goal === 'basics') {
      return {
        key: 'IGNITION',
        match: 'Ajuste óptimo · Despegue',
        reason: 'En solo 4 horas comprendes el mapa de las 10 herramientas clave y sales con tu primer asistente de IA funcional en vivo.'
      };
    }
    return {
      key: 'BOOSTER',
      match: 'Recomendada para ti',
      reason: 'En 8 horas combinas técnicas avanzadas de prompting con la creación de agentes personalizados para tu rol diario.'
    };
  }

  function syncRecommenderUI() {
    recGroups.forEach(group => {
      const groupName = group.dataset.recGroup;
      const targetVal = currentRecState[groupName];
      group.querySelectorAll('.rec-option').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.value === targetVal);
      });
    });
  }

  function renderRecommendation() {
    const rec = computeRecommendedPlan(currentRecState);
    const plan = PLANS[rec.key];
    if (!plan) return;

    if (recStage) recStage.textContent = plan.stage;
    if (recMatch) recMatch.textContent = rec.match;
    if (recPlanName) recPlanName.textContent = plan.name;
    if (recReason) recReason.textContent = rec.reason;
    if (recIncludes) {
      recIncludes.innerHTML = plan.includes.map(item => `<li>${item}</li>`).join('');
    }
    if (recInscribirBtn) {
      recInscribirBtn.textContent = plan.name === 'NEBULA' ? 'Acceder a NEBULA' : `Inscribirme en ${plan.name}`;
    }
    if (recWhatsappBtn) {
      const msg = `Hola, me interesa la misión ${plan.name} de Campuslands AI Academy`;
      recWhatsappBtn.href = `${WHATSAPP_BASE}${encodeURIComponent(msg)}`;
    }

    planCards.forEach(card => {
      card.classList.toggle('is-recommended', card.dataset.plan === rec.key);
    });
  }

  recGroups.forEach(group => {
    const groupName = group.dataset.recGroup;
    group.querySelectorAll('.rec-option').forEach(btn => {
      btn.addEventListener('click', () => {
        currentRecState[groupName] = btn.dataset.value;
        syncRecommenderUI();
        renderRecommendation();
      });
    });
  });

  if (resetRecBtn) {
    resetRecBtn.addEventListener('click', () => {
      currentRecState = { size: 'solo', time: '4h', goal: 'basics' };
      syncRecommenderUI();
      renderRecommendation();
    });
  }

  syncRecommenderUI();
  renderRecommendation();

  // Toggle Tarjetas vs Tabla comparadora
  const viewToggleBtns = Array.from(document.querySelectorAll('.view-toggle-btn'));
  const plansCardsView = document.getElementById('plansCardsView');
  const plansCompareView = document.getElementById('plansCompareView');

  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.plansView;
      viewToggleBtns.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      if (plansCardsView && plansCompareView) {
        plansCardsView.hidden = view !== 'cards';
        plansCompareView.hidden = view !== 'compare';
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. Calculadora transparente de horas operativas
     ------------------------------------------------------------------------ */

  const calcTeamRange = document.getElementById('calcTeamRange');
  const calcHoursRange = document.getElementById('calcHoursRange');
  const calcTeamValue = document.getElementById('calcTeamValue');
  const calcHoursValue = document.getElementById('calcHoursValue');
  const calcAnnualHours = document.getElementById('calcAnnualHours');
  const calcWorkDays = document.getElementById('calcWorkDays');

  function updateCalculator() {
    if (!calcTeamRange || !calcHoursRange) return;
    const people = Number(calcTeamRange.value);
    const hoursPerWeek = Number(calcHoursRange.value);
    const annualHours = people * hoursPerWeek * 48;
    const workDays = Math.round(annualHours / 8);

    if (calcTeamValue) calcTeamValue.textContent = `${people} ${people === 1 ? 'persona' : 'personas'}`;
    if (calcHoursValue) calcHoursValue.textContent = `${hoursPerWeek} ${hoursPerWeek === 1 ? 'hora' : 'horas'}`;
    if (calcAnnualHours) calcAnnualHours.textContent = `${annualHours.toLocaleString('es-CO')} h`;
    if (calcWorkDays) calcWorkDays.textContent = `${workDays.toLocaleString('es-CO')} días`;
  }

  if (calcTeamRange && calcHoursRange) {
    calcTeamRange.addEventListener('input', updateCalculator);
    calcHoursRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  /* ------------------------------------------------------------------------
     9. Casos de uso: Antes / Después interactivo (drag + range + teclado)
     ------------------------------------------------------------------------ */

  const caseTabs = Array.from(document.querySelectorAll('.case-tab'));
  const baRoleTitle = document.getElementById('baRoleTitle');
  const baBeforeHeading = document.getElementById('baBeforeHeading');
  const baBeforeCopy = document.getElementById('baBeforeCopy');
  const baBeforeTag = document.getElementById('baBeforeTag');
  const baAfterHeading = document.getElementById('baAfterHeading');
  const baAfterCopy = document.getElementById('baAfterCopy');
  const baAfterTag = document.getElementById('baAfterTag');
  const baStage = document.getElementById('baStage');
  const baBeforeLayer = document.getElementById('baBeforeLayer');
  const baDivider = document.getElementById('baDivider');
  const baRangeInput = document.getElementById('baRangeInput');
  const baBtnBefore = document.getElementById('baBtnBefore');
  const baBtnSplit = document.getElementById('baBtnSplit');
  const baBtnAfter = document.getElementById('baBtnAfter');

  let baPercent = 50;

  function setBeforeAfterSplit(pct) {
    baPercent = Math.min(100, Math.max(0, Math.round(pct)));
    if (baBeforeLayer) {
      baBeforeLayer.style.clipPath = `inset(0 ${100 - baPercent}% 0 0)`;
    }
    if (baDivider) {
      baDivider.style.left = `${baPercent}%`;
      baDivider.setAttribute('aria-valuenow', String(baPercent));
    }
    if (baRangeInput) baRangeInput.value = String(baPercent);

    if (baBtnBefore && baBtnSplit && baBtnAfter) {
      baBtnBefore.classList.toggle('is-active', baPercent >= 85);
      baBtnSplit.classList.toggle('is-active', baPercent > 15 && baPercent < 85);
      baBtnAfter.classList.toggle('is-active', baPercent <= 15);
    }
  }

  function applyCaseProfile(key) {
    const item = CASES[key];
    if (!item) return;

    caseTabs.forEach(tab => {
      const active = tab.dataset.case === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    if (baRoleTitle) baRoleTitle.textContent = item.role;
    if (baBeforeHeading) baBeforeHeading.textContent = item.beforeHeading;
    if (baBeforeCopy) baBeforeCopy.textContent = item.before;
    if (baBeforeTag) baBeforeTag.textContent = item.beforeTag;
    if (baAfterHeading) baAfterHeading.textContent = item.afterHeading;
    if (baAfterCopy) baAfterCopy.textContent = item.after;
    if (baAfterTag) baAfterTag.textContent = item.afterTag;
  }

  caseTabs.forEach(tab => {
    tab.addEventListener('click', () => applyCaseProfile(tab.dataset.case));
  });

  if (baRangeInput) {
    baRangeInput.addEventListener('input', () => setBeforeAfterSplit(Number(baRangeInput.value)));
  }
  if (baBtnBefore) baBtnBefore.addEventListener('click', () => setBeforeAfterSplit(100));
  if (baBtnSplit) baBtnSplit.addEventListener('click', () => setBeforeAfterSplit(50));
  if (baBtnAfter) baBtnAfter.addEventListener('click', () => setBeforeAfterSplit(0));

  if (baStage && baDivider) {
    let dragging = false;

    const moveFromClientX = clientX => {
      const rect = baStage.getBoundingClientRect();
      if (rect.width <= 0) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setBeforeAfterSplit(pct);
    };

    baStage.addEventListener('pointerdown', event => {
      dragging = true;
      baStage.setPointerCapture(event.pointerId);
      moveFromClientX(event.clientX);
    });

    baStage.addEventListener('pointermove', event => {
      if (!dragging) return;
      moveFromClientX(event.clientX);
    });

    const stopDrag = () => {
      dragging = false;
    };
    baStage.addEventListener('pointerup', stopDrag);
    baStage.addEventListener('pointercancel', stopDrag);

    baDivider.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setBeforeAfterSplit(baPercent - 10);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setBeforeAfterSplit(baPercent + 10);
      }
    });
  }

  applyCaseProfile('empresario');
  setBeforeAfterSplit(50);

  /* ------------------------------------------------------------------------
     10. Acordeón de FAQs + Modal Legal
     ------------------------------------------------------------------------ */

  const faqTriggers = Array.from(document.querySelectorAll('.faq-trigger'));
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      // Cerrar otros paneles para mantener lectura limpia
      faqTriggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          const otherPanelId = other.getAttribute('aria-controls');
          const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
          if (otherPanel) {
            otherPanel.hidden = true;
            otherPanel.classList.remove('is-open');
          }
        }
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.hidden = isExpanded;
        panel.classList.toggle('is-open', !isExpanded);
      }
    });
  });

  // Modal Legal
  const legalModal = document.getElementById('legalModal');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalBody = document.getElementById('legalModalBody');
  const legalModalClose = document.getElementById('legalModalClose');
  const legalModalBackdrop = document.getElementById('legalModalBackdrop');
  const legalBtns = Array.from(document.querySelectorAll('.legal-link-btn'));
  let lastFocusedEl = null;

  function openLegalModal(type) {
    const content = LEGAL_TEXTS[type];
    if (!content || !legalModal) return;
    lastFocusedEl = document.activeElement;
    if (legalModalTitle) legalModalTitle.textContent = content.title;
    if (legalModalBody) legalModalBody.innerHTML = content.html;
    legalModal.hidden = false;
    if (legalModalClose) legalModalClose.focus();
  }

  function closeLegalModal() {
    if (!legalModal || legalModal.hidden) return;
    legalModal.hidden = true;
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  legalBtns.forEach(btn => {
    btn.addEventListener('click', () => openLegalModal(btn.dataset.legal));
  });
  if (legalModalClose) legalModalClose.addEventListener('click', closeLegalModal);
  if (legalModalBackdrop) legalModalBackdrop.addEventListener('click', closeLegalModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLegalModal();
  });

  // Año dinámico en footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
