"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/homepage/Footer";

const questions = [
  {
    id: "q1",
    question:
      "Does your business have a signed founders or partnership agreement?",
    context:
      "This covers equity split, roles, exit clauses, and dispute resolution between co-founders.",
    options: [
      { label: "Yes, fully signed and up to date", score: 10 },
      { label: "We have something informal or verbal", score: 4 },
      { label: "No, we have not done this yet", score: 0 },
      { label: "Not applicable — solo founder", score: 10 },
    ],
  },
  {
    id: "q2",
    question: "Do you use signed contracts with every client or customer?",
    context:
      "Verbal agreements or email trails are not enforceable in most commercial disputes.",
    options: [
      { label: "Yes, every engagement has a signed contract", score: 10 },
      { label: "Sometimes, for larger clients only", score: 5 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q3",
    question:
      "Have your employee or contractor agreements been reviewed by a lawyer?",
    context:
      "Poorly drafted employment contracts are among the most common sources of business disputes.",
    options: [
      { label: "Yes, all reviewed and current", score: 10 },
      { label: "We use templates we found online", score: 3 },
      { label: "No formal agreements in place", score: 0 },
      { label: "No employees or contractors yet", score: 10 },
    ],
  },
  {
    id: "q4",
    question: "Does your business have a Privacy Policy and Terms of Service?",
    context:
      "Required under DPDPA 2023 for any business collecting personal data in India.",
    options: [
      { label: "Yes, lawyer-drafted and DPDPA compliant", score: 10 },
      { label: "Yes but they are generic templates", score: 4 },
      { label: "No, we do not have these", score: 0 },
      { label: "We do not collect any customer data", score: 10 },
    ],
  },
  {
    id: "q5",
    question: "How do you protect your intellectual property?",
    context:
      "IP assignment gaps are a major red flag for investors and acquirers.",
    options: [
      {
        label: "IP assignment agreements are in place with all contributors",
        score: 10,
      },
      { label: "We have trademarks or patents filed", score: 8 },
      { label: "We rely on confidentiality clauses only", score: 4 },
      { label: "We have not addressed IP formally", score: 0 },
    ],
  },
  {
    id: "q6",
    question: "When did you last review your vendor or supplier contracts?",
    context:
      "Outdated vendor contracts often contain liability gaps or unfavourable terms.",
    options: [
      { label: "In the last 12 months", score: 10 },
      { label: "1-3 years ago", score: 5 },
      { label: "More than 3 years ago or never", score: 0 },
      { label: "No vendors or suppliers", score: 10 },
    ],
  },
  {
    id: "q7",
    question: "Do you have NDAs in place before sharing sensitive information?",
    context:
      "Covers partnerships, investor conversations, vendor discussions, and hiring.",
    options: [
      { label: "Always, before any sensitive discussion", score: 10 },
      { label: "Sometimes, depending on the situation", score: 5 },
      { label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q8",
    question: "Has your business undergone any form of legal audit or review?",
    context:
      "A legal audit identifies gaps before they become expensive problems.",
    options: [
      { label: "Yes, within the last year", score: 10 },
      { label: "Yes but more than 2 years ago", score: 5 },
      { label: "Never", score: 0 },
    ],
  },
  {
    id: "q9",
    question:
      "Are your payment terms and late payment clauses clearly defined in contracts?",
    context:
      "Unclear payment terms are the single biggest cause of cash flow disputes.",
    options: [
      { label: "Yes, clearly defined in all contracts", score: 10 },
      { label: "Somewhat, but not consistently", score: 4 },
      { label: "No, we handle it informally", score: 0 },
    ],
  },
  {
    id: "q10",
    question: "Do you have a process for reviewing contracts before signing?",
    context:
      "Even experienced founders sign contracts without reading key clauses.",
    options: [
      { label: "Yes, a lawyer reviews all significant contracts", score: 10 },
      { label: "We review internally but no legal review", score: 5 },
      { label: "We generally sign without detailed review", score: 0 },
    ],
  },
];

type ResultTier = {
  label: string;
  color: string;
  bg: string;
  desc: string;
  recommendations: string[];
};

function getResult(score: number): ResultTier {
  if (score >= 85)
    return {
      label: "Legally Strong",
      color: "var(--green)",
      bg: "var(--green-pale)",
      desc: "Your business has a solid legal foundation. Most key risk areas are covered. Focus now on keeping documents current and scaling your legal infrastructure as you grow.",
      recommendations: [
        "Schedule an annual legal audit to keep everything current",
        "Consider a retainer plan for ongoing contract management",
        "Review cross-border agreements if expanding internationally",
      ],
    };
  if (score >= 60)
    return {
      label: "Moderate Risk",
      color: "var(--amber)",
      bg: "var(--amber-pale)",
      desc: "You have some legal protections in place but there are meaningful gaps that could expose your business. Addressing these now is significantly cheaper than dealing with disputes later.",
      recommendations: [
        "Prioritise reviewing your client and vendor contracts",
        "Ensure DPDPA compliance if you collect customer data",
        "Get a startup legal audit to identify the highest-risk gaps",
      ],
    };
  return {
    label: "High Risk",
    color: "var(--crimson)",
    bg: "#FEE2E2",
    desc: "Your business has significant legal gaps that need urgent attention. These are not hypothetical risks — missing contracts, IP issues, and compliance failures are the most common causes of business disputes and investor rejection.",
    recommendations: [
      "Start with a free consultation to map your most urgent risks",
      "Get core contracts — client agreements, NDAs, employment docs — in place immediately",
      "Do not raise funding or sign major deals without a legal review first",
    ],
  };
}

export default function LegalHealthScore() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"quiz" | "email" | "result">("quiz");
  const [hoveredNext, setHoveredNext] = useState(false);
  const [hoveredOpt, setHoveredOpt] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const result = getResult(percentage);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [
      ...answers,
      questions[current].options[selectedOption].score,
    ];
    setAnswers(newAnswers);
    setSelectedOption(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setStage("email");
    }
  };

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          score: totalScore,
          percentage,
          answers,
          recommendations: result.recommendations,
        }),
      });
    } catch (err) {
      console.error("Quiz submission error:", err);
    } finally {
      setLoading(false);
      setStage("result");
    }
  };

  const progress = (current / questions.length) * 100;

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "66px",
          background: "var(--paper)",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "var(--ink)",
            padding: "3.5rem 8vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.06) 39px, rgba(201,168,76,0.06) 40px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: "600px" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1rem",
              }}
            >
              Free Tool
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 900,
                color: "var(--white)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Legal Health Score
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
              }}
            >
              10 questions. 3 minutes. Find out exactly where your business is
              legally exposed — and what to do about it.
            </p>
          </div>
        </div>

        {/* Quiz */}
        <div
          style={{
            padding: "4rem 8vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "680px" }}>
            {stage === "quiz" && (
              <>
                {/* Progress */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Question {current + 1} of {questions.length}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--gold)",
                      }}
                    >
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      background: "var(--border)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background: "var(--gold)",
                        borderRadius: "2px",
                        transition: "width 0.4s",
                      }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "2.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {questions[current].question}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--ink-muted)",
                      lineHeight: 1.65,
                      marginBottom: "1.75rem",
                      padding: "0.75rem 1rem",
                      background: "var(--paper)",
                      borderRadius: "6px",
                      borderLeft: "3px solid var(--gold)",
                    }}
                  >
                    {questions[current].context}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {questions[current].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        onMouseEnter={() => setHoveredOpt(i)}
                        onMouseLeave={() => setHoveredOpt(null)}
                        style={{
                          padding: "1rem 1.25rem",
                          border:
                            selectedOption === i
                              ? "1.5px solid var(--gold)"
                              : hoveredOpt === i
                                ? "1.5px solid var(--ink-muted)"
                                : "1.5px solid var(--border-strong)",
                          borderRadius: "6px",
                          background:
                            selectedOption === i
                              ? "var(--gold-pale)"
                              : "var(--white)",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "0.875rem",
                          fontWeight: selectedOption === i ? 600 : 400,
                          color: "var(--ink)",
                          fontFamily: "var(--font-body)",
                          transition: "all 0.15s",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            flexShrink: 0,
                            border:
                              selectedOption === i
                                ? "none"
                                : "1.5px solid var(--border-strong)",
                            background:
                              selectedOption === i
                                ? "var(--gold)"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.65rem",
                            color: "var(--ink)",
                          }}
                        >
                          {selectedOption === i ? "✓" : ""}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  onMouseEnter={() => setHoveredNext(true)}
                  onMouseLeave={() => setHoveredNext(false)}
                  disabled={selectedOption === null}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background:
                      selectedOption === null
                        ? "var(--border)"
                        : hoveredNext
                          ? "var(--gold)"
                          : "var(--ink)",
                    color:
                      selectedOption === null
                        ? "var(--ink-faint)"
                        : hoveredNext
                          ? "var(--ink)"
                          : "var(--white)",
                    border: "none",
                    borderRadius: "4px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: selectedOption === null ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {current < questions.length - 1
                    ? "Next Question →"
                    : "Get My Score →"}
                </button>
              </>
            )}

            {stage === "email" && (
              <div
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  📊
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Your score is ready.
                </h2>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--ink-muted)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                    maxWidth: "420px",
                    margin: "0 auto 2rem",
                  }}
                >
                  Enter your email to see your Legal Health Score, personalised
                  recommendations, and a follow-up from our team with next
                  steps.
                </p>
                <div style={{ maxWidth: "380px", margin: "0 auto" }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      border: "1.5px solid var(--border-strong)",
                      borderRadius: "4px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--ink)",
                      background: "var(--paper)",
                      outline: "none",
                      marginBottom: "0.75rem",
                      display: "block",
                    }}
                  />
                  {/* <button
                    onClick={handleSubmit}
                    style={{
                      width: '100%', padding: '0.95rem',
                      background: 'var(--ink)', color: 'var(--white)',
                      border: 'none', borderRadius: '4px',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--white)'; }}
                  >
                    See My Legal Health Score →
                  </button> */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "0.95rem",
                      background: "var(--ink)",
                      color: "var(--white)",
                      border: "none",
                      borderRadius: "4px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = "var(--gold)";
                        e.currentTarget.style.color = "var(--ink)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "var(--white)";
                    }}
                  >
                    {loading
                      ? "Saving your score..."
                      : "See My Legal Health Score →"}
                  </button>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--ink-faint)",
                      marginTop: "0.75rem",
                    }}
                  >
                    No spam. We will send your score and one follow-up. That is
                    it.
                  </p>
                </div>
              </div>
            )}

            {stage === "result" && (
              <div>
                {/* Score card */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "2.5rem",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    Your Legal Health Score
                  </div>

                  {/* Score circle */}
                  <div
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      background: result.bg,
                      border: `4px solid ${result.color}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.25rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: result.color,
                        lineHeight: 1,
                      }}
                    >
                      {percentage}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: result.color,
                        fontWeight: 600,
                      }}
                    >
                      / 100
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      background: result.bg,
                      color: result.color,
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      padding: "0.35rem 1rem",
                      borderRadius: "50px",
                      marginBottom: "1rem",
                    }}
                  >
                    {result.label}
                  </div>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--ink-muted)",
                      lineHeight: 1.75,
                      maxWidth: "500px",
                      margin: "0 auto",
                    }}
                  >
                    {result.desc}
                  </p>
                </div>

                {/* Recommendations */}
                <div
                  style={{
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "2rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Recommended next steps
                  </div>
                  {result.recommendations.map((r) => (
                    <div
                      key={r}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start",
                        marginBottom: "0.85rem",
                        padding: "0.85rem 1rem",
                        background: "var(--paper)",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--gold)",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "0.1rem",
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--ink-soft)",
                          lineHeight: 1.6,
                        }}
                      >
                        {r}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  style={{
                    background: "var(--ink)",
                    borderRadius: "12px",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--white)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Get a free consultation to fix these gaps.
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    30 minutes, no cost, no obligation. We will tell you exactly
                    what needs fixing and in what order.
                  </p>
                  <button
                    onClick={() => (window.location.href = "/#booking")}
                    style={{
                      background: "var(--gold)",
                      color: "var(--ink)",
                      padding: "0.9rem 2rem",
                      borderRadius: "4px",
                      border: "none",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--gold-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--gold)";
                    }}
                  >
                    Book Free Consultation →
                  </button>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    We have also sent your score and recommendations to {email}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
