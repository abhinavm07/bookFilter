import { useEffect, useState } from "react";
import http from "../helper/http";
import { Button } from "react-bootstrap";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //check local storage
    if (!localStorage.getItem("user")) {
      window.location.href = "/";
    }
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    http
      .get("http://localhost:8000/books/allBooks")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function sortRecord(sortBy = "") {
    books.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    setBooks([...books]);
  }

  const rentBook = (book) => {
    http
      .put(`http://localhost:8000/books/updateBook/${book._id}`, {
        rentStatus: !book.rentStatus,
      })
      .then((response) => {
        const index = books.findIndex((book) => book._id === response.data._id);
        books[index] = response.data;
        setBooks([...books]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Button
        variant="link"
        className="logoutButton"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      >
        Logout
      </Button>
      <div className="pageTitle">Book Listing</div>
      <div className="sortDiv">
        <div className="sortTitle">Sort By:</div>
        <div className="sortOptions">
          <Button
            variant="light"
            className="sortButton"
            onClick={() => sortRecord("title")}
          >
            Title
          </Button>
          <Button
            variant="light"
            className="sortButton"
            onClick={() => sortRecord("author")}
          >
            Author
          </Button>
          <Button
            variant="light"
            className="sortButton"
            onClick={() => sortRecord("price")}
          >
            Price
          </Button>
        </div>
      </div>
      <div className="mainBookDiv">
        {books.map((book) => {
          return (
            <div className="bookDiv" key={book._id}>
              <div className="bookTitle">{book.title}</div>
              <div className="bookAuthor">By: {book.author}</div>
              <div className="bookPrice">${book.price}</div>
              <div className="actions">
                <Button
                  variant={book.rentStatus ? "primary" : "danger"}
                  className="actionButton"
                  onClick={() => rentBook(book)}
                >
                  {book.rentStatus ? "Rent" : "Unavailable"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
