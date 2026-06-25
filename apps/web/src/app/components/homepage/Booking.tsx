"use client";

import { useState, useEffect } from "react";
import { useRegion } from "../../context/RegionContext";
import { apiRequest } from "../../../lib/api";

const consultTypes = [
  {
    id: "free",
    name: "Free Discovery Call",
    sub: "30 min — Understand your needs, zero obligation",
    priceIN: "FREE",
    priceINT: "FREE",
  },
  {
    id: "review",
    name: "Contract Review Session",
    sub: "60 min — Deep-dive into your specific document",
    priceIN: "₹2,499",
    priceINT: "$39",
  },
  {
    id: "audit",
    name: "Startup Legal Audit",
    sub: "90 min — Full legal health check for your startup",
    priceIN: "₹4,999",
    priceINT: "$79",
  },
  {
    id: "enterprise",
    name: "Enterprise Onboarding",
    sub: "Custom — Scope and quote for ongoing support",
    priceIN: "Custom",
    priceINT: "Custom",
  },
];

const services = [
  "Contract Drafting",
  "Contract / Document Review",
  "NDA / Confidentiality Agreement",
  "Startup Legal Pack",
  "Employment / HR Legal",
  "Brand / Endorsement Agreement",
  "Tech / SaaS Contracts",
  "Due Diligence",
  "MSME Compliance",
  "Something else",
];

export default function Booking() {
  const { region, selectedService } = useRegion();
  const [selectedType, setSelectedType] = useState("free");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // const validate = () => {
  //   if (!form.firstName.trim()) return 'First name is required';
  //   if (!form.lastName.trim()) return 'Last name is required';
  //   if (!form.email.trim() || !form.email.includes('@')) return 'Valid email is required';
  //   if (!form.phone.trim()) return 'Phone number is required';
  //   return null;
  // };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      return "Valid email is required";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      return "Valid phone number is required";
    if (!form.company.trim()) return "Company or organisation name is required";
    if (!form.service) return "Please select a service area";
    if (!form.message.trim()) return "Please briefly describe your situation";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          consultType:
            consultTypes.find((c) => c.id === selectedType)?.name ||
            selectedType,
          region: region === "IN" ? "INDIA" : "INTERNATIONAL",
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.72rem 0.95rem",
    border: "1.5px solid var(--border-strong)",
    borderRadius: "4px",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    color: "var(--ink)",
    background: "var(--paper)",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "0.7rem",
    fontWeight: 700 as const,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "var(--ink-soft)",
    marginBottom: "0.35rem",
    display: "block",
  };

  return (
    <section
      id="booking"
      style={{ background: "var(--paper-warm)", padding: "6rem 8vw" }}
      className="section-pad"
    >
      <div
        className="booking-layout"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.85rem",
            }}
          >
            Book a Consultation
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: "1rem",
            }}
          >
            Let's talk about what you need.
          </h2>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--ink-muted)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            First consultation is always free. No commitment, no pressure — just
            clarity on what your legal situation needs and what it will cost to
            resolve.
          </p>

          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--ink-soft)",
              marginBottom: "0.75rem",
            }}
          >
            Choose consultation type
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {consultTypes.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedType(c.id)}
                onMouseEnter={() => setHoveredType(c.id)}
                onMouseLeave={() => setHoveredType(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.25rem",
                  background:
                    selectedType === c.id ? "var(--gold-pale)" : "var(--white)",
                  border:
                    selectedType === c.id
                      ? "1.5px solid var(--gold)"
                      : hoveredType === c.id
                        ? "1.5px solid var(--ink-muted)"
                        : "1.5px solid var(--border)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.74rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.15rem",
                    }}
                  >
                    {c.sub}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--gold-dark)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    marginLeft: "1rem",
                  }}
                >
                  {region === "IN" ? c.priceIN : c.priceINT}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem",
              background: "var(--white)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.5rem",
              }}
            >
              What happens after you book?
            </div>
            {[
              "Confirmation on WhatsApp and email within 2 hours",
              "A calendar invite with a secure video call link",
              "A short intake form to help us prepare for your call",
              "Zero obligation — if we are not the right fit, we will say so",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  fontSize: "0.78rem",
                  color: "var(--ink-muted)",
                  marginBottom: "0.4rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: "var(--gold)",
                    flexShrink: 0,
                    fontWeight: 700,
                  }}
                >
                  →
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div
          style={{
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2.5rem",
          }}
        >
          {!submitted ? (
            <>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "1.5rem",
                }}
              >
                Book your slot
              </div>

              {error && (
                <div
                  style={{
                    background: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    marginBottom: "1rem",
                    fontSize: "0.82rem",
                    color: "#991B1B",
                  }}
                >
                  {error}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.85rem",
                  marginBottom: "0.85rem",
                }}
              >
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    placeholder="Rahul"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Sharma"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {[
                {
                  field: "email",
                  label: "Work Email",
                  placeholder: "rahul@company.com",
                  type: "email",
                },
                {
                  field: "phone",
                  label: "Phone / WhatsApp",
                  placeholder: "+91 98765 43210",
                  type: "tel",
                },
                {
                  field: "company",
                  label: "Company / Organisation",
                  placeholder: "Acme Pvt. Ltd.",
                  type: "text",
                },
              ].map((f) => (
                <div key={f.field} style={{ marginBottom: "0.85rem" }}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.field as keyof typeof form]}
                    onChange={(e) => handleChange(f.field, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}

              <div style={{ marginBottom: "0.85rem" }}>
                <label style={labelStyle}>What do you need help with?</label>
                <select
                  value={form.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select a service area</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "0.85rem" }}>
                <label style={labelStyle}>
                  Briefly describe your situation
                </label>
                <textarea
                  placeholder="e.g. I need an NDA reviewed before a partnership meeting next week..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                onMouseEnter={() => setHoveredSubmit(true)}
                onMouseLeave={() => setHoveredSubmit(false)}
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "1rem",
                  background: loading
                    ? "var(--ink-muted)"
                    : hoveredSubmit
                      ? "var(--gold)"
                      : "var(--ink)",
                  color:
                    hoveredSubmit && !loading ? "var(--ink)" : "var(--white)",
                  border: "none",
                  borderRadius: "4px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                {loading
                  ? "Submitting..."
                  : "Confirm Booking — Free Consultation"}
              </button>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "var(--ink-faint)",
                  textAlign: "center",
                  marginTop: "0.75rem",
                }}
              >
                Your information is encrypted and never shared. Confirmation
                within 2 hours.
              </p>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.75rem",
                }}
              >
                You are booked in!
              </div>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                }}
              >
                Confirmation coming to your email and WhatsApp within 2 hours.
                Looking forward to speaking with you.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
