import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-hairline text-muted text-[12px] leading-relaxed pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer / Academic Note */}
        <div className="border-b border-hairline/80 pb-6 mb-8 text-[11px] leading-normal text-muted-light">
          <p className="mb-2">
            <strong>Aviso de Fuentes Científicas:</strong> GEOTREND ha sido desarrollado para el desafío NASA Space Apps Challenge 2026. Los datos de observación terrestre provienen de misiones satelitales operadas por NASA, NOAA, NSIDC y Copernicus. NASA no respalda ninguna entidad no gubernamental de terceros y los datos se presentan con fines estrictamente educativos y de investigación científica.
          </p>
          <p>
            Las pruebas estadísticas implementadas (Mann-Kendall, Estimador de pendiente de Sen y Regresión Lineal OLS con bandas de confianza al 95%) siguen los lineamientos de la Organización Meteorológica Mundial (OMM) y publicaciones de NASA Earth Science.
          </p>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-semibold text-ink mb-3 text-[12px]">GEOTREND</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/explorar" className="hover:text-ink transition-colors">
                  Catálogo de Variables
                </Link>
              </li>
              <li>
                <Link href="/analizar" className="hover:text-ink transition-colors">
                  Analizador Estadístico
                </Link>
              </li>
              <li>
                <Link href="/aprender" className="hover:text-ink transition-colors">
                  Detective Climático
                </Link>
              </li>
              <li>
                <Link href="/datos" className="hover:text-ink transition-colors">
                  Portales de Datos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-3 text-[12px]">Datos de la Tierra</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/analizar?dataset=temp_giss" className="hover:text-ink transition-colors">
                  Temperatura Global (GISS)
                </Link>
              </li>
              <li>
                <Link href="/analizar?dataset=co2_maunaloa" className="hover:text-ink transition-colors">
                  CO₂ Mauna Loa (NOAA/OCO-2)
                </Link>
              </li>
              <li>
                <Link href="/analizar?dataset=sea_ice_arctic" className="hover:text-ink transition-colors">
                  Hielo Ártico (NSIDC)
                </Link>
              </li>
              <li>
                <Link href="/analizar?dataset=sea_level" className="hover:text-ink transition-colors">
                  Nivel del Mar (Altimetría)
                </Link>
              </li>
              <li>
                <Link href="/analizar?dataset=precipitation_amazon" className="hover:text-ink transition-colors">
                  Lluvias en el Amazonas (GPM)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-3 text-[12px]">Portales NASA</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://giovanni.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  <span>NASA Giovanni</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://appeears.earthdatacloud.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  <span>NASA AppEEARS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://disc.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  <span>GES DISC Hydrology</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.giss.nasa.gov/gistemp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  <span>GISTEMP v4</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-ink mb-3 text-[12px]">Métodos Científicos</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-ink-secondary">Prueba de Mann-Kendall</span>
              </li>
              <li>
                <span className="text-ink-secondary">Estimador de Pendiente de Sen</span>
              </li>
              <li>
                <span className="text-ink-secondary">Regresión MCO y Valor p bilateral</span>
              </li>
              <li>
                <span className="text-ink-secondary">Descomposición Estacional Aditiva</span>
              </li>
              <li>
                <span className="text-ink-secondary">Intervalos de Confianza al 95%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-negro.png"
              alt="GEOTREND"
              width={22}
              height={22}
              className="opacity-70"
            />
            <span>
              Copyright © 2026 <strong>GEOTREND</strong>. Proyecto para el NASA Space Apps Challenge.
            </span>
          </div>

          <div className="flex items-center gap-4 text-muted-light">
            <div className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3.5 h-3.5" />
              <span>Español (Latinoamérica)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
