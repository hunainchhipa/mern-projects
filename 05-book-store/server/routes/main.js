const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
  editBook,
} = require("../controllers/main");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllBooks);
router.post("/", upload.single("image"), createBook);
router.route("/:id").delete(deleteBook).patch(editBook);

module.exports = router;
