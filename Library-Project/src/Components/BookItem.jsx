import React, { useState } from "react";

import { BookmarkAdd } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import axios from "axios";
import "../Styles/BookItem.css";

function BookItem({ book, isFavorite, currentUser }) {
  // ? Kitabın favorilere eklenip eklenmediği kontrol eden state.

  const [isBookmarked, setIsBookmarked] = useState(isFavorite);

  // ? handleFavoriteClick fonksiyonu favori butonuna tıklandığında tetiklenir.Bu fonksiyon, olayın yayılmasını durdurur.Favori butonunun ikonu, 'isBookmarked' state'ine bağlı olarak değişir. Eğer kitap favorilere eklenmişse, 'BookmarkAdd' ikonu görünür aksi takdirde, 'BookmarkBorderIcon' ikonu görünür

  const handleFavoriteClick = async (event) => {
    try {
      const userID = currentUser.id;
      console.log(userID);

      event.stopPropagation();

      if (typeof book !== "string" && book.volumeInfo) {
        const title = book.volumeInfo.title;
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
 
        if (title && thumbnail) {
          const favoriteBook = {
            title,
            thumbnail,
          };

          await axios.post(
            `http://localhost:2080/api/v1/users/${userID}/books`,
            favoriteBook
          );

          setIsBookmarked(!isBookmarked);
        }
      }
    } catch (error) {
      console.error("An error occurred while adding the book.", error);
    }
  };

  // ? Kitap bilgileri, book prop'u aracılığıyla alınır. Eğer book bir dize ise, sadece bu dize gösterilir. Aksi takdirde, kitap bilgileri (resim, başlık) gösterilir.

  return (
    <>
      <div className="book-card">
        <div>
          {typeof book === "string" ? (
            <h5>{book}</h5>
          ) : (
            <>
              {book.volumeInfo && book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
              )}
              <h5> {book.volumeInfo?.title} </h5>
              <button onClick={handleFavoriteClick} className="favorite-button">
                {isBookmarked ? <BookmarkAdd /> : <BookmarkBorderIcon />}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BookItem;
