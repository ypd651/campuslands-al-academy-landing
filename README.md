# Campuslands AI Academy · Nueva Landing Page

Rediseño integral de la landing page de **Campuslands AI Academy** desarrollado con **HTML5, CSS3 y JavaScript** sin dependencias externas de compilación, aplicando estrictamente el **Manual de Marca v1.0** y conservando la información real, planes, herramientas y enlaces oficiales de inscripción, diagnóstico, certificación y WhatsApp.

## Estructura del proyecto

- `index.html`: Estructura semántica y accesible de una sola página con las 9 secciones clave.
- `styles.css`: Sistema visual basado únicamente en la paleta oficial (`#050507`, `#7026E8`, `#9636FF`, `#B783FF`, `#FFFFFF`, `#8E8998` y `#DCD6EA`) y la tipografía única `Poppins`.
- `app.js`: Lógica modular para telemetría orbital de scroll, hero reactivo, constelación de 14 herramientas, laboratorio de prompts, recomendador de misiones, calculadora operativa, comparador Antes/Después y acordeón accesible.
- `assets/`: Logotipos oficiales (`logo-principal.png`, `logo-horizontal-blanco.svg`, `casco-blanco.svg`) y recurso oficial de la mascota (`max-explicando.png`).

## Cómo correrlo en local

1. Clona o descarga este repositorio y entra en la carpeta del proyecto.
2. Levanta un servidor estático local (por ejemplo, con Python o Node):

```bash
python -m http.server 8080
```

o con Node:

```bash
npx serve .
```

3. Abre `http://localhost:8080` en tu navegador.

## Piezas interactivas implementadas

1. **Hero reactivo al visitante**: Campo orbital reactivo al cursor y selector de perfil (*Empresa*, *Líder de equipo*, *Profesional independiente*) que adapta la ruta recomendada en tiempo real.
2. **Recorrido narrativo con el scroll**: Barra superior de progreso orbital, rail lateral de etapas (`00` a `07`) y revelación progresiva con respeto a `prefers-reduced-motion`.
3. **Recomendador y comparador de planes**: Cuestionario en 3 pasos para sugerir entre *Ignition (4 h)*, *Booster (8 h)*, *Liftoff (12 h)*, *Odyssey (Personalizado)* y *Nebula (Pregrabado)*, además de vista intercambiable entre tarjetas y tabla comparadora.
4. **Exploración libre de herramientas y casos**: Constelación interactiva con las 14 herramientas de IA, filtro por categoría, laboratorio en vivo de *Prompt genérico vs. Método AI Academy*, calculadora de carga repetitiva y deslizador comparativo *Antes / Después* para los cuatro perfiles.
