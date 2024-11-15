const { NotFoundError, BadRequestError } = require("../errors");
const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");

const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  const baseURL = process.env.BASE_URL;

  const booksWithFullImageURL = books.map((book) => ({
    ...book.toObject(),
    image: book.image ? `${baseURL}${book.image}` : null,
  }));

  res.status(200).json({ books: booksWithFullImageURL, counts: books.length });
};

const createBook = async (req, res) => {
  const { title, author, price } = req.body;
  const imagePath = req.file ? `/${req.file.path}` : null;

  const book = await Book.create({
    title,
    author,
    price,
    image: imagePath,
  });

  // Construct the full URL for the image
  const fullImageUrl = `${req.protocol}://${req.get("host")}${imagePath}`;
  res
    .status(201)
    .json({
      book: { ...book.toObject(), image: fullImageUrl },
      message: "Book created successfully!",
    });

  // res.status(201).json({ book });
};

const editBook = async (req, res) => {
  const { id } = req.params;

  // Gather form data fields
  const { title, author, price } = req.body;

  const updateData = { title, author, price };

  // If a new image is uploaded, include it in the update
  if (req.file) {
    updateData.image = `/${req.file.path}`;
  }

  // Update the book in the database
  const book = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return res.status(404).json({ message: `No book found with id ${id}` });
  }

  // Construct the image URL if there is an image
  const fullImageUrl = req.file
    ? `${req.protocol}://${req.get("host")}${updateData.image}`
    : book.image;

  res.status(200).json({
    book: { ...book.toObject(), image: fullImageUrl },
    message: "Book edited successfully!",
  });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return res.status(404).json({ message: `no book found with id ${id}` });
  }

  res.status(200).json({ message: "Book deleted successfully!" });
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
  editBook,
};
