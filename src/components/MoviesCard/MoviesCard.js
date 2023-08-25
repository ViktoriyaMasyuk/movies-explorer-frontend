import './MoviesCard.css';
import React from 'react';
import photo from '../../images/pic__COLOR_pic.svg';
import photo2 from '../../images/ pic__COLOR_pic-2.png';
import photo3 from '../../images/pic__COLOR_pic-3.png';

function MoviesCard() {
    return (
        <>
            <template id="card">
                <div className='card'>
                    <div className='card__info'>
                        <h2 className='card__title'>В погоне за Бенкси</h2>
                        <p className='card__duration'>27 минут</p>
                    </div>
                    <img className='card__image' alt='Заставка фильма' src={photo} />
                    <button className='card__button' type='submit'>Сохранить</button>
                </div>
            </template>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo2} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo3} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo2} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo3} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo2} />
                <button className='card__button' type='submit'></button>
            </div>
            <div className='card'>
                <div className='card__info'>
                    <h2 className='card__title'>В погоне за Бенкси</h2>
                    <p className='card__duration'>27 минут</p>
                </div>
                <img className='card__image' alt='Заставка фильма' src={photo} />
                <button className='card__button' type='submit'></button>
            </div>

        </>

    );
};
export default MoviesCard;