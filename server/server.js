console.log("SERVER FILE LOADED 🚀");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

console.log(process.env.GEMINI_API_KEY);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");
const User = require("./models/User");

const Question = require("./models/Question");
const auth = require("./middleware/auth");

// import { GoogleGenAI } from "@google/genai";
// import readlineSync from 'readline-sync';

require("dotenv").config();
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});


// ================= AUTH ROUTES =================

// 👉 Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 👉 Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Question 
app.post("/api/questions", auth, async (req, res) => {
  try {
    const { title, difficulty, topic, platform, notes } = req.body;

    // ✅ Create question
    const question = await Question.create({
      user: req.user,
      title,
      difficulty,
      topic,
      platform,
      notes,
    });

    // 🔥 STREAK LOGIC START
    const user = await User.findById(req.user);

    const today = new Date();
    const lastDate = user.lastSolvedDate;

    if (!lastDate) {
      user.streak = 1;
    } else {
      const diff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        user.streak += 1;
      } else if (diff > 1) {
        user.streak = 1;
      }
      // diff === 0 → same day → no change
    }

    user.lastSolvedDate = today;
    await user.save();
    // 🔥 STREAK LOGIC END

    res.status(201).json(question);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get All Questions
app.get("/api/questions",auth, async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete question
app.delete("/api/questions/:id",auth,  async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ msg: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API dashboard route
// AI api
// app.get("/api/ai-insights", auth, async (req, res) => {
//   try {
//     const questions = await Question.find({ user: req.user });

//     const summary = questions.map(q =>
//       `${q.title} (${q.topic}, ${q.difficulty})`
//     ).join(", ");

//     const prompt = `
// User solved these problems:
// ${summary}

// Tell:
// - weak topics
// - improvement suggestion
// - motivation (short)
// `;

//     const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ insight: text });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});