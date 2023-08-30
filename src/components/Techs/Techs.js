import './Techs.css'
import React from 'react';

function Techs() {
    return (
        <section className='techs'>
            <div className='techs__paragraph'>
                <h2 className='techs__title'>Технологии</h2>
                <h3 className='techs__subtitle'>7 технологий</h3>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__buttons'>
                    <li className='techs__buton'>HTML</li>
                    <li className='techs__buton'>CSS</li>
                    <li className='techs__buton'>JS</li>
                    <li className='techs__buton'>React</li>
                    <li className='techs__buton'>Git</li>
                    <li className='techs__buton'>Express.js</li>
                    <li className='techs__buton'>mongoDB</li>
                </ul>
            </div>
        </section>
    );
};
export default Techs;