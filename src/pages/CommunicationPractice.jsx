import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  saveCommunicationSession,
  getCommunicationSession,
  clearCommunicationSession,
} from "../utils/storage";
import CommunicationRecorder from "../components/CommunicationRecorder";
import TextToSpeech from "../components/TextToSpeech";
import "../styles/CommunicationPractice.css";
import API_URL from "../config/api";

/* ─── SVG Icon helpers (no external deps) ──────────────────── */
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M7 2l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M9 2L4 7l5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconCheck = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <path
      d="M2 5l2.5 2.5L8 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconStar = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 1l1.09 2.26L8.5 3.64l-1.75 1.7.41 2.41L5 6.5l-2.16 1.25.41-2.41L1.5 3.64l2.41-.38z" />
  </svg>
);
const IconAlert = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path
      d="M5 1L1 9h8L5 1zm0 2.5v2.5m0 1v.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M6 3v3l2 1"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);
const IconText = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2 3h8M2 6h6M2 9h7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Module definitions ─────────────────────────────────── */
const modules = [
  {
    id: "hr",
    title: "HR Interview",
    icon: "💼",
    description: "Practice common HR questions across multiple categories",
    color: "linear-gradient(135deg,#8b5cf6,#5b8af5)",
    tag: "Most Popular",
  },
  {
    id: "star",
    title: "STAR Method",
    icon: "⭐",
    description: "Master behavioral questions with the STAR framework",
    color: "linear-gradient(135deg,#fbbf24,#f97316)",
    tag: "Behavioral",
  },
  {
    id: "presentation",
    title: "Presentation Skills",
    icon: "🎤",
    description: "Improve public speaking and presentation delivery",
    color: "linear-gradient(135deg,#34d399,#5b8af5)",
    tag: "Speaking",
  },
  {
    id: "professional",
    title: "Professional Comm",
    icon: "📧",
    description: "Handle real-world workplace communication scenarios",
    color: "linear-gradient(135deg,#5b8af5,#a78bfa)",
    tag: "Workplace",
  },
];

const hrCategories = [
  { id: "common", label: "Common Questions", icon: "📋" },
  { id: "behavioral", label: "Behavioral (STAR)", icon: "⭐" },
  { id: "situational", label: "Situational", icon: "🔮" },
  { id: "career", label: "Career Goals", icon: "🎯" },
];

/* ─── Shared Topbar ─────────────────────────────────────── */
const Topbar = ({ badge }) => (
  <header className="cp-topbar">
    <div className="cp-topbar-logo">
      <div className="cp-topbar-logo-dot" />
      CommPractice
    </div>
    <div className="cp-topbar-right">
      {badge && <span className="cp-topbar-badge">{badge}</span>}
    </div>
  </header>
);

/* ─── Main component ─────────────────────────────────────── */
const CommunicationPractice = () => {
  const [step, setStep] = useState("hub");
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("common");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [duration, setDuration] = useState(0);

  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  // New state for Professional Comm (typed response)
  const [typedResponse, setTypedResponse] = useState("");

  const recorderRef = useRef(null);

  useEffect(() => {
    const saved = getCommunicationSession();

    if (saved) {
      const restore = window.confirm("Resume previous communication practice?");

      if (restore) {
        setStep(saved.step || "hub");
        setSelectedModule(saved.selectedModule || null);
        setSelectedCategory(saved.selectedCategory || "common");
        setCurrentQuestion(saved.currentQuestion || null);
        setEvaluation(saved.evaluation || null);
        setSessionId(saved.sessionId || null);
        setTranscript(saved.transcript || "");
        setDuration(saved.duration || 0);
        setTypedResponse(saved.typedResponse || "");
      } else {
        clearCommunicationSession();
      }
    }
  }, []);

  useEffect(() => {
    if (!selectedModule && step === "hub") return;

    saveCommunicationSession({
      step,
      selectedModule,
      selectedCategory,
      currentQuestion,
      evaluation,
      sessionId,
      transcript,
      duration,
      typedResponse,
    });
  }, [
    step,
    selectedModule,
    selectedCategory,
    currentQuestion,
    evaluation,
    sessionId,
    transcript,
    duration,
    typedResponse,
  ]);

  /* ── Fullscreen helpers ─────────────────────────────── */
  const enterFullscreen = async () => {
    try {
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }

      return true;
    } catch (err) {
      console.error("Fullscreen failed:", err);

      return false;
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Exit fullscreen failed:", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        step === "practice" &&
        currentQuestion &&
        !document.fullscreenElement &&
        !fullscreenWarning
      ) {
        setFullscreenWarning(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [step, currentQuestion, fullscreenWarning]);

  const generateQuestion = async (moduleType, category = "common") => {
    setGenerating(true);
    try {
      const response = await axios.post(
        `${API_URL}/communication/generate-question`,
        { moduleType, category },
      );
      setCurrentQuestion(response.data.question);
      setStep("practice");
      setTypedResponse("");
      setTranscript("");
    } catch (error) {
      console.error("Error generating question:", error);
      alert("Failed to generate question. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleModuleClick = async (module) => {
    const success = await enterFullscreen();

    if (success || document.fullscreenElement) {
      setSelectedModule(module.id);

      if (module.id === "hr") {
        setStep("category");
      } else {
        await generateQuestion(module.id);
      }
    }
  };

  const startSession = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/communication/session/start`,
        {
          moduleType: selectedModule,
          subModule: selectedCategory,
          question: currentQuestion.question,
        },
      );
      setSessionId(response.data.sessionId);
      console.log("communication start session", response.data);
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  const handleRecordingComplete = async (transcriptText, recordedDuration) => {
    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/communication/evaluate`, {
        sessionId,
        transcript: transcriptText || "(No speech detected)",
        duration: recordedDuration,
        question: currentQuestion.question,
        moduleType: selectedModule,
      });
      setEvaluation(response.data.evaluation);
      setTranscript(transcriptText);
      setDuration(recordedDuration);
      await exitFullscreen();
      setStep("results");
      console.log("comm evaluation", response.data);
    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Failed to evaluate answer");
    } finally {
      setSubmitting(false);
    }
  };
  // Handle Submit for Professional Communication (typed response)
  const handleTypedSubmit = async () => {
    if (!typedResponse.trim()) {
      alert("Please type your response before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/communication/evaluate`, {
        sessionId,
        transcript: typedResponse.trim(),
        duration: typedResponse.split(/\s+/).length, // rough word count as duration proxy
        question: currentQuestion.question,
        moduleType: selectedModule,
      });

      setEvaluation(response.data.evaluation);
      setTranscript(typedResponse);
      setDuration(typedResponse.split(/\s+/).length);
      await exitFullscreen();
      setStep("results");
    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Failed to evaluate answer");
    } finally {
      setSubmitting(false);
    }
  };
  // Auto start session when question loads
  useEffect(() => {
    if (step === "practice" && currentQuestion && !sessionId) {
      startSession();
    }
  }, [step, currentQuestion, sessionId]);

  const resetPractice = () => {
    clearCommunicationSession();
    setFullscreenWarning(false);
    setStep("hub");
    setSelectedModule(null);
    setSelectedCategory("common");
    setCurrentQuestion(null);
    setEvaluation(null);
    setSessionId(null);
    setTranscript("");
    setTypedResponse("");
    setDuration(0);
    setGenerating(false);
    setSubmitting(false);
  };
  useEffect(() => {
    if (step === "results" && evaluation) {
      clearCommunicationSession();
    }
  }, [step, evaluation]);
  /* ── Score helpers ─────────────────────────────────────── */
  const getScoreClass = (s) => (s >= 70 ? "high" : s >= 50 ? "medium" : "low");

  const getScoreDashArray = (score, r = 40) => {
    const circ = 2 * Math.PI * r;
    return `${(score / 100) * circ} ${circ}`;
  };

  /* ══════════════════════════════════════════════════════════
     LOADING
  ══════════════════════════════════════════════════════════ */
  if (generating || submitting) {
    return (
      <div className="comm-root">
        {/* <Topbar badge="Practice" /> */}
        <div className="cp-page">
          <div className="cp-loading">
            <div className="cp-loading-ring" />
            <p className="cp-loading-text">
              {generating
                ? "Generating your question…"
                : "Evaluating your response…"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     HUB
  ══════════════════════════════════════════════════════════ */
  if (step === "hub") {
    return (
      <div className="comm-root">
        {/* <Topbar badge="Practice Hub" /> */}
        <div className="cp-page">
          <div className="cp-hub">
            {/* Hero */}
            <div className="cp-hub-hero">
              {/* <div className="cp-hub-eyebrow">
                <span className="cp-hub-eyebrow-line" />
                AI-Powered Communication Training
              </div> */}
              <h1 className="cp-hub-title">
                Speak with<em> confidence.</em>
              </h1>
              <p className="cp-hub-sub">
                Practice real interview questions, improve delivery, and get
                instant AI feedback on your communication skills.
              </p>
            </div>

            {/* Modules */}
            <div className="cp-hub-modules">
              <div className="cp-modules-label">Choose a practice module</div>
              <div className="cp-modules-grid">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="cp-module-tile"
                    onClick={() => handleModuleClick(mod)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleModuleClick(mod)
                    }
                  >
                    <div
                      className="cp-module-tile-accent"
                      style={{ background: mod.color }}
                    />
                    <div
                      className="cp-module-icon-wrap"
                      style={{ background: mod.color }}
                    >
                      {mod.icon}
                    </div>
                    <div className="cp-module-body">
                      <h3 className="cp-module-title">{mod.title}</h3>
                      <p className="cp-module-desc">{mod.description}</p>
                    </div>
                    <div className="cp-module-footer">
                      <span className="cp-module-tag">{mod.tag}</span>
                      <span className="cp-module-arrow">
                        <IconArrow />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats strip */}
              <div className="cp-hub-stats">
                {[
                  { value: "4", label: "Practice Modules" },
                  { value: "5+", label: "Question Types" },
                  { value: "AI", label: "Real-time Coaching" },
                  { value: "∞", label: "Sessions" },
                ].map((s) => (
                  <div key={s.label} className="cp-stat-item">
                    <div className="cp-stat-value">{s.value}</div>
                    <div className="cp-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     CATEGORY SELECTION
  ══════════════════════════════════════════════════════════ */
  if (step === "category") {
    return (
      <div className="comm-root">
        {/* <Topbar badge="HR Interview" /> */}
        <div className="cp-page">
          <div className="cp-category-page">
            <button className="cp-back-btn" onClick={() => setStep("hub")}>
              <IconChevronLeft /> Back to Hub
            </button>
            <div className="cp-category-header">
              <div className="cp-hub-eyebrow" style={{ marginTop: "1rem" }}>
                <span className="cp-hub-eyebrow-line" />
                HR Interview
              </div>
              <h2 className="cp-category-title">Select a question category</h2>
              <p className="cp-results-sub">
                Each category focuses on a different dimension of HR
                interviewing.
              </p>
            </div>
            <div className="cp-categories-grid">
              {hrCategories.map((cat) => (
                <div
                  key={cat.id}
                  className={`cp-category-card ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelectedCategory(cat.id)
                  }
                >
                  <div className="cp-cat-emoji">{cat.icon}</div>
                  <span className="cp-cat-label">{cat.label}</span>
                  <div className="cp-cat-check">
                    <IconCheck />
                  </div>
                </div>
              ))}
            </div>
            <button
              className="cp-generate-btn"
              onClick={async () => {
                const success = await enterFullscreen();

                if (success || document.fullscreenElement) {
                  await generateQuestion("hr", selectedCategory);
                }
              }}
            >
              Generate Question <IconArrow />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     PRACTICE — FULLSCREEN DARK SPLIT PANEL (Mock Interview style)
  ══════════════════════════════════════════════════════════ */
  if (step === "practice" && currentQuestion) {
    const isProfessionalComm = selectedModule === "professional";
    const tips = currentQuestion.tips || [];

    return (
      <div className="comm-root">
        {/* <Topbar badge="Live Practice" /> */}
        <div className="cp-page">
          {fullscreenWarning && (
            <div className="comm-fullscreen-overlay">
              <div className="comm-fullscreen-modal">
                <h2>Fullscreen Required</h2>

                <p>
                  Please return to fullscreen to continue the practice session.
                </p>

                <button
                  onClick={async () => {
                    const success = await enterFullscreen();

                    if (success || document.fullscreenElement) {
                      setFullscreenWarning(false);
                    }
                  }}
                >
                  Continue Practice
                </button>
              </div>
            </div>
          )}
          {/* ── Fullscreen progress bar (matches vi-progress) ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "10px 20px",
              background: "#0f172a",
              borderBottom: "1px solid #1e2937",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              <span>Question 1 of 1</span>
              <span>0% complete</span>
            </div>
            <div
              style={{
                height: "4px",
                background: "#1e2937",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  background: "linear-gradient(to right, #14b8a6, #22d3ee)",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          <div className="cp-practice">
            {/* ── LEFT: AI Coach ─────────────────────────────── */}
            <div className="cp-coach-panel">
              <div className="cp-coach-bg-art" />

              <div className="cp-coach-top">
                <div className="cp-coach-status">
                  <div className="cp-status-dot" />
                  AI Coach Active
                </div>
              </div>

              <div className="cp-coach-body">
                {/* Avatar */}
                <div className="cp-avatar-stage">
                  <div className="cp-avatar-ring" />
                  <div className="cp-avatar-ring" />
                  <div className="cp-avatar-ring" />
                  <div className="cp-avatar-core">🧠</div>
                </div>

                <div>
                  <div className="cp-coach-name">Alex Rivera</div>
                  <div className="cp-coach-role">Communication Expert</div>
                </div>

                {/* Question card */}
                <div className="cp-question-display">
                  <div className="cp-question-eyebrow">Question</div>
                  <p className="cp-question-text">{currentQuestion.question}</p>
                  <div style={{ display: "none" }}>
                    <TextToSpeech
                      text={currentQuestion.question}
                      autoSpeak={true}
                      onSpeakEnd={() => {
                        recorderRef.current?.startWithCountdown();
                      }}
                    />
                  </div>
                </div>

                {/* Tip chips */}
                {tips.length > 0 && (
                  <div className="cp-tips-row">
                    {tips.slice(0, 3).map((tip, i) => (
                      <span key={i} className="cp-tip-chip">
                        💡 {tip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Recorder ────────────────────────────── */}
            <div className="cp-recorder-panel">
              {/*<div className="cp-recorder-top">
                <div className="cp-progress-strip">
                  <div className="cp-progress-meta">
                    <span>Your Response</span>
                    <span>In Progress</span>
                  </div>
                  <div className="cp-progress-track">
                    <div
                      className="cp-progress-fill"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>*/}

              <div className="cp-recorder-body">
                {isProfessionalComm ? (
                  /* ── Textarea for Professional Communication ── */
                  <div className="cp-professional-input">
                    <div className="cp-input-header">
                      Type your professional response below
                    </div>
                    <textarea
                      className="cp-professional-textarea"
                      value={typedResponse}
                      onChange={(e) => setTypedResponse(e.target.value)}
                      placeholder="Write your response here... Be clear, professional, and concise."
                      rows={12}
                    />
                    <div className="cp-professional-footer">
                      <span className="cp-word-count">
                        {
                          typedResponse.trim().split(/\s+/).filter(Boolean)
                            .length
                        }{" "}
                        words
                      </span>
                      <button
                        className="cp-btn-primary"
                        onClick={handleTypedSubmit}
                        disabled={!typedResponse.trim() || submitting}
                      >
                        Submit Response
                      </button>
                    </div>
                  </div>
                ) : (
                  /* CommunicationRecorder handles all recording state internally */
                  <CommunicationRecorder
                    ref={recorderRef}
                    onRecordingComplete={handleRecordingComplete}
                    // autoStartDelay={5000} /* 5 s after AI finishes */
                    // silenceTimeout={10000} /* 10 s silence = auto submit */
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════
     RESULTS
  ══════════════════════════════════════════════════════════ */
  if (step === "results" && evaluation) {
    const scoreClass = getScoreClass(evaluation.overall.score);
    const r = 40;
    const dashArray = getScoreDashArray(evaluation.overall.score, r);
    const circumference = 2 * Math.PI * r;

    const strengthItems = evaluation.strengths || [];
    const improveItems = evaluation.improvements || [];

    return (
      <div className="comm-root">
        {/* <Topbar badge="Results" /> */}
        <div className="cp-page">
          <div className="cp-results">
            <button className="cp-back-btn" onClick={resetPractice}>
              <IconChevronLeft /> New Practice
            </button>

            {/* Header + Score dial */}
            <div className="cp-results-header">
              <div>
                {/* <div className="cp-hub-eyebrow" style={{ marginTop: "1rem" }}>
                  <span className="cp-hub-eyebrow-line" />
                  Performance Report
                </div> */}
                <h1 className="cp-results-title">Your Evaluation</h1>
                <p className="cp-results-sub">
                  AI-generated feedback based on your response
                </p>
              </div>

              {/* Animated score dial */}
              <div className="cp-score-dial">
                <div className="cp-score-ring">
                  <svg viewBox="0 0 100 100">
                    <defs>
                      <linearGradient
                        id="cpGradHigh"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#5b8af5" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="cp-score-ring-bg"
                      cx="50"
                      cy="50"
                      r={r}
                    />
                    <circle
                      className={`cp-score-ring-fill ${scoreClass}`}
                      cx="50"
                      cy="50"
                      r={r}
                      strokeDasharray={dashArray}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="cp-score-text">
                    <span className="cp-score-num">
                      {evaluation.overall.score}
                    </span>
                    <span className="cp-score-pct">/ 100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics + Feedback grid */}
            <div className="cp-results-grid">
              <div className="cp-result-cell">
                <div className="cp-result-cell-label">Scores</div>
                {[
                  { name: "Content", score: evaluation.content?.score ?? 0 },
                  { name: "Delivery", score: evaluation.delivery?.score ?? 0 },
                ].map((m) => (
                  <div key={m.name}>
                    <div className="cp-metric-row">
                      <span className="cp-metric-name">{m.name}</span>
                      <span className="cp-metric-val">{m.score}%</span>
                    </div>
                    <div className="cp-metric-bar">
                      <div
                        className="cp-metric-bar-fill"
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="cp-result-cell">
                <div className="cp-result-cell-label">Feedback</div>
                <ul className="cp-feedback-list">
                  {evaluation.overall?.feedback && (
                    <li className="cp-feedback-item">
                      {/* <span className="cp-feedback-icon improve">
                        <IconAlert />
                      </span> */}

                      <div>
                        {/* <strong>Overall Feed:</strong>{" "} */}
                        {evaluation.overall.feedback}
                      </div>
                    </li>
                  )}
                </ul>
                {/* {strengthItems.slice(0, 3).map((item, i) => (
                    <li key={`s-${i}`} className="cp-feedback-item">
                      <span className="cp-feedback-icon strength">
                        <IconStar />
                      </span>
                      {item}
                    </li>
                  ))}
                  {improveItems.slice(0, 2).map((item, i) => (
                    <li key={`i-${i}`} className="cp-feedback-item">
                      <span className="cp-feedback-icon improve">
                        <IconAlert />
                      </span>
                      {item}
                    </li>
                  ))} */}
              </div>
            </div>

            {/* Your answer transcript */}
            <div className="cp-answer-block">
              <div className="cp-answer-label">Your Answer</div>
              <p className="cp-answer-text">
                {transcript || "(No speech detected)"}
              </p>
              <div className="cp-answer-meta">
                <span className="cp-answer-stat">
                  <IconClock />
                  {Math.floor(duration / 60)}:
                  {(duration % 60).toString().padStart(2, "0")}
                </span>
                <span className="cp-answer-stat">
                  <IconText />
                  {transcript
                    ? transcript.split(/\s+/).filter(Boolean).length
                    : 0}{" "}
                  words
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="cp-results-actions">
              <button
                className="cp-btn-primary cp-btn-start"
                onClick={resetPractice}
              >
                Practice Again <IconArrow />
              </button>
              <button className="cp-btn-ghost" onClick={resetPractice}>
                Try Different Module
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CommunicationPractice;
