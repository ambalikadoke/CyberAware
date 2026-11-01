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

const dailyChallenges = [
  { category: '📦 DELIVERY SCAM', situation: 'A text says your parcel is on hold and asks you to pay ₹5 through a shortened link.', options: ['Pay the small fee to release it', 'Open the link to see the details', 'Check the order in the courier’s official app'], answer: 2, explanation: 'Avoid unexpected payment links. Check delivery updates directly in the courier’s official app or website.' },
  { category: '📸 SOCIAL MEDIA GIVEAWAY', situation: 'An account says you won a new phone but asks for your Instagram password to claim it.', options: ['Share the password to verify your account', 'Do not share it; report the suspicious account', 'Send your password only in a private message'], answer: 1, explanation: 'Legitimate giveaways never need your password. Never share login credentials or one-time codes.' },
  { category: '💼 JOB OFFER', situation: 'A recruiter messages you with a work-from-home job but asks for a registration fee first.', options: ['Pay quickly before the vacancy closes', 'Verify the company and never pay an upfront job fee', 'Send your ID documents immediately'], answer: 1, explanation: 'Unexpected upfront fees are a warning sign. Verify the employer through its official website and contact details.' },
  { category: '🎮 GAMING REWARD', situation: 'A website promises free game coins if you sign in using your gaming account.', options: ['Use your usual password to claim the coins', 'Check the offer only through the game’s official channels', 'Share the login with a friend to test it'], answer: 1, explanation: 'Free-reward pages can steal accounts. Use only official game stores, apps and announcements.' },
  { category: '📲 SCREEN SHARING', situation: 'A stranger claiming to be customer support asks you to install an app and share your screen.', options: ['Install it so they can fix the issue', 'Share the screen but hide notifications', 'End the conversation and contact support through the official app'], answer: 2, explanation: 'Screen sharing can expose messages, passwords and financial information. Contact support independently.' },
  { category: '💳 UPI PAYMENT', situation: 'Someone says they are sending you money and asks you to enter your UPI PIN to receive it.', options: ['Enter the PIN to accept the money', 'Never enter a PIN to receive money; verify the request', 'Ask them to send a payment screenshot'], answer: 1, explanation: 'A UPI PIN authorises a payment. You do not need it to receive money.' },
  { category: '🔗 UNKNOWN LINK', situation: 'You receive a message from an unknown number saying ‘Look at this photo of you’ with a link.', options: ['Open it out of curiosity', 'Forward it to friends first', 'Do not open it; verify with the sender through another channel'], answer: 2, explanation: 'Unexpected links can lead to phishing or malware. Verify separately and delete suspicious messages.' },
  { category: '🔐 PASSWORD ALERT', situation: 'You get an email warning that your account password was changed, with a link to ‘undo’ it.', options: ['Click the email link immediately', 'Open the service’s official app/site directly and check account security', 'Reply with your current password'], answer: 1, explanation: 'Do not trust links in unexpected security emails. Visit the service directly and review recent activity.' },
  { category: '🧾 QR CODE TRAP', situation: 'A buyer sends you a QR code and says scanning it will help them transfer money to you.', options: ['Scan it and approve whatever appears', 'Scan only if you want to pay them', 'Do not scan; use your normal verified way to receive payment'], answer: 2, explanation: 'QR codes and collect requests can initiate payments. Read the payment screen carefully and never enter a PIN to receive money.' },
  { category: '📞 FAKE SUPPORT', situation: 'A caller says your internet will be disconnected unless you install a remote-access app.', options: ['Install it to avoid disconnection', 'Hang up and contact your provider using its official number', 'Give them your phone unlock code'], answer: 1, explanation: 'Threats and urgency are common pressure tactics. Contact the provider using a trusted number.' },
  { category: '🪪 ID DOCUMENT REQUEST', situation: 'A message from an unknown account asks for a photo of your Aadhaar card to unlock a prize.', options: ['Send both sides of the card', 'Share it only after checking the sender and purpose through official channels', 'Post it in the chat group'], answer: 1, explanation: 'Identity documents are sensitive. Do not send them to unknown accounts or for unverified offers.' },
  { category: '🛍️ SHOPPING DEAL', situation: 'A social media store offers branded shoes at an unbelievable price and accepts only direct bank transfer.', options: ['Pay immediately before stock ends', 'Check seller reviews, return details and trusted payment options first', 'Share your OTP to confirm the order'], answer: 1, explanation: 'Unusually low prices and pressure to pay outside trusted platforms are warning signs.' },
  { category: '📧 EMAIL ATTACHMENT', situation: 'An unexpected email attachment is named ‘Exam Timetable’ but comes from an unfamiliar address.', options: ['Download and enable any prompts', 'Verify the sender through a known channel before opening it', 'Forward it to your classmates'], answer: 1, explanation: 'Unexpected attachments may contain harmful files. Verify the sender and avoid enabling macros or unknown downloads.' },
  { category: '🧑\u200d🤝\u200d🧑 IMPERSONATION', situation: 'A new number messages you pretending to be your friend and urgently asks for money.', options: ['Transfer it because you know the name', 'Call your friend on their saved number to confirm', 'Ask for their UPI PIN'], answer: 1, explanation: 'Impersonation scams use urgency. Confirm money requests using a known contact method.' },
  { category: '📱 APP PERMISSIONS', situation: 'A simple wallpaper app asks for access to your contacts, microphone and SMS.', options: ['Allow everything so it works', 'Deny unnecessary permissions and look for a safer app', 'Share your phone password with the app developer'], answer: 1, explanation: 'Permissions should match an app’s purpose. Avoid granting access that is not needed.' },
  { category: '🌐 WEBSITE CHECK', situation: 'A shopping website has a misspelled brand name and no clear contact or return information.', options: ['Enter card details because the design looks professional', 'Check the exact domain and seller details before buying', 'Reuse your banking password to sign in'], answer: 1, explanation: 'A polished design does not prove a site is genuine. Verify the domain, seller identity and policies.' },
  { category: '🎓 SCHOLARSHIP MESSAGE', situation: 'A message promises a scholarship but asks you to pay a ‘document verification charge’ to a personal account.', options: ['Pay the fee to secure the scholarship', 'Verify the scheme on the institution or government’s official website', 'Send your bank OTP'], answer: 1, explanation: 'Check scholarships through official institution or government channels. Be cautious of fees paid to personal accounts.' },
  { category: '🧑\u200d💻 FAKE INTERNSHIP', situation: 'An internship offer arrives from a free email account and asks you to buy a training kit from a specific link.', options: ['Buy the kit immediately', 'Verify the organisation, recruiter and offer independently', 'Send your card number over chat'], answer: 1, explanation: 'Research the organisation and confirm the offer through official contact details before paying or sharing data.' },
  { category: '📶 PUBLIC WI-FI', situation: 'You connect to public Wi-Fi and a pop-up asks you to log in to your bank account to continue.', options: ['Enter your banking details', 'Avoid entering sensitive information and use the bank’s official app on a trusted connection', 'Save the password in the pop-up'], answer: 1, explanation: 'Public networks can be risky. Avoid sensitive transactions on unknown networks and check the network name with the venue.' },
  { category: '🔔 OTP MESSAGE', situation: 'You receive an OTP even though you are not trying to log in anywhere.', options: ['Share it with the person who calls next', 'Ignore it and never share it; check your account activity if concerned', 'Post it online to ask what it means'], answer: 1, explanation: 'An unexpected OTP may mean someone is attempting to access an account. Never share it with anyone.' },
  { category: '🧳 TRAVEL BOOKING', situation: 'A travel agent on social media offers a cheap ticket but asks you to pay to a personal wallet.', options: ['Pay because the offer expires soon', 'Verify the agent and booking directly with the airline or hotel', 'Send your card PIN as proof'], answer: 1, explanation: 'Confirm bookings with the airline, hotel or a trusted booking platform before paying.' },
  { category: '🧑\u200d🏫 EXAM PAPER', situation: 'A group claims to sell leaked exam papers and asks you to download an unknown app.', options: ['Install it to see the papers', 'Avoid the app and rely on official college updates', 'Share your student login'], answer: 1, explanation: 'Unknown apps can compromise your device or account. Avoid suspicious downloads and unofficial claims.' },
  { category: '📷 PHOTO PRIVACY', situation: 'Someone you just met online pressures you to send a private photo and says they will delete it.', options: ['Send it to prove trust', 'Do not send anything under pressure; block and report if threatened', 'Share your account password too'], answer: 1, explanation: 'You control what you share. Pressure, threats or blackmail are reasons to stop contact and seek trusted help.' },
  { category: '🧾 FAKE REFUND', situation: 'A caller says you are due a refund and asks you to read out your card CVV and OTP.', options: ['Read them out to receive the refund', 'End the call and contact the company through its official channel', 'Send a photo of your card'], answer: 1, explanation: 'CVV, OTP and card details are private. A caller should not need them to issue a legitimate refund.' },
  { category: '🛡️ SECURITY UPDATE', situation: 'A pop-up says your phone has viruses and asks you to call a number to clean it.', options: ['Call the number and follow instructions', 'Close the pop-up and use your device’s trusted security settings or official support', 'Install the first app it recommends'], answer: 1, explanation: 'Scareware uses alarming pop-ups to push fake support or unsafe downloads. Use trusted device tools.' },
  { category: '💬 MESSAGE REQUEST', situation: 'A stranger sends you a file called ‘payment_receipt.apk’ and says it is proof of payment.', options: ['Install it to view the receipt', 'Do not install APK files from unknown senders; verify payment in your own app', 'Forward it to your contacts'], answer: 1, explanation: 'Never install unknown APKs. Check whether money arrived in your own trusted payment app.' },
  { category: '📍 LOCATION REQUEST', situation: 'A random contest account asks you to share live location to deliver a surprise gift.', options: ['Share live location for the whole day', 'Do not share live location with an unverified account', 'Send your home address too'], answer: 1, explanation: 'Live location reveals where you are. Share it only with people you trust and only when necessary.' },
  { category: '🧑\u200d⚖️ DIGITAL ARREST THREAT', situation: 'A video caller claims to be an officer and says you must stay on camera and pay money to avoid arrest.', options: ['Pay immediately to end the call', 'Disconnect, do not pay, and verify with the relevant official agency', 'Share your banking app screen'], answer: 1, explanation: 'Threatening video calls demanding money are scams. Do not transfer funds; seek help from official authorities.' },
  { category: '📊 INVESTMENT GROUP', situation: 'A chat group guarantees huge daily returns if you transfer money today.', options: ['Invest quickly before the offer closes', 'Be sceptical of guaranteed returns and verify the entity with official regulators', 'Borrow money to invest more'], answer: 1, explanation: 'Guaranteed high returns and urgency are red flags. Research independently and never invest based only on group messages.' },
  { category: '🧹 ACCOUNT CLEANUP', situation: 'A pop-up says your social account will be deleted unless you enter your password on a linked page.', options: ['Enter your password to keep the account', 'Open the social platform directly and check its notifications and security settings', 'Send the password to the page administrator'], answer: 1, explanation: 'Phishing pages imitate login screens. Access your account through the official app or typed website address.' }
];

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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

const mythQuestionSets = [
  [
    { question: "You need to enter your UPI PIN to receive money.", answer: "False", explanation: ["Your UPI PIN is used to authorise money leaving your account.", "To receive money, you do not need to enter a PIN or approve an unexpected collect request."] },
    { question: "A bank will never ask you to share your OTP over a call.", answer: "True", explanation: ["Your OTP is meant only for you and helps verify a transaction or login.", "Never tell it to callers, even if they claim to be bank staff or customer support."] },
    { question: "Using the same password on every account is safe if it is strong.", answer: "False", explanation: ["If one website is breached, criminals may try that password on your other accounts.", "Use a different strong password for each account and enable two-factor authentication."] },
    { question: "A public Wi-Fi network can put your personal information at risk.", answer: "True", explanation: ["Fake or poorly secured networks can expose your activity and personal information.", "Avoid banking and sensitive logins on unknown public Wi-Fi; use mobile data or a trusted connection."] },
    { question: "A payment screenshot is proof that money has reached your account.", answer: "False", explanation: ["Screenshots and payment messages can be edited or faked.", "Check the transaction in your own bank or UPI app before handing over goods or confirming payment."] }
  ],
  [
    { question: "A QR code can be used by scammers to trick you into sending money.", answer: "True", explanation: ["Scanning a QR code and entering your UPI PIN can authorise a payment from your account.", "Read the name and amount shown in your UPI app before approving anything; you do not scan a code to receive money."] },
    { question: "Every app with many downloads is guaranteed to be safe.", answer: "False", explanation: ["High download numbers do not guarantee that an app is genuine or secure.", "Check the developer, recent reviews, requested permissions and whether it comes from an official store."] },
    { question: "Enabling two-factor authentication adds an extra layer of account security.", answer: "True", explanation: ["It asks for another verification step in addition to your password.", "This can make unauthorised access harder, even if someone discovers your password."] },
    { question: "You should install an APK sent by an unknown person if they say it is urgent.", answer: "False", explanation: ["An unknown APK may contain malware that steals data or takes control of parts of your phone.", "Do not install apps from random messages; use trusted official app stores instead."] },
    { question: "A genuine job offer should not require you to pay a fee to get hired.", answer: "True", explanation: ["Registration, interview, training or security fees demanded upfront are common job-scam warning signs.", "Verify the employer and vacancy through the company’s official website or contact details before sharing documents."] }
  ],
  [
    { question: "A padlock icon on a website means the website is definitely genuine.", answer: "False", explanation: ["The padlock indicates that the connection is encrypted; it does not prove who owns the website.", "Scammers can also create secure-looking sites, so check the exact domain and seller details."] },
    { question: "You should verify an urgent money request by calling the person on their saved number.", answer: "True", explanation: ["Scammers can impersonate friends or relatives using a copied profile or a new number.", "Call the person using a number you already trust before transferring money or sharing information."] },
    { question: "It is safe to share your screen with an unknown customer-care caller.", answer: "False", explanation: ["Screen sharing may reveal OTPs, messages, banking details and private notifications.", "End unexpected support calls and contact the company yourself through its official app or website."] },
    { question: "Keeping your phone and apps updated can help protect against security flaws.", answer: "True", explanation: ["Updates often fix vulnerabilities that attackers may try to exploit.", "Install updates from your phone settings or official app store, not from links sent by strangers."] },
    { question: "A giveaway asking for your OTP to release a prize is suspicious.", answer: "True", explanation: ["An OTP can let someone access your account or approve an action in your name.", "Never share an OTP to claim a prize; check the giveaway on the brand’s verified page or official website."] }
  ]
];

export default function App() {
  const [page, setPage] = useState("home");
  const [previousPages, setPreviousPages] = useState([]);
  const [learnDetailOrigin, setLearnDetailOrigin] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const todayKey = getLocalDateKey();
  const dailyChallengeIndex =
    Math.floor(new Date(`${todayKey}T00:00:00`).getTime() / 86400000) %
    dailyChallenges.length;
  const dailyChallenge = dailyChallenges[dailyChallengeIndex];
  const dailyStorageKey = `cyberaware-daily-challenge-${todayKey}`;
  const [dailyAnswer, setDailyAnswer] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(dailyStorageKey) || "null");
      return Number.isInteger(saved?.answer) ? saved.answer : null;
    } catch {
      return null;
    }
  });
  const [dailySubmitted, setDailySubmitted] = useState(() => {
    try {
      return Boolean(JSON.parse(localStorage.getItem(dailyStorageKey) || "null")?.submitted);
    } catch {
      return false;
    }
  });
  const [activeRedFlag, setActiveRedFlag] = useState(0);
  const [arenaInitialMission, setArenaInitialMission] = useState(null);
  const mythWeekStart = (() => {
    const date = new Date();
    const day = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
  })();
  const mythWeekNumber = Math.floor(
    new Date(`${mythWeekStart}T00:00:00Z`).getTime() / 604800000
  );
  const weeklyMyths = mythQuestionSets[((mythWeekNumber % mythQuestionSets.length) + mythQuestionSets.length) % mythQuestionSets.length];
  const mythStorageKey = `cyberaware-myth-buster-${mythWeekStart}`;
  const [activeMythIndex, setActiveMythIndex] = useState(0);
  const [mythAnswers, setMythAnswers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(mythStorageKey) || "{}");
    } catch {
      return {};
    }
  });
  const chooseMythAnswer = (index, answer) => {
    // Let users switch between True and False and see the feedback for either choice.
    const updatedAnswers = { ...mythAnswers, [index]: answer };
    setMythAnswers(updatedAnswers);
    localStorage.setItem(mythStorageKey, JSON.stringify(updatedAnswers));
  };

  // Open a selected Cyber Arena mission directly from the homepage.
  const openArenaMission = (missionId) => {
    setArenaInitialMission(missionId);
    navigate("arena");
  };

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
        {page === "arena" && (
          <CyberArena
            initialMission={arenaInitialMission}
            onInitialMissionHandled={() => setArenaInitialMission(null)}
          />
        )}

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
                onClick={() => navigate("cyrax")}
                type="button"
              >
                <span className="hero-action-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 5.8A2.8 2.8 0 0 1 6.8 3h10.4A2.8 2.8 0 0 1 20 5.8v7.4a2.8 2.8 0 0 1-2.8 2.8h-5.1L7 20v-4H6.8A2.8 2.8 0 0 1 4 13.2V5.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M8 8h8M8 11.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="hero-action-label">Talk to CYRA X</span>
                <span className="hero-action-arrow" aria-hidden="true">→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("verify")}
                type="button"
              >
                <span className="hero-action-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 19 6v5.2c0 4.5-2.8 7.7-7 9.8-4.2-2.1-7-5.3-7-9.8V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="hero-action-label">Check Before You Click</span>
                <span className="hero-action-arrow" aria-hidden="true">→</span>
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

          {/* DAILY CYBER CHALLENGE */}
          <aside className="live-dashboard daily-mission-card daily-challenge-card">
            <div className="challenge-topline">
              <div className="challenge-brand">
                <span className="challenge-spark">✳</span>
                <span>DAILY CYBER CHALLENGE</span>
              </div>
            </div>

            <div className="challenge-intro">
              <div className="challenge-category">{dailyChallenge.category}</div>
              <h3>{dailyChallenge.situation}</h3>
              <p>What would you do? Choose the safest move.</p>
            </div>

            <div className="daily-options challenge-options">
              {dailyChallenge.options.map((option, index) => (
                <button
                  className={`challenge-option ${
                    dailyAnswer === index ? "selected" : ""
                  } ${
                    dailySubmitted && index === dailyChallenge.answer
                      ? "correct"
                      : ""
                  } ${
                    dailySubmitted &&
                    dailyAnswer === index &&
                    index !== dailyChallenge.answer
                      ? "incorrect"
                      : ""
                  }`}
                  key={option}
                  type="button"
                  disabled={dailySubmitted}
                  onClick={() => setDailyAnswer(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-copy">{option}</span>
                  {dailySubmitted && index === dailyChallenge.answer && (
                    <span className="option-mark">✓</span>
                  )}
                  {dailySubmitted &&
                    dailyAnswer === index &&
                    index !== dailyChallenge.answer && (
                      <span className="option-mark">×</span>
                    )}
                </button>
              ))}
            </div>

            {!dailySubmitted ? (
              <button
                className="daily-submit challenge-submit"
                type="button"
                disabled={dailyAnswer === null}
                onClick={() => {
                  setDailySubmitted(true);
                  try {
                    localStorage.setItem(
                      dailyStorageKey,
                      JSON.stringify({ answer: dailyAnswer, submitted: true })
                    );
                  } catch {
                    // The challenge remains usable if browser storage is unavailable.
                  }
                }}
              >
                CHECK MY ANSWER <span>→</span>
              </button>
            ) : (
              <div
                className={`daily-feedback challenge-feedback ${
                  dailyAnswer === dailyChallenge.answer ? "good" : "bad"
                }`}
                role="status"
              >
                <strong>
                  {dailyAnswer === dailyChallenge.answer
                    ? "✓ Nice one! You spotted the safe move."
                    : "↗ Not quite — here’s the safer move."}
                </strong>
                <span>{dailyChallenge.explanation}</span>
              </div>
            )}

            <div className="challenge-footer">
              <span>THINK SMART. STAY SAFE.</span>
              <span>NEW CHALLENGE EVERY DAY</span>
            </div>
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

            {/* TRAP DETECTOR */}
            <section className="suspicious-panel red-flag-panel">
              <div className="suspicious-heading">
                <div>
                  <h3>Trap Detector</h3>
                  <p className="trap-detector-quote">
                    “Not every DM is genuine. Think before you trust.”
                  </p>
                </div>
                <span>{activeRedFlag + 1} / 5</span>
              </div>

              <div className="red-flag-tabs">
                {[
                  ["Fake Instagram Identity", "◎"],
                  ["Snapchat Sextortion", "👻"],
                  ["Malicious Links & APKs", "↗"],
                  ["Fake Giveaways", "🎁"],
                  ["Fake Jobs & Internships", "💼"],
                ].map((item, index) => (
                  <button
                    className={activeRedFlag === index ? "selected" : ""}
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
                <span className="red-flag-number">0{activeRedFlag + 1}</span>
                <div className="red-flag-content">
                  <strong>{[
                    "Fake Instagram Identity",
                    "Snapchat Sextortion & Blackmail",
                    "Malicious Links & APK Traps",
                    "Fake Giveaways & Social Media Rewards",
                    "Fake Job & Internship Offers",
                  ][activeRedFlag]}</strong>
                  <ul>
                    {[
                      [
                        "Scammers copy a real person's name, profile photo and posts to create a fake account that looks genuine.",
                        "They message friends or followers pretending to be that person and ask for urgent money, personal details or favours.",
                        "Check the exact username, verify through the person's known number, and report the impersonating profile. Never send money based only on a DM.",
                      ],
                      [
                        "A stranger may build trust through chats and pressure someone to share private photos, videos or personal information.",
                        "They may threaten to publish or forward private content unless the person pays money or keeps responding.",
                        "Do not pay or send more content. Save screenshots and account details, block and report the account, and seek help from a trusted person or cybercrime authorities.",
                      ],
                      [
                        "Scammers share tempting links through Instagram, WhatsApp, Telegram or gaming chats to attract clicks.",
                        "A link may open a fake login page, steal passwords or OTPs, or prompt you to install a harmful APK outside the official app store.",
                        "Avoid unknown links and APK files, check the full website address, and install apps only from trusted official stores. Never enter passwords or OTPs on linked pages.",
                      ],
                      [
                        "Fake influencer or brand accounts announce iPhone giveaways, free gifts, exclusive rewards or prize wins.",
                        "To claim the reward, they may ask for a registration fee, delivery charge, payment details or a login through a suspicious link.",
                        "Verify the offer on the brand's official account or website. Genuine prizes should not require your UPI PIN, OTP or a surprise payment to release them.",
                      ],
                      [
                        "Fake recruiters post work-from-home, part-time or internship offers on social media and messaging groups.",
                        "They may promise easy money but ask for registration, training or security fees, or collect identity documents before verifying the company.",
                        "Check the company and recruiter through official channels, never pay to get a job, and share documents only after confirming the opportunity is genuine.",
                      ],
                    ][activeRedFlag].map((point) => <li key={point}>{point}</li>)}
                  </ul>
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
            <h2>Small Checks. Stronger Safety.</h2>
          </div>

          <div className="awareness-grid">
            <article className="myth-card">
              <div className="lab-card-heading">
                <span className="lab-icon myth-icon">✳</span>
                <span>
                  <strong>Cyber Myth Buster</strong>
                </span>
              </div>

              <div className="myth-slider-window">
                <div
                  className="myth-slider-track"
                  style={{ transform: `translateX(-${activeMythIndex * 100}%)` }}
                >
                  {weeklyMyths.map((item, index) => {
                    const selectedAnswer = mythAnswers[index];
                    const isCorrect = selectedAnswer === item.answer;
                    return (
                      <section className="myth-question" key={`${mythWeekStart}-${index}`}>
                        <div className="myth-question-top">
                          <span className="myth-label">TRUE OR FALSE?</span>
                        </div>
                        <h3>“{item.question}”</h3>
                        <div className="myth-options">
                          {["True", "False"].map((option) => (
                            <button
                              className={selectedAnswer === option ? "selected" : ""}
                              type="button"
                              key={option}
                              aria-pressed={selectedAnswer === option}
                              onClick={() => chooseMythAnswer(index, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {selectedAnswer && (
                          <div className={`myth-feedback ${isCorrect ? "good" : "bad"}`}>
                            <strong>{isCorrect ? "Correct!" : "Not quite — here's the fact."}</strong>
                            <ul>
                              {item.explanation.map((point) => <li key={point}>{point}</li>)}
                            </ul>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              </div>
              <div className="myth-slider-controls">
                <button type="button" onClick={() => setActiveMythIndex((i) => Math.max(0, i - 1))} disabled={activeMythIndex === 0} aria-label="Previous question">←</button>
                <span>{activeMythIndex + 1} <i>/</i> 5</span>
                <button type="button" onClick={() => setActiveMythIndex((i) => Math.min(4, i + 1))} disabled={activeMythIndex === 4} aria-label="Next question">→</button>
              </div>
              <small className="myth-footnote">New myths every Monday.</small>
            </article>
          </div>
        </section>

        {/* LEARN SECTION */}
        <section className="learn-section learn-cta-section" id="learn">
          <div className="learn-heading">
            <div>
              <span>— &nbsp; WANT TO LEARN MORE?</span>
              <h2>Explore the Cyber Safety Library</h2>
              <p>
                Go deeper with eight learning guides covering phishing,
                UPI fraud, malicious apps, online shopping and more.
              </p>
            </div>
            <button onClick={() => navigate("learn")} type="button">
              Explore All Topics <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="home-library-grid">
            {[
              { icon: "🎣", tag: "SPOT THE TRAP", title: "Phishing Scams", description: "Recognise fake emails, links and login pages." },
              { icon: "📲", tag: "PAYMENT SAFETY", title: "UPI & Payment Fraud", description: "Avoid collect requests, QR and payment tricks." },
              { icon: "📱", tag: "APP SECURITY", title: "Malicious Apps", description: "Check app permissions before you install." },
              { icon: "🛍️", tag: "SHOP SMART", title: "Online Shopping Scams", description: "Identify fake stores, deals and sellers." },
              { icon: "💼", tag: "STAY ALERT", title: "Job & Internship Scams", description: "Separate genuine opportunities from fake offers." },
            ].map((topic) => (
              <article className="home-library-card" key={topic.title}>
                <div className="home-library-card-top">
                  <span className="home-library-icon" aria-hidden="true">{topic.icon}</span>
                  <span className="home-library-tag">{topic.tag}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <button type="button" onClick={() => navigate("learn")}>
                  More <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* CYBER ARENA HOMEPAGE FEATURE */}
        <section className="arena-home-section" aria-labelledby="arena-home-title">
          <div className="arena-home-copy">
            <span className="arena-home-kicker">⚔️ &nbsp; PLAY SMART. STAY SCAM-PROOF.</span>
            <h2 id="arena-home-title">Cyber Arena</h2>
            <p>
              Take on real-world scam challenges. Think fast, choose smart and
              stay one step ahead.
            </p>
            <button className="arena-home-button" onClick={() => navigate("arena")} type="button">
              Enter Cyber Arena <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="arena-home-missions">
            <button className="arena-home-mission-card" type="button" onClick={() => openArenaMission(1)} aria-label="Open Phishing Attack mission">
              <span className="arena-home-mission-icon">🎣</span>
              <span className="arena-home-mission-copy"><small>MISSION 01</small><strong>Phishing Attack</strong><span>Spot suspicious messages and links.</span></span>
              <span className="arena-home-mission-arrow" aria-hidden="true">↗</span>
            </button>
            <button className="arena-home-mission-card" type="button" onClick={() => openArenaMission(2)} aria-label="Open UPI Fraud mission">
              <span className="arena-home-mission-icon">💳</span>
              <span className="arena-home-mission-copy"><small>MISSION 02</small><strong>UPI Fraud</strong><span>Make safer choices with digital payments.</span></span>
              <span className="arena-home-mission-arrow" aria-hidden="true">↗</span>
            </button>
            <button className="arena-home-mission-card" type="button" onClick={() => openArenaMission(3)} aria-label="Open Job Scam mission">
              <span className="arena-home-mission-icon">💼</span>
              <span className="arena-home-mission-copy"><small>MISSION 03</small><strong>Job Scam</strong><span>Separate genuine offers from fake jobs.</span></span>
              <span className="arena-home-mission-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="community">
        <div className="footer-brand-block">
          <Logo darkMode={!darkMode} />
          <p className="footer-brand-copy">
            Your digital world. Your responsibility.
          </p>
          <p className="footer-brand-description">
            Helping you spot online threats, make safer choices and stay in control of your digital life.
          </p>
          <div className="footer-socials" aria-label="CyberAware social channels">
            <span title="YouTube" aria-label="YouTube">▶</span>
            <span title="Instagram" aria-label="Instagram">◎</span>
            <span title="X" aria-label="X">𝕏</span>
            <span title="LinkedIn" aria-label="LinkedIn">in</span>
          </div>
        </div>

        <div className="footer-links">
          <strong>EXPLORE</strong>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} type="button">Home</button>
          <button onClick={() => navigate("learn")} type="button">Learn</button>
          <button onClick={() => navigate("verify")} type="button">Verify</button>
          <button onClick={() => navigate("cyrax")} type="button">CYRA X</button>
          <button onClick={() => navigate("arena")} type="button">Cyber Arena</button>
        </div>

        <div className="footer-links">
          <strong>SAFETY RESOURCES</strong>
          <a href="#learn">Scam Awareness</a>
          <a href="#learn">Safety Guidelines</a>
          <button onClick={() => navigate("verify")} type="button">Report a Scam</button>
          <button onClick={() => navigate("cyrax")} type="button">Get Help</button>
        </div>

        <div className="footer-alert-card">
          <span className="footer-alert-kicker">STAY ALERT · STAY IN CONTROL</span>
          <h3>Spotted a cyber fraud?</h3>
          <p>Act quickly. For cyber financial fraud in India, call the national helpline.</p>
          <a className="footer-helpline" href="tel:1930">
            <span>☎</span><strong>1930</strong><small>Cyber Fraud Helpline</small>
          </a>
          <a className="footer-report-link" href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">
            Report on official portal <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="footer-legal-bar">
          <small>© {new Date().getFullYear()} CyberAware. All rights reserved.</small>
          <span>Think before you click. Stay safe online.</span>
          <small className="footer-made-for">Built for a safer digital India.</small>
        </div>
      </footer>
    </div>
  );
}