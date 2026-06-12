import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Progress.css";
import API_URL from "../config/api";

// ─── Icon Components ───────────────────────────────────────────────────────────
const Icon = {
  Technical: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Communication: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Email: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Aptitude: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  HR: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  STAR: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Presentation: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20v14H2z" />
      <path d="M8 21l4-4 4 4" />
      <path d="M12 17v-4" />
    </svg>
  ),
  Professional: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Reading: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Flame: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  TrendUp: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Search: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Filter: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Award: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Target: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Lock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  BarChart: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Close: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Edit: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
};

// ─── Module Config ─────────────────────────────────────────────────────────────
const MODULE_CONFIG = {
  technical: {
    label: "Technical Interview",
    Icon: Icon.Technical,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  communication: {
    label: "Communication",
    Icon: Icon.Communication,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  hr: { label: "HR Interview", Icon: Icon.HR, color: "#ec4899", bg: "#fdf2f8" },
  star: {
    label: "STAR Method",
    Icon: Icon.STAR,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  presentation: {
    label: "Presentation",
    Icon: Icon.Presentation,
    color: "#10b981",
    bg: "#ecfdf5",
  },
  professional: {
    label: "Professional Comm.",
    Icon: Icon.Professional,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  email: {
    label: "Email Writing",
    Icon: Icon.Email,
    color: "#6366f1",
    bg: "#eef2ff",
  },
  aptitude: {
    label: "Aptitude Test",
    Icon: Icon.Aptitude,
    color: "#ef4444",
    bg: "#fef2f2",
  },
  reading: {
    label: "IELTS Reading",
    Icon: Icon.Reading,
    color: "#84cc16",
    bg: "#f7fee7",
  },
};

// ─── Animated Progress Ring ────────────────────────────────────────────────────
const ProgressRing = ({
  percent,
  size = 80,
  stroke = 6,
  color = "#3b82f6",
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-page-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#1e293b"
        fontSize={size * 0.18}
        fontWeight="700"
      >
        {percent}%
      </text>
    </svg>
  );
};

// ─── Score Badge ───────────────────────────────────────────────────────────────
const ScoreBadge = ({ score }) => {
  const tier =
    score >= 80 ? "high" : score >= 60 ? "mid" : score >= 40 ? "low" : "xlow";
  return (
    <span className={`progress-page-score-badge progress-page-score-${tier}`}>
      {score}%
    </span>
  );
};

// ─── Weekly Heatmap ────────────────────────────────────────────────────────────
const WeeklyHeatmap = ({ allSessions }) => {
  const today = new Date();
  const weeks = 12;
  const cells = [];
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + (6 - d)));
      const key = date.toDateString();
      const count = allSessions.filter(
        (s) => new Date(s.completedAt).toDateString() === key,
      ).length;
      cells.push({ date, count, key });
    }
  }
  const max = Math.max(...cells.map((c) => c.count), 1);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="progress-page-heatmap">
      <div className="progress-page-heatmap-days">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div
        className="progress-page-heatmap-grid"
        style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
      >
        {cells.map((cell, i) => {
          const intensity =
            cell.count === 0 ? 0 : Math.ceil((cell.count / max) * 4);
          return (
            <div
              key={i}
              className={`progress-page-heatmap-cell progress-page-heatmap-i${intensity}`}
              title={`${cell.date.toLocaleDateString()} — ${cell.count} session${cell.count !== 1 ? "s" : ""}`}
            />
          );
        })}
      </div>
      <div className="progress-page-heatmap-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`progress-page-heatmap-cell progress-page-heatmap-i${i}`}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

// ─── Mini Bar Chart ────────────────────────────────────────────────────────────
const MiniBarChart = ({ data, color }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="progress-page-minichart">
      {data.map((d, i) => (
        <div
          key={i}
          className="progress-page-minichart-bar-wrap"
          title={`${d.label}: ${d.value}`}
        >
          <div
            className="progress-page-minichart-bar"
            style={{
              height: `${(d.value / max) * 100}%`,
              background: color,
              animationDelay: `${i * 0.05}s`,
            }}
          />
          <span className="progress-page-minichart-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Achievement Badge ─────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    id: "first_session",
    title: "First Step",
    desc: "Complete your first session",
    check: (p) => p.totalSessions >= 1,
    Icon: Icon.CheckCircle,
    color: "#3b82f6",
  },
  {
    id: "streak_3",
    title: "On a Roll",
    desc: "Maintain a 3-day streak",
    check: (p) => (p.streak || 0) >= 3,
    Icon: Icon.Flame,
    color: "#f59e0b",
  },
  {
    id: "streak_7",
    title: "7-Day Warrior",
    desc: "Maintain a 7-day streak",
    check: (p) => (p.streak || 0) >= 7,
    Icon: Icon.Flame,
    color: "#ef4444",
  },
  {
    id: "comm_expert",
    title: "Comm. Expert",
    desc: "Complete 5 communication sessions",
    check: (p) => (p.communication?.sessions || 0) >= 5,
    Icon: Icon.Communication,
    color: "#8b5cf6",
  },
  {
    id: "aptitude_master",
    title: "Aptitude Master",
    desc: "Score 80%+ on an aptitude test",
    check: (p) => p.aptitude?.avgScore >= 80,
    Icon: Icon.Target,
    color: "#10b981",
  },
  {
    id: "email_specialist",
    title: "Email Specialist",
    desc: "Complete 3 email sessions",
    check: (p) => (p.email?.sessions || 0) >= 3,
    Icon: Icon.Email,
    color: "#6366f1",
  },
  {
    id: "tech_10",
    title: "Tech Veteran",
    desc: "Complete 10 technical interviews",
    check: (p) => (p.technical?.sessions || 0) >= 10,
    Icon: Icon.Technical,
    color: "#0891b2",
  },
  {
    id: "high_scorer",
    title: "High Achiever",
    desc: "Achieve an average score of 85%+",
    check: (p) => (p.averageScore || 0) >= 85,
    Icon: Icon.Award,
    color: "#ec4899",
  },
  {
    id: "all_rounder",
    title: "All-Rounder",
    desc: "Try all 5 different modules",
    check: (p) =>
      Object.values(p.moduleStats || {}).filter((m) => m.sessions > 0).length >=
      5,
    Icon: Icon.BarChart,
    color: "#84cc16",
  },
];

// ─── Edit Profile Modal ────────────────────────────────────────────────────────
const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Analyst",
  "DevOps Engineer",
  "Product Manager",
  "Mobile Developer",
  "QA Engineer",
  "Security Engineer",
];
const EXP_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const TECH_OPTIONS = [
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "PHP",
  "Go",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Git",
];

const EditProfileModal = ({ user, onClose, onSave, updateUser }) => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    role: user?.role || "Frontend Developer",
    experienceLevel: user?.experienceLevel || "Beginner",
    technologyStack: user?.technologyStack || [],
  });
  const [customTech, setCustomTech] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTech = (t) =>
    setForm((p) => ({
      ...p,
      technologyStack: p.technologyStack.includes(t)
        ? p.technologyStack.filter((x) => x !== t)
        : [...p.technologyStack, t],
    }));

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`${API_URL}/auth/update`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (updateUser) await updateUser(form);
      onSave();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="progress-page-modal-overlay" onClick={onClose}>
      <div className="progress-page-modal" onClick={(e) => e.stopPropagation()}>
        <div className="progress-page-modal-head">
          <h3>Edit Profile</h3>
          <button className="progress-page-modal-close" onClick={onClose}>
            <Icon.Close />
          </button>
        </div>
        <div className="progress-page-modal-body">
          {error && <div className="progress-page-alert-error">{error}</div>}
          <label className="progress-page-form-label">Target Role</label>
          <select
            className="progress-page-form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <label className="progress-page-form-label">Experience Level</label>
          <div className="progress-page-exp-row">
            {EXP_LEVELS.map((l) => (
              <button
                key={l}
                className={`progress-page-exp-btn ${form.experienceLevel === l ? "active" : ""}`}
                onClick={() => setForm({ ...form, experienceLevel: l })}
              >
                {l}
              </button>
            ))}
          </div>

          <label className="progress-page-form-label">Technology Stack</label>
          <div className="progress-page-tech-grid">
            {TECH_OPTIONS.map((t) => (
              <label
                key={t}
                className={`progress-page-tech-chip ${form.technologyStack.includes(t) ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  style={{ display: "none" }}
                  checked={form.technologyStack.includes(t)}
                  onChange={() => toggleTech(t)}
                />
                {t}
              </label>
            ))}
          </div>
          <div className="progress-page-custom-tech">
            <input
              className="progress-page-form-input"
              placeholder="Add custom technology..."
              value={customTech}
              onChange={(e) => setCustomTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customTech.trim()) {
                  toggleTech(customTech.trim());
                  setCustomTech("");
                }
              }}
            />
          </div>
          {form.technologyStack.length > 0 && (
            <div className="progress-page-selected-tech">
              {form.technologyStack.map((t) => (
                <span key={t} className="progress-page-selected-chip">
                  {t}
                  <button onClick={() => toggleTech(t)}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="progress-page-modal-foot">
          <button className="progress-page-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="progress-page-btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Session Detail Modal ──────────────────────────────────────────────────────
const SessionDetailModal = ({ session, onClose }) => {
  if (!session) return null;
  const cfg = MODULE_CONFIG[session.module] || MODULE_CONFIG.technical;
  return (
    <div className="progress-page-modal-overlay" onClick={onClose}>
      <div
        className="progress-page-modal progress-page-modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="progress-page-modal-head">
          <div className="progress-page-modal-title-row">
            <span
              className="progress-page-module-dot"
              style={{ background: cfg.color }}
            />
            <h3>{cfg.label} — Session Details</h3>
          </div>
          <button className="progress-page-modal-close" onClick={onClose}>
            <Icon.Close />
          </button>
        </div>
        <div className="progress-page-modal-body">
          <div className="progress-page-detail-meta">
            <div>
              <span>Date</span>
              <strong>{new Date(session.completedAt).toLocaleString()}</strong>
            </div>
            <div>
              <span>Score</span>
              <ScoreBadge score={session.score} />
            </div>
            {session.title && (
              <div>
                <span>Topic</span>
                <strong>{session.title}</strong>
              </div>
            )}
          </div>
          {session.questions?.length > 0 && (
            <>
              <p className="progress-page-section-label">
                Questions &amp; Answers
              </p>
              <div className="progress-page-qa-list">
                {session.questions.map((q, i) => (
                  <div key={i} className="progress-page-qa-item">
                    <div className="progress-page-qa-header">
                      <span className="progress-page-qa-num">{i + 1}</span>
                      {q.category && (
                        <span className="progress-page-qa-cat">
                          {q.category}
                        </span>
                      )}
                    </div>
                    <p className="progress-page-qa-question">{q.question}</p>
                    {q.answer && (
                      <div className="progress-page-qa-answer">
                        <span>Your Answer</span>
                        <p>{q.answer}</p>
                        {q.feedback && (
                          <>
                            <span>Feedback</span>
                            <p>{q.feedback}</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const ProgressPage = () => {
  const { user, updateUser } = useAuth();
  const token = localStorage.getItem("token");

  const [progress, setProgress] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  const [selectedSession, setSelectedSession] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Session history state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const SESSIONS_PER_PAGE = 8;

  // Goals
  const [goals] = useState({
    weeklySessions: { target: 10, current: 0 },
    communications: { target: 5, current: 0 },
    accuracy: { target: 75, current: 0 },
    reading: { target: 3, current: 0 },
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [progRes, sessRes, streakRes] = await Promise.allSettled([
        axios.get(`${API_URL}/progress`, { headers }),
        axios.get(`${API_URL}/interview/history`, { headers }),
        axios.get(`${API_URL}/progress/streak`, { headers }),
      ]);
      if (progRes.status === "fulfilled")
        setProgress(progRes.value.data.progress);
      if (sessRes.status === "fulfilled") setSessions(sessRes.value.data);
      if (streakRes.status === "fulfilled") {
        const s = streakRes.value.data;
        setStreak({
          current: s.currentStreak || 0,
          longest: s.longestStreak || 0,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Merge allSessions from progress API + technical sessions
  const allSessions = React.useMemo(() => {
    const fromProgress = progress?.allSessions || [];
    const techFromHistory = sessions.map((s) => ({
      _id: s._id,
      module: "technical",
      title: s.role || "Technical Interview",
      score: s.totalScore || 0,
      completedAt: s.completedAt,
      questions: s.questions,
    }));
    // Merge, deduplicate by completedAt+module
    const merged = [...fromProgress];
    techFromHistory.forEach((ts) => {
      if (
        !merged.find(
          (m) =>
            m.module === "technical" &&
            Math.abs(new Date(m.completedAt) - new Date(ts.completedAt)) < 5000,
        )
      ) {
        merged.push(ts);
      }
    });
    return merged
      .filter((s) => s.completedAt)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  }, [progress, sessions]);
  console.log("all data in progress page: ", allSessions);
  // Filtered + paginated sessions
  const filteredSessions = React.useMemo(() => {
    let arr = [...allSessions];
    if (filterModule !== "all")
      arr = arr.filter((s) => s.module === filterModule);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      arr = arr.filter(
        (s) =>
          (s.title || "").toLowerCase().includes(q) ||
          (s.module || "").toLowerCase().includes(q),
      );
    }
    if (sortOrder === "highest") arr.sort((a, b) => b.score - a.score);
    else if (sortOrder === "lowest") arr.sort((a, b) => a.score - b.score);
    return arr;
  }, [allSessions, filterModule, searchQuery, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSessions.length / SESSIONS_PER_PAGE),
  );
  const pagedSessions = filteredSessions.slice(
    (currentPage - 1) * SESSIONS_PER_PAGE,
    currentPage * SESSIONS_PER_PAGE,
  );
  console.log("pagination data", pagedSessions);

  // Learning journey (recent 8 from allSessions)
  const timelineSessions = allSessions.slice(0, 8);

  // Weekly bar chart (last 7 days)
  const weeklyChartData = React.useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const key = d.toDateString();
      return {
        label: days[d.getDay()],
        value: allSessions.filter(
          (s) => new Date(s.completedAt).toDateString() === key,
        ).length,
      };
    });
  }, [allSessions]);

  // Module stats chart
  const moduleChartData = React.useMemo(() => {
    const stats = progress?.moduleStats || {};
    return Object.entries(MODULE_CONFIG).map(([key, cfg]) => ({
      label: cfg.label.split(" ")[0],
      value: stats[key]?.score || 0,
      color: cfg.color,
    }));
  }, [progress]);

  // Achievements
  const achievementData = React.useMemo(() => {
    const p = { ...progress, streak: streak.current };
    return ACHIEVEMENTS.map((a) => ({ ...a, unlocked: a.check(p) }));
  }, [progress, streak]);

  // Goals updater from progress
  const computedGoals = React.useMemo(() => {
    const stats = progress?.moduleStats || {};
    const weeklyTotal = weeklyChartData.reduce((s, d) => s + d.value, 0);
    return {
      weeklySessions: { target: 10, current: Math.min(weeklyTotal, 10) },
      communications: {
        target: 5,
        current: Math.min(stats.communication?.sessions || 0, 5),
      },
      accuracy: {
        target: 75,
        current: Math.min(progress?.averageScore || 0, 75),
      },
      reading: {
        target: 3,
        current: Math.min(stats.reading?.sessions || 0, 3),
      },
    };
  }, [progress, weeklyChartData]);

  const learningHours =
    Math.round((progress?.totalSessions || 0) * 0.5 * 10) / 10;
  const growthPct = Math.min(100, Math.round(progress?.averageScore || 0));
  const overallScore = progress?.averageScore || 0;
  const motivationText =
    overallScore >= 85
      ? "Outstanding Performance"
      : overallScore >= 70
        ? "Excellent Progress"
        : overallScore >= 50
          ? "Building Momentum"
          : "Keep Practicing";

  if (loading) {
    return (
      <div className="progress-page-loading">
        <div className="progress-page-spinner" />
        <p>Loading your progress dashboard...</p>
      </div>
    );
  }

  return (
    <div className="progress-page-root">
      {/* ── PROFILE OVERVIEW ── */}
      <section className="progress-page-profile-section">
        <div className="progress-page-profile-card">
          <div className="progress-page-profile-left">
            <div className="progress-page-avatar-wrap">
              <div className="progress-page-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="progress-page-avatar-badge">
                <Icon.CheckCircle />
              </span>
            </div>
            <div className="progress-page-profile-info">
              <h2 className="progress-page-profile-name">
                {user?.name || "User"}
              </h2>
              <p className="progress-page-profile-role">
                {user?.role || "Interview Trainee"} &middot;{" "}
                {user?.experienceLevel || "Beginner"}
              </p>
              <p className="progress-page-profile-date">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
              <div className="progress-page-profile-tags">
                {(user?.technologyStack || []).slice(0, 4).map((t) => (
                  <span key={t}>{t}</span>
                ))}
                {(user?.technologyStack || []).length > 4 && (
                  <span>+{user.technologyStack.length - 4}</span>
                )}
              </div>
            </div>
          </div>
          <div className="progress-page-profile-stats">
            <div className="progress-page-profile-stat">
              <span className="progress-page-stat-icon">
                <Icon.Flame />
              </span>
              <span className="progress-page-stat-val">{streak.current}</span>
              <span className="progress-page-stat-lbl">Day Streak</span>
            </div>
            <div className="progress-page-profile-stat">
              <span className="progress-page-stat-icon">
                <Icon.Clock />
              </span>
              <span className="progress-page-stat-val">{learningHours}h</span>
              <span className="progress-page-stat-lbl">Learning Hours</span>
            </div>
            <div className="progress-page-profile-stat">
              <span className="progress-page-stat-icon">
                <Icon.TrendUp />
              </span>
              <span className="progress-page-stat-val">
                {progress?.totalSessions || 0}
              </span>
              <span className="progress-page-stat-lbl">Sessions Done</span>
            </div>
            <div className="progress-page-profile-ring-stat">
              <ProgressRing
                percent={growthPct}
                size={90}
                stroke={7}
                color="#3b82f6"
              />
              <span className="progress-page-ring-label">{motivationText}</span>
            </div>
          </div>
          <button
            className="progress-page-edit-btn"
            onClick={() => setShowEditProfile(true)}
          >
            <Icon.Edit />
          </button>
        </div>
      </section>

      <div className="progress-page-grid-two">
        {/* ── LEARNING JOURNEY TIMELINE ── */}
        <section className="progress-page-card progress-page-timeline-card">
          <div className="progress-page-card-head">
            <h3>Learning Journey</h3>
            <span className="progress-page-card-sub">Recent milestones</span>
          </div>
          <div className="progress-page-timeline">
            {timelineSessions.length === 0 && (
              <div className="progress-page-empty">
                <Icon.Target />
                <p>No sessions recorded yet. Start your first session!</p>
              </div>
            )}
            {timelineSessions.map((s, i) => {
              const cfg = MODULE_CONFIG[s.module] || MODULE_CONFIG.technical;
              const Ic = cfg.Icon;
              return (
                <div
                  key={i}
                  className="progress-page-timeline-item"
                  style={{
                    "--tl-color": cfg.color,
                    "--tl-bg": cfg.bg,
                    animationDelay: `${i * 0.07}s`,
                  }}
                >
                  <div className="progress-page-tl-dot">
                    <Ic />
                  </div>
                  <div className="progress-page-tl-line" />
                  <div className="progress-page-tl-content">
                    <div className="progress-page-tl-row">
                      <span className="progress-page-tl-module">
                        {cfg.label}
                      </span>
                      <ScoreBadge score={s.score} />
                    </div>
                    <p className="progress-page-tl-title">
                      {s.title || cfg.label}
                    </p>
                    <span className="progress-page-tl-date">
                      {new Date(s.completedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── ANALYTICS ── */}
        <div className="progress-page-analytics-col">
          {/* <section className="progress-page-card">
            <div className="progress-page-card-head">
              <h3>Weekly Activity</h3>
              <span className="progress-page-card-sub">Sessions per day</span>
            </div>
            <MiniBarChart data={weeklyChartData} color="#3b82f6" />
          </section> */}

          <section className="progress-page-card">
            <div className="progress-page-card-head">
              <h3>Activity Calendar</h3>
              <span className="progress-page-card-sub">Last 12 weeks</span>
            </div>
            <WeeklyHeatmap allSessions={allSessions} />
          </section>

          {/* <section className="progress-page-card">
            <div className="progress-page-card-head">
              <h3>Module Performance</h3>
              <span className="progress-page-card-sub">
                Average score by module
              </span>
            </div>
            <div className="progress-page-module-perf-list">
              {Object.entries(MODULE_CONFIG).map(([key, cfg]) => {
                const score = progress?.moduleStats?.[key]?.score || 0;
                const sessions = progress?.moduleStats?.[key]?.sessions || 0;
                const Ic = cfg.Icon;
                return (
                  <div key={key} className="progress-page-module-perf-item">
                    <span
                      className="progress-page-module-perf-icon"
                      style={{ color: cfg.color, background: cfg.bg }}
                    >
                      <Ic />
                    </span>
                    <div className="progress-page-module-perf-info">
                      <div className="progress-page-module-perf-top">
                        <span>{cfg.label}</span>
                        <span className="progress-page-module-perf-score">
                          {score}%
                        </span>
                      </div>
                      <div className="progress-page-perf-bar">
                        <div
                          className="progress-page-perf-fill"
                          style={{ width: `${score}%`, background: cfg.color }}
                        />
                      </div>
                    </div>
                    <span className="progress-page-module-sessions">
                      {sessions}
                    </span>
                  </div>
                );
              })}
            </div>
          </section> */}
        </div>
      </div>

      {/* ── GOALS ── */}
      <section className="progress-page-card progress-page-goals-card">
        <div className="progress-page-card-head">
          <h3>Goals &amp; Targets</h3>
          <span className="progress-page-card-sub">This week's progress</span>
        </div>
        <div className="progress-page-goals-grid">
          {[
            {
              label: "Weekly Sessions",
              icon: <Icon.BarChart />,
              color: "#3b82f6",
              ...computedGoals.weeklySessions,
              unit: "sessions",
            },
            {
              label: "Communication",
              icon: <Icon.Communication />,
              color: "#8b5cf6",
              ...computedGoals.communications,
              unit: "sessions",
            },
            {
              label: "Accuracy Target",
              icon: <Icon.Target />,
              color: "#10b981",
              ...computedGoals.accuracy,
              unit: "%",
            },
            {
              label: "Practice Consistency",
              icon: <Icon.Flame />,
              color: "#f59e0b",
              target: 7,
              current: Math.min(streak.current || 0, 7),
              unit: "days",
            },
          ].map((g, i) => {
            const pct = Math.round((g.current / g.target) * 100);
            const r = 28;
            const circ = 2 * Math.PI * r;
            return (
              <div
                key={i}
                className="progress-page-goal-card"
                style={{ "--g-color": g.color }}
              >
                <div className="progress-page-goal-ring-wrap">
                  <svg width="72" height="72">
                    <circle
                      cx="36"
                      cy="36"
                      r={r}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="5"
                    />
                    <circle
                      cx="36"
                      cy="36"
                      r={r}
                      fill="none"
                      stroke={g.color}
                      strokeWidth="5"
                      strokeDasharray={circ}
                      strokeDashoffset={circ - (pct / 100) * circ}
                      strokeLinecap="round"
                      transform="rotate(-90 36 36)"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <span
                    className="progress-page-goal-ring-icon"
                    style={{ color: g.color }}
                  >
                    {g.icon}
                  </span>
                </div>
                <div className="progress-page-goal-info">
                  <p className="progress-page-goal-label">{g.label}</p>
                  <p className="progress-page-goal-progress">
                    <strong>{g.current}</strong> / {g.target} {g.unit}
                  </p>
                  <div className="progress-page-goal-bar">
                    <div style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <p className="progress-page-goal-pct">{pct}% complete</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="progress-page-card progress-page-achievements-card">
        <div className="progress-page-card-head">
          <h3>Achievements</h3>
          <span className="progress-page-card-sub">
            {achievementData.filter((a) => a.unlocked).length}/
            {achievementData.length} unlocked
          </span>
        </div>
        <div className="progress-page-achievements-grid">
          {achievementData.map((a) => {
            const Ic = a.Icon;
            return (
              <div
                key={a.id}
                className={`progress-page-achievement ${a.unlocked ? "unlocked" : "locked"}`}
                style={{ "--a-color": a.color }}
              >
                <div className="progress-page-achievement-icon">
                  <Ic />
                  {!a.unlocked && (
                    <span className="progress-page-achievement-lock">
                      <Icon.Lock />
                    </span>
                  )}
                </div>
                <p className="progress-page-achievement-title">{a.title}</p>
                <p className="progress-page-achievement-desc">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SESSION HISTORY ── */}
      <section className="progress-page-card progress-page-history-card">
        <div className="progress-page-card-head">
          <h3>Session History</h3>
          <span className="progress-page-card-sub">
            {filteredSessions.length} sessions total
          </span>
        </div>
        <div className="progress-page-history-controls">
          <div className="progress-page-search-wrap">
            <span className="progress-page-search-icon">
              <Icon.Search />
            </span>
            <input
              className="progress-page-search"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="progress-page-filter-row">
            <span className="progress-page-filter-icon">
              <Icon.Filter />
            </span>
            <select
              className="progress-page-select"
              value={filterModule}
              onChange={(e) => {
                setFilterModule(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Modules</option>
              {Object.entries(MODULE_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <select
              className="progress-page-select"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="latest">Latest First</option>
              <option value="highest">Highest Score</option>
              <option value="lowest">Lowest Score</option>
            </select>
          </div>
        </div>

        {pagedSessions.length === 0 ? (
          <div className="progress-page-empty">
            <Icon.Target />
            <p>No sessions match your filters.</p>
          </div>
        ) : (
          <div className="progress-page-history-table-wrap">
            <table className="progress-page-history-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Topic</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedSessions.map((s, i) => {
                  const cfg =
                    MODULE_CONFIG[s.module] || MODULE_CONFIG.technical;
                  const Ic = cfg.Icon;
                  return (
                    <tr
                      key={i}
                      className="progress-page-history-row"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <td>
                        <div className="progress-page-history-module">
                          <span
                            className="progress-page-history-module-icon"
                            style={{ color: cfg.color, background: cfg.bg }}
                          >
                            <Ic />
                          </span>
                          <span>{cfg.label}</span>
                        </div>
                      </td>
                      <td>
                        <span className="progress-page-history-topic">
                          {s.title || cfg.label}
                        </span>
                      </td>
                      <td>
                        <span className="progress-page-history-date">
                          {new Date(s.completedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td>
                        <ScoreBadge score={s.score} />
                      </td>
                      <td>
                        {s.questions?.length > 0 && (
                          <button
                            className="progress-page-view-btn"
                            onClick={() => setSelectedSession(s)}
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="progress-page-pagination">
            <button
              className="progress-page-pg-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <Icon.ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`progress-page-pg-num ${currentPage === p ? "active" : ""}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="progress-page-pg-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <Icon.ChevronRight />
            </button>
          </div>
        )}
      </section>

      {/* ── MODALS ── */}
      {showEditProfile && (
        <EditProfileModal
          user={user}
          updateUser={updateUser}
          onClose={() => setShowEditProfile(false)}
          onSave={() => {
            setShowEditProfile(false);
            fetchAll();
          }}
        />
      )}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};

export default ProgressPage;
