import React, { useState, useEffect } from "react";
import { INF, getPath } from "../algorithms/demoucron";

export default function PathDisplay({ finalMatrix, predecessors, n, onHighlightPath }) {
    console.log(n);
    const src = 0;
    const dst = n - 1;

    useEffect(() => {
        if (!predecessors || n <= 1) return;

        const path = getPath(predecessors, src, dst);
        onHighlightPath(path);
    }, [predecessors, n, onHighlightPath]);

    const labelOf = (i) => String.fromCharCode(65 + i);

    const cost = finalMatrix?.[0]?.[n - 1];
    const path = predecessors && n > 1 ? getPath(predecessors, 0, n - 1) : [];
    const hasCost = cost !== undefined && cost !== INF;

    return (
        <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30"></div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Chemin optimal</h2>
            </div>

            {!predecessors ? (
                <div className="flex flex-col items-center justify-center min-h-[220px] text-center bg-slate-50 border border-slate-100 border-dashed rounded-xl dark:bg-slate-800/20 dark:border-slate-800">
                    <div className="text-4xl mb-3 opacity-80"></div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Lancez l'algorithme pour trouver les chemins</p>
                </div>
            ) : (
                <>
                    {/* Sélecteurs */}
                    <div className="flex items-center gap-3 mb-4">
                        {/*<div className="flex-1">
                            <label className="text-xs font-medium text-slate-700 dark:text-slate-400 mb-1.5 block">Source</label>
                            <select
                                value={src}
                                onChange={(e) => setSrc(Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 shadow-sm dark:bg-slate-800/80 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {Array.from({ length: n }, (_, i) => (
                                    <option key={i} value={i}>{labelOf(i)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-6 text-slate-400 dark:text-slate-500 text-lg font-bold">→</div>

                        <div className="flex-1">
                            <label className="text-xs font-medium text-slate-700 dark:text-slate-400 mb-1.5 block">Destination</label>
                            <select
                                value={dst}
                                onChange={(e) => setDst(Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 shadow-sm dark:bg-slate-800/80 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {Array.from({ length: n }, (_, i) => (
                                    <option key={i} value={i}>{labelOf(i)}</option>
                                ))}
                            </select>
                        </div>*/}
                    </div>

                    {/* Résultat */}
                    {src === dst ? (
                        <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/30 text-center">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Source = Destination (coût = 0)</p>
                        </div>
                    ) : hasCost ? (
                        <div className="space-y-3">
                            {/* Chemin */}
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                                <p className="text-xs text-slate-600 dark:text-slate-500 mb-2">Chemin :</p>
                                <div className="flex items-center flex-wrap gap-1">
                                    {path.map((node, idx) => (
                                        <React.Fragment key={idx}>
                                            <span className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 dark:bg-amber-500/20 dark:border-amber-500/30 dark:text-amber-300 text-sm font-bold mono">
                                                {labelOf(node)}
                                            </span>
                                            {idx < path.length - 1 && (
                                                <span className="text-slate-400 dark:text-slate-500 text-xs">→</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Coût */}
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20 flex items-center justify-between">
                                <span className="text-xs text-slate-600 dark:text-slate-400">Coût total :</span>
                                <span className="mono text-lg font-bold text-blue-600 dark:text-blue-400">{cost}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 text-center">
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">Aucun chemin entre {labelOf(src)} et {labelOf(dst)}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
