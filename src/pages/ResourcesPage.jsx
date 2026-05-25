import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Resources.css";

const ResourcesPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const resources = {
    technical: [
      {
        title: "React Documentation",
        description:
          "Official React documentation with guides and API reference",
        url: "https://react.dev",
        type: "Documentation",
        level: "All Levels",
        icon: "⚛️",
      },
      {
        title: "JavaScript Info",
        description: "Modern JavaScript tutorial from basics to advanced",
        url: "https://javascript.info",
        type: "Tutorial",
        level: "Beginner to Advanced",
        icon: "📘",
      },
      {
        title: "LeetCode",
        description:
          "Practice coding problems and technical interview questions",
        url: "https://leetcode.com",
        type: "Practice Platform",
        level: "All Levels",
        icon: "💻",
      },
      {
        title: "Node.js Best Practices",
        description: "Comprehensive guide to Node.js best practices",
        url: "https://github.com/goldbergyoni/nodebestpractices",
        type: "Guide",
        level: "Intermediate",
        icon: "📗",
      },
      {
        title: "Frontend Masters",
        description: "Advanced frontend engineering courses",
        url: "https://frontendmasters.com",
        type: "Course",
        level: "Intermediate to Advanced",
        icon: "🎓",
      },
      {
        title: "CSS Tricks",
        description: "Tips, tricks, and techniques on using CSS",
        url: "https://css-tricks.com",
        type: "Blog",
        level: "All Levels",
        icon: "🎨",
      },
    ],
    hr: [
      {
        title: "STAR Method Guide",
        description: "How to answer behavioral questions using the STAR method",
        url: "https://www.themuse.com/advice/star-interview-method",
        type: "Guide",
        level: "All Levels",
        icon: "⭐",
      },
      {
        title: "Common HR Questions",
        description: "50 most common HR interview questions and answers",
        url: "https://www.indeed.com/career-advice/interviewing/common-interview-questions",
        type: "Article",
        level: "All Levels",
        icon: "💼",
      },
      {
        title: "Behavioral Interview Guide",
        description: "Master behavioral interview questions with examples",
        url: "https://www.thebalancecareers.com/behavioral-interview-questions-2059624",
        type: "Guide",
        level: "All Levels",
        icon: "🎯",
      },
    ],
    systemDesign: [
      {
        title: "System Design Interview",
        description: "Guide to system design interviews with examples",
        url: "https://github.com/donnemartin/system-design-primer",
        type: "Repository",
        level: "Intermediate to Advanced",
        icon: "🏗️",
      },
      {
        title: "Grokking System Design",
        description: "Comprehensive system design interview course",
        url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        type: "Course",
        level: "Intermediate",
        icon: "📚",
      },
      {
        title: "High Scalability",
        description: "Real-world system architecture case studies",
        url: "http://highscalability.com",
        type: "Blog",
        level: "Advanced",
        icon: "🚀",
      },
    ],
    general: [
      {
        title: "Interview Warmup",
        description: "Google's AI-powered interview practice tool",
        url: "https://grow.google/certificates/interview-warmup/",
        type: "Tool",
        level: "All Levels",
        icon: "🤖",
      },
      {
        title: "Pramp",
        description: "Free peer-to-peer mock interviews",
        url: "https://www.pramp.com",
        type: "Practice Platform",
        level: "All Levels",
        icon: "👥",
      },
      {
        title: "Glassdoor",
        description: "Real interview questions shared by candidates",
        url: "https://www.glassdoor.com/Interview/index.htm",
        type: "Database",
        level: "All Levels",
        icon: "🏢",
      },
      {
        title: "The Muse",
        description: "Career advice and interview tips",
        url: "https://www.themuse.com",
        type: "Blog",
        level: "All Levels",
        icon: "💡",
      },
    ],
  };

  const getFilteredResources = () => {
    if (selectedCategory === "all") {
      return Object.values(resources).flat();
    }
    return resources[selectedCategory] || [];
  };

  const getRecommendedResources = () => {
    if (user?.role?.toLowerCase().includes("frontend")) {
      return resources.technical.slice(0, 3);
    }
    if (user?.role?.toLowerCase().includes("backend")) {
      return [
        ...resources.technical.slice(2, 4),
        ...resources.systemDesign.slice(0, 2),
      ];
    }
    if (user?.role?.toLowerCase().includes("full stack")) {
      return [
        ...resources.technical.slice(0, 3),
        ...resources.systemDesign.slice(0, 1),
      ];
    }
    return resources.general.slice(0, 2);
  };

  const recommended = getRecommendedResources();

  const categories = [
    { id: "all", label: "All Resources", icon: "📚" },
    { id: "technical", label: "Technical", icon: "💻" },
    { id: "hr", label: "HR & Behavioral", icon: "💼" },
    { id: "systemDesign", label: "System Design", icon: "🏗️" },
    { id: "general", label: "General", icon: "🎯" },
  ];

  return (
    <div className="resources-container">
      {/* Header Section */}
      <div className="resources-header">
        <h1 className="resources-title">Learning Resources</h1>
        <p className="resources-subtitle">
          Curated resources to help you ace your interviews
        </p>
      </div>

      {/* Recommended Section */}
      <div className="recommended-section">
        <div className="section-header">
          <div className="section-icon">🎯</div>
          <div>
            <h2 className="section-title">Recommended for You</h2>
            <p className="section-subtitle">
              Personalized based on your {user?.role} role
            </p>
          </div>
        </div>
        <div className="recommended-grid">
          {recommended.map((resource, index) => (
            <div key={index} className="recommended-card">
              <div className="recommended-icon">{resource.icon}</div>
              <div className="recommended-content">
                <h3 className="recommended-title">{resource.title}</h3>
                <p className="recommended-description">
                  {resource.description}
                </p>
                <div className="recommended-footer">
                  <span className="resource-type">{resource.type}</span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recommended-link"
                  >
                    Explore →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="resources-grid">
        {getFilteredResources().map((resource, index) => (
          <div key={index} className="resource-card">
            <div className="resource-icon">{resource.icon}</div>
            <div className="resource-content">
              <div className="resource-header">
                <h3 className="resource-title">{resource.title}</h3>
                <span
                  className={`resource-badge type-${resource.type.toLowerCase()}`}
                >
                  {resource.type}
                </span>
              </div>
              <p className="resource-description">{resource.description}</p>
              <div className="resource-footer">
                <span className="resource-level">
                  <span className="level-icon">📊</span>
                  {resource.level}
                </span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Learn More
                  <span className="link-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Study Tips Section */}
      <div className="tips-section">
        <div className="tips-header">
          <div className="tips-icon">💡</div>
          <div>
            <h3 className="tips-title">Study Tips</h3>
            <p className="tips-subtitle">Maximize your interview preparation</p>
          </div>
        </div>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-number">01</span>
            <p className="tip-text">
              Practice 10-15 minutes daily instead of long study sessions
            </p>
          </div>
          <div className="tip-item">
            <span className="tip-number">02</span>
            <p className="tip-text">
              Record yourself answering questions to improve your delivery
            </p>
          </div>
          <div className="tip-item">
            <span className="tip-number">03</span>
            <p className="tip-text">
              Focus on weak areas identified in your progress tracking
            </p>
          </div>
          <div className="tip-item">
            <span className="tip-number">04</span>
            <p className="tip-text">
              Use the STAR method for behavioral questions
            </p>
          </div>
          <div className="tip-item">
            <span className="tip-number">05</span>
            <p className="tip-text">
              Review real interview experiences on Glassdoor
            </p>
          </div>
          <div className="tip-item">
            <span className="tip-number">06</span>
            <p className="tip-text">
              Join coding communities for peer support and feedback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
