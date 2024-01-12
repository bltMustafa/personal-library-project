import axios from "axios";
import BookItem from "./BookItem";
import { useTranslation } from "react-i18next";

import "../Styles/Explore.css";
import React, { useEffect, useState, Suspense } from "react";
import Loading from "./Loading";

function Explore({ currentUser }) {
  // ? 'Explore' bileşeni , üç farklı kategorideki kitapları çekmek için üç ayrı fonksiyon ('fetchMagazinData', 'fetchTravelData', 'fetchSelfImprovementData') ve bu kitapları depolamak için üç ayrı durum ('magazinData' , 'travelData', 'childsBooksData') içerir.

  const [magazinData, setMagazinData] = useState([]);
  const [travelData, setTravelData] = useState([]);
  const [childBooks, setChildBooks] = useState([]);

  const { t } = useTranslation();

  const API_KEY = "AIzaSyBfvcfm0g1JIZNKGay2q2qifZULH9cR1E4";

  // ? Google Books API istek ve durum güncellemesi
  const fetchMagazinData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=wifi&printType=magazines&key=${API_KEY}&maxResults=4`
      );
      const magazinData = response.data.items;
      setMagazinData(magazinData);
    } catch (error) {
      console.error("Hatalı API isteği : " + error);
    }
  };

  // ? Google Books API istek ve durum güncellemesi

  const fetchChildBooksData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=children&printType=books&key=${API_KEY}&maxResults=4`
      );
      const childBooksData = response.data.items;
      setChildBooks(childBooksData);
    } catch (error) {
      console.error("Hatalı API isteği : " + error);
    }
  };

  // ? Google Books API istek ve durum güncellemesi
  const fetchTravelData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=travel&printType=books&key=${API_KEY}&maxResults=4`
      );
      const travelData = response.data.items;
      setTravelData(travelData);
    } catch (error) {
      console.error("Hatalı API isteği : " + error);
    }
  };

  // ? 'useEffect' hook'u bileşenin ilk render edildiğinde ('[]' boş bağımlılık dizisi nedeniyle) belirli ketegorilerdeki kitapları çeken fonksiyonları çağırır.

  useEffect(() => {
    fetchMagazinData();
    fetchChildBooksData();
    fetchTravelData();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <h1 className="title"> {t("KİDS_BOOK")} </h1>
      <div className="card">
        {childBooks.map((book, key) => (
          <BookItem currentUser={currentUser} book={book} key={key} />
        ))}
      </div>

      <h1 className="title"> {t("TRAVEL_BOOK")} </h1>
      <div className="card">
        {travelData.map((book, key) => (
          <BookItem currentUser={currentUser} book={book} key={key} />
        ))}
      </div>

      <h1 className="title"> {t("COMPUTER_BOOK")} </h1>
      <div className="card">
        {magazinData.map((book, key) => (
          <BookItem currentUser={currentUser} book={book} key={key} />
        ))}
      </div>
    </Suspense>
  );
}
<Loading />;

export default Explore;
