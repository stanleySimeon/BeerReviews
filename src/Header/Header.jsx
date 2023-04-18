import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import bieroTwo from '../_assets/biero-two.svg';
import './header.css';

export default function Header(props) {
  const {
    connected = false, setConnected, setCourriel, courriel,
  } = props;
  const [validCourriel, setValidCourriel] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [morning, setMorning] = useState(false);
  const [toggle, setToggle] = useState(false);
  const menu = document.querySelector('.toggle');
  const close = document.querySelector('.close');
  const showMenu = document.querySelector('.showMenu');
  const [salutationAndCourriel, setSalutationAndCourriel] = useState('');

  const handleLogin = () => {
    if (validCourriel) {
      setConnected(true);
      localStorage.setItem('courriel', courriel);
    } else {
      setConnected(false);
    }
  };

  const handleLogout = () => {
    setConnected(false);
    setCourriel('');
    localStorage.removeItem('courriel');
  };

  const closePopup = () => {
    const popup = document.querySelector('.popup');
    if (window.innerWidth < 768) {
      popup.style.display = 'none';
      menu.style.display = 'flex';
      close.style.display = 'none';
      showMenu.style.display = 'none';
    } else {
      popup.style.display = 'flex';
      showMenu.style.display = 'flex';
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle !== null) {
      menu.style.display = 'none';
      close.style.display = 'flex';
      showMenu.style.display = 'flex';
    } else {
      menu.style.display = 'flex';
      close.style.display = 'none';
      showMenu.style.display = 'none';
    }
  };

  const handleEmail = (e) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setCourriel(e.target.value);
    if (regex.test(e.target.value)) {
      setValidCourriel(true);
    }
  };

  useEffect(() => {
    const courrielStorage = localStorage.getItem('courriel');
    if (courrielStorage) {
      setCourriel(courrielStorage);
      setConnected(true);
    } else {
      setCourriel('');
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    if (connected) {
      setSalutationAndCourriel(`Bonjour ${courriel}`);
    } else {
      setSalutationAndCourriel('Bonjour');
    }
  }, [connected, courriel]);

  React.useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 12 && hour < 18) {
      setAfternoon(true);
    } else if (hour >= 18 && hour < 24) {
      setAfternoon(false);
    } else if (hour >= 0 && hour < 12) {
      setMorning(true);
    }
  }, []);

  const Salutation = () => {
    if (afternoon) {
      return 'Bon après-midi';
    } if (morning) {
      return 'Bonjour';
    } if (!afternoon && !morning) {
      return 'Bonsoir';
    }
    return 'Bonjour';
  };

  return (
    <div className="header">
      <Link to="/" className="home-link">
        <img src={bieroTwo} alt="Biero" className="beer-logo" />
      </Link>
      <FontAwesomeIcon icon={faBars} className="toggle" onClick={() => handleToggle()} />
      <div className="popup showMenu">
        <FontAwesomeIcon icon={faTimes} className="close" onClick={() => closePopup()} />
        <div className="nav_container">
          <nav className="nav">
            <ul className="nav-item">
              <li>
                <Link to="/" className="nav-link" onClick={() => closePopup()}>Accueil</Link>
              </li>
              <li>
                <Link to="/bieres" className="nav-link" onClick={() => closePopup()}>Liste</Link>
              </li>
            </ul>
          </nav>
          <div className="connection-status">
            {connected ? (
              <div className="connection-status-item">
                <p className="salutation">
                  {Salutation()}
                  {' '}
                  <i className="courriel" value={courriel}>{courriel}</i>
                </p>
                <button type="button" onClick={() => { handleLogout(); closePopup(); }} className="logout_btn w-40 bg-transparent border border-beer-primary text-white px-2 rounded-xl">Se déconnecter</button>
              </div>
            ) : (
              <form className="login_form">
                <input type="email" name="email" disabled={connected} required="required" value={courriel} onChange={(e) => handleEmail(e)} className="email-login-connection" placeholder="Courriel..." />
                <button
                  disabled={!validCourriel}
                  type="button"
                  className="login-btn"
                  onClick={() => {
                    handleLogin();
                    closePopup();
                  }}
                >
                  Se connecter

                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  connected: PropTypes.bool.isRequired,
  setConnected: PropTypes.func.isRequired,
  courriel: PropTypes.string.isRequired,
  setCourriel: PropTypes.func.isRequired,
};
