import './Sign.css';
import React from "react";
import logo from '../../images/logo.svg';

function Sign(props) {
    return (
        <div className='sign'>
            <a href='/'>
                <img className='header__logo' alt='Логотип' src={logo} />
            </a>
            <h2 className='sign__title'>{props.title}</h2>
            <form
                className={props.class}
                method='get'
                noValidate
            >
                <fieldset className='sign__set'>
                    {props.children}
                    <p className='sign__info'>E-mail</p>
                    <input
                        className='sign__input'
                        type='email'
                        autoComplete='email'
                        size='30'
                        minLength='2'
                        maxLength='30'
                        required
                        value={'admin@admin.com'}
                    />
                    <span className='form__input-error' />
                    <p className='sign__info'>Пароль</p>
                    <input
                        className='sign__input'
                        type='password'
                        minLength='6'
                        size='25'
                        required
                        defaultValue=''
                    />
                    <span className='form__input-error' />
                </fieldset>
            </form>
            <button className='sign__submit button__hover' type='submit'>
                {props.buttonText}
            </button>
            <p className='sign__text'>
                {props.text} <a className='sign__link' href={props.link}>{props.linkText}</a>
            </p>
        </div>
    )
}
export default Sign;