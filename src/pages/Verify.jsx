import React, { useState } from "react";
import "./Verify.css";

function Verify() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const analyzeWebsite = () => {
    if (!url.trim()) {
      setResult({
        level: "warning",
        title: "Enter a website or link",
        message: "Please enter a URL before starting the safety check.",
      });
      return;
    }

    setChecking(true);
    setResult(null);

    setTimeout(() => {
      let value = url.trim().toLowerCase();

      if (!value.startsWith("http://") && !value.startsWith("https://")) {
        value = "https://" + value;
      }

      let score = 0;
      const warnings = [];

      // 1. HTTP check
      if (value.startsWith("http://")) {
        score += 2;
        warnings.push("The website is not using HTTPS.");
      }

      // 2. Suspicious keywords
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

      // 3. IP address based URL
      const ipPattern =
        /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}/;

      if (ipPattern.test(value)) {
        score += 3;
        warnings.push("The link uses an IP address instead of a normal domain.");
      }

      // 4. @ symbol
      if (value.includes("@")) {
        score += 3;
        warnings.push("The URL contains an @ symbol, which can hide the real destination.");
      }

      // 5. Too many hyphens
      const domainPart = value
        .replace(/^https?:\/\//, "")
        .split("/")[0];

      const hyphenCount = (domainPart.match(/-/g) || []).length;

      if (hyphenCount >= 3) {
        score += 2;
        warnings.push("The domain contains an unusually high number of hyphens.");
      }

      // 6. Very long URL
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

      setResult({
        level,
        title,
        message,
        warnings,
        checkedUrl: value,
      });

      setChecking(false);
    }, 1200);
  };

  const clearCheck = () => {
    setUrl("");
    setResult(null);
  };

  return (
    <div className="verify-page">
      <section className="verify-hero">
        <div className="verify-badge">🛡️ CYBERAWARE VERIFY</div>

        <h1>
          Check Before
          <span> You Click.</span>
        </h1>

        <p>
          Enter a suspicious website or link and CyberAware will look for
          common warning signs that may indicate a risky destination.
        </p>
      </section>

      <section className="verify-container">
        <div className="checker-card">
          <div className="checker-header">
            <div className="checker-icon">🌐</div>

            <div>
              <h2>Website Safety Checker</h2>
              <p>Analyze a suspicious URL for common red flags.</p>
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
              <button className="clear-button" onClick={clearCheck}>
                Clear
              </button>
            )}
          </div>

          <div className="privacy-note">
            🔒 <span>Never enter passwords, OTPs, PINs or card details here.</span>
          </div>
        </div>

        {checking && (
          <div className="checking-card">
            <div className="loading-spinner"></div>

            <h3>Analyzing Website...</h3>

            <p>
              Checking the URL for common suspicious patterns.
            </p>
          </div>
        )}

        {result && !checking && (
          <div className={`result-card ${result.level}`}>
            <div className="result-top">
              <div className="result-status-icon">
                {result.level === "danger" && "🚨"}
                {result.level === "caution" && "⚠️"}
                {result.level === "safe" && "🟢"}
                {result.level === "warning" && "ℹ️"}
              </div>

              <div>
                <span className="result-label">SCAN RESULT</span>
                <h2>{result.title}</h2>
              </div>
            </div>

            <p className="result-message">{result.message}</p>

            {result.checkedUrl && (
              <div className="checked-url">
                <span>Checked URL</span>
                <strong>{result.checkedUrl}</strong>
              </div>
            )}

            {result.warnings && result.warnings.length > 0 && (
              <div className="warnings-section">
                <h3>🚩 Warning Signs Found</h3>

                <ul>
                  {result.warnings.map((warning, index) => (
                    <li key={index}>
                      <span>•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.level === "safe" && (
              <div className="safe-note">
                ✓ Basic checks passed. Always verify the website independently
                before sharing sensitive information.
              </div>
            )}
          </div>
        )}

        <div className="verify-tips">
          <div className="tips-title">
            <span>💡</span>
            <div>
              <h3>Remember</h3>
              <p>CyberAware results are guidance, not a guarantee.</p>
            </div>
          </div>

          <div className="tips-grid">
            <div>
              <strong>01</strong>
              <span>Check the domain name carefully.</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Never share OTPs or passwords.</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Be careful with urgent offers.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Verify;