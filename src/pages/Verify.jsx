import React, { useState } from "react";
import "./Verify.css";

function Verify() {
  const [mode, setMode] = useState("website");

  // Website states
  const [url, setUrl] = useState("");
  const [websiteResult, setWebsiteResult] = useState(null);

  // App states
  const [appName, setAppName] = useState("");
  const [source, setSource] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [appResult, setAppResult] = useState(null);

  // Message states
  const [message, setMessage] = useState("");
  const [messageResult, setMessageResult] = useState(null);

  const [checking, setChecking] = useState(false);

  // =========================
  // TAB SWITCHING
  // =========================

  const switchMode = (newMode) => {
    setMode(newMode);
    setWebsiteResult(null);
    setAppResult(null);
    setMessageResult(null);
    setChecking(false);
  };

  // =========================
  // WEBSITE CHECKER
  // =========================

  const analyzeWebsite = () => {
    if (!url.trim()) {
      setWebsiteResult({
        level: "warning",
        title: "Enter a website or link",
        message: "Please enter a URL before starting the safety check.",
        warnings: [],
      });
      return;
    }

    setChecking(true);
    setWebsiteResult(null);

    setTimeout(() => {
      let value = url.trim().toLowerCase();

      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        value = "https://" + value;
      }

      let score = 0;
      const warnings = [];

      if (value.startsWith("http://")) {
        score += 2;
        warnings.push("The website is not using HTTPS.");
      }

      const suspiciousWords = [
        "free-money",
        "freegift",
        "winner",
        "claim",
        "reward",
        "prize",
        "urgent",
        "verify-account",
        "login-security",
        "bonus",
        "loan",
      ];

      suspiciousWords.forEach((word) => {
        if (value.includes(word)) {
          score += 2;
          warnings.push(`Suspicious keyword detected: "${word}"`);
        }
      });

      const ipPattern =
        /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}/;

      if (ipPattern.test(value)) {
        score += 3;
        warnings.push(
          "The link uses an IP address instead of a normal domain."
        );
      }

      if (value.includes("@")) {
        score += 3;
        warnings.push(
          "The URL contains an @ symbol, which can hide the real destination."
        );
      }

      const domainPart = value
        .replace(/^https?:\/\//, "")
        .split("/")[0];

      const hyphenCount = (domainPart.match(/-/g) || []).length;

      if (hyphenCount >= 3) {
        score += 2;
        warnings.push(
          "The domain contains an unusually high number of hyphens."
        );
      }

      if (value.length > 120) {
        score += 1;
        warnings.push("The URL is unusually long.");
      }

      let level;
      let title;
      let resultMessage;

      if (score >= 5) {
        level = "danger";
        title = "High Risk";
        resultMessage =
          "This link contains multiple suspicious indicators. Avoid entering passwords, OTPs, card details or personal information.";
      } else if (score >= 2) {
        level = "caution";
        title = "Caution";
        resultMessage =
          "Some warning signs were detected. Verify the website carefully before interacting with it.";
      } else {
        level = "safe";
        title = "Low Risk";
        resultMessage =
          "No major warning signs were detected by our basic checks. However, this does not guarantee that the website is completely safe.";
      }

      setWebsiteResult({
        level,
        title,
        message: resultMessage,
        warnings,
        checkedUrl: value,
      });

      setChecking(false);
    }, 1200);
  };

  // =========================
  // APP CHECKER
  // =========================

  const togglePermission = (permission) => {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission]
    );
  };

  const analyzeApp = () => {
    if (!appName.trim()) {
      setAppResult({
        level: "warning",
        title: "Enter an app name",
        message: "Please enter the name of the app you want to check.",
        warnings: [],
      });
      return;
    }

    setChecking(true);
    setAppResult(null);

    setTimeout(() => {
      let score = 0;
      const warnings = [];

      if (!source) {
        score += 1;
        warnings.push(
          "The download source was not provided. Verify where the app came from."
        );
      }

      if (source === "unknown") {
        score += 3;
        warnings.push(
          "The app was downloaded from an unknown or untrusted source."
        );
      }

      if (source === "apk") {
        score += 2;
        warnings.push(
          "APK files from outside official app stores require extra caution."
        );
      }

      if (permissions.includes("Contacts")) {
        score += 2;
        warnings.push(
          "Contacts permission can expose your personal contact list."
        );
      }

      if (permissions.includes("SMS")) {
        score += 3;
        warnings.push(
          "SMS access can expose verification messages and sensitive information."
        );
      }

      if (permissions.includes("Microphone")) {
        score += 2;
        warnings.push(
          "Microphone access should only be required when the app's purpose needs it."
        );
      }

      if (permissions.includes("Location")) {
        score += 1;
        warnings.push(
          "Location access can reveal your physical location."
        );
      }

      if (permissions.includes("Storage")) {
        score += 1;
        warnings.push(
          "Storage access may allow the app to access files on your device."
        );
      }

      if (permissions.includes("Accessibility")) {
        score += 3;
        warnings.push(
          "Accessibility access is powerful and should only be granted to apps you fully trust."
        );
      }

      let level;
      let title;
      let resultMessage;

      if (score >= 6) {
        level = "danger";
        title = "High Risk";
        resultMessage =
          "This app shows several warning signs. Avoid granting sensitive permissions until you verify the app and its developer.";
      } else if (score >= 3) {
        level = "caution";
        title = "Caution";
        resultMessage =
          "Some warning signs were detected. Review the developer, download source and requested permissions carefully.";
      } else {
        level = "safe";
        title = "Low Risk";
        resultMessage =
          "No major warning signs were detected from the information provided. This does not guarantee that the app is completely safe.";
      }

      setAppResult({
        level,
        title,
        message: resultMessage,
        warnings,
      });

      setChecking(false);
    }, 1200);
  };

  // =========================
  // MESSAGE ANALYZER
  // =========================

  const analyzeMessage = () => {
    if (!message.trim()) {
      setMessageResult({
        level: "warning",
        title: "Enter a message",
        message:
          "Paste a suspicious SMS, WhatsApp message or email text first.",
        warnings: [],
      });
      return;
    }

    setChecking(true);
    setMessageResult(null);

    setTimeout(() => {
      const value = message.toLowerCase();

      let score = 0;
      const warnings = [];

      const moneyWords = [
        "won",
        "winner",
        "prize",
        "reward",
        "cashback",
        "lottery",
        "₹",
        "rs.",
        "rupees",
        "money",
      ];

      if (moneyWords.some((word) => value.includes(word))) {
        score += 2;
        warnings.push(
          "The message contains money, prize or reward-related language."
        );
      }

      const urgencyWords = [
        "urgent",
        "immediately",
        "act now",
        "last chance",
        "within 24 hours",
        "account will be blocked",
        "account blocked",
        "verify now",
      ];

      if (urgencyWords.some((word) => value.includes(word))) {
        score += 2;
        warnings.push(
          "The message creates urgency or pressure to act quickly."
        );
      }

      const securityWords = [
        "otp",
        "password",
        "pin",
        "cvv",
        "verification code",
        "login",
      ];

      if (securityWords.some((word) => value.includes(word))) {
        score += 3;
        warnings.push(
          "The message mentions sensitive account or verification information."
        );
      }

      const paymentWords = [
        "upi",
        "payment",
        "pay now",
        "send money",
        "bank account",
        "refund",
        "collect request",
        "qr code",
      ];

      if (paymentWords.some((word) => value.includes(word))) {
        score += 2;
        warnings.push(
          "The message contains payment or banking-related language."
        );
      }

      const linkPattern =
        /(https?:\/\/|www\.|bit\.ly|tinyurl|t\.co)/i;

      if (linkPattern.test(message)) {
        score += 3;
        warnings.push(
          "The message contains a link. Verify the destination before opening it."
        );
      }

      const threatWords = [
        "blocked",
        "suspended",
        "legal action",
        "police",
        "fine",
        "penalty",
        "delete your account",
      ];

      if (threatWords.some((word) => value.includes(word))) {
        score += 2;
        warnings.push(
          "The message uses threats or consequences to pressure you."
        );
      }

      let level;
      let title;
      let resultMessage;

      if (score >= 6) {
        level = "danger";
        title = "High Risk — Possible Scam";
        resultMessage =
          "This message contains several common scam indicators. Do not click suspicious links or share OTPs, passwords, PINs or banking information.";
      } else if (score >= 3) {
        level = "caution";
        title = "Caution";
        resultMessage =
          "Some suspicious patterns were detected. Verify the sender and information independently before taking action.";
      } else {
        level = "safe";
        title = "Low Risk";
        resultMessage =
          "No major scam indicators were detected by our basic checks. This does not guarantee that the message is completely safe.";
      }

      setMessageResult({
        level,
        title,
        message: resultMessage,
        warnings,
      });

      setChecking(false);
    }, 1200);
  };

  // =========================
  // CLEAR
  // =========================

  const clearAll = () => {
    setUrl("");
    setWebsiteResult(null);
    setAppName("");
    setSource("");
    setPermissions([]);
    setAppResult(null);
    setMessage("");
    setMessageResult(null);
    setChecking(false);
  };

  // =========================
  // CURRENT RESULT
  // =========================

  const currentResult =
    mode === "website"
      ? websiteResult
      : mode === "app"
      ? appResult
      : messageResult;

  return (
    <div className="verify-page">

      {/* HERO */}
      <section className="verify-hero">

        <div className="verify-badge">
          🛡️ CYBERAWARE VERIFY
        </div>

        <h1>
          Check Before
          <span> You Trust.</span>
        </h1>

        <p>
          Check suspicious websites, apps and messages for common warning
          signs before sharing information or taking action.
        </p>

      </section>


      <section className="verify-container">

        {/* MODE TABS */}
        <div className="verify-tabs">

          <button
            className={mode === "website" ? "active" : ""}
            onClick={() => switchMode("website")}
          >
            🌐 Website
          </button>

          <button
            className={mode === "app" ? "active" : ""}
            onClick={() => switchMode("app")}
          >
            📱 App
          </button>

          <button
            className={mode === "message" ? "active" : ""}
            onClick={() => switchMode("message")}
          >
            💬 Message
          </button>

        </div>


        {/* ================= WEBSITE ================= */}

        {mode === "website" && (

          <div className="checker-card">

            <div className="checker-header">

              <div className="checker-icon">
                🌐
              </div>

              <div>
                <h2>Website Safety Checker</h2>
                <p>
                  Analyze a suspicious URL for common red flags.
                </p>
              </div>

            </div>


            <div className="input-area">

              <label>Website or URL</label>

              <div className="url-input-wrapper">

                <span>🔗</span>

                <input
                  type="text"
                  placeholder="example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      analyzeWebsite();
                    }
                  }}
                />

              </div>

            </div>


            <div className="checker-actions">

              <button
                className="check-button"
                onClick={analyzeWebsite}
                disabled={checking}
              >
                {checking ? "Checking..." : "🔍 Check Website"}
              </button>

              {url && (
                <button
                  className="clear-button"
                  onClick={clearAll}
                >
                  Clear
                </button>
              )}

            </div>


            <div className="privacy-note">
              🔒
              <span>
                Never enter passwords, OTPs, PINs or card details here.
              </span>
            </div>

          </div>

        )}


        {/* ================= APP ================= */}

        {mode === "app" && (

          <div className="checker-card">

            <div className="checker-header">

              <div className="checker-icon">
                📱
              </div>

              <div>
                <h2>App Safety Checker</h2>
                <p>
                  Check an app for suspicious sources and risky permissions.
                </p>
              </div>

            </div>


            <div className="input-area">

              <label>App Name</label>

              <div className="url-input-wrapper">

                <span>📱</span>

                <input
                  type="text"
                  placeholder="Example: Free Loan Pro"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />

              </div>

            </div>


            <div className="input-area app-source">

              <label>
                Where did you download it from?
              </label>

              <div className="source-grid">

                <button
                  type="button"
                  className={
                    source === "playstore"
                      ? "source-option selected"
                      : "source-option"
                  }
                  onClick={() => setSource("playstore")}
                >
                  <strong>▶</strong>
                  <span>Official Store</span>
                </button>

                <button
                  type="button"
                  className={
                    source === "apk"
                      ? "source-option selected"
                      : "source-option"
                  }
                  onClick={() => setSource("apk")}
                >
                  <strong>📦</strong>
                  <span>APK File</span>
                </button>

                <button
                  type="button"
                  className={
                    source === "unknown"
                      ? "source-option selected"
                      : "source-option"
                  }
                  onClick={() => setSource("unknown")}
                >
                  <strong>❓</strong>
                  <span>Unknown Source</span>
                </button>

              </div>

            </div>


            <div className="input-area">

              <label>
                Permissions requested by the app
              </label>

              <p className="permission-help">
                Select the permissions the app asks for.
              </p>

              <div className="permission-grid">

                {[
                  "Contacts",
                  "SMS",
                  "Microphone",
                  "Location",
                  "Storage",
                  "Accessibility",
                ].map((permission) => (

                  <button
                    type="button"
                    key={permission}
                    className={
                      permissions.includes(permission)
                        ? "permission-option selected"
                        : "permission-option"
                    }
                    onClick={() => togglePermission(permission)}
                  >
                    <span>
                      {permissions.includes(permission) ? "✓" : "+"}
                    </span>
                    {permission}
                  </button>

                ))}

              </div>

            </div>


            <div className="checker-actions">

              <button
                className="check-button"
                onClick={analyzeApp}
                disabled={checking}
              >
                {checking ? "Analyzing..." : "🛡️ Check App Safety"}
              </button>

              {(appName || source || permissions.length > 0) && (
                <button
                  className="clear-button"
                  onClick={clearAll}
                >
                  Clear
                </button>
              )}

            </div>


            <div className="privacy-note">
              🔒
              <span>
                Never enter OTPs, passwords, PINs or banking details.
              </span>
            </div>

          </div>

        )}


        {/* ================= MESSAGE ================= */}

        {mode === "message" && (

          <div className="checker-card">

            <div className="checker-header">

              <div className="checker-icon">
                💬
              </div>

              <div>
                <h2>Message Scam Analyzer</h2>
                <p>
                  Paste a suspicious SMS, WhatsApp message or email
                  to check for common scam patterns.
                </p>
              </div>

            </div>


            <div className="input-area">

              <label>Suspicious Message</label>

              <textarea
                className="message-textarea"
                placeholder="Paste the suspicious SMS, WhatsApp message or email here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

            </div>


            <div className="message-example">
              💡 Example: "Congratulations! You won ₹50,000.
              Click this link immediately to claim your reward."
            </div>


            <div className="checker-actions">

              <button
                className="check-button"
                onClick={analyzeMessage}
                disabled={checking}
              >
                {checking ? "Analyzing..." : "🔍 Analyze Message"}
              </button>

              {message && (
                <button
                  className="clear-button"
                  onClick={clearAll}
                >
                  Clear
                </button>
              )}

            </div>


            <div className="privacy-note">
              🔒
              <span>
                Never paste passwords, OTPs, PINs or banking details.
              </span>
            </div>

          </div>

        )}


        {/* LOADING */}

        {checking && (

          <div className="checking-card">

            <div className="loading-spinner"></div>

            <h3>Analyzing...</h3>

            <p>
              Checking the information for common warning signs.
            </p>

          </div>

        )}


        {/* RESULT */}

        {currentResult && !checking && (

          <div className={`result-card ${currentResult.level}`}>

            <div className="result-top">

              <div className="result-status-icon">

                {currentResult.level === "danger" && "🚨"}
                {currentResult.level === "caution" && "⚠️"}
                {currentResult.level === "safe" && "🟢"}
                {currentResult.level === "warning" && "ℹ️"}

              </div>

              <div>

                <span className="result-label">
                  SCAN RESULT
                </span>

                <h2>
                  {currentResult.title}
                </h2>

              </div>

            </div>


            <p className="result-message">
              {currentResult.message}
            </p>


            {currentResult.checkedUrl && (

              <div className="checked-url">

                <span>Checked URL</span>

                <strong>
                  {currentResult.checkedUrl}
                </strong>

              </div>

            )}


            {currentResult.warnings &&
              currentResult.warnings.length > 0 && (

                <div className="warnings-section">

                  <h3>🚩 Warning Signs Found</h3>

                  <ul>

                    {currentResult.warnings.map(
                      (warning, index) => (
                        <li key={index}>
                          <span>•</span>
                          {warning}
                        </li>
                      )
                    )}

                  </ul>

                </div>

              )}


            {currentResult.level === "safe" && (

              <div className="safe-note">
                ✓ Basic checks passed. Always verify independently
                before sharing sensitive information.
              </div>

            )}

          </div>

        )}


        {/* TIPS */}

        <div className="verify-tips">

          <div className="tips-title">

            <span>💡</span>

            <div>

              <h3>Remember</h3>

              <p>
                CyberAware results are guidance, not a guarantee.
              </p>

            </div>

          </div>


          <div className="tips-grid">

            <div>
              <strong>01</strong>
              <span>Check the developer and source.</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Review permissions and links carefully.</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Never share OTPs or passwords.</span>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Verify;
