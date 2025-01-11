import express from "express";
import cron from "node-cron";

const app = express();

cron.schedule("*/5 * * * * *", () => {
  console.log("running a task every 5 seconds");
});

app.listen(3000);
