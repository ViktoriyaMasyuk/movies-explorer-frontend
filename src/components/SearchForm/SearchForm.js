import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import React from 'react';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__container'>
          <input
            className='search__input'
            name='search-input'
            id='search-input'
            type='text'
            size='25'
            minLength="2"
            maxLength="30"
            required
            placeholder="Фильм">
          </input>
          <button className='search__button button__hover' type='submit'>Поиск</button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};
export default SearchForm;