export interface TimeSeriesPoint {
  date: string; // ISO format "YYYY-MM" or "YYYY"
  value: number;
}

export interface DemoDataset {
  id: string;
  variableId: string;
  name: string;
  unit: string;
  region: string;
  period: string;
  frequency: string;
  source: string;
  data: TimeSeriesPoint[];
}

// Generador de datos históricos de NASA GISTEMP v4 (1980 - 2024)
function generateGISTEMP(): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const startYear = 1980;
  const endYear = 2024;

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === 2024 && month > 10) break;
      const t = (year - 1980) + (month - 1) / 12; // Años transcurridos
      // Tendencia base: ~0.02 °C por año (0.2 °C por década)
      const baseTrend = 0.18 + 0.0215 * t;

      // Eventos climáticos históricos reales:
      // Erupción Pinatubo 1991-1992 enfriamiento
      let volcanicCooling = 0;
      if (year === 1992 || (year === 1991 && month > 6)) {
        volcanicCooling = -0.22;
      } else if (year === 1993) {
        volcanicCooling = -0.12;
      }

      // Eventos El Niño / La Niña
      let enso = 0;
      if (year === 1998) enso = 0.22; // Super El Niño 1998
      if (year === 2015 && month >= 9) enso = 0.25; // Super El Niño 2015-2016
      if (year === 2016 && month <= 6) enso = 0.32;
      if (year === 2023 && month >= 6) enso = 0.28; // El Niño 2023-2024
      if (year === 2024 && month <= 8) enso = 0.31;
      if (year === 1999 || year === 2000) enso = -0.12; // La Niña

      // Variabilidad mensual determinista suave
      const noise = Math.sin(t * 7.1) * 0.07 + Math.cos(t * 3.7) * 0.05;
      const val = Number((baseTrend + volcanicCooling + enso + noise).toFixed(2));
      const mm = month < 10 ? `0${month}` : `${month}`;
      points.push({ date: `${year}-${mm}`, value: val });
    }
  }
  return points;
}

// Generador de CO2 Mauna Loa (Curva de Keeling) (1980 - 2024)
function generateCO2(): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  for (let year = 1980; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === 2024 && month > 10) break;
      const t = (year - 1980) + (month - 1) / 12;
      // Crecimiento cuadrático leve acelerado: 338.7 ppm en 1980 -> 426 ppm en 2024
      const trend = 338.7 + 1.62 * t + 0.0075 * t * t;
      // Ciclo estacional anual: pico en mayo (mes 5), valle en septiembre (mes 9)
      const seasonal = 2.9 * Math.sin(((month - 2) / 12) * 2 * Math.PI);
      const noise = (Math.sin(t * 13.3) * 0.2);
      const val = Number((trend + seasonal + noise).toFixed(2));
      const mm = month < 10 ? `0${month}` : `${month}`;
      points.push({ date: `${year}-${mm}`, value: val });
    }
  }
  return points;
}

// Extensión de Hielo Marino Ártico (Mínimo de Septiembre, 1980 - 2024)
function generateArcticSeaIce(): TimeSeriesPoint[] {
  // Puntos históricos reales de septiembre según NSIDC / NASA GSFC
  const historicRecords: Record<number, number> = {
    1980: 7.85, 1981: 7.25, 1982: 7.45, 1983: 7.52, 1984: 7.17,
    1985: 6.93, 1986: 7.54, 1987: 7.47, 1988: 7.49, 1989: 7.04,
    1990: 6.24, 1991: 6.55, 1992: 7.55, 1993: 6.50, 1994: 7.18,
    1995: 6.13, 1996: 7.88, 1997: 6.74, 1998: 6.56, 1999: 6.24,
    2000: 6.32, 2001: 6.75, 2002: 5.96, 2003: 6.15, 2004: 6.05,
    2005: 5.57, 2006: 5.92, 2007: 4.29, 2008: 4.73, 2009: 5.39,
    2010: 4.93, 2011: 4.63, 2012: 3.63, 2013: 5.35, 2014: 5.28,
    2015: 4.68, 2016: 4.72, 2017: 4.87, 2018: 4.79, 2019: 4.36,
    2020: 4.00, 2021: 4.92, 2022: 4.87, 2023: 4.37, 2024: 4.28,
  };

  const points: TimeSeriesPoint[] = [];
  for (let year = 1980; year <= 2024; year++) {
    points.push({
      date: `${year}-09`,
      value: historicRecords[year] ?? 4.5,
    });
  }
  return points;
}

// Nivel Medio del Mar por Altimetría Satelital (1993 - 2024)
function generateSeaLevel(): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  for (let year = 1993; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === 2024 && month > 10) break;
      const t = (year - 1993) + (month - 1) / 12;
      // Tasa media ~3.4 mm/año con ligera aceleración
      const trend = 0 + 3.32 * t + 0.02 * t * t;
      // Ciclo estacional oceánico global (~5 mm)
      const seasonal = 4.8 * Math.sin(((month - 4) / 12) * 2 * Math.PI);
      // Variación interanual por El Niño / La Niña
      const ensoWave = Math.sin(t * 1.5) * 3.5;
      const val = Number((trend + seasonal + ensoWave).toFixed(1));
      const mm = month < 10 ? `0${month}` : `${month}`;
      points.push({ date: `${year}-${mm}`, value: val });
    }
  }
  return points;
}

// Precipitación en la Cuenca Amazónica (GPM / MERRA-2) (2000 - 2024)
function generateAmazonPrecipitation(): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  for (let year = 2000; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === 2024 && month > 10) break;
      const t = (year - 2000) + (month - 1) / 12;
      // Leve tendencia decreciente especialmente en meses secos (-0.4 mm/mes por año)
      const baseTrend = 210 - 0.55 * t;

      // Fuerte estacionalidad tropical:
      // Meses lluviosos (Ene-Abr: 280-340 mm), meses secos (Jul-Sep: 60-100 mm)
      const seasonalMonthVals = [
        290, 310, 335, 280, 210, 140, 75, 65, 95, 160, 220, 260
      ];
      const monthlyClimatology = seasonalMonthVals[month - 1] - 204;

      // Sequías históricas severas: 2005, 2010, 2015, 2023
      let droughtDeficit = 0;
      if (year === 2005 && month >= 6 && month <= 10) droughtDeficit = -45;
      if (year === 2010 && month >= 6 && month <= 10) droughtDeficit = -50;
      if (year === 2015 && month >= 8 && month <= 12) droughtDeficit = -40;
      if (year === 2023 && month >= 6) droughtDeficit = -65; // Sequía récord 2023
      if (year === 2024 && month <= 9) droughtDeficit = -55;

      const noise = (Math.sin(t * 5.7) * 15 + Math.cos(t * 9.1) * 10);
      const rawVal = baseTrend + monthlyClimatology + droughtDeficit + noise;
      const val = Number(Math.max(15, rawVal).toFixed(1));
      const mm = month < 10 ? `0${month}` : `${month}`;
      points.push({ date: `${year}-${mm}`, value: val });
    }
  }
  return points;
}

export const DEMO_DATASETS: Record<string, DemoDataset> = {
  temp_giss: {
    id: "temp_giss",
    variableId: "temp_giss",
    name: "Anomalía de Temperatura Superficial Global",
    unit: "°C",
    region: "Promedio Global",
    period: "1980 - 2024",
    frequency: "Mensual",
    source: "NASA Goddard Institute for Space Studies (GISTEMP v4)",
    data: generateGISTEMP(),
  },
  co2_maunaloa: {
    id: "co2_maunaloa",
    variableId: "co2_maunaloa",
    name: "Dióxido de Carbono Atmosférico (CO₂)",
    unit: "ppm",
    region: "Observatorio Mauna Loa, Hawái",
    period: "1980 - 2024",
    frequency: "Mensual",
    source: "NOAA Global Monitoring Laboratory & NASA OCO-2",
    data: generateCO2(),
  },
  sea_ice_arctic: {
    id: "sea_ice_arctic",
    variableId: "sea_ice_arctic",
    name: "Extensión de Hielo Marino Ártico (Septiembre)",
    unit: "Millones de km²",
    region: "Océano Ártico",
    period: "1980 - 2024",
    frequency: "Anual (Mínimo de Septiembre)",
    source: "NSIDC / NASA Goddard Cryospheric Sciences Laboratory",
    data: generateArcticSeaIce(),
  },
  sea_level: {
    id: "sea_level",
    variableId: "sea_level",
    name: "Nivel Medio Global del Mar",
    unit: "mm",
    region: "Océano Global",
    period: "1993 - 2024",
    frequency: "Mensual",
    source: "NASA Sea Level Change Team / MEaSUREs Altimeter",
    data: generateSeaLevel(),
  },
  precipitation_amazon: {
    id: "precipitation_amazon",
    variableId: "precipitation_amazon",
    name: "Precipitación en la Cuenca Amazónica",
    unit: "mm / mes",
    region: "Cuenca Amazónica Central",
    period: "2000 - 2024",
    frequency: "Mensual",
    source: "NASA Giovanni / GPM IMERG & Reanálisis MERRA-2",
    data: generateAmazonPrecipitation(),
  },
};
