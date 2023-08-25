import './Portfolio.css'
import React from 'react';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__links'>
                <ol className='portfolio__component'>
                    <a className='portfolio__link' href="https://viktoriyamasyuk.github.io/how-to-learn/" target="_blank" rel="noreferrer">
                        <h3 className='portfolio__subtitle'>Статичный сайт</h3>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </ol>
                <ol className='portfolio__component'>
                    <a className='portfolio__link' href="https://viktoriyamasyuk.github.io/russian-travel/" target="_blank" rel="noreferrer">
                        <h3 className='portfolio__subtitle'>Адаптивный сайт</h3>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </ol>
                <ol className='portfolio__component'>
                    <a className='portfolio__link' href="https://network.mesto.nomoredomains.xyz" target="_blank" rel="noreferrer">
                        <h3 className='portfolio__subtitle'>Одностраничное приложение</h3>
                        <p className='portfolio__arrow'>↗</p>
                    </a>
                </ol>
            </ul>
        </section>

    );
};
export default Portfolio;