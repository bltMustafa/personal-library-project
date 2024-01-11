import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../Styles/Home.css";

import BookShow from "./BookShow";
import searchBook from "../utils/searchBook";

function Home({ currentUser }) {
  // ? Kullanıcının girdiği arama terimini tutar.
  const [search, setSearch] = useState("");
  // ? Kullanıcının arama yapmak istediği kriteri belirtir. (Örneğin, kitap adı veya yazar adı)
  const [searchBy, setSearchBy] = useState("intitle"); // ? Arama sonuçlarını tutar.
  // ? Arama sonuçlarını tutar.
  const [books, setBooks] = useState([]);

  // ? 'useTranslation' hook'u , çoklu dil desteği için kullanılır. 't' fonksiyonu sayesinde çeviri metinlerine erişim sağlanır.

  const { t } = useTranslation();

  // ! handleApiSubmit fonksiyonu arame terimi term ve kriteri ile searchBook fonksiyonunu çağırarak kitapları arar. Sonuç eğer undefined dönerse kullanıcıya uyarı verir. Aksi takdirde aradığımız da bulunan kitapların durumu setBooks ile güncellenir.

  const handleApiSubmit = async (term) => {
    const result = await searchBook(term, searchBy);
    if (result === undefined) {
      alert("Hiçbir kitap bulunamadı. Lütfen farklı bir arama terimi deneyin.");
    } else {
      setBooks(result || []);
    }
  };

  // ! 'handleFormSubmit' fonksiyonu formun gönderimini ele alır.Eğer arama terimi boş ise kullanıcıya uyarı verir, aksi takdirde 'handleApiSubmit' fonksiyonunu döndürür.

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    search.trim() === ""
      ? alert("Lütfen Kitap Başlığı giriniz.")
      : await handleApiSubmit(search);
  };

  // ! 'handleSearchByChange' arama kriterleri değiştiğinde çağırılır ve 'setSearchBy' ile 'searchBy'state'i güncellenir.

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  // ! handleSubmit fonksiyonu input alanındaki değeri takip ederek 'setSearch' state'ini günceller.
  const handleSubmit = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container">
      <h1> {t("BOOK_NAME")} </h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={t("BOOK_INFO")}
          value={search}
          onChange={handleSubmit}
        />

        <select
          value={searchBy}
          onChange={handleSearchByChange}
          className="container-select"
        >
          <option value="intitle"> {t("OPTION_NAME")} </option>
          <option value="inauthor"> {t("AUTHOR_NAME")} </option>
        </select>
      </form>
      <BookShow currentUser={currentUser} books={books} />
    </div>
  );
}

export default Home;
