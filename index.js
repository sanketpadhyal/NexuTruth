const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NexuTruth 🔗 backend is live!");
});

app.post("/", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a fake news detector. Reply only with either '✅ Looks real!' or '⚠️ Possibly fake news!' based on the user content.",
          },
          {
            role: "user",
            content,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`, // TWO WAYS EITHER CREATE A .ENV FILE AND PASTE YOUR KEY/API OVER THERE IN FORMAT OPENROUTER_KEY="YOUR_KEY" OR USE BACKEND KEY HIDING SESSION PIN OKAY!
        },
      },
    );

    const reply =
      response.data.choices?.[0]?.message?.content || "⚠️ No result";
    res.json({ result: reply });
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("NexuTruth 🔗 backend running on port", PORT);
});
