import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all users");
});

router.post("/", (req, res) => {
  res.send("create a user");
});

router.get("/:id", (req, res) => {
  res.send(`get user with id ${req.params.id}`);
});

export default router;
