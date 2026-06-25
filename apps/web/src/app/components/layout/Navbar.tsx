"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// const navLinks = [
//   { label: 'Services', href: '#services' },
//   { label: 'One-Time Review', href: '#on-demand' },
//   { label: 'Pricing', href: '#pricing' },
//   { label: 'How It Works', href: '#process' },
//   { label: 'About', href: '#about' },
// ];

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "One-Time Review", href: "/#on-demand" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#process" },
  { label: "About", href: "/#about" },
];

const resourceLinks = [
  {
    label: "Legal Health Score",
    href: "/legal-health-score",
    tag: "Free Tool",
    desc: "Score your legal risk in 3 mins",
  },
  {
    label: "Blog & Guides",
    href: "/resources",
    tag: "SEO",
    desc: "Templates, articles, and playbooks",
  },
  {
    label: "Press & Media Kit",
    href: "/press",
    tag: "",
    desc: "Coverage, assets, and brand info",
  },
  {
    label: "Careers",
    href: "/careers",
    tag: "",
    desc: "Join the LexEdge team",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredResource, setHoveredResource] = useState<string | null>(null);
  //const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "66px",
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(248,245,240,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.45rem",
            fontWeight: 900,
            color: "var(--ink)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          Lex<span style={{ color: "var(--gold)" }}>Edge</span>
        </Link>

        {/* Desktop links */}
        <ul
          className="nav-desktop-links"
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          {navLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                style={{
                  textDecoration: "none",
                  color:
                    hoveredLink === item.href
                      ? "var(--ink)"
                      : "var(--ink-muted)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={() => setHoveredLink(item.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.label}
              </a>
            </li>
          ))}

          {/* Resources dropdown */}
          <li style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: resourcesOpen ? "var(--ink)" : "var(--ink-muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: 0,
                transition: "color 0.2s",
              }}
            >
              Resources
              <span
                style={{
                  fontSize: "0.65rem",
                  transition: "transform 0.2s",
                  transform: resourcesOpen ? "rotate(180deg)" : "none",
                  display: "block",
                }}
              >
                ▾
              </span>
            </button>

            {resourcesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 1rem)",
                  right: "-1rem",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "0.5rem",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                  width: "280px",
                  zIndex: 200,
                }}
              >
                {resourceLinks.map((r) => (
                  <button
                    key={r.href}
                    onClick={() => {
                      window.location.href = r.href;
                      setResourcesOpen(false);
                    }}
                    onMouseEnter={() => setHoveredResource(r.href)}
                    onMouseLeave={() => setHoveredResource(null)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      background:
                        hoveredResource === r.href
                          ? "var(--paper)"
                          : "transparent",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-body)",
                      transition: "background 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--ink)",
                          marginBottom: "0.15rem",
                        }}
                      >
                        {r.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {r.desc}
                      </div>
                    </div>
                    {r.tag && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--gold-dark)",
                          border: "1px solid var(--gold)",
                          padding: "0.15rem 0.4rem",
                          borderRadius: "2px",
                          flexShrink: 0,
                        }}
                      >
                        {r.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexShrink: 0,
          }}
        >
          {/* <Link href="/portal" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink-muted)', textDecoration: 'none' }}>
            Client Login
          </Link> */}
          <button
            onClick={() => (window.location.href = "/sign-in")}
            style={{
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--ink-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            Client Login
          </button>
          <a
            href="/#booking"
            style={{
              background: "var(--ink)",
              color: "var(--white)",
              padding: "0.55rem 1.25rem",
              borderRadius: "4px",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--white)";
            }}
          >
            Free Consultation
          </a>

          <button
            className="nav-mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: "22px",
                height: "2px",
                background: "var(--ink)",
                display: "block",
                borderRadius: "2px",
                transition: "all 0.2s",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: "22px",
                height: "2px",
                background: "var(--ink)",
                display: "block",
                borderRadius: "2px",
                transition: "all 0.2s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "22px",
                height: "2px",
                background: "var(--ink)",
                display: "block",
                borderRadius: "2px",
                transition: "all 0.2s",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "66px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: "var(--paper)",
            borderBottom: "1px solid var(--border)",
            padding: "1.5rem 5vw 2rem",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          {[
            ...navLinks,
            ...resourceLinks.map((r) => ({ label: r.label, href: r.href })),
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "var(--ink)",
                fontSize: "1rem",
                fontWeight: 500,
                padding: "1rem 0",
                borderBottom: "1px solid var(--border)",
                display: "block",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/portal"
            style={{
              textDecoration: "none",
              color: "var(--ink-muted)",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "1rem 0",
              borderBottom: "1px solid var(--border)",
              display: "block",
            }}
          >
            Client Login
          </a>
          <a
            href="/#booking"
            onClick={() => setMenuOpen(false)}
            style={{
              background: "var(--ink)",
              color: "var(--white)",
              padding: "0.9rem 1.25rem",
              borderRadius: "4px",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              marginTop: "1.25rem",
              display: "block",
            }}
          >
            Book Free Consultation
          </a>
        </div>
      )}
    </>
  );
}
