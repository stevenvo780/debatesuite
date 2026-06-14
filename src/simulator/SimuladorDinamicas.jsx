/**
 * SimuladorDinamicas — Pestaña opt-in
 * Visualiza el autómata celular de hipergrados (repo "debates") en un canvas HTML5.
 * Sin GPU, sin DB, 100 % offline.
 *
 * Paleta visual inspirada en la edad de la célula:
 *   joven  (edad < 2)  : azul brillante (#60a5fa)
 *   adulta (edad 2-4)  : teal/verde (#34d399)
 *   anciana (edad 5+)  : dorado (#fbbf24)
 *   muerta             : fondo oscuro (#1e293b)
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Button, Badge } from 'react-bootstrap'
import { BsPlayFill, BsPauseFill, BsArrowCounterclockwise, BsSpeedometer } from 'react-icons/bs'
import {
  FILAS,
  COLUMNAS,
  crearGrid,
  siguienteGeneracion,
  calcularStats,
} from './hipergradosEngine.js'

const CELL_SIZE = 10 // px por celda
const CANVAS_W = COLUMNAS * CELL_SIZE
const CANVAS_H = FILAS * CELL_SIZE

const COLOR_JOVEN   = '#60a5fa'  // azul — célula joven (edad < 2)
const COLOR_ADULTA  = '#34d399'  // verde — célula adulta (edad 2-4)
const COLOR_ANCIANA = '#fbbf24'  // dorado — célula anciana (edad 5+)
const COLOR_MUERTA  = '#0f172a'  // fondo oscuro

function colorDeCelda(viva, edad) {
  if (!viva) return COLOR_MUERTA
  if (edad < 2) return COLOR_JOVEN
  if (edad < 5) return COLOR_ADULTA
  return COLOR_ANCIANA
}

export default function SimuladorDinamicas({ language = 'es' }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)   // { grid, edades } — evita re-renders en cada frame
  const rafRef   = useRef(null)
  const lastTickRef = useRef(0)

  const [running, setRunning] = useState(false)
  const [generation, setGeneration] = useState(0)
  const [speed, setSpeed] = useState(200)   // ms entre generaciones
  const [stats, setStats] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const t = language === 'en' ? TEXTS.en : TEXTS.es

  // ─── Render del canvas ───────────────────────────────────────────────────────
  const dibujarCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !stateRef.current) return
    const ctx = canvas.getContext('2d')
    const { grid, edades } = stateRef.current

    for (let i = 0; i < FILAS; i++) {
      for (let j = 0; j < COLUMNAS; j++) {
        const idx = i * COLUMNAS + j
        ctx.fillStyle = colorDeCelda(grid[idx], edades[idx])
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }
  }, [])

  // ─── Loop de animación ────────────────────────────────────────────────────────
  const tick = useCallback((timestamp) => {
    if (timestamp - lastTickRef.current >= speed) {
      const next = siguienteGeneracion(stateRef.current.grid, stateRef.current.edades)
      stateRef.current = next
      dibujarCanvas()
      setGeneration(g => g + 1)
      setStats(calcularStats(next.grid, next.edades))
      lastTickRef.current = timestamp
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [speed, dibujarCanvas])

  // ─── Start / Stop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (running) {
      lastTickRef.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    } else {
      cancelAnimationFrame(rafRef.current)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, tick])

  // ─── Inicializar ─────────────────────────────────────────────────────────────
  const inicializar = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setRunning(false)
    setGeneration(0)
    stateRef.current = crearGrid()
    dibujarCanvas()
    setStats(calcularStats(stateRef.current.grid, stateRef.current.edades))
    setInitialized(true)
  }, [dibujarCanvas])

  // Init on first mount
  useEffect(() => {
    inicializar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleRunning = () => setRunning(r => !r)

  const density = stats ? Math.round((stats.vivas / stats.total) * 100) : 0

  return (
    <div className="sim-wrapper">
      <div className="sim-header">
        <h5 className="sim-title">{t.title}</h5>
        <p className="sim-subtitle">{t.subtitle}</p>
      </div>

      {/* Canvas */}
      <div className="sim-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="sim-canvas"
          aria-label={t.canvasLabel}
        />
      </div>

      {/* Controls */}
      <div className="sim-controls">
        <Button
          variant={running ? 'warning' : 'success'}
          onClick={toggleRunning}
          disabled={!initialized}
          className="sim-btn"
        >
          {running ? <BsPauseFill /> : <BsPlayFill />}
          <span>{running ? t.pause : t.play}</span>
        </Button>

        <Button variant="outline-secondary" onClick={inicializar} className="sim-btn">
          <BsArrowCounterclockwise />
          <span>{t.reset}</span>
        </Button>

        <div className="sim-speed-control">
          <BsSpeedometer />
          <label htmlFor="sim-speed">{t.speed}</label>
          <input
            id="sim-speed"
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="sim-range"
          />
          <span className="sim-speed-val">{speed}ms</span>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="sim-stats">
          <Badge bg="secondary" className="sim-badge">{t.gen}: {generation}</Badge>
          <Badge bg="primary"   className="sim-badge">{t.alive}: {stats.vivas}</Badge>
          <Badge bg="info"      className="sim-badge" style={{ color: '#000' }}>{t.density}: {density}%</Badge>
          <span className="sim-legend-item" style={{ color: COLOR_JOVEN   }}>&#9632; {t.young}</span>
          <span className="sim-legend-item" style={{ color: COLOR_ADULTA  }}>&#9632; {t.adult}</span>
          <span className="sim-legend-item" style={{ color: COLOR_ANCIANA }}>&#9632; {t.elder}</span>
        </div>
      )}

      <p className="sim-note">{t.note}</p>
    </div>
  )
}

const TEXTS = {
  es: {
    title: 'Simulador de Dinámicas de Hipergrados',
    subtitle: 'Autómata celular con memoria de edad. Cada celda tiene propiedades, sub-memorias y relaciones (repo "debates").',
    canvasLabel: 'Grid del autómata celular de hipergrados',
    play: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    speed: 'Velocidad',
    gen: 'Generación',
    alive: 'Vivas',
    density: 'Densidad',
    young: 'Joven (edad 0-1)',
    adult: 'Adulta (edad 2-4)',
    elder: 'Anciana (edad 5+)',
    note: 'Funciona completamente offline. Grilla toroidal 80×50. Reglas de Conway + límite de edad.',
  },
  en: {
    title: 'Hyperdegrees Dynamics Simulator',
    subtitle: 'Cellular automaton with age memory. Each cell has properties, sub-memories, and relations ("debates" repo).',
    canvasLabel: 'Hyperdegrees cellular automaton grid',
    play: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    speed: 'Speed',
    gen: 'Generation',
    alive: 'Alive',
    density: 'Density',
    young: 'Young (age 0-1)',
    adult: 'Adult (age 2-4)',
    elder: 'Elder (age 5+)',
    note: 'Fully offline. Toroidal grid 80×50. Conway rules + age limit.',
  },
}
