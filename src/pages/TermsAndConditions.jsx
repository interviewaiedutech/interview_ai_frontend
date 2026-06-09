import React from "react";
import "../styles/Legal.css";

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms & Conditions</h1>

        <p>Last Updated: June 2026</p>

        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By using InterviewAI, you agree to comply with these terms and all
            applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2>Platform Usage</h2>
          <p>
            Users must provide accurate information and use the platform only
            for lawful educational and interview preparation purposes.
          </p>
        </section>

        <section>
          <h2>User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and all activities performed under your account.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All platform content, branding, and technology belong to InterviewAI
            and may not be copied or redistributed without permission.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            InterviewAI provides educational assistance only and does not
            guarantee employment, interview success, or job placement.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions regarding these terms may be sent to
            interviewai.edutech@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
