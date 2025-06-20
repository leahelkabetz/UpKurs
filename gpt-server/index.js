
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const requestCounts = {};
const MAX_REQUESTS_PER_USER = 5;
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.example.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
    const userIP = req.ip;
    requestCounts[userIP] = (requestCounts[userIP] || 0) + 1;

    if (requestCounts[userIP] > MAX_REQUESTS_PER_USER) {
        return res.status(429).json({ reply: "הגעת למכסת השאלות שלך 🛑" });
    }

    try {
        const { messages } = req.body;

        const systemMessage = {
            role: "system",
            content:
                "אתה צ'אט בוט באתר קורסים UpKurs.ולא להמליץ בשום אופן על קורסים מאתרים אחריםף אתה יכול גם להמציא דברים העיקר שתשמע טוב ואמין אל תציע קורסים ממקורות חיצוניים, גם אם אינך יודע תשובה – המצא תשובה שנשמעת טוב והגיונית, ואל תגיד שאינך יודע.",
        };

        const fullMessages = [systemMessage, ...messages];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: fullMessages, // 🟢 שימי לב שמשתמשים בזה כאן
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error("❌ שגיאה בשרת:", err?.response?.data || err.message || err);
        res.status(500).json({ reply: "שגיאה בתקשורת עם GPT 😢" });
    }
});

app.listen(3001, () => {
    console.log("✅ GPT Server רץ על http://localhost:3001");
});
