import "../Styles/Navbar.css";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Language from "./Language";

// * Navbar codes

function Navbar() {
  // ?  'useTranslation' hook'u çoklu dil desteği için kullanılır.'t' fonksiyonu sayesinde çeviri metinlerine erişim sağlanır.

  const { t } = useTranslation();

  // ? 'Link' bileşeni , React Router'daki bağlantılar için kullanılır. Sayfalar arasında gezinme sağlar.

  return (
    <div className="navbar">
      <div className="main">
        <Link to="/home"> {t("Anasayfa")} </Link>
        <div className="mainLink">
          <Link to="/explore"> {t("Keşfet")} </Link>
          <Link to="/favorite"> {t("FAVORITE_BOOK")} </Link>
          <Language />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
