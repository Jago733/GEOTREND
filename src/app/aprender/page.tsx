import React from "react";
import Link from "next/link";
import {
  Compass,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Satellite,
  Search,
} from "lucide-react";

export default function AprenderPage() {
  return (
    <div className="pt-24 pb-20 bg-surface-alt min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary text-[13px] font-semibold tracking-wider uppercase">
            Guía Pedagógica para Estudiantes e Investigadores
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink mt-2">
            La Escuela del Detective de Datos
          </h1>
          <p className="text-[17px] text-muted mt-3">
            Aprende a interpretar los datos de la Tierra como los científicos de la NASA: distinguiendo el ruido de las señales y entendiendo por qué un mismo proceso puede crear tendencias opuestas.
          </p>
        </div>

        {/* 1. Paradox: Why can a variable trend in opposite directions? */}
        <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple mb-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Globe2 className="w-4 h-4" />
            </div>
            <h2 className="text-[20px] font-semibold text-ink tracking-tight">
              La Paradoja de la Tierra: ¿Por qué una misma causa produce tendencias opuestas?
            </h2>
          </div>

          <p className="text-[15px] text-ink-secondary leading-relaxed">
            Uno de los desafíos centrales planteados por la NASA es que <em>"una variable medida en ciencias de la Tierra puede mostrar una tendencia al alza en una región y a la baja en otra, ¡incluso cuando el mismo proceso físico impulsa a ambas!"</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-surface-alt rounded-lg p-4 border border-hairline/60">
              <h4 className="font-semibold text-ink text-[14px] mb-1">
                Ejemplo 1: Precipitación Global (Ciclo del Agua)
              </h4>
              <p className="text-[13px] text-muted leading-relaxed">
                Una atmósfera más cálida puede retener más vapor de agua (+7% por cada 1°C). En regiones convergentes tropicales, esto produce <strong>más inundaciones y lluvias torrenciales</strong> (tendencia creciente). Al mismo tiempo, en zonas subtropicales acelera la evaporación del suelo, generando <strong>sequías más prolongadas</strong> (tendencia decreciente). El mismo calentamiento genera más lluvia en un sitio y menos en otro.
              </p>
            </div>

            <div className="bg-surface-alt rounded-lg p-4 border border-hairline/60">
              <h4 className="font-semibold text-ink text-[14px] mb-1">
                Ejemplo 2: Ondas Planetarias y Frío Polar
              </h4>
              <p className="text-[13px] text-muted leading-relaxed">
                El rápido calentamiento del Ártico reduce la diferencia térmica con latitudes medias, debilitando la corriente en chorro (Jet Stream). Esto provoca que meandros de aire ártico se deslicen hacia el sur, causando <strong>olas de frío récord puntuales en Texas</strong> al mismo tiempo que en <strong>Siberia y Groenlandia las temperaturas están muy por encima de lo normal</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Statistical Significance Explained Simply */}
        <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple mb-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-[20px] font-semibold text-ink tracking-tight">
              ¿Qué es la "Significancia Estadística" (y por qué importa el valor p)?
            </h2>
          </div>

          <p className="text-[15px] text-ink-secondary leading-relaxed">
            Imagina que lanzas una moneda 4 veces y sale "cara" 3 veces. ¿Está trucada la moneda? No necesariamente; pudo ser simple casualidad. Pero si lanzas la moneda 100 veces y sale cara 85 veces, la probabilidad de que eso ocurra por simple azar es casi cero.
          </p>

          <div className="bg-blue-50/70 rounded-lg p-4 border border-blue-200/60 text-[13px] text-ink leading-relaxed space-y-2">
            <div>
              <strong>El umbral mágico: p &lt; 0.05 (5%):</strong>
            </div>
            <p>
              En la ciencia del clima, cuando una prueba como <strong>Mann-Kendall</strong> o una <strong>prueba t de Student</strong> arroja un <em>valor p inferior a 0.05</em>, significa que hay menos de un 5% de probabilidad de que la tendencia observada sea una casualidad. Con un 95% de certeza, estamos presenciando un fenómeno real.
            </p>
          </div>
        </div>

        {/* 3. The 3 Methods Compared */}
        <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple mb-8 space-y-5">
          <h2 className="text-[20px] font-semibold text-ink tracking-tight">
            Herramientas del Detective: Comparativa de Métodos
          </h2>

          <div className="space-y-4">
            <div className="border border-hairline/80 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-ink text-[14px]">
                  1. Prueba de Mann-Kendall (No paramétrica)
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-pill">
                  Estándar de Oro NASA / OMM
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">
                Compara cada par de puntos en el tiempo: si el punto posterior es mayor, anota +1; si es menor, -1. No le importa si los datos forman una campana de Gauss ni se deja engañar por un volcán o un huracán extremo. Determina con rigor si la serie es monotónicamente creciente o decreciente.
              </p>
            </div>

            <div className="border border-hairline/80 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-ink text-[14px]">
                  2. Estimador de Pendiente de Sen (Sen's Slope)
                </h4>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-pill">
                  Tasa Robusta
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">
                Calcula la pendiente entre cada par de fechas posibles y toma la <strong>mediana</strong> de todas ellas. Es inmune a errores de calibración en un satélite o a picos aislados de tormentas.
              </p>
            </div>

            <div className="border border-hairline/80 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-ink text-[14px]">
                  3. Regresión Lineal OLS con Bandas de Confianza al 95%
                </h4>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-pill">
                  Visual y Paramétrica
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">
                Traza la recta que minimiza la suma de las distancias al cuadrado. Las bandas sombreadas muestran con 95% de confianza dónde se encuentra la verdadera trayectoria de fondo.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Satellites of Earth Science */}
        <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-primary" />
            <h2 className="text-[20px] font-semibold text-ink tracking-tight">
              Los Ojos en el Espacio: Misiones de Observación Terrestre
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="font-semibold text-[13px] text-ink block">MODIS (Aqua & Terra)</span>
              <p className="text-[12px] text-muted mt-1">
                Monitorea temperatura superficial, incendios forestales, nubes y verdor de la vegetación (NDVI) desde 1999.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="font-semibold text-[13px] text-ink block">GPM (Global Precipitation)</span>
              <p className="text-[12px] text-muted mt-1">
                Constelación internacional liderada por NASA y JAXA que mide lluvia y nieve en todo el globo cada 3 horas.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="font-semibold text-[13px] text-ink block">AIRS & OMI (Atmosféricos)</span>
              <p className="text-[12px] text-muted mt-1">
                Miden el perfil térmico vertical de la atmósfera, humedad, vapor de agua y gases como el ozono y dióxido de azufre.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to practice */}
        <div className="bg-ink text-white rounded-xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-semibold">Pon a prueba tus habilidades</h3>
          <p className="text-[15px] text-[#A1A1A6] max-w-xl mx-auto">
            Abre el analizador y comprueba si puedes detectar la señal detrás del ruido en las 5 series de tiempo reales de la NASA.
          </p>
          <Link
            href="/analizar?dataset=temp_giss"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-[15px] font-medium text-ink bg-white rounded-pill hover:bg-surface-alt transition-all"
          >
            <span>Ir al Analizador</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
