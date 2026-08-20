import React, { useMemo } from "react";
import { INF, NINF } from "../algorithms/demoucron";

function formatVal(v) {
    if (v === INF || v === undefined) return "∞";
    if (v === NINF) return "-∞";
    return String(v);
}

export default function StepDisplay({ steps, currentStep, onStepChange, calcMode = 'min' }) {
    if (!steps || steps.length === 0) {
        return (
            <div className="glass-card p-5 flex flex-col items-center justify-center min-h-[300px] text-center border-dashed border-2 border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="text-5xl mb-4 drop-shadow-sm"></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    Cliquez sur <span className="text-indigo-600 dark:text-indigo-400 font-bold">"Calculer"</span> pour lancer l'algorithme
                </p>
            </div>
        );
    }

    const n = steps[0].length;
    const matrix = steps[currentStep];
    const prevMatrix = currentStep > 0 ? steps[currentStep - 1] : null;
    //const labelOf = (i) => `x${i + 1}`;
    const labelOf = (i) => String.fromCharCode(65 + i);

    // Cellules modifiées par rapport à l'étape précédente
    const isModified = (i, j) => {
        if (!prevMatrix) return false;
        return matrix[i][j] !== prevMatrix[i][j];
    };

    return (
        <div className="glass-card p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                        
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Cellules{" "}
                        <span className="text-amber-600 dark:text-amber-400 font-medium">surlignées</span> = modifiées
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onStepChange(currentStep - 1)}
                        disabled={currentStep === 0}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-700 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed
                       font-bold flex items-center justify-center transition-all text-sm"
                    >
                        ‹
                    </button>

                    {/* Indicateurs de dots */}
                    <div className="flex gap-1.5 px-2">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => onStepChange(i)}
                                className={`rounded-full transition-all duration-300 ${i === currentStep
                                    ? "w-6 h-2 bg-indigo-500 shadow-md shadow-indigo-500/30"
                                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => onStepChange(currentStep + 1)}
                        disabled={currentStep === steps.length - 1}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-700 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed
                       font-bold flex items-center justify-center transition-all text-sm"
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Badge étape */}
            <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    {currentStep === 0 ? (
                        <>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            Matrice D¹ — Matrice initiale
                        </>
                    ) : (
                        <>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            Matrice D{currentStep } — k = {currentStep }
                        </>
                    )}
                </span>
                <span className="text-xs text-slate-500">
                    Étape {currentStep + 1} / {steps.length}
                </span>
            </div>

            {/* Matrice */}
            <div className="overflow-x-auto">
                <table className="border-separate" style={{ borderSpacing: "4px" }}>
                    <thead>
                        <tr>
                            <th className="w-8" />
                            {Array.from({ length: n }, (_, j) => (
                                <th key={j} className="text-center text-xs font-semibold text-violet-400 w-10 pb-1">
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
                                {row.map((val, j) => {
                                    const modified = isModified(i, j);
                                    return (
                                        <td key={j}>
                                            <div
                                                className={`
                          w-12 h-9 flex items-center justify-center rounded-lg mono text-sm font-medium transition-all duration-300 border
                          ${i === j
                                                        ? "bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800/40 dark:border-transparent dark:text-slate-500"
                                                        : modified
                                                            ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm dark:bg-amber-500/20 dark:border-amber-500/50 dark:text-amber-300 dark:shadow-[0_0_12px_rgba(245,158,11,0.2)] scale-105 z-10 relative"
                                                            : val === INF || val === NINF
                                                                ? "bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-800/30 dark:border-slate-700/30 dark:text-slate-600"
                                                                : "bg-white border-slate-200 shadow-sm text-slate-800 dark:bg-slate-800/60 dark:border-slate-700/50 dark:text-slate-200"
                                                    }
                        `}
                                            >
                                                {formatVal(val)}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Description de l'étape */}
            {currentStep > 0 && (
                <div className="mt-5 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-800/30">
                    <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">
                        <span className="font-semibold text-indigo-700 dark:text-indigo-400"> k={currentStep} :</span>{" "}
                        Calcul via le sommet <strong className="text-indigo-600 dark:text-indigo-300">{labelOf(currentStep - 1)}</strong>. 
                        W<sub>ij</sub><sup>(k-1)</sup> = V<sub>i,k</sub><sup>(k-1)</sup> + V<sub>k,j</sub><sup>(k-1)</sup>, puis
                        V<sub>ij</sub><sup>(k)</sup> = {calcMode === 'min' ? "min" : "max"}[W<sub>ij</sub><sup>(k-1)</sup>, V<sub>ij</sub><sup>(k-1)</sup>]
                    </p> 
                    <details className="text-xs group bg-white dark:bg-slate-900/40 rounded-lg transition-all p-3 cursor-pointer border border-indigo-100 dark:border-slate-700/50 shadow-sm hover:shadow-md">
    <summary className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 outline-none select-none flex items-center gap-2">
        <span>Voir les détails des calculs étape par étape</span>
    </summary>

    <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-3">
        {(() => {
            const k = currentStep - 1;
            const prev_k = currentStep - 1;
            const k_disp = currentStep;

            const minMaxLabel = calcMode === "min" ? "MIN" : "MAX";
            const infChar = calcMode === "min" ? "∞" : "-∞";

            const labelOf = (index) =>
                String.fromCharCode(65 + index);

            const mods = [];

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (isModified(i, j)) {
                        mods.push({ i, j });
                    }
                }
            }

            if (mods.length === 0) {
                return (
                    <div className="text-slate-500 italic">
                        Aucune modification lors de cette itération.
                    </div>
                );
            }

            return mods.map(({ i, j }) => {
                const oldV = formatVal(prevMatrix[i][j]);
                const Vik = formatVal(prevMatrix[i][k]);
                const Vkj = formatVal(prevMatrix[k][j]);
                const newV = formatVal(matrix[i][j]);

                const hasInf =
                    Vik === "∞" ||
                    Vkj === "∞" ||
                    Vik === "-∞" ||
                    Vkj === "-∞";

                const wVal = hasInf
                    ? infChar
                    : prevMatrix[i][k] + prevMatrix[k][j];

                const iLabel = labelOf(i);
                const jLabel = labelOf(j);
                const kLabel = labelOf(k);

                return (
                    <div
                        key={`${i}-${j}`}
                        className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300"
                    >
                        {/* Calcul de W */}
                        <div className="mb-1.5 flex items-start gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 select-none">
                                ▶
                            </span>

                            <span>
                                W<sub>{iLabel}{jLabel}</sub>
                                <sup>({prev_k})</sup>
                                {" = "}
                                V<sub>{iLabel}{kLabel}</sub>
                                <sup>({prev_k})</sup>
                                {" + "}
                                V<sub>{kLabel}{jLabel}</sub>
                                <sup>({prev_k})</sup>
                                {" = "}
                                {Vik}
                                {" + "}
                                {Vkj}
                                {" = "}
                                <strong>{String(wVal)}</strong>
                            </span>
                        </div>

                        {/* Calcul de V */}
                        <div className="flex items-start gap-2">
                            <span className="text-blue-500 dark:text-blue-400 select-none">
                                ▶
                            </span>

                            <span>
                                V<sub>{iLabel}{jLabel}</sub>
                                <sup>({k_disp})</sup>
                                {" = "}
                                {minMaxLabel}
                                {"("}
                                W<sub>{iLabel}{jLabel}</sub>
                                <sup>({prev_k})</sup>
                                {", "}
                                V<sub>{iLabel}{jLabel}</sub>
                                <sup>({prev_k})</sup>
                                {") = "}
                                {minMaxLabel}
                                {"("}
                                {String(wVal)}
                                {", "}
                                {oldV === "∞"
                                    ? calcMode === "min"
                                        ? "+∞"
                                        : "∞"
                                    : oldV === "-∞"
                                    ? "-∞"
                                    : oldV}
                                {") = "}
                                <strong className="text-amber-600 dark:text-amber-400">
                                    {newV}
                                </strong>
                            </span>
                        </div>
                    </div>
                );
            });
        })()}
    </div>
</details>
                </div>
            )}
        </div>
    );
}
