import React from "react";
import "../styles/Legal.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>

        <p>Last Updated: June 2026</p>

        <section>
          <h2>Information We Collect</h2>
          <p>
            InterviewAI collects information you provide during registration,
            profile setup, and platform usage, including your name, email
            address, interview responses, and performance data.
          </p>
        </section>

        <section>
          <h2>How We Use Information</h2>
          <p>
            We use your information to provide personalized interview practice,
            generate performance analytics, improve platform functionality, and
            communicate important updates.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data from
            unauthorized access, disclosure, or misuse.
          </p>
        </section>

        <section>
          <h2>Third Party Services</h2>
          <p>
            InterviewAI may use third party services such as AI providers,
            authentication providers, and analytics services to deliver platform
            features.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For privacy related questions, contact:
            interviewai.edutech@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
