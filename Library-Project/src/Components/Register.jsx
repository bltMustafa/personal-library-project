import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
// ? VisibilityIcon, parola görünürlüğünü değiştirmek için Material-UI kütüphanesinden içe aktarılır.
import "../Styles/Register.css";
// ? CSS dosyalarını içe aktarılır.

function Register() {
  // ? 'showPassword' -> Parolanın görüntülenip görüntülenmeyeceği durumu yönetir. State ilk değerini false olarak başlatılır.

  const [showPassword, setShowPassword] = useState(false);

  // ? 'username' , 'password' , 'phoneNumber' -> Kullanıcının girdiği kullanıcı adı , parola , telefon numaralarını saklar.

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [phoneNumber, setPhoneNumber] = useState("");

  // ? 'togglePasswordVisibility' fonksiyonu 'showPassword' false olan değerini tam tersi değerine gelmesine sağlar. state durumu ne ise o an ki durumun zıt haline gelir.

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ? 'handleRegister', fonksiyonu localdaki API'ye yeni üye olan kişilerin bilgililerini yeni kişi oluşturmak için post isteği atıyor. Eğer başarılı bir şekilde üye olunulursa alert ile 'Başarılı bir şekilde üye oldunuz' mesajı bizi karşılıyor ve yeni üye olan kişinin adı ile karşılıyorum.

  // ? async - await kullanımı ->  Asenkron işlemleri kullanıcıdan veri almak , sunucuya veri göndermek gibi durumlarda kullanılır ve işlemin tamamlanması beklerken uygulamanın diğer işlevselliğini durdurmadan devam etmesine olanak tanır.

  // * try - catch bloğu -> `try` asenkron işlemlerin, hata olasığı olan kodların bulunan bloktur. `catch` hata durumunda işlenen kod bloğudur.

  // ? Asenkron : Bir işlemin başlatıldığı anda tamamlanmasını beklemeksizin diğer işlemlere devam edilebilmesini ifade eder. Örnek olarak ağ üzerinden bir HTTP isteği yapmak asenkron bir işlemdir. Bu isteğin tamamlanması zaman alabilir, ancak bu süreçte uygulama başka işlemleri gerçekleştirebilir,

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2080/api/v1/users", {
        username,
        password,
      });
      alert(
        `Başarılı bir şekilde üye oldunuz. Merhaba ${response.data.data.username} `
      );
    } catch (err) {
      console.error("Kayıt başarısız..!! : ", err);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h1>Üye Ol</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PIN"
              maxLength={4}
              onChange={(e) => setPassword(e.target.value)}
            />
            <VisibilityIcon
              className="visibility-icon"
              sx={{ fontSize: 17 }}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        {/* Maybe later */}
        {/*   <div className="form-group">
          <input
            type="text"
            placeholder="Telefon Numarası"
            maxLength="15"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
     </div> */}
        <div className="button-container">
          <Link to="/">
            <button className="loginButton"> Giriş Yap </button>
          </Link>
          <button type="submit" className="loginButton">
            Üye Ol
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
