import './Promo.css';
import React from 'react';
import promo from '../../images/text__COLOR_landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-&nbsp;разработки.</h1>
            <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo_button"> <a className='promo__link' href='#about-project'>Узнать больше </a></button>
            <img
                className="promo__image"
                src={promo}
                alt="картинка земли"
            />
        </section>
    );
}
export default Promo;