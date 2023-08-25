import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import React from 'react';

function MoviesCardList() {
    return (
        <section className='cardlist'>
            <div className='cardlist__elements'>
                <MoviesCard />
            </div>
            <button className='cardlist__button-more' type='button'>Ещё</button>
        </section>
    );
}
export default MoviesCardList;