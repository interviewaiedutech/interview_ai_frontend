import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  saveAptitudeSession,
  getAptitudeSession,
  clearAptitudeSession,
} from "../utils/storage";
import "../styles/AptitudePractice.css";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

const AptitudePractice = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);

  // Fetch topics on load
  useEffect(() => {
    fetchTopics();
  }, []);
  useEffect(() => {
    const saved = getAptitudeSession();

    if (saved) {
      const restore = window.confirm("Resume previous aptitude session?");

      if (restore) {
        setSelectedTopic(saved.selectedTopic || "");

        setQuestions(saved.questions || []);

        setCurrentIndex(saved.currentIndex || 0);

        setSelectedAnswer(saved.selectedAnswer || "");

        setShowResult(saved.showResult || false);

        setScore(saved.score || 0);

        setAnswered(saved.answered || []);

        setSessionComplete(saved.sessionComplete || false);

        setSessionId(saved.sessionId || null);

        setStartTime(saved.startTime || null);
      } else {
        clearAptitudeSession();
      }
    }
  }, []);
  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${API_URL}/aptitude/topics`);
      setTopics(response.data.topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };
  useEffect(() => {
    if (!selectedTopic) return;

    saveAptitudeSession({
      selectedTopic,
      questions,
      currentIndex,
      selectedAnswer,
      showResult,
      score,
      answered,
      sessionComplete,
      sessionId,
      startTime,
    });
  }, [
    selectedTopic,
    questions,
    currentIndex,
    selectedAnswer,
    showResult,
    score,
    answered,
    sessionComplete,
    sessionId,
    startTime,
  ]);
  // Create session and fetch questions
  const startSessionAndFetchQuestions = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setScore(0);
    setAnswered([]);
    setShowResult(false);
    setSelectedAnswer("");
    setSessionComplete(false);

    try {
      // First, fetch questions
      const questionsResponse = await axios.get(
        `${API_URL}/aptitude/questions/${topic}?limit=10`,
      );
      const fetchedQuestions = questionsResponse.data.questions;
      setQuestions(fetchedQuestions);

      // Then create a session
      const sessionResponse = await axios.post(
        `${API_URL}/aptitude/session/start`,
        {
          topic,
          totalQuestions: fetchedQuestions.length,
        },
      );
      setSessionId(sessionResponse.data.sessionId);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Error starting session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }

    const currentQuestion = questions[currentIndex];
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const isCorrect = selectedAnswer === currentQuestion.answer;

    try {
      // Submit to session for storage
      await axios.post(`${API_URL}/aptitude/session/submit`, {
        sessionId,
        questionId: currentQuestion.id || currentQuestion._id,
        questionText: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        explanation: currentQuestion.explanation,
        isCorrect: isCorrect,
        timeSpent,
      });

      // Get immediate evaluation
      const response = await axios.post(`${API_URL}/aptitude/evaluate`, {
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        explanation: currentQuestion.explanation,
      });

      if (response.data.correct) {
        setScore((prev) => prev + 1);
      }

      setAnswered((prev) => [
        ...prev,
        {
          ...currentQuestion,
          userAnswer: selectedAnswer,
          isCorrect: response.data.correct,
          explanation: currentQuestion.explanation,
        },
      ]);

      setShowResult(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleNextQuestion = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      // Complete the session
      const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
      try {
        await axios.post(`${API_URL}/aptitude/session/complete`, {
          sessionId,
          timeSpent: totalTimeSpent,
        });
      } catch (error) {
        console.error("Error completing session:", error);
      }
      setSessionComplete(true);
    }
  };

  const resetPractice = () => {
    clearAptitudeSession();

    setSelectedTopic("");
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswered([]);
    setShowResult(false);
    setSessionComplete(false);
    setSessionId(null);
    setStartTime(null);
  };

  useEffect(() => {
    if (sessionComplete) {
      clearAptitudeSession();
    }
  }, [sessionComplete]);

  if (!selectedTopic) {
    return (
      <div className="aptitude-container">
        <div className="topic-selection">
          <h1>Aptitude Practice</h1>
          <p>Select a topic to start practicing</p>
          <div className="topics-grid">
            {topics.map((topic) => (
              <div
                key={topic}
                className="topic-card"
                onClick={() => startSessionAndFetchQuestions(topic)}
              >
                <div className="topic-icon">📝</div>
                <h3>{topic}</h3>
                <p>Practice questions on {topic.toLowerCase()}</p>
              </div>
            ))}
          </div>
          <br />
          <button
            onClick={() => navigate("/practice-hub")}
            className="action-btn-aptitude primary"
          >
            Go to Practice Hub
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="aptitude-container">
        <div className="loading-state">
          <div className="spinner-aptitude"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const percentage =
      questions.length > 0 ? (score / questions.length) * 100 : 0;
    return (
      <div className="aptitude-container">
        <div className="results-container">
          <h1>🎉 Practice Complete!</h1>
          <div className="score-card">
            <div className="score-circle">
              <span className="score-number">{Math.round(percentage)}%</span>
            </div>
            <p>
              You got {score} out of {questions.length} correct
            </p>
          </div>

          <div className="answers-review">
            <h2>Review Your Answers</h2>
            {answered.map((item, idx) => (
              <div
                key={idx}
                className={`review-item ${item.isCorrect ? "correct" : "incorrect"}`}
              >
                <div className="review-question">
                  <span className="q-number">{idx + 1}.</span>
                  <span>{item.question}</span>
                </div>
                <div className="review-details">
                  <p>
                    <strong>Your answer:</strong> {item.userAnswer}
                  </p>
                  <p>
                    <strong>Correct answer:</strong> {item.answer}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button
              onClick={() => startSessionAndFetchQuestions(selectedTopic)}
              className="btn-practice-again"
            >
              Practice Again
            </button>
            <button onClick={resetPractice} className="btn-change-topic">
              Change Topic
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="aptitude-container">
        <div className="loading-state">
          <p>No questions available. Please try again.</p>
          <button onClick={resetPractice} className="btn-change-topic">
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="aptitude-container">
      <div className="practice-header">
        <div className="topic-info">
          <button onClick={resetPractice} className="back-btn">
            ← Back
          </button>
          <h2>{selectedTopic}</h2>
        </div>
        <div className="progress-info">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {!showResult ? (
        <div className="question-container">
          <div className="question-card-aptitude">
            <h3 className="question-text">{currentQuestion?.question}</h3>
            <div className="options-list">
              {currentQuestion?.options?.map((option, idx) => (
                <label
                  key={idx}
                  className={`option-item ${selectedAnswer === option ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmitAnswer}
              className="submit-btn"
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <div
            className={`result-card ${answered[currentIndex]?.isCorrect ? "correct" : "incorrect"}`}
          >
            <div className="result-icon">
              {answered[currentIndex]?.isCorrect ? "✅" : "❌"}
            </div>
            <h3>
              {answered[currentIndex]?.isCorrect ? "Correct!" : "Incorrect"}
            </h3>
            <p className="explanation">{answered[currentIndex]?.explanation}</p>
            <button onClick={handleNextQuestion} className="next-btn">
              {currentIndex + 1 < questions.length
                ? "Next Question →"
                : "View Results →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AptitudePractice;
