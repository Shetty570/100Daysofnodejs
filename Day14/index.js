import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

const SECRET_KEY = "test";

const users = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "need username and password " });
  }
  users.push({ username, password });
  res.status(200).json({ message: "user registerd successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    res.status(401).json({ message: "invalid username or password " });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1hr" });
  res.json({ token });
});

const auth = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "need token" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).json({ message: "invalid token" });
    }
    req.user = user;
    next();
  });
};

app.get("/register", auth, (req, res) => {
  res.json({ message: `welcome ${req.user.username} ` });
});

app.listen(3000, () => {
  console.log("server running 3000");
});
