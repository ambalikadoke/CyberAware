import { useState } from "react";
import "./App.css";
import Learn from "./pages/Learn";
import Verify from "./pages/Verify";

function App() {
  const [showLearn, setShowLearn] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  // VERIFY PAGE
  if (showVerify) {
    return (
      <div>
        <button
          onClick={() => setShowVerify(false)}
          style={{
            position: "fixed",
            top: "25px",
            left: "25px",
            zIndex: 1000,
            padding: "12px 18px",
            border: "1px solid rgba(96, 165, 250, 0.4)",
            borderRadius: "10px",
            background: "rgba(15, 23, 42, 0.9)",
            color: "#60a5fa",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ← Back to Home
        </button>

        <Verify />
      </div>
    );
  }

  // LEARN PAGE
  if (showLearn) {
    return (
      <div>
        <button
          onClick={() => setShowLearn(false)}
          style={{
            position: "fixed",
            top: "25px",
            left: "25px",
            zIndex: 1000,
            padding: "12px 18px",
            border: "1px solid rgba(96, 165, 250, 0.4)",
            borderRadius: "10px",
            background: "rgba(15, 23, 42, 0.9)",
            color: "#60a5fa",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          ← Back to Home
        </button>

        <Learn />
      </div>
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">🛡️</div>

          <div>
            <h2>CyberAware</h2>
            <span>Stay Smart. Stay Safe.</span>
          </div>
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a
            href="#learn"
            onClick={(e) => {
              e.preventDefault();
              setShowLearn(true);
            }}
          >
            Learn
          </a>

          <a
            href="#verify"
            onClick={(e) => {
              e.preventDefault();
              setShowVerify(true);
            }}
          >
            Verify
          </a>

          <a href="#threats">
            Threat Lab
          </a>

          <a href="#assistant">
            Assistant
          </a>

        </div>

        <div className="nav-actions">
          <button className="login-btn">
            Login
          </button>

          <button className="register-btn">
            Get Started
          </button>
        </div>

      </nav>


      {/* HERO SECTION */}
      <main id="home">

        <section className="hero-section">

          <div className="hero-content">

            <div className="status-badge">
              <span className="pulse"></span>
              Your Digital Safety Companion
            </div>

            <h1>
              Think Before You Click.
              <br />
              <span>Stay Safe Online.</span>
            </h1>

            <p className="hero-text">
              Learn about cyber threats, verify suspicious websites and
              messages, get instant guidance, and know what to do when
              something goes wrong.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => setShowVerify(true)}
              >
                🔍 Verify Something
              </button>

              <button className="secondary-btn">
                🚨 I’ve Been Scammed
              </button>

            </div>

            <div className="hero-trust">

              <div>
                <strong>4+</strong>
                <span>Safety Tools</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>Guidance</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Awareness Focus</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="glow"></div>

            <div className="shield-card">

              <div className="shield">🛡️</div>

              <div className="scan-ring ring-one"></div>
              <div className="scan-ring ring-two"></div>

              <div className="floating-card card-one">

                <span>🔍</span>

                <div>
                  <strong>Threat Check</strong>
                  <small>Scan before you trust</small>
                </div>

              </div>

              <div className="floating-card card-two">

                <span>✓</span>

                <div>
                  <strong>Protected</strong>
                  <small>Digital safety active</small>
                </div>

              </div>

              <div className="floating-card card-three">

                <span>⚠️</span>

                <div>
                  <strong>Stay Alert</strong>
                  <small>New threats detected</small>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* QUICK ACTIONS */}
      <section className="quick-section">

        <div className="section-heading">

          <span>WHAT CAN YOU DO?</span>

          <h2>Your Digital Safety Toolkit</h2>

          <p>
            Everything you need to understand, verify and respond to
            online threats.
          </p>

        </div>


        <div className="feature-grid">

          {/* LEARN */}
          <div className="feature-card blue">

            <div className="feature-icon">📚</div>

            <h3>Learn</h3>

            <p>
              Understand phishing, UPI fraud, fake apps, social
              engineering and more.
            </p>

            <button
              className="learn-link-button"
              onClick={() => setShowLearn(true)}
            >
              Explore Learning →
            </button>

          </div>


          {/* VERIFY */}
          <div className="feature-card purple">

            <div className="feature-icon">🔍</div>

            <h3>Verify</h3>

            <p>
              Check suspicious websites, apps and messages before
              trusting them.
            </p>

            <button
              className="learn-link-button"
              onClick={() => setShowVerify(true)}
            >
              Verify Something →
            </button>

          </div>


          {/* ASSISTANT */}
          <div className="feature-card cyan">

            <div className="feature-icon">🤖</div>

            <h3>Ask Assistant</h3>

            <p>
              Get simple guidance when you're confused about a
              suspicious digital situation.
            </p>

            <a href="#assistant">
              Ask CyberAware →
            </a>

          </div>


          {/* REPORT */}
          <div className="feature-card red">

            <div className="feature-icon">🚨</div>

            <h3>Report</h3>

            <p>
              Report an online fraud incident and keep track of your
              case.
            </p>

            <a href="#report">
              Report an Incident →
            </a>

          </div>

        </div>

      </section>


      {/* THREAT SECTION */}
      <section className="threat-section" id="threats">

        <div className="section-heading">

          <span>KNOW THE RISKS</span>

          <h2>Common Digital Threats</h2>

          <p>
            Awareness is your first line of defense.
          </p>

        </div>


        <div className="threat-grid">

          <div className="threat-card">
            <span>🎣</span>

            <h3>Phishing</h3>

            <p>
              Fake messages and links designed to steal your information.
            </p>
          </div>


          <div className="threat-card">
            <span>💳</span>

            <h3>UPI Fraud</h3>

            <p>
              Scams involving QR codes, payment requests and fake calls.
            </p>
          </div>


          <div className="threat-card">
            <span>📱</span>

            <h3>Fake Apps</h3>

            <p>
              Malicious or suspicious applications pretending to be genuine.
            </p>
          </div>


          <div className="threat-card">
            <span>💰</span>

            <h3>Loan Scams</h3>

            <p>
              Fraudulent loan offers designed to steal money or personal data.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div className="cta-content">

          <span>🔐 STAY ONE STEP AHEAD</span>

          <h2>
            Not sure if something is safe?
          </h2>

          <p>
            Don't guess. Check it first.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowVerify(true)}
          >
            Check with CyberAware →
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-brand">

          <div className="brand-icon">🛡️</div>

          <div>
            <h2>CyberAware</h2>

            <span>
              Cybersecurity Awareness & Fraud Prevention
            </span>
          </div>

        </div>

        <p>
          Think Before You Click. Stay Safe Online.
        </p>

        <div className="footer-bottom">
          © 2026 CyberAware. Built for a safer digital world.
        </div>

      </footer>

    </div>
  );
}

export default App;