import express from "express";
import { User } from "./schema.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
app.use(express.json());
const port = 3000;

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
    res.status(200).send(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

mongoose.connect(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log("server running", port);
  })
);
