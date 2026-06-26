"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk, useAuth } from "@clerk/nextjs";
import PaymentButton from "../components/portal/PaymentButton";
import { apiRequest } from "../../lib/api";

type Tab = "matters" | "payments" | "profile";

const statusSteps = [
  "RECEIVED",
  "IN_REVIEW",
  "DRAFT_READY",
  "REVISIONS",
  "FINAL_DELIVERED",
];
const statusLabels: Record<string, string> = {
  RECEIVED: "Received",
  IN_REVIEW: "In Review",
  DRAFT_READY: "Draft Ready",
  REVISIONS: "Revisions",
  FINAL_DELIVERED: "Final Delivered",
  CLOSED: "Closed",
};

export default function Portal() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("matters");
  const [selectedMatter, setSelectedMatter] = useState<any>(null);
  const [matters, setMatters] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMatter, setHoveredMatter] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<Tab | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = await getToken();

      // Check user role — redirect admins to admin dashboard
      const userData = await apiRequest(
        "/api/users/me",
        {},
        token || undefined,
      );
      if (userData.role === "ADMIN" || userData.role === "LAWYER") {
        window.location.href = "/admin";
        return;
      }

      const [mattersData, paymentsData] = await Promise.all([
        apiRequest("/api/matters/my", {}, token || undefined),
        apiRequest("/api/payments/my", {}, token || undefined),
      ]);
      setMatters(mattersData);
      setPayments(paymentsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Portal Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
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
            onClick={() => (window.location.href = "/")}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 900,
              color: "var(--white)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.02em",
            }}
          >
            Lex<span style={{ color: "var(--gold)" }}>Edge</span>
          </button>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>
            |
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Client Portal
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <span
              style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}
            >
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.35)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: "60px", display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            background: "var(--white)",
            borderRight: "1px solid var(--border)",
            padding: "2rem 0",
            position: "fixed",
            top: "60px",
            bottom: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "0 1.25rem", marginBottom: "2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginBottom: "0.5rem",
              }}
            >
              Navigation
            </div>
          </div>

          {(
            [
              {
                id: "matters",
                label: "My Matters",
                icon: "📋",
                count: matters.length,
              },
              { id: "payments", label: "Payments", icon: "💳", count: null },
              { id: "profile", label: "Profile", icon: "👤", count: null },
            ] as {
              id: Tab;
              label: string;
              icon: string;
              count: number | null;
            }[]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedMatter(null);
              }}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                width: "100%",
                padding: "0.85rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  activeTab === item.id
                    ? "var(--gold-pale)"
                    : hoveredTab === item.id
                      ? "var(--paper)"
                      : "transparent",
                border: "none",
                borderLeft:
                  activeTab === item.id
                    ? "3px solid var(--gold)"
                    : "3px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "0.95rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: activeTab === item.id ? 600 : 400,
                    color:
                      activeTab === item.id ? "var(--ink)" : "var(--ink-muted)",
                  }}
                >
                  {item.label}
                </span>
              </div>
              {item.count !== null && (
                <span
                  style={{
                    background:
                      activeTab === item.id
                        ? "var(--gold)"
                        : "var(--paper-warm)",
                    color:
                      activeTab === item.id ? "var(--ink)" : "var(--ink-muted)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "50px",
                  }}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}

          <div
            style={{
              marginTop: "auto",
              padding: "1.25rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => (window.location.href = "/#booking")}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "var(--ink)",
                color: "var(--white)",
                border: "none",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
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
              + New Matter
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main
          style={{
            marginLeft: "220px",
            flex: 1,
            padding: "2.5rem 3rem",
            minHeight: "calc(100vh - 60px)",
          }}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem",
                color: "var(--ink-muted)",
                fontSize: "0.88rem",
              }}
            >
              Loading your matters...
            </div>
          )}
          {/* Matters tab */}
          {activeTab === "matters" && !selectedMatter && (
            <>
              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    My Matters
                  </h1>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    Track the status of all your legal matters in one place.
                  </p>
                </div>
              </div>

              {/* Stats strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  { label: "Total Matters", value: "4", sub: "All time" },
                  { label: "In Progress", value: "2", sub: "Active now" },
                  { label: "Completed", value: "1", sub: "This month" },
                  {
                    label: "Pending Payment",
                    value: "1",
                    sub: "Action needed",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.8rem",
                        fontWeight: 900,
                        color: "var(--ink)",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--ink-soft)",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Matters list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  background: "var(--border)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {matters.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMatter(m)}
                    onMouseEnter={() => setHoveredMatter(m.id)}
                    onMouseLeave={() => setHoveredMatter(null)}
                    style={{
                      background:
                        hoveredMatter === m.id
                          ? "var(--paper)"
                          : "var(--white)",
                      padding: "1.5rem 2rem",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        flex: 1,
                        minWidth: "200px",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "8px",
                          background: "var(--paper-warm)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: "var(--ink-muted)",
                          flexShrink: 0,
                          fontWeight: 500,
                        }}
                      >
                        {m.id}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "var(--ink)",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {m.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--ink-muted)",
                          }}
                        >
                          {m.service} · Due {m.due}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: m.statusColor,
                          background: m.statusBg,
                          padding: "0.3rem 0.75rem",
                          borderRadius: "50px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {statusLabels[m.status] || m.status}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--ink-faint)",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Matter detail view */}
          {activeTab === "matters" && selectedMatter && (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <button
                  onClick={() => setSelectedMatter(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    padding: 0,
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-muted)";
                  }}
                >
                  ← Back to Matters
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-faint)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {selectedMatter.id}
                    </div>
                    <h1
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "var(--ink)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {selectedMatter.title}
                    </h1>
                  </div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: selectedMatter.statusColor,
                      background: selectedMatter.statusBg,
                      padding: "0.4rem 1rem",
                      borderRadius: "50px",
                    }}
                  >
                    {selectedMatter.status}
                  </span>
                </div>
              </div>

              {/* Status tracker */}
              <div
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "2rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--ink-soft)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Matter Progress
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0" }}
                >
                  {statusSteps.map((step, i) => {
                    const currentIndex = statusSteps.indexOf(
                      selectedMatter.status,
                    );
                    const isDone = i <= currentIndex;
                    const isCurrent = i === currentIndex;
                    return (
                      <div
                        key={step}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {i < statusSteps.length - 1 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "14px",
                              left: "50%",
                              right: "-50%",
                              height: "2px",
                              background:
                                isDone && i < currentIndex
                                  ? "var(--gold)"
                                  : "var(--border)",
                              zIndex: 0,
                            }}
                          />
                        )}
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: isCurrent
                              ? "var(--gold)"
                              : isDone
                                ? "var(--ink)"
                                : "var(--paper-warm)",
                            border: isCurrent
                              ? "3px solid var(--gold)"
                              : isDone
                                ? "3px solid var(--ink)"
                                : "2px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1,
                            position: "relative",
                            transition: "all 0.3s",
                            flexShrink: 0,
                          }}
                        >
                          {isDone && !isCurrent && (
                            <span
                              style={{
                                color: "var(--white)",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </span>
                          )}
                          {isCurrent && (
                            <span
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: "var(--ink)",
                                display: "block",
                              }}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: isCurrent ? 700 : 400,
                            color: isCurrent
                              ? "var(--ink)"
                              : isDone
                                ? "var(--ink-soft)"
                                : "var(--ink-faint)",
                            marginTop: "0.5rem",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          {step}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                {/* Matter details */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Matter Details
                  </div>
                  {[
                    { label: "Service", value: selectedMatter.service },
                    { label: "Assigned To", value: selectedMatter.lawyer },
                    { label: "Started", value: selectedMatter.date },
                    { label: "Due Date", value: selectedMatter.due },
                    {
                      label: "Documents",
                      value: `${selectedMatter.docs} file${selectedMatter.docs !== 1 ? "s" : ""}`,
                    },
                  ].map((d) => (
                    <div
                      key={d.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.65rem 0",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {d.label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Documents */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.75rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Documents
                  </div>
                  {selectedMatter.docs > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                      }}
                    >
                      {Array.from({ length: selectedMatter.docs }).map(
                        (_, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "0.85rem 1rem",
                              background: "var(--paper)",
                              borderRadius: "6px",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                              }}
                            >
                              <span style={{ fontSize: "1rem" }}>📄</span>
                              <span
                                style={{
                                  fontSize: "0.8rem",
                                  color: "var(--ink)",
                                  fontWeight: 500,
                                }}
                              >
                                {i === 0
                                  ? "Original Document.pdf"
                                  : "Reviewed Draft.pdf"}
                              </span>
                            </div>
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.75rem",
                                color: "var(--gold-dark)",
                                fontWeight: 600,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              Download
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        color: "var(--ink-faint)",
                        fontSize: "0.82rem",
                      }}
                    >
                      No documents yet. Upload below to get started.
                    </div>
                  )}

                  {/* Upload area */}
                  <div
                    style={{
                      marginTop: "1rem",
                      border: "2px dashed var(--border-strong)",
                      borderRadius: "6px",
                      padding: "1.25rem",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.background = "var(--gold-pale)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--border-strong)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>
                      📎
                    </div>
                    <div
                      style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}
                    >
                      Drop files here or{" "}
                      <span
                        style={{ color: "var(--gold-dark)", fontWeight: 600 }}
                      >
                        browse
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "var(--ink-faint)",
                        marginTop: "0.25rem",
                      }}
                    >
                      PDF, DOCX up to 25MB
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.75rem",
                    gridColumn: "1 / -1",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ink-soft)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Messages
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {selectedMatter.messages > 0 ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: "var(--ink)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--gold)",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            LC
                          </div>
                          <div
                            style={{
                              background: "var(--paper)",
                              borderRadius: "0 8px 8px 8px",
                              padding: "0.85rem 1rem",
                              flex: 1,
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                color: "var(--ink)",
                                marginBottom: "0.3rem",
                              }}
                            >
                              LexEdge — Principal Counsel
                            </div>
                            <div
                              style={{
                                fontSize: "0.82rem",
                                color: "var(--ink-soft)",
                                lineHeight: 1.6,
                              }}
                            >
                              We have received your document and begun our
                              review. We will have annotated feedback ready
                              within 24 hours.
                            </div>
                            <div
                              style={{
                                fontSize: "0.68rem",
                                color: "var(--ink-faint)",
                                marginTop: "0.4rem",
                              }}
                            >
                              Today, 10:24 AM
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "1.5rem",
                          color: "var(--ink-faint)",
                          fontSize: "0.82rem",
                        }}
                      >
                        No messages yet. Send a message below.
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      style={{
                        flex: 1,
                        padding: "0.75rem 1rem",
                        border: "1.5px solid var(--border-strong)",
                        borderRadius: "6px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        outline: "none",
                        background: "var(--paper)",
                      }}
                    />
                    <button
                      style={{
                        padding: "0.75rem 1.25rem",
                        background: "var(--ink)",
                        color: "var(--white)",
                        border: "none",
                        borderRadius: "6px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Payments tab */}
          {activeTab === "payments" && (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 900,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Payment History
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  All transactions and GST invoices in one place.
                </p>
              </div>

              {/* Payment pending banner */}
              <div
                style={{
                  background: "#FEF3C7",
                  border: "1px solid #B45309",
                  borderRadius: "8px",
                  padding: "1rem 1.5rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>⚠️</span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#92400E",
                      }}
                    >
                      Payment pending for Founders Agreement
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#B45309" }}>
                      Work will begin once payment is confirmed. Amount: ₹9,999
                    </div>
                  </div>
                </div>
                {/* <button
                  style={{
                    background: "#B45309",
                    color: "var(--white)",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "4px",
                    border: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Pay Now →
                </button> */}
                <PaymentButton
                  matterId="M-004"
                  amount={9999}
                  currency="INR"
                  matterTitle="Founders Agreement"
                  clientName="Rahul Sharma"
                  clientEmail="rahul@company.com"
                  clientPhone="+919876543210"
                  onSuccess={() => window.location.reload()}
                />
              </div>

              <div
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
                    padding: "0.85rem 1.5rem",
                    background: "var(--paper)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {["ID", "Matter", "Amount", "Date", "Status"].map((h) => (
                    <div
                      key={h}
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {payments.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
                      padding: "1rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {p.id}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {p.matter}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {p.amount}
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}
                    >
                      {p.date}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color:
                            p.status === "Paid" ? "var(--green)" : "#B45309",
                          background:
                            p.status === "Paid"
                              ? "var(--green-pale)"
                              : "#FEF3C7",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "50px",
                        }}
                      >
                        {p.status}
                      </span>
                      {p.status === "Paid" && (
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.72rem",
                            color: "var(--gold-dark)",
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Invoice
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Profile tab */}
          {activeTab === "profile" && (
            <>
              <div style={{ marginBottom: "2rem" }}>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 900,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Profile
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  Your account details and preferences.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "2rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ink-soft)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Personal Details
                  </div>
                  {[
                    { label: "Full Name", value: "Rahul Sharma", type: "text" },
                    {
                      label: "Email",
                      value: "rahul@company.com",
                      type: "email",
                    },
                    {
                      label: "Phone / WhatsApp",
                      value: "+91 98765 43210",
                      type: "tel",
                    },
                    {
                      label: "Company",
                      value: "Acme Technologies Pvt. Ltd.",
                      type: "text",
                    },
                  ].map((f) => (
                    <div key={f.label} style={{ marginBottom: "1rem" }}>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--ink-soft)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {f.label}
                      </div>
                      <input
                        type={f.type}
                        defaultValue={f.value}
                        style={{
                          width: "100%",
                          padding: "0.72rem 0.95rem",
                          border: "1.5px solid var(--border-strong)",
                          borderRadius: "4px",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.875rem",
                          color: "var(--ink)",
                          background: "var(--paper)",
                          outline: "none",
                        }}
                      />
                    </div>
                  ))}
                  <button
                    style={{
                      background: "var(--ink)",
                      color: "var(--white)",
                      padding: "0.75rem 1.5rem",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    Save Changes
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "2rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--ink-soft)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      Referral Program
                    </div>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--ink-muted)",
                        lineHeight: 1.65,
                        marginBottom: "1rem",
                      }}
                    >
                      Give a friend Rs.500 off their first matter, get Rs.500
                      credit when they complete it.
                    </p>
                    <div
                      style={{
                        background: "var(--paper)",
                        borderRadius: "6px",
                        padding: "0.85rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--ink)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        RAHUL500
                      </span>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          color: "var(--gold-dark)",
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}
                    >
                      0 referrals · Rs.0 credits earned
                    </div>
                  </div>

                  <div
                    style={{
                      background: "var(--white)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "2rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--ink-soft)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      Notifications
                    </div>
                    {[
                      { label: "Matter status updates", enabled: true },
                      { label: "Payment confirmations", enabled: true },
                      { label: "WhatsApp notifications", enabled: true },
                      { label: "Email newsletters", enabled: false },
                    ].map((n) => (
                      <div
                        key={n.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.65rem 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--ink-soft)",
                          }}
                        >
                          {n.label}
                        </span>
                        <div
                          style={{
                            width: "36px",
                            height: "20px",
                            borderRadius: "10px",
                            background: n.enabled
                              ? "var(--green)"
                              : "var(--border-strong)",
                            position: "relative",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "3px",
                              left: n.enabled ? "19px" : "3px",
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: "var(--white)",
                              transition: "left 0.2s",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
