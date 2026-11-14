import { studentTPValue, getCriticalT95 } from "./mathUtils";

export interface RegressionResult {
  slope: number;
  intercept: number;
  r: number;
  r2: number;
  tStat: number;
  df: number;
  pValue: number;
  seSlope: number;
  seResidual: number;
  significant: boolean;
  fitted: number[];
  ciLower: number[];
  ciUpper: number[];
  residuals: number[];
}

/**
 * Regresión Lineal por Mínimos Cuadrados Ordinarios (OLS)
 * Calcula la tasa de cambio paramétrica, prueba t de significancia estadística
 * y bandas de intervalo de confianza al 95%.
 */
export function calculateLinearRegression(
  values: number[],
  times?: number[]
): RegressionResult {
  const n = values.length;
  const t = times && times.length === n ? times : values.map((_, i) => i);

  if (n < 3) {
    return {
      slope: 0,
      intercept: values[0] || 0,
      r: 0,
      r2: 0,
      tStat: 0,
      df: Math.max(1, n - 2),
      pValue: 1,
      seSlope: 0,
      seResidual: 0,
      significant: false,
      fitted: [...values],
      ciLower: [...values],
      ciUpper: [...values],
      residuals: values.map(() => 0),
    };
  }

  // Medias
  const meanT = t.reduce((sum, v) => sum + v, 0) / n;
  const meanY = values.reduce((sum, v) => sum + v, 0) / n;

  // Sumas de cuadrados
  let ssTT = 0;
  let ssYY = 0;
  let ssTY = 0;

  for (let i = 0; i < n; i++) {
    const dt = t[i] - meanT;
    const dy = values[i] - meanY;
    ssTT += dt * dt;
    ssYY += dy * dy;
    ssTY += dt * dy;
  }

  const slope = ssTT === 0 ? 0 : ssTY / ssTT;
  const intercept = meanY - slope * meanT;

  const fitted: number[] = [];
  const residuals: number[] = [];
  let ssResiduals = 0;

  for (let i = 0; i < n; i++) {
    const yHat = intercept + slope * t[i];
    const residual = values[i] - yHat;
    fitted.push(yHat);
    residuals.push(residual);
    ssResiduals += residual * residual;
  }

  const df = Math.max(1, n - 2);
  const seResidual = Math.sqrt(ssResiduals / df);
  const seSlope = ssTT === 0 ? 0 : seResidual / Math.sqrt(ssTT);

  const tStat = seSlope === 0 ? 0 : slope / seSlope;
  const pValue = studentTPValue(tStat, df);
  const significant = pValue < 0.05;

  const r2 = ssYY === 0 ? 0 : Math.max(0, Math.min(1, 1 - ssResiduals / ssYY));
  const r = (slope >= 0 ? 1 : -1) * Math.sqrt(r2);

  // Intervalos de confianza al 95% para cada punto t[i]
  const tCrit = getCriticalT95(df);
  const ciLower: number[] = [];
  const ciUpper: number[] = [];

  for (let i = 0; i < n; i++) {
    const dt = t[i] - meanT;
    const leverage = 1 / n + (dt * dt) / (ssTT || 1);
    const margin = tCrit * seResidual * Math.sqrt(leverage);
    ciLower.push(fitted[i] - margin);
    ciUpper.push(fitted[i] + margin);
  }

  return {
    slope,
    intercept,
    r,
    r2,
    tStat,
    df,
    pValue,
    seSlope,
    seResidual,
    significant,
    fitted,
    ciLower,
    ciUpper,
    residuals,
  };
}
