import React from "react";
import { INF, createEmptyMatrix } from "../algorithms/demoucron";

const MAX_SIZE = 15;
const MIN_SIZE = 2;

export default function MatrixInput({ matrix, setMatrix }) {
  const n = matrix.length;

  const syncMatrixSize = (newN) => {
    const base = createEmptyMatrix(newN);

    // Conserver les anciennes valeurs
    for (let i = 0; i < Math.min(n, newN); i++) {
      for (let j = 0; j < Math.min(n, newN); j++) {
        base[i][j] = matrix[i][j];
      }
    }

    setMatrix(base);
  };

  const handleSizeChange = (delta) => {
    const newN = Math.min(MAX_SIZE, Math.max(MIN_SIZE, n + delta));

    if (newN !== n) {
      syncMatrixSize(newN);
    }
  };

  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map((row) => [...row]);

    if (value.trim() === "") {
      newMatrix[i][j] = INF;
    } else {
      const parsed = Number(value);
      newMatrix[i][j] = isNaN(parsed) ? INF : parsed;
    }

    setMatrix(newMatrix);
  };

  const labelOf = (i) => String.fromCharCode(65 + i);

  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
            Matrice
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Laissez vide pour ∞ (pas d'arc)
          </p>
        </div>

        {/* Contrôle taille */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sommets :
          </span>

          <button
            onClick={() => handleSizeChange(-1)}
            disabled={n <= MIN_SIZE}
            className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center transition-colors"
          >
            −
          </button>

          <span className="w-6 text-center font-bold text-blue-600 dark:text-blue-400 text-sm">
            {n}
          </span>

          <button
            onClick={() => handleSizeChange(1)}
            disabled={n >= MAX_SIZE}
            className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table
          className="border-separate"
          style={{ borderSpacing: "4px" }}
        >
          <thead>
            <tr>
              <th className="w-8"></th>

              {Array.from({ length: n }, (_, j) => (
                <th
                  key={j}
                  className="text-center text-xs font-semibold text-violet-400 w-12 pb-1"
                >
                  {labelOf(j)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td className="text-xs font-semibold text-violet-400 text-right pr-2">
                  {labelOf(i)}
                </td>

                {row.map((value, j) => (
                  <td key={j}>
                    <input
                      type="text"
                      value={value === INF ? "" : value}
                      onChange={(e) =>
                        handleChange(i, j, e.target.value)
                      }
                      placeholder="∞"
                      className="
                        w-12 h-9 text-center rounded-lg
                        bg-slate-50 border border-slate-300
                        dark:bg-slate-800/80 dark:border-slate-600/50
                        text-slate-800 dark:text-slate-100 text-sm
                        placeholder-slate-400 dark:placeholder-slate-600
                        focus:outline-none
                        focus:border-blue-500
                        focus:ring-1
                        focus:ring-blue-500/30
                        transition-colors
                        mono
                      "
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}