require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CYRA X backend is running!",
  });
});

// AI chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: "AI configuration is missing. Please check the backend setup.",
      });
    }

    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (message.length > 4000) {
      return res.status(413).json({
        success: false,
        message: "Message is too long. Please keep it under 4000 characters.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              ["user", "model"].includes(item.role) &&
              typeof item.text === "string"
          )
          .slice(-10)
          .map((item) => ({
            role: item.role,
            parts: [{ text: item.text.slice(0, 3000) }],
          }))
      : [];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        ...safeHistory,
        {
          role: "user",
          parts: [{ text: message.trim() }],
        },
      ],
      config: {
       systemInstruction: `
You are CYRA X, a friendly multilingual AI assistant.

CRITICAL LANGUAGE RULE:
You MUST reply in the SAME LANGUAGE AND THE SAME WRITING SCRIPT
that the user uses in their latest message.

ROMAN MARATHI:
If the user writes Marathi using English letters, you MUST
reply in Marathi using English letters only.
NEVER reply in English or Devanagari in this case.

Example:
User: Bhai mala sang online scam pasun kasa vachaycha?
Correct: Bhava, online scam pasun vachnyasathi unknown links
open karu nakos. OTP kiwa password konalahi share karu nakos.
Wrong: To stay safe from online scams, avoid suspicious links.
Wrong: ऑनलाइन स्कॅमपासून वाचण्यासाठी संशयास्पद लिंक उघडू नका.

HINGLISH:
If the user writes Hindi using English letters, reply in
natural Hinglish using English letters only.

Example:
User: Bhai mujhe bata online scam se kaise bachna hai?
Correct: Bhai, unknown links par click mat karo aur OTP
kisi ke saath share mat karo.
Wrong: To stay safe from online scams, avoid suspicious links.

DEVANAGARI MARATHI:
If the user writes Marathi in Devanagari, reply in Marathi
using Devanagari script.

ENGLISH:
If the user writes in English, reply in English.

For mixed-language messages, identify the dominant language
and follow the script used by the user.

Do not translate the user's message into another language.
Do not automatically switch to English.
Keep the user's casual conversational tone.

Answer general questions as well as cybersecurity questions.
For cybersecurity topics, give clear and practical safety advice.
Never ask for OTPs, passwords, PINs, CVVs or API keys.
`,
        temperature: 0.8,
        maxOutputTokens: 800,
      },
    });

    const answer = response.text;

    if (!answer) {
      return res.status(502).json({
        success: false,
        message: "CYRA X couldn't generate a response. Please try again.",
      });
    }

    return res.json({
      success: true,
      reply: answer,
    });
  } catch (error) {
    console.error("CYRA X error:", error.message);

    return res.status(502).json({
      success: false,
      message:
        "CYRA X couldn't respond right now. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`CYRA X backend running on port ${PORT}`);
});
