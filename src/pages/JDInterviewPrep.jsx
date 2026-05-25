import React, { useEffect, useState } from "react";
import axios from "axios";
import VirtualInterview from "../components/VirtualInterview";
import {
  saveJDPrepSession,
  getJDPrepSession,
  clearJDPrepSession,
} from "../utils/storage";
import "../styles/JDInterviewPrep.css";
import API_URL from "../config/api";

const JDInterviewPrep = () => {
  const [step, setStep] = useState("input");
  const [jdText, setJdText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [finalSkills, setFinalSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullscreenWarning, setFullscreenWarning] = useState(false);

  useEffect(() => {
    const saved = getJDPrepSession();

    if (saved) {
      const restore = window.confirm("Resume previous JD interview practice?");

      if (restore) {
        setStep(saved.step || "input");
        setJdText(saved.jdText || "");
        setExtractedSkills(saved.extractedSkills || []);
        setFinalSkills(saved.finalSkills || []);

        setQuestions(saved.questions || []);
        setAnswers(saved.answers || []);
        setCurrentQuestionIndex(saved.currentQuestionIndex || 0);
        setSessionId(saved.sessionId || null);
        setEvaluation(saved.evaluation || null);
        setRecommendations(saved.recommendations || []);
        if (saved.step === "practice") {
          setFullscreenWarning(true);
        }
      } else {
        clearJDPrepSession();
      }
    }
  }, []);
  useEffect(() => {
    if (questions.length > 0 || jdText || evaluation) {
      saveJDPrepSession({
        step,
        jdText,
        extractedSkills,
        finalSkills,
        questions,
        answers,
        currentQuestionIndex,
        sessionId,
        evaluation,
        recommendations,
      });
    }
  }, [
    step,
    jdText,
    extractedSkills,
    finalSkills,
    questions,
    answers,
    currentQuestionIndex,
    sessionId,
    evaluation,
    recommendations,
  ]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        step === "practice" &&
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
  }, [step, fullscreenWarning]);

  const processJD = async () => {
    if (!jdText.trim()) return alert("Please paste the Job Description");

    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/jd/process`, {
        jobDescription: jdText,
      });

      setExtractedSkills(res.data.skills || []);
      setFinalSkills(res.data.skills || []);
      setQuestions(res.data.questions || []);
      setSessionId(res.data.sessionId);
      setStep("skills");
    } catch (err) {
      setError("Failed to analyze JD. Please try again.");
    } finally {
      setLoading(false);
    }
  };
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
  // FIXED: Proper handling for next question
  const handleAnswerComplete = async (transcript, duration) => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const newAnswer = {
      questionId: currentQ._id,
      questionText: currentQ.question,
      transcript: transcript || "(No speech detected)",
      duration: duration || 0,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Move to next question or evaluation
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setFullscreenWarning(false);
      setStep("evaluation");
      await generateEvaluation(updatedAnswers);
    }
  };

  const generateEvaluation = async (finalAnswers) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/jd/evaluate`, {
        sessionId,
        answers: finalAnswers,
      });
      setEvaluation(res.data.evaluation);
    } catch (err) {
      setError("Failed to generate evaluation");
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/jd/recommendations`, {
        sessionId,
      });
      setRecommendations(res.data.recommendations || []);
      await exitFullscreen();
      setStep("completed");
    } catch (err) {
      setError("Failed to generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    clearJDPrepSession();
    setStep("input");
    setFullscreenWarning(false);
    setJdText("");
    setExtractedSkills([]);
    setFinalSkills([]);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSessionId(null);
    setEvaluation(null);
    setRecommendations([]);
  };

  return (
    <div className="jd-prep-container">
      <div className="jd-header">
        <h1>JD Interview Prep</h1>
        <p>Personalized interview practice based on real job descriptions</p>
      </div>

      {step === "input" && (
        <div className="jd-input-step">
          <h2>Paste Job Description</h2>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={18}
          />
          <button
            onClick={processJD}
            disabled={loading}
            className="jd-primary-btn"
          >
            {loading
              ? "Analyzing JD..."
              : "Extract Skills & Generate Questions"}
          </button>
        </div>
      )}

      {step === "skills" && (
        <div className="jd-skills-step">
          <h2>Extracted Key Skills</h2>
          <div className="skills-container">
            {finalSkills.map((skill, i) => (
              <span key={i} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
          <button
            onClick={async () => {
              await enterFullscreen();
              setStep("practice");
            }}
            className="jd-primary-btn"
          >
            Start Mock Interview →
          </button>
        </div>
      )}
      {fullscreenWarning && (
        <div className="fullscreen-overlay">
          <div className="fullscreen-modal">
            <h2>Fullscreen Required</h2>

            <p>Please return to fullscreen to continue the interview.</p>

            <button
              onClick={async () => {
                const success = await enterFullscreen();

                if (document.fullscreenElement) {
                  setFullscreenWarning(false);
                }
              }}
            >
              Continue Interview
            </button>
          </div>
        </div>
      )}
      {step === "practice" && questions.length > 0 && (
        <VirtualInterview
          question={questions[currentQuestionIndex].question}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswerComplete={handleAnswerComplete}
        />
      )}

      {step === "evaluation" && (
        <div className="jd-results">
          <h2>Your Performance Evaluation</h2>
          {loading ? (
            <p>Analyzing your responses...</p>
          ) : evaluation ? (
            <>
              <div className="score-circle">{evaluation.overallScore}</div>
              <p>
                <strong>JD Alignment:</strong> {evaluation.jdAlignmentScore}%
              </p>
              <div className="evaluation-feedback">
                <h4>Summary Feedback</h4>
                <p>{evaluation.summaryFeedback}</p>
              </div>
              <button
                onClick={generateRecommendations}
                disabled={loading}
                className="jd-primary-btn"
              >
                Get Learning Recommendations
              </button>
            </>
          ) : null}
        </div>
      )}

      {step === "completed" && (
        <div className="jd-completed">
          <h2>🎉 Session Completed Successfully!</h2>

          {/* RECOMMENDATIONS */}
          {recommendations.length > 0 && (
            <div className="jd-recommendations">
              <h3>Learning Recommendations</h3>

              <div className="recommendation-list">
                {recommendations.map((item, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-head">
                      <h4>{item.topic}</h4>

                      <span
                        className={`priority-badge ${item.priority?.toLowerCase()}`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <p className="recommendation-reason">{item.reason}</p>

                    {item.suggestedResources?.length > 0 && (
                      <div className="resource-list">
                        <h5>Suggested Resources</h5>

                        {item.suggestedResources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.link}
                            target="_blank"
                            rel="noreferrer"
                            className="resource-item"
                          >
                            <strong>{resource.title}</strong>

                            <span>{resource.type}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={resetAll} className="jd-primary-btn">
            Start New JD Preparation
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default JDInterviewPrep;
