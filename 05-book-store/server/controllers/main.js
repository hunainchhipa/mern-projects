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
  res.status(201).json({ book: { ...book.toObject(), image: fullImageUrl } });

  // res.status(201).json({ book });
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  if (title === "" || author === "" || price === "") {
    throw new BadRequestError("title, author and price is required");
  }

  const book = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    throw new NotFoundError(`No book found with id ${id}`);
  }
  res.status(200).json({ book });
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
