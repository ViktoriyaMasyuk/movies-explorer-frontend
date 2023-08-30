import './AboutProject.css'
import React from 'react'

function AboutProject() {
  return (
    <section className="aboutproject" id='about-project'>
      <h2 className='aboutproject__title'>О проекте</h2>
      <h3 className="aboutproject__subtitle aboutproject__area__one">Дипломный проект включал 5 этапов</h3>
      <p className="aboutproject__text aboutproject__area__two">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      <h3 className="aboutproject__subtitle aboutproject__area__three">На выполнение диплома ушло 5 недель</h3>
      <p className="aboutproject__text aboutproject__area__four">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      <div className='aboutproject__container'>
        <button className='aboutproject__button__back aboutproject__area__five'>1 неделя</button>
        <h4 className='aboutproject__button-text aboutproject__area__six'>Back-end</h4>
        <button className='aboutproject__button__front aboutproject__area__seven'>4 недели</button>
        <h4 className='aboutproject__button-text aboutproject__area__eight'>Front-end</h4>
      </div>
    </section>
  );
};
export default AboutProject;