"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine whether to use dark or light styling
  // Home page has dark hero at top, then white sections
  const isDark = isHomePage && !scrolled;

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/explorar", label: "Explorar Variables" },
    { href: "/analizar", label: "Analizador de Tendencias" },
    { href: "/aprender", label: "Detective Climático" },
    { href: "/datos", label: "Fuentes NASA" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-apple ${
        isDark
          ? "apple-glass-dark text-white border-b border-white/10"
          : "apple-glass text-ink border-b border-hairline/70 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={isDark ? "/images/logo-blanco.png" : "/images/logo-negro.png"}
              alt="GEOTREND Logo"
              width={32}
              height={32}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>
          <span
            className={`font-semibold text-[17px] tracking-tight ${
              isDark ? "text-white" : "text-ink"
            }`}
          >
            GEOTREND
          </span>
          <span className="hidden md:inline-block text-[10px] font-medium px-2 py-0.5 rounded-pill bg-primary/10 text-primary border border-primary/20">
            NASA Space Apps
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[-0.01em] transition-colors ${
                  isActive
                    ? isDark
                      ? "text-white font-medium"
                      : "text-primary font-medium"
                    : isDark
                    ? "text-[#FFFFFFCC] hover:text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/analizar?dataset=temp_giss"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium text-white bg-primary hover:bg-primary-hover active:scale-[0.98] rounded-pill transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Detectar Tendencia</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-muted hover:text-ink focus:outline-none"
          aria-label="Alternar menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-6 space-y-2 border-b ${
            isDark
              ? "bg-[#1D1D1F] border-white/10 text-white"
              : "bg-surface border-hairline text-ink"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[15px] font-medium border-b border-hairline/20"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/analizar?dataset=temp_giss"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-[14px] font-medium text-white bg-primary rounded-pill"
            >
              <Sparkles className="w-4 h-4" />
              <span>Comenzar Análisis</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
