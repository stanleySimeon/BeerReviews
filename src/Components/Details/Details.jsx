/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Details() {
  const [validCourriel, setValidCourriel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [beer, setBeer] = useState({});
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const courriel = localStorage.getItem('courriel');
  const entetes = new Headers();
  // eslint-disable-next-line prefer-template
  entetes.append('Authorization', 'Basic ' + btoa('biero:biero'));

  useEffect(() => {
    const fetchData = async () => {
      const [beerData, noteData, commentData] = await Promise.all([
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/note`).then((res) => res.json()),
        fetch(`http://127.0.0.1:8000/webservice/php/biere/${id}/commentaire`).then((res) => res.json()),
      ]);
      setBeer({ ...beerData.data, note: noteData.data.note, commentaires: commentData.data });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const showComments = () => {
    const comments = beer.commentaires;
    const topComments = comments.slice(0, 20);
    return topComments.map((comment) => (
      <div key={comment.id_commmentaire} className="flex flex-col justify-center bg-[#b5b4b4] shadow-md p-2 rounded-lg mb-2">
        <span className="font-medium text-[#1e1e1e]">{comment.courriel}</span>
        <p><i className="text-[#252525]">{comment.commentaire}</i></p>
      </div>
    ));
  };

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
  };

  const submitData = () => {
    if (rating !== 0) {
      handleSubmitNote();
    } if (comment !== '') {
      handleSubmitComment();
    }
  };

  useEffect(() => {
    if (courriel) {
      setValidCourriel(true);
    } else {
      setValidCourriel(false);
    }
  }, [courriel]);

  const checkIfAdmin = () => {
    if (isAdmin) {
      return (
        <div className="w-full flex flex-col justify-center space-y-2">
          <Link to="/AddBeer" className="w-40 bg-[#26bdc4] text-white font-light py-2 px-4 rounded-full text-center">
            Ajouter une bière
          </Link>
        </div>
      );
    } return null;
  };

  const handleValidation = () => {
    if ((validCourriel && isAdmin) || validCourriel) {
      return (
        <form className="w-full md:w-1/2 lg:w-4/12 flex flex-col space-y-4 mb-4">
          <div className="flex flex-col justify-center space-y-2">
            <label htmlFor="rating" className="text-md font-light">
              <span className="font-normal">Donnez une note (max=5)</span>
            </label>
            <input type="number" id="rating" name="rating" min="0" max="5" value={rating} required onChange={handleRating} className="border border-[#ff7100] rounded-md px-2 py-1 font-normal outline-none" />
            <label htmlFor="comment" className="text-md font-light">
              <span className="font-normal">Votre commentaire:</span>
            </label>
            <textarea id="comment" name="comment" rows={4} value={comment} required onChange={handleComment} className="border border-[#ff7100] rounded-md px-2 py-1 font-normal outline-none" placeholder="Votre commentaire ici..." />
          </div>
          <div className="flex justify-between items-center">
            <Link to="/List" type="button" className="w-32 bg-[#26bdc4] text-white font-light py-2 px-4 rounded-full text-center">
              Retour
            </Link>
            <button type="submit" className="w-32 bg-[#26bdc4] text-white font-light py-2 px-4 rounded-full text-center" onClick={submitData}>
              Soumettre
            </button>
          </div>
        </form>
      );
    }
    return (
      <div className="w-full flex flex-col justify-center bg-[#ff7100] p-2 rounded-lg">
        <p className="text-md font-light text-[#ffffff]">
          Vous devez vous connecter pour pouvoir noter et commenter!
        </p>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  } if (!beer) {
    return <div>No beers found</div>;
  }
  return (
    <div className="Details w-full h-full sm:w-sm md:w-md lg:w-lg px-3 md:px-16 lg:px-24 pt-6 md:pt-12 flex flex-col space-y-8 justify-start pb-4">
      <h1 className="text-2xl md:text-4xl font-medium text-[#ff7100]">
        Details de :
        {' '}
        <i>{beer.nom}</i>
      </h1>
      {checkIfAdmin()}
      <div className="flex flex-col justify-center space-y-4">
        <div className="flex flex-col justify-center bg-[#d6d6d6] shadow-lg p-2 rounded-lg">
          <p className="text-md font-light">
            <span className="font-bold">Nom:</span>
            {' '}
            <i className="text-[#ff7100]">{beer.nom}</i>
          </p>
          <p className="text-md font-light">
            <span className="font-bold">Desc:</span>
            {' '}
            <i className="text-[#585858]">{beer.description}</i>
          </p>
          <p className="text-md font-light">
            <span className="font-bold">Note:</span>
            {' '}
            <i className="text-[#585858]">{beer.note}</i>
          </p>
        </div>
        {handleValidation()}
        <div className="text-md font-light pt-4 flex-col space-y-3">
          <h2 className="text-[#ff7100] font-medium text-2xl md:text-xl">Commentaires</h2>
          {showComments()}
        </div>
      </div>
    </div>
  );
}
