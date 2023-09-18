import "./App.css";
import '../Header/Header'
import Main from "../Main/Main";
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesApi from "../../utils/MoviesApi";
import * as Auth from "../../utils/Auth";
import MainApi from "../../utils/MainApi";
import Popup from "../Popup/Popup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute.js/ProtectedRoute";
import { SERVER_URL } from "../../utils/constants";

function App() {
  // попап навигации шапки
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  // массив всех фильмов
  const [movies, setMovies] = useState([]);
  // массив сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  // попап ответа api при авторизации и аутентификации
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [popupText, setPopupText] = useState('');
  //статус входа в систему пользователя
  const [isLoggedIn, setLoggedIn] = useState(false);
  //информация о пользователе
  const [currentUser, setCurrentUser] = useState({});
  // хук местоположения Url для шапки
  const { pathname } = useLocation();
  //навигация
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      if (pathname === "/signup" || pathname === "/signin") {
        navigate("/movies");
      } else {
        navigate(pathname);
      }
    }
  }, [token, navigate, pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
      getSavedMovies();
    }
  }, [isLoggedIn]);

  function getUserInfo() {
    MainApi.getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser.data);
      })
      .catch((err) => {
        handleOpenInfoTooltip(`Ошибка сервера ${err}`);
      });
  }

  function getSavedMovies() {
    MainApi.getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        handleOpenInfoTooltip(`Ошибка сервера ${err}`);
      });
  }

  // открытие и закрытие попапа навигации
  function handleEditNavBarClick() {
    setIsNavPopupOpen(true);
  }
  function handleCloseNavPopup() {
    setIsNavPopupOpen(false);
  }
  // открытие и закрытие попапа навигации итога авторизации и навигации
  function handleOpenInfoTooltip(text) {
    setPopupText(text);
    setInfoTooltip(true);
  }
  function handleClosePopup() {
    setInfoTooltip(false);
    setPopupText('');
  }
  // функция изменения статуса логина
  function handleLogin() {
    setLoggedIn(true);
  }

  //функция получения всех фильмов
  const handleGetAllMovies = (preloader) => {
    preloader(true);
    MoviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        localStorage.setItem("arrayMovies", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        handleOpenInfoTooltip(`Ошибка сервера ${err}`);
      })
      .finally(() => {
        preloader(false);
      });
  };

  // регистрация пользователя
  function handleRegisterUser(data) {
    Auth.register(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        handleLogin();
        handleOpenInfoTooltip('Вы успешно зарегистрировались!');
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        navigate("/sign-up");
        handleOpenInfoTooltip('Ошибка авторизации.');
        console.log(err);
      })
  }

  // авторизация пользователя
  function handleAuthorizationUser(data) {
    Auth.authorize(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        handleLogin();
        handleOpenInfoTooltip('Вы успешно авторизовались!');
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        navigate("/sign-in");
        handleOpenInfoTooltip('Ошибка авторизации.');
        console.log(err);
      })
  }

  // функция выхода из аккаунта
  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
    localStorage.removeItem('jwt');
    localStorage.removeItem('arrayMovies');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('searchWord');
    localStorage.removeItem('isShortsSavedMovies');
  }
  // функция обновления данных профиля
  function handleUpdateUser(name, email) {
    MainApi.updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        handleOpenInfoTooltip('Вы успешно изменили данные профиля!');
      })
      .catch((err) => {
        handleOpenInfoTooltip('Пользователя обновить не получилось');
      })
  }

  // функция сохранения фильма
  const handleSaveMovie = (movie, setIsSaved) => {
    const objMovie = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: SERVER_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: SERVER_URL + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    MainApi
      .saveMovies(objMovie)
      .then((objMovie) => {
        setSavedMovies([objMovie, ...savedMovies]);
      })
      .then(() => {
        setIsSaved(true);
      })
      .catch((err) => {
        handleOpenInfoTooltip(`Ошибка сервера ${err}`);
      });
  };

  // функция удаления фильма
  const handleDeleteMovie = (movie, setIsSaved) => {
    MainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id && c));
      })
      .then(() => {
        setIsSaved(false);
      })
      .catch((err) => {
        handleOpenInfoTooltip(`Ошибка сервера ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {pathname === '/' || pathname === '/saved-movies' || pathname === '/movies' || pathname === '/profile' ?
          <Header
            isOpen={isNavPopupOpen}
            onClose={handleCloseNavPopup}
            onEditNavPopup={handleEditNavBarClick}
            isLoggedIn={isLoggedIn}
          /> : ''}
        <Routes>
          <Route path='/' element={
            <Main />} />
          <Route path='/movies/*' element={
            <ProtectedRouteElement
              element={Movies}
              movies={movies}
              getMovies={handleGetAllMovies}
              setMovies={setMovies}
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
            />} />
          <Route path='/saved-movies/*' element={
            <ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              handleDeleteMovie={handleDeleteMovie}
            />} />
          <Route path='/profile/*' element={
            <ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              onSignOut={signOut}
              onUpdateUser={handleUpdateUser}
            />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path="/sign-up"
            element={isLoggedIn ? <Navigate to='/movies' /> : <Register
              onRegister={handleRegisterUser}
            />}
          />
          <Route
            path="/sign-in"
            element={isLoggedIn ? <Navigate to='/movies' /> : <Login
              onLogin={handleAuthorizationUser}
            />}
          />
        </Routes>
        {pathname === '/' || pathname === '/saved-movies' || pathname === '/movies' ?
          <Footer /> : ''}
        <Popup
          text={popupText}
          isOpen={infoTooltip}
          onClose={handleClosePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
