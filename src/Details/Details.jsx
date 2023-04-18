import React, { useState, useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import './details.css';

export default function Details() {
  const [validCourriel, setValidCourriel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [beer, setBeer] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [updateComment, setUpdateComment] = useReducer((x) => x + 1, 0);
  const [updateNote, setUpdateNote] = useReducer((x) => x + 1, 0);
  const [cleanForm, setCleanForm] = useReducer((x) => x + 1, 0);
  const [noteCount, setNoteCount] = useReducer((x) => x + 1, 0);
  const { id } = useParams();
  const courriel = localStorage.getItem('courriel');
  const entetes = new Headers();
  entetes.append('Authorization', `Basic ${btoa('biero:biero')}`);

  useEffect(() => {
    const fetchData = async () => {
      const [beerData, noteData, commentData, noteCountData] = await Promise.all([
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/note`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/commentaire`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/note/nombre`).then((res) => res.json()),
      ]);
      setBeer({ ...beerData.data, note: noteData.data.note, commentaires: commentData.data, noteCount: noteCountData.data.nombre });
    };
    fetchData();
  }, [id, updateComment, updateNote, noteCount]);

  useEffect(() => {
    if (courriel === 'beer@admin.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [courriel]);

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitNote = async () => {
    const data = {
      note: rating,
      courriel,
    };
    const res = await fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/note`, {
      method: 'PUT',
      headers: entetes,
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    setBeer({ ...beer, note: newData.data.note });

    setCleanForm();
    setUpdateNote();
    setNoteCount();
  };

  const handleSubmitComment = async () => {
    const data = {
      commentaire: comment,
      courriel,
    };

    const res = await fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/commentaire`, {
      method: 'PUT',
      headers: entetes,
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    setBeer({ ...beer, commentaire: newData.data.commentaire });

    setUpdateComment();
    setCleanForm();
  };

  const submitData = () => {
    if (rating !== 0) {
      handleSubmitNote();
    } if (comment !== '') {
      handleSubmitComment();
    }
  };

  useEffect(() => {
    if (cleanForm) {
      setRating(0);
      setComment('');
    }
  }, [cleanForm]);

  useEffect(() => {
    if (courriel) {
      setValidCourriel(true);
    } else {
      setValidCourriel(false);
    }
  }, [courriel]);

  const showComments = () => {
    const comments = beer.commentaires;
    if (!comments) return null; // add a check for undefined values
    const topComments = comments.slice(0, 20);
    return topComments.map((comment) => (
      <div key={comment.id_commmentaire} className="comment_card">
        <span>{comment.courriel}</span>
        <i>{comment.commentaire}</i>
      </div>
    ));
  };

  const checkIfAdmin = () => {
    if (isAdmin) {
      return (
        <div className="check_id_admin_container">
          <Link to="/AddBeer" className="add_beer_link">
            Ajouter une bière
          </Link>
        </div>
      );
    } return null;
  };

  const handleValidation = () => {
    if ((validCourriel && isAdmin) || validCourriel) {
      return (
        <form className="handle_validation_form">
          <div className="handle_validation_input_and_text_area">
            <label htmlFor="rating" className="label">
              <span>Donnez une note (max=10)</span>
            </label>
            <input type="number" id="rating" name="rating" min="0" max="10" value={rating} onChange={handleRating} className="input" />
            <label htmlFor="comment" className="label">
              <span className="font-normal">Votre commentaire</span>
            </label>
            <textarea id="comment" name="comment" rows={5} value={comment} onChange={handleComment} className="text_area" placeholder="Votre commentaire ici..." />
          </div>
          <div className="handle_validation_button_container">
            <Link to="/bieres" type="button" className="back_to_list_link">
              Retour
            </Link>
            <button type="button" className="submit_btn" onClick={() => submitData()}>
              Soumettre
            </button>
          </div>
        </form>
      );
    }
    return (
      <div className="alert_dialogue_box">
        <p>
          Vous devez vous connecter pour pouvoir noter et commenter!
        </p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>
        Details de :
        {' '}
        <i>{beer.nom}</i>
      </h1>
      {checkIfAdmin()}
      <div className="content">
        <div className="content_top_details">
          <p className="item">
            <span>Nom:</span>
            {' '}
            <i className="name">{beer.nom}</i>
          </p>
          <p className="item">
            <span>Desc:</span>
            {' '}
            <i className="description">{beer.description}</i>
          </p>
          <p className="item">
            <span>Note:</span>
            {' '}
            <i className="note">{beer.note}</i>
          </p>
          <p className="item">
            <span>Nombre de notes:</span>
            {' '}
              {noteCount === 0 ? (
                <i className="note">Aucune note pour le moment.</i>
              ) : (
                <i className="note">{noteCount}</i>
              )}
          </p>
        </div>
        <div className="handle_validation_and_show_comments">
          {handleValidation()}
          <div className="handle_show_comments">
            <h2 className="">Commentaires</h2>
            {showComments()}
          </div>
        </div>
      </div>
    </div>
  );
}
