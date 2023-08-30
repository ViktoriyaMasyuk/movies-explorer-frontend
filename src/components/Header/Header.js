import './Header.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';
import NavBar from '../NavBar/NavBar';

function Header({ isOpen, onClose, onEditNavPopup }) {

  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== '/' ? '' : 'header_theme_main'}`}>
      <section className='header__section'>
      <div className='header__component'>
        <a href='/#about-project'>
          <img className='header__logo' alt='Логотип' src={logo} />
        </a>
      </div>
      <div className='header__links'>
        {pathname === '/' ?
          <NavLinks
          /> : <NavBar
            isOpen={isOpen}
            onClose={onClose}
            onEditNavPopup={onEditNavPopup}
          />}
      </div>
      </section>
    </header>
  );
}
export default Header;
