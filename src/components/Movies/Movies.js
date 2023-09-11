import './Movies.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies,
  getMovies,
  setMovies,
  loggedIn,
  handleSaveMovie,
  savedMovies,
  handleDeleteMovie, }) {


  const [searchWord, setSearchWord] = useState("");
  const [preloader, setPreloader] = useState(false);
  const [isShorts, setIsShorts] = useState(false);
  //const [moviesSaved, setMoviesSaved] = useState(null);
  const isSavedMovies = false;

  // ДЛЯ КОМПОНЕНТА Movies
  // функция фильтра фильмов
  function handleFilterMovies(movies, movieSearch, isShorts) {
    let filteredMovies;
    //console.log(movies);
    filteredMovies = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().startsWith(movieSearch) && (isShorts ? movie.duration < 40 : movie.duration > 0);
    });
    if (filteredMovies.length === 0) {
      return 'Nothing to find'
    }
    else {
      //console.log(filteredMovies)
      return filteredMovies;
    }
  };

  const filterMovies = useMemo(() => {
    if (searchWord.length === 0) {
      return [];
    }
    return handleFilterMovies(movies, searchWord, isShorts);
  }, [movies, searchWord, isShorts]);

  // функция проверки и отправления запроса к массиву фильмов 
  const findNewMovies = (word, setErrors) => {
    // не проводить повторный поиск, если слово не изменилось
    if (word === searchWord) {
      setErrors((prev) => ({
        ...prev,
        movie: "Вы только что искали этот фильм",
      }));
      return;
    }
    if (movies.length < 1) {
      getMovies(setPreloader);
    }
    setSearchWord(word);
    localStorage.setItem("searchWord", word);
  };

  // ДЛЯ КОМПОНЕНТА MoviesCard
  // поиск фильма в массиве с сохраненными фильмами, чтобы по id была возможность удалить
  // function savedMoviesToggle(movies, isSaved) {
  //   if (isSaved) {
  //     const objFilm = {
  //       image: 'https://api.nomoreparties.co' + film.image.url,
  //       trailer: film.trailerLink,
  //       thumbnail: 'https://api.nomoreparties.co' + film.image.url,
  //       movieId: film.id,
  //       country: film.country || 'Неизвестно',
  //       director: film.director,
  //       duration: film.duration,
  //       year: film.year,
  //       description: film.description,
  //       nameRU: film.nameRU,
  //       nameEN: film.nameEN,
  //     };
  //     try {
  //       await mainApi.addMovies(objFilm);
  //       const newSaved = await mainApi.getMovies();
  //       setFilmsSaved(newSaved);
  //     } catch (err) {
  //       openPopup('Во время добавления фильма произошла ошибка.');
  //     }
  //   } else {
  //     try {
  //       await mainApi.deleteMovies(film._id);
  //       const newSaved = await mainApi.getMovies();
  //       setFilmsSaved(newSaved);
  //     } catch (err) {
  //       openPopup('Во время удаления фильма произошла ошибка.');
  //     }
  //   }
  // }


  const findMovie = useCallback(
    (movie, isSaved) => {
      if (isSaved) {
        return savedMovies.find((item) => {
          return item.nameRU === movie.nameRU;
        });
      }
    },
    [savedMovies]
  );

  // сохранение или удаления фильма по клику
  const handleIsSavedToogle = (e, movie, setIsSaved, isSaved) => {
    e.preventDefault();
    if (!isSaved) {
      handleSaveMovie(movie, setIsSaved);
    } else {
      const deletedMovie = findMovie(movie, isSaved);
      handleDeleteMovie(deletedMovie, setIsSaved);
    }
  };

  // проверяем есть ли фильм в списке сохраненных
  const checkIsSaved = useCallback(
    (movie) => {
      return savedMovies.some((item) => {
        return item.nameRU === movie.nameRU;
      });
    },
    [savedMovies]
  );

  // ДЛЯ КОМПОНЕНТА FilterCheckbox
  // изменение состояния чекбокса
  const handleClickCheckbox = (e) => {
    if (e.target.checked) {
      setIsShorts(true);
      localStorage.setItem("isShorts", true);
    } else {
      setIsShorts(false);
      localStorage.setItem("isShorts", false);
    }
  };

  // ДЛЯ КОМПОНЕНТА SearchForm
  // подстановка текста в инпут из хранилища при перезагрузке
  const putWordInInput = (setValues) => {
    if (localStorage.getItem("searchWord") !== null) {
      setValues((prev) => ({
        ...prev,
        movie: localStorage.getItem("searchWord"),
      }));
    }
  };

  // сохранение строки поиска слова и чекбокса при перезагрузке
  useEffect(() => {
    if (localStorage.getItem("searchWord") !== null) {
      setSearchWord(localStorage.getItem("searchWord"));
    }
    if (localStorage.getItem("isShorts") !== null) {
      if (localStorage.getItem("isShorts") === "true") {
        setIsShorts(true);
      } else {
        setIsShorts(false);
      }
    }

    if (localStorage.getItem("arrayMovies") !== null) {
      setMovies(JSON.parse(localStorage.getItem("arrayMovies")));
    }
  }, [setMovies]);

  return (
    <main className="movies">
      <SearchForm
        findNewMovies={findNewMovies}
        handleClickCheckbox={handleClickCheckbox}
        handlePutWord={putWordInInput}
        isShorts={isShorts}
      // movieSearch={movieSearch}
      // setMovieSearch={setMovieSearch}
      // handleClickCheckbox={handleClickCheckbox}
      // isShorts={isShorts}
      // handleSubmit={handleSubmit}
      />
      <Preloader isVisible={preloader} />
      <MoviesCardList
        movies={filterMovies}
        searchWord={searchWord}
        isSavedMovies={isSavedMovies}
        //savedMoviesToggle={savedMoviesToggle}
        //moviesSaved={moviesSaved}
        handleIsSavedToogle={handleIsSavedToogle}
        checkIsSaved={checkIsSaved}
      />
    </main>
  );
};
export default Movies;