import './Footer.css';
import React from 'react';

function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__component'>
                <p className='footer__year'>©2023</p>
                <div className='footer__links'>
                    <a className='footer_link' href='https://practicum.yandex.ru' target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    <a className='footer_link' href='https://github.com/ViktoriyaMasyuk' target="_blank" rel="noreferrer">Github</a>
                </div>
            </div>
        </footer>

    );
};
export default Footer;
