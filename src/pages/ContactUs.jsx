import React, { useState } from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting us. We will get back to you soon.");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from
            you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>

            <div className="info-card">
              <h3>Email</h3>
              <p>interviewai.edutech@gmail.com</p>
            </div>

            <div className="info-card">
              <h3>Response Time</h3>
              <p>Within 24 Hours</p>
            </div>

            <div className="info-card">
              <h3>Business Hours</h3>
              <p>Monday to Friday</p>
              <p>10:00 AM to 6:00 PM</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Message</h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
