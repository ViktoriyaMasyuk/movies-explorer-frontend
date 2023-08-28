import "./App.css";
import '../Header/Header'
import Main from "../Main/Main";
import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  const [isNavPopupOpen, setIsNavPopupOpen] =
    useState(false);

  function handleEditNavBarClick() {
    setIsNavPopupOpen(true);
  }

  function handleClosePopup() {
    setIsNavPopupOpen(false);
  }

  const { pathname } = useLocation();

  return (
    <div className='App'>
      { pathname === '/' || pathname === '/saved-movies' || pathname === '/movies' || pathname === '/profile' ?
        <Header
          isOpen={isNavPopupOpen}
          onClose={handleClosePopup}
          onEditNavPopup={handleEditNavBarClick}
        /> : ''}
      <Routes>

        <Route path='/' element={
          <Main
            isOpen={isNavPopupOpen}
            onClose={handleClosePopup}
            onEditNavPopup={handleEditNavBarClick}
          />} />
        <Route path='/movies/*' element={
          <Movies
            isOpen={isNavPopupOpen}
            onClose={handleClosePopup}
            onEditNavPopup={handleEditNavBarClick}
          />} />
        <Route path='/saved-movies/*' element={
          <SavedMovies
            isOpen={isNavPopupOpen}
            onClose={handleClosePopup}
            onEditNavPopup={handleEditNavBarClick}
          />} />
        <Route path='/profile/*' element={
          <Profile
            isOpen={isNavPopupOpen}
            onClose={handleClosePopup}
            onEditNavPopup={handleEditNavBarClick}
          />} />

        <Route path='*' element={<NotFound />} />
        <Route
          path="/sign-up"
          element={<Register />}
        />
        <Route
          path="/sign-in"
          element={<Login />}
        />
        <Route
          path="/error"
          element={<Login />}
        />
      </Routes>
      {pathname === '/' || pathname === '/saved-movies' || pathname === '/movies' ?
        <Footer /> : ''}

    </div>
  );
}

export default App;
