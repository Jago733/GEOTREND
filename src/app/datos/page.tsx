import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Database,
  CloudDownload,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function DatosPage() {
  const portals = [
    {
      name: "NASA Giovanni",
      institution: "NASA Goddard Space Flight Center (GSFC)",
      url: "https://giovanni.gsfc.nasa.gov/",
      description:
        "Herramienta web interactiva que ofrece menús de cientos de variables de la Tierra y permite generar series de tiempo y descargar datos en CSV sin necesidad de programación.",
      tags: ["Atmósfera", "Aerosoles", "Lluvia GPM", "Temperatura"],
      stepGuide:
        "1. Selecciona la variable (ej. Precipitación GPM) -> 2. Dibuja tu caja de coordenadas (Bounding Box) -> 3. Elige 'Time Series, Area-Averaged' -> 4. Haz clic en 'Plot Data' y descarga el archivo CSV.",
    },
    {
      name: "NASA AppEEARS",
      institution: "NASA Earthdata Cloud / LP DAAC",
      url: "https://appeears.earthdatacloud.nasa.gov/",
      description:
        "Permite transformar y extraer subconjuntos de datos geoespaciales de archivos federales. Ideal para series temporales de vegetación MODIS (NDVI, EVI) y temperatura de superficie.",
      tags: ["MODIS", "ECOSTRESS", "Vegetación", "Suelos"],
      stepGuide:
        "Inicia sesión con tu cuenta gratuita de NASA Earthdata, define tu polígono de interés y solicita la extracción temporal.",
    },
    {
      name: "NASA GES DISC Hydrology Time Series",
      institution: "NASA Goddard Earth Sciences Data & Information Services Center",
      url: "https://disc.gsfc.nasa.gov/information/tools?title=Hydrology%20Time%20Series",
      description:
        "Herramienta especializada para la generación de series de tiempo hidrológicas a partir de los modelos de asimilación GLDAS y NLDAS.",
      tags: ["Humedad del Suelo", "Evapotranspiración", "Escorrentía"],
      stepGuide:
        "Accede al portal, busca el producto GLDAS mensual y selecciona la opción de serie temporal para tu cuenca.",
    },
    {
      name: "NOAA Climate Data Online (CDO)",
      institution: "National Centers for Environmental Information (NCEI)",
      url: "https://www.ncei.noaa.gov/cdo-web/",
      description:
        "Proporciona acceso libre al archivo global de datos climáticos y meteorológicos históricos de estaciones de superficie y boyas oceánicas.",
      tags: ["Estaciones Terrestres", "Temperaturas Históricas", "Boyas"],
      stepGuide:
        "Usa la herramienta de mapas para seleccionar estaciones cercanas y exportar series de tiempo.",
    },
    {
      name: "KNMI Climate Explorer",
      institution: "Royal Netherlands Meteorological Institute",
      url: "https://climexp.knmi.nl/",
      description:
        "Potente motor de análisis científico desarrollado por el instituto neerlandés para correlacionar y descargar series de tiempo climáticas globales.",
      tags: ["Reanálisis ERA5", "Índices Climáticos", "El Niño / SOI"],
      stepGuide:
        "Navega en 'Monthly climate indices' o 'Daily station data' para generar series en formato texto o CSV.",
    },
    {
      name: "Misión SWOT & CSA (Canadian Space Agency)",
      institution: "NASA / CNES / CSA / UKSA",
      url: "https://www.asc-csa.gc.ca/eng/satellites/swot/",
      description:
        "La misión satelital Surface Water and Ocean Topography (SWOT) mide la elevación del agua superficial en más del 90% de los lagos, ríos y océanos del planeta con resolución radar milimétrica.",
      tags: ["Ríos", "Lagos", "Nivel del Mar", "Radar Altimetría"],
      stepGuide:
        "Explora los productos de elevación de cuerpos de agua continental en los portales PO.DAAC de NASA.",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-alt min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary text-[13px] font-semibold tracking-wider uppercase">
            Ecosistema de Datos Abiertos
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink mt-2">
            Portales y Recursos Oficiales de la NASA
          </h1>
          <p className="text-[17px] text-muted mt-3">
            GEOTREND se conecta conceptual y analíticamente con las plataformas científicas líderes. Descarga series de tiempo de estos portales y cárgalas en nuestro analizador.
          </p>
        </div>

        {/* How to import external data card */}
        <div className="bg-surface rounded-xl p-6 sm:p-8 border border-hairline/80 shadow-apple mb-12">
          <div className="flex items-center gap-2 mb-3">
            <CloudDownload className="w-5 h-5 text-primary" />
            <h2 className="text-[19px] font-semibold text-ink tracking-tight">
              ¿Cómo cargar tus propios datos en GEOTREND?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="text-primary font-bold text-[15px] block mb-1">
                Paso 1: Descarga
              </span>
              <p className="text-[13px] text-muted leading-relaxed">
                Ve a NASA Giovanni o NOAA CDO, selecciona tu variable y rango de fechas, y descarga el archivo de serie de tiempo en formato <strong>.CSV</strong>.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="text-primary font-bold text-[15px] block mb-1">
                Paso 2: Formato
              </span>
              <p className="text-[13px] text-muted leading-relaxed">
                Asegúrate de que el archivo tenga dos columnas: <strong>Fecha</strong> (ej. 2010-01) y <strong>Valor numérico</strong> (ej. 24.5).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-surface-alt border border-hairline/60">
              <span className="text-primary font-bold text-[15px] block mb-1">
                Paso 3: Analiza
              </span>
              <p className="text-[13px] text-muted leading-relaxed">
                En GEOTREND, ve a <strong>Analizador de Tendencias</strong>, haz clic en <strong>"Cargar CSV"</strong> y el sistema calculará al instante Mann-Kendall, Sen's slope e intervalos de confianza.
              </p>
            </div>
          </div>
        </div>

        {/* Portals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-xl border border-hairline/80 shadow-apple p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                    {portal.institution}
                  </span>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-[20px] font-semibold text-ink tracking-tight mb-2">
                  {portal.name}
                </h3>

                <p className="text-[13px] text-muted leading-relaxed mb-4">
                  {portal.description}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {portal.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-pill bg-surface-alt border border-hairline text-ink-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="p-3 bg-surface-alt rounded-lg border border-hairline/60 text-[12px] text-muted-light">
                  <strong className="text-ink font-medium block mb-1">
                    Guía de Extracción:
                  </strong>
                  {portal.stepGuide}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline/60 flex items-center justify-between">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-link hover:underline"
                >
                  <span>Abrir Portal Externo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href="/analizar?dataset=temp_giss"
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline"
                >
                  <span>Ver Demo Relacionada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
