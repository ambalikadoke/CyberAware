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

  const [checking, setChecking] = useState(false);

  // =========================
  // WEBSITE CHECKER
  // =========================

  const analyzeWebsite = () => {
    if (!url.trim()) {
      setWebsiteResult({
        level: "warning",
        title: "Enter a website or link",
        message: "Please enter a URL before starting the safety check.",
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
      let message;

      if (score >= 5) {
        level = "danger";
        title = "High Risk";
        message =
          "This link contains multiple suspicious indicators. Avoid entering passwords, OTPs, card details or personal information.";
      } else if (score >= 2) {
        level = "caution";
        title = "Caution";
        message =
          "Some warning signs were detected. Verify the website carefully before interacting with it.";
      } else {
        level = "safe";
        title = "Low Risk";
        message =
          "No major warning signs were detected by our basic checks. However, this does not guarantee that the website is completely safe.";
      }

      setWebsiteResult({
        level,
        title,
        message,
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

      // Download source
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

      // Sensitive permissions
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
      let message;

      if (score >= 6) {
        level = "danger";
        title = "High Risk";
        message =
          "This app shows several warning signs. Avoid granting sensitive permissions until you verify the app and its developer.";
      } else if (score >= 3) {
        level = "caution";
        title = "Caution";
        message =
          "Some warning signs were detected. Review the developer, download source and requested permissions carefully.";
      } else {
        level = "safe";
        title = "Low Risk";
        message =
          "No major warning signs were detected from the information provided. This does not guarantee that the app is completely safe.";
      }

      setAppResult({
        level,
        title,
        message,
        warnings,
      });

      setChecking(false);
    }, 1200);
  };

  const clearAll = () => {
    setUrl("");
    setWebsiteResult(null);
    setAppName("");
    setSource("");
    setPermissions([]);
    setAppResult(null);
  };

  const currentResult =
    mode === "website" ? websiteResult : appResult;

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
          Check suspicious websites and apps for common warning signs
          before sharing information or granting access.
        </p>

      </section>


      <section className="verify-container">

        {/* MODE TABS */}
        <div className="verify-tabs">

          <button
            className={mode === "website" ? "active" : ""}
            onClick={() => {
              setMode("website");
              setWebsiteResult(null);
              setAppResult(null);
            }}
          >
            🌐 Website
          </button>

          <button
            className={mode === "app" ? "active" : ""}
            onClick={() => {
              setMode("app");
              setWebsiteResult(null);
              setAppResult(null);
            }}
          >
            📱 App
          </button>

          <button
            className="disabled-tab"
            title="Coming soon"
          >
            💬 Message
            <small>Coming Soon</small>
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

              <label>
                Website or URL
              </label>

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
                {checking
                  ? "Checking..."
                  : "🔍 Check Website"}
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


            {/* APP NAME */}

            <div className="input-area">

              <label>
                App Name
              </label>

              <div className="url-input-wrapper">

                <span>📱</span>

                <input
                  type="text"
                  placeholder="Example: Free Loan Pro"
                  value={appName}
                  onChange={(e) =>
                    setAppName(e.target.value)
                  }
                />

              </div>

            </div>


            {/* SOURCE */}

            <div className="input-area app-source">

              <label>
                Where did you download it from?
              </label>

              <div className="source-grid">

                <button
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


            {/* PERMISSIONS */}

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
                    key={permission}
                    className={
                      permissions.includes(permission)
                        ? "permission-option selected"
                        : "permission-option"
                    }
                    onClick={() =>
                      togglePermission(permission)
                    }
                  >
                    <span>
                      {permissions.includes(permission)
                        ? "✓"
                        : "+"}
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
                {checking
                  ? "Analyzing..."
                  : "🛡️ Check App Safety"}
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


        {/* LOADING */}

        {checking && (

          <div className="checking-card">

            <div className="loading-spinner"></div>

            <h3>
              Analyzing...
            </h3>

            <p>
              Checking the information for common warning signs.
            </p>

          </div>

        )}


        {/* RESULT */}

        {currentResult && !checking && (

          <div
            className={`result-card ${currentResult.level}`}
          >

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


            {currentResult.warnings &&
              currentResult.warnings.length > 0 && (

                <div className="warnings-section">

                  <h3>
                    🚩 Warning Signs Found
                  </h3>

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

                ✓ Basic checks passed. Always verify
                independently before sharing sensitive information.

              </div>

            )}

          </div>

        )}


        {/* TIPS */}

        <div className="verify-tips">

          <div className="tips-title">

            <span>💡</span>

            <div>

              <h3>
                Remember
              </h3>

              <p>
                CyberAware results are guidance, not a guarantee.
              </p>

            </div>

          </div>


          <div className="tips-grid">

            <div>

              <strong>01</strong>

              <span>
                Check the developer and source.
              </span>

            </div>

            <div>

              <strong>02</strong>

              <span>
                Review permissions carefully.
              </span>

            </div>

            <div>

              <strong>03</strong>

              <span>
                Never share OTPs or passwords.
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Verify;