import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import React, { useEffect, useState } from 'react';

function MoviesCardList({ movies, isSavedMovies,
  searchWord,
  handleIsSavedToogle,
  checkIsSaved
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

  // добавление фильмов при клике на кнопку ЕЩЁ
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

    // window.addEventListener("resize", resizeThrottler, false);
  
    // function resizeThrottler() {
    //   let resizeTimeout;
    //   if ( !resizeTimeout ) {
    //     resizeTimeout = setTimeout(function() {
    //       resizeTimeout = null;
    //       screenWidth();
    //      }, 10);
    //   }
    // }
  }, [searchWord]);

  return (
    <section className="cardlist">
      <div className='cardlist__elements'>
          {Array.isArray(movies)
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
            : <div className="cardlist__text">Ничего не найдено</div>}
        {/* {isSavedMovies &&
          movies.map((movie) => (
            <MoviesCard
            key={movie.id}
            movie={movie}
              isSavedMovies={isSavedMovies}
              //handleOnClick={handleOnClick}
              //checkIsSaved={checkIsSaved}
            />
          ))} */}
      </div>
      {!isSavedMovies && movies.length > amountOfMovies && (movies.length !== 0) && (
        <button onClick={addMovies} className='cardlist__button-more' type='button'>Ещё</button>
      )}
    </section>
  );
}
export default MoviesCardList;