import { calculateMannKendall, MannKendallResult } from "./mannKendall";
import { calculateLinearRegression, RegressionResult } from "./linearRegression";
import { decomposeSeasonal, SeasonalDecompositionResult } from "./seasonal";

export interface BasicStats {
  count: number;
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  totalChange: number;
  annualRate: number;
}

export interface ComprehensiveAnalysis {
  basic: BasicStats;
  mannKendall: MannKendallResult;
  regression: RegressionResult;
  seasonal: SeasonalDecompositionResult;
  narrative: {
    summary: string;
    whatIsChanging: string;
    rateOfChange: string;
    significanceExplanation: string;
    detectiveVerdict: "significativo_creciente" | "significativo_decreciente" | "no_significativo";
  };
}

export function analyzeTimeSeries(
  dates: string[],
  values: number[],
  variableName = "Variable",
  unit = "unidades",
  regionName = "Región de Estudio"
): ComprehensiveAnalysis {
  const n = values.length;
  if (n === 0) {
    throw new Error("La serie de datos no puede estar vacía.");
  }

  // 1. Estadísticas descriptivas
  let min = values[0];
  let max = values[0];
  let sum = 0;

  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
    sum += v;
  }

  const mean = sum / n;
  let varianceSum = 0;
  for (const v of values) {
    const diff = v - mean;
    varianceSum += diff * diff;
  }
  const stdDev = Math.sqrt(varianceSum / (n > 1 ? n - 1 : 1));

  // Tasa anual aproximada asumiendo datos mensuales o anuales
  // Si tenemos n puntos repartidos entre dates[0] y dates[n-1]
  const firstYear = new Date(dates[0]).getFullYear() || 2000;
  const lastYear = new Date(dates[n - 1]).getFullYear() || firstYear + Math.round(n / 12);
  const yearsSpan = Math.max(1, lastYear - firstYear);

  const totalChange = values[n - 1] - values[0];
  const annualRate = totalChange / yearsSpan;

  // Índices numéricos para regresión
  const times = values.map((_, i) => i);

  // 2. Mann-Kendall + Sen's Slope
  const mk = calculateMannKendall(values, times);

  // 3. Regresión Lineal + Prueba t + Bandas de Confianza 95%
  const reg = calculateLinearRegression(values, times);

  // 4. Descomposición estacional (período = 12 meses si hay más de 24 puntos)
  const seasonalPeriod = n >= 24 ? 12 : 4;
  const seasonal = decomposeSeasonal(values, seasonalPeriod);

  // 5. Veredicto del Detective Climático en Español
  let verdict: "significativo_creciente" | "significativo_decreciente" | "no_significativo" = "no_significativo";
  if (mk.significant || reg.significant) {
    verdict = mk.s > 0 || reg.slope > 0 ? "significativo_creciente" : "significativo_decreciente";
  }

  const slopePerYear = reg.slope * (n > yearsSpan ? n / yearsSpan : 1);
  const formattedAnnualRate = Math.abs(slopePerYear) < 0.001
    ? slopePerYear.toExponential(3)
    : slopePerYear.toFixed(3);

  const pValFormatted = mk.pValue < 0.0001 ? "< 0.0001" : mk.pValue.toFixed(4);

  const isSignif = mk.significant || reg.significant;

  const narrative = {
    summary: isSignif
      ? `Se detectó una tendencia estadísticamente significativa (${mk.trend === "creciente" ? "ascendente ↗" : "descendente ↘"}) en ${variableName} para ${regionName}.`
      : `No se detectó una tendencia estadísticamente significativa en ${variableName} durante el período analizado.`,
    whatIsChanging: `${variableName} muestra una variación neta de ${totalChange > 0 ? "+" : ""}${totalChange.toFixed(2)} ${unit} entre ${firstYear} y ${lastYear}.`,
    rateOfChange: `La tasa de cambio estimada (pendiente de Sen / OLS) es de aproximadamente ${formattedAnnualRate} ${unit}/año (R² = ${(reg.r2 * 100).toFixed(1)}%).`,
    significanceExplanation: `Prueba de Mann-Kendall: Z = ${mk.z.toFixed(2)}, valor p = ${pValFormatted}. Como el valor p ${isSignif ? "es menor que el umbral crítico α = 0.05" : "supera el umbral crítico α = 0.05"}, la tendencia ${isSignif ? "NO se debe al azar o ruido aleatorio" : "podría atribuirse a fluctuaciones normales o se requiere una serie temporal más extensa"}.`,
    detectiveVerdict: verdict,
  };

  return {
    basic: {
      count: n,
      min,
      max,
      mean,
      stdDev,
      totalChange,
      annualRate,
    },
    mannKendall: mk,
    regression: reg,
    seasonal,
    narrative,
  };
}

export * from "./mannKendall";
export * from "./linearRegression";
export * from "./seasonal";
export * from "./mathUtils";
