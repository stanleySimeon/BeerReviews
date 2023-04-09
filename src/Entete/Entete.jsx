import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  function etatConnection() {
    let html = <p>Pas connecté</p>;
    if (connecter) {
      html = <p>Est connecté</p>;
    }
    return html;
  }

  function btnConnection() {
    const chaine = 'Se connecter';
    if (connecter) {
      html = 'Se déconnecter';
    }
    return chaine;
  }

  return (
    <header id="entete" className="entete">
      <h1>Titre de page</h1>
      <span className="spacer" />
      <nav>
        Courriel
        <input disabled={connecter} value={courriel} onChange={(e) => { validerCourriel(e.target.value); }} type="text" />
        <button disabled={!courrielValide} onClick={(e) => { verifierCourriel(); }}>{(!connecter ? 'Se connecter' : 'Se déconnecter')}</button>
        {etatConnection()}
        <Link to="/">Accueil</Link>
        <NavLink to="/">Accueil</NavLink>
        <Link to="/liste">Liste</Link>
        <NavLink to="/liste">Liste</NavLink>
        <div>
          <h2>Ajouter un commentaire</h2>
          <input value={comment} onChange={(e) => { setComment(e.target.value); setCommentValide(e.target.value.length > 0); }} type="text" placeholder="Commentaire" />
          <button disabled={!commentValide} onClick={(e) => { ajouterCommentaire(); }}>Ajouter</button>
        </div>
        <div>
          <h2>Ajouter une note</h2>
          <input value={rating} onChange={(e) => { setRating(parseInt(e.target.value)); }} type="number" min="1" max="5" />
          <button disabled={rating === 0} onClick={(e) => { ajouterNote(); }}>Ajouter</button>
        </div>
      </nav>
    </header>
  );
}
