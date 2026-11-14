export interface SeasonalDecompositionResult {
  trend: (number | null)[];
  seasonal: number[];
  residual: (number | null)[];
  deseasonalized: number[];
  period: number;
}

/**
 * Descomposición estacional aditiva por medias móviles centradas
 * Permite separar el ciclo natural (anual) de la tendencia de fondo a largo plazo.
 */
export function decomposeSeasonal(
  values: number[],
  period = 12
): SeasonalDecompositionResult {
  const n = values.length;
  const trend: (number | null)[] = new Array(n).fill(null);
  const seasonal: number[] = new Array(n).fill(0);
  const residual: (number | null)[] = new Array(n).fill(null);
  const deseasonalized: number[] = new Array(n).fill(0);

  if (n < period * 2) {
    // Si la serie es muy corta para calcular medias móviles con período completo
    for (let i = 0; i < n; i++) {
      trend[i] = values[i];
      deseasonalized[i] = values[i];
      residual[i] = 0;
    }
    return { trend, seasonal, residual, deseasonalized, period };
  }

  const half = Math.floor(period / 2);

  // 1. Media móvil centrada para extraer la tendencia (Trend)
  for (let i = half; i < n - half; i++) {
    if (period % 2 === 0) {
      // Período par (ej. 12 meses): 2x12 CMA
      let sum = 0.5 * values[i - half] + 0.5 * values[i + half];
      for (let j = i - half + 1; j < i + half; j++) {
        sum += values[j];
      }
      trend[i] = sum / period;
    } else {
      // Período impar
      let sum = 0;
      for (let j = i - half; j <= i + half; j++) {
        sum += values[j];
      }
      trend[i] = sum / period;
    }
  }

  // 2. Extraer componente estacional preliminar = values - trend
  const seasonalRaw: number[][] = Array.from({ length: period }, () => []);
  for (let i = 0; i < n; i++) {
    if (trend[i] !== null) {
      const idx = i % period;
      seasonalRaw[idx].push(values[i] - (trend[i] as number));
    }
  }

  // 3. Medias por estación
  const seasonalMeans = seasonalRaw.map((vals) => {
    if (vals.length === 0) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  // Normalizar para que la suma del ciclo estacional sea exactamente 0
  const seasonalMeanOfMeans =
    seasonalMeans.reduce((a, b) => a + b, 0) / period;
  const normalizedSeasonal = seasonalMeans.map((v) => v - seasonalMeanOfMeans);

  // 4. Asignar componente estacional, desestacionalizado y residuo
  for (let i = 0; i < n; i++) {
    const s = normalizedSeasonal[i % period];
    seasonal[i] = s;
    deseasonalized[i] = values[i] - s;

    if (trend[i] !== null) {
      residual[i] = values[i] - (trend[i] as number) - s;
    }
  }

  return {
    trend,
    seasonal,
    residual,
    deseasonalized,
    period,
  };
}
