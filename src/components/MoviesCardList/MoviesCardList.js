import { LAPTOR_WIDTH, LARGE_PAGE_ADD_MOVIES_AMOUNT, LARGE_PAGE_MOVIES_AMOUNT, MEDIUM_PAGE_ADD_MOVIES_AMOUNT, MEDIUM_PAGE_MOVIES_AMOUNT, MOBILE_WIDTH, SMALL_PAGE_ADD_MOVIES_AMOUNT, SMALL_PAGE_MOVIES_AMOUNT } from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';

function MoviesCardList({ movies, isSavedMovies, savedMovies,
  searchWord,
  handleIsSavedToogle,
  checkIsSaved,
}) {
  // количество фильмов на странице
  const [amountOfMovies, setAmountOfMovies] = useState(null);

  // расчет количества фильмов на странице в зависимости от ширины окна
  const screenWidth = () => {
    if (window.innerWidth > LAPTOR_WIDTH) {
      setAmountOfMovies(LARGE_PAGE_MOVIES_AMOUNT);
    } else if (window.innerWidth > MOBILE_WIDTH && window.innerWidth < LAPTOR_WIDTH) {
      setAmountOfMovies(MEDIUM_PAGE_MOVIES_AMOUNT);
    } else {
      setAmountOfMovies(SMALL_PAGE_MOVIES_AMOUNT);
    }
  };

  // добавление фильмов при клике на кнопку еще
  const addMovies = () => {
    if (window.innerWidth > LAPTOR_WIDTH) {
      setAmountOfMovies(amountOfMovies + LARGE_PAGE_ADD_MOVIES_AMOUNT);
    } else if (window.innerWidth > MOBILE_WIDTH && window.innerWidth < LAPTOR_WIDTH) {
      setAmountOfMovies(amountOfMovies + MEDIUM_PAGE_ADD_MOVIES_AMOUNT);
    } else {
      setAmountOfMovies(amountOfMovies + SMALL_PAGE_ADD_MOVIES_AMOUNT);
    }
  };

  // расчет изначального количества фильмов на странице и обновление при изменении поиска или ширины экрана
  useEffect(() => {
    screenWidth();
    window.addEventListener("resize", screenWidth);

    return () => {
      window.removeEventListener("resize", screenWidth);
    };
  }, [searchWord]);

  return (
    <section className="cardlist">
      <div className='cardlist__elements'>
        {!isSavedMovies && (Array.isArray(movies)
          ? movies
            .slice(0, amountOfMovies)
            .map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isSavedMovies={isSavedMovies}
                handleIsSavedToogle={handleIsSavedToogle}
                checkIsSaved={checkIsSaved}
              />
            ))
          : <div className="cardlist__text">Ничего не найдено</div>)}
        {isSavedMovies && (Array.isArray(savedMovies)
          ? savedMovies
            .map((savedMovie) => (
              <MoviesCard
                key={savedMovie._id}
                movie={savedMovie}
                isSavedMovies={isSavedMovies}
                handleIsSavedToogle={handleIsSavedToogle}
                checkIsSaved={checkIsSaved}
              />
            ))
          : <div className="cardlist__text">Ничего не найдено</div>)}
      </div>
      {!isSavedMovies && movies.length > amountOfMovies && movies.length > 0 && (
        <button onClick={addMovies} className='cardlist__button-more' type='button'>Ещё</button>
      )}
    </section>
  );
}
export default MoviesCardList;
