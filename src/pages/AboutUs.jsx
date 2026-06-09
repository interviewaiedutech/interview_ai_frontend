import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About InterviewAI</h1>
          <p>
            Empowering students and job seekers with AI driven interview
            preparation.
          </p>
        </div>

        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            InterviewAI is an intelligent interview preparation platform
            designed to help candidates improve their technical, aptitude,
            communication, presentation, and professional skills through
            personalized practice and instant feedback.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make interview preparation accessible,
            personalized, and effective for everyone. We aim to help candidates
            build confidence and improve their chances of securing their dream
            jobs.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>

          <div className="about-features">
            <div className="about-feature-card">
              <h3>Technical Interviews</h3>
              <p>
                Practice role based technical interviews with AI generated
                questions and feedback.
              </p>
            </div>

            <div className="about-feature-card">
              <h3>Aptitude Training</h3>
              <p>
                Improve quantitative, logical reasoning and problem solving
                skills.
              </p>
            </div>

            <div className="about-feature-card">
              <h3>Communication Practice</h3>
              <p>
                Enhance spoken communication and professional speaking skills.
              </p>
            </div>

            <div className="about-feature-card">
              <h3>Email Writing</h3>
              <p>Learn professional email writing with AI based evaluation.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Why Choose InterviewAI</h2>

          <ul className="about-list">
            <li>AI powered personalized learning experience</li>
            <li>Real time performance evaluation</li>
            <li>Progress tracking and analytics</li>
            <li>Multiple interview preparation modules</li>
            <li>Practice anytime and anywhere</li>
          </ul>
        </div>

        <div className="about-footer">
          <h2>Start Your Journey</h2>
          <p>
            Prepare smarter, improve faster, and achieve your career goals with
            InterviewAI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
