// ? Material-UI Icons İmportları
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import { useTranslation } from "react-i18next";

import "../Styles/Footer.css";

// ? Footer componenti sayfa altında yer alan sosyal medya ikonları ve alıntı içeren bir altbilgiyi temsil eder.

import React from "react";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div>
        <hr />
      </div>
      <div className="social-media">
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
      </div>
      <p> {t("ADAGE")} </p>
      <span> - Ernest Hemingway</span>
    </div>
  );
}

export default Footer;
