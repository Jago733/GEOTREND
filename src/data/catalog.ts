export interface EarthVariable {
  id: string;
  name: string;
  domain: "atmosfera" | "oceano" | "tierra" | "criosfera";
  domainLabel: string;
  unit: string;
  instrument: string;
  platform: string;
  frequency: "Mensual" | "Anual" | "Diario" | "Diario / Mensual";
  timeSpan: string;
  simpleDefinition: string;
  scientificContext: string;
  regions: { id: string; name: string; default?: boolean }[];
  demoAvailable: boolean;
  sampleDatasetKey?: string;
  nasaDataSource: string;
}

export const EARTH_VARIABLES: EarthVariable[] = [
  {
    id: "temp_giss",
    name: "Anomalía de Temperatura Global",
    domain: "atmosfera",
    domainLabel: "Atmósfera y Clima",
    unit: "°C",
    instrument: "AIRS / MODIS / Termómetros in-situ",
    platform: "Satélites Aqua, Terra y Red Global GISTEMP",
    frequency: "Mensual",
    timeSpan: "1980 - 2024",
    simpleDefinition:
      "Mide cuánto más caliente o más frío estuvo el planeta en comparación con el promedio histórico de 1951-1980.",
    scientificContext:
      "El índice GISTEMP v4 de NASA GISS combina mediciones satelitales con estaciones meteorológicas terrestres para rastrear el calentamiento global.",
    regions: [
      { id: "global", name: "Promedio Global", default: true },
      { id: "northern_hemisphere", name: "Hemisferio Norte" },
      { id: "southern_hemisphere", name: "Hemisferio Sur" },
      { id: "tropics", name: "Trópicos (23.6°N - 23.6°S)" },
    ],
    demoAvailable: true,
    sampleDatasetKey: "temp_giss",
    nasaDataSource: "NASA Goddard Institute for Space Studies (GISS)",
  },
  {
    id: "co2_maunaloa",
    name: "Dióxido de Carbono Atmosférico (CO₂)",
    domain: "atmosfera",
    domainLabel: "Atmósfera y Clima",
    unit: "ppm",
    instrument: "OCO-2 / AIRS / Sensor NDIR",
    platform: "Orbiting Carbon Observatory-2 & Observatorio Mauna Loa",
    frequency: "Mensual",
    timeSpan: "1980 - 2024",
    simpleDefinition:
      "La cantidad de moléculas de CO₂ por cada millón de moléculas en el aire. Es el principal gas de efecto invernadero emitido por actividades humanas.",
    scientificContext:
      "Muestra la icónica 'Curva de Keeling': un aumento continuo a largo plazo junto con una oscilación anual provocada por la fotosíntesis estacional de los bosques boreales.",
    regions: [
      { id: "mauna_loa", name: "Mauna Loa, Hawái", default: true },
      { id: "global_marine", name: "Red Global Marina (NOAA/NASA)" },
    ],
    demoAvailable: true,
    sampleDatasetKey: "co2_maunaloa",
    nasaDataSource: "NOAA GML & NASA OCO-2 Science Team",
  },
  {
    id: "sea_ice_arctic",
    name: "Extensión de Hielo Marino Ártico",
    domain: "criosfera",
    domainLabel: "Criosfera e Hielo",
    unit: "Millones de km²",
    instrument: "SSMIS / AMSR2 / SMMR",
    platform: "Satélites DMSP y GCOM-W1 (Procesado por NASA GSFC)",
    frequency: "Mensual",
    timeSpan: "1980 - 2024",
    simpleDefinition:
      "Área total del océano Ártico que tiene al menos un 15% de cobertura de hielo flotante.",
    scientificContext:
      "El hielo polar refleja la radiación solar hacia el espacio (efecto albedo). Su reducción acelera el calentamiento del agua polar en un bucle de retroalimentación positiva.",
    regions: [
      { id: "arctic_september", name: "Mínimo de Septiembre (Ártico)", default: true },
      { id: "arctic_monthly", name: "Ciclo Mensual Completo Ártico" },
    ],
    demoAvailable: true,
    sampleDatasetKey: "sea_ice_arctic",
    nasaDataSource: "National Snow and Ice Data Center (NSIDC) / NASA GSFC",
  },
  {
    id: "sea_level",
    name: "Nivel Medio Global del Mar",
    domain: "oceano",
    domainLabel: "Océanos",
    unit: "mm (anomalía)",
    instrument: "Poseidon Altimeter / AMR / DORIS",
    platform: "TOPEX/Poseidon, Jason-1, 2, 3 & Sentinel-6 Michael Freilich",
    frequency: "Mensual",
    timeSpan: "1993 - 2024",
    simpleDefinition:
      "La altura media de la superficie de los océanos medida desde el espacio con radar satelital de alta precisión.",
    scientificContext:
      "El ascenso del nivel del mar resulta de dos procesos impulsados por el calentamiento: la expansión térmica del agua marina y el derretimiento de glaciares terrestres y mantos de hielo.",
    regions: [
      { id: "global_ocean", name: "Océano Global", default: true },
      { id: "atlantic", name: "Océano Atlántico Norte" },
      { id: "pacific", name: "Océano Pacífico Tropical" },
    ],
    demoAvailable: true,
    sampleDatasetKey: "sea_level",
    nasaDataSource: "NASA Sea Level Change Portal / MEaSUREs Program",
  },
  {
    id: "precipitation_amazon",
    name: "Precipitación en la Cuenca Amazónica",
    domain: "tierra",
    domainLabel: "Tierra e Hidrología",
    unit: "mm / mes",
    instrument: "DPR / GMI / Reanálisis MERRA-2",
    platform: "Global Precipitation Measurement (GPM) & GLDAS",
    frequency: "Mensual",
    timeSpan: "2000 - 2024",
    simpleDefinition:
      "Milímetros de lluvia acumulada por metro cuadrado cada mes sobre la selva tropical del Amazonas.",
    scientificContext:
      "La selva genera gran parte de su propia lluvia mediante evapotranspiración ('ríos voladores'). El monitoreo por satélite detecta si la estación seca se está alargando o intensificando.",
    regions: [
      { id: "amazon_basin", name: "Cuenca Amazónica Central", default: true },
      { id: "southern_amazon", name: "Arco de Deforestación (Sur del Amazonas)" },
    ],
    demoAvailable: true,
    sampleDatasetKey: "precipitation_amazon",
    nasaDataSource: "NASA Giovanni / GPM IMERG / MERRA-2",
  },
  {
    id: "ozone_omi",
    name: "Columna Total de Ozono Estratosférico",
    domain: "atmosfera",
    domainLabel: "Atmósfera y Clima",
    unit: "Unidades Dobson (DU)",
    instrument: "OMI / OMPS / TOMS",
    platform: "Aura Satellite & Suomi-NPP",
    frequency: "Mensual",
    timeSpan: "1980 - 2024",
    simpleDefinition:
      "Cantidad de gas ozono presente en la alta atmósfera que protege la vida terrestre de los dañinos rayos ultravioleta.",
    scientificContext:
      "Permite seguir la recuperación del agujero de ozono antártico tras la implementación del Protocolo de Montreal.",
    regions: [
      { id: "antarctica", name: "Antártida (Primavera Austral)" },
      { id: "global_ozone", name: "Promedio Global de Ozono" },
    ],
    demoAvailable: false,
    nasaDataSource: "NASA Ozone Watch / Goddard Space Flight Center",
  },
  {
    id: "ndvi_modis",
    name: "Índice de Vegetación de Diferencia Normalizada (NDVI)",
    domain: "tierra",
    domainLabel: "Tierra e Hidrología",
    unit: "Índice (-0.2 a 1.0)",
    instrument: "MODIS (Bandas Roja e Infrarrojo Cercano)",
    platform: "Satélites Terra y Aqua",
    frequency: "Mensual",
    timeSpan: "2000 - 2024",
    simpleDefinition:
      "Indicador satelital de cuán verde, densa y fotosintéticamente activa está la vegetación en la superficie.",
    scientificContext:
      "Útil para monitorear el verdor global ('Global Greening'), sequías agrícolas y degradación de pastizales.",
    regions: [
      { id: "sahel", name: "Región del Sahel (África)" },
      { id: "iberian_peninsula", name: "Península Ibérica" },
    ],
    demoAvailable: false,
    nasaDataSource: "NASA AppEEARS / LP DAAC",
  },
  {
    id: "soil_moisture_smap",
    name: "Humedad del Suelo en Superficie",
    domain: "tierra",
    domainLabel: "Tierra e Hidrología",
    unit: "cm³ / cm³",
    instrument: "Radiómetro de Banda L",
    platform: "Soil Moisture Active Passive (SMAP)",
    frequency: "Diario / Mensual",
    timeSpan: "2015 - 2024",
    simpleDefinition:
      "Volumen de agua líquida contenida en los primeros 5 centímetros del suelo.",
    scientificContext:
      "Crucial para predecir sequías agrícolas, modelar inundaciones y evaluar el ciclo del agua continental.",
    regions: [
      { id: "us_midwest", name: "Medio Oeste de EE. UU." },
      { id: "pampas", name: "Pampas Argentinas" },
    ],
    demoAvailable: false,
    nasaDataSource: "NASA National Snow and Ice Data Center (NSIDC DAAC)",
  },
  {
    id: "methane_tropomi",
    name: "Concentración de Metano Atmosférico (CH₄)",
    domain: "atmosfera",
    domainLabel: "Atmósfera y Clima",
    unit: "ppb (partes por mil millones)",
    instrument: "TROPOMI / AIRS",
    platform: "Sentinel-5P & Aqua",
    frequency: "Mensual",
    timeSpan: "2003 - 2024",
    simpleDefinition:
      "Un potente gas de efecto invernadero con un poder de calentamiento 28 veces superior al CO₂ a 100 años.",
    scientificContext:
      "Monitorea emisiones de humedales tropicales, agricultura y fugas en la industria de hidrocarburos.",
    regions: [
      { id: "global_ch4", name: "Promedio Global Troposférico" },
      { id: "permian_basin", name: "Cuenca Pérmica (Texas/Nuevo México)" },
    ],
    demoAvailable: false,
    nasaDataSource: "NASA GES DISC / Copernicus Open Access",
  },
];
