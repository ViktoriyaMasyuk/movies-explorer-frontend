import './AboutMe.css';
import React from 'react';
import photo from '../../images/IMG_6148.jpeg'

function AboutMe() {
    return (
        <section className='aboutme'>
            <h2 className='aboutme__title'>Студент</h2>
            <h3 className='aboutme__subtitle'>Виктория</h3>
            <h4 className='aboutme__info'>Фронтенд-разработчик, 30 лет</h4>
            <p className='aboutme__text'>Я живу в Челябинске, закончила факультет Экономики по специальности Банковкое дело. 10 лет проработала в продажах и поняла, что хочу изменить работу. Пошла учиться в Яндекс Практикум, так как меня очень зажигает сфера веб-разработки.
                У меня есть муж и маленький сынок. Обожаю путешествия и горы. </p>
            <a className='aboutme__link' href='https://github.com/ViktoriyaMasyuk' target="_blank" rel="noreferrer">Github</a>
            <img className='aboutme__photo' alt='Моя фотография' src={photo}></img>
        </section>

    );
};
export default AboutMe;