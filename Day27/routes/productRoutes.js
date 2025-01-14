import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all products");
});

router.post("/", (req, res) => {
  res.send("create a product");
});

router.get("/:id", (req, res) => {
  res.send(`get product with id ${req.params.id}`);
});

export default router;
