import './SavedMovies.css';
import React, { useCallback, useMemo, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';

function SavedMovies({ savedMovies, handleDeleteMovie }) {
  const isSavedMovies = true;
  const [searchWordSavedMovies, setSearchWordSavedMovies] = useState("");
  const [isShortsSavedMovies, setIsShortsSavedMovies] = useState(false);

  // функция фильтра фильмов
  function handleFilterMovies(savedMovies, movieSearchSavedMovies, isShortsSavedMovies) {
    let filteredMovies;
    console.log('in filter func')
    console.log(savedMovies);
    filteredMovies = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().startsWith(movieSearchSavedMovies.trim().toLowerCase()) && (isShortsSavedMovies ? movie.duration < 40 : movie.duration > 0);
    });
    if (filteredMovies.length === 0) {
      return 'Nothing to find'
    }
    else {
      return filteredMovies;
    }
  };

  const filterMovies = useMemo(() => {
    if (searchWordSavedMovies.length === 0 &&
      isShortsSavedMovies === false) {
      console.log('in filterMOvies')
      console.log(savedMovies)
      return savedMovies;
    }
    return handleFilterMovies(savedMovies, searchWordSavedMovies, isShortsSavedMovies);
  }, [savedMovies, searchWordSavedMovies, isShortsSavedMovies]);

  // функция проверки и отправления запроса к массиву фильмов 
  const findNewMovies = (word, setErrors) => {
    // не проводить повторный поиск, если слово не изменилось
    if (word === searchWordSavedMovies) {
      setErrors((prev) => ({
        ...prev,
        movie: "Вы только что искали этот фильм",
      }));
      return;
    }
    setSearchWordSavedMovies(word);
    localStorage.setItem("searchWordSavedMovies", word);
  };

  // MoviesCard: поиск в списке сохраненых фильмов
  const handleOnClick = (event, movie, setIsSaved) => {
    console.log(movie);
    event.preventDefault();
    handleDeleteMovie(movie, setIsSaved);
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

  // изменение состояния чекбокса
  const handleClickCheckbox = (e) => {
    if (e.target.checked) {
      setIsShortsSavedMovies(true);
      localStorage.setItem("isShortsSavedMovies", true);
    } else {
      setIsShortsSavedMovies(false);
      localStorage.setItem("isShortsSavedMovies", false);
    }
  };

  // подстановка текста в инпут из хранилища при перезагрузке
  const putWordInInput = (setValues) => {
    if (localStorage.getItem("searchWordSavedMovies") !== null) {
      setValues((prev) => ({
        ...prev,
        movie: localStorage.getItem("searchWordSavedMovies"),
        //movie: '',
      }));
    }
  };

  // сохранение строки поиска слова и чекбокса при перезагрузке
  useEffect(() => {
    if (localStorage.getItem("searchWordSavedMovies") !== null) {
      setSearchWordSavedMovies(localStorage.getItem("searchWordSavedMovies"));
    }
    if (localStorage.getItem("isShortsSavedMovies") !== null) {
      if (localStorage.getItem("isShortsSavedMovies") === "true") {
        setIsShortsSavedMovies(true);
      } else {
        setIsShortsSavedMovies(false);
      }
    }
  }, []);


  return (
    <main className="movies">
      <SearchForm
        findNewMovies={findNewMovies}
        handleClickCheckbox={handleClickCheckbox}
        handlePutWord={putWordInInput}
        isShorts={isShortsSavedMovies}
      />
      <MoviesCardList
        savedMovies={filterMovies}
        searchWord={searchWordSavedMovies}
        isSavedMovies={isSavedMovies}
        handleIsSavedToogle={handleOnClick}
        checkIsSaved={checkIsSaved}
      />
    </main>
  );
};
export default SavedMovies;