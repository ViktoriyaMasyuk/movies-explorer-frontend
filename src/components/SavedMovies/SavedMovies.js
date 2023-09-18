import './SavedMovies.css';
import React, { useCallback, useMemo, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect } from 'react';
import { MAX_DURATION_SHORTS } from '../../utils/constants';

function SavedMovies({ savedMovies, handleDeleteMovie }) {
  const isSavedMovies = true;
  const [searchWordSavedMovies, setSearchWordSavedMovies] = useState("");
  const [isShortsSavedMovies, setIsShortsSavedMovies] = useState(false);

  // функция фильтра фильмов
  function handleFilterMovies(savedMovies, movieSearchSavedMovies, isShortsSavedMovies) {
    let filteredMovies;
    filteredMovies = savedMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().trim().includes(movieSearchSavedMovies.trim().toLowerCase()) && (isShortsSavedMovies ? movie.duration < MAX_DURATION_SHORTS : movie.duration > 0);
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
      return savedMovies;
    }
    return handleFilterMovies(savedMovies, searchWordSavedMovies, isShortsSavedMovies);
  }, [savedMovies, searchWordSavedMovies, isShortsSavedMovies]);

  // функция проверки и отправления запроса к массиву фильмов 
  const findNewMovies = (word) => {
    setSearchWordSavedMovies(word);
  };

  // MoviesCard: поиск в списке сохраненых фильмов
  const handleOnClick = (event, movie, setIsSaved) => {
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

  // сохранение строки поиска слова и чекбокса при перезагрузке
  useEffect(() => {
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
        isShorts={isShortsSavedMovies}
        setIsShorts={setIsShortsSavedMovies}
        isSavedMovies={isSavedMovies}
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