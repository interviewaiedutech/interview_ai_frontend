import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import {
  saveMockInterviewSession,
  getMockInterviewSession,
  clearMockInterviewSession,
} from "../utils/storage";
import VirtualInterview from "../components/VirtualInterview";
import TextToSpeech from "../components/TextToSpeech";
import "../styles/MockInterview.css";
import API_URL from "../config/api";

const MockInterviewPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("setup");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const [interviewMode, setInterviewMode] = useState("virtual");
  const [answerKey, setAnswerKey] = useState(0);

  const [customTech, setCustomTech] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  const [setupData, setSetupData] = useState({
    role: user?.role || "Frontend Developer",
    experienceLevel: user?.experienceLevel || "Beginner",
    technologyStack: user?.technologyStack || [],
  });
  useEffect(() => {
    const saved = getMockInterviewSession();

    if (saved) {
      const restore = window.confirm("Resume previous mock interview session?");

      if (restore) {
        setStep(saved.step || "setup");
        setQuestions(saved.questions || []);
        setCurrentQuestionIndex(saved.currentQuestionIndex || 0);
        setAnswers(saved.answers || []);
        setSessionId(saved.sessionId || null);
        setCurrentAnswer(saved.currentAnswer || "");
        setScore(saved.score || null);
        setInterviewMode(saved.interviewMode || "virtual");
        setAnswerKey(saved.answerKey || 0);
        setSetupData(
          saved.setupData || {
            role: user?.role || "Frontend Developer",
            experienceLevel: user?.experienceLevel || "Beginner",
            technologyStack: user?.technologyStack || [],
          },
        );
      } else {
        clearMockInterviewSession();
      }
    }
  }, [user]);

  useEffect(() => {
    if (step === "setup" && questions.length === 0) return;

    saveMockInterviewSession({
      step,
      questions,
      currentQuestionIndex,
      answers,
      sessionId,
      currentAnswer,
      score,
      interviewMode,
      answerKey,
      setupData,
    });
  }, [
    step,
    questions,
    currentQuestionIndex,
    answers,
    sessionId,
    currentAnswer,
    score,
    interviewMode,
    answerKey,
    setupData,
  ]);

  useEffect(() => {
    if (step === "results" && score !== null) {
      clearMockInterviewSession();
    }
  }, [step, score]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        step === "interview" &&
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
  }, [step, interviewMode, fullscreenWarning]);
  // Fullscreen Function
  const enterFullScreen = async () => {
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
      console.warn("Fullscreen request failed:", err);

      return false;
    }
  };

  const exitFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Exit fullscreen failed:", err);
    }
  };

  const handleAddCustomTech = () => {
    if (
      customTech.trim() &&
      !setupData.technologyStack.includes(customTech.trim())
    ) {
      handleTechSelect(customTech.trim());
      setCustomTech("");
      setShowCustomInput(false);
    }
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/interview/generate`,
        setupData,
      );
      console.log("interview question", response.data);
      setQuestions(response.data.questions);

      const sessionResponse = await axios.post(
        `${API_URL}/interview/start-session`,
        {
          ...setupData,
          questions: response.data.questions,
        },
      );

      setSessionId(sessionResponse.data.sessionId);
      setStep("mode-selection");
      setAnswers(new Array(response.data.questions.length).fill(""));
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetupChange = (e) => {
    setSetupData({ ...setupData, [e.target.name]: e.target.value });
  };

  const handleTechSelect = (tech) => {
    setSetupData((prev) => ({
      ...prev,
      technologyStack: prev.technologyStack.includes(tech)
        ? prev.technologyStack.filter((t) => t !== tech)
        : [...prev.technologyStack, tech],
    }));
  };

  // Text Mode Submit
  const handleTextAnswerSubmit = async () => {
    setSubmittingAnswer(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    console.log("tech answer: ", currentAnswer);
    setAnswers(newAnswers);

    try {
      await axios.post(`${API_URL}/interview/submit-answer`, {
        sessionId,
        questionIndex: currentQuestionIndex,
        answer: currentAnswer,
      });

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer("");
      } else {
        await completeInterview();
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  // Virtual Mode Submit
  const handleVirtualAnswerComplete = async (
    // videoUrl,
    transcript,
    duration,
  ) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      type: "video",
      transcript: transcript || " ",
      duration: duration || 0,
    };
    setAnswers(newAnswers);
    console.log("tech video answer:", transcript);
    setSubmittingAnswer(true);
    try {
      await axios.post(`${API_URL}/interview/submit-answer`, {
        sessionId,
        questionIndex: currentQuestionIndex,
        answer: transcript || "(no speech detected)",
      });

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentAnswer("");
        setAnswerKey((prev) => prev + 1);
      } else {
        await completeInterview();
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const completeInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/interview/complete-session`,
        { sessionId },
      );
      setScore(response.data.score);
      await exitFullScreen();
      setStep("results");
    } catch (error) {
      console.error("Error completing interview:", error);
      alert("Error completing interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startNewInterview = () => {
    clearMockInterviewSession();
    setFullscreenWarning(false);
    setStep("setup");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSessionId(null);
    setCurrentAnswer("");
    setScore(null);
    setInterviewMode("virtual");
    setAnswerKey(0);
    setCustomTech("");
    setShowCustomInput(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      technical: "category-technical",
      hr: "category-hr",
      coding: "category-coding",
      scenario: "category-scenario",
      system_design: "category-system-design",
      architecture: "category-architecture",
      debugging: "category-debugging",
      behavioral: "category-behavioral",
      optimization: "category-optimization",
    };
    return colors[category] || "category-default";
  };

  // ====================== SETUP PAGE ======================
  if (step === "setup") {
    const roles = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "DevOps Engineer",
      "Product Manager",
      "Mobile Developer",
      "QA Engineer",
      "Security Engineer",
      "Cloud Engineer",
      "Data Analyst",
      "Data Scientist",
      "Business Analyst",
      "AI Engineer",
      "Machine Learning Engineer",
      "Project Manager",
      "Technical Support Engineer",
      "HR Executive",
      "Sales Executive",
      "Digital Marketing Specialist",
      "Content Writer",
      "Graduate Trainee",
      "Student",
    ];
    const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
    const technologies = [
      {
        category: "Frontend",
        items: [
          "React",
          "Angular",
          "Vue.js",
          "Next.js",
          "TypeScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
        ],
      },
      {
        category: "Backend",
        items: [
          "Node.js",
          "Python",
          "Java",
          "PHP",
          "Ruby on Rails",
          "Go",
          "C#",
          ".NET Core",
        ],
      },
      {
        category: "Database",
        items: [
          "MongoDB",
          "PostgreSQL",
          "MySQL",
          "Redis",
          "Firebase",
          "Oracle",
          "SQL Server",
          "DynamoDB",
        ],
      },
      {
        category: "Cloud & DevOps",
        items: [
          "AWS",
          "Azure",
          "Google Cloud",
          "Docker",
          "Kubernetes",
          "Jenkins",
          "GitHub Actions",
          "Terraform",
        ],
      },
      {
        category: "Mobile",
        items: [
          "React Native",
          "Flutter",
          "Swift",
          "Kotlin",
          "iOS",
          "Android",
          "Xamarin",
          "Ionic",
        ],
      },
      {
        category: "Testing & Tools",
        items: [
          "Jest",
          "Mocha",
          "Cypress",
          "Selenium",
          "Git",
          "JIRA",
          "Postman",
          "Figma",
        ],
      },
    ];

    return (
      <div className="interview-container">
        <div className="interview-card">
          <div className="interview-header">
            <div className="header-icon">🎯</div>
            <h1 className="header-title">Mock Interview Setup</h1>
            <p className="header-subtitle">
              Configure your preferences. The AI will generate personalised
              questions.
            </p>
          </div>

          <div className="setup-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">💼</span>Target Role
              </label>
              <select
                name="role"
                value={setupData.role}
                onChange={handleSetupChange}
                className="form-select"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📊</span>Experience Level
              </label>
              <div className="experience-buttons">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`exp-btn ${setupData.experienceLevel === level ? "active" : ""}`}
                    onClick={() =>
                      setSetupData({ ...setupData, experienceLevel: level })
                    }
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🛠️</span>Technology Stack
                <span className="label-hint">(Click to select)</span>
              </label>
              <div className="tech-categories">
                {technologies.map((cat, idx) => (
                  <div key={idx} className="tech-category">
                    <h4 className="category-title">{cat.category}</h4>
                    <div className="tech-list">
                      {cat.items.map((tech) => (
                        <div
                          key={tech}
                          className={`tech-item ${setupData.technologyStack.includes(tech) ? "selected" : ""}`}
                          onClick={() => handleTechSelect(tech)}
                        >
                          <span className="tech-name">{tech}</span>
                          {setupData.technologyStack.includes(tech) && (
                            <span className="tech-check">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Custom tech */}
                <div className="tech-category other-tech-category">
                  <h4 className="category-title">➕ Other Technologies</h4>
                  <div className="tech-list">
                    {!showCustomInput ? (
                      <button
                        className="add-tech-btn"
                        onClick={() => setShowCustomInput(true)}
                      >
                        <span className="add-icon">+</span>Add Custom Technology
                      </button>
                    ) : (
                      <div className="custom-tech-input">
                        <input
                          type="text"
                          placeholder="Enter technology name..."
                          value={customTech}
                          onChange={(e) => setCustomTech(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddCustomTech()
                          }
                          className="custom-tech-field"
                          autoFocus
                        />
                        <button
                          onClick={handleAddCustomTech}
                          className="confirm-add-btn"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowCustomInput(false);
                            setCustomTech("");
                          }}
                          className="cancel-add-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {setupData.technologyStack.length > 0 && (
                <div className="selected-techs">
                  <span className="selected-label">Selected Technologies:</span>
                  <div className="selected-badges">
                    {setupData.technologyStack.map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                        <button
                          className="badge-remove"
                          onClick={() => handleTechSelect(tech)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button
                onClick={generateQuestions}
                disabled={loading}
                className="btn-start"
              >
                {loading ? "Generating Questions..." : "Start Interview →"}
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================== MODE SELECTION ======================
  if (step === "mode-selection") {
    return (
      <div className="interview-container">
        <div className="mode-selection-card">
          <h2 className="mode-title">Choose Interview Mode</h2>
          <p className="mode-subtitle">Select how you want to practice</p>

          <div className="mode-options">
            <div
              className="mode-option mode-option-featured"
              onClick={async () => {
                const success = await enterFullScreen();

                if (success || document.fullscreenElement) {
                  setInterviewMode("virtual");

                  setStep("interview");
                }
              }}
            >
              <div className="mode-icon">🎙️</div>
              <h3>Virtual AI Interview</h3>
              <p>Speak to an AI interviewer with video recording.</p>
              <span className="mode-badge mode-badge-new">Recommended</span>
            </div>

            <div
              className="mode-option"
              onClick={async () => {
                const success = await enterFullScreen();

                if (success || document.fullscreenElement) {
                  setInterviewMode("text");
                  setStep("interview");
                }
              }}
            >
              <div className="mode-icon">✍️</div>
              <h3>Text Mode</h3>
              <p>Type your answers in fullscreen mode.</p>
              <span className="mode-badge">Anti-Cheat Enabled</span>
            </div>
          </div>

          <button onClick={() => setStep("setup")} className="back-btn">
            ← Back to Setup
          </button>
        </div>
      </div>
    );
  }

  // ====================== INTERVIEW PAGE ======================
  const textCategories = [
    "coding",
    "system_design",
    "architecture",
    "debugging",
  ];
  if (step === "interview" && questions.length > 0) {
    const showFullscreenOverlay = fullscreenWarning && step === "interview";
    const currentQuestion = questions[currentQuestionIndex];
    const progress = (currentQuestionIndex / questions.length) * 100;

    // Virtual Interview
    if (
      interviewMode === "virtual" &&
      !textCategories.includes(currentQuestion.category)
    ) {
      return (
        <div className="interview-container">
          {showFullscreenOverlay && (
            <div className="mock-fullscreen-overlay">
              <div className="mock-fullscreen-modal">
                <h2>Fullscreen Required</h2>

                <p>Please return to fullscreen to continue the interview.</p>

                <button
                  onClick={async () => {
                    const success = await enterFullScreen();

                    if (success || document.fullscreenElement) {
                      setFullscreenWarning(false);
                    }
                  }}
                >
                  Continue Interview
                </button>
              </div>
            </div>
          )}
          <VirtualInterview
            key={answerKey}
            question={currentQuestion.text}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswerComplete={handleVirtualAnswerComplete}
          />
        </div>
      );
    }

    // ==================== TEXT MODE ====================
    return (
      <div className="interview-container">
        {showFullscreenOverlay && (
          <div className="mock-fullscreen-overlay">
            <div className="mock-fullscreen-modal">
              <h2>Fullscreen Required</h2>

              <p>Please return to fullscreen to continue the interview.</p>

              <button
                onClick={async () => {
                  const success = await enterFullScreen();

                  if (success || document.fullscreenElement) {
                    setFullscreenWarning(false);
                  }
                }}
              >
                Continue Interview
              </button>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="progress-percent">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="question-card">
          <div className="category-badge">
            <span
              className={`category-tag ${getCategoryColor(currentQuestion.category)}`}
            >
              {(currentQuestion.category || "general").toUpperCase()}
            </span>
          </div>

          <div className="question-header-video">
            <h2 className="question-text">{currentQuestion.text}</h2>
            {/* <div className="question-meta"></div> */}
            <TextToSpeech text={currentQuestion.text} autoSpeak={true} />
          </div>

          <div className="answer-section">
            <label className="answer-label">Your Answer:</label>
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onPaste={(e) => e.preventDefault()} // Disable Paste
              rows={textCategories.includes(currentQuestion.category) ? 16 : 12}
              className={
                currentQuestion.category === "coding"
                  ? "coding-answer-input"
                  : "answer-input"
              }
              placeholder={
                textCategories.includes(currentQuestion.category)
                  ? "Write your answer here..."
                  : "Type your detailed answer here..."
              }
            />
            <div className="answer-actions">
              <button
                onClick={handleTextAnswerSubmit}
                disabled={!currentAnswer.trim() || submittingAnswer}
                className="submit-btn"
              >
                {submittingAnswer
                  ? "Saving..."
                  : currentQuestionIndex + 1 === questions.length
                    ? "Complete Interview ✓"
                    : "Next Question →"}
              </button>
            </div>
          </div>
        </div>

        <div className="tips-card">
          <div className="tips-header">
            <span className="tips-icon">💡</span>
            <h3 className="tips-title">Tips for answering</h3>
          </div>
          <ul className="tips-list">
            <li>Be specific and provide real examples from your experience</li>
            <li>Use STAR method for behavioral questions</li>
            <li>Write in your own words (Pasting is disabled)</li>
            <li>Be honest about your knowledge</li>
          </ul>
        </div>
      </div>
    );
  }

  // ====================== RESULTS PAGE ======================
  if (step === "results") {
    const totalPossible = questions.length * 10;
    const percentage = Math.round(((score || 0) / totalPossible) * 100);

    return (
      <div className="interview-container">
        <div className="results-card">
          <div className="results-icon">
            {percentage >= 70 ? "🎉" : percentage >= 40 ? "👍" : "💪"}
          </div>

          <h1 className="results-title">Interview Completed!</h1>
          <p className="results-subtitle">Here's how you performed</p>

          <div className="score-circle">
            <svg className="score-svg" viewBox="0 0 100 100">
              <circle className="score-bg" cx="50" cy="50" r="45" />
              <circle
                className="score-fill"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDasharray: `${percentage * 2.83}, 283`,
                  stroke:
                    percentage >= 70
                      ? "#10b981"
                      : percentage >= 40
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              />
              <text className="score-text" x="50" y="55">
                {percentage}%
              </text>
            </svg>
          </div>

          <div className="results-stats">
            <div className="stat-box">
              <div className="stat-value">{questions.length}</div>
              <div className="stat-label">Questions Answered</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{score}</div>
              <div className="stat-label">Points Earned</div>
            </div>
          </div>

          <div
            className={`feedback-message ${percentage >= 70 ? "feedback-excellent" : percentage >= 40 ? "feedback-good" : "feedback-improve"}`}
          >
            {percentage >= 70
              ? "Excellent work! You're well prepared for real interviews!"
              : percentage >= 40
                ? "Good effort! Keep practising to improve your answers."
                : "Don't worry! Review the feedback and practise more."}
          </div>

          <div className="results-actions">
            <button onClick={startNewInterview} className="btn-practice">
              Practice Again
            </button>
            <button
              onClick={() => navigate("/progress")}
              className="btn-progress"
            >
              View Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="interview-container">
        <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
          <div className="spinner" style={{ margin: "0 auto 1rem" }} />
          <p>Completing your interview...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default MockInterviewPage;
