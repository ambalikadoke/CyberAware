import { useState } from "react";
import "./App.css";

import Learn from "./pages/Learn";
import Verify from "./pages/Verify";
import CyraX from "./pages/CyraX";
import CyberArena from "./pages/CyberArena";
import CyberDetective from "./pages/CyberDetective";
import ScamSimulator from "./pages/ScamSimulator";
import SafetyScore from "./pages/SafetyScore";

const tools = [
  {
    title: "Cyber Safety Check Hub",
    description: "Check websites, apps and suspicious messages in one place.",
    icon: "⌕",
    color: "orange",
    page: "verify",
  },
  {
    title: "Cyber Detective",
    description: "Investigate suspicious digital clues and solve cybercrime cases.",
    icon: "🔎",
    color: "purple",
    page: "detective",
  },
  {
    title: "Scam Simulator",
    description: "Practice identifying scam situations before they happen.",
    icon: "🎯",
    color: "pink",
    page: "simulator",
  },
  {
    title: "My Safety Score",
    description: "Evaluate your cyber safety habits and improve your digital security.",
    icon: "🛡️",
    color: "green",
    page: "safety",
  },
];

function Logo({ darkMode = false }) {
  return (
    <button
      className="brand"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      type="button"
      aria-label="CyberAware home"
    >
      <img
        className="brand-logo"
        src={
          darkMode
            ? "/cyberaware-logo.png"
            : "/cyberaware-logo-light.png"
        }
        alt="CyberAware — Be Alert. Be Aware. Stay Safe."
      />
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [previousPages, setPreviousPages] = useState([]);
  const [learnDetailOrigin, setLearnDetailOrigin] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dailyAnswer, setDailyAnswer] = useState(null);
  const [dailySubmitted, setDailySubmitted] = useState(false);
  const [activeRedFlag, setActiveRedFlag] = useState(0);
  const [mythAnswer, setMythAnswer] = useState(null);

  // Navigate between pages and remember the previous page's scroll position.
  const navigate = (nextPage, mode = null, topic = null) => {
    if (nextPage !== page) {
      setPreviousPages((previous) => [
        ...previous,
        { page, scrollY: window.scrollY },
      ]);
    }

    if (nextPage === "verify") {
      if (["website", "app", "message"].includes(mode)) {
        sessionStorage.setItem("cyberaware-verify-mode", mode);
      } else {
        sessionStorage.removeItem("cyberaware-verify-mode");
      }
    } else {
      sessionStorage.removeItem("cyberaware-verify-mode");
    }

    if (nextPage === "learn" && topic) {
      sessionStorage.setItem("cyberaware-selected-topic", topic);

      sessionStorage.setItem(
        "cyberaware-topic-origin",
        page === "home" ? "home" : "overview"
      );
    } else if (nextPage === "learn") {
      sessionStorage.removeItem("cyberaware-selected-topic");
      sessionStorage.removeItem("cyberaware-topic-origin");
      setLearnDetailOrigin(null);
    } else {
      sessionStorage.removeItem("cyberaware-selected-topic");
      sessionStorage.removeItem("cyberaware-topic-origin");
      setLearnDetailOrigin(null);
    }

    setPage(nextPage);
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Return to the previous page and restore its saved scroll position.
  const goBack = () => {
    const previousEntry =
      previousPages.length > 0
        ? previousPages[previousPages.length - 1]
        : { page: "home", scrollY: 0 };

    const previousPage =
      typeof previousEntry === "string"
        ? previousEntry
        : previousEntry.page;

    const previousScrollY =
      typeof previousEntry === "string"
        ? 0
        : previousEntry.scrollY || 0;

    setPage(previousPage);
    setPreviousPages((previous) => previous.slice(0, -1));
    setLearnDetailOrigin(null);
    setMenuOpen(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: previousScrollY,
          behavior: "auto",
        });
      });
    });
  };

  // One toolbar arrow handles both topic-detail navigation paths.
  const handleBackArrow = () => {
    if (page === "learn" && learnDetailOrigin === "overview") {
      window.dispatchEvent(
        new Event("cyberaware-back-to-learn-overview")
      );
      return;
    }

    goBack();
  };

  // Inner pages: minimal back arrow, no Dashboard or theme toolbar.
  if (page !== "home") {
    return (
      <div className={`site ${darkMode ? "dark" : ""}`}>
        <div className="page-toolbar minimal-toolbar">
          <button
            className="minimal-back-button"
            onClick={handleBackArrow}
          >
            ←
          </button>
        </div>

        {page === "learn" && (
          <Learn onDetailChange={setLearnDetailOrigin} />
        )}

        {page === "verify" && <Verify />}
        {page === "cyrax" && <CyraX />}
        {page === "arena" && <CyberArena />}

        {page === "detective" && <CyberDetective />}
        {page === "simulator" && <ScamSimulator />}
        {page === "safety" && <SafetyScore />}
      </div>
    );
  }

  return (
    <div className={`site ${darkMode ? "dark" : ""}`}>

      {/* NAVBAR */}
      <header className="navbar">
        <Logo darkMode={darkMode} />

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a
            className="active"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <button onClick={() => navigate("learn")}>
            Learn
          </button>

          <button onClick={() => navigate("verify")}>
            Verify
          </button>

          <button onClick={() => navigate("cyrax")}>
            CYRA X
          </button>

          <button onClick={() => navigate("arena")}>
            Cyber Arena
          </button>

          <a
            href="#community"
            onClick={() => setMenuOpen(false)}
          >
            Community
          </a>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <span>⌕</span>

            <input
              type="search"
              placeholder="Search features..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const term = search.trim().toLowerCase();

                  if (/verify|website|app|message|check/.test(term))
                    navigate("verify");
                  else if (/cyra|chat|assistant/.test(term))
                    navigate("cyrax");
                  else if (/detective|investigation|case/.test(term))
                    navigate("detective");
                  else if (/simulator|practice/.test(term))
                    navigate("simulator");
                  else if (/safety score|scorecard|safety habits/.test(term))
                    navigate("safety");
                  else if (/arena|game|mission/.test(term))
                    navigate("arena");
                  else if (/learn|topic|scam|fraud/.test(term))
                    navigate("learn");
                }
              }}
            />
          </label>

          <button
            className="theme-button"
            onClick={() =>
              setDarkMode((current) => !current)
            }
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            type="button"
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <button
            className="get-started"
            onClick={() => navigate("learn")}
            type="button"
          >
            Get Started <span>→</span>
          </button>
        </div>
      </header>

      <main id="home">

        {/* HERO SECTION */}
        <section className="hero">
          <div
            className="hero-art"
            aria-label="Cybersecurity illustration"
          />

          <div className="hero-content">
            <div className="eyebrow">
              <span />
              WELCOME TO CYBERAWARE
            </div>

            <h1>
              A SAFER
              <br />
              INTERNET
              <br />
              STARTS WITH
              <br />
              <em>YOU.</em>
            </h1>

            <p>
              Learn. Verify. Stay ahead of online threats.
              <br />
              Your smarter way to a safer digital life.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() =>
                  document
                    .getElementById("interactive-zone")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                type="button"
              >
                Explore Cyber World <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("simulator")}
                type="button"
              >
                Play Scam Simulator
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>01 &nbsp; URL</strong>
                <small>Website red flags</small>
              </div>

              <div>
                <strong>02 &nbsp; APP</strong>
                <small>Permission awareness</small>
              </div>

              <div>
                <strong>03 &nbsp; SMS</strong>
                <small>Scam pattern checks</small>
              </div>
            </div>
          </div>

          {/* DAILY CYBER MISSION */}
          <aside className="live-dashboard daily-mission-card">
            <div className="dashboard-heading">
              <strong>✦ DAILY CYBER MISSION</strong>
              <span className="mission-pill">1 MIN</span>
            </div>

            <div className="daily-mission-body">
              <span className="daily-mission-label">
                TODAY'S SITUATION
              </span>

              <h3>
                A caller claims to be from your bank and asks for your OTP
                to stop a transaction.
              </h3>

              <p>What is the safest next step?</p>

              <div className="daily-options">
                {[
                  "Share the OTP to block the transaction",
                  "End the call and contact the bank using its official number",
                  "Ask the caller to send an identity card",
                ].map((option, index) => (
                  <button
                    className={`${
                      dailyAnswer === index ? "selected" : ""
                    } ${
                      dailySubmitted && index === 1 ? "correct" : ""
                    }`}
                    key={option}
                    type="button"
                    disabled={dailySubmitted}
                    onClick={() => setDailyAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                ))}
              </div>

              {!dailySubmitted ? (
                <button
                  className="daily-submit"
                  type="button"
                  disabled={dailyAnswer === null}
                  onClick={() => setDailySubmitted(true)}
                >
                  CHECK MY DECISION →
                </button>
              ) : (
                <div
                  className={`daily-feedback ${
                    dailyAnswer === 1 ? "good" : "bad"
                  }`}
                >
                  <strong>
                    {dailyAnswer === 1
                      ? "Correct decision!"
                      : "Not the safest choice."}
                  </strong>

                  <span>
                    Never share an OTP. Disconnect and contact your bank
                    through its official channel.
                  </span>
                </div>
              )}
            </div>

            <small className="daily-demo-note">
              Educational scenario · Not a live alert
            </small>
          </aside>
        </section>        {/* TOOLS + DASHBOARD */}
        <section className="workspace" id="tools">
          <div className="workspace-main">
            <div className="section-heading">
              <span>— &nbsp; OUR TOOLS</span>

              <h2>Your Cyber Safety Toolkit</h2>

              <p>
                Practical tools and guidance to help you make safer decisions online.
              </p>
            </div>

            {/* INTERACTIVE TOOLS */}
            <div className="tools-grid" id="interactive-zone">
              {tools.map((tool) => (
                <button
                  className="tool-card"
                  key={tool.title}
                  onClick={() => navigate(tool.page, tool.mode)}
                  type="button"
                >
                  <span className={`tool-icon ${tool.color}`}>
                    {tool.icon}
                  </span>

                  <span className="tool-description">
                    <strong>{tool.title}</strong>
                    <small>{tool.description}</small>
                  </span>

                  <span className="tool-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="workspace-side">
            <section className="cyrax-banner">
              <div className="cyrax-text">
                <h2>Meet CYRA X</h2>

                <strong>
                  Your Cyber Safety Assistant
                </strong>

                <p>
                  Have a question? Need help identifying a scam?
                  CYRA X is here to guide you.
                </p>

                <button
                  className="primary-button compact"
                  onClick={() => navigate("cyrax")}
                  type="button"
                >
                  Start Chatting →
                </button>
              </div>

              <div
                className="cyrax-robot"
                aria-label="Cyber safety robot"
              >
                <div className="robot-head">
                  <span />
                  <span />
                </div>

                <div className="robot-body" />
                <div className="robot-label">CYRA X</div>
              </div>
            </section>

            {/* RED FLAG EXPLORER */}
            <section className="suspicious-panel red-flag-panel">
              <div className="suspicious-heading">
                <div>
                  <span className="red-flag-kicker">
                    INTERACTIVE GUIDE
                  </span>
                  <h3>Red Flag Explorer</h3>
                </div>

                <span>{activeRedFlag + 1} / 5</span>
              </div>

              <div className="red-flag-tabs">
                {[
                  ["Urgency", "⏱"],
                  ["Fake Identity", "♙"],
                  ["Payment Trap", "₹"],
                  ["Data Theft", "⌑"],
                  ["Suspicious Link", "↗"],
                ].map((item, index) => (
                  <button
                    className={
                      activeRedFlag === index ? "selected" : ""
                    }
                    key={item[0]}
                    type="button"
                    onClick={() => setActiveRedFlag(index)}
                  >
                    <span>{item[1]}</span>
                    {item[0]}
                  </button>
                ))}
              </div>

              <div className="red-flag-detail">
                <span className="red-flag-number">
                  0{activeRedFlag + 1}
                </span>

                <div>
                  <strong>
                    {[
                      "Pressure to act immediately",
                      "Someone pretending to be trusted",
                      "A request to pay or scan unexpectedly",
                      "A demand for private information",
                      "A link you were not expecting",
                    ][activeRedFlag]}
                  </strong>

                  <p>
                    {[
                      "Scammers create panic or set short deadlines so you do not stop to verify the claim.",
                      "Check unusual requests directly with the person or organisation using a known contact method.",
                      "Never enter a UPI PIN to receive money or pay an unexplained fee to unlock a reward.",
                      "Never share OTPs, passwords, PINs or full banking details in response to an unsolicited request.",
                      "Check the complete domain and avoid opening unexpected links or attachments.",
                    ][activeRedFlag]}
                  </p>
                </div>
              </div>

              <div className="red-flag-footer">
                PAUSE · VERIFY · THEN ACT
              </div>
            </section>
          </aside>
        </section>

        {/* CYBER MYTH BUSTER */}
        <section className="awareness-lab" id="awareness-lab">
          <div className="awareness-heading">
            <span>— &nbsp; BUILD BETTER DIGITAL HABITS</span>

            <h2>Small Checks. Stronger Safety.</h2>

            <p>
              Test a common cyber safety belief and learn the fact behind it.
            </p>
          </div>

          <div className="awareness-grid">
            <article className="myth-card">
              <div className="lab-card-heading">
                <span className="lab-icon myth-icon">✳</span>

                <span>
                  <small>QUICK KNOWLEDGE TEST</small>
                  <strong>Cyber Myth Buster</strong>
                </span>
              </div>

              <span className="myth-label">TRUE OR FALSE?</span>

              <h3>
                “You need to enter your UPI PIN to receive money.”
              </h3>

              <div className="myth-options">
                {["True", "False"].map((item) => (
                  <button
                    className={
                      mythAnswer === item ? "selected" : ""
                    }
                    type="button"
                    key={item}
                    onClick={() => setMythAnswer(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {mythAnswer && (
                <div
                  className={`myth-feedback ${
                    mythAnswer === "False" ? "good" : "bad"
                  }`}
                >
                  <strong>
                    {mythAnswer === "False"
                      ? "Correct — that's a myth."
                      : "Not quite — this is a myth."}
                  </strong>

                  <p>
                    A UPI PIN authorises a payment. You do not need it
                    to receive money.
                  </p>
                </div>
              )}

              <small className="myth-footnote">
                One quick fact to remember when using digital payments.
              </small>
            </article>
          </div>
        </section>

        {/* LEARN SECTION */}
        <section
          className="learn-section learn-cta-section"
          id="learn"
        >
          <div className="learn-heading">
            <div>
              <span>— &nbsp; WANT TO LEARN MORE?</span>

              <h2>Explore the Cyber Safety Library</h2>

              <p>
                Go deeper with eight learning guides covering phishing,
                UPI fraud, malicious apps, online shopping and more.
              </p>
            </div>

            <button
              onClick={() => navigate("learn")}
              type="button"
            >
              Explore All Topics →
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="community">
        <Logo darkMode={darkMode} />

        <div className="footer-links">
          <strong>Quick Links</strong>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            type="button"
          >
            Home
          </button>

          <button
            onClick={() => navigate("learn")}
            type="button"
          >
            Learn
          </button>

          <button
            onClick={() => navigate("verify")}
            type="button"
          >
            Verify
          </button>

          <button
            onClick={() => navigate("cyrax")}
            type="button"
          >
            CYRA X
          </button>

          <button
            onClick={() => navigate("arena")}
            type="button"
          >
            Cyber Arena
          </button>
        </div>

        <div className="footer-links">
          <strong>Support</strong>

          <button
            onClick={() => navigate("verify")}
            type="button"
          >
            Report a Scam
          </button>

          <a href="#learn">Guidelines</a>

          <button
            onClick={() => navigate("cyrax")}
            type="button"
          >
            Contact
          </button>
        </div>

        <div className="footer-bottom">
          <p>▶ &nbsp; ◎ &nbsp; 𝕏 &nbsp; in</p>

          <small>
            © {new Date().getFullYear()} CyberAware. All rights
            reserved.
            <br />
            A safer internet starts with an aware you.
          </small>
        </div>
      </footer>
    </div>
  );
}