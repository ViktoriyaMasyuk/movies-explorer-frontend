import Sign from '../Sign/Sign';
import './Login.css';
import React from 'react';

function Login() {
    return (
        <section className='login'>
            <Sign
                title={'Рады видеть!'}
                buttonText={'Войти'}
                text={'Ещё не зарегистрированы?'}
                linkText={'Регистрация'}
                link={'./sign-up'}
                class={'sign__form login__form'}
            >
            </Sign>
        </section>

    );
};
export default Login;