import React, { useState } from "react";
import "../styles/FAQ.css";

const faqData = [
  {
    question: "What is InterviewAI?",
    answer:
      "InterviewAI is an AI powered interview preparation platform that helps users practice technical interviews, aptitude tests, communication skills, email writing, and more.",
  },
  {
    question: "Is InterviewAI free to use?",
    answer:
      "Yes. Core interview preparation features are available for users at no cost.",
  },
  {
    question: "How are interview questions generated?",
    answer:
      "Questions are generated using AI models and are customized based on the selected role, experience level, and practice module.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes. InterviewAI provides dashboards, performance analytics, streak tracking, goals, and achievement systems.",
  },
  {
    question: "How is my score calculated?",
    answer:
      "Scores are calculated based on your responses, accuracy, communication quality, and AI evaluation criteria specific to each module.",
  },
  {
    question: "Can recruiters see my data?",
    answer:
      "No. Your practice sessions and performance data remain private within your account.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact us through the Contact Us page or email support@interviewai.com.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">
          Find answers to common questions about InterviewAI.
        </p>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span>{active === index ? "−" : "+"}</span>
              </button>

              {active === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
