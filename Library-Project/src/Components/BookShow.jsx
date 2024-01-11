import React, { useState } from "react";
import "../Styles/BookShow.css";

import BookItem from "./BookItem";
import BookOverlay from "./BookOverlay";

function BookShow({ books, currentUser }) {
  // ! show overlay'in görünüp görünmediğini tutar ('true' iken görünür , 'false' ise gizli)
  const [show, setShow] = useState(false);
  // ! 'selectedBook' anlık seçilen kitap bilgisini tutar.
  const [selectedBook, setSelectedBook] = useState("");

  // ! 'openOverlay' fonksiyonu , kitap parametresi alır, bu kitabı 'selectedBook' state'ine atar ve overlay'i görünür hale getirmek için 'show' state'ini 'true' yapar.
  const openOverlay = (book) => {
    setSelectedBook(book);
    setShow(true);
  };

  // ? 'closeOverlay' fonksiyonu overlay'i kapatmak için show state'ini 'false' yapar.

  const closeOverlay = () => {
    setSelectedBook("");
    setShow(false);
  };

  return (
    <>
      <div className="card">
        {books.map((book, key) => (
          <div className="card" key={key} onClick={() => openOverlay(book)}>
            <BookItem currentUser={currentUser} book={book} />
          </div>
        ))}
      </div>
      <BookOverlay book={selectedBook} show={show} onClose={closeOverlay} />
    </>
  );
}

export default BookShow;
