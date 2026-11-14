"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ComprehensiveAnalysis } from "@/lib/statistics";

interface StatisticalSummaryCardProps {
  analysis: ComprehensiveAnalysis;
  variableName: string;
  unit: string;
  regionName: string;
}

export function StatisticalSummaryCard({
  analysis,
  variableName,
  unit,
  regionName,
}: StatisticalSummaryCardProps) {
  const [showFormulas, setShowFormulas] = useState(false);

  const { basic, mannKendall: mk, regression: reg, narrative } = analysis;

  const isSignificant = mk.significant || reg.significant;
  const isRising = mk.s > 0 || reg.slope > 0;

  // Formatting values
  const pValFormatted =
    mk.pValue < 0.0001 ? "< 0.0001" : mk.pValue.toFixed(4);
  const zFormatted = mk.z.toFixed(2);
  const r2Formatted = (reg.r2 * 100).toFixed(1);

  // Annual slope extrapolation
  const n = basic.count;
  const annualSlope = reg.slope * 12; // Assuming monthly points
  const decadalSlope = annualSlope * 10;

  return (
    <div className="space-y-6">
      {/* 1. Main Detective Verdict Card */}
      <div
        className={`rounded-xl border p-6 sm:p-7 relative overflow-hidden transition-all ${
          isSignificant
            ? isRising
              ? "bg-gradient-to-br from-amber-500/[0.04] to-red-500/[0.08] border-amber-500/30"
              : "bg-gradient-to-br from-blue-500/[0.04] to-cyan-500/[0.08] border-blue-500/30"
            : "bg-surface-alt border-hairline"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isSignificant
                  ? isRising
                    ? "bg-red-500/10 text-red-600"
                    : "bg-blue-500/10 text-blue-600"
                  : "bg-muted/10 text-muted"
              }`}
            >
              {isSignificant ? (
                isRising ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )
              ) : (
                <Minus className="w-5 h-5" />
              )}
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-muted">
                Veredicto del Detective Climático
              </span>
              <h2 className="text-[21px] font-semibold text-ink tracking-tight">
                {isSignificant
                  ? isRising
                    ? "Tendencia Creciente Significativa"
                    : "Tendencia Decreciente Significativa"
                  : "Sin Tendencia Estadísticamente Significativa"}
              </h2>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-[12px] font-medium border ${
              isSignificant
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}
          >
            {isSignificant ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>
              {isSignificant
                ? "Significativo (p < 0.05)"
                : "No Significativo (p ≥ 0.05)"}
            </span>
          </div>
        </div>

        {/* Narrative Box */}
        <p className="text-[15px] leading-relaxed text-ink/90 font-normal">
          {narrative.summary} {narrative.whatIsChanging}
        </p>

        {/* Four Core Challenge Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-hairline/60">
          <div className="bg-surface/70 rounded-lg p-3.5 border border-hairline/50">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
              1. ¿Qué está cambiando?
            </span>
            <p className="text-[13px] text-ink font-medium">
              {variableName} ({unit})
            </p>
            <p className="text-[12px] text-muted-light mt-0.5">
              Variación observada neta de {basic.totalChange > 0 ? "+" : ""}
              {basic.totalChange.toFixed(2)} {unit} durante el registro.
            </p>
          </div>

          <div className="bg-surface/70 rounded-lg p-3.5 border border-hairline/50">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
              2. ¿Dónde está cambiando?
            </span>
            <p className="text-[13px] text-ink font-medium">{regionName}</p>
            <p className="text-[12px] text-muted-light mt-0.5">
              Monitoreado por sensores satelitales calibrados de NASA y agencias socias.
            </p>
          </div>

          <div className="bg-surface/70 rounded-lg p-3.5 border border-hairline/50">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
              3. ¿Cuánto está cambiando? (Tasa de cambio)
            </span>
            <p className="text-[13px] text-ink font-medium">
              Pendiente de Sen: {mk.sensSlope > 0 ? "+" : ""}
              {mk.sensSlope.toFixed(4)} {unit}/paso temporal
            </p>
            <p className="text-[12px] text-muted-light mt-0.5">
              Tasa anualizada: ~{annualSlope.toFixed(3)} {unit}/año (R² = {r2Formatted}%).
            </p>
          </div>

          <div className="bg-surface/70 rounded-lg p-3.5 border border-hairline/50">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
              4. ¿Es científicamente significativo?
            </span>
            <p className="text-[13px] text-ink font-medium">
              {isSignificant
                ? `Sí (Mann-Kendall p = ${pValFormatted})`
                : `No significativo (p = ${pValFormatted})`}
            </p>
            <p className="text-[12px] text-muted-light mt-0.5">
              {isSignificant
                ? "Con 95% de confianza, la tendencia no es ruido aleatorio."
                : "Las fluctuaciones no superan el umbral de variabilidad natural."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key Statistical Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-surface rounded-xl p-4 border border-hairline/80 shadow-apple">
          <span className="text-[11px] text-muted uppercase font-medium tracking-wider block">
            Estadístico S de Kendall
          </span>
          <div className="text-[22px] font-semibold text-ink mt-1">
            {mk.s > 0 ? `+${mk.s}` : mk.s}
          </div>
          <span className="text-[11px] text-muted-light mt-0.5 block">
            Pares concordantes vs discordantes
          </span>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-hairline/80 shadow-apple">
          <span className="text-[11px] text-muted uppercase font-medium tracking-wider block">
            Estadístico Z
          </span>
          <div className="text-[22px] font-semibold text-ink mt-1">
            {zFormatted}
          </div>
          <span className="text-[11px] text-muted-light mt-0.5 block">
            {Math.abs(mk.z) > 1.96 ? "|Z| > 1.96 (Significativo)" : "|Z| ≤ 1.96"}
          </span>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-hairline/80 shadow-apple">
          <span className="text-[11px] text-muted uppercase font-medium tracking-wider block">
            Valor p (Bilateral)
          </span>
          <div className="text-[22px] font-semibold text-primary mt-1">
            {pValFormatted}
          </div>
          <span className="text-[11px] text-muted-light mt-0.5 block">
            Umbral crítico α = 0.05
          </span>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-hairline/80 shadow-apple">
          <span className="text-[11px] text-muted uppercase font-medium tracking-wider block">
            Bondad de Ajuste R²
          </span>
          <div className="text-[22px] font-semibold text-ink mt-1">
            {r2Formatted}%
          </div>
          <span className="text-[11px] text-muted-light mt-0.5 block">
            Varianza explicada por regresión
          </span>
        </div>
      </div>

      {/* 3. Collapsible Scientific Methodology Details */}
      <div className="bg-surface rounded-xl border border-hairline/80 shadow-apple p-5">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="w-full flex items-center justify-between text-left text-ink hover:text-primary transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-[14px] font-semibold">
              Explicación Científica del Análisis para Estudiantes e Investigadores
            </span>
          </div>
          {showFormulas ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>

        {showFormulas && (
          <div className="mt-4 pt-4 border-t border-hairline/60 text-[13px] leading-relaxed text-ink/80 space-y-4">
            <div>
              <h4 className="font-semibold text-ink text-[13px] mb-1">
                ¿Por qué usar la prueba de Mann-Kendall?
              </h4>
              <p>
                Los datos de ciencias de la Tierra rara vez siguen una distribución normal perfecta: pueden contener valores atípicos (olas de calor, erupciones volcánicas, huracanes) o no linealidades. La prueba de <strong>Mann-Kendall</strong> es una prueba estadística no paramétrica recomendada por NASA y la OMM porque evalúa si la serie sube o baja consistentemente sin depender de que los datos sigan una campana de Gauss.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-ink text-[13px] mb-1">
                ¿Qué es la Pendiente de Sen (Sen's Slope)?
              </h4>
              <p>
                Calcula la mediana de todas las pendientes entre cada par de puntos en el tiempo. A diferencia de la regresión clásica ordinaria, un único valor anómalo extremo no altera artificialmente la tendencia detectada.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-ink text-[13px] mb-1">
                Bandas de Intervalo de Confianza al 95%
              </h4>
              <p>
                El área sombreada azul representa la región donde reside la verdadera recta de tendencia con un 95% de probabilidad estadística. Cuando las bandas son estrechas y están claramente inclinadas, la certeza de que el planeta está cambiando es máxima.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
