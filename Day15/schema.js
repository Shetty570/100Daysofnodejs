import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  StudentId: Number,
  Name: String,
  Roll: Number,
  BirthDay: Date,
  Address: String,
});

export const Student = mongoose.model("student", StudentSchema);
