"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiRequest } from "../../../../lib/api";

const servicePricing: Record<string, { priceIN: number; priceINT: number }> = {
  "Contract Drafting & Review": { priceIN: 2999, priceINT: 49 },
  "NDA & Confidentiality": { priceIN: 2999, priceINT: 49 },
  "Startup Legal Pack": { priceIN: 9999, priceINT: 149 },
  "Vendor & Procurement": { priceIN: 3999, priceINT: 69 },
  "Brand & Endorsement": { priceIN: 4999, priceINT: 79 },
  "Employment & HR Legal": { priceIN: 2999, priceINT: 49 },
  "Tech & SaaS Contracts": { priceIN: 3999, priceINT: 69 },
  "Legal Due Diligence": { priceIN: 14999, priceINT: 249 },
  "MSME & Compliance": { priceIN: 3499, priceINT: 59 },
  Custom: { priceIN: 0, priceINT: 0 },
};

const services = Object.keys(servicePricing);

const slaOptions = [
  { label: "Standard — 48 hours", value: 48 },
  { label: "Priority — 24 hours", value: 24 },
  { label: "Urgent — Same day", value: 8 },
  { label: "Custom", value: 0 },
];

export default function NewMatter() {
  const { getToken } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    clientId: "",
    title: "",
    service: "",
    description: "",
    fee: "",
    slaHours: 48,
    dueDate: "",
    region: "INDIA",
    internalNotes: "",
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const token = await getToken();
      const data = await apiRequest("/api/users", {}, token || undefined);
      setClients(data.filter((u: any) => u.role === "CLIENT"));
    } catch (err) {
      console.error("Failed to load clients:", err);
    }
  };

  //   const handleChange = (field: string, value: string | number) => {
  //     setForm(prev => ({ ...prev, [field]: value }));
  //     if (error) setError('');
  //   };
  const handleChange = (field: string, value: string | number) => {
    if (field === "service" && typeof value === "string") {
      const pricing = servicePricing[value];
      if (pricing && value !== "Custom") {
        setForm((prev) => ({
          ...prev,
          service: value,
          fee:
            prev.region === "INDIA"
              ? pricing.priceIN.toString()
              : pricing.priceINT.toString(),
        }));
        return;
      }
      if (value === "Custom") {
        setForm((prev) => ({ ...prev, service: value, fee: "" }));
        return;
      }
    }

    if (field === "region" && typeof value === "string") {
      const pricing = form.service ? servicePricing[form.service] : null;
      if (pricing && form.service !== "Custom") {
        setForm((prev) => ({
          ...prev,
          region: value,
          fee:
            value === "INDIA"
              ? pricing.priceIN.toString()
              : pricing.priceINT.toString(),
        }));
        return;
      }
    }

    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!form.clientId) return "Please select a client";
    if (!form.title.trim()) return "Matter title is required";
    if (!form.service) return "Please select a service";
    if (!form.fee || parseInt(form.fee) <= 0) return "Valid fee is required";
    if (!form.dueDate) return "Due date is required";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      await apiRequest(
        "/api/matters",
        {
          method: "POST",
          body: JSON.stringify({
            ...form,
            fee: parseInt(form.fee),
          }),
        },
        token || undefined,
      );
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create matter");
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.company || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const selectedClient = clients.find((c) => c.id === form.clientId);

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid var(--border-strong)",
    borderRadius: "4px",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    color: "var(--ink)",
    background: "var(--white)",
    outline: "none",
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: "0.7rem",
    fontWeight: 700 as const,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "var(--ink-soft)",
    marginBottom: "0.4rem",
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--paper)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ textAlign: "center", maxWidth: "400px", padding: "2rem" }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "var(--ink)",
              marginBottom: "0.75rem",
            }}
          >
            Matter Created
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            The client has been notified by email. Go to the pipeline to send
            the payment link.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => (window.location.href = "/admin")}
              style={{
                background: "var(--ink)",
                color: "var(--white)",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                border: "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Go to Pipeline
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  clientId: "",
                  title: "",
                  service: "",
                  description: "",
                  fee: "",
                  slaHours: 48,
                  dueDate: "",
                  region: "INDIA",
                  internalNotes: "",
                });
              }}
              style={{
                background: "transparent",
                color: "var(--ink)",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                border: "1.5px solid var(--border-strong)",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "60px",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--ink)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button
            onClick={() => (window.location.href = "/admin")}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 900,
              color: "var(--white)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Lex<span style={{ color: "var(--gold)" }}>Edge</span>
          </button>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            New Matter
          </span>
        </div>
        <button
          onClick={() => (window.location.href = "/admin")}
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            Admin · Matter Creation
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Create New Matter
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--ink-muted)",
              marginTop: "0.4rem",
            }}
          >
            After filling this form the client receives an email notification
            and payment link is ready to trigger from the pipeline.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              borderRadius: "6px",
              padding: "0.85rem 1rem",
              marginBottom: "1.5rem",
              fontSize: "0.85rem",
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
            gap: "2rem",
          }}
        >
          {/* Left column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Client selector */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--ink-soft)",
                  marginBottom: "1rem",
                }}
              >
                Client
              </div>

              {selectedClient ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "var(--gold-pale)",
                    border: "1.5px solid var(--gold)",
                    borderRadius: "6px",
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
                      {selectedClient.firstName} {selectedClient.lastName}
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}
                    >
                      {selectedClient.email}{" "}
                      {selectedClient.company
                        ? `· ${selectedClient.company}`
                        : ""}
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange("clientId", "")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--ink-muted)",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Change
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search by name, email, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ ...inputStyle, marginBottom: "0.75rem" }}
                  />
                  <div
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    {filteredClients.length === 0 ? (
                      <div
                        style={{
                          padding: "1rem",
                          textAlign: "center",
                          fontSize: "0.82rem",
                          color: "var(--ink-faint)",
                        }}
                      >
                        No clients found. Client must sign up first.
                      </div>
                    ) : (
                      filteredClients.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleChange("clientId", c.id)}
                          style={{
                            padding: "0.75rem 1rem",
                            background: "var(--paper)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            textAlign: "left",
                            fontFamily: "var(--font-body)",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--gold)";
                            e.currentTarget.style.background =
                              "var(--gold-pale)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.background = "var(--paper)";
                          }}
                        >
                          <div
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "var(--ink)",
                            }}
                          >
                            {c.firstName} {c.lastName}
                          </div>
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--ink-muted)",
                              marginTop: "0.1rem",
                            }}
                          >
                            {c.email}
                            {c.company ? ` · ${c.company}` : ""}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Matter details */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--ink-soft)",
                }}
              >
                Matter Details
              </div>

              <div>
                <label style={labelStyle}>Matter Title</label>
                <input
                  type="text"
                  placeholder="e.g. Vendor Agreement Review — Acme vs TechCorp"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Service Type</label>
                <select
                  value={form.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description / Scope</label>
                <textarea
                  placeholder="Brief description of the matter and scope of work..."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Pricing & SLA */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--ink-soft)",
                }}
              >
                Pricing & Timeline
              </div>

              <div>
                <label style={labelStyle}>Region</label>
                <select
                  value={form.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  style={inputStyle}
                >
                  <option value="INDIA">India (₹ INR)</option>
                  <option value="INTERNATIONAL">International ($ USD)</option>
                </select>
              </div>

              {/* <div>
                <label style={labelStyle}>
                  Fixed Fee ({form.region === "INDIA" ? "₹ INR" : "$ USD"})
                </label>
                <input
                  type="number"
                  placeholder={form.region === "INDIA" ? "3999" : "69"}
                  value={form.fee}
                  onChange={(e) => handleChange("fee", e.target.value)}
                  style={inputStyle}
                  min="0"
                />
                {form.fee && (
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.3rem",
                    }}
                  >
                    + 18% GST = {form.region === "INDIA" ? "₹" : "$"}
                    {Math.round(parseInt(form.fee) * 1.18).toLocaleString(
                      "en-IN",
                    )}{" "}
                    total
                  </div>
                )}
              </div> */}

              <div>
                <label style={labelStyle}>
                  Fixed Fee ({form.region === "INDIA" ? "₹ INR" : "$ USD"})
                  {form.service && form.service !== "Custom" && (
                    <span
                      style={{
                        color: "var(--gold)",
                        marginLeft: "0.5rem",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        textTransform: "none",
                        letterSpacing: 0,
                      }}
                    >
                      — auto-filled from service
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  placeholder={form.region === "INDIA" ? "3999" : "69"}
                  value={form.fee}
                  onChange={(e) => handleChange("fee", e.target.value)}
                  style={{
                    ...inputStyle,
                    background:
                      form.service && form.service !== "Custom"
                        ? "var(--paper-warm)"
                        : "var(--white)",
                  }}
                  readOnly={form.service !== "" && form.service !== "Custom"}
                  min="0"
                />
                {form.fee && (
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.3rem",
                    }}
                  >
                    + 18% GST = {form.region === "INDIA" ? "₹" : "$"}
                    {Math.round(parseInt(form.fee) * 1.18).toLocaleString(
                      "en-IN",
                    )}{" "}
                    total
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>SLA / Turnaround</label>
                <select
                  value={form.slaHours}
                  onChange={(e) =>
                    handleChange("slaHours", parseInt(e.target.value))
                  }
                  style={inputStyle}
                >
                  {slaOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  style={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Internal notes */}
            <div
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--ink-soft)",
                  marginBottom: "0.75rem",
                }}
              >
                Internal Notes
              </div>
              <textarea
                placeholder="Notes visible only to the legal team — client cannot see this..."
                value={form.internalNotes}
                onChange={(e) => handleChange("internalNotes", e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--ink-faint)",
                  marginTop: "0.4rem",
                }}
              >
                🔒 Not visible to client
              </div>
            </div>

            {/* Summary + Submit */}
            {form.clientId && form.title && form.fee && (
              <div
                style={{
                  background: "var(--ink)",
                  borderRadius: "10px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                  }}
                >
                  Matter Summary
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {[
                    {
                      label: "Client",
                      value: selectedClient
                        ? `${selectedClient.firstName} ${selectedClient.lastName}`
                        : "",
                    },
                    { label: "Service", value: form.service },
                    {
                      label: "Fee",
                      value: `${form.region === "INDIA" ? "₹" : "$"}${parseInt(form.fee).toLocaleString("en-IN")} + GST`,
                    },
                    { label: "SLA", value: `${form.slaHours}hrs` },
                    { label: "Due", value: form.dueDate },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.78rem",
                      }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>
                        {item.label}
                      </span>
                      <span style={{ color: "var(--white)", fontWeight: 500 }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    background: loading ? "var(--ink-muted)" : "var(--gold)",
                    color: "var(--ink)",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading)
                      e.currentTarget.style.background = "var(--gold-light)";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading)
                      e.currentTarget.style.background = "var(--gold)";
                  }}
                >
                  {loading
                    ? "Creating Matter..."
                    : "Create Matter & Notify Client →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
