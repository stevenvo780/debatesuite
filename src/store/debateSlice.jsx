import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  round: 1,
  participants: [],
  activeParticipantId: null,
  sessionStart: null,
  globalSessionTitle: "",
  globalSessionStart: Date.now(),
  globalSessionPaused: false,
  globalSessionPausedAt: null,
  globalTimeInput: 5,
  initialTime: 5,
  language: 'es',
  speakOrder: [],
  lastInteractionTime: Date.now(),
  scoringCriteria: [
    { id: 3, name: 'Performance', points: 1 },
    { id: 4, name: 'Convencimiento', points: 1 },
    { id: 5, name: 'No responder', points: -3 },
    { id: 6, name: 'Saltar de postura', points: -3 },
    { id: 7, name: 'Aporte externo', points: -1 },
    { id: 8, name: 'Interrupción/Sabotaje', points: -1 },
  ],
  fallacies: [
    { id: 'f1', name: 'Ad Hominem', def: 'Atacar a la persona en lugar de su argumento.' },
    { id: 'f2', name: 'Hombre de paja', def: 'Distorsionar el argumento ajeno para atacar una versión más débil.' },
    { id: 'f3', name: 'Falsa dicotomía', def: 'Presentar solo dos opciones cuando existen más alternativas.' },
    { id: 'f4', name: 'Pendiente resbaladiza', def: 'Afirmar que una acción llevará inevitablemente a consecuencias extremas.' },
    { id: 'f5', name: 'Apelación a la autoridad', def: 'Usar una autoridad no relevante como prueba de un argumento.' },
    { id: 'f6', name: 'Apelación a la emoción', def: 'Manipular emociones en vez de usar razonamiento lógico.' },
    { id: 'f7', name: 'Apelación a la ignorancia', def: 'Asumir que algo es cierto porque no se ha demostrado falso, o viceversa.' },
    { id: 'f8', name: 'Apelación a la tradición', def: 'Justificar algo solo porque siempre se ha hecho así.' },
    { id: 'f9', name: 'Apelación a la naturaleza', def: 'Argumentar que lo natural es inherentemente bueno o correcto.' },
    { id: 'f10', name: 'Ad Populum', def: 'Afirmar que algo es verdad porque la mayoría lo cree.' },
    { id: 'f11', name: 'Tu Quoque', def: 'Desviar la crítica señalando que el otro hace lo mismo.' },
    { id: 'f12', name: 'Petición de principio', def: 'Usar la conclusión como premisa del propio argumento.' },
    { id: 'f13', name: 'Post Hoc', def: 'Asumir que si B ocurrió después de A, entonces A causó B.' },
    { id: 'f14', name: 'Generalización apresurada', def: 'Sacar una conclusión general a partir de pocos casos.' },
    { id: 'f15', name: 'Falsa equivalencia', def: 'Tratar dos cosas como iguales cuando tienen diferencias relevantes.' },
    { id: 'f16', name: 'Red Herring', def: 'Introducir un tema irrelevante para desviar la atención.' },
    { id: 'f17', name: 'Envenenamiento del pozo', def: 'Desacreditar al oponente antes de que presente su argumento.' },
    { id: 'f18', name: 'No verdadero escocés', def: 'Redefinir un grupo para excluir contraejemplos incómodos.' },
    { id: 'f19', name: 'Carga de la prueba', def: 'Exigir que el otro demuestre la negativa en vez de probar la afirmación.' },
    { id: 'f20', name: 'Equívoco', def: 'Usar una palabra con doble sentido para confundir el argumento.' },
    { id: 'f21', name: 'Ad Baculum', def: 'Recurrir a amenazas o al miedo para imponer una posición.' },
    { id: 'f22', name: 'Ad Misericordiam', def: 'Apelar a la lástima para ganar el argumento.' },
    { id: 'f23', name: 'Francotirador de Texas', def: 'Seleccionar datos favorables ignorando los que contradicen la tesis.' },
    { id: 'f24', name: 'Falacia genética', def: 'Juzgar algo como bueno o malo solo por su origen.' },
    { id: 'f25', name: 'Falacia naturalista', def: 'Derivar lo que debe ser a partir de lo que es.' },
  ],
}

export const debateSlice = createSlice({
  name: 'debate',
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload)
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter(p => p.id !== action.payload)
      if (state.activeParticipantId === action.payload) {
        state.activeParticipantId = null
        state.sessionStart = null
      }
    },
    updateRound: (state, action) => {
      state.round = action.payload
    },
    setGlobalTimeInput: (state, action) => {
      state.globalTimeInput = action.payload
    },
    setInitialTime: (state, action) => {
      state.initialTime = action.payload
    },
    toggleTimer: (state, action) => {
      if (state.activeParticipantId === action.payload) {
        state.activeParticipantId = null
        state.sessionStart = null
      } else {
        state.activeParticipantId = action.payload
        state.sessionStart = Date.now()
        state.speakOrder.push({
          participantId: action.payload,
          timestamp: Date.now(),
          round: state.round
        })
      }
      state.lastInteractionTime = Date.now()
    },
    updateParticipant: (state, action) => {
      const index = state.participants.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.participants[index] = action.payload
      }
    },
    setGlobalSession: (state, action) => {
      state.globalSessionPaused = action.payload.paused
      state.globalSessionPausedAt = action.payload.pausedAt
      state.globalSessionStart = action.payload.start
    },
    setGlobalTitle: (state, action) => {
      state.globalSessionTitle = action.payload
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    resetStore: (state) => {
      const savedTimeInput = state.globalTimeInput
      const savedInitialTime = state.initialTime
      const savedCriteria = state.scoringCriteria
      const savedFallacies = state.fallacies
      return {
        ...initialState,
        globalTimeInput: savedTimeInput,
        initialTime: savedInitialTime,
        globalSessionStart: Date.now(),
        scoringCriteria: savedCriteria,
        fallacies: savedFallacies
      }
    },
    resetGame: (state) => {
      const savedTimeInput = state.globalTimeInput;
      const savedInitialTime = state.initialTime;
      const savedParticipants = state.participants.map(p => ({
        ...p,
        timeLeft: p.initialTime * 60,
        totalUsed: 0,
        roundTimes: {},
        penalties: 0
      }));
      const savedTitle = state.globalSessionTitle;
      const savedCriteria = state.scoringCriteria;
      const savedFallacies = state.fallacies;

      return {
        ...initialState,
        globalTimeInput: savedTimeInput,
        initialTime: savedInitialTime,
        globalSessionStart: Date.now(),
        globalSessionTitle: savedTitle,
        participants: savedParticipants,
        scoringCriteria: savedCriteria,
        fallacies: savedFallacies
      };
    },
    updateParticipantsOrder: (state, action) => {
      state.participants = action.payload
    },
    addCriterion: (state, action) => {
      state.scoringCriteria.push({
        id: Date.now(),
        name: action.payload.name,
        points: action.payload.points
      })
    },
    updateCriterion: (state, action) => {
      const index = state.scoringCriteria.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.scoringCriteria[index] = action.payload
      }
    },
    removeCriterion: (state, action) => {
      state.scoringCriteria = state.scoringCriteria.filter(c => c.id !== action.payload)
    },
    setScoringCriteria: (state, action) => {
      state.scoringCriteria = action.payload
    },
    addFallacy: (state, action) => {
      state.fallacies.push({
        id: 'f' + Date.now(),
        name: action.payload.name
      })
    },
    updateFallacy: (state, action) => {
      const index = state.fallacies.findIndex(f => f.id === action.payload.id)
      if (index !== -1) {
        state.fallacies[index] = action.payload
      }
    },
    removeFallacy: (state, action) => {
      state.fallacies = state.fallacies.filter(f => f.id !== action.payload)
    }
  }
})

export const {
  setParticipants,
  addParticipant,
  removeParticipant,
  updateRound,
  setGlobalTimeInput,
  setInitialTime,
  toggleTimer,
  updateParticipant,
  setGlobalSession,
  setGlobalTitle,
  setLanguage,
  resetStore,
  resetGame,
  updateParticipantsOrder,
  addCriterion,
  updateCriterion,
  removeCriterion,
  setScoringCriteria,
  addFallacy,
  updateFallacy,
  removeFallacy
} = debateSlice.actions

export default debateSlice.reducer