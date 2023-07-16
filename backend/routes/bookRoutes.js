const express = require("express");
const {
  addBook,
  updateBook,
  deleteBook,
  allBooks,
  getBook,
} = require("../controller/hotelController");

const router = express.Router();

router.post("/newbook", addBook);

router.put("/updatebook/:id", updateBook);

router.put("/deletebook/:id", deleteBook);

router.get("/allbooks", allBooks);

router.put("/getbook/:id", getBook);

module.exports = router;
