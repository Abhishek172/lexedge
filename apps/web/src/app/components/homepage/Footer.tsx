"use client";

import { useState } from "react";

const footerLinks = {
  Services: [
    { label: "Contract Drafting", href: "#services" },
    { label: "Document Review", href: "#services" },
    { label: "On-Demand Review", href: "#on-demand" },
    { label: "NDA & Confidentiality", href: "#services" },
    { label: "Startup Legal Pack", href: "#services" },
    { label: "Brand & Endorsements", href: "#services" },
  ],
  Platform: [
    { label: "Client Login", href: "/portal" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#process" },
    { label: "Resources", href: "/resources" },
    { label: "Careers", href: "/careers" },
    { label: "Book a Call", href: "#booking" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Refund Policy", href: "/refunds" },
    { label: "DPDPA Compliance", href: "/dpdpa" },
  ],
};

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer style={{ background: "var(--ink)", padding: "4.5rem 8vw 2.5rem" }}>
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          marginBottom: "2rem",
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              fontWeight: 900,
              color: "var(--white)",
              marginBottom: "0.85rem",
            }}
          >
            Lex<span style={{ color: "var(--gold)" }}>Edge</span>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7,
              maxWidth: "270px",
              marginBottom: "1.5rem",
            }}
          >
            India's online corporate legal platform — built for startups, MSMEs,
            and businesses that cannot afford to get contracts wrong.
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.18)",
              lineHeight: 1.65,
              maxWidth: "270px",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            LexEdge is not a law firm. Legal services are provided by a
            qualified legal professional. This website does not constitute legal
            advice. Engaging our services does not create an attorney-client
            relationship until a formal engagement letter is signed.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([col, links]) => (
          <div key={col}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              {col}
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
              }}
            >
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      window.location.href = link.href;
                    }}
                    style={{
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.4)",
                      transition: "color 0.2s",
                      display: "block",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
          2025 LexEdge. All rights reserved. Registered in India.
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { id: "li", label: "in", href: "https://linkedin.com" },
            { id: "tw", label: "X", href: "https://x.com" },
            { id: "wa", label: "W", href: "https://wa.me/91XXXXXXXXXX" },
            { id: "ig", label: "IG", href: "https://instagram.com" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => window.open(s.href, "_blank")}
              onMouseEnter={() => setHoveredSocial(s.id)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border:
                  hoveredSocial === s.id
                    ? "1px solid var(--gold)"
                    : "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color:
                  hoveredSocial === s.id
                    ? "var(--gold)"
                    : "rgba(255,255,255,0.4)",
                transition: "all 0.2s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
