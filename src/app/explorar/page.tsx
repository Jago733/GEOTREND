"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Satellite,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { EARTH_VARIABLES, EarthVariable } from "@/data/catalog";

export default function ExplorarPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("todos");
  const [guidedQuestion, setGuidedQuestion] = useState<string | null>(null);

  const domainTabs = [
    { id: "todos", label: "Todas las Variables" },
    { id: "atmosfera", label: "Atmósfera y Clima" },
    { id: "oceano", label: "Océanos" },
    { id: "tierra", label: "Tierra e Hidrología" },
    { id: "criosfera", label: "Criosfera e Hielo" },
  ];

  const filteredVariables = useMemo(() => {
    return EARTH_VARIABLES.filter((item) => {
      const matchesDomain =
        selectedDomain === "todos" || item.domain === selectedDomain;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.simpleDefinition.toLowerCase().includes(q) ||
        item.instrument.toLowerCase().includes(q) ||
        item.platform.toLowerCase().includes(q);

      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  return (
    <div className="pt-24 pb-20 bg-surface-alt min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-primary text-[13px] font-semibold tracking-wider uppercase">
            Paso 1: Identificación de Variables
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink mt-2">
            Catálogo de Variables de la Tierra
          </h1>
          <p className="text-[17px] text-muted mt-3">
            Selecciona una variable observada por misiones satelitales de la NASA o modelos globales para investigar si presenta una tendencia significativa.
          </p>
        </div>

        {/* Guided Question Wizard (As suggested in challenge prompt) */}
        <div className="bg-surface rounded-xl p-6 border border-hairline/80 shadow-apple mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-[15px] font-semibold text-ink">
              Asistente Rápido: ¿Qué aspecto de la Tierra te interesa investigar?
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setSelectedDomain("atmosfera");
                setSearchQuery("temperatura");
              }}
              className="p-3 text-left rounded-lg bg-surface-alt hover:bg-chip border border-hairline/60 transition-all text-[13px]"
            >
              <span className="font-medium text-ink block">🌡️ Calentamiento</span>
              <span className="text-muted text-[11px]">Temperatura global y regional</span>
            </button>

            <button
              onClick={() => {
                setSelectedDomain("atmosfera");
                setSearchQuery("carbono");
              }}
              className="p-3 text-left rounded-lg bg-surface-alt hover:bg-chip border border-hairline/60 transition-all text-[13px]"
            >
              <span className="font-medium text-ink block">💨 Gases Invernadero</span>
              <span className="text-muted text-[11px]">CO₂ y Metano atmosférico</span>
            </button>

            <button
              onClick={() => {
                setSelectedDomain("criosfera");
                setSearchQuery("hielo");
              }}
              className="p-3 text-left rounded-lg bg-surface-alt hover:bg-chip border border-hairline/60 transition-all text-[13px]"
            >
              <span className="font-medium text-ink block">❄️ Deshielo Polar</span>
              <span className="text-muted text-[11px]">Hielo marino y glaciares</span>
            </button>

            <button
              onClick={() => {
                setSelectedDomain("tierra");
                setSearchQuery("lluvia");
              }}
              className="p-3 text-left rounded-lg bg-surface-alt hover:bg-chip border border-hairline/60 transition-all text-[13px]"
            >
              <span className="font-medium text-ink block">🌧️ Agua y Lluvias</span>
              <span className="text-muted text-[11px]">Precipitación y sequías</span>
            </button>
          </div>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="bg-surface rounded-xl p-4 border border-hairline/80 shadow-apple mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por variable, satélite o sensor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-[14px] bg-surface-alt rounded-lg border border-hairline/80 text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Domain Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {domainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedDomain(tab.id);
                  setSearchQuery("");
                }}
                className={`px-3 py-1.5 text-[13px] rounded-pill whitespace-nowrap transition-all ${
                  selectedDomain === tab.id
                    ? "bg-primary text-white font-medium shadow-sm"
                    : "bg-surface-alt text-muted hover:text-ink hover:bg-chip"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Variables Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVariables.map((variable) => (
            <div
              key={variable.id}
              className="bg-surface rounded-xl border border-hairline/80 shadow-apple hover:shadow-apple-hover transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-pill bg-primary/10 text-primary">
                    {variable.domainLabel}
                  </span>
                  {variable.demoAvailable && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-pill bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Datos Listos</span>
                    </span>
                  )}
                </div>

                {/* Variable Name */}
                <h3 className="text-[19px] font-semibold text-ink tracking-tight mb-2">
                  {variable.name}
                </h3>

                {/* Simple definition for students */}
                <p className="text-[13px] text-muted leading-relaxed mb-4">
                  {variable.simpleDefinition}
                </p>

                {/* Metadata Details */}
                <div className="space-y-2 pt-3 border-t border-hairline/60 text-[12px]">
                  <div className="flex items-center justify-between text-muted">
                    <span className="flex items-center gap-1.5">
                      <Satellite className="w-3.5 h-3.5 text-primary" />
                      <span>Instrumento:</span>
                    </span>
                    <span className="font-medium text-ink truncate max-w-[170px]" title={variable.instrument}>
                      {variable.instrument}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Frecuencia / Rango:</span>
                    </span>
                    <span className="font-medium text-ink">
                      {variable.frequency} • {variable.timeSpan}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted">
                    <span>Unidad de Medida:</span>
                    <span className="font-mono text-ink font-semibold">
                      {variable.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-hairline/60">
                {variable.demoAvailable ? (
                  <Link
                    href={`/analizar?dataset=${variable.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-[14px] font-medium text-white bg-primary hover:bg-primary-hover active:scale-[0.98] rounded-pill transition-all shadow-sm"
                  >
                    <span>Analizar Serie Temporal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href={`/datos?var=${variable.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-[14px] font-medium text-ink bg-surface-alt hover:bg-chip rounded-pill border border-hairline transition-all"
                  >
                    <span>Ver Fuente en Portales NASA</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredVariables.length === 0 && (
          <div className="bg-surface rounded-xl p-12 text-center border border-hairline">
            <p className="text-[15px] text-muted">
              No se encontraron variables con el término de búsqueda actual.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDomain("todos");
              }}
              className="mt-4 px-4 py-2 text-[13px] font-medium text-primary bg-primary/10 rounded-pill hover:bg-primary/20"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
