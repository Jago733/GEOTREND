import { normalPValue } from "./mathUtils";

export interface MannKendallResult {
  s: number;
  varS: number;
  z: number;
  pValue: number;
  significant: boolean;
  trend: "creciente" | "decreciente" | "sin_tendencia";
  sensSlope: number;
  sensIntercept: number;
  n: number;
  tau: number; // Kendall's tau rank correlation
}

/**
 * Prueba de Mann-Kendall con pendiente de Sen
 * Método no paramétrico recomendado por NASA y la OMM para detección de tendencias
 * en series temporales hidrológicas y climáticas.
 */
export function calculateMannKendall(values: number[], times?: number[]): MannKendallResult {
  const n = values.length;
  if (n < 4) {
    return {
      s: 0,
      varS: 0,
      z: 0,
      pValue: 1,
      significant: false,
      trend: "sin_tendencia",
      sensSlope: 0,
      sensIntercept: values[0] || 0,
      n,
      tau: 0,
    };
  }

  // 1. Cálculo de S
  let s = 0;
  for (let k = 0; k < n - 1; k++) {
    for (let j = k + 1; j < n; j++) {
      const diff = values[j] - values[k];
      if (diff > 0) s += 1;
      else if (diff < 0) s -= 1;
    }
  }

  // 2. Conteo de empates (ties)
  const frequencyMap = new Map<number, number>();
  for (const v of values) {
    frequencyMap.set(v, (frequencyMap.get(v) || 0) + 1);
  }

  let tieCorrection = 0;
  frequencyMap.forEach((count) => {
    if (count > 1) {
      tieCorrection += count * (count - 1) * (2 * count + 5);
    }
  });

  // 3. Varianza de S
  const rawVar = (n * (n - 1) * (2 * n + 5) - tieCorrection) / 18;
  const varS = Math.max(1e-10, rawVar);

  // 4. Estadístico Z normalizado
  let z = 0;
  if (s > 0) {
    z = (s - 1) / Math.sqrt(varS);
  } else if (s < 0) {
    z = (s + 1) / Math.sqrt(varS);
  } else {
    z = 0;
  }

  // 5. p-value bilateral
  const pValue = normalPValue(z);
  const significant = pValue < 0.05;

  let trend: "creciente" | "decreciente" | "sin_tendencia" = "sin_tendencia";
  if (significant) {
    trend = s > 0 ? "creciente" : "decreciente";
  }

  // Tau de Kendall
  const totalPairs = (n * (n - 1)) / 2;
  const tau = s / totalPairs;

  // 6. Pendiente de Sen (Sen's Slope Estimator)
  // Mediana de pendientes entre todos los pares (j > i)
  const slopes: number[] = [];
  const t = times && times.length === n ? times : values.map((_, i) => i);

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const dt = t[j] - t[i];
      if (dt !== 0) {
        slopes.push((values[j] - values[i]) / dt);
      }
    }
  }

  slopes.sort((a, b) => a - b);
  let sensSlope = 0;
  const m = slopes.length;
  if (m > 0) {
    if (m % 2 === 1) {
      sensSlope = slopes[Math.floor(m / 2)];
    } else {
      sensSlope = (slopes[m / 2 - 1] + slopes[m / 2]) / 2;
    }
  }

  // Intercepto de Sen: mediana de (y_i - sensSlope * t_i)
  const intercepts = values.map((v, i) => v - sensSlope * t[i]);
  intercepts.sort((a, b) => a - b);
  let sensIntercept = 0;
  if (intercepts.length > 0) {
    const len = intercepts.length;
    if (len % 2 === 1) {
      sensIntercept = intercepts[Math.floor(len / 2)];
    } else {
      sensIntercept = (intercepts[len / 2 - 1] + intercepts[len / 2]) / 2;
    }
  }

  return {
    s,
    varS,
    z,
    pValue,
    significant,
    trend,
    sensSlope,
    sensIntercept,
    n,
    tau,
  };
}
