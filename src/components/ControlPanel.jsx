import React from "react";
import { EXAMPLE_MATRIX } from "../algorithms/demoucron";

export default function ControlPanel({ onCalculate, onReset, onLoadExample, calcMode, setCalcMode }) {
  return (
    <div className="glass-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onCalculate}
          className="
            flex items-center gap-2 px-2 py-1.5 rounded-xl
            bg-indigo-600 hover:bg-indigo-700
            dark:bg-indigo-600 dark:hover:bg-indigo-500
            text-white font-semibold text-sm shadow-md hover:shadow-lg
            transition-all duration-200
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.89A1 1 0 007 8.118v7.764a1 1 0 001.234.97l6.518-1.588a1 1 0 00.748-.97v-2.176a1 1 0 00-.748-.97z" />
            <circle cx="12" cy="12" r="9" strokeLinecap="round" />
          </svg>
          Calculer
        </button>

        {/* Exemple */}
        <button
          onClick={onLoadExample}
          className="
            flex items-center gap-2 px-2 py-1.5 rounded-xl
            bg-white hover:bg-slate-50 border border-slate-200 shadow-sm
            dark:bg-slate-800/80 dark:hover:bg-slate-700/80
            dark:border-slate-700 dark:hover:border-slate-600
            text-slate-700 dark:text-slate-200 font-medium text-sm
            transition-all duration-200
          "
        >
          <svg className="w-4 h-4 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exemple
        </button>

        {/* Réinitialiser */}
        <button
          onClick={onReset}
          className="
            flex items-center gap-2 px-2 py-1.5 rounded-xl
            bg-white hover:bg-red-50 border border-slate-200 shadow-sm
            dark:bg-slate-800/80 dark:hover:bg-red-900/30
            dark:border-slate-700 dark:hover:border-red-800/50
            text-red-600 dark:text-red-400 font-medium text-sm
            transition-all duration-200
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Réinitialiser
        </button>

        {/* Sélecteur Min/Max */}
        <div className="flex bg-slate-100 dark:bg-slate-900/60 rounded-xl p-1 h-[40px] items-center shadow-inner">
          <button
            onClick={() => setCalcMode('min')}
            className={`flex-1 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              calcMode === 'min' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Min
          </button>
          <button
            onClick={() => setCalcMode('max')}
            className={`ml-auto flex-1 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              calcMode === 'max' 
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Max
          </button>
        </div>

        {/* Badge résultat 
        {hasResult && (
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Résultat calculé</span>
          </div>
        )}*/}
      </div>

      {/* Info algo 
      <div className="mt-4 px-4 py-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 shadow-sm">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="text-slate-900 dark:text-slate-200 font-semibold font-medium">Algorithme de Demoucron</span> — Plus courts/longs chemins entre toutes les paires de sommets.
        </p>
      </div>*/}
    </div>
  );
}