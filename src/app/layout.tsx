import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";

export const metadata: Metadata = {
  title: "GEOTREND • Detección y Análisis de Tendencias de la Tierra | NASA Space Apps",
  description:
    "Herramienta interactiva para explorar variables satelitales de la NASA, visualizar series de tiempo y determinar qué está cambiando, cuánto y si las tendencias son estadísticamente significativas.",
  keywords: [
    "NASA Space Apps",
    "GEOTREND",
    "Cambio Climático",
    "Mann-Kendall",
    "Series de Tiempo",
    "Observación de la Tierra",
    "MODIS",
    "GPM",
    "GISTEMP",
  ],
  icons: {
    icon: "/images/logo-negro.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-surface text-ink antialiased">
        <FirebaseAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
