// "use client";

// import { useState, useEffect } from "react";
// import { useUser, useClerk, useAuth } from "@clerk/nextjs";
// import PaymentButton from "../components/portal/PaymentButton";
// import { apiRequest } from "../../lib/api";

// type Tab = "matters" | "payments" | "profile";

// const statusSteps = [
//   "RECEIVED",
//   "IN_REVIEW",
//   "DRAFT_READY",
//   "REVISIONS",
//   "FINAL_DELIVERED",
// ];
// const statusLabels: Record<string, string> = {
//   RECEIVED: "Received",
//   IN_REVIEW: "In Review",
//   DRAFT_READY: "Draft Ready",
//   REVISIONS: "Revisions",
//   FINAL_DELIVERED: "Final Delivered",
//   CLOSED: "Closed",
// };

// export default function Portal() {
//   const { user } = useUser();
//   const { signOut } = useClerk();
//   const { getToken } = useAuth();

//   const [activeTab, setActiveTab] = useState<Tab>("matters");
//   const [selectedMatter, setSelectedMatter] = useState<any>(null);
//   const [matters, setMatters] = useState<any[]>([]);
//   const [payments, setPayments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredMatter, setHoveredMatter] = useState<string | null>(null);
//   const [hoveredTab, setHoveredTab] = useState<Tab | null>(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const token = await getToken();

//       const userData = await apiRequest(
//         "/api/users/me",
//         {},
//         token || undefined,
//       );
//       if (userData.role === "ADMIN" || userData.role === "LAWYER") {
//         window.location.href = "/admin";
//         return;
//       }

//       const [mattersData, paymentsData] = await Promise.all([
//         apiRequest("/api/matters/my", {}, token || undefined),
//         apiRequest("/api/payments/my", {}, token || undefined),
//       ]);
//       setMatters(mattersData);
//       setPayments(paymentsData);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "var(--paper)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Portal Nav */}
//       <nav
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 100,
//           height: "60px",
//           padding: "0 2.5rem",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: "var(--ink)",
//           borderBottom: "1px solid rgba(255,255,255,0.07)",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
//           <button
//             onClick={() => (window.location.href = "/")}
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: "1.2rem",
//               fontWeight: 900,
//               color: "var(--white)",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Lex<span style={{ color: "var(--gold)" }}>Edge</span>
//           </button>
//           <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>
//             |
//           </span>
//           <span
//             style={{
//               fontFamily: "var(--font-mono)",
//               fontSize: "0.65rem",
//               letterSpacing: "0.12em",
//               textTransform: "uppercase",
//               color: "rgba(255,255,255,0.4)",
//             }}
//           >
//             Client Portal
//           </span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
//             <div
//               style={{
//                 width: "28px",
//                 height: "28px",
//                 borderRadius: "50%",
//                 background: "var(--gold)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontFamily: "var(--font-display)",
//                 fontSize: "0.75rem",
//                 fontWeight: 700,
//                 color: "var(--ink)",
//               }}
//             >
//               {user?.firstName?.[0]}
//               {user?.lastName?.[0]}
//             </div>
//             <span
//               style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}
//             >
//               {user?.firstName} {user?.lastName}
//             </span>
//           </div>
//           <button
//             onClick={() => signOut({ redirectUrl: "/" })}
//             style={{
//               fontSize: "0.78rem",
//               color: "rgba(255,255,255,0.35)",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               fontFamily: "var(--font-body)",
//               transition: "color 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.color = "rgba(255,255,255,0.7)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color = "rgba(255,255,255,0.35)";
//             }}
//           >
//             Sign Out
//           </button>
//         </div>
//       </nav>

//       <div style={{ paddingTop: "60px", display: "flex", flex: 1 }}>
//         {/* Sidebar */}
//         <aside
//           style={{
//             width: "220px",
//             background: "var(--white)",
//             borderRight: "1px solid var(--border)",
//             padding: "2rem 0",
//             position: "fixed",
//             top: "60px",
//             bottom: 0,
//             left: 0,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div style={{ padding: "0 1.25rem", marginBottom: "2rem" }}>
//             <div
//               style={{
//                 fontFamily: "var(--font-mono)",
//                 fontSize: "0.6rem",
//                 letterSpacing: "0.14em",
//                 textTransform: "uppercase",
//                 color: "var(--ink-faint)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Navigation
//             </div>
//           </div>

//           {(
//             [
//               {
//                 id: "matters",
//                 label: "My Matters",
//                 icon: "📋",
//                 count: matters.length,
//               },
//               { id: "payments", label: "Payments", icon: "💳", count: null },
//               { id: "profile", label: "Profile", icon: "👤", count: null },
//             ] as {
//               id: Tab;
//               label: string;
//               icon: string;
//               count: number | null;
//             }[]
//           ).map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveTab(item.id);
//                 setSelectedMatter(null);
//               }}
//               onMouseEnter={() => setHoveredTab(item.id)}
//               onMouseLeave={() => setHoveredTab(null)}
//               style={{
//                 width: "100%",
//                 padding: "0.85rem 1.25rem",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 background:
//                   activeTab === item.id
//                     ? "var(--gold-pale)"
//                     : hoveredTab === item.id
//                       ? "var(--paper)"
//                       : "transparent",
//                 border: "none",
//                 borderLeft:
//                   activeTab === item.id
//                     ? "3px solid var(--gold)"
//                     : "3px solid transparent",
//                 cursor: "pointer",
//                 textAlign: "left",
//                 fontFamily: "var(--font-body)",
//                 transition: "all 0.15s",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "0.75rem",
//                 }}
//               >
//                 <span style={{ fontSize: "0.95rem" }}>{item.icon}</span>
//                 <span
//                   style={{
//                     fontSize: "0.85rem",
//                     fontWeight: activeTab === item.id ? 600 : 400,
//                     color:
//                       activeTab === item.id ? "var(--ink)" : "var(--ink-muted)",
//                   }}
//                 >
//                   {item.label}
//                 </span>
//               </div>
//               {item.count !== null && (
//                 <span
//                   style={{
//                     background:
//                       activeTab === item.id
//                         ? "var(--gold)"
//                         : "var(--paper-warm)",
//                     color:
//                       activeTab === item.id ? "var(--ink)" : "var(--ink-muted)",
//                     fontSize: "0.68rem",
//                     fontWeight: 700,
//                     padding: "0.15rem 0.5rem",
//                     borderRadius: "50px",
//                   }}
//                 >
//                   {item.count}
//                 </span>
//               )}
//             </button>
//           ))}

//           <div
//             style={{
//               marginTop: "auto",
//               padding: "1.25rem",
//               borderTop: "1px solid var(--border)",
//             }}
//           >
//             <button
//               onClick={() => (window.location.href = "/#booking")}
//               style={{
//                 width: "100%",
//                 padding: "0.75rem",
//                 background: "var(--ink)",
//                 color: "var(--white)",
//                 border: "none",
//                 borderRadius: "4px",
//                 fontFamily: "var(--font-body)",
//                 fontSize: "0.8rem",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "var(--gold)";
//                 e.currentTarget.style.color = "var(--ink)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "var(--ink)";
//                 e.currentTarget.style.color = "var(--white)";
//               }}
//             >
//               + New Matter
//             </button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main
//           style={{
//             marginLeft: "220px",
//             flex: 1,
//             padding: "2.5rem 3rem",
//             minHeight: "calc(100vh - 60px)",
//           }}
//         >
//           {loading && (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 padding: "4rem",
//                 color: "var(--ink-muted)",
//                 fontSize: "0.88rem",
//               }}
//             >
//               Loading your matters...
//             </div>
//           )}
//           {/* Matters tab */}
//           {activeTab === "matters" && !selectedMatter && (
//             <>
//               <div
//                 style={{
//                   marginBottom: "2rem",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   <h1
//                     style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: "1.6rem",
//                       fontWeight: 900,
//                       color: "var(--ink)",
//                       letterSpacing: "-0.02em",
//                     }}
//                   >
//                     My Matters
//                   </h1>
//                   <p
//                     style={{
//                       fontSize: "0.82rem",
//                       color: "var(--ink-muted)",
//                       marginTop: "0.25rem",
//                     }}
//                   >
//                     Track the status of all your legal matters in one place.
//                   </p>
//                 </div>
//               </div>

//               {/* Stats strip */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(4, 1fr)",
//                   gap: "1rem",
//                   marginBottom: "2rem",
//                 }}
//               >
//                 {[
//                   {
//                     label: "Total Matters",
//                     value: matters.length.toString(),
//                     sub: "All time",
//                   },
//                   {
//                     label: "In Progress",
//                     value: matters
//                       .filter((m) =>
//                         [
//                           "RECEIVED",
//                           "IN_REVIEW",
//                           "DRAFT_READY",
//                           "REVISIONS",
//                         ].includes(m.status),
//                       )
//                       .length.toString(),
//                     sub: "Active now",
//                   },
//                   {
//                     label: "Completed",
//                     value: matters
//                       .filter((m) => m.status === "FINAL_DELIVERED")
//                       .length.toString(),
//                     sub: "This month",
//                   },
//                   {
//                     label: "Pending Payment",
//                     value: payments
//                       .filter((p) => p.status === "PENDING")
//                       .length.toString(),
//                     sub: "Action needed",
//                   },
//                 ].map((s) => (
//                   <div
//                     key={s.label}
//                     style={{
//                       background: "var(--white)",
//                       border: "1px solid var(--border)",
//                       borderRadius: "8px",
//                       padding: "1.25rem 1.5rem",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "1.8rem",
//                         fontWeight: 900,
//                         color: "var(--ink)",
//                         lineHeight: 1,
//                         marginBottom: "0.25rem",
//                       }}
//                     >
//                       {s.value}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "0.82rem",
//                         fontWeight: 600,
//                         color: "var(--ink-soft)",
//                         marginBottom: "0.15rem",
//                       }}
//                     >
//                       {s.label}
//                     </div>
//                     <div
//                       style={{ fontSize: "0.72rem", color: "var(--ink-faint)" }}
//                     >
//                       {s.sub}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Matters list */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "1px",
//                   background: "var(--border)",
//                   border: "1px solid var(--border)",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {matters.map((m) => (
//                   <div
//                     key={m.id}
//                     onClick={() => setSelectedMatter(m)}
//                     onMouseEnter={() => setHoveredMatter(m.id)}
//                     onMouseLeave={() => setHoveredMatter(null)}
//                     style={{
//                       background:
//                         hoveredMatter === m.id
//                           ? "var(--paper)"
//                           : "var(--white)",
//                       padding: "1.5rem 2rem",
//                       cursor: "pointer",
//                       transition: "background 0.15s",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "1rem",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "1.25rem",
//                         flex: 1,
//                         minWidth: "200px",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "38px",
//                           height: "38px",
//                           borderRadius: "8px",
//                           background: "var(--paper-warm)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontFamily: "var(--font-mono)",
//                           fontSize: "0.6rem",
//                           color: "var(--ink-muted)",
//                           flexShrink: 0,
//                           fontWeight: 500,
//                         }}
//                       >
//                         {m.id}
//                       </div>
//                       <div>
//                         <div
//                           style={{
//                             fontSize: "0.9rem",
//                             fontWeight: 600,
//                             color: "var(--ink)",
//                             marginBottom: "0.2rem",
//                           }}
//                         >
//                           {m.title}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: "0.75rem",
//                             color: "var(--ink-muted)",
//                           }}
//                         >
//                           {m.service} · Due {m.due}
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "1.25rem",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: "0.72rem",
//                           fontWeight: 600,
//                           color:
//                             m.status === "FINAL_DELIVERED"
//                               ? "#1D4ED8"
//                               : m.status === "DRAFT_READY"
//                                 ? "#1A6B3C"
//                                 : m.status === "IN_REVIEW"
//                                   ? "#B45309"
//                                   : m.status === "REVISIONS"
//                                     ? "#6D28D9"
//                                     : "#5C5C5C",
//                           background:
//                             m.status === "FINAL_DELIVERED"
//                               ? "#EFF6FF"
//                               : m.status === "DRAFT_READY"
//                                 ? "#E8F5EE"
//                                 : m.status === "IN_REVIEW"
//                                   ? "#FEF3C7"
//                                   : m.status === "REVISIONS"
//                                     ? "#EDE9FE"
//                                     : "#F4F4F6",
//                           padding: "0.3rem 0.75rem",
//                           borderRadius: "50px",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {statusLabels[m.status] || m.status}
//                       </span>
//                       <span
//                         style={{
//                           fontSize: "0.72rem",
//                           color: "var(--ink-faint)",
//                         }}
//                       >
//                         →
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Matter detail view */}
//           {activeTab === "matters" && selectedMatter && (
//             <>
//               <div style={{ marginBottom: "2rem" }}>
//                 <button
//                   onClick={() => setSelectedMatter(null)}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     fontFamily: "var(--font-body)",
//                     fontSize: "0.82rem",
//                     color: "var(--ink-muted)",
//                     padding: 0,
//                     marginBottom: "1.25rem",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.4rem",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.color = "var(--ink)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "var(--ink-muted)";
//                   }}
//                 >
//                   ← Back to Matters
//                 </button>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                     flexWrap: "wrap",
//                     gap: "1rem",
//                   }}
//                 >
//                   <div>
//                     <div
//                       style={{
//                         fontFamily: "var(--font-mono)",
//                         fontSize: "0.62rem",
//                         letterSpacing: "0.1em",
//                         textTransform: "uppercase",
//                         color: "var(--ink-faint)",
//                         marginBottom: "0.3rem",
//                       }}
//                     >
//                       {selectedMatter.id}
//                     </div>
//                     <h1
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "1.5rem",
//                         fontWeight: 900,
//                         color: "var(--ink)",
//                         letterSpacing: "-0.02em",
//                       }}
//                     >
//                       {selectedMatter.title}
//                     </h1>
//                   </div>
//                   <span
//                     style={{
//                       fontSize: "0.78rem",
//                       fontWeight: 600,
//                       color: selectedMatter.statusColor,
//                       background: selectedMatter.statusBg,
//                       padding: "0.4rem 1rem",
//                       borderRadius: "50px",
//                     }}
//                   >
//                     {selectedMatter.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Status tracker */}
//               <div
//                 style={{
//                   background: "var(--white)",
//                   border: "1px solid var(--border)",
//                   borderRadius: "10px",
//                   padding: "2rem",
//                   marginBottom: "1.5rem",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "0.78rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: "0.06em",
//                     color: "var(--ink-soft)",
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   Matter Progress
//                 </div>
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "0" }}
//                 >
//                   {statusSteps.map((step, i) => {
//                     const currentIndex = statusSteps.indexOf(
//                       selectedMatter.status,
//                     );
//                     const isDone = i <= currentIndex;
//                     const isCurrent = i === currentIndex;
//                     return (
//                       <div
//                         key={step}
//                         style={{
//                           flex: 1,
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           position: "relative",
//                         }}
//                       >
//                         {i < statusSteps.length - 1 && (
//                           <div
//                             style={{
//                               position: "absolute",
//                               top: "14px",
//                               left: "50%",
//                               right: "-50%",
//                               height: "2px",
//                               background:
//                                 isDone && i < currentIndex
//                                   ? "var(--gold)"
//                                   : "var(--border)",
//                               zIndex: 0,
//                             }}
//                           />
//                         )}
//                         <div
//                           style={{
//                             width: "28px",
//                             height: "28px",
//                             borderRadius: "50%",
//                             background: isCurrent
//                               ? "var(--gold)"
//                               : isDone
//                                 ? "var(--ink)"
//                                 : "var(--paper-warm)",
//                             border: isCurrent
//                               ? "3px solid var(--gold)"
//                               : isDone
//                                 ? "3px solid var(--ink)"
//                                 : "2px solid var(--border)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             zIndex: 1,
//                             position: "relative",
//                             transition: "all 0.3s",
//                             flexShrink: 0,
//                           }}
//                         >
//                           {isDone && !isCurrent && (
//                             <span
//                               style={{
//                                 color: "var(--white)",
//                                 fontSize: "0.65rem",
//                                 fontWeight: 700,
//                               }}
//                             >
//                               ✓
//                             </span>
//                           )}
//                           {isCurrent && (
//                             <span
//                               style={{
//                                 width: "8px",
//                                 height: "8px",
//                                 borderRadius: "50%",
//                                 background: "var(--ink)",
//                                 display: "block",
//                               }}
//                             />
//                           )}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: "0.65rem",
//                             fontWeight: isCurrent ? 700 : 400,
//                             color: isCurrent
//                               ? "var(--ink)"
//                               : isDone
//                                 ? "var(--ink-soft)"
//                                 : "var(--ink-faint)",
//                             marginTop: "0.5rem",
//                             textAlign: "center",
//                             lineHeight: 1.3,
//                           }}
//                         >
//                           {step}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "1.5rem",
//                 }}
//               >
//                 {/* Matter details */}
//                 <div
//                   style={{
//                     background: "var(--white)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "10px",
//                     padding: "1.75rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "0.78rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.06em",
//                       color: "var(--ink-soft)",
//                       marginBottom: "1.25rem",
//                     }}
//                   >
//                     Matter Details
//                   </div>
//                   {[
//                     { label: "Service", value: selectedMatter.service },
//                     { label: "Assigned To", value: selectedMatter.lawyer },
//                     { label: "Started", value: selectedMatter.date },
//                     { label: "Due Date", value: selectedMatter.due },
//                     {
//                       label: "Documents",
//                       value: `${selectedMatter._count?.documents || selectedMatter.documents?.length || 0} file(s)`,
//                     },
//                   ].map((d) => (
//                     <div
//                       key={d.label}
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "0.65rem 0",
//                         borderBottom: "1px solid var(--border)",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: "0.8rem",
//                           color: "var(--ink-muted)",
//                         }}
//                       >
//                         {d.label}
//                       </span>
//                       <span
//                         style={{
//                           fontSize: "0.8rem",
//                           fontWeight: 600,
//                           color: "var(--ink)",
//                         }}
//                       >
//                         {d.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Documents */}
//                 <div
//                   style={{
//                     background: "var(--white)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "10px",
//                     padding: "1.75rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "0.78rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.06em",
//                       color: "var(--ink-soft)",
//                       marginBottom: "1.25rem",
//                     }}
//                   >
//                     Documents
//                   </div>
//                   {selectedMatter.docs > 0 ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "0.6rem",
//                       }}
//                     >
//                       {/* {Array.from({ length: selectedMatter.docs }).map(
//                         (_, i) => (
//                           <div
//                             key={i}
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               padding: "0.85rem 1rem",
//                               background: "var(--paper)",
//                               borderRadius: "6px",
//                               border: "1px solid var(--border)",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.6rem",
//                               }}
//                             >
//                               <span style={{ fontSize: "1rem" }}>📄</span>
//                               <span
//                                 style={{
//                                   fontSize: "0.8rem",
//                                   color: "var(--ink)",
//                                   fontWeight: 500,
//                                 }}
//                               >
//                                 {i === 0
//                                   ? "Original Document.pdf"
//                                   : "Reviewed Draft.pdf"}
//                               </span>
//                             </div>
//                             <button
//                               style={{
//                                 background: "none",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 fontSize: "0.75rem",
//                                 color: "var(--gold-dark)",
//                                 fontWeight: 600,
//                                 fontFamily: "var(--font-body)",
//                               }}
//                             >
//                               Download
//                             </button>
//                           </div>
//                         ),
//                       )} */}
//                       {(selectedMatter.documents || []).map(
//                         (doc: any, i: number) => (
//                           <div
//                             key={doc.id}
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "space-between",
//                               padding: "0.85rem 1rem",
//                               background: "var(--paper)",
//                               borderRadius: "6px",
//                               border: "1px solid var(--border)",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.6rem",
//                               }}
//                             >
//                               <span style={{ fontSize: "1rem" }}>📄</span>
//                               <span
//                                 style={{
//                                   fontSize: "0.8rem",
//                                   color: "var(--ink)",
//                                   fontWeight: 500,
//                                 }}
//                               >
//                                 {doc.name}
//                               </span>
//                             </div>
//                             <button
//                               style={{
//                                 background: "none",
//                                 border: "none",
//                                 cursor: "pointer",
//                                 fontSize: "0.75rem",
//                                 color: "var(--gold-dark)",
//                                 fontWeight: 600,
//                                 fontFamily: "var(--font-body)",
//                               }}
//                             >
//                               Download
//                             </button>
//                           </div>
//                         ),
//                       )}
//                     </div>
//                   ) : (
//                     <div
//                       style={{
//                         textAlign: "center",
//                         padding: "2rem",
//                         color: "var(--ink-faint)",
//                         fontSize: "0.82rem",
//                       }}
//                     >
//                       No documents yet. Upload below to get started.
//                     </div>
//                   )}

//                   {/* Upload area */}
//                   <div
//                     style={{
//                       marginTop: "1rem",
//                       border: "2px dashed var(--border-strong)",
//                       borderRadius: "6px",
//                       padding: "1.25rem",
//                       textAlign: "center",
//                       cursor: "pointer",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.borderColor = "var(--gold)";
//                       e.currentTarget.style.background = "var(--gold-pale)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.borderColor =
//                         "var(--border-strong)";
//                       e.currentTarget.style.background = "transparent";
//                     }}
//                   >
//                     <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>
//                       📎
//                     </div>
//                     <div
//                       style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}
//                     >
//                       Drop files here or{" "}
//                       <span
//                         style={{ color: "var(--gold-dark)", fontWeight: 600 }}
//                       >
//                         browse
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "0.68rem",
//                         color: "var(--ink-faint)",
//                         marginTop: "0.25rem",
//                       }}
//                     >
//                       PDF, DOCX up to 25MB
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages */}
//                 <div
//                   style={{
//                     background: "var(--white)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "10px",
//                     padding: "1.75rem",
//                     gridColumn: "1 / -1",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "0.78rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.06em",
//                       color: "var(--ink-soft)",
//                       marginBottom: "1.25rem",
//                     }}
//                   >
//                     Messages
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "1rem",
//                       marginBottom: "1.25rem",
//                     }}
//                   >
//                     {selectedMatter.messages > 0 ? (
//                       <>
//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "0.75rem",
//                             alignItems: "flex-start",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "30px",
//                               height: "30px",
//                               borderRadius: "50%",
//                               background: "var(--ink)",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               color: "var(--gold)",
//                               fontSize: "0.7rem",
//                               fontWeight: 700,
//                               flexShrink: 0,
//                             }}
//                           >
//                             LC
//                           </div>
//                           <div
//                             style={{
//                               background: "var(--paper)",
//                               borderRadius: "0 8px 8px 8px",
//                               padding: "0.85rem 1rem",
//                               flex: 1,
//                             }}
//                           >
//                             <div
//                               style={{
//                                 fontSize: "0.72rem",
//                                 fontWeight: 600,
//                                 color: "var(--ink)",
//                                 marginBottom: "0.3rem",
//                               }}
//                             >
//                               LexEdge — Principal Counsel
//                             </div>
//                             <div
//                               style={{
//                                 fontSize: "0.82rem",
//                                 color: "var(--ink-soft)",
//                                 lineHeight: 1.6,
//                               }}
//                             >
//                               We have received your document and begun our
//                               review. We will have annotated feedback ready
//                               within 24 hours.
//                             </div>
//                             <div
//                               style={{
//                                 fontSize: "0.68rem",
//                                 color: "var(--ink-faint)",
//                                 marginTop: "0.4rem",
//                               }}
//                             >
//                               Today, 10:24 AM
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <div
//                         style={{
//                           textAlign: "center",
//                           padding: "1.5rem",
//                           color: "var(--ink-faint)",
//                           fontSize: "0.82rem",
//                         }}
//                       >
//                         No messages yet. Send a message below.
//                       </div>
//                     )}
//                   </div>
//                   <div style={{ display: "flex", gap: "0.75rem" }}>
//                     <input
//                       type="text"
//                       placeholder="Type a message..."
//                       style={{
//                         flex: 1,
//                         padding: "0.75rem 1rem",
//                         border: "1.5px solid var(--border-strong)",
//                         borderRadius: "6px",
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.875rem",
//                         outline: "none",
//                         background: "var(--paper)",
//                       }}
//                     />
//                     <button
//                       style={{
//                         padding: "0.75rem 1.25rem",
//                         background: "var(--ink)",
//                         color: "var(--white)",
//                         border: "none",
//                         borderRadius: "6px",
//                         fontFamily: "var(--font-body)",
//                         fontSize: "0.82rem",
//                         fontWeight: 600,
//                         cursor: "pointer",
//                       }}
//                     >
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Payments tab */}
//           {activeTab === "payments" && (
//             <>
//               <div style={{ marginBottom: "2rem" }}>
//                 <h1
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "1.6rem",
//                     fontWeight: 900,
//                     color: "var(--ink)",
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   Payment History
//                 </h1>
//                 <p
//                   style={{
//                     fontSize: "0.82rem",
//                     color: "var(--ink-muted)",
//                     marginTop: "0.25rem",
//                   }}
//                 >
//                   All transactions and GST invoices in one place.
//                 </p>
//               </div>

//               {/* Payment pending banner */}
//               {payments
//                 .filter((p) => p.status === "PENDING")
//                 .map((p: any) => (
//                   <div
//                     key={p.id}
//                     style={{
//                       background: "#FEF3C7",
//                       border: "1px solid #B45309",
//                       borderRadius: "8px",
//                       padding: "1rem 1.5rem",
//                       marginBottom: "1rem",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "1rem",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <span style={{ fontSize: "1.1rem" }}>⚠️</span>
//                       <div>
//                         <div
//                           style={{
//                             fontSize: "0.85rem",
//                             fontWeight: 700,
//                             color: "#92400E",
//                           }}
//                         >
//                           Payment pending for {p.matter?.title}
//                         </div>
//                         <div style={{ fontSize: "0.75rem", color: "#B45309" }}>
//                           Work begins after payment. Amount: ₹
//                           {p.amount?.toLocaleString("en-IN")}
//                         </div>
//                       </div>
//                     </div>
//                     <PaymentButton
//                       matterId={p.matterId}
//                       amount={p.amount}
//                       currency={p.currency || "INR"}
//                       matterTitle={p.matter?.title || "Legal Matter"}
//                       clientName={`${user?.firstName} ${user?.lastName}`}
//                       clientEmail={
//                         user?.emailAddresses?.[0]?.emailAddress || ""
//                       }
//                       clientPhone={user?.phoneNumbers?.[0]?.phoneNumber || ""}
//                       onSuccess={() => loadData()}
//                     />
//                   </div>
//                 ))}

//               <div
//                 style={{
//                   background: "var(--white)",
//                   border: "1px solid var(--border)",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
//                     padding: "0.85rem 1.5rem",
//                     background: "var(--paper)",
//                     borderBottom: "1px solid var(--border)",
//                   }}
//                 >
//                   {["ID", "Matter", "Amount", "Date", "Status"].map((h) => (
//                     <div
//                       key={h}
//                       style={{
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: "0.06em",
//                         color: "var(--ink-muted)",
//                       }}
//                     >
//                       {h}
//                     </div>
//                   ))}
//                 </div>
//                 {payments.map((p) => (
//                   <div
//                     key={p.id}
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr",
//                       padding: "1rem 1.5rem",
//                       borderBottom: "1px solid var(--border)",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontFamily: "var(--font-mono)",
//                         fontSize: "0.72rem",
//                         color: "var(--ink-muted)",
//                       }}
//                     >
//                       {p.id}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: "0.82rem",
//                         color: "var(--ink)",
//                         fontWeight: 500,
//                       }}
//                     >
//                       {p.matter}
//                     </div>
//                     <div
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "0.9rem",
//                         fontWeight: 700,
//                         color: "var(--ink)",
//                       }}
//                     >
//                       {p.amount}
//                     </div>
//                     <div
//                       style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}
//                     >
//                       {p.date}
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.75rem",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontSize: "0.72rem",
//                           fontWeight: 600,
//                           color:
//                             p.status === "Paid" ? "var(--green)" : "#B45309",
//                           background:
//                             p.status === "Paid"
//                               ? "var(--green-pale)"
//                               : "#FEF3C7",
//                           padding: "0.2rem 0.6rem",
//                           borderRadius: "50px",
//                         }}
//                       >
//                         {p.status}
//                       </span>
//                       {p.status === "Paid" && (
//                         <button
//                           style={{
//                             background: "none",
//                             border: "none",
//                             cursor: "pointer",
//                             fontSize: "0.72rem",
//                             color: "var(--gold-dark)",
//                             fontWeight: 600,
//                             fontFamily: "var(--font-body)",
//                           }}
//                         >
//                           Invoice
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Profile tab */}
//           {activeTab === "profile" && (
//             <>
//               <div style={{ marginBottom: "2rem" }}>
//                 <h1
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "1.6rem",
//                     fontWeight: 900,
//                     color: "var(--ink)",
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   Profile
//                 </h1>
//                 <p
//                   style={{
//                     fontSize: "0.82rem",
//                     color: "var(--ink-muted)",
//                     marginTop: "0.25rem",
//                   }}
//                 >
//                   Your account details and preferences.
//                 </p>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "1.5rem",
//                 }}
//               >
//                 <div
//                   style={{
//                     background: "var(--white)",
//                     border: "1px solid var(--border)",
//                     borderRadius: "10px",
//                     padding: "2rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "0.78rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.06em",
//                       color: "var(--ink-soft)",
//                       marginBottom: "1.5rem",
//                     }}
//                   >
//                     Personal Details
//                   </div>
//                   {[
//                     { label: "Full Name", value: "Rahul Sharma", type: "text" },
//                     {
//                       label: "Email",
//                       value: "rahul@company.com",
//                       type: "email",
//                     },
//                     {
//                       label: "Phone / WhatsApp",
//                       value: "+91 98765 43210",
//                       type: "tel",
//                     },
//                     {
//                       label: "Company",
//                       value: "Acme Technologies Pvt. Ltd.",
//                       type: "text",
//                     },
//                   ].map((f) => (
//                     <div key={f.label} style={{ marginBottom: "1rem" }}>
//                       <div
//                         style={{
//                           fontSize: "0.7rem",
//                           fontWeight: 700,
//                           letterSpacing: "0.06em",
//                           textTransform: "uppercase",
//                           color: "var(--ink-soft)",
//                           marginBottom: "0.35rem",
//                         }}
//                       >
//                         {f.label}
//                       </div>
//                       <input
//                         type={f.type}
//                         defaultValue={f.value}
//                         style={{
//                           width: "100%",
//                           padding: "0.72rem 0.95rem",
//                           border: "1.5px solid var(--border-strong)",
//                           borderRadius: "4px",
//                           fontFamily: "var(--font-body)",
//                           fontSize: "0.875rem",
//                           color: "var(--ink)",
//                           background: "var(--paper)",
//                           outline: "none",
//                         }}
//                       />
//                     </div>
//                   ))}
//                   <button
//                     style={{
//                       background: "var(--ink)",
//                       color: "var(--white)",
//                       padding: "0.75rem 1.5rem",
//                       border: "none",
//                       borderRadius: "4px",
//                       fontFamily: "var(--font-body)",
//                       fontSize: "0.85rem",
//                       fontWeight: 600,
//                       cursor: "pointer",
//                       marginTop: "0.5rem",
//                     }}
//                   >
//                     Save Changes
//                   </button>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "1.5rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: "var(--white)",
//                       border: "1px solid var(--border)",
//                       borderRadius: "10px",
//                       padding: "2rem",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "0.78rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: "0.06em",
//                         color: "var(--ink-soft)",
//                         marginBottom: "1.25rem",
//                       }}
//                     >
//                       Referral Program
//                     </div>
//                     <p
//                       style={{
//                         fontSize: "0.82rem",
//                         color: "var(--ink-muted)",
//                         lineHeight: 1.65,
//                         marginBottom: "1rem",
//                       }}
//                     >
//                       Give a friend Rs.500 off their first matter, get Rs.500
//                       credit when they complete it.
//                     </p>
//                     <div
//                       style={{
//                         background: "var(--paper)",
//                         borderRadius: "6px",
//                         padding: "0.85rem 1rem",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         marginBottom: "0.75rem",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontFamily: "var(--font-mono)",
//                           fontSize: "0.85rem",
//                           fontWeight: 600,
//                           color: "var(--ink)",
//                           letterSpacing: "0.08em",
//                         }}
//                       >
//                         RAHUL500
//                       </span>
//                       <button
//                         style={{
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                           fontSize: "0.75rem",
//                           color: "var(--gold-dark)",
//                           fontWeight: 600,
//                           fontFamily: "var(--font-body)",
//                         }}
//                       >
//                         Copy
//                       </button>
//                     </div>
//                     <div
//                       style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}
//                     >
//                       0 referrals · Rs.0 credits earned
//                     </div>
//                   </div>

//                   <div
//                     style={{
//                       background: "var(--white)",
//                       border: "1px solid var(--border)",
//                       borderRadius: "10px",
//                       padding: "2rem",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "0.78rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: "0.06em",
//                         color: "var(--ink-soft)",
//                         marginBottom: "1.25rem",
//                       }}
//                     >
//                       Notifications
//                     </div>
//                     {[
//                       { label: "Matter status updates", enabled: true },
//                       { label: "Payment confirmations", enabled: true },
//                       { label: "WhatsApp notifications", enabled: true },
//                       { label: "Email newsletters", enabled: false },
//                     ].map((n) => (
//                       <div
//                         key={n.label}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "0.65rem 0",
//                           borderBottom: "1px solid var(--border)",
//                         }}
//                       >
//                         <span
//                           style={{
//                             fontSize: "0.82rem",
//                             color: "var(--ink-soft)",
//                           }}
//                         >
//                           {n.label}
//                         </span>
//                         <div
//                           style={{
//                             width: "36px",
//                             height: "20px",
//                             borderRadius: "10px",
//                             background: n.enabled
//                               ? "var(--green)"
//                               : "var(--border-strong)",
//                             position: "relative",
//                             cursor: "pointer",
//                             transition: "background 0.2s",
//                           }}
//                         >
//                           <div
//                             style={{
//                               position: "absolute",
//                               top: "3px",
//                               left: n.enabled ? "19px" : "3px",
//                               width: "14px",
//                               height: "14px",
//                               borderRadius: "50%",
//                               background: "var(--white)",
//                               transition: "left 0.2s",
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useClerk, useAuth } from '@clerk/nextjs';
import PaymentButton from '../components/portal/PaymentButton';
import { apiRequest } from '../../lib/api';

type Tab = 'matters' | 'payments' | 'profile';

const statusSteps = ['RECEIVED', 'IN_REVIEW', 'DRAFT_READY', 'REVISIONS', 'FINAL_DELIVERED'];
const statusLabels: Record<string, string> = {
  RECEIVED: 'Received',
  IN_REVIEW: 'In Review',
  DRAFT_READY: 'Draft Ready',
  REVISIONS: 'Revisions',
  FINAL_DELIVERED: 'Final Delivered',
  CLOSED: 'Closed',
};

const statusColors: Record<string, { color: string; bg: string }> = {
  RECEIVED: { color: '#5C5C5C', bg: '#F4F4F6' },
  IN_REVIEW: { color: '#B45309', bg: '#FEF3C7' },
  DRAFT_READY: { color: '#1A6B3C', bg: '#E8F5EE' },
  REVISIONS: { color: '#6D28D9', bg: '#EDE9FE' },
  FINAL_DELIVERED: { color: '#1D4ED8', bg: '#EFF6FF' },
  CLOSED: { color: '#5C5C5C', bg: '#F4F4F6' },
};

export default function Portal() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('matters');
  const [selectedMatter, setSelectedMatter] = useState<any>(null);
  const [matters, setMatters] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredMatter, setHoveredMatter] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<Tab | null>(null);
  const [profile, setProfile] = useState({
    firstName: '', lastName: '', phone: '', company: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (dbUser) {
      setProfile({
        firstName: dbUser.firstName || user?.firstName || '',
        lastName: dbUser.lastName || user?.lastName || '',
        phone: dbUser.phone || user?.phoneNumbers?.[0]?.phoneNumber || '',
        company: dbUser.company || '',
      });
    }
  }, [dbUser, user]);

  const loadData = async () => {
    try {
      const token = await getToken();

      const userData = await apiRequest('/api/users/me', {}, token || undefined);
      if (userData.role === 'ADMIN' || userData.role === 'LAWYER') {
        window.location.href = '/admin';
        return;
      }
      setDbUser(userData);

      const [mattersData, paymentsData] = await Promise.all([
        apiRequest('/api/matters/my', {}, token || undefined),
        apiRequest('/api/payments/my', {}, token || undefined),
      ]);
      setMatters(mattersData);
      setPayments(paymentsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      const token = await getToken();
      const updated = await apiRequest('/api/users/me', {
        method: 'PATCH',
        body: JSON.stringify(profile),
      }, token || undefined);
      setDbUser(updated);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setSavingProfile(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedMatter) return;
    setSendingMsg(true);
    try {
      const token = await getToken();
      const msg = await apiRequest(`/api/matters/${selectedMatter.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content: message }),
      }, token || undefined);
      setSelectedMatter((prev: any) => ({
        ...prev,
        messages: [...(prev.messages || []), msg],
      }));
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMsg(false);
    }
  };

  const copyReferral = () => {
    const code = dbUser?.referralCode || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    width: '100%', padding: '0.72rem 0.95rem',
    border: '1.5px solid var(--border-strong)', borderRadius: '4px',
    fontFamily: 'var(--font-body)', fontSize: '0.875rem',
    color: 'var(--ink)', background: 'var(--paper)', outline: 'none',
  };

  const labelStyle = {
    fontSize: '0.7rem', fontWeight: 700 as const,
    letterSpacing: '0.06em', textTransform: 'uppercase' as const,
    color: 'var(--ink-soft)', marginBottom: '0.35rem', display: 'block' as const,
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink-muted)' }}>Loading your portal...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '60px', padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--ink)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => window.location.href = '/'} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--white)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.02em' }}>
            Lex<span style={{ color: 'var(--gold)' }}>Edge</span>
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1rem' }}>|</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
            Client Portal
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink)' }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <button onClick={() => signOut({ redirectUrl: '/' })} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: '60px', display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <aside style={{ width: '220px', background: 'var(--white)', borderRight: '1px solid var(--border)', padding: '2rem 0', position: 'fixed', top: '60px', bottom: 0, left: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.5rem' }}>Navigation</div>
          </div>

          {([
            { id: 'matters', label: 'My Matters', icon: '📋', count: matters.length },
            { id: 'payments', label: 'Payments', icon: '💳', count: null },
            { id: 'profile', label: 'Profile', icon: '👤', count: null },
          ] as { id: Tab; label: string; icon: string; count: number | null }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSelectedMatter(null); }}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{ width: '100%', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: activeTab === item.id ? 'var(--gold-pale)' : hoveredTab === item.id ? 'var(--paper)' : 'transparent', border: 'none', borderLeft: activeTab === item.id ? '3px solid var(--gold)' : '3px solid transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.95rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: activeTab === item.id ? 600 : 400, color: activeTab === item.id ? 'var(--ink)' : 'var(--ink-muted)' }}>
                  {item.label}
                </span>
              </div>
              {item.count !== null && (
                <span style={{ background: activeTab === item.id ? 'var(--gold)' : 'var(--paper-warm)', color: activeTab === item.id ? 'var(--ink)' : 'var(--ink-muted)', fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '50px' }}>
                  {item.count}
                </span>
              )}
            </button>
          ))}

          <div style={{ marginTop: 'auto', padding: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => window.location.href = '/#booking'}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--ink)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
            >
              + New Matter
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ marginLeft: '220px', flex: 1, padding: '2.5rem 3rem', minHeight: 'calc(100vh - 60px)' }}>

          {/* MATTERS LIST */}
          {activeTab === 'matters' && !selectedMatter && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>My Matters</h1>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>Track the status of all your legal matters in one place.</p>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Total Matters', value: matters.length.toString(), sub: 'All time' },
                  { label: 'In Progress', value: matters.filter(m => ['RECEIVED','IN_REVIEW','DRAFT_READY','REVISIONS'].includes(m.status)).length.toString(), sub: 'Active now' },
                  { label: 'Completed', value: matters.filter(m => m.status === 'FINAL_DELIVERED').length.toString(), sub: 'This month' },
                  { label: 'Pending Payment', value: payments.filter(p => p.status === 'PENDING').length.toString(), sub: 'Action needed' },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.25rem 1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--ink)', lineHeight: 1, marginBottom: '0.25rem' }}>{s.value}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: '0.15rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-faint)' }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Matters list */}
              {matters.length === 0 ? (
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>No matters yet</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>Book a consultation and we will create your first matter.</p>
                  <button onClick={() => window.location.href = '/#booking'} style={{ background: 'var(--ink)', color: 'var(--white)', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                    Book a Consultation
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                  {matters.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMatter(m)}
                      onMouseEnter={() => setHoveredMatter(m.id)}
                      onMouseLeave={() => setHoveredMatter(null)}
                      style={{ background: hoveredMatter === m.id ? 'var(--paper)' : 'var(--white)', padding: '1.5rem 2rem', cursor: 'pointer', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: 0 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--paper-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                          📄
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {m.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                            {m.service}{m.dueDate ? ` · Due ${new Date(m.dueDate).toLocaleDateString('en-IN')}` : ''}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '0.72rem', fontWeight: 600,
                          color: statusColors[m.status]?.color || '#5C5C5C',
                          background: statusColors[m.status]?.bg || '#F4F4F6',
                          padding: '0.3rem 0.75rem', borderRadius: '50px', whiteSpace: 'nowrap',
                        }}>
                          {statusLabels[m.status] || m.status}
                        </span>
                        <span style={{ color: 'var(--ink-faint)', fontSize: '0.85rem' }}>→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* MATTER DETAIL */}
          {activeTab === 'matters' && selectedMatter && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <button onClick={() => setSelectedMatter(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--ink-muted)', padding: 0, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-muted)'; }}
                >
                  ← Back to Matters
                </button>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.3rem' }}>
                      Matter
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                      {selectedMatter.title}
                    </h1>
                  </div>
                  <span style={{
                    fontSize: '0.78rem', fontWeight: 600,
                    color: statusColors[selectedMatter.status]?.color || '#5C5C5C',
                    background: statusColors[selectedMatter.status]?.bg || '#F4F4F6',
                    padding: '0.4rem 1rem', borderRadius: '50px',
                  }}>
                    {statusLabels[selectedMatter.status] || selectedMatter.status}
                  </span>
                </div>
              </div>

              {/* Status tracker */}
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                  Matter Progress
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  {statusSteps.map((step, i) => {
                    const currentIndex = statusSteps.indexOf(selectedMatter.status);
                    const isDone = i <= currentIndex;
                    const isCurrent = i === currentIndex;
                    return (
                      <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        {i < statusSteps.length - 1 && (
                          <div style={{ position: 'absolute', top: '13px', left: '50%', right: '-50%', height: '2px', background: i < currentIndex ? 'var(--gold)' : 'var(--border)', zIndex: 0 }} />
                        )}
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isCurrent ? 'var(--gold)' : isDone ? 'var(--ink)' : 'var(--paper-warm)', border: isCurrent ? '3px solid var(--gold)' : isDone ? '3px solid var(--ink)' : '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative', flexShrink: 0 }}>
                          {isDone && !isCurrent && <span style={{ color: 'var(--white)', fontSize: '0.65rem', fontWeight: 700 }}>✓</span>}
                          {isCurrent && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)', display: 'block' }} />}
                        </div>
                        <div style={{ fontSize: '0.62rem', fontWeight: isCurrent ? 700 : 400, color: isCurrent ? 'var(--ink)' : isDone ? 'var(--ink-soft)' : 'var(--ink-faint)', marginTop: '0.5rem', textAlign: 'center', lineHeight: 1.3, padding: '0 0.25rem' }}>
                          {statusLabels[step]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Details */}
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                    Matter Details
                  </div>
                  {[
                    { label: 'Service', value: selectedMatter.service },
                    { label: 'Assigned To', value: selectedMatter.lawyer ? `${selectedMatter.lawyer.firstName} ${selectedMatter.lawyer.lastName}` : 'Being assigned' },
                    { label: 'Due Date', value: selectedMatter.dueDate ? new Date(selectedMatter.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBD' },
                    { label: 'SLA', value: `${selectedMatter.slaHours || 48} hours` },
                    { label: 'Documents', value: `${selectedMatter.documents?.length || 0} file(s)` },
                  ].map((d) => (
                    <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{d.label}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)' }}>{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Documents */}
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                    Documents
                  </div>
                  {selectedMatter.documents?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                      {selectedMatter.documents.map((doc: any) => (
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--paper)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '1rem' }}>📄</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--ink)', fontWeight: 500 }}>{doc.name}</span>
                          </div>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--gold-dark)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--ink-faint)', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      No documents yet
                    </div>
                  )}
                  <div
                    style={{ border: '2px dashed var(--border-strong)', borderRadius: '6px', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'var(--gold-pale)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>📎</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                      Drop files here or <span style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>browse</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', marginTop: '0.25rem' }}>PDF, DOCX up to 25MB</div>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.75rem', gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                    Messages
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {(selectedMatter.messages || []).length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--ink-faint)', fontSize: '0.82rem' }}>
                        No messages yet. Send a message below.
                      </div>
                    ) : (
                      (selectedMatter.messages || []).map((msg: any) => {
                        const isFromTeam = msg.sender?.role !== 'CLIENT';
                        return (
                          <div key={msg.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexDirection: isFromTeam ? 'row' : 'row-reverse' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isFromTeam ? 'var(--ink)' : 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isFromTeam ? 'var(--gold)' : 'var(--ink)', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                              {isFromTeam ? 'LE' : (user?.firstName?.[0] || 'C')}
                            </div>
                            <div style={{ background: isFromTeam ? 'var(--paper)' : 'var(--gold-pale)', borderRadius: isFromTeam ? '0 8px 8px 8px' : '8px 0 8px 8px', padding: '0.85rem 1rem', maxWidth: '70%' }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.3rem' }}>
                                {isFromTeam ? 'LexEdge Team' : 'You'}
                              </div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{msg.content}</div>
                              <div style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', marginTop: '0.4rem' }}>
                                {new Date(msg.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      style={{ flex: 1, padding: '0.75rem 1rem', border: '1.5px solid var(--border-strong)', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', background: 'var(--paper)' }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={sendingMsg || !message.trim()}
                      style={{ padding: '0.75rem 1.25rem', background: 'var(--ink)', color: 'var(--white)', border: 'none', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, cursor: sendingMsg ? 'not-allowed' : 'pointer', opacity: sendingMsg ? 0.7 : 1 }}
                    >
                      {sendingMsg ? '...' : 'Send'}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PAYMENTS */}
          {activeTab === 'payments' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Payment History</h1>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>All transactions and invoices in one place.</p>
              </div>

              {/* Pending payments */}
              {payments.filter(p => p.status === 'PENDING').map((p: any) => (
                <div key={p.id} style={{ background: '#FEF3C7', border: '1px solid #B45309', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400E' }}>
                        Payment pending for {p.matter?.title || 'Legal Matter'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#B45309' }}>
                        Work begins after payment. Amount: ₹{p.amount?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                  <PaymentButton
                    matterId={p.matterId}
                    amount={p.amount}
                    currency={p.currency || 'INR'}
                    matterTitle={p.matter?.title || 'Legal Matter'}
                    clientName={`${user?.firstName} ${user?.lastName}`}
                    clientEmail={user?.emailAddresses?.[0]?.emailAddress || ''}
                    clientPhone={user?.phoneNumbers?.[0]?.phoneNumber || ''}
                    onSuccess={() => loadData()}
                  />
                </div>
              ))}

              {payments.length === 0 ? (
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>No payments yet</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>Your payment history will appear here once you have active matters.</p>
                </div>
              ) : (
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', padding: '0.85rem 1.5rem', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
                    {['ID', 'Matter', 'Amount', 'Date', 'Status'].map((h) => (
                      <div key={h} style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)' }}>{h}</div>
                    ))}
                  </div>
                  {payments.map((p: any) => (
                    <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.id?.slice(0, 8)}...
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.matter?.title || 'Legal Matter'}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)' }}>
                        {p.currency === 'INR' ? '₹' : '$'}{p.amount?.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {new Date(p.createdAt).toLocaleDateString('en-IN')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: p.status === 'PAID' ? 'var(--green)' : '#B45309', background: p.status === 'PAID' ? 'var(--green-pale)' : '#FEF3C7', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>
                          {p.status}
                        </span>
                        {p.status === 'PAID' && (
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.72rem', color: 'var(--gold-dark)', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                            Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Profile</h1>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>Your account details and preferences.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>
                    Personal Details
                  </div>

                  {profileSaved && (
                    <div style={{ background: 'var(--green-pale)', border: '1px solid var(--green)', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600 }}>
                      ✓ Profile saved successfully
                    </div>
                  )}

                  {[
                    { field: 'firstName', label: 'First Name', type: 'text' },
                    { field: 'lastName', label: 'Last Name', type: 'text' },
                    { field: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
                    { field: 'company', label: 'Company / Organisation', type: 'text' },
                  ].map((f) => (
                    <div key={f.field} style={{ marginBottom: '1rem' }}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        type={f.type}
                        value={profile[f.field as keyof typeof profile]}
                        onChange={(e) => setProfile(prev => ({ ...prev, [f.field]: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={user?.emailAddresses?.[0]?.emailAddress || ''}
                      disabled
                      style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                    />
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-faint)', marginTop: '0.3rem' }}>
                      Email is managed by your sign-in provider
                    </div>
                  </div>

                  <button
                    onClick={saveProfile}
                    disabled={savingProfile}
                    style={{ background: savingProfile ? 'var(--ink-muted)' : 'var(--ink)', color: 'var(--white)', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, cursor: savingProfile ? 'not-allowed' : 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => { if (!savingProfile) e.currentTarget.style.background = 'var(--gold)'; if (!savingProfile) e.currentTarget.style.color = 'var(--ink)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = savingProfile ? 'var(--ink-muted)' : 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Referral */}
                  <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                      Referral Program
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: '1rem' }}>
                      Give a friend ₹500 off their first matter, get ₹500 credit when they complete it.
                    </p>
                    {dbUser?.referralCode ? (
                      <>
                        <div style={{ background: 'var(--paper)', borderRadius: '6px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.08em' }}>
                            {dbUser.referralCode.slice(0, 10).toUpperCase()}
                          </span>
                          <button
                            onClick={copyReferral}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: copied ? 'var(--green)' : 'var(--gold-dark)', fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
                          >
                            {copied ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
                          {dbUser._count?.referrals || 0} referrals · ₹{(dbUser._count?.referrals || 0) * 500} credits earned
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>Referral code loading...</div>
                    )}
                  </div>

                  {/* Notifications */}
                  <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px', padding: '2rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
                      Notifications
                    </div>
                    {[
                      { label: 'Matter status updates', enabled: true },
                      { label: 'Payment confirmations', enabled: true },
                      { label: 'WhatsApp notifications', enabled: true },
                      { label: 'Email newsletters', enabled: false },
                    ].map((n, i) => (
                      <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>{n.label}</span>
                        <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: n.enabled ? 'var(--green)' : 'var(--border-strong)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ position: 'absolute', top: '3px', left: n.enabled ? '19px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--white)', transition: 'left 0.2s' }} />
                        </div>
                      </div>
                    ))}
                    <p style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginTop: '0.75rem' }}>
                      Notification preferences will be fully configurable when WhatsApp integration is live.
                    </p>
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