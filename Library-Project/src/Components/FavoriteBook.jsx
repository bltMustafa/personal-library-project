import React, { useEffect, useState, Suspense } from "react";
// ? React kütüphanesinden 'React' , 'useEffect' , 'useState' , 'Suspense' React kütüphanesinden içe aktarılır.

import { useTranslation } from "react-i18next";
// ? useTranslation hook'u, çok dilli destek için react-i18next kütüphanesinden içe aktarılır.

import axios from "axios";
import BookmarkRemove from "@mui/icons-material/BookmarkRemove";
import Loading from "./Loading";
// ? 'BookmarkRemove' ikonu, Material-UI kütüphanesinden içe aktarılır.

function FavoriteBook({ currentUser }) {
  // ? 'favoriteBooks' kullanıcının favori kitaplarını içeren bir dizi. 'loading' verilerin yüklenip yüklenmediğini kontrol eden bir durumdur

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ? useTranslation hook'u, çok dilli destek için kullanılır. t fonksiyonu, çeviri yapmak için kullanılır.
  const { t } = useTranslation();

  // ? API URL'si, favori kitaplarla ilgili verileri getirmek veya silmek için kullanılır.

  // ? fetchFavoriteBooks -> 'axios' kullanarak favori kitapları getiren asenkron bir fonksiyon , veri alındığında setLoading durumu güncelleyerek ve yüklenme durumunu 'false' olarak ayarlayarak bileşenin yeniden render edilmesini sağlar.

  const fetchFavoriteBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2080/api/v1/users/${currentUser.id}`
      );

      if (response.status === 200) {
        setFavoriteBooks(response.data.data.favoriteBooks);
        console.log(response.data.data.favoriteBooks);
        setLoading(false);
      } else {
        console.error("Favori kitaplar alınırken bir hata oluştu");
        setLoading(false);
      }
    } catch (error) {
      console.error("Favori kitaplar alınırken bir hata oluştu:", error);
      setLoading(false);
    }
  };

  // ? 'useEffect' bileşenin ilk render edildiğinde 'fetchFavoriteBooks' fonksiyonunu çağırır.

  useEffect(() => {
    fetchFavoriteBooks();
  }, []);

  // ? handleDeleteClick fonksiyonu --> Belirli bir kitabı favorilerden kaldırmak için kullanılan asenkron bir fonksiyon başarılı bir şekilde kaldırıldığında , state'i günceller ve kitabı favorilerden filtreler.

  const handleDeleteClick = async (userID, bookID) => {
    try {
      const response = await axios.delete(
        `http://localhost:2080/api/v1/users/${userID}/books/${bookID}`
      );

      if (response.status === 204) {
        setFavoriteBooks((prevFavoriteBooks) =>
          prevFavoriteBooks.filter((book) => book.id !== bookID)
        );
      } else {
        console.error("Kitap silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Kitap silinirken bir hata oluştu.", error);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="container">
        <h1>{t("FAV_BOOK")} </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="card">
            {favoriteBooks.map((book, key) => (
              <div className="book-card" key={book.id}>
                <h5>{book.title}</h5>
                <img src={book.thumbnail} alt={book.title} />

                <button
                  onClick={() => handleDeleteClick(currentUser.id, book.id)}
                  className="remove-button"
                >
                  <BookmarkRemove />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
}

// ? `Suspense` bileşeni , dinamik olaran yüklenen bileşenlerin ve verilerin yüklenmesini beklerken belirli bir yedek içeriği göstermek için kullanılır.
// ? 'favoriteBook' bileşeni dinamik olarak yüklenirken 'Suspense' bileşeni bu yüklemeyi bekler. 'Loading' fonksiyonu yüklenirken gösterilecek yedek içeriği belirtir.

<Loading />;

export default FavoriteBook;
