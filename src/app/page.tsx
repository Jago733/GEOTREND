import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Search,
  BarChart3,
  CheckCircle2,
  Layers,
  Compass,
  Satellite,
  ShieldCheck,
  ChevronRight,
  Activity,
} from "lucide-react";
import { EARTH_VARIABLES } from "@/data/catalog";
import { DEMO_DATASETS } from "@/data/demoDatasets";

export default function HomePage() {
  const demoKeys = ["temp_giss", "co2_maunaloa", "sea_ice_arctic", "sea_level", "precipitation_amazon"];

  return (
    <div className="w-full">
      {/* 1. Hero Section (Apple Dark Cinematic) */}
      <section className="relative bg-[#000000] text-white pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Subtle radial ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge & Logo */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-white/10 backdrop-blur-md border border-white/15 text-[13px] text-white/90 mb-8 animate-fade-in">
            <Image
              src="/images/logo-blanco.png"
              alt="GEOTREND"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="font-medium">NASA Space Apps Challenge 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.08] max-w-4xl mx-auto mb-6">
            Descubre los cambios de la Tierra.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Con certeza científica.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#A1A1A6] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Los satélites de la NASA observan un planeta en constante evolución.
            Con <strong>GEOTREND</strong>, investiga variables climáticas, visualiza series
            temporales y determina si una tendencia es estadísticamente significativa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explorar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-[17px] font-medium text-white bg-primary hover:bg-primary-hover active:scale-[0.98] rounded-pill transition-all shadow-lg shadow-primary/20"
            >
              <span>Explorar Variables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/analizar?dataset=temp_giss"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-[17px] font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/15 rounded-pill border border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Ver Demostración en Vivo</span>
            </Link>
          </div>

          {/* Key 4 Questions Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 text-left">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                01. ¿Qué cambia?
              </span>
              <p className="text-[13px] text-white/90 font-medium mt-1">
                Variables satelitales
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                02. ¿Dónde cambia?
              </span>
              <p className="text-[13px] text-white/90 font-medium mt-1">
                Regiones y cuencas
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                03. ¿Cuánto cambia?
              </span>
              <p className="text-[13px] text-white/90 font-medium mt-1">
                Pendiente de Sen / OLS
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider block">
                04. ¿Es significativo?
              </span>
              <p className="text-[13px] text-white/90 font-medium mt-1">
                Prueba Mann-Kendall
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Demonstrations Showcase (Apple Light Canvas) */}
      <section className="py-20 bg-surface-alt border-b border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-primary text-[13px] font-semibold tracking-wider uppercase">
              Casos Reales Observados desde el Espacio
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink mt-2">
              Elige un caso y conviértete en Detective de Datos
            </h2>
            <p className="text-[17px] text-muted mt-3">
              Datos calibrados de misiones espaciales NASA, NOAA y NSIDC para evaluar tendencias reales y ciclos estacionales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoKeys.map((key) => {
              const demo = DEMO_DATASETS[key];
              const variable = EARTH_VARIABLES.find((v) => v.id === key);
              if (!demo || !variable) return null;

              return (
                <div
                  key={key}
                  className="bg-surface rounded-xl border border-hairline/80 shadow-apple hover:shadow-apple-hover transition-all p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-pill bg-primary/10 text-primary">
                        {variable.domainLabel}
                      </span>
                      <span className="text-[11px] text-muted-light">
                        {demo.period}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-semibold text-ink group-hover:text-primary transition-colors tracking-tight">
                      {demo.name}
                    </h3>

                    <p className="text-[13px] text-muted leading-relaxed mt-2">
                      {variable.simpleDefinition}
                    </p>

                    <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-[12px] text-muted-light">
                      <span>Región: <strong>{demo.region}</strong></span>
                      <span>Unidad: <strong>{demo.unit}</strong></span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline/60">
                    <Link
                      href={`/analizar?dataset=${key}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-[14px] font-medium text-ink bg-surface-alt hover:bg-primary hover:text-white rounded-pill border border-hairline/80 transition-all"
                    >
                      <span>Analizar Tendencia</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. The Detective Method: Why significance matters */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-primary text-[13px] font-semibold tracking-wider uppercase">
                Metodología Científica
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
                ¿Por qué una tendencia necesita ser "significativa"?
              </h2>
              <p className="text-[17px] text-ink-secondary leading-relaxed">
                En la naturaleza, las temperaturas cambian de verano a invierno y las lluvias varían de un mes a otro. Encontrar una pendiente no basta: debemos probar que esa dirección no es una simple casualidad.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-ink">
                      Prueba no paramétrica de Mann-Kendall
                    </h4>
                    <p className="text-[13px] text-muted mt-0.5">
                      No asume que los datos sigan una distribución normal y tolera valores meteorológicos extremos sin sesgar el resultado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-ink">
                      Estimador de Pendiente de Sen
                    </h4>
                    <p className="text-[13px] text-muted mt-0.5">
                      Determina la tasa real de cambio tomando la mediana de todas las pendientes por pares, evitando distorsiones por eventos como El Niño.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-ink">
                      Bandas de Confianza al 95% y Desestacionalización
                    </h4>
                    <p className="text-[13px] text-muted mt-0.5">
                      Aislamos el ciclo anual recurrente de las estaciones para revelar el patrón secular subyacente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/aprender"
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-link hover:underline"
                >
                  <span>Aprende más en la Guía del Detective Climático</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Card / Graphic Mockup */}
            <div className="lg:col-span-7 bg-surface-alt rounded-2xl p-8 border border-hairline/80 shadow-apple">
              <div className="bg-surface rounded-xl p-6 border border-hairline shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-[15px] text-ink">
                      Demostración: Detección de Ruido vs Señal
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-pill">
                    p &lt; 0.0001
                  </span>
                </div>

                {/* Conceptual Diagram */}
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-muted">Ciclo Natural (Verano/Invierno):</span>
                    <span className="font-medium text-ink">Removido mediante Medias Móviles</span>
                  </div>
                  <div className="w-full bg-hairline/40 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[85%] rounded-full" />
                  </div>

                  <div className="flex items-center justify-between text-[13px] pt-2">
                    <span className="text-muted">Nivel de Confianza Científica:</span>
                    <span className="font-semibold text-emerald-700">99.9% de Certeza</span>
                  </div>
                  <div className="w-full bg-hairline/40 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[99.9%] rounded-full" />
                  </div>
                </div>

                <div className="bg-blue-50/70 rounded-lg p-3.5 text-[12px] text-ink leading-relaxed border border-blue-200/50 mt-2">
                  <strong>Conclusión del Detective:</strong> Cuando el valor p es inferior a 0.05, los científicos de la NASA confirman que los cambios observados obedecen a un proceso físico persistente en el sistema terrestre y no a una simple fluctuación temporal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Final CTA Banner */}
      <section className="py-20 bg-ink text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            ¿Listo para investigar la salud del planeta?
          </h2>
          <p className="text-[17px] text-[#A1A1A6] max-w-xl mx-auto mb-8">
            Comienza seleccionando una variable atmosférica, oceánica o terrestre y descubre qué secretos revelan los datos de la NASA.
          </p>
          <Link
            href="/explorar"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[17px] font-medium text-ink bg-white hover:bg-[#F5F5F7] rounded-pill transition-all active:scale-[0.98]"
          >
            <span>Iniciar Exploración</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
