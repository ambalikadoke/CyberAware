import { useState } from "react";
import "./App.css";

import Learn from "./pages/Learn";
import Verify from "./pages/Verify";
import CyraX from "./pages/CyraX";

const tools = [
  {
    title: "Website Checker",
    description: "Check if a website is safe or suspicious.",
    icon: "◎",
    color: "orange",
    page: "verify",
    mode: "website",
  },
  {
    title: "App Safety Checker",
    description: "Analyse Android apps for potential risks.",
    icon: "▣",
    color: "green",
    page: "verify",
    mode: "app",
  },
  {
    title: "Message Analyzer",
    description: "Detect scam patterns in messages.",
    icon: "▤",
    color: "pink",
    page: "verify",
    mode: "message",
  },
  {
    title: "CYRA X",
    description: "Your personal cyber safety assistant.",
    icon: "✳",
    color: "purple",
    page: "cyrax",
  },
];

const scams = [
  {
    title: "Phishing",
    icon: "✉",
    description:
      "Fake emails and links designed to steal your personal data.",
  },
  {
    title: "UPI Scams",
    icon: "₹",
    description: "Fake collect requests and payment frauds.",
  },
  {
    title: "Fake Job Offers",
    icon: "▣",
    description: "High-salary traps and work-from-home scams.",
  },
  {
    title: "Social Media Scams",
    icon: "▤",
    description: "Impersonation and fake profiles.",
  },
  {
    title: "Shopping Frauds",
    icon: "🛒",
    description: "Fake websites and discount traps.",
  },
  {
    title: "Loan App Frauds",
    icon: "₹",
    description: "Loan apps with hidden risks.",
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
  const [scamIndex, setScamIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);

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
        // The top Verify button opens the default Website checker.
        sessionStorage.removeItem("cyberaware-verify-mode");
      }
    } else {
      sessionStorage.removeItem("cyberaware-verify-mode");
    }

    if (nextPage === "learn" && topic) {
      sessionStorage.setItem("cyberaware-selected-topic", topic);
      // Homepage topic cards should return directly to the same homepage position.
      sessionStorage.setItem(
        "cyberaware-topic-origin",
        page === "home" ? "home" : "overview"
      );
    } else if (nextPage === "learn") {
      // Explore All opens the normal Learn overview, not a specific topic.
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

    // Wait for the previous page to render before restoring its scroll position.
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
      // First return from a topic opened inside Learn to the 8-topic overview.
      window.dispatchEvent(
        new Event("cyberaware-back-to-learn-overview")
      );
      return;
    }

    goBack();
  };

  const clues = [
    {
      title: "Urgency Tactic",
      description:
        "Scammers use words like today or immediately to make you act without thinking.",
    },
    {
      title: "Suspicious Link",
      description:
        "Unexpected or misspelled domains may lead to fake websites.",
    },
    {
      title: "Fake Sender",
      description:
        "Scammers may impersonate banks, employers, or government officials.",
    },
    {
      title: "Data Theft",
      description:
        "Never share OTPs, passwords, UPI PINs, or sensitive personal information.",
    },
  ];

  const visibleScams = scams.filter((scam) =>
    `${scam.title} ${scam.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
              placeholder="Search threats, scams, tools..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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
                    .getElementById("threat-radar")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                type="button"
              >
                Explore Threats <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("cyrax")}
                type="button"
              >
                ▣ &nbsp; Talk to CYRA X
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

          {/* SAFETY CHECK PREVIEW */}
          <aside className="live-dashboard">
            <div className="dashboard-heading">
              <strong>🛡️ SAFETY CHECK PREVIEW</strong>
              <a href="#tools">Explore tools →</a>
            </div>

            <div className="dashboard-content">
              <div className="world-radar">
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
                <span>✧</span>
                <span>✦</span>
              </div>

              <div className="activity-list">
                {[
                  [
                    "🔴",
                    "Urgent account warning",
                    "Red flag",
                  ],
                  [
                    "🟠",
                    "Unknown APK source",
                    "Check source",
                  ],
                  [
                    "🟢",
                    "Unexpected OTP request",
                    "Red flag",
                  ],
                  [
                    "🔵",
                    "Look-alike domain",
                    "Check URL",
                  ],
                  [
                    "🟡",
                    "Prize or refund claim",
                    "Be cautious",
                  ],
                ].map((item) => (
                  <div
                    className="activity-item"
                    key={item[1]}
                  >
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                    <small>{item[2]}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-metrics">
              <div>
                <strong>Local</strong>
                <small>Pattern checks</small>
              </div>

              <div>
                <strong>3 tools</strong>
                <small>Website · App · Message</small>
              </div>

              <div>
                <strong>No guarantee</strong>
                <small>Use caution</small>
              </div>
            </div>

            <div className="dashboard-note">
              <strong>
                ⚙ Learn to spot common warning signs.
              </strong>

              <small>
                Examples only. This is not a live threat feed or
                malware scan.
              </small>
            </div>
          </aside>
        </section>

        {/* TOOLS + DASHBOARD */}
        <section className="workspace" id="tools">
          <div className="workspace-main">
            <div className="section-heading">
              <span>— &nbsp; OUR TOOLS</span>

              <h2>Stay Aware. Stay One Step Ahead.</h2>

              <p>
                Powerful tools to help you identify, analyse and
                learn about online threats.
              </p>
            </div>

            <div className="tools-grid">
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

            <div className="lower-panels">
              {/* THREAT RADAR */}
              <section
                className="radar-panel"
                id="threat-radar"
              >
                <div className="panel-heading">
                  <strong>◉ &nbsp; THREAT RADAR</strong>
                  <span>● DEMO</span>
                </div>

                <h3>Common Scam Warning Signs</h3>

                <p>
                  Educational categories only; not measured
                  statistics.
                </p>

                <div className="radar-content">
                  <div className="threat-list">
                    {[
                      ["Phishing", "Common"],
                      ["UPI Scams", "Watch"],
                      ["Fake Job Offers", "Check"],
                      ["Loan App Frauds", "Check"],
                    ].map((item, index) => (
                      <div
                        className="threat-row"
                        key={item[0]}
                      >
                        <span
                          className={`threat-dot dot-${index}`}
                        />

                        <span>{item[0]}</span>
                        <strong>{item[1]}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="globe-visual">
                    <span>✦</span>
                    <span>✧</span>
                    <span>✦</span>
                  </div>
                </div>
              </section>

              {/* SCAM IN FOCUS */}
              <section className="scam-panel">
                <div className="panel-heading">
                  <strong>▣ &nbsp; SCAM IN FOCUS</strong>

                  <span>
                    {scamIndex + 1} / {scams.length}{" "}

                    <button
                      onClick={() =>
                        setScamIndex(
                          (scamIndex + scams.length - 1) %
                            scams.length
                        )
                      }
                      type="button"
                      aria-label="Previous scam"
                    >
                      ←
                    </button>

                    <button
                      onClick={() =>
                        setScamIndex(
                          (scamIndex + 1) % scams.length
                        )
                      }
                      type="button"
                      aria-label="Next scam"
                    >
                      →
                    </button>
                  </span>
                </div>

                <div className="scam-content">
                  <div className="fake-message">
                    <small>● ● ●</small>

                    <p>
                      Your bank account will be blocked today!
                    </p>

                    <mark>Verify immediately</mark>

                    <p>using this link:</p>

                    <mark>example.invalid</mark>

                    <small>DEMO MESSAGE</small>
                  </div>

                  <div className="scam-description">
                    <h3>{scams[scamIndex].title}</h3>

                    <p>{scams[scamIndex].description}</p>

                    <ul>
                      <li>⚠ Creates panic</li>
                      <li>↗ May contain fake links</li>
                      <li>✕ May steal your data</li>
                    </ul>

                    <button
                      className="primary-button compact"
                      onClick={() => navigate("learn")}
                      type="button"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </section>
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

            {/* SUSPICIOUS MESSAGE EXPLAINER */}
            <section className="suspicious-panel">
              <div className="suspicious-heading">
                <h3>Why is this suspicious?</h3>

                <span>{clueIndex + 1} / 4</span>

                <button
                  onClick={() =>
                    setClueIndex(
                      (clueIndex + 1) % clues.length
                    )
                  }
                  type="button"
                  aria-label="Next warning sign"
                >
                  →
                </button>
              </div>

              <div className="clue-content">
                <span className="warning-icon">!</span>

                <div>
                  <strong>{clues[clueIndex].title}</strong>
                  <p>{clues[clueIndex].description}</p>
                </div>
              </div>

              <div className="safe-message">
                <strong>✓</strong>

                <p>
                  Verify through the official website or app.
                  Do not trust unexpected message links.
                </p>
              </div>

              <div className="clue-tabs">
                {clues.map((clue, index) => (
                  <button
                    className={
                      clueIndex === index ? "selected" : ""
                    }
                    key={clue.title}
                    onClick={() => setClueIndex(index)}
                    type="button"
                  >
                    {clue.title}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>

        {/* LEARN SECTION */}
        <section className="learn-section" id="learn">
          <div className="learn-heading">
            <div>
              <span>— &nbsp; LEARN BY EXPLORING</span>

              <h2>Common Scams You Should Know</h2>

              <p>
                Explore examples, understand the red flags and
                learn how to stay safe.
              </p>
            </div>

            <button
              onClick={() => navigate("learn")}
              type="button"
            >
              Explore All →
            </button>
          </div>

          <div className="learn-grid">
            {visibleScams.map((scam, index) => (
              <button
                className="learn-card"
                key={scam.title}
                onClick={() => navigate("learn", null, scam.title)}
                type="button"
              >
                <span
                  className={`learn-icon ${
                    tools[index % tools.length].color
                  }`}
                >
                  {scam.icon}
                </span>

                <span>
                  <strong>{scam.title}</strong>
                  <small>{scam.description}</small>
                </span>
              </button>
            ))}
          </div>

          {visibleScams.length === 0 && (
            <p className="no-results">
              No matching topics. Try searching for Phishing or
              UPI.
            </p>
          )}
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