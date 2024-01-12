import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../Styles/BookOverlay.css";

// ? BookOverlay bileşeni seçilen kitabın ayrıntılarını gösteren bir overlay (açılır pencere) oluşturur. Bileşen,'book' propu aracılığıyla gelen kitap bilgilerini, 'onClose' prop'u ile overlay'i kapatma işlevini ve 'show' prop'u ile overlay'in görünüp görünmediğini kontrol etmek için kullanılır.

function BookOverlay({ book, onClose, show }) {
  // ? Bileşen 'show' prop'u 'false' veya 'book' prop'u 'null' ise 'null' döndürülerek görünmez hale gelir.Yani, overlay'in görünürlüğü 'show' prop'u ile kontrol edilir ve 'book' prop'u mevcut değilse veya boşsa overlay gösterilmez.

  if (!show || !book) return null;

  // ? Resim url kısmını ayarladım.

  const thumbnail =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <CloseIcon></CloseIcon>
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt={book.volumeInfo.title} />
            <div className="info">
              <h2>{book.volumeInfo.title}</h2>
              <h3>{book.volumeInfo.authors}</h3>
              <a href={book.volumeInfo.previewLink} target="_blank">
                <button>Detaylı Oku</button>
              </a>
            </div>
          </div>
          <h4 className="description">{book.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  );
}

export default BookOverlay;
