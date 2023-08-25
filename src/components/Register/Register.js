import Sign from '../Sign/Sign';
import './Register.css';
import React from 'react';

function Register() {
    return (
        <section className='register'>
            <form className='register__form'>
                <Sign
                    title={'Добро пожаловать!'}
                    buttonText={'Зарегистрироваться'}
                    text={'Уже зарегистрированы?'}
                    linkText={'Войти'}
                    link={'./sign-in'}
                    class={'sign__form'}
                >
                    <>
                        <p className='sign__info'>Имя</p>
                        <input
                            className='sign__input'
                            type='text'
                            size='15'
                            minLength='2'
                            maxLength='30'
                            required
                            value={'Виктория'}
                        />
                        <span className='form__input-error' />
                    </>

                </Sign>

            </form>
        </section>

    )
};
export default Register;