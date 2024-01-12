import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../Styles/LoginPage.css";

function LoginPage({ onLogin }) {
  // ? Kullanıcı adı , şifre ve kullanıcıların bulunduğu statelerim var.
  // ? Şifrenin görünürlüğü için eklediğim visibilityin state durumu var.

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ? Bu fonksiyon, şifre giriş alanındaki metni göster/gizle butonuna tıklandığında şifrenin görünürlüğünü değiştirmek için kullanılır. Eğer showPassword state true ise, metni gizler; false ise, metni gösterir.

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2080/api/v1/users");
        setUsers(response.data.users);
      } catch (err) {
        console.error("Kullanıcıları alırken bir hata oluştu", err);
      }
    };

    fetchUsers();
  }, []);

  // ? Bu fonksiyon, giriş yap butonuna tıklandığında çalışır. users dizisi içinde kullanıcının girdiği kullanıcı adı (username) ve şifre (password) ile eşleşen bir kullanıcı varsa, kullanıcıya başarı mesajı gösterir; aksi takdirde, hata mesajı gösterir.

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:2080/api/v1/users/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.data === "OK") {
        const userMatch = users.find((user) => user.username === username);

        if (userMatch) {
          alert(`Başarıyla giriş yaptınız. Merhaba ${username}`);
          onLogin(userMatch);
          navigate("/home");
        } else {
          alert("Kullanıcı adı veya şifre hatalı");
        }
      } else {
        alert("Giriş yapılamadı. Kullanıcı adı veya şifre hatalı");
      }
    } catch (err) {
      console.error("Giriş yapılırken bir hata oluştu", err);
      alert("Giriş yapılırken bir hata oluştu");
    }
  };

  return (
    <>
      <div className="login-page">
        <h1> Kitap Köşesi</h1>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                maxLength={4}
                onChange={(e) => setPassword(e.target.value)}
              />
              <VisibilityIcon
                className="visibility"
                sx={{ fontSize: 17 }}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="button-container">
            <button className="loginButton" type="submit">
              Giriş Yap
            </button>
            <Link to="/register">
              <button className="loginButton">Üye Ol</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
