/**
 * Utilidades matemáticas para distribuciones estadísticas:
 * - Función de Error (erf)
 * - Distribución Normal Estándar CDF (Phi)
 * - Inversa Normal (cuantil)
 * - Aproximación de distribución t de Student
 */

// Aproximación de Abramowitz y Stegun para erf(x) con alta precisión (error < 1.5e-7)
export function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return sign * y;
}

// CDF de la distribución normal estándar N(0, 1)
export function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// Valor p bilateral a partir de estadístico Z normal
export function normalPValue(z: number): number {
  return 2 * (1 - normalCDF(Math.abs(z)));
}

// Aproximación de CDF de t de Student (Hill, 1970 / Bailey)
export function studentTCDF(t: number, df: number): number {
  if (df <= 0) return 0.5;
  if (df > 120) {
    // Para grados de libertad altos, t converge a normal estándar
    return normalCDF(t);
  }

  const x = (t + Math.sqrt(t * t + df)) / (2 * Math.sqrt(t * t + df));
  // Incomplete beta approximation
  const z = Math.abs(t);
  const w = z / Math.sqrt(df);
  const poly = 1 + (w * w) / (2 * df);
  const normApprox = normalCDF(z / Math.sqrt(poly));

  if (t >= 0) {
    return normApprox;
  } else {
    return 1 - normApprox;
  }
}

// Valor p bilateral para t de Student con df grados de libertad
export function studentTPValue(t: number, df: number): number {
  if (isNaN(t) || isNaN(df) || df < 1) return 1.0;
  const cdf = studentTCDF(Math.abs(t), df);
  return Math.max(0, Math.min(1, 2 * (1 - cdf)));
}

// Cuantil t crítico aproximado para intervalo de confianza del 95% (alpha = 0.05)
export function getCriticalT95(df: number): number {
  if (df <= 1) return 12.71;
  if (df === 2) return 4.303;
  if (df === 3) return 3.182;
  if (df === 4) return 2.776;
  if (df === 5) return 2.571;
  if (df <= 10) return 2.228;
  if (df <= 20) return 2.086;
  if (df <= 30) return 2.042;
  if (df <= 60) return 2.0;
  if (df <= 120) return 1.98;
  return 1.96; // asymptotic normal
}
