/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [afternoon, setAfternoon] = useState(false);
  const [morning, setMorning] = useState(false);

  const handleLogout = () => {
    setConnected(false);
    setUser(null);
  };

  const handleEmail = (e) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(e.target.value);
    if (regex.test(e.target.value)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validEmail) {
      setConnected(true);
      setUser({ username: email });
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
    <div className="Header bg-[#53147a] w-full sm:w-sm md:w-md lg:w-lg h-24 px-3 md:px-16 lg:px-24 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        BIERO
      </Link>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-3 flex-nowrap">
          {connected ? (
            <div className="text-beer-primary">
              <p className="text-sm font-light">
                {Salutation()}
                {' '}
                {user.username}
              </p>
              <button type="button" onClick={handleLogout}>Se déconnecter</button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex space-x-3 text-beer rounded-none border-0 outline-none focus:hidden">
              <input type="email" name="email" required value={email} onChange={handleEmail} className="px-2 text-sm" />
              <button type="submit" className="text-beer-primary">Se connecter</button>
            </form>
          )}
        </div>
        <nav className="">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white text-sm font-light">Acceuil</Link>
            </li>
            <li>
              <Link to="/List" className="text-white text-md font-light">Liste</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
