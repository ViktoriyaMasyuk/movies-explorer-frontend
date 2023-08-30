import './Movies.css';
import React, { Suspense } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <Suspense fallback={<Preloader />}>
        <MoviesCardList />
      </Suspense>
    </main>
  );
};
export default Movies;