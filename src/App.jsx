import React, { useState, useCallback, useEffect } from "react";
import MatrixInput from "./components/MatrixInput";
import GraphView from "./components/GraphView";
import ControlPanel from "./components/ControlPanel";
import StepDisplay from "./components/StepDisplay";
import PathDisplay from "./components/PathDisplay";
import { demoucron, EXAMPLE_MATRIX, createEmptyMatrix } from "./algorithms/demoucron";

const DEFAULT_N = 6;
const INF = Infinity;

function defaultMatrix() {
  return [
    [INF, INF],
    [INF, INF],
  ];
}

export default function App() {
  const [matrix, setMatrix] = useState(defaultMatrix());
  const [nb, setNb] = useState(matrix.length);
  const [steps, setSteps] = useState([]);
  const [predecessors, setPredecessors] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightPath, setHighlightPath] = useState([]);
  const [calcMode, setCalcMode] = useState('min');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Lance l'algorithme
  const handleCalculate = useCallback(() => {
    const { steps: s, predecessors: p } = demoucron(matrix, calcMode);
    setNb(matrix.length);
    setSteps(s);
    setPredecessors(p);
    setCurrentStep(0);
    setHighlightPath([]);
  }, [matrix, calcMode]);

  // Remet la matrice initiale et efface les résultats
  const handleReset = useCallback(() => {
    setMatrix(defaultMatrix());
    setSteps([]);
    setPredecessors(null);
    setCurrentStep(0);
    setHighlightPath([]);
  }, []);

  // Charge l'exemple prédéfini
  const handleLoadExample = useCallback(() => {
    setMatrix(EXAMPLE_MATRIX.map((r) => [...r]));
    setSteps([]);
    setPredecessors(null);
    setCurrentStep(0);
    setHighlightPath([]);
    console.log(EXAMPLE_MATRIX)
  }, []);

  // Quand PathDisplay demande de surligner un chemin
  const handleHighlightPath = useCallback((path) => {
    setHighlightPath(path);
  }, []);

  // La matrice finale est la dernière étape
  const finalMatrix = steps.length > 0 ? steps[steps.length - 1] : matrix;

  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto space-y-4">

        {/* ── Header ── */}
        <header className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              {/*<div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>*/}
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Algorithme de Demoucron
              </h1>
            </div>
            <p className="text-slate-500 text-sm ml-0">
              Recherche Opérationnelle — Plus courts/longs chemins
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-105"
              title="Changer le thème"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {/* Badge formule */}
            {/*<div className="hidden md:block glass-card px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50/50 dark:bg-transparent dark:text-indigo-300 mono border-indigo-100 dark:border-indigo-500/20">
              V<sub>ij</sub><sup>(k)</sup> = {calcMode === 'min' ? 'min' : 'max'}(V<sub>ij</sub><sup>(k-1)</sup>, V<sub>ik</sub><sup>(k-1)</sup> + V<sub>kj</sub><sup>(k-1)</sup>)
            </div>*/}
          </div>
        </header>

        {/* ── Zone principale ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Colonne gauche : Saisie + ControlPanel */}
          <div className="">
            <MatrixInput matrix={matrix} setMatrix={(m) => {
              setMatrix(m);
              // Si on modifie la matrice, on efface les résultats précédents
              setSteps([]);
              setPredecessors(null);
              setHighlightPath([]);
            }} />
            <ControlPanel
              onCalculate={handleCalculate}
              onReset={handleReset}
              onLoadExample={handleLoadExample}
              hasResult={steps.length > 0}
              calcMode={calcMode}
              setCalcMode={setCalcMode}
            />
          </div>

          {/* Colonne droite : Graphe */}
          <GraphView matrix={matrix} highlightPath={highlightPath} />
        </div>

        {/* ── Zone résultats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Matrices step-by-step */}
          <StepDisplay
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            calcMode={calcMode}
          />

          {/* Chemin optimal */}
          <PathDisplay
            finalMatrix={finalMatrix}
            predecessors={predecessors}
            n={nb}
            onHighlightPath={handleHighlightPath}
          />
        </div>

        {/* ── Footer ── */}
        <footer className="text-center text-slate-700 text-xs pb-4">
          Algorithme de Demoucron · Recherche Opérationnelle
        </footer>
      </div>
    </div>
  );
}