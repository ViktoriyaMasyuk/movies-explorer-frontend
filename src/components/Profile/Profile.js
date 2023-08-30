import './Profile.css';
import React from 'react';

function Profile() {
    return (
        <>
            <section className='profile'>
                <h1 className='profile__title'>Привет, Виктория!</h1>
                <form className='profile__form'>
                    <div className='profile__info profile__info__top'>
                        <p className='profile__text'>Имя</p>
                        <input
                            className='profile__input profile__name-input form__name'
                            name="name"
                            id="name-input"
                            type="text"
                            size="15"
                            minLength="2"
                            maxLength="40"
                            required
                            value={'Виктория'}
                        />
                    </div>
                    <div className='profile__info'>
                        <p className='profile__text'>E-mail</p>
                        <input
                            className='profile__input profile__email-input form__email'
                            name="email"
                            id="email-input"
                            type="email"
                            autoComplete="email"
                            size="30"
                            minLength="2"
                            maxLength="30"
                            required
                            value={'admin@admin.com'}
                        />
                    </div>
                </form>
                <button className='profile__button-change button__hover' type='submit'>Редактировать</button>
                <button className='profile__button-exit button__hover' type='reset'>Выйти из аккаунта</button>

            </section>
        </>
    );
};
export default Profile;
