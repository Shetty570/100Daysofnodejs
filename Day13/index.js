import express from "express";

const app = express();

let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
];

app.get("/api/books", (req, res) => {
  res.json(books);
  res.status(200);
});

app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id == id);
  if (book) {
    res.json(book);
  } else {
    res.status(400).json({ message: "invalid book id" });
  }
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
