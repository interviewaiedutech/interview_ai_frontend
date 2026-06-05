import { useState, useEffect, useRef } from "react";
import "../styles/AdminLanding.css";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Overview", "Features", "Analytics", "Reports"];

const METRICS = [
  { label: "Total Users", value: "24,891", delta: "+12.4%", icon: "users" },
  {
    label: "Interview Sessions",
    value: "138,204",
    delta: "+8.7%",
    icon: "sessions",
  },
  { label: "AI Evaluations", value: "97,560", delta: "+21.3%", icon: "ai" },
  { label: "Avg. Performance", value: "84.2%", delta: "+3.1%", icon: "score" },
];

const FEATURES = [
  {
    icon: "user-mgmt",
    title: "User Management",
    desc: "Onboard, segment, and manage thousands of candidates with granular role-based access and bulk actions.",
  },
  {
    icon: "monitor",
    title: "Interview Monitoring",
    desc: "Observe live and recorded interview sessions with real-time status tracking across all active users.",
  },
  {
    icon: "ai-analytics",
    title: "AI Analytics",
    desc: "Harness model-powered insights on candidate performance, behavioral trends, and evaluation quality.",
  },
  {
    icon: "reports",
    title: "Reports & Insights",
    desc: "Generate exportable reports on cohort performance, session completion, and communication scores.",
  },
];

const ACTIVITY = [
  {
    type: "register",
    user: "Priya Sharma",
    action: "Registered",
    time: "2 min ago",
    avatar: "PS",
  },
  {
    type: "session",
    user: "Aditya Menon",
    action: "Completed Interview — SDE Round 2",
    time: "11 min ago",
    avatar: "AM",
  },
  {
    type: "eval",
    user: "Rhea D'Souza",
    action: "AI Evaluation Generated",
    time: "18 min ago",
    avatar: "RD",
  },
  {
    type: "register",
    user: "Karan Joshi",
    action: "Registered",
    time: "34 min ago",
    avatar: "KJ",
  },
  {
    type: "session",
    user: "Neha Iyer",
    action: "Completed Interview — PM Round 1",
    time: "52 min ago",
    avatar: "NI",
  },
  {
    type: "eval",
    user: "Siddharth Rao",
    action: "AI Evaluation Generated",
    time: "1 hr ago",
    avatar: "SR",
  },
];

const SPARKLINE_DATA = [40, 55, 42, 70, 65, 80, 74, 90, 88, 95, 100, 96];

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120,
    h = 36;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline
        points={pts.join(" ")}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient
          id={`sg-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${pts.join(" ")} ${w},${h}`}
        fill={`url(#sg-${color.replace("#", "")})`}
      />
    </svg>
  );
}

function MetricIcon({ type }) {
  const icons = {
    users: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 9a2.5 2.5 0 100-5M18 17c0-2.761-1.79-5-4-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    sessions: (
      <svg viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="4"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 17h6M10 14v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 9l2.5 1.5L13 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v4l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    score: (
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M10 3l1.8 3.6 4 .6-2.9 2.8.7 4L10 12l-3.6 2 .7-4L4.2 7.2l4-.6L10 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  return icons[type] || null;
}

function FeatureIcon({ type }) {
  const icons = {
    "user-mgmt": (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M2.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M17 10l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    monitor: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="4"
          width="20"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 21h8M12 18v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="11"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7.5 11a4.5 4.5 0 019 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    "ai-analytics": (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17l4-5 4 3 4-6 4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M19 7v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    reports: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="2"
          width="16"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 7h8M8 11h8M8 15h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  return icons[type] || null;
}

function ActivityDot({ type }) {
  const colors = { register: "#3b82f6", session: "#10b981", eval: "#8b5cf6" };
  return <span className="activity-dot" style={{ background: colors[type] }} />;
}

export default function AdminLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.dataset.anim]: true }));
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-anim]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="al-root">
      {/* ── NAV ── */}
      <nav className={`al-nav${scrolled ? " al-nav--scrolled" : ""}`}>
        <div className="al-nav__inner">
          <a href="#" className="al-nav__brand">
            <span className="al-logo">
              {/* <svg viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="url(#logo-g)" />
                <path
                  d="M8 20l4-8 4 6 2-4 2 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="10" r="2" fill="#fff" opacity=".8" />
                <defs>
                  <linearGradient id="logo-g" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#3b6df5" />
                    <stop offset="1" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg> */}
            </span>
            <span className="al-brand-name">InterviewAI</span>
          </a>

          <ul
            className={`al-nav__links${menuOpen ? " al-nav__links--open" : ""}`}
          >
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div className="al-nav__ctas">
            <Link to="/admin-control/login" className="al-btn al-btn--ghost">
              Admin Login
            </Link>
            {/* <a href="#" className="al-btn al-btn--primary">
              Open Dashboard
            </a> */}
          </div>

          <button
            className="al-nav__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="al-hero" ref={heroRef} id="overview">
        <div className="al-hero__bg">
          <div className="al-hero__glow al-hero__glow--1" />
          <div className="al-hero__glow al-hero__glow--2" />
          <div className="al-hero__grid" />
        </div>

        <div className="al-container al-hero__inner">
          {/* Left */}
          <div
            className="al-hero__copy"
            data-anim="hero-copy"
            style={{
              opacity: visible["hero-copy"] ? 1 : 0,
              transform: visible["hero-copy"] ? "none" : "translateY(28px)",
            }}
          >
            <span className="al-badge">Admin Command Center</span>
            <h1 className="al-hero__h1">
              The Intelligence Layer
              <br />
              <span className="al-hero__gradient-text">
                Behind Every Interview
              </span>
            </h1>
            <p className="al-hero__desc">
              Monitor candidates, evaluate AI sessions, and drive platform
              performance — all from a single unified admin workspace built for
              scale.
            </p>
            <div className="al-hero__actions">
              {/* <a href="#" className="al-btn al-btn--primary al-btn--lg">
                Open Dashboard
              </a> */}
              <a href="#features" className="al-btn al-btn--outline al-btn--lg">
                Explore Features
              </a>
            </div>
            <div className="al-hero__trust">
              <span className="al-trust-dot" />
              <p>Trusted by 200+ enterprise teams</p>
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div
            className="al-hero__mockup"
            data-anim="hero-mock"
            style={{
              opacity: visible["hero-mock"] ? 1 : 0,
              transform: visible["hero-mock"]
                ? "none"
                : "translateY(36px) scale(0.97)",
            }}
          >
            <div className="al-mock">
              <div className="al-mock__bar">
                <span />
                <span />
                <span />
                <p className="al-mock__title">Admin Dashboard · InterviewOS</p>
              </div>
              <div className="al-mock__body">
                {/* Sidebar */}
                <div className="al-mock__sidebar">
                  {[
                    "Overview",
                    "Users",
                    "Sessions",
                    "Evaluations",
                    "Reports",
                    "Settings",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className={`al-mock__sitem${i === 0 ? " active" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                {/* Content */}
                <div className="al-mock__content">
                  <div className="al-mock__topbar">
                    <span className="al-mock__page-title">Overview</span>
                    <span className="al-mock__date">Jun 03, 2026</span>
                  </div>
                  <div className="al-mock__kpis">
                    {[
                      { label: "Users", val: "24.8K", up: true },
                      { label: "Sessions", val: "138K", up: true },
                      { label: "Evaluations", val: "97.5K", up: true },
                      { label: "Avg Score", val: "84.2%", up: true },
                    ].map((k) => (
                      <div key={k.label} className="al-mock__kpi">
                        <span className="al-mock__kpi-label">{k.label}</span>
                        <span className="al-mock__kpi-val">{k.val}</span>
                        <span className="al-mock__kpi-delta up">↑</span>
                      </div>
                    ))}
                  </div>
                  <div className="al-mock__charts">
                    <div className="al-mock__chart-card">
                      <p className="al-mock__chart-label">User Growth</p>
                      <Sparkline data={SPARKLINE_DATA} color="#3b6df5" />
                    </div>
                    <div className="al-mock__chart-card">
                      <p className="al-mock__chart-label">Sessions</p>
                      <Sparkline
                        data={[
                          30, 50, 45, 80, 60, 95, 85, 100, 90, 110, 105, 120,
                        ]}
                        color="#10b981"
                      />
                    </div>
                  </div>
                  <div className="al-mock__activity">
                    {[
                      "Priya S. — SDE Interview completed",
                      "Aditya M. — AI Eval generated",
                      "Rhea D. — Registered",
                    ].map((a) => (
                      <div key={a} className="al-mock__arow">
                        <span className="al-mock__adot" />
                        <span className="al-mock__atext">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Widgets */}
            <div className="al-widget al-widget--tl">
              <p className="al-widget__label">Active Sessions</p>
              <p className="al-widget__value">
                342 <span className="al-widget__live">● LIVE</span>
              </p>
            </div>
            <div className="al-widget al-widget--br">
              <p className="al-widget__label">Evaluations Today</p>
              <p className="al-widget__value">1,204</p>
              <div className="al-widget__bar">
                <div className="al-widget__bar-fill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="al-metrics" id="analytics">
        <div className="al-container">
          <div className="al-metrics__grid">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className="al-metric-card"
                data-anim={`metric-${i}`}
                style={{
                  opacity: visible[`metric-${i}`] ? 1 : 0,
                  transform: visible[`metric-${i}`]
                    ? "none"
                    : "translateY(20px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="al-metric-card__icon">
                  <MetricIcon type={m.icon} />
                </div>
                <p className="al-metric-card__label">{m.label}</p>
                <p className="al-metric-card__value">{m.value}</p>
                <span className="al-metric-card__delta">
                  {m.delta} this month
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="al-features" id="features">
        <div className="al-container">
          <div
            className="al-section-header"
            data-anim="feat-hdr"
            style={{
              opacity: visible["feat-hdr"] ? 1 : 0,
              transform: visible["feat-hdr"] ? "none" : "translateY(20px)",
            }}
          >
            <span className="al-badge">Platform Features</span>
            <h2 className="al-section-h2">
              Everything You Need to
              <br />
              Run the Platform
            </h2>
            <p className="al-section-sub">
              Designed for admins who need full visibility and control without
              the noise.
            </p>
          </div>
          <div className="al-features__grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="al-feature-card"
                data-anim={`feat-${i}`}
                style={{
                  opacity: visible[`feat-${i}`] ? 1 : 0,
                  transform: visible[`feat-${i}`] ? "none" : "translateY(24px)",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div className="al-feature-card__icon">
                  <FeatureIcon type={f.icon} />
                </div>
                <h3 className="al-feature-card__title">{f.title}</h3>
                <p className="al-feature-card__desc">{f.desc}</p>
                <span className="al-feature-card__arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITY FEED ── */}
      <section className="al-activity">
        <div className="al-container">
          <div className="al-activity__inner">
            <div
              className="al-activity__header"
              data-anim="act-hdr"
              style={{
                opacity: visible["act-hdr"] ? 1 : 0,
                transform: visible["act-hdr"] ? "none" : "translateY(20px)",
              }}
            >
              <span className="al-badge">Live Activity</span>
              <h2 className="al-section-h2">Real-Time Platform Pulse</h2>
              <p className="al-section-sub">
                Stay informed on everything happening across the platform as it
                unfolds.
              </p>
              <div className="al-activity__legend">
                <span>
                  <span
                    className="al-legend-dot"
                    style={{ background: "#3b82f6" }}
                  />
                  Registrations
                </span>
                <span>
                  <span
                    className="al-legend-dot"
                    style={{ background: "#10b981" }}
                  />
                  Sessions
                </span>
                <span>
                  <span
                    className="al-legend-dot"
                    style={{ background: "#8b5cf6" }}
                  />
                  Evaluations
                </span>
              </div>
            </div>
            <div
              className="al-activity__feed"
              data-anim="act-feed"
              style={{
                opacity: visible["act-feed"] ? 1 : 0,
                transform: visible["act-feed"] ? "none" : "translateX(24px)",
              }}
            >
              {ACTIVITY.map((a, i) => (
                <div key={i} className="al-activity__item">
                  <div className="al-activity__avatar">{a.avatar}</div>
                  <div className="al-activity__info">
                    <p className="al-activity__user">{a.user}</p>
                    <p className="al-activity__action">{a.action}</p>
                  </div>
                  <div className="al-activity__meta">
                    <ActivityDot type={a.type} />
                    <span className="al-activity__time">{a.time}</span>
                  </div>
                </div>
              ))}
              <div className="al-activity__footer">
                <a href="#" className="al-btn al-btn--ghost al-btn--sm">
                  View All Activity →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD SHOWCASE ── */}
      <section className="al-showcase" id="reports">
        <div className="al-container">
          <div
            className="al-section-header"
            data-anim="show-hdr"
            style={{
              opacity: visible["show-hdr"] ? 1 : 0,
              transform: visible["show-hdr"] ? "none" : "translateY(20px)",
            }}
          >
            <span className="al-badge">Dashboard Preview</span>
            <h2 className="al-section-h2">
              Your Entire Platform,
              <br />
              At a Glance
            </h2>
          </div>
          <div
            className="al-showcase__grid"
            data-anim="show-grid"
            style={{
              opacity: visible["show-grid"] ? 1 : 0,
              transform: visible["show-grid"] ? "none" : "translateY(28px)",
            }}
          >
            {/* User Growth */}
            <div className="al-showcase-card al-showcase-card--wide">
              <div className="al-showcase-card__head">
                <p className="al-showcase-card__label">User Growth</p>
                <span className="al-showcase-card__tag positive">+12.4%</span>
              </div>
              <p className="al-showcase-card__value">24,891</p>
              <Sparkline data={SPARKLINE_DATA} color="#3b6df5" />
              <div className="al-showcase-card__bar-row">
                {[65, 80, 72, 90, 85, 100].map((v, i) => (
                  <div key={i} className="al-bar-wrap">
                    <div
                      className="al-bar"
                      style={{ height: `${v * 0.52}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Session Activity */}
            <div className="al-showcase-card">
              <div className="al-showcase-card__head">
                <p className="al-showcase-card__label">Session Activity</p>
                <span className="al-showcase-card__tag positive">+8.7%</span>
              </div>
              <p className="al-showcase-card__value">138,204</p>
              <div className="al-session-bars">
                {[40, 70, 55, 85, 60, 95, 80].map((v, i) => (
                  <div key={i} className="al-session-bar-wrap">
                    <div
                      className="al-session-bar"
                      style={{ height: `${v}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="al-showcase-card__sub">Last 7 days</p>
            </div>

            {/* Evaluation Summary */}
            <div className="al-showcase-card">
              <div className="al-showcase-card__head">
                <p className="al-showcase-card__label">Evaluation Summary</p>
              </div>
              <div className="al-eval-rows">
                {[
                  { label: "JD Preparation", pct: 91, color: "#3b6df5" },
                  { label: "Communication", pct: 78, color: "#10b981" },
                  { label: "Email Writing", pct: 84, color: "#8b5cf6" },
                ].map((r) => (
                  <div key={r.label} className="al-eval-row">
                    <div className="al-eval-row__top">
                      <span>{r.label}</span>
                      <span>{r.pct}%</span>
                    </div>
                    <div className="al-eval-track">
                      <div
                        className="al-eval-fill"
                        style={{ width: `${r.pct}%`, background: r.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="al-showcase-card">
              <div className="al-showcase-card__head">
                <p className="al-showcase-card__label">Performance Score</p>
                <span className="al-showcase-card__tag positive">+3.1%</span>
              </div>
              <p className="al-showcase-card__value">84.2%</p>
              <div className="al-perf-ring">
                <svg viewBox="0 0 80 80" fill="none">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#f1f5f9"
                    strokeWidth="7"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="url(#ring-g)"
                    strokeWidth="7"
                    strokeDasharray={`${2 * Math.PI * 32 * 0.842} ${2 * Math.PI * 32}`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                  <defs>
                    <linearGradient
                      id="ring-g"
                      x1="0"
                      y1="0"
                      x2="80"
                      y2="80"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3b6df5" />
                      <stop offset="1" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="al-perf-ring__label">84.2%</span>
              </div>
              <p className="al-showcase-card__sub">Platform-wide average</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="al-cta">
        <div className="al-cta__bg">
          <div className="al-cta__glow" />
        </div>
        <div
          className="al-container al-cta__inner"
          data-anim="cta"
          style={{
            opacity: visible["cta"] ? 1 : 0,
            transform: visible["cta"] ? "none" : "translateY(24px)",
          }}
        >
          <h2 className="al-cta__h2">
            Manage Your Entire AI Interview
            <br />
            Ecosystem From One Place
          </h2>
          <p className="al-cta__sub">
            Monitor users, sessions, evaluations, and platform performance
            through a centralized admin experience.
          </p>
          <div className="al-cta__actions">
            {/* <a
              href="#"
              className="al-btn al-btn--primary al-btn--lg al-btn--glow"
            >
              Open Dashboard
            </a>
            <a href="#" className="al-btn al-btn--ghost-light al-btn--lg">
              Schedule a Demo
            </a> */}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="al-footer">
        <div className="al-container al-footer__inner">
          <div className="al-footer__brand">
            <span className="al-logo al-logo--sm">
              {/* <svg viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="url(#logo-g2)" />
                <path
                  d="M8 20l4-8 4 6 2-4 2 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="10" r="2" fill="#fff" opacity=".8" />
                <defs>
                  <linearGradient id="logo-g2" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#3b6df5" />
                    <stop offset="1" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg> */}
            </span>
            <span className="al-brand-name">InterviewAI</span>
          </div>
          <div className="al-footer__links">
            {["Privacy", "Terms", "Security", "Documentation", "Support"].map(
              (l) => (
                <a key={l} href="#">
                  {l}
                </a>
              ),
            )}
          </div>
          <p className="al-footer__copy">
            © 2026 InterviewAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
