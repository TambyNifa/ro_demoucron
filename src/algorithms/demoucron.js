export const INF = Infinity;
export const NINF = -Infinity;

/**
 * Algorithme de Demoucron 
 * Calcule les plus courts/longs chemins entre toutes les paires de sommets.
 *
 * Retourne :
 *  - steps : tableau des matrices D¹, D², ..., Dⁿ⁻¹
 *  - predecessors : matrice prédécesseur P finale (pour reconstruction du chemin)
 */
export function demoucron(initialMatrix, mode = 'min') {
  const n = initialMatrix.length;

  // D⁰ = matrice initiale (copie profonde), avec INF remplacé par NINF si mode == 'max'
  let D = initialMatrix.map((row) =>
    row.map((val) => (mode === 'max' && val === INF ? NINF : val))
  );

  // Matrice prédécesseur P[i][j] = k (le sommet précédant j sur le chemin i→j)
  // Initialement P[i][j] = i si arc direct (i,j) existe
  let P = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      initialMatrix[i][j] !== INF && i !== j ? i : -1
    )
  );

  // Stocker toutes les étapes : step[0] = D⁰ (matrice initiale)
  const steps = [D.map((row) => [...row])];
  const predSteps = [P.map((row) => [...row])];

  // Itération k = 1 à n-1 (Demoucron s'arrête à k = n-1)
  for (let k = 0; k < n - 1; k++) {
    const newD = D.map((row) => [...row]);
    const newP = P.map((row) => [...row]);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const noPathItoK = mode === 'min' ? D[i][k] === INF : D[i][k] === NINF;
        const noPathKtoJ = mode === 'min' ? D[k][j] === INF : D[k][j] === NINF;

        if (!noPathItoK && !noPathKtoJ) {
          const w = D[i][k] + D[k][j];
          const shouldUpdate = mode === 'min' ? w < newD[i][j] : w > newD[i][j];
          
          if (shouldUpdate) {
            newD[i][j] = w;
            newP[i][j] = newP[k][j]; // prédécesseur de j sur le chemin via k
          }
        }
      }
    }

    D = newD;
    P = newP;
    steps.push(D.map((row) => [...row]));
    predSteps.push(P.map((row) => [...row]));
  }

  return { steps, predecessors: P, predSteps };
}

/**
 * Reconstruit le chemin optimal de src à dst.
 * @param {number[][]} P - matrice prédécesseur finale
 * @param {number} src - indice source (0-based)
 * @param {number} dst - indice destination (0-based)
 * @returns {number[]} tableau des indices du chemin (0-based), ou [] si inexistant
 */
export function getPath(P, src, dst) {
  console.log(dst);
  if (P[src][dst] === -1 && src !== dst) return [];
  const path = [];
  let current = dst;
  const visited = new Set();

  while (current !== src) {
    if (visited.has(current)) return []; // cycle détecté
    visited.add(current);
    path.unshift(current);
    current = P[src][current];
    if (current === -1) return []; // pas de chemin
  }
  path.unshift(src);
  return path;
}

/**
 * Crée une matrice n×n initiale vide (0 sur la diagonale, INF ailleurs)
 */
export function createEmptyMatrix(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? INF : INF))
  );
}

/**
 * Exemple de graphe prédéfini pour démonstration (4 sommets)
 */
/*export const EXAMPLE_MATRIX = [
  [INF, 3, 8, 6, INF, INF],
  [INF, INF, INF, 2, 6, INF],
  [INF, INF, INF, INF, 1, INF],
  [INF, INF, 2, INF, INF, 7],
  [INF, INF, INF, INF, INF, 2],
  [INF, INF, INF, INF, INF, INF],
];*/

export const EXAMPLE_MATRIX = [
  [INF, 3, 3, 9, INF, INF, INF, INF, INF, INF, INF, INF],
  [INF, INF, INF, 7, 9, 1, INF, INF, INF, INF, INF, INF],
  [INF, INF, INF, 2, INF, INF, 2, INF, INF, INF, INF, INF],
  [INF, INF, INF, INF, 2, 3, 1, 3, INF, INF, INF, INF],
  [INF, INF, INF, INF, INF, INF, INF, 5, INF, INF, INF, INF],
  [INF, INF, INF, INF, INF, INF, INF, 4, 2, 5, INF, INF],
  [INF, INF, INF, INF, INF, 5, INF, INF, INF, 3, 8, INF],
  [INF, INF, INF, INF, INF, INF, INF, INF, 6, INF, INF, INF],
  [INF, INF, INF, INF, INF, INF, INF, INF, INF, 2, INF, 8],
  [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, 4],
  [INF, INF, INF, INF, INF, INF, INF, INF, INF, 4, INF, 5],
  [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
];