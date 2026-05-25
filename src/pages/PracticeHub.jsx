import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PracticeHub.css";

// SVG Icons
const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BrainIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.16Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.16Z" />
  </svg>
);
const FileSearch = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <circle cx="11.5" cy="14.5" r="2.5" />
    <path d="M13.3 16.3 15 18" />
  </svg>
);
const MessageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const PassportIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
    <path d="M12 3v6" />
  </svg>
);

const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
  </svg>
);

const ICON_MAP = {
  "technical-interview": CodeIcon,
  aptitude: BrainIcon,
  communication: MessageIcon,
  "email-writing": MailIcon,
  JDPrep: FileSearch,
  "group-discussion": UsersIcon,
  ielts: GlobeIcon,
  toefl: GlobeIcon,
  pte: BookIcon,
  visa: PassportIcon,
  sop: EditIcon,
};

const CARD_THEMES = {
  purple: {
    bg: "var(--card-purple-bg)",
    iconBg: "var(--card-purple-icon-bg)",
    iconColor: "var(--card-purple-icon)",
    accent: "var(--card-purple-accent)",
    badge: "var(--card-purple-accent)",
    glow: "var(--card-purple-glow)",
  },
  blue: {
    bg: "var(--card-blue-bg)",
    iconBg: "var(--card-blue-icon-bg)",
    iconColor: "var(--card-blue-icon)",
    accent: "var(--card-blue-accent)",
    badge: "var(--card-blue-accent)",
    glow: "var(--card-blue-glow)",
  },
  green: {
    bg: "var(--card-green-bg)",
    iconBg: "var(--card-green-icon-bg)",
    iconColor: "var(--card-green-icon)",
    accent: "var(--card-green-accent)",
    badge: "var(--card-green-accent)",
    glow: "var(--card-green-glow)",
  },
  pink: {
    bg: "var(--card-pink-bg)",
    iconBg: "var(--card-pink-icon-bg)",
    iconColor: "var(--card-pink-icon)",
    accent: "var(--card-pink-accent)",
    badge: "var(--card-pink-accent)",
    glow: "var(--card-pink-glow)",
  },
  orange: {
    bg: "var(--card-orange-bg)",
    iconBg: "var(--card-orange-icon-bg)",
    iconColor: "var(--card-orange-icon)",
    accent: "var(--card-orange-accent)",
    badge: "var(--card-orange-accent)",
    glow: "var(--card-orange-glow)",
  },
  indigo: {
    bg: "var(--card-indigo-bg)",
    iconBg: "var(--card-indigo-icon-bg)",
    iconColor: "var(--card-indigo-icon)",
    accent: "var(--card-indigo-accent)",
    badge: "var(--card-indigo-accent)",
    glow: "var(--card-indigo-glow)",
  },
  teal: {
    bg: "var(--card-teal-bg)",
    iconBg: "var(--card-teal-icon-bg)",
    iconColor: "var(--card-teal-icon)",
    accent: "var(--card-teal-accent)",
    badge: "var(--card-teal-accent)",
    glow: "var(--card-teal-glow)",
  },
  cyan: {
    bg: "var(--card-cyan-bg)",
    iconBg: "var(--card-cyan-icon-bg)",
    iconColor: "var(--card-cyan-icon)",
    accent: "var(--card-cyan-accent)",
    badge: "var(--card-cyan-accent)",
    glow: "var(--card-cyan-glow)",
  },
  red: {
    bg: "var(--card-red-bg)",
    iconBg: "var(--card-red-icon-bg)",
    iconColor: "var(--card-red-icon)",
    accent: "var(--card-red-accent)",
    badge: "var(--card-red-accent)",
    glow: "var(--card-red-glow)",
  },
  amber: {
    bg: "var(--card-amber-bg)",
    iconBg: "var(--card-amber-icon-bg)",
    iconColor: "var(--card-amber-icon)",
    accent: "var(--card-amber-accent)",
    badge: "var(--card-amber-accent)",
    glow: "var(--card-amber-glow)",
  },
};

const PracticeHub = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const practiceCategories = [
    {
      id: "technical",
      title: "Technical & Aptitude",
      emoji: "💻",
      color: "#8b5cf6",
      description: "Sharpen your problem-solving and technical acumen",
      practices: [
        {
          id: "technical-interview",
          title: "Technical Mock Interview",
          description: "Role-specific coding & architecture questions",
          icon: "💻",
          path: "/technical/mock-interview",
          badge: null,
          color: "purple",
        },
        {
          id: "aptitude",
          title: "Aptitude",
          description: "Quantitative",
          icon: "🧠",
          path: "/aptitude-practice",
          badge: null,
          color: "blue",
        },
        {
          id: "JDPrep",
          title: "JD Specific Interview",
          description: "Role-Specific discussions with AI evaluation",
          icon: "👥",
          path: "/jd-specific-preparation",
          badge: null,
          color: "green",
        },
        // {
        //   id: "group-discussion",
        //   title: "Group Discussion",
        //   description: "Topic-based discussions with AI evaluation",
        //   icon: "👥",
        //   path: "/group-discussion",
        //   badge: "Coming Soon",
        //   color: "green",
        // },
      ],
    },
    {
      id: "communication",
      title: "Communication Skills",
      emoji: "🗣️",
      color: "#ec4899",
      description: "Build confidence in every professional interaction",
      practices: [
        {
          id: "communication",
          title: "Communication Practice",
          description: "HR interviews, presentations & soft skills",
          icon: "💬",
          path: "/communication-practice",
          badge: null,
          color: "pink",
        },
        {
          id: "email-writing",
          title: "Email Writing",
          description: "Professional email & business correspondence",
          icon: "📧",
          path: "/email-writing",
          badge: null,
          color: "orange",
        },
      ],
    },
    // {
    //   id: "study-abroad",
    //   title: "🌍 Study Abroad Exams",
    //   color: "#10b981",
    //   practices: [
    //     {
    //       id: "ielts",
    //       title: "IELTS Practice",
    //       description: "Speaking, Writing, Listening, Reading",
    //       icon: "🎓",
    //       path: "/ielts",
    //       badge: "Popular",
    //       color: "indigo",
    //     },
    //     {
    //       id: "toefl",
    //       title: "TOEFL Practice",
    //       description: "iBT format with integrated tasks",
    //       icon: "🌎",
    //       path: "/toefl",
    //       badge: null,
    //       color: "teal",
    //     },
    //     {
    //       id: "pte",
    //       title: "PTE / Duolingo",
    //       description: "PTE Academic & Duolingo English Test",
    //       icon: "📝",
    //       path: "/pte-duolingo",
    //       badge: null,
    //       color: "cyan",
    //     },
    //     {
    //       id: "visa",
    //       title: "Visa Interview",
    //       description: "US, UK, Canada, Australia visa prep",
    //       icon: "🛂",
    //       path: "/visa-interview",
    //       badge: null,
    //       color: "red",
    //     },
    //     {
    //       id: "sop",
    //       title: "SOP/LOR Writing",
    //       description: "Statement of Purpose & Recommendations",
    //       icon: "✍️",
    //       path: "/sop-lor",
    //       badge: null,
    //       color: "amber",
    //     },
    //   ],
    // },
  ];

  const PracticeCard = ({ practice, index, categoryIndex }) => {
    const cardKey = `${practice.id}-${index}-${categoryIndex}`;
    const isHovered = hoveredCard === cardKey;
    const theme = CARD_THEMES[practice.color] || CARD_THEMES.purple;
    const IconComponent = ICON_MAP[practice.id];

    return (
      <div
        className={`ph-card ${isHovered ? "ph-card--hovered" : ""}`}
        style={{ "--card-accent": theme.accent, "--card-glow": theme.glow }}
        onMouseEnter={() => setHoveredCard(cardKey)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => practice.path && navigate(practice.path)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && practice.path && navigate(practice.path)
        }
        aria-label={`Start ${practice.title}`}
      >
        {/* Animated background shimmer */}
        <div className="ph-card__shimmer" />

        {practice.badge && (
          <span className="ph-card__badge" style={{ background: theme.badge }}>
            {practice.badge}
          </span>
        )}

        <div className="ph-card__top">
          <div
            className="ph-card__icon-wrap"
            style={{ background: theme.iconBg, color: theme.iconColor }}
          >
            {IconComponent ? (
              <IconComponent />
            ) : (
              <span className="ph-card__icon-emoji">{practice.icon}</span>
            )}
          </div>

          <div className="ph-card__arrow">
            <ArrowRightIcon />
          </div>
        </div>

        <div className="ph-card__body">
          <h3 className="ph-card__title">{practice.title}</h3>
          <p className="ph-card__desc">{practice.description}</p>
        </div>

        <div className="ph-card__footer">
          <button
            className="ph-card__btn"
            style={{
              "--btn-bg": isHovered ? theme.accent : "transparent",
              "--btn-color": isHovered ? "#fff" : theme.iconColor,
              "--btn-border": theme.accent,
            }}
          >
            Start Practice
            <span className="ph-card__btn-arrow">
              <ArrowRightIcon />
            </span>
          </button>
        </div>

        {/* Bottom accent bar */}
        <div
          className="ph-card__accent-bar"
          style={{ background: theme.accent }}
        />
      </div>
    );
  };

  const totalModules = practiceCategories.reduce(
    (acc, cat) => acc + cat.practices.length,
    0,
  );

  return (
    <div className="ph-root">
      {/* Decorative background orbs */}
      <div className="ph-bg-orb ph-bg-orb--1" />
      <div className="ph-bg-orb ph-bg-orb--2" />

      <div className="ph-container">
        {/* Header */}
        <header className="ph-header">
          {/* <div className="ph-header__eyebrow">
            <span className="ph-header__dot" />
            AI-Powered Learning Platform
          </div> */}
          <h1 className="ph-header__title">
            Practice <span className="ph-header__title-accent">Hub</span>
          </h1>
          <p className="ph-header__subtitle">
            Master every skill with intelligent, adaptive practice sessions
          </p>

          <div className="ph-header__stats">
            <div className="ph-stat">
              <span className="ph-stat__num">{totalModules}</span>
              <span className="ph-stat__label">Active Modules</span>
            </div>
            <div className="ph-stat__divider" />
            <div className="ph-stat">
              <span className="ph-stat__num">{practiceCategories.length}</span>
              <span className="ph-stat__label">Categories</span>
            </div>
            <div className="ph-stat__divider" />
            <div className="ph-stat">
              <span className="ph-stat__num">AI</span>
              <span className="ph-stat__label">Powered</span>
            </div>
          </div>
        </header>

        {/* Categories */}
        {practiceCategories.map((category, catIdx) => (
          <section key={category.id} className="ph-section">
            <div className="ph-section__header">
              <div className="ph-section__label-row">
                <div
                  className="ph-section__indicator"
                  style={{ background: category.color }}
                />
                <div>
                  <div className="ph-section__eyebrow">
                    <span>{category.emoji}</span>
                    {category.title}
                  </div>
                  <p className="ph-section__desc">{category.description}</p>
                </div>
              </div>
              <div className="ph-section__count">
                {category.practices.length} module
                {category.practices.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="ph-grid">
              {category.practices.map((practice, idx) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  index={idx}
                  categoryIndex={catIdx}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PracticeHub;
