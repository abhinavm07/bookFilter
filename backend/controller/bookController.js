const BookSchema = require("../model/bookModel");

const addBook = async (req, res) => {
  const { author, title, price } = req.body;

  try {
    const bookExists = await BookSchema.exists({ author, title });

    if (bookExists) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new BookSchema({ author, title, price });
    const savedBook = await newBook.save();

    return res.status(200).json(savedBook);
  } catch (error) {
    throw error;
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await BookSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select(["-__v"]);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookSchema.findByIdAndDelete(id).select(["-__v"]);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    throw error;
  }
};

const allBooks = async (req, res) => {
  try {
    const books = await BookSchema.find({}).select(["-__v"]);
    res.status(200).json(books);
  } catch (error) {
    throw error;
  }
};

const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await BookSchema.findById(id).select(["-__v"]);
    if (book) {
      console.log(book);
    } else {
      console.log("No book with such ID exists at the moment!");
    }
    res.send("Check Console");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  allBooks,
  getBook,
};
