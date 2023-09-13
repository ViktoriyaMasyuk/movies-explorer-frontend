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
    if (window.innerWidth > 1270) {
      setAmountOfMovies(12);
    } else if (window.innerWidth > 750 && window.innerWidth < 1270) {
      setAmountOfMovies(8);
    } else {
      setAmountOfMovies(5);
    }
  };

  // добавление фильмов при клике на кнопку еще
  const addMovies = () => {
    if (window.innerWidth > 1270) {
      setAmountOfMovies(amountOfMovies + 3);
    } else {
      setAmountOfMovies(amountOfMovies + 2);
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
      {!isSavedMovies && movies.length > amountOfMovies && (movies.length !== 0) && (
        <button onClick={addMovies} className='cardlist__button-more' type='button'>Ещё</button>
      )}
    </section>
  );
}
export default MoviesCardList;
