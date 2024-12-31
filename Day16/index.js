import express from "express";
const app = express();

const errorhandler = (err, req, res, next) => {
  console.log("error middleware");
  console.error(err.stack);
  res.status(500).send("something went wrong");
  next();
};

app.use((req, res, next) => {
  throw new Error("New broke");
});

app.use(errorhandler);

app.listen(3000);
