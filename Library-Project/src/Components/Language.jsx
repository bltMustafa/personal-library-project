import React from "react";
import "../Styles/Language.css";

import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function Language() {
  const { t, i18n } = useTranslation();


  // ? 'toggleLanguage' fonksiyonu, butonu tıklandığında mevcut dilin tersine çevrilmesini sağlar.

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLanguage);
  };

  // ? Button bileşeni, dil değiştirme işlevini gerçekleştiren 'toggleLanguage' fonksiyonunu tetikleyen bir button içerir.

  return (
    <div className="language_button">
      <Button
        color="secondary"
        size="small"
        variant="filled"
        onClick={toggleLanguage}
      >
        {i18n.language}
      </Button>
    </div>
  );
}

export default Language;
