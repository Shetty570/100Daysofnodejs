import express from "express";
import { User } from "./schema.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "require all fields" });
  }
  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);
    const user = new User({ name, email, password: hashpassword });
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ message: "server error", error: e.message });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "required fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    req.session.user = { id: user._id, email: user.email };

    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("unathorised");
  }
  res.send(`Welcome to the dashboard, user ${req.session.user.email}`);
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.clearCookie("connect.sid");
    res.send("logged out successfully");
  });
});

mongoose.connect(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log("server running", port);
  })
);
