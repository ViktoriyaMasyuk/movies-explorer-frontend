import "./App.css";
import '../Header/Header'
import Main from "../Main/Main";
import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

  // проверка токена авторизации
  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleLogin();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([currentUser, savedMovies]) => {
          console.log(currentUser)
          console.log(savedMovies)
          setCurrentUser(currentUser.data);
          setSavedMovies(savedMovies);
          console.log(savedMovies)
        })
        .catch((err) => {
          console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
        });
    }
  }, [isLoggedIn]);

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
    //console.log(data);
    Auth.authorize(data)
      .then((res) => {
        console.log(res);
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
    navigate("/sign-in");
    localStorage.removeItem('jwt');
    localStorage.removeItem('arrayMovies');
    localStorage.removeItem('isShorts');
    localStorage.removeItem('searchWord');
    localStorage.removeItem('searchWordSavedMovies');
    localStorage.removeItem('isShortsSavedMovies');
  }
  // функция обновления данных профиля
  function handleUpdateUser(name, email) {
    console.log(name, email);
    MainApi.updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        handleOpenInfoTooltip('Вы успешно изменили данные профиля!');
      })
      .catch((err) => {
        handleOpenInfoTooltip('Произошла ошибка!');
        console.log(err);
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
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    console.log(objMovie);
    MainApi
      .saveMovies(objMovie)
      .then((objMovie) => {
        setSavedMovies([objMovie, ...savedMovies]);
      })
      .then(() => {
        setIsSaved(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // функция удаления фильма
  const handleDeleteMovie = (movie, setIsSaved) => {
    console.log(movie)
    MainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id && c));
      })
      .then(() => {
        setIsSaved(false);
      })
      .catch((err) => {
        alert(err.message);
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
            element={<Register
              onRegister={handleRegisterUser}
            />}
          />
          <Route
            path="/sign-in"
            element={<Login
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
