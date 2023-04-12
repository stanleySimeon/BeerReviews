/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import bieroTwo from '../../_assets/biero-two.svg';

export default function Header(props) {
  const {
    connected = false, setConnected, setCourriel, courriel,
  } = props; // eslint-disable-line no-unused-vars
  const [validCourriel, setValidCourriel] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [morning, setMorning] = useState(false);
  const [toggle, setToggle] = useState(false);
  const menu = document.querySelector('.toggle');
  const close = document.querySelector('.close');
  const showMenu = document.querySelector('.showMenu');

  const handleLogin = () => {
    if (validCourriel) {
      setConnected(true);
      localStorage.setItem('courriel', courriel);
    }
  };

  const handleLogout = () => {
    setConnected(false);
    setCourriel('');
    localStorage.removeItem('courriel');
  };

  const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.classList.add('hidden');
    menu.classList.remove('hidden');
  };

  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle !== null) {
      menu.classList.add('hidden');
      close.classList.remove('hidden');
      showMenu.classList.remove('hidden');
    } else {
      menu.classList.remove('hidden');
      close.classList.add('hidden');
      showMenu.classList.add('hidden');
    }
  };

  const handleEmail = (e) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setCourriel(e.target.value);
    if (regex.test(e.target.value)) {
      setValidCourriel(true);
    }
  };

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
    <div className="Header sticky top-0 bg-[#ff7100] w-full sm:w-sm md:w-md lg:w-lg md:h-24 px-3 md:px-16 lg:px-24 flex justify-between items-center z-30">
      <Link to="/" className="text-white md:text-2xl font-bold">
        <img src={bieroTwo} alt="Biero" className="w-16 md:w-24 stroke-none" />
      </Link>
      <FontAwesomeIcon icon={faBars} className="toggle text-white text-xl md:hidden" onClick={handleToggle} />
      <div className="fixed popup md:relative left-0 top-0 right-0 px-3 py-4 bg-black bg-opacity-95 md:bg-transparent h-screen md:h-auto hidden md:flex showMenu z-40">
        <FontAwesomeIcon icon={faTimes} className="close text-white text-xl hidden z-50 absolute right-3" onClick={closePopup} />
        <div className="flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-16 pt-32 md:pt-0">
          <nav className="w-ful flex justify-center items-center md:justify-start md:items-start">
            <ul className="flex flex-col items-center md:items-start md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <li>
                <Link to="/" className="item text-white text-sm font-light hover:text-[#c5c5c5] active" onClick={closePopup}>Accueil</Link>
              </li>
              <li>
                <Link to="/List" className="item text-white text-md font-light hover:text-[#c5c5c5] active" onClick={closePopup}>Liste</Link>
              </li>
            </ul>
          </nav>
          <div className="w-auto flex flex-col space-x-3 flex-nowrap mt-8 md:mt-0">
            {connected ? (
              <div className="w-auto  text-[#26bdc4] md:text-[#ffffff] flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
                <p className="text-sm font-light">
                  {Salutation()}
                  {' '}
                  <i className="font-medium">{courriel}</i>
                </p>
                <button type="button" onClick={() => { handleLogout(); closePopup(); }} className="w-40 bg-transparent border border-beer-primary text-white px-2 rounded-xl">Se déconnecter</button>
              </div>
            ) : (
              <form className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 text-beer rounded-none border-0 outline-none focus:hidden">
                <input type="email" name="email" disabled={connected} required="required" value={courriel} onChange={(e) => handleEmail(e)} className="bg-transparent outline-none border border-[#ff7100] text-white md:border-[#ffffff] text-light px-2 rounded-full py-1 md:py-0" placeholder="Courriel..." />
                <button
                  disabled={!validCourriel}
                  type="button"
                  className="bg-[#ff7100] text-[#ffffff] md:bg-[#ffffff] md:text-[#ff7100] rounded-full px-4 py-1"
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
