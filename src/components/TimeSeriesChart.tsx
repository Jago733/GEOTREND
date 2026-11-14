"use client";

import React, { useState, useMemo, useRef } from "react";
import { Download, Sliders, Eye, RefreshCw } from "lucide-react";
import { ComprehensiveAnalysis } from "@/lib/statistics";
import { TimeSeriesPoint } from "@/data/demoDatasets";

interface TimeSeriesChartProps {
  data: TimeSeriesPoint[];
  analysis: ComprehensiveAnalysis;
  variableName: string;
  unit: string;
  regionName: string;
}

export function TimeSeriesChart({
  data,
  analysis,
  variableName,
  unit,
  regionName,
}: TimeSeriesChartProps) {
  // Visual layer toggles
  const [showRegression, setShowRegression] = useState(true);
  const [showCI, setShowCI] = useState(true);
  const [showSens, setShowSens] = useState(true);
  const [showDeseasonalized, setShowDeseasonalized] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const n = data.length;

  // Min/Max calculations for scaling
  const { minVal, maxVal, dates, values } = useMemo(() => {
    const dates = data.map((d) => d.date);
    const values = data.map((d) => d.value);

    let min = Math.min(...values);
    let max = Math.max(...values);

    // Also include regression and CI in bounds
    if (analysis?.regression?.ciLower) {
      const minCI = Math.min(...analysis.regression.ciLower);
      const maxCI = Math.max(...analysis.regression.ciUpper);
      min = Math.min(min, minCI);
      max = Math.max(max, maxCI);
    }

    const padding = (max - min) * 0.08 || 1;
    return {
      minVal: min - padding,
      maxVal: max + padding,
      dates,
      values,
    };
  }, [data, analysis]);

  // Coordinate mapping dimensions
  const svgWidth = 900;
  const svgHeight = 420;
  const margin = { top: 30, right: 30, bottom: 45, left: 65 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  const getX = (index: number) => {
    if (n <= 1) return margin.left;
    return margin.left + (index / (n - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    if (maxVal === minVal) return margin.top + chartHeight / 2;
    return margin.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
  };

  // SVG Paths
  // 1. Observed Data Path
  const dataPath = useMemo(() => {
    if (n === 0) return "";
    return values
      .map((val, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx).toFixed(1)} ${getY(val).toFixed(1)}`)
      .join(" ");
  }, [values, n, minVal, maxVal]);

  // 2. Linear Regression Line
  const regressionPath = useMemo(() => {
    if (!analysis?.regression?.fitted || analysis.regression.fitted.length !== n) return "";
    const f0 = analysis.regression.fitted[0];
    const fn = analysis.regression.fitted[n - 1];
    return `M ${getX(0).toFixed(1)} ${getY(f0).toFixed(1)} L ${getX(n - 1).toFixed(1)} ${getY(fn).toFixed(1)}`;
  }, [analysis, n, minVal, maxVal]);

  // 3. Sen's Slope Line
  const sensPath = useMemo(() => {
    if (!analysis?.mannKendall) return "";
    const { sensSlope, sensIntercept } = analysis.mannKendall;
    const y0 = sensIntercept;
    const yn = sensIntercept + sensSlope * (n - 1);
    return `M ${getX(0).toFixed(1)} ${getY(y0).toFixed(1)} L ${getX(n - 1).toFixed(1)} ${getY(yn).toFixed(1)}`;
  }, [analysis, n, minVal, maxVal]);

  // 4. 95% Confidence Interval Area
  const ciAreaPath = useMemo(() => {
    if (!analysis?.regression?.ciLower || analysis.regression.ciLower.length !== n) return "";
    const { ciLower, ciUpper } = analysis.regression;

    let path = `M ${getX(0).toFixed(1)} ${getY(ciUpper[0]).toFixed(1)}`;
    for (let i = 1; i < n; i++) {
      path += ` L ${getX(i).toFixed(1)} ${getY(ciUpper[i]).toFixed(1)}`;
    }
    for (let i = n - 1; i >= 0; i--) {
      path += ` L ${getX(i).toFixed(1)} ${getY(ciLower[i]).toFixed(1)}`;
    }
    path += " Z";
    return path;
  }, [analysis, n, minVal, maxVal]);

  // 5. Deseasonalized line
  const deseasonalizedPath = useMemo(() => {
    if (!analysis?.seasonal?.deseasonalized || analysis.seasonal.deseasonalized.length !== n) return "";
    return analysis.seasonal.deseasonalized
      .map((val, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx).toFixed(1)} ${getY(val).toFixed(1)}`)
      .join(" ");
  }, [analysis, n, minVal, maxVal]);

  // Handle Mouse Move over chart
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const scale = svgWidth / rect.width;
    const scaledX = xPos * scale;

    const relX = scaledX - margin.left;
    if (relX < 0 || relX > chartWidth) {
      setHoverIndex(null);
      return;
    }
    const idx = Math.round((relX / chartWidth) * (n - 1));
    if (idx >= 0 && idx < n) {
      setHoverIndex(idx);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Fecha",
      `Valor_${unit.replace(/[^a-zA-Z0-9]/g, "_")}`,
      "Regresion_OLS",
      "IC_95_Inferior",
      "IC_95_Superior",
      "Desestacionalizado",
    ];

    const rows = data.map((d, i) => [
      d.date,
      d.value,
      analysis.regression.fitted[i]?.toFixed(3) || "",
      analysis.regression.ciLower[i]?.toFixed(3) || "",
      analysis.regression.ciUpper[i]?.toFixed(3) || "",
      analysis.seasonal.deseasonalized[i]?.toFixed(3) || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `geotrend_${variableName.toLowerCase().replace(/\s+/g, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Y-axis ticks
  const yTicks = useMemo(() => {
    const count = 5;
    const step = (maxVal - minVal) / (count - 1);
    const ticks: number[] = [];
    for (let i = 0; i < count; i++) {
      ticks.push(minVal + step * i);
    }
    return ticks;
  }, [minVal, maxVal]);

  // X-axis label samples (6-8 labels evenly spaced)
  const xLabels = useMemo(() => {
    if (n === 0) return [];
    const step = Math.max(1, Math.floor(n / 6));
    const indices: number[] = [];
    for (let i = 0; i < n; i += step) {
      indices.push(i);
    }
    if (indices[indices.length - 1] !== n - 1) {
      indices.push(n - 1);
    }
    return indices.map((idx) => ({
      index: idx,
      label: dates[idx],
    }));
  }, [n, dates]);

  return (
    <div
      ref={containerRef}
      className="bg-surface rounded-xl border border-hairline/80 shadow-apple p-5 sm:p-7 relative transition-apple"
    >
      {/* Chart Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-hairline/60 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
            <h3 className="text-[19px] font-semibold text-ink tracking-tight">
              Serie Temporal y Análisis de Tendencia
            </h3>
          </div>
          <p className="text-[13px] text-muted mt-0.5">
            {variableName} • {regionName} ({n} puntos de medición)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-ink bg-surface-alt hover:bg-chip rounded-pill border border-hairline/80 transition-all"
            title="Descargar serie temporal en formato CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Toggles bar */}
      <div className="flex items-center gap-2 py-3 flex-wrap text-[12px]">
        <span className="text-muted text-[11px] font-medium uppercase tracking-wider mr-1">
          Capas:
        </span>

        <button
          onClick={() => setShowRegression(!showRegression)}
          className={`px-2.5 py-1 rounded-pill flex items-center gap-1.5 border transition-all ${
            showRegression
              ? "bg-primary/10 border-primary text-primary font-medium"
              : "bg-surface-alt border-hairline text-muted"
          }`}
        >
          <span className="w-2.5 h-0.5 bg-primary rounded-full inline-block" />
          <span>Regresión OLS</span>
        </button>

        <button
          onClick={() => setShowCI(!showCI)}
          className={`px-2.5 py-1 rounded-pill flex items-center gap-1.5 border transition-all ${
            showCI
              ? "bg-blue-50 border-blue-300 text-blue-700 font-medium"
              : "bg-surface-alt border-hairline text-muted"
          }`}
        >
          <span className="w-2.5 h-2 bg-blue-400/30 border border-blue-400 rounded-sm inline-block" />
          <span>Confianza 95%</span>
        </button>

        <button
          onClick={() => setShowSens(!showSens)}
          className={`px-2.5 py-1 rounded-pill flex items-center gap-1.5 border transition-all ${
            showSens
              ? "bg-amber-50 border-amber-300 text-amber-700 font-medium"
              : "bg-surface-alt border-hairline text-muted"
          }`}
        >
          <span className="w-2.5 h-0.5 bg-amber-500 rounded-full inline-block" />
          <span>Pendiente de Sen</span>
        </button>

        <button
          onClick={() => setShowDeseasonalized(!showDeseasonalized)}
          className={`px-2.5 py-1 rounded-pill flex items-center gap-1.5 border transition-all ${
            showDeseasonalized
              ? "bg-purple-50 border-purple-300 text-purple-700 font-medium"
              : "bg-surface-alt border-hairline text-muted"
          }`}
        >
          <span className="w-2.5 h-0.5 bg-purple-500 rounded-full inline-block" />
          <span>Desestacionalizada</span>
        </button>
      </div>

      {/* Main SVG Chart Container */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[2.2/1] select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Shaded area under data line */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071E3" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0071E3" stopOpacity="0.0" />
            </linearGradient>

            {/* Pattern for CI band */}
            <pattern id="ciPattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#2997FF" strokeWidth="0.8" opacity="0.3" />
            </pattern>
          </defs>

          {/* Grid lines (horizontal) */}
          {yTicks.map((tick, i) => {
            const y = getY(tick);
            return (
              <g key={i}>
                <line
                  x1={margin.left}
                  y1={y}
                  x2={svgWidth - margin.right}
                  y2={y}
                  stroke="#E5E5EA"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted text-[11px] font-sans"
                >
                  {tick.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X Axis vertical labels */}
          {xLabels.map((item, i) => {
            const x = getX(item.index);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={margin.top}
                  x2={x}
                  y2={svgHeight - margin.bottom}
                  stroke="#F2F2F7"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={svgHeight - margin.bottom + 20}
                  textAnchor="middle"
                  className="fill-muted text-[11px] font-sans"
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* 95% Confidence Interval Area */}
          {showCI && ciAreaPath && (
            <path
              d={ciAreaPath}
              fill="rgba(41, 151, 255, 0.12)"
              stroke="rgba(41, 151, 255, 0.4)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          )}

          {/* Sen's Slope Trend Line */}
          {showSens && sensPath && (
            <path
              d={sensPath}
              fill="none"
              stroke="#D97706"
              strokeWidth="2.2"
              strokeDasharray="6 4"
            />
          )}

          {/* OLS Linear Regression Line */}
          {showRegression && regressionPath && (
            <path
              d={regressionPath}
              fill="none"
              stroke="#0071E3"
              strokeWidth="2.5"
            />
          )}

          {/* Deseasonalized line */}
          {showDeseasonalized && deseasonalizedPath && (
            <path
              d={deseasonalizedPath}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="1.8"
            />
          )}

          {/* Raw Observed Data Line */}
          <path
            d={dataPath}
            fill="none"
            stroke="#1D1D1F"
            strokeWidth={n > 200 ? "1.4" : "2"}
            className="transition-all"
          />

          {/* Interactive Crosshair & Tooltip Point */}
          {hoverIndex !== null && hoverIndex >= 0 && hoverIndex < n && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={margin.top}
                x2={getX(hoverIndex)}
                y2={svgHeight - margin.bottom}
                stroke="#1D1D1F"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Point on observed */}
              <circle
                cx={getX(hoverIndex)}
                cy={getY(values[hoverIndex])}
                r="4.5"
                fill="#1D1D1F"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Point on regression */}
              {showRegression && analysis.regression.fitted[hoverIndex] !== undefined && (
                <circle
                  cx={getX(hoverIndex)}
                  cy={getY(analysis.regression.fitted[hoverIndex])}
                  r="4"
                  fill="#0071E3"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              )}
            </g>
          )}
        </svg>

        {/* Hover Details Card (Overlay) */}
        {hoverIndex !== null && hoverIndex >= 0 && hoverIndex < n && (
          <div
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-hairline shadow-apple text-[12px] space-y-1 pointer-events-none z-10 min-w-[190px]"
          >
            <div className="font-semibold text-ink border-b border-hairline/60 pb-1">
              {dates[hoverIndex]}
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted">Observado:</span>
              <span className="font-mono font-medium text-ink">
                {values[hoverIndex]} {unit}
              </span>
            </div>
            {showRegression && analysis.regression.fitted[hoverIndex] !== undefined && (
              <div className="flex justify-between gap-4 text-primary">
                <span>Regresión:</span>
                <span className="font-mono font-medium">
                  {analysis.regression.fitted[hoverIndex].toFixed(2)} {unit}
                </span>
              </div>
            )}
            {showCI && analysis.regression.ciLower[hoverIndex] !== undefined && (
              <div className="flex justify-between gap-4 text-blue-600 text-[11px]">
                <span>IC 95%:</span>
                <span className="font-mono">
                  [{analysis.regression.ciLower[hoverIndex].toFixed(2)} ,{" "}
                  {analysis.regression.ciUpper[hoverIndex].toFixed(2)}]
                </span>
              </div>
            )}
            {showDeseasonalized && analysis.seasonal.deseasonalized[hoverIndex] !== undefined && (
              <div className="flex justify-between gap-4 text-purple-600 text-[11px]">
                <span>Desestac.:</span>
                <span className="font-mono">
                  {analysis.seasonal.deseasonalized[hoverIndex].toFixed(2)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Axis Unit Legend */}
      <div className="flex items-center justify-between text-[11px] text-muted-light pt-2 px-2">
        <span>Eje Y: {unit}</span>
        <span>Eje X: Tiempo (Años / Meses)</span>
      </div>
    </div>
  );
}
