/**
 * Motor de autómata celular de hipergrados
 * Portado de debates/hipergrados.ts a ES module puro (sin I/O de consola).
 *
 * Reglas: Conway's Game of Life extendido con memoria de edad.
 * - Célula viva: sobrevive con 2 o 3 vecinos vivos Y edad <= LIMITE_EDAD.
 * - Célula muerta: nace si tiene exactamente 3 vecinos vivos.
 * - La edad determina la categoría visual (joven / adulta / anciana).
 */

const FILAS = 50
const COLUMNAS = 80
const PROBABILIDAD_VIDA_INICIAL = 0.8
const LIMITE_EDAD = 50

/** @returns {Uint8Array} flat array [FILAS*COLUMNAS]: 0 = muerto, 1 = vivo */
function crearGrid(probabilidad = PROBABILIDAD_VIDA_INICIAL) {
  const grid = new Uint8Array(FILAS * COLUMNAS)
  const edades = new Uint16Array(FILAS * COLUMNAS)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Math.random() > probabilidad ? 1 : 0
    edades[i] = grid[i] === 1 ? 1 : 0
  }
  return { grid, edades }
}

function contarVecinosVivos(grid, i, j) {
  const vecinos = [
    [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
    [i,     j - 1],              [i,     j + 1],
    [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
  ]
  let total = 0
  for (const [ni, nj] of vecinos) {
    const ri = ((ni % FILAS) + FILAS) % FILAS
    const rj = ((nj % COLUMNAS) + COLUMNAS) % COLUMNAS
    total += grid[ri * COLUMNAS + rj]
  }
  return total
}

/** Avanza una generación. Devuelve nuevos { grid, edades }. */
function siguienteGeneracion(grid, edades) {
  const nuevoGrid = new Uint8Array(FILAS * COLUMNAS)
  const nuevasEdades = new Uint16Array(FILAS * COLUMNAS)

  for (let i = 0; i < FILAS; i++) {
    for (let j = 0; j < COLUMNAS; j++) {
      const idx = i * COLUMNAS + j
      const vivos = contarVecinosVivos(grid, i, j)
      const vivaActual = grid[idx] === 1

      if (vivaActual) {
        const nuevaEdad = edades[idx] + 1
        if (vivos >= 2 && vivos <= 3 && nuevaEdad <= LIMITE_EDAD) {
          nuevoGrid[idx] = 1
          nuevasEdades[idx] = nuevaEdad
        }
        // else: muere -> 0
      } else {
        if (vivos === 3) {
          nuevoGrid[idx] = 1
          nuevasEdades[idx] = 1
        }
      }
    }
  }

  return { grid: nuevoGrid, edades: nuevasEdades }
}

/** Estadísticas básicas para mostrar en la UI */
function calcularStats(grid, edades) {
  let vivas = 0
  let jovenes = 0
  let adultas = 0
  let ancianas = 0
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === 1) {
      vivas++
      const e = edades[i]
      if (e < 2) jovenes++
      else if (e < 5) adultas++
      else ancianas++
    }
  }
  return { vivas, jovenes, adultas, ancianas, total: FILAS * COLUMNAS }
}

export { FILAS, COLUMNAS, crearGrid, siguienteGeneracion, calcularStats }
