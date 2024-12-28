import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Student } from "./schema.js";

dotenv.config();
const port = 3000;
const app = express();
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

// CREATE
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedstudent = await student.save();
    res.status(200).send(savedstudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// READ

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  try {
    const updatestudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatestudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  try {
    const deletestudent = await Student.findByIdAndDelete(req.params.id);
    res.send(deletestudent);
  } catch (err) {
    res.status(500).send(err);
  }
});

mongoose
  .connect(mongoURI)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    })
  )
  .catch((e) => console.log(e.message));
