import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Entete.css';

export default function Entete(props) {
  const {
    setConnecter, setCourriel, courriel, connecter,
  } = props;
  const [courrielValide, setCourrielValide] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [commentValide, setCommentValide] = useState(false);

  function verifierCourriel() {
    if (courriel && !connecter) {
      setConnecter(true);
    } else if (courriel && connecter) {
      setConnecter(false);
    }
  }

  function validerCourriel(sCourriel) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setCourriel(sCourriel);
    if (regex.test(sCourriel)) {
      setCourrielValide(true);
    } else {
      setCourrielValide(false);
    }
  }

  function ajouterCommentaire() {
    // check if comment and email are valid
    if (comment && courrielValide) {
      // send request to backend to add comment
      console.log(`Added comment "${comment}" for user ${courriel}`);
      setComment('');
      setCommentValide(false);
    }
  }

  function ajouterNote() {
    // check if rating and email are valid
    if (rating > 0 && courrielValide) {
      // send request to backend to add rating
      console.log(`Added rating ${rating} for user ${courriel}`);
      setRating(0);
    }
  }

  function stateOfConnection() {
    if (connecter) {
      return <p>Est connecté</p>;
    }
    return <p>Pas connecté</p>;
  }

  return (
    <header id="entete" className="entete bg-yellow-500">
      <h1 className="text-xl text-white">Acceuil</h1>
      <span className="spacer" />
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <label className="mr-2 text-white font-medium">Courriel</label>
          <input disabled={connecter} value={courriel} onChange={(e) => { validerCourriel(e.target.value); }} type="text" className="rounded-lg border-2 border-gray-400 px-2 py-1" />
          <button disabled={!courrielValide} onClick={(e) => { verifierCourriel(); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">{(!connecter ? 'Se connecter' : 'Se déconnecter')}</button>
          {stateOfConnection()}
        </div>
        <div className="flex items-center">
          <Link to="/" className="text-white font-medium mx-2 hover:text-gray-400">Accueil</Link>
          <Link to="/liste" className="text-white font-medium mx-2 hover:text-gray-400">Liste</Link>
        </div>
      </nav>
    </header>
  );
}
