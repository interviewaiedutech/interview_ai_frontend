import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "../styles/Dashboard.css";
import { generateWeeklyGoals } from "../utils/generateWeeklyGoals";
import API_URL from "../config/api";

// ─── SVG Icon Components ──────────────────────────────────────────────────────
const Icon = {
  Lightning: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Calendar: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  CheckCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Trophy: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4" />
      <path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M6 3h12v8a6 6 0 0 1-12 0V3z" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Code: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Mic: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  Brain: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.84A2.5 2.5 0 0 1 9.5 2" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.84A2.5 2.5 0 0 0 14.5 2" />
    </svg>
  ),
  Mail: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
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
  Flame: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  ),
  BarChart2: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Target: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  BookOpen: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    startRef.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);
  return count;
}

// ─── Circular Progress ────────────────────────────────────────────────────────
const CircularProgress = ({
  value,
  size = 80,
  strokeWidth = 7,
  color = "#4f46e5",
}) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="circular-progress-svg">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e8eaf6"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 1s ease",
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={size * 0.2}
        fontWeight="700"
        fill="#1e293b"
      >
        {value}%
      </text>
    </svg>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const Skeleton = ({ width = "100%", height = 16, radius = 8 }) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius }} />
);

// ─── Module Config ────────────────────────────────────────────────────────────
const MODULE_CONFIG = [
  {
    key: "technical",
    label: "Technical Interview",
    Icon: Icon.Code,
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    key: "jdprep",
    label: "JD Preparation",
    Icon: Icon.Briefcase,
    color: "#7c3aed",
    bg: "#f3e8ff",
  },
  {
    key: "professional",
    label: "Professional Communication",
    Icon: Icon.Mic,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    key: "aptitude",
    label: "Aptitude Practice",
    Icon: Icon.Brain,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    key: "email",
    label: "Email Writing",
    Icon: Icon.Mail,
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    key: "hr",
    label: "HR Interview",
    Icon: Icon.Users,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    key: "star",
    label: "STAR Method",
    Icon: Icon.Star,
    color: "#e11d48",
    bg: "#fff1f2",
  },
  {
    key: "presentation",
    label: "Presentation Skills",
    Icon: Icon.Presentation,
    color: "#0284c7",
    bg: "#f0f9ff",
  },
];

const MODULE_ICONS = {
  technical: Icon.Code,
  communication: Icon.Mic,
  aptitude: Icon.Brain,
  email: Icon.Mail,
  hr: Icon.Users,
  star: Icon.Star,
  presentation: Icon.Presentation,
};

const SCORE_COLORS = { high: "#10b981", mid: "#f59e0b", low: "#ef4444" };
const getScoreColor = (s) =>
  s >= 70 ? SCORE_COLORS.high : s >= 40 ? SCORE_COLORS.mid : SCORE_COLORS.low;

const WEEKLY_PLACEHOLDER = [
  { day: "Mon", sessions: 0 },
  { day: "Tue", sessions: 0 },
  { day: "Wed", sessions: 0 },
  { day: "Thu", sessions: 0 },
  { day: "Fri", sessions: 0 },
  { day: "Sat", sessions: 0 },
  { day: "Sun", sessions: 0 },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();
  console.log("Dashboard User:", user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [streakData, setStreakData] = useState(null);
  const [moduleStats, setModuleStats] = useState({});
  const [weeklyActivity, setWeeklyActivity] = useState(WEEKLY_PLACEHOLDER);
  const [loading, setLoading] = useState(true);
  // const [weeklyGoals, setWeeklyGoals] = useState([
  //   { id: 1, label: "Complete 5 practice sessions", target: 5, current: 0 },
  //   { id: 2, label: "Finish 2 aptitude tests", target: 2, current: 0 },
  //   { id: 3, label: "Complete 1 communication mock", target: 1, current: 0 },
  //   { id: 4, label: "Maintain daily streak", target: 7, current: 0 },
  // ]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const token = localStorage.getItem("token");

  const totalSessions = useAnimatedCounter(progress?.totalSessions || 0);
  const avgScore = useAnimatedCounter(progress?.averageScore || 0);
  const totalQ = useAnimatedCounter(progress?.totalQuestionsAnswered || 0);
  const practiceHours = useAnimatedCounter(
    Math.round((progress?.totalSessions || 0) * 0.5),
  );

  useEffect(() => {
    const init = async () => {
      // await Promise.all([fetchProgress(), fetchSessions(), fetchStreak()]);/
      const streak = await fetchStreak();

      await Promise.all([fetchProgress(streak), fetchSessions()]);
      setLoading(false);
    };
    init();
  }, []);

  const fetchProgress = async (streakInfo) => {
    try {
      const res = await axios.get(`${API_URL}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const p = res.data.progress;
      console.log("progress data in dashboard", p);
      setProgress(p);
      setAllSessions(p.allSessions);

      // Build module stats from topicsCovered
      // Use backend moduleStats directly

      const backendStats = p.moduleStats || {};

      const formattedStats = {};

      Object.keys(backendStats).forEach((key) => {
        formattedStats[key] = {
          count: backendStats[key].sessions || 0,

          score: backendStats[key].score || 0,

          completion: Math.min(100, (backendStats[key].sessions || 0) * 10),
        };
      });

      setModuleStats(formattedStats);

      const dynamicGoals = generateWeeklyGoals(
        p.weeklyAnalytics,
        streakInfo,
        p.moduleStats,
      );

      setWeeklyGoals(dynamicGoals);
      // const map = {};
      // (p?.topicsCovered || []).forEach((t) => {
      //   const key = t.topic?.toLowerCase().replace(/\s+/g, "");
      //   const matched = MODULE_CONFIG.find(
      //     (m) => key?.includes(m.key) || m.key.includes(key),
      //   );
      //   // console.log("config ", matched);
      //   if (matched) {
      //     map[matched.key] = {
      //       count: t.count,
      //       score: t.averageScore || 0,
      //       completion: Math.min(100, t.count * 10),
      //     };
      //   }
      // });
      // setModuleStats(map);

      // ============================================
      // WEEKLY ACTIVITY - CURRENT WEEK ONLY
      // ============================================

      if (p?.allSessions?.length) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const actMap = {};
        days.forEach((d) => (actMap[d] = 0));

        // Current date
        const now = new Date();

        // Start of current week (Sunday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        // End of current week (Saturday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        // Filter only current week sessions
        const currentWeekSessions = p.allSessions.filter((s) => {
          const sessionDate = new Date(s.completedAt);

          return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
        });

        // Count sessions day-wise
        currentWeekSessions.forEach((s) => {
          const d = new Date(s.completedAt);

          const dayName = days[d.getDay()];

          actMap[dayName] = (actMap[dayName] || 0) + 1;
        });

        // Final chart data
        setWeeklyActivity(
          days.map((d) => ({
            day: d,
            sessions: actMap[d],
          })),
        );
      }

      // Update weekly goals current values
      // setWeeklyGoals((prev) =>
      //   prev.map((g, i) => ({
      //     ...g,
      //     current:
      //       i === 0
      //         ? Math.min(g.target, p?.totalSessions || 0)
      //         : i === 3
      //           ? Math.min(g.target, streakData?.currentStreak || 0)
      //           : g.current,
      //   })),
      // );
    } catch (e) {
      console.error("Error fetching progress:", e);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/interview/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecentSessions((res.data || []).slice(0, 5));
    } catch (e) {
      console.error("Error fetching sessions:", e);
    }
  };

  const fetchStreak = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress/streak`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStreakData(res.data);
      return res.data;
    } catch (e) {
      console.error("Error fetching streak:", e);
    }
  };

  const isActiveToday = () => {
    if (!streakData?.lastActiveDate) return false;
    return (
      new Date(streakData.lastActiveDate).toDateString() ===
      new Date().toDateString()
    );
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const radarData = [
    {
      subject: "Technical",
      score: progress?.moduleStats?.technical?.score || 0,
    },

    {
      subject: "HR",
      score: progress?.moduleStats?.hr?.score || 0,
    },

    {
      subject: "STAR",
      score: progress?.moduleStats?.star?.score || 0,
    },

    {
      subject: "Presentation",
      score: progress?.moduleStats?.presentation?.score || 0,
    },

    {
      subject: "Professional",
      score: progress?.moduleStats?.professional?.score || 0,
    },

    {
      subject: "Email",
      score: progress?.moduleStats?.email?.score || 0,
    },

    {
      subject: "Aptitude",
      score: progress?.moduleStats?.aptitude?.score || 0,
    },
  ]
    .filter((item) => item.score > 0)
    .map((item) => ({
      ...item,
      fullMark: 100,
    }));
  const performanceTrend = (allSessions || [])
    .slice(0, 5)
    .reverse()
    .map((s, i) => ({
      session: `S${i + 1}`,

      score: s.score || 0,

      module: s.module,
    }));

  if (loading) {
    return (
      <div className="db-loading">
        <div className="db-loading-inner">
          <div className="db-spinner" />
          <p className="db-loading-text">Loading your learning dashboard</p>
          <div className="db-loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="db">
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <header className="db-hero">
        <div className="db-hero-bg" />
        <div className="db-hero-content">
          <div className="db-hero-left">
            <p className="db-hero-greeting">{getGreeting()},</p>
            <h1 className="db-hero-name">
              {user?.name?.split(" ")[0] || "Learner"}
            </h1>
            <p className="db-hero-sub">
              Preparing for{" "}
              <span className="db-hero-role">
                {user?.role || "your dream role"}
              </span>{" "}
              — keep going!
            </p>
            <button
              className="db-cta"
              onClick={() => navigate("/practice-hub")}
            >
              <span className="db-cta-icon">
                <Icon.Play />
              </span>
              Start Practice Session
              <span className="db-cta-arrow">
                <Icon.ArrowRight />
              </span>
            </button>
          </div>
          <div className="db-hero-right">
            <div className="db-streak-card">
              <div className="db-streak-icon">
                <Icon.Flame />
              </div>
              <div className="db-streak-info">
                <span className="db-streak-num">
                  {streakData?.currentStreak || 0}
                </span>
                <span className="db-streak-label">Day Streak</span>
                {isActiveToday() && (
                  <span className="db-streak-badge">Active today</span>
                )}
              </div>
            </div>
            <div className="db-hero-stats">
              <div className="db-mini-stat">
                <span className="db-mini-val">
                  {streakData?.longestStreak || 0}
                </span>
                <span className="db-mini-key">Best Streak</span>
              </div>
              <div className="db-mini-divider" />
              <div className="db-mini-stat">
                <span className="db-mini-val">{practiceHours}h</span>
                <span className="db-mini-key">Practice Time</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── KPI Row ──────────────────────────────────────────── */}
      <section className="db-kpi-row">
        {[
          {
            label: "Total Sessions",
            value: totalSessions,
            suffix: "",
            Icon: Icon.Calendar,
            color: "#4f46e5",
            bg: "#eef2ff",
          },
          {
            label: "Questions Answered",
            value: totalQ,
            suffix: "",
            Icon: Icon.CheckCircle,
            color: "#059669",
            bg: "#ecfdf5",
          },
          {
            label: "Average Score",
            value: avgScore,
            suffix: "%",
            Icon: Icon.Trophy,
            color: "#d97706",
            bg: "#fffbeb",
          },
          {
            label: "Practice Hours",
            value: practiceHours,
            suffix: "h",
            Icon: Icon.Clock,
            color: "#0891b2",
            bg: "#ecfeff",
          },
        ].map(({ label, value, suffix, Icon: Ic, color, bg }) => (
          <div className="db-kpi" key={label}>
            <div className="db-kpi-icon" style={{ background: bg, color }}>
              <Ic />
            </div>
            <div className="db-kpi-body">
              <p className="db-kpi-label">{label}</p>
              <p className="db-kpi-value" style={{ color }}>
                {value}
                {suffix}
              </p>
            </div>
            <div className="db-kpi-trend" style={{ color }}>
              <Icon.TrendUp />
            </div>
          </div>
        ))}
      </section>

      {/* ── Main Grid ────────────────────────────────────────── */}
      <div className="db-grid">
        {/* ── Learning Modules ─────────────────────────────── */}
        <section className="db-card db-modules db-span2">
          <div className="db-card-header">
            <h2 className="db-card-title">Learning Modules</h2>
            <span className="db-card-sub">
              {MODULE_CONFIG.length} modules available
            </span>
          </div>
          <div className="db-modules-grid">
            {MODULE_CONFIG.map(({ key, label, Icon: Ic, color, bg }) => {
              const stats = moduleStats[key] || {
                count: 0,
                score: 0,
                completion: 0,
              };
              return (
                <div className="db-module" key={key}>
                  <div className="db-module-header">
                    <div
                      className="db-module-icon"
                      style={{ background: bg, color }}
                    >
                      <Ic />
                    </div>
                    <div className="db-module-meta">
                      <p className="db-module-name">{label}</p>
                      <p className="db-module-count">{stats.count} sessions</p>
                    </div>
                    <CircularProgress
                      value={stats.completion}
                      size={52}
                      strokeWidth={5}
                      color={color}
                    />
                  </div>
                  <div className="db-module-bar-wrap">
                    <div className="db-module-bar">
                      <div
                        className="db-module-bar-fill"
                        style={{
                          width: `${stats.completion}%`,
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                  <div className="db-module-footer">
                    <span
                      className="db-module-score"
                      style={{ color: getScoreColor(stats.score) }}
                    >
                      Score: {stats.score || "—"}
                    </span>
                    <span className="db-module-complete">
                      {stats.completion}% complete
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Weekly Activity ──────────────────────────────── */}
        <section className="db-card db-activity">
          <div className="db-card-header">
            <h2 className="db-card-title">Weekly Activity</h2>
            <span className="db-card-sub">Sessions per day</span>
          </div>
          <div className="db-chart-wrap">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyActivity} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "none",
                    borderRadius: 10,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
                  {weeklyActivity.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.sessions > 0 ? "#4f46e5" : "#e2e8f0"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── Performance Trend ────────────────────────────── */}
        <section className="db-card db-trend">
          <div className="db-card-header">
            <h2 className="db-card-title">Performance Trend</h2>
            <span className="db-card-sub">Score across sessions</span>
          </div>
          <div className="db-chart-wrap">
            {performanceTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={performanceTrend}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="session"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}%`,
                      props.payload.module,
                    ]}
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      borderRadius: 10,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fill="url(#scoreGrad)"
                    dot={{ r: 4, fill: "#4f46e5" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="db-empty-chart">
                <Icon.BarChart2 />
                <p>Complete sessions to see your trend</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Module Radar ─────────────────────────────────── */}
        <section className="db-card db-radar">
          <div className="db-card-header">
            <h2 className="db-card-title">Skills Radar</h2>
            <span className="db-card-sub">Module-wise performance</span>
          </div>
          <div className="db-chart-wrap db-chart-center">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.18}
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "#4f46e5",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── Weekly Goals ─────────────────────────────────── */}
        <section className="db-card db-goals">
          <div className="db-card-header">
            <h2 className="db-card-title">Weekly Goals</h2>
            <span className="db-card-sub">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              — this week
            </span>
          </div>
          <div className="db-goals-list">
            {weeklyGoals.map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              const done = g.current >= g.target;
              return (
                <div
                  className={`db-goal${done ? " db-goal--done" : ""}`}
                  key={g.id}
                >
                  <div
                    className={`db-goal-check${done ? " db-goal-check--done" : ""}`}
                  >
                    {done && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="db-goal-body">
                    <div className="db-goal-top">
                      <span className="db-goal-text">{g.label}</span>
                      <span className="db-goal-count">
                        {g.current}/{g.target}
                      </span>
                    </div>
                    <div className="db-goal-bar">
                      <div
                        className="db-goal-fill"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                  <CircularProgress
                    value={Math.min(100, pct)}
                    size={44}
                    strokeWidth={4}
                    color={done ? "#10b981" : "#4f46e5"}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Recent Sessions ──────────────────────────────── */}
        <section className="db-card db-sessions db-span2">
          <div className="db-card-header">
            <h2 className="db-card-title">Recent Practice Sessions</h2>
            <button
              className="db-view-more"
              onClick={() => navigate("/progress")}
            >
              View all <Icon.ChevronRight />
            </button>
          </div>
          {recentSessions.length > 0 ? (
            <div className="db-sessions-list">
              {recentSessions.map((s, i) => {
                const ModIcon =
                  MODULE_ICONS[s.module?.toLowerCase()] || Icon.BookOpen;
                const answered =
                  s.questions?.filter((q) => q.answer).length || 0;
                const total = s.questions?.length || 0;
                const scoreColor = getScoreColor(s.totalScore);
                return (
                  <div className="db-session" key={i}>
                    <div className="db-session-icon">
                      <ModIcon />
                    </div>
                    <div className="db-session-info">
                      <p className="db-session-role">{s.role}</p>
                      <p className="db-session-date">
                        {new Date(s.completedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {" · "}
                        {new Date(s.completedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="db-session-answered">
                      <span className="db-session-qa">
                        {answered}/{total}
                      </span>
                      <span className="db-session-qa-label">Answered</span>
                    </div>
                    <div
                      className="db-session-score-badge"
                      style={{
                        background: `${scoreColor}18`,
                        color: scoreColor,
                      }}
                    >
                      {s.totalScore}%
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="db-empty">
              <div className="db-empty-icon">
                <Icon.Target />
              </div>
              <p className="db-empty-text">No practice sessions yet</p>
              <button
                className="db-empty-cta"
                onClick={() => navigate("/technical/mock-interview")}
              >
                Start your first session <Icon.ArrowRight />
              </button>
            </div>
          )}
        </section>

        {/* ── Topics Practiced ─────────────────────────────── */}
        {/* <section className="db-card db-topics">
          <div className="db-card-header">
            <h2 className="db-card-title">Topics Practiced</h2>
          </div>
          {progress?.topicsCovered?.length > 0 ? (
            <div className="db-topics-list">
              {progress.topicsCovered.map((t, i) => {
                const pct = Math.min(100, t.count * 10);
                const cfg = MODULE_CONFIG.find((m) =>
                  t.topic?.toLowerCase().includes(m.key),
                );
                const color = cfg?.color || "#4f46e5";
                return (
                  <div className="db-topic" key={i}>
                    <div className="db-topic-header">
                      <span className="db-topic-name">{t.topic}</span>
                      <span
                        className="db-topic-chip"
                        style={{ background: `${color}18`, color }}
                      >
                        {t.count} sessions
                      </span>
                    </div>
                    <div className="db-topic-bar">
                      <div
                        className="db-topic-fill"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="db-empty">
              <div className="db-empty-icon">
                <Icon.BookOpen />
              </div>
              <p className="db-empty-text">No topics practiced yet</p>
              <button
                className="db-empty-cta"
                onClick={() => navigate("/technical/mock-interview")}
              >
                Start learning <Icon.ArrowRight />
              </button>
            </div>
          )}
        </section> */}

        {/* ── Insight Card ──────────────────────────────────── */}
        {/* <section className="db-card db-insight">
          <div className="db-insight-bg" />
          <div className="db-card-header">
            <h2 className="db-card-title db-card-title--light">
              Productivity Insight
            </h2>
          </div>
          <p className="db-insight-body">
            Learners who practice <strong>15 minutes daily</strong> improve
            interview scores by up to <strong>40%</strong> within 3 weeks.
          </p>
          <div className="db-insight-stat">
            <span className="db-insight-big">3×</span>
            <span className="db-insight-desc">
              more likely to pass interviews with consistent practice
            </span>
          </div>
          <button
            className="db-insight-btn"
            onClick={() => navigate("/technical/mock-interview")}
          >
            Practice now <Icon.ArrowRight />
          </button>
        </section> */}
      </div>
    </div>
  );
};

export default Dashboard;
