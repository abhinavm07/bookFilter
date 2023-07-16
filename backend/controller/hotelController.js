const BookSchema = require("../model/bookModel");

const addBook = async (req, res) => {
  const { author, title, price } = req.body;

  const newBook = new BookSchema(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (error) {
    throw error;
  }
};

const updateBook = async (req, res) => {
  try {
    const newBook = await BookSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(newBook);
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (req, res) => {
  try {
    const newBook = await BookSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book Deleted Sucessfully !" });
  } catch (error) {
    throw error;
  }
};

const allBooks = async (req, res) => {
  try {
    const newBook = await BookSchema.find({});
    res.status(200).json(newBook);
  } catch (error) {
    throw error;
  }
};

const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = BookSchema.findById({ id });
    book
      ? console.log(book)
      : console.log(`No Book of Such Name exist at the moment!`);
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
