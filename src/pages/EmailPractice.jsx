import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  saveEmailSession,
  getEmailSession,
  clearEmailSession,
} from "../utils/storage";
import "../styles/EmailPractice.css";
import API_URL from "../config/api";

const EmailPractice = () => {
  const [categories] = useState(["professional", "formal", "customer-support"]);
  const [selectedCategory, setSelectedCategory] = useState("professional");
  const [currentScenario, setCurrentScenario] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [aiSource, setAiSource] = useState(null);

  useEffect(() => {
    const saved = getEmailSession();

    if (saved) {
      const restore = window.confirm("Resume previous email practice?");

      if (restore) {
        setSelectedCategory(saved.selectedCategory || "professional");
        setCurrentScenario(saved.currentScenario || null);
        setUserEmail(saved.userEmail || "");
        setEvaluation(saved.evaluation || null);
        setShowResult(saved.showResult || false);
        setSessionId(saved.sessionId || null);
        setStartTime(saved.startTime || Date.now());
        setWordCount(saved.wordCount || 0);
        setShowTips(saved.showTips || false);
        setAiSource(saved.aiSource || null);
      } else {
        clearEmailSession();
      }
    }
  }, []);

  useEffect(() => {
    if (!currentScenario) return;

    saveEmailSession({
      selectedCategory,
      currentScenario,
      userEmail,
      evaluation,
      showResult,
      sessionId,
      startTime,
      wordCount,
      showTips,
      aiSource,
    });
  }, [
    selectedCategory,
    currentScenario,
    userEmail,
    evaluation,
    showResult,
    sessionId,
    startTime,
    wordCount,
    showTips,
    aiSource,
  ]);
  const generateScenario = async () => {
    setGenerating(true);
    setCurrentScenario(null);
    setEvaluation(null);
    setShowResult(false);
    setUserEmail("");

    try {
      const response = await axios.post(`${API_URL}/email/generate-scenario`, {
        category: selectedCategory,
        difficulty: "medium",
      });

      setCurrentScenario(response.data.scenario);
      setAiSource(response.data.source);

      // Start session
      const sessionResponse = await axios.post(
        `${API_URL}/email/session/start`,
        {
          category: selectedCategory,
          scenarioTitle: response.data.scenario.title,
        },
      );
      setSessionId(sessionResponse.data.sessionId);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Error generating scenario:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleEmailChange = (e) => {
    const text = e.target.value;
    setUserEmail(text);
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
  };

  const handleSubmit = async () => {
    if (!userEmail.trim()) {
      alert("Please write your email before submitting");
      return;
    }

    setLoading(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    try {
      const response = await axios.post(`${API_URL}/email/evaluate`, {
        email: userEmail,
        scenario: currentScenario,
        sessionId,
        timeSpent,
      });

      setEvaluation(response.data.evaluation);
      setAiSource(response.data.source);
      setShowResult(true);
    } catch (error) {
      console.error("Error evaluating email:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetPractice = () => {
    clearEmailSession();

    setCurrentScenario(null);
    setUserEmail("");
    setEvaluation(null);
    setShowResult(false);
    setWordCount(0);
    setAiSource(null);
    setSessionId(null);
    setStartTime(null);
    setShowTips(false);
  };
  useEffect(() => {
    if (showResult && evaluation) {
      clearEmailSession();
    }
  }, [showResult, evaluation]);
  if (!currentScenario && !generating) {
    return (
      <div className="email-container">
        <div className="email-header">
          <h1>AI-Powered Email Writing Practice</h1>
          <p>Generate dynamic email scenarios and get AI-powered feedback</p>
        </div>

        <div className="category-section">
          <h3>Select Email Category</h3>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-select-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "professional" && "💼 Professional"}
                {cat === "formal" && "📝 Formal"}
                {cat === "customer-support" && "🤝 Customer Support"}
              </button>
            ))}
          </div>
        </div>

        <button className="generate-btn" onClick={generateScenario}>
          {generating ? "Generating..." : "✨ Generate New Scenario"}
        </button>

        <div className="info-box">
          <p>
            🤖 AI generates unique email scenarios based on your category choice
          </p>
          <p>📝 Write your response and get AI-powered evaluation</p>
          <p>⚡ No fixed question bank - every practice is unique!</p>
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="email-container">
        <div className="loading-state">
          <div className="spinner-email"></div>
          <p>AI is generating a unique email scenario for you...</p>
        </div>
      </div>
    );
  }

  if (showResult && evaluation) {
    return (
      <div className="email-container">
        <div className="result-container-email">
          <button className="back-btn" onClick={resetPractice}>
            ← Generate New Scenario
          </button>

          <div className="ai-badge">
            {aiSource === "ai"
              ? "🤖 AI-Powered Evaluation"
              : "📋 Standard Evaluation"}
          </div>

          <h1>📊 Email Evaluation Results</h1>

          <div className="score-card">
            <div className="overall-score">
              <div className="score-circle">
                <span className="score-number">{evaluation?.score || 40}%</span>
              </div>
              <p className="score-feedback">
                {evaluation?.feedback || "No feedback available"}
              </p>
            </div>

            {/* <div className="criteria-scores">
              {Object.entries(evaluation).map(([key, value]) => {
                if (key === "overall" || !value.score) return null;
                return (
                  <div key={key} className="criteria-item">
                    <div className="criteria-header">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="criteria-score">{value.score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${value.score}%` }}
                      ></div>
                    </div>
                    <p className="criteria-feedback">{value.feedback}</p>
                  </div>
                );
              })}
            </div> */}
          </div>

          <div className="your-email">
            <h3>📧 Your Email</h3>
            <div className="email-content">
              <pre>{userEmail}</pre>
            </div>
          </div>

          {/* <div className="sample-answer">
            <h3>📖 Sample Answer (For Reference)</h3>
            <div className="sample-content">
              <pre>{currentScenario.sampleAnswer}</pre>
            </div>
          </div> */}

          <div className="result-actions">
            <button onClick={generateScenario} className="btn-practice-again">
              Generate New Scenario
            </button>
            <button onClick={resetPractice} className="btn-practice-again">
              Back to Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-container">
      <div className="email-editor-container">
        <button className="back-btn" onClick={resetPractice}>
          ← New Scenario
        </button>

        <div className="ai-badge">
          {aiSource === "ai"
            ? "🤖 AI-Generated Scenario"
            : "📋 Sample Scenario"}
        </div>

        <div className="scenario-info">
          <h2>{currentScenario.title}</h2>
          <p className="scenario-description">{currentScenario.scenario}</p>

          <button
            className="tips-toggle"
            onClick={() => setShowTips(!showTips)}
          >
            {showTips ? "Hide Tips" : "Show Writing Tips"} 💡
          </button>

          {showTips && (
            <div className="tips-box">
              <h4>Writing Tips:</h4>
              <ul>
                {currentScenario.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="email-editor">
          <div className="email-header-info">
            <div className="email-recipient">
              <strong>To:</strong> {currentScenario.recipient}
            </div>
            <div className="email-sender">
              <strong>From:</strong> {currentScenario.sender}
            </div>
          </div>

          <textarea
            className="email-textarea"
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="Write your professional email here..."
            rows={12}
          />

          <div className="email-stats">
            <span>📝 Word Count: {wordCount}</span>
            <span
              className={
                wordCount < 80
                  ? "warning"
                  : wordCount > 250
                    ? "warning"
                    : "good"
              }
            >
              {wordCount < 80
                ? "✏️ Too short (aim for 80-250 words)"
                : wordCount > 250
                  ? "📖 Too long (aim for 80-250 words)"
                  : "✅ Good length"}
            </span>
          </div>
        </div>

        <div className="editor-actions">
          <button
            onClick={handleSubmit}
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Evaluating with AI..." : "Submit for AI Evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPractice;
