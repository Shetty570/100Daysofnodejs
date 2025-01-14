import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Home route");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
