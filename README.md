# GEOTREND • Detección y Análisis de Tendencias de la Tierra
### Proyecto para el NASA Space Apps Challenge 2026

**GEOTREND** es una plataforma web interactiva y científica diseñada para abordar el desafío de la NASA sobre la selección de variables del sistema terrestre, la generación de series temporales y la determinación rigurosa de si los cambios observados son estadísticamente significativos ($p < 0.05$).

---

## 🌟 Características Principales

1. **Catálogo de Variables Satelitales:**
   - 13 variables de la Tierra organizadas en **Atmósfera**, **Océano**, **Tierra e Hidrología** y **Criosfera**.
   - Definiciones simples y accesibles para estudiantes de secundaria, universitarios y el público general ("Detectives de Datos").
   - Referencia directa a los instrumentos satelitales que las miden: **MODIS**, **AIRS**, **OMI**, **GPM**, **TOPEX/Jason/Sentinel-6**, **SMAP**, **SWOT** y modelos globales de asimilación (**MERRA-2**, **GLDAS**).

2. **Demostraciones Reales Calibradas:**
   - **Anomalía de Temperatura Superficial Global** (NASA GISS GISTEMP v4, 1980–2024).
   - **Concentración de CO₂ Atmosférico** (NOAA Mauna Loa & NASA OCO-2, 1980–2024).
   - **Extensión de Hielo Marino Ártico** (NSIDC / NASA Goddard Cryospheric Sciences, 1980–2024).
   - **Nivel Medio Global del Mar** (Altimetría Satelital NASA MEaSUREs, 1993–2024).
   - **Precipitación en la Cuenca Amazónica** (NASA Giovanni / GPM IMERG & MERRA-2, 2000–2024).

3. **Motor Estadístico Nativo de Alta Precisión:**
   - **Prueba No Paramétrica de Mann-Kendall:** Cálculo del estadístico $S$, varianza con corrección por empates $\text{Var}(S)$, estadístico normalizado $Z$ y valor $p$ bilateral (estándar OMM/NASA).
   - **Estimador de Pendiente de Sen (Sen's Slope):** Mediana de pendientes por pares para obtener la tasa de cambio real robusta ante anomalías climáticas extremas.
   - **Regresión Lineal por Mínimos Cuadrados Ordinarios (OLS):** Tasa de cambio, bondad de ajuste $R^2$, estadístico $t$ de Student y **bandas de intervalo de confianza al 95%**.
   - **Descomposición Estacional Aditiva:** Separación mediante medias móviles centradas (2x12 CMA) del ciclo anual repetitivo respecto de la tendencia secular a largo plazo.

4. **Las 4 Preguntas Clave del Desafío Respondidas:**
   - **¿Qué está cambiando?** Variable satelital y magnitud total observada.
   - **¿Dónde está cambiando?** Región geográfica o escala global.
   - **¿Cuánto está cambiando?** Tasa de cambio anualizada ($\Delta$/año y $\Delta$/década).
   - **¿Es estadísticamente significativo?** Evaluación con valor $p < 0.05$ y bandas de confianza al 95%.

5. **Carga de Datos Personalizados (CSV):**
   - Los usuarios pueden descargar series temporales desde **NASA Giovanni**, **AppEEARS**, **NOAA CDO** o **CUAHSI** y cargarlas directamente en GEOTREND para su análisis automático.

6. **Diseño y Experiencia Apple Minimalista:**
   - Estricto cumplimiento del sistema de diseño: tipografía SF Pro / Inter, azul de interacción `#0071E3`, lienzos `#F5F5F7` y `#FFFFFF`, botones píldora (`rounded-pill`), tarjetas suaves con sombra calmada y barra de navegación con desenfoque translúcido (`backdrop-filter: blur(20px)`).
   - Logotipo blanco adaptativo para fondos oscuros (Hero) y negro para fondos claros.
   - Totalmente en **español**.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

### Requisitos:
- **Node.js** v18 o superior (v20 recomendado).
- **npm** v9 o superior.

### Pasos:
```bash
# 1. Instalar dependencias (si no se han instalado)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. O compilar y ejecutar en modo producción
npm run build
npm run start
```

Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del Proyecto

```
├── public/
│   └── images/
│       ├── logo-blanco.png    # Logotipo en blanco (para hero y fondos oscuros)
│       └── logo-negro.png     # Logotipo en negro (para fondos claros y pie)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Layout principal con Navbar y Footer
│   │   ├── globals.css        # Variables CSS, clases glass y fuentes
│   │   ├── page.tsx           # Landing page cinematográfica
│   │   ├── explorar/page.tsx  # Catálogo interactivo de variables y asistente
│   │   ├── analizar/page.tsx  # Workspace con gráficos y tests estadísticos
│   │   ├── aprender/page.tsx  # Escuela del Detective de Datos
│   │   └── datos/page.tsx     # Directorio de portales oficiales NASA
│   ├── components/
│   │   ├── Navbar.tsx         # Barra de navegación con logo dinámico
│   │   ├── Footer.tsx         # Pie de página con aviso de fuentes NASA
│   │   ├── TimeSeriesChart.tsx# Gráfico interactivo SVG con capas y bandas 95%
│   │   └── StatisticalSummaryCard.tsx # Tarjeta de veredicto y 4 preguntas
│   ├── data/
│   │   ├── catalog.ts         # Metadatos de 13 variables terrestres
│   │   └── demoDatasets.ts    # 5 series temporales históricas reales
│   └── lib/
│       └── statistics/
│           ├── index.ts       # Orquestador del análisis completo
│           ├── mathUtils.ts   # Función erf, normal CDF y Student t CDF
│           ├── mannKendall.ts # Prueba Mann-Kendall y Sen's Slope
│           ├── linearRegression.ts # Regresión OLS, valor p y bandas 95%
│           └── seasonal.ts    # Descomposición estacional por medias móviles
├── tailwind.config.ts         # Tokens de diseño Apple
├── tsconfig.json              # Configuración TypeScript
└── package.json
```

---

## 🛰️ Fuentes Oficiales y Atribución
- **NASA GISS:** Goddard Institute for Space Studies (GISTEMP v4).
- **NASA GES DISC:** Giovanni Interactive Visualization & Hydrology Time Series.
- **NASA Earthdata / LP DAAC:** AppEEARS.
- **NOAA GML & NCEI:** Observatorio Mauna Loa y Climate Data Online.
- **NSIDC:** National Snow and Ice Data Center.
- **CSA / NASA / CNES:** Misión SWOT y RADARSAT.
