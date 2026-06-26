"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk, useAuth } from "@clerk/nextjs";
import { apiRequest } from "../../lib/api";

type AdminTab = "pipeline" | "clients" | "leads" | "revenue";

const statusColumns = [
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

export default function Admin() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("pipeline");
  const [matters, setMatters] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [quizLeads, setQuizLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMatter, setHoveredMatter] = useState<string | null>(null);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [hoveredLead, setHoveredLead] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<AdminTab | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>("LAWYER");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = await getToken();
      const [meData, mattersData, clientsData, leadsData] = await Promise.all([
        apiRequest("/api/users/me", {}, token || undefined),
        apiRequest("/api/matters", {}, token || undefined),
        apiRequest("/api/users", {}, token || undefined),
        apiRequest("/api/leads", {}, token || undefined),
      ]);
      setCurrentUserRole(meData.role);
      setMatters(mattersData);
      setClients(clientsData);
      setQuizLeads(leadsData);
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = matters
    .filter((m) => m.paid)
    .reduce(
      (acc, m) => acc + parseInt(m.fee.replace("₹", "").replace(",", "")),
      0,
    );
  const pendingRevenue = matters
    .filter((m) => !m.paid)
    .reduce(
      (acc, m) => acc + parseInt(m.fee.replace("₹", "").replace(",", "")),
      0,
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Admin Nav */}
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
            Admin Dashboard
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
          <span
            style={{
              fontSize: "0.68rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--gold)",
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
              padding: "0.2rem 0.6rem",
              borderRadius: "3px",
            }}
          >
            Admin
          </span>
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
                id: "pipeline",
                label: "Matter Pipeline",
                icon: "📋",
                count: matters.length,
              },
              {
                id: "clients",
                label: "Clients",
                icon: "👥",
                count: clients.length,
              },
              {
                id: "leads",
                label: "Quiz Leads",
                icon: "📊",
                count: quizLeads.length,
              },
              //{ id: "revenue", label: "Revenue", icon: "💰", count: null },
              ...(currentUserRole === "ADMIN"
                ? [
                    {
                      id: "revenue" as AdminTab,
                      label: "Revenue",
                      icon: "💰",
                      count: null,
                    },
                  ]
                : []),
            ] as {
              id: AdminTab;
              label: string;
              icon: string;
              count: number | null;
            }[]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {/* <button
              onClick={() => (window.location.href = "/portal")}
              style={{
                width: "100%",
                padding: "0.65rem",
                background: "transparent",
                color: "var(--ink-muted)",
                border: "1px solid var(--border-strong)",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              View Client Portal
            </button> */}
            <button
              onClick={() => (window.location.href = "/admin/clients")}
              style={{
                width: "100%",
                padding: "0.65rem",
                background: "transparent",
                color: "var(--ink-muted)",
                border: "1px solid var(--border-strong)",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              All Clients
            </button>
            <button
              onClick={() => (window.location.href = "/admin/matters/new")}
              style={{
                width: "100%",
                padding: "0.65rem",
                background: "var(--ink)",
                color: "var(--white)",
                border: "none",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
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
              + Create Matter
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ marginLeft: "220px", flex: 1, padding: "2.5rem 3rem" }}>
          {/* Pipeline tab */}
          {activeTab === "pipeline" && (
            <>
              <div
                style={{
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
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
                    Matter Pipeline
                  </h1>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--ink-muted)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {matters.length} active matters ·{" "}
                    {matters.filter((m) => !m.paid).length} pending payment
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  {
                    label: "Total Matters",
                    value: matters.length.toString(),
                    sub: "All time",
                    color: "var(--ink)",
                  },
                  {
                    label: "In Progress",
                    value: matters
                      .filter((m) =>
                        [
                          "Received",
                          "In Review",
                          "Draft Ready",
                          "Revisions",
                        ].includes(m.status),
                      )
                      .length.toString(),
                    sub: "Active now",
                    color: "#B45309",
                  },
                  ...(currentUserRole === "ADMIN"
                    ? [
                        {
                          label: "Revenue Collected",
                          value: `₹${totalRevenue.toLocaleString("en-IN")}`,
                          sub: "This month",
                          color: "var(--green)",
                        },
                        {
                          label: "Pending Payment",
                          value: `₹${pendingRevenue.toLocaleString("en-IN")}`,
                          sub: "Awaiting",
                          color: "var(--crimson)",
                        },
                      ]
                    : [
                        {
                          label: "Completed",
                          value: matters
                            .filter((m) => m.status === "FINAL_DELIVERED")
                            .length.toString(),
                          sub: "This month",
                          color: "var(--green)",
                        },
                        {
                          label: "Due Today",
                          value: matters
                            .filter(
                              (m) =>
                                m.dueDate &&
                                new Date(m.dueDate).toDateString() ===
                                  new Date().toDateString(),
                            )
                            .length.toString(),
                          sub: "Needs attention",
                          color: "var(--crimson)",
                        },
                      ]),
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
                        fontSize: "1.6rem",
                        fontWeight: 900,
                        color: s.color,
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

              {/* Kanban */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "1rem",
                  overflowX: "auto",
                }}
              >
                {statusColumns.map((col) => {
                  const colMatters = matters.filter((m) => m.status === col);
                  return (
                    <div key={col} style={{ minWidth: "180px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "var(--ink-muted)",
                          }}
                        >
                          {col}
                        </div>
                        <span
                          style={{
                            background: "var(--paper-warm)",
                            color: "var(--ink-muted)",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            padding: "0.15rem 0.45rem",
                            borderRadius: "50px",
                          }}
                        >
                          {colMatters.length}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                        }}
                      >
                        {colMatters.map((m) => (
                          <div
                            key={m.id}
                            onMouseEnter={() => setHoveredMatter(m.id)}
                            onMouseLeave={() => setHoveredMatter(null)}
                            style={{
                              background: "var(--white)",
                              border:
                                hoveredMatter === m.id
                                  ? "1px solid var(--gold)"
                                  : "1px solid var(--border)",
                              borderRadius: "8px",
                              padding: "1rem",
                              cursor: "pointer",
                              transition: "all 0.15s",
                              boxShadow:
                                hoveredMatter === m.id
                                  ? "0 4px 12px rgba(0,0,0,0.06)"
                                  : "none",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.58rem",
                                color: "var(--ink-faint)",
                                marginBottom: "0.35rem",
                              }}
                            >
                              {m.id}
                            </div>
                            <div
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                color: "var(--ink)",
                                lineHeight: 1.35,
                                marginBottom: "0.5rem",
                              }}
                            >
                              {m.title}
                            </div>
                            <div
                              style={{
                                fontSize: "0.72rem",
                                color: "var(--ink-muted)",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {m.client}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  color: "var(--ink)",
                                }}
                              >
                                {m.fee}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.62rem",
                                  fontWeight: 600,
                                  color: m.paid
                                    ? "var(--green)"
                                    : "var(--crimson)",
                                  background: m.paid
                                    ? "var(--green-pale)"
                                    : "#FEE2E2",
                                  padding: "0.15rem 0.4rem",
                                  borderRadius: "3px",
                                }}
                              >
                                {m.paid ? "Paid" : "Unpaid"}
                              </span>
                            </div>
                            {!m.paid && (
                              <button
                                style={{
                                  width: "100%",
                                  marginTop: "0.6rem",
                                  padding: "0.4rem",
                                  background: "var(--ink)",
                                  color: "var(--white)",
                                  border: "none",
                                  borderRadius: "3px",
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.7rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                Send Payment Link
                              </button>
                            )}
                          </div>
                        ))}
                        {colMatters.length === 0 && (
                          <div
                            style={{
                              border: "2px dashed var(--border)",
                              borderRadius: "8px",
                              padding: "1.5rem",
                              textAlign: "center",
                              color: "var(--ink-faint)",
                              fontSize: "0.75rem",
                            }}
                          >
                            Empty
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Clients tab */}
          {activeTab === "clients" && (
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
                  Clients
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  {clients.length} clients · ₹
                  {totalRevenue.toLocaleString("en-IN")} total collected
                </p>
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
                    gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
                    padding: "0.85rem 1.5rem",
                    background: "var(--paper)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {["Client", "Contact", "Matters", "Spent", "Region"].map(
                    (h) => (
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
                    ),
                  )}
                </div>
                {clients.map((c) => (
                  <div
                    key={c.id}
                    onMouseEnter={() => setHoveredClient(c.id)}
                    onMouseLeave={() => setHoveredClient(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
                      padding: "1.1rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                      background:
                        hoveredClient === c.id
                          ? "var(--paper)"
                          : "var(--white)",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--ink-muted)",
                          marginTop: "0.1rem",
                        }}
                      >
                        {c.company}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {c.email}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--ink-muted)",
                          marginTop: "0.1rem",
                        }}
                      >
                        {c.phone}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {c.matters}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--green)",
                      }}
                    >
                      {c.spent}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "var(--ink-muted)",
                        background: "var(--paper-warm)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "50px",
                        display: "inline-block",
                      }}
                    >
                      {c.region}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Quiz Leads tab */}
          {activeTab === "leads" && (
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
                  Quiz Leads
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  {quizLeads.length} leads from Legal Health Score quiz ·
                  nurture sequence running automatically
                </p>
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
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                    padding: "0.85rem 1.5rem",
                    background: "var(--paper)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {[
                    "Email",
                    "Score",
                    "Risk",
                    "Date",
                    "Follow-Up",
                    "Recommended",
                  ].map((h) => (
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
                {quizLeads.map((l) => (
                  <div
                    key={l.id}
                    onMouseEnter={() => setHoveredLead(l.id)}
                    onMouseLeave={() => setHoveredLead(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
                      padding: "1.1rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                      background:
                        hoveredLead === l.id ? "var(--paper)" : "var(--white)",
                      transition: "background 0.15s",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {l.email}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 900,
                          color:
                            l.score >= 85
                              ? "var(--green)"
                              : l.score >= 60
                                ? "#B45309"
                                : "var(--crimson)",
                        }}
                      >
                        {l.score}
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color:
                            l.tier === "Legally Strong"
                              ? "var(--green)"
                              : l.tier === "Moderate Risk"
                                ? "#B45309"
                                : "var(--crimson)",
                          background:
                            l.tier === "Legally Strong"
                              ? "var(--green-pale)"
                              : l.tier === "Moderate Risk"
                                ? "#FEF3C7"
                                : "#FEE2E2",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "3px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {l.tier}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}
                    >
                      {l.date}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color:
                          l.followUp === "Completed"
                            ? "var(--green)"
                            : "var(--ink-muted)",
                        fontWeight: l.followUp === "Completed" ? 600 : 400,
                      }}
                    >
                      {l.followUp}
                    </div>
                    <div>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.72rem",
                          color: "var(--gold-dark)",
                          fontWeight: 600,
                          padding: 0,
                        }}
                      >
                        WhatsApp →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Revenue tab */}
          {activeTab === "revenue" && (
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
                  Revenue
                </h1>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  June 2025
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  {
                    label: "Collected",
                    value: `₹${totalRevenue.toLocaleString("en-IN")}`,
                    sub: "This month",
                    color: "var(--green)",
                    bg: "var(--green-pale)",
                  },
                  {
                    label: "Pending",
                    value: `₹${pendingRevenue.toLocaleString("en-IN")}`,
                    sub: "Awaiting payment",
                    color: "var(--crimson)",
                    bg: "#FEE2E2",
                  },
                  {
                    label: "Total Pipeline",
                    value: `₹${(totalRevenue + pendingRevenue).toLocaleString("en-IN")}`,
                    sub: "Collected + pending",
                    color: "var(--ink)",
                    bg: "var(--paper-warm)",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: s.bg,
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "2rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2rem",
                        fontWeight: 900,
                        color: s.color,
                        lineHeight: 1,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--ink-soft)",
                        marginBottom: "0.2rem",
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
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    All Transactions
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "4px",
                      padding: "0.4rem 0.85rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--ink-muted)",
                      cursor: "pointer",
                    }}
                  >
                    Export CSV
                  </button>
                </div>
                {matters.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
                      padding: "1rem 1.5rem",
                      borderBottom: "1px solid var(--border)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {m.id}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        color: "var(--ink)",
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}
                    >
                      {m.client} · {m.company}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {m.fee}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          color: m.paid ? "var(--green)" : "var(--crimson)",
                          background: m.paid ? "var(--green-pale)" : "#FEE2E2",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "3px",
                        }}
                      >
                        {m.paid ? "Paid" : "Unpaid"}
                      </span>
                      {m.paid && (
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.7rem",
                            color: "var(--gold-dark)",
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                            padding: 0,
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
        </main>
      </div>
    </div>
  );
}
