// Landing copy — separate from the tool's i18n so the hero can speak in
// the brand's voice (Agón / ἀγών = the contest) without touching the engine.

const FALLACIES = [
  "Ad Hominem", "Tu Quoque", "Petitio Principii", "Falsa Dicotomía",
  "Hombre de Paja", "Ad Populum", "Ad Baculum", "Post Hoc",
  "Pendiente Resbaladiza", "Apelación a la Autoridad", "Red Herring",
  "Falsa Equivalencia", "Generalización Apresurada", "No Verdadero Escocés",
]

const FALLACIES_EN = [
  "Ad Hominem", "Tu Quoque", "Begging the Question", "False Dilemma",
  "Straw Man", "Ad Populum", "Ad Baculum", "Post Hoc",
  "Slippery Slope", "Appeal to Authority", "Red Herring",
  "False Equivalence", "Hasty Generalization", "No True Scotsman",
]

export const landing = {
  es: {
    langSwitch: "Cambiar a inglés",
    eyebrow: "ἀγών · moderador de debate",
    titleLead: "El reloj decide ",
    titleMark: "quién habla.",
    lede:
      "Agón cronometra los turnos, lleva el puntaje y registra cada falacia en el momento en que se comete. Una herramienta de combate dialéctico: ronda a ronda, sin servidor, sin cuenta.",
    ctaPrimary: "Abrir el moderador",
    ctaNote: "Funciona offline. Tus datos quedan en este dispositivo.",
    marqueeLabel: "Catálogo de falacias incluido",
    featuresLabel: "Qué hace Agón",
    features: [
      {
        key: "timer",
        title: "Turnos cronometrados",
        body: "Un temporizador por participante y un reloj de sesión global. Empieza, pausa y reparte el tiempo de cada ronda con un toque.",
      },
      {
        key: "fallacies",
        title: "Falacias y criterios",
        body: "Marca una falacia atinada o detectada y el puntaje se ajusta solo. Catálogo editable, con deshacer para corregir al vuelo.",
      },
      {
        key: "simulator",
        title: "Simulador de dinámicas",
        body: "Un autómata celular de hipergrados visualiza cómo las posturas nacen, maduran y mueren en el tablero del debate.",
      },
      {
        key: "offline",
        title: "Offline e instalable",
        body: "Aplicación web progresiva: instálala, úsala sin conexión y retoma la sesión donde la dejaste. Nada sale de tu navegador.",
      },
    ],
    footerLabel: "Parte de Mouseîon",
    footerBy: "por Steven Vallejo",
    frentes: { filosofia: "Filosofía", ciencias: "Ciencias", informatica: "Informática", ingenieria: "Ingeniería" },
    fallacies: FALLACIES,
  },
  en: {
    langSwitch: "Switch to Spanish",
    eyebrow: "ἀγών · debate moderator",
    titleLead: "The clock decides ",
    titleMark: "who speaks.",
    lede:
      "Agón times the turns, keeps the score, and logs every fallacy the moment it lands. A tool for dialectical combat: round by round, no server, no account.",
    ctaPrimary: "Open the moderator",
    ctaNote: "Works offline. Your data stays on this device.",
    marqueeLabel: "Built-in fallacy catalog",
    featuresLabel: "What Agón does",
    features: [
      {
        key: "timer",
        title: "Timed turns",
        body: "One timer per speaker plus a global session clock. Start, pause, and hand out each round's time with a single tap.",
      },
      {
        key: "fallacies",
        title: "Fallacies and criteria",
        body: "Flag a landed or detected fallacy and the score adjusts itself. Editable catalog with undo to fix calls on the fly.",
      },
      {
        key: "simulator",
        title: "Dynamics simulator",
        body: "A hypergrade cellular automaton visualizes how positions are born, mature, and die across the debate board.",
      },
      {
        key: "offline",
        title: "Offline and installable",
        body: "A progressive web app: install it, use it offline, and pick up the session where you left off. Nothing leaves your browser.",
      },
    ],
    footerLabel: "Part of Mouseîon",
    footerBy: "by Steven Vallejo",
    frentes: { filosofia: "Philosophy", ciencias: "Sciences", informatica: "Computing", ingenieria: "Engineering" },
    fallacies: FALLACIES_EN,
  },
}
