import express from "express";
import auth from "./auth.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, name: user.username }, "test", {
    expiresIn: "1h",
  });
  res.json({ token });
});

app.get("/", (req, res) => {
  res.send("Home path");
});

app.get("/protected", auth, (req, res) => {
  res.send(`protected path ${req.user.name}`);
});

app.listen(3000);
