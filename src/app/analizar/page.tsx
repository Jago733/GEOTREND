"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Upload,
  Sparkles,
  BarChart2,
  Calendar,
  Layers,
  MapPin,
  FileText,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { DEMO_DATASETS, DemoDataset, TimeSeriesPoint } from "@/data/demoDatasets";
import { EARTH_VARIABLES } from "@/data/catalog";
import { analyzeTimeSeries, ComprehensiveAnalysis } from "@/lib/statistics";
import { TimeSeriesChart } from "@/components/TimeSeriesChart";
import { StatisticalSummaryCard } from "@/components/StatisticalSummaryCard";

function AnalizarContent() {
  const searchParams = useSearchParams();
  const datasetParam = searchParams.get("dataset") || "temp_giss";

  // State
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<string>(
    DEMO_DATASETS[datasetParam] ? datasetParam : "temp_giss"
  );
  const [customData, setCustomData] = useState<TimeSeriesPoint[] | null>(null);
  const [customMetadata, setCustomMetadata] = useState<{
    name: string;
    unit: string;
    region: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"grafico" | "descomposicion" | "informe">("grafico");

  // Sync param if changes
  useEffect(() => {
    if (searchParams.get("dataset") && DEMO_DATASETS[searchParams.get("dataset")!]) {
      setSelectedDatasetKey(searchParams.get("dataset")!);
      setCustomData(null);
      setCustomMetadata(null);
    }
  }, [searchParams]);

  // Current active dataset
  const activeDataset: {
    name: string;
    unit: string;
    region: string;
    data: TimeSeriesPoint[];
    source: string;
  } = useMemo(() => {
    if (customData && customMetadata) {
      return {
        name: customMetadata.name,
        unit: customMetadata.unit,
        region: customMetadata.region,
        data: customData,
        source: "Archivo CSV importado por el usuario",
      };
    }
    const demo = DEMO_DATASETS[selectedDatasetKey] || DEMO_DATASETS.temp_giss;
    return {
      name: demo.name,
      unit: demo.unit,
      region: demo.region,
      data: demo.data,
      source: demo.source,
    };
  }, [selectedDatasetKey, customData, customMetadata]);

  // Run statistical analysis
  const analysis: ComprehensiveAnalysis = useMemo(() => {
    const dates = activeDataset.data.map((d) => d.date);
    const values = activeDataset.data.map((d) => d.value);
    return analyzeTimeSeries(
      dates,
      values,
      activeDataset.name,
      activeDataset.unit,
      activeDataset.region
    );
  }, [activeDataset]);

  // Handle CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
        if (lines.length < 5) {
          alert("El archivo CSV debe contener al menos 5 filas de datos.");
          return;
        }

        // Parse header and rows
        const parsed: TimeSeriesPoint[] = [];
        const header = lines[0].toLowerCase();
        const startIdx = header.includes("date") || header.includes("fecha") || header.includes("year") || header.includes("ano") ? 1 : 0;

        for (let i = startIdx; i < lines.length; i++) {
          const parts = lines[i].split(/[,;\t]/).map((p) => p.trim());
          if (parts.length >= 2) {
            const dateStr = parts[0];
            const numVal = parseFloat(parts[1].replace(",", "."));
            if (!isNaN(numVal)) {
              parsed.push({ date: dateStr, value: numVal });
            }
          }
        }

        if (parsed.length >= 4) {
          setCustomData(parsed);
          setCustomMetadata({
            name: file.name.replace(/\.[^/.]+$/, ""),
            unit: "unidades",
            region: "Área Personalizada",
          });
        } else {
          alert("No se pudieron extraer suficientes pares fecha-valor válidos del archivo CSV.");
        }
      } catch (err) {
        alert("Error al leer el archivo CSV. Asegúrate de que tenga formato: Fecha,Valor");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-alt min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Dataset Selector Bar */}
        <div className="bg-surface rounded-xl p-5 sm:p-7 border border-hairline/80 shadow-apple mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-hairline/60">
            <div>
              <span className="text-primary text-[12px] font-semibold tracking-wider uppercase block">
                Analizador Estadístico de Tendencias
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight mt-1">
                {activeDataset.name}
              </h1>
              <div className="flex items-center gap-3 text-[13px] text-muted mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{activeDataset.region}</span>
                </span>
                <span>•</span>
                <span>Fuente: {activeDataset.source}</span>
              </div>
            </div>

            {/* Quick Demo Switcher Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {Object.keys(DEMO_DATASETS).map((key) => {
                const demo = DEMO_DATASETS[key];
                const isSelected = selectedDatasetKey === key && !customData;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedDatasetKey(key);
                      setCustomData(null);
                      setCustomMetadata(null);
                    }}
                    className={`px-3 py-1.5 text-[12px] rounded-pill border transition-all ${
                      isSelected
                        ? "bg-primary text-white border-primary font-medium shadow-sm"
                        : "bg-surface-alt text-ink border-hairline/80 hover:bg-chip"
                    }`}
                  >
                    {demo.name.split(" ")[0]} {demo.name.split(" ")[1] || ""}
                  </button>
                );
              })}

              {/* Upload Custom CSV button */}
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-ink bg-surface-alt hover:bg-chip rounded-pill border border-hairline cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-primary" />
                <span>Cargar CSV</span>
                <input
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-4 pt-4 text-[13px]">
            <button
              onClick={() => setActiveTab("grafico")}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === "grafico"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Serie y Tendencia OLS / Sen
            </button>
            <button
              onClick={() => setActiveTab("descomposicion")}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === "descomposicion"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Descomposición Estacional (Ciclos Anuales)
            </button>
            <button
              onClick={() => setActiveTab("informe")}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === "informe"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              Reporte de Conclusiones para Estudiantes
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Time Series Chart & Statistical Summary */}
        {activeTab === "grafico" && (
          <div className="space-y-8">
            <TimeSeriesChart
              data={activeDataset.data}
              analysis={analysis}
              variableName={activeDataset.name}
              unit={activeDataset.unit}
              regionName={activeDataset.region}
            />

            <StatisticalSummaryCard
              analysis={analysis}
              variableName={activeDataset.name}
              unit={activeDataset.unit}
              regionName={activeDataset.region}
            />
          </div>
        )}

        {/* Tab 2: Seasonal Decomposition Breakdown */}
        {activeTab === "descomposicion" && (
          <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple space-y-8">
            <div>
              <span className="text-primary text-[12px] font-semibold tracking-wider uppercase block">
                Separación de Señal Climática vs Ciclo Estacional
              </span>
              <h2 className="text-2xl font-semibold text-ink tracking-tight mt-1">
                Descomposición Aditiva de la Serie Temporal
              </h2>
              <p className="text-[14px] text-muted mt-2 max-w-3xl leading-relaxed">
                El reto de la NASA destaca que muchas variables parecen subir y bajar por las estaciones del año (ruido cíclico). Al descomponer la serie en <strong>Tendencia de fondo</strong>, <strong>Estacionalidad</strong> y <strong>Residuo</strong>, revelamos si hay un cambio direccional real a largo plazo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-alt rounded-xl p-5 border border-hairline/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary block mb-2">
                  1. Componente Estacional (Ciclo Anual)
                </span>
                <p className="text-[13px] text-ink leading-relaxed">
                  Refleja la oscilación fija que se repite año tras año por el ciclo de traslación terrestre (ej. fotosíntesis de verano vs invierno).
                </p>
                <div className="mt-4 pt-3 border-t border-hairline/60 text-[12px] text-muted">
                  Amplitud estacional promedio:{" "}
                  <strong>
                    {(
                      Math.max(...analysis.seasonal.seasonal) -
                      Math.min(...analysis.seasonal.seasonal)
                    ).toFixed(2)}{" "}
                    {activeDataset.unit}
                  </strong>
                </div>
              </div>

              <div className="bg-surface-alt rounded-xl p-5 border border-hairline/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 block mb-2">
                  2. Tendencia Secular Suavizada
                </span>
                <p className="text-[13px] text-ink leading-relaxed">
                  Calculada mediante medias móviles centradas (2x12 CMA). Elimina el vaivén mensual para mostrar el verdadero rumbo del clima.
                </p>
                <div className="mt-4 pt-3 border-t border-hairline/60 text-[12px] text-muted">
                  Dirección:{" "}
                  <strong>
                    {analysis.mannKendall.trend === "creciente"
                      ? "Ascenso sostenido"
                      : analysis.mannKendall.trend === "decreciente"
                      ? "Descenso sostenido"
                      : "Estable / Sin tendencia"}
                  </strong>
                </div>
              </div>

              <div className="bg-surface-alt rounded-xl p-5 border border-hairline/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted block mb-2">
                  3. Ruido Residual Irregular
                </span>
                <p className="text-[13px] text-ink leading-relaxed">
                  Eventos climáticos esporádicos e impredecibles: tormentas extremas, años El Niño o fallas puntuales del sensor satelital.
                </p>
                <div className="mt-4 pt-3 border-t border-hairline/60 text-[12px] text-muted">
                  Desviación estándar residual:{" "}
                  <strong>
                    {(analysis.regression.seResidual).toFixed(2)}{" "}
                    {activeDataset.unit}
                  </strong>
                </div>
              </div>
            </div>

            {/* Educational takeaway */}
            <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200/60 text-[13px] text-ink leading-relaxed">
              <strong>Lección para el Estudiante:</strong> Cuando un científico afirma que la concentración de CO₂ o la temperatura global está aumentando significativamente, no se refiere al calor del verano, sino a la <em>Tendencia Secular</em> calculada tras remover este ciclo periódico.
            </div>
          </div>
        )}

        {/* Tab 3: Student Scientific Report */}
        {activeTab === "informe" && (
          <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-hairline pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                  NASA Space Apps Challenge • Ficha Técnica
                </span>
                <h2 className="text-2xl font-semibold text-ink mt-1">
                  Reporte del Detective Científico
                </h2>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 text-[12px] font-medium text-ink bg-surface-alt hover:bg-chip rounded-pill border border-hairline"
              >
                Imprimir / Guardar PDF
              </button>
            </div>

            <div className="space-y-4 text-[14px] leading-relaxed text-ink/90">
              <div className="p-4 rounded-lg bg-surface-alt border border-hairline/60 space-y-1">
                <div><strong>Variable Evaluada:</strong> {activeDataset.name} ({activeDataset.unit})</div>
                <div><strong>Región Geográfica:</strong> {activeDataset.region}</div>
                <div><strong>Rango Temporal:</strong> {activeDataset.data[0]?.date} a {activeDataset.data[activeDataset.data.length - 1]?.date} ({activeDataset.data.length} observaciones)</div>
                <div><strong>Sensor / Satélite:</strong> {activeDataset.source}</div>
              </div>

              <div>
                <h3 className="font-semibold text-ink text-[16px] mb-1">
                  1. Pregunta Central: ¿Qué está cambiando?
                </h3>
                <p>
                  {analysis.narrative.whatIsChanging} El valor medio registrado en el período fue de {analysis.basic.mean.toFixed(2)} {activeDataset.unit}, con un mínimo de {analysis.basic.min.toFixed(2)} {activeDataset.unit} y un máximo de {analysis.basic.max.toFixed(2)} {activeDataset.unit}.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-ink text-[16px] mb-1">
                  2. Pregunta Central: ¿Cuánto está cambiando? (Tasa de cambio)
                </h3>
                <p>
                  {analysis.narrative.rateOfChange}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-ink text-[16px] mb-1">
                  3. Pregunta Central: ¿Es estadísticamente significativo?
                </h3>
                <p>
                  {analysis.narrative.significanceExplanation}
                </p>
              </div>

              <div className="pt-4 border-t border-hairline">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-[13px]">
                  <strong>Dictamen Final:</strong> {analysis.narrative.summary}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AnalizarPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center text-muted">
          Cargando analizador estadístico...
        </div>
      }
    >
      <AnalizarContent />
    </Suspense>
  );
}
