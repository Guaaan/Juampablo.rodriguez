import React, { useEffect, useState } from 'react'

const ROWS = 20
const COLS = 36
const TICK_MS = 150

type Grid = boolean[][]

function makeEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(false))
}

function makeRandomGrid(): Grid {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => Math.random() > 0.75)
  )
}

const NEIGHBOR_OFFSETS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
]

function nextGeneration(grid: Grid): Grid {
  return grid.map((row, y) =>
    row.map((alive, x) => {
      let neighbors = 0
      for (const [dy, dx] of NEIGHBOR_OFFSETS) {
        const ny = y + dy
        const nx = x + dx
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && grid[ny][nx]) {
          neighbors++
        }
      }
      return alive ? neighbors === 2 || neighbors === 3 : neighbors === 3
    })
  )
}

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(makeEmptyGrid)
  const [running, setRunning] = useState(false)
  const [generation, setGeneration] = useState(0)

  // Poblar con un patrón aleatorio solo en el cliente para no romper la hidratación
  useEffect(() => {
    setGrid(makeRandomGrid())
  }, [])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setGrid((g) => nextGeneration(g))
      setGeneration((g) => g + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [running])

  const toggleCell = (y: number, x: number) => {
    setGrid((g) => g.map((row, ry) => (ry !== y ? row : row.map((cell, rx) => (rx === x ? !cell : cell)))))
  }

  const step = () => {
    setGrid((g) => nextGeneration(g))
    setGeneration((g) => g + 1)
  }

  const randomize = () => {
    setGrid(makeRandomGrid())
    setGeneration(0)
    setRunning(false)
  }

  const clear = () => {
    setGrid(makeEmptyGrid())
    setGeneration(0)
    setRunning(false)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-6 py-2 rounded bg-slate-900 text-white font-medium hover:bg-slate-700 transition-colors"
        >
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={step}
          disabled={running}
          className="px-6 py-2 rounded border border-slate-300 font-medium disabled:opacity-40 hover:bg-slate-50 transition-colors"
        >
          Paso
        </button>
        <button
          onClick={randomize}
          className="px-6 py-2 rounded border border-slate-300 font-medium hover:bg-slate-50 transition-colors"
        >
          Aleatorio
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 rounded border border-slate-300 font-medium hover:bg-slate-50 transition-colors"
        >
          Limpiar
        </button>
      </div>

      <p className="text-sm text-slate-500">Generación: {generation}</p>

      <div
        className="grid w-full max-w-3xl border border-slate-200 shadow-sm"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {grid.map((row, y) =>
          row.map((alive, x) => (
            <button
              key={`${y}-${x}`}
              onClick={() => toggleCell(y, x)}
              aria-label={`celda ${y}-${x}`}
              className={`aspect-square border border-slate-100 transition-colors ${
                alive ? 'bg-slate-900' : 'bg-white hover:bg-slate-100'
              }`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default GameOfLife
