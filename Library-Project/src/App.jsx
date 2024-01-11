import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Components/Home";
import Explore from "./Components/Explore";
import FavoriteBook from "./Components/FavoriteBook";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";

import "./App.css";

function App() {
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showNavbarAndFooterFunc = (user) => {
    setCurrentUser(user);
    setShowNavbarAndFooter(true);
  };

  return (
    <div>
      {showNavbarAndFooter && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLogin={showNavbarAndFooterFunc} />}
        />
        <Route path="/register" element={<Register />} />
        {showNavbarAndFooter && (
          <>
            <Route path="/home" element={<Home currentUser={currentUser} />} />
            <Route
              path="/explore"
              element={<Explore currentUser={currentUser} />}
            />
            <Route
              path="/favorite"
              element={<FavoriteBook currentUser={currentUser} />}
            />
          </>
        )}
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
