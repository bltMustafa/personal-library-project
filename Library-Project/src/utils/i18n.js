import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  tr: {
    translation: {
      Home: "Anasayfa",
      BOOK_NAME: "Kitap Köşesi",
      Discover: "Keşfet",
      FAVORITE_BOOK: "Favorilerim",
      ADAGE: "Kitap kadar sadık bir arkadaş yoktur",
      BOOK_INFO: "Kitap Adı Giriniz...",
      OPTION_NAME: "Kitap Adı",
      AUTHOR_NAME: "Yazar Adı",
      FAV_BOOK: "Favori Kitaplarım",
      KİDS_BOOK: "Çocuk Gelişim Kitapları",
      TRAVEL_BOOK: "Seyahat Kitapları",
      COMPUTER_BOOK: "Bilgisayar Kitapları",
    },
  },
  en: {
    translation: {
      Anasayfa: "Home",
      BOOK_NAME: "Book Corner",
      Keşfet: "Discover",
      FAVORITE_BOOK: "Favorite Book",
      ADAGE: "There is no friend as loyal as a book",
      BOOK_INFO: "Please Enter Book Name ... ",
      OPTION_NAME: "Book Name",
      AUTHOR_NAME: "Author Name",
      FAV_BOOK: "Favorites Books",
      KİDS_BOOK: "Child Development Books",
      TRAVEL_BOOK: "Travel Books",
      COMPUTER_BOOK: "Computer Books",
    },
  },
};

i18n.use(initReactI18next).init({
  lng: "tr",
  resources,
});

export default i18n;
