import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import Heroillustration from "./Heroillustration";
import { useRef } from "react";
const LandingPage = () => {
  const [typingText, setTypingText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    "Tell me about your experience with React?",
    "I've been working with React for 2 years...",
    "Great! How do you handle state management?",
  ];

  useEffect(() => {
    const cards = document.querySelectorAll(
      ".step-card, .step-card1, .step-card2",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(
      ".feature-card, .feature-card1, .feature-card2",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const currentMessage = messages[currentMessageIndex];
      let i = 0;

      if (isTyping) {
        const typingInterval = setInterval(() => {
          if (i <= currentMessage.length) {
            setTypingText(currentMessage.substring(0, i));
            i++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setTimeout(() => {
              setCurrentMessageIndex((prev) => prev + 1);
              setIsTyping(true);
              setTypingText("");
            }, 1500);
          }
        }, 50);

        return () => clearInterval(typingInterval);
      }
    }
  }, [currentMessageIndex, isTyping, messages]);

  const features = [
    {
      title: "AI-Powered Smart Interview Assistant",
      description: "Get real-time AI assistance during your mock interviews",
      icon: "🤖",
    },
    {
      title: "Track Progress",
      description: "Detailed Analytics & Insights to monitor your improvement",
      icon: "📊",
    },
    {
      title: "Build Confidence",
      description: "Practice & Improve Your Skills with realistic simulations",
      icon: "💪",
    },
  ];
  // Add this state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const containerRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const testimonials = [
    {
      name: "John Doe",
      initials: "JD",
      role: "Frontend Developer at Google",
      text: "InterviewAI helped me prepare for my technical interviews. The AI questions were spot-on! I landed my dream job thanks to this platform.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      initials: "JS",
      role: "Software Engineer at Microsoft",
      text: "The progress tracking feature helped me identify my weak areas and improve dramatically. Highly recommended for anyone preparing for interviews.",
      rating: 5,
    },
    {
      name: "Mike Johnson",
      initials: "MJ",
      role: "Full Stack Developer at Amazon",
      text: "Best interview preparation platform I've ever used. The AI-generated questions are incredibly realistic and challenging.",
      rating: 5,
    },
    {
      name: "Sarah Wilson",
      initials: "SW",
      role: "Data Analyst at Meta",
      text: "The mock interviews helped me build confidence. I felt completely prepared for my real interview and got the job!",
      rating: 5,
    },
    {
      name: "David Chen",
      initials: "DC",
      role: "Backend Developer at Netflix",
      text: "Amazing platform! The personalized roadmaps and progress tracking kept me motivated throughout my preparation.",
      rating: 5,
    },
    {
      name: "Emily Brown",
      initials: "EB",
      role: "UI/UX Designer at Apple",
      text: "The resource recommendations were spot-on. This platform is a game-changer for interview preparation.",
      rating: 5,
    },
  ];

  // Function to scroll testimonials
  const scrollTestimonials = (direction) => {
    const container = containerRef.current;
    const cardWidth = 380; // Width of each card + gap

    if (container) {
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      let newPosition = currentScroll + direction * cardWidth;

      // Loop back to start or end
      if (newPosition < 0) {
        newPosition = maxScroll;
      } else if (newPosition > maxScroll) {
        newPosition = 0;
      }

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Auto-scroll function
  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      if (isAutoScrolling && containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        const cardWidth = 380;

        // If at the end, go back to start
        if (currentScroll >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
          setScrollPosition(0);
        } else {
          // Scroll to next card
          const nextPosition = currentScroll + cardWidth;
          container.scrollTo({ left: nextPosition, behavior: "smooth" });
          setScrollPosition(nextPosition);
        }
      }
    }, 4000); // Scroll every 4 seconds
  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  // Start auto-scroll on component mount
  useEffect(() => {
    startAutoScroll();

    // Cleanup on unmount
    return () => {
      stopAutoScroll();
    };
  }, []);

  // Track scroll position and stop auto-scroll on user interaction
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleScroll = () => {
        setScrollPosition(container.scrollLeft);
      };

      const handleUserInteraction = () => {
        setIsAutoScrolling(false);
        stopAutoScroll();

        // Resume auto-scroll after 10 seconds of inactivity
        setTimeout(() => {
          setIsAutoScrolling(true);
          startAutoScroll();
        }, 10000);
      };

      container.addEventListener("scroll", handleScroll);
      container.addEventListener("wheel", handleUserInteraction);
      container.addEventListener("touchstart", handleUserInteraction);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleUserInteraction);
        container.removeEventListener("touchstart", handleUserInteraction);
      };
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-bg"></div>
        <div className="hero-container">
          <div className="hero-grid">
            {/* Left Side - Content */}
            <div className="hero-content-left">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                AI-Powered Interview Prep
              </div>

              <h1 className="hero-title">
                Master Your Next{" "}
                <span className="hero-title-gradient">Interview</span>
                <br />
                with AI
              </h1>

              <p className="hero-description">
                Practice with personalized questions, track your progress, and
                build confidence before your real interview. Join thousands of
                successful candidates who landed their dream jobs.
              </p>

              <div className="hero-buttons">
                <Link to="/register" className="btn-secondary text-decor">
                  Get Started Free
                  {/* <svg
                    className="btn-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg> */}
                </Link>
                <button className="btn-secondary">
                  {/* <svg
                    className="play-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg> */}
                  Watch Demo
                </button>
              </div>

              {/* <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Questions Asked</div>
                </div>
              </div> */}
            </div>

            {/* Right Side - AI Interview Assistant */}
            <div className="hero-content-right">
              <div className="animated-image-container">
                {/* Main Image */}
                <img
                  src="./interviewai_landing_page_image.jpg"
                  alt="AI Interview"
                />
                {/* <Heroillustration /> */}
                {/* Glow Effect */}
                <div className="image-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            {/* <span className="section-badge">Why Choose Us</span> */}
            <h2 className="section-title">
              AI-Powered Smart Interview Assistant
            </h2>
            {/* <p className="section-subtitle">
              Everything you need to ace your interview in one powerful platform
            </p> */}
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-container">
                <img
                  src="./aiinterview.png"
                  alt="interview"
                  className="icon-image"
                />
              </div>
              <h3 className="feature-title">AI Interview Assistant</h3>
              <p className="feature-description">
                Get real-time AI assistance during your mock interviews
              </p>
            </div>

            <div className="feature-card1">
              <div className="icon-container">
                <img
                  src="./progress.png"
                  alt="progress"
                  className="icon-image"
                />
              </div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">
                Detailed Analytics & Insights to monitor your improvement
              </p>
            </div>

            <div className="feature-card2">
              <div className="icon-container">
                <img
                  src="./confidence.png"
                  alt="confidence"
                  className="icon-image"
                />
              </div>
              <h3 className="feature-title">Build Confidence</h3>
              <p className="feature-description">
                Practice & Improve Your Skills with realistic simulations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="howitworks-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            {/* <span className="section-badge">Getting Started</span> */}
            <h2 className="section-title">Your Path to Interview Success</h2>
            {/* <p className="section-subtitle">
              A proven framework that transforms your interview preparation
              journey
            </p> */}
          </div>

          <div className="timeline-container">
            {/* Step 1 - Left aligned */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-dot">
                  <span>01</span>
                </div>
                <div className="marker-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-icon">
                    <img src="./setupprofile.png" alt="profile" />
                  </div>
                  <div className="card-text">
                    <h3>Define Your Path</h3>
                    <p>
                      Set your target role, experience level, and technology
                      stack preferences to personalize your journey
                    </p>
                    <div className="card-features">
                      <span>🎯 Role Selection</span>
                      <span>📊 Experience Level</span>
                      <span>🛠️ Tech Stack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Right aligned */}
            <div className="timeline-item alternate">
              <div className="timeline-marker">
                <div className="marker-dot">
                  <span>02</span>
                </div>
                <div className="marker-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-icon">
                    <img src="./practice.png" alt="practice" />
                  </div>
                  <div className="card-text">
                    <h3>Practice Intelligently</h3>
                    <p>
                      Engage with AI-generated questions in realistic mock
                      interviews that simulate real-world scenarios
                    </p>
                    <div className="card-features">
                      <span>🤖 AI Questions</span>
                      <span>🎤 Voice/Video</span>
                      <span>⏱️ Timed Sessions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Left aligned */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-dot">
                  <span>03</span>
                </div>
              </div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-icon">
                    <img src="./trackprogress.png" alt="track progress" />
                  </div>
                  <div className="card-text">
                    <h3>Master & Excel</h3>
                    <p>
                      Track your performance, identify improvement areas, and
                      build unshakeable interview confidence
                    </p>
                    <div className="card-features">
                      <span>📈 Analytics</span>
                      <span>💪 Weak Spots</span>
                      <span>🏆 Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="steps-cta">
            <Link to="/register" className="start-journey-btn">
              Begin Your Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section - Horizontal Scrolling */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            {/* <p className="section-subtitle">
              Join thousands of successful candidates who aced their interviews
            </p> */}
          </div>

          {/* Horizontal Scroll Container */}
          <div className="testimonials-scroll-container">
            <div className="testimonials-track" ref={containerRef}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.initials}</div>
                    <div>
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                  {/* Rating Stars */}
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Duplicate first few cards for seamless loop */}
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div key={`clone-${index}`} className="testimonial-card clone">
                  <div className="testimonial-quote">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.initials}</div>
                    <div>
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Buttons */}
            <button
              className="scroll-btn scroll-left"
              onClick={() => scrollTestimonials(-1)}
            >
              ←
            </button>
            <button
              className="scroll-btn scroll-right"
              onClick={() => scrollTestimonials(1)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Pricing</span>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-plan">Free</div>
              <div className="pricing-price">
                $0<span className="price-period">/month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ 5 Mock Interviews/month</li>
                <li>✓ Basic Questions</li>
                <li>✓ Progress Tracking</li>
                <li>✓ Email Support</li>
              </ul>
              <Link to="/register" className="pricing-btn">
                Get Started
              </Link>
            </div>
            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-plan">Pro</div>
              <div className="pricing-price">
                $19<span className="price-period">/month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Unlimited Mock Interviews</li>
                <li>✓ AI-Powered Questions</li>
                <li>✓ Detailed Analytics</li>
                <li>✓ Priority Support</li>
                <li>✓ Resume Review</li>
              </ul>
              <Link to="/register" className="pricing-btn primary">
                Get Started
              </Link>
            </div>
            <div className="pricing-card">
              <div className="pricing-plan">Enterprise</div>
              <div className="pricing-price">
                Custom<span className="price-period"></span>
              </div>
              <ul className="pricing-features">
                <li>✓ Everything in Pro</li>
                <li>✓ Team Collaboration</li>
                <li>✓ Custom Questions</li>
                <li>✓ 24/7 Phone Support</li>
                <li>✓ Dedicated Account Manager</li>
              </ul>
              <button className="pricing-btn">Contact Sales</button>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Ace Your Interview?</h2>
            <p className="cta-description">
              Join thousands of job seekers who improved their interview skills
              with InterviewAI
            </p>
            <Link to="/register" className="cta-button">
              Start Your Journey Now
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                {/* <span className="logo-icon">🎯</span> */}
                <span>InterviewAI</span>
              </div>
              <p className="footer-description">
                AI-powered interview preparation platform to help you land your
                dream job.
              </p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li>
                  <a href="#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact Us</Link>
                </li>
                {/* <li>
                  <a href="#">Careers</a>
                </li> */}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
