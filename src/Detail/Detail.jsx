// import { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
// import Comments from "./Comments";

// export default function Detail(props) {
//   const [beer, setBeer] = useState(null);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/webservice/php/biere/${props.beerId}`)
//       .then(response => response.json())
//       .then(data => setBeer(data))
//       .catch(error => console.error(error));
//   }, [props.beerId]);

//   if (!beer) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>{beer.name}</h2>
//       <p>Brewery: {beer.brewery}</p>
//       <p>Average rating: {beer.averageRating}</p>
//       <p>Number of ratings: {beer.numRatings}</p>
//       <p>Description: {beer.description}</p>
//         <h3>Add a comment</h3>
//         <CommentForm beerId={props.beerId} />
//         <Comments beerId={props.beerId} />
//     </div>
//   );
// }


// Imports nécessaires pour l'utilisation de fetch et autres dépendances
import React, { useState, useEffect } from 'react';

function Detail(props) {
  // State pour stocker les données de la bière, les commentaires et les notes
  const [beerData, setBeerData] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(null);

  // Effet pour charger les données de la bière, les commentaires et les notes lors du montage du composant
  useEffect(() => {
    // Appel à l'API fetch pour récupérer les données de la bière, les commentaires et les notes
    fetch(`/api/beers/${props.beerId}`)
      .then(response => response.json())
      .then(data => {
        setBeerData(data.beerData);
        setComments(data.comments);
        setRating(data.rating);
      })
      .catch(error => console.error(error));
  }, [props.beerId]);

  // Fonction pour gérer la soumission d'un nouveau commentaire
  const handleSubmitComment = (event) => {
    event.preventDefault();
    // Appel à l'API fetch pour ajouter un nouveau commentaire
    fetch(`http://127.0.0.1:8000/webservice/php/biere/${props.beerId}/commentaire`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: props.userEmail,
        comment: event.target.comment.value
      })
    })
      .then(response => response.json())
      .then(data => setComments([...comments, data.comment]))
      .catch(error => console.error(error));
  };

  // Fonction pour gérer la soumission d'une nouvelle note
  const handleSubmitRating = (event) => {
    event.preventDefault();
    // Appel à l'API fetch pour ajouter une nouvelle note
    fetch(`http://127.0.0.1:8000/webservice/php/biere/${props.beerId}/note`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: props.userEmail,
        rating: event.target.rating.value
      })
    })
      .then(response => response.json())
      .then(data => setRating(data.rating))
      .catch(error => console.error(error));
  };

  // Rendu du composant
  return (
    <div>
      {/* Affichage des données de la bière */}
      {beerData && (
        <div>
          <h2>{beerData.name}</h2>
          <p>{beerData.description}</p>
          <p>ABV: {beerData.abv}%</p>
          <p>IBU: {beerData.ibu}</p>
        </div>
      )}

      {/* Affichage des commentaires */}
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <p>{comment.email}</p>
          </li>
        ))}
      </ul>

      {/* Formulaire pour ajouter un nouveau commentaire */}
      <h4>Add a Comment</h4>
        <form onSubmit={handleSubmitComment}>
            <input type="text" name="comment" />
            <button type="submit">Submit</button>
        </form>

        {/* Affichage de la note moyenne */}
        <h3>Rating</h3>
        {rating && (
            <p>{rating.average}</p>
        )}

        {/* Formulaire pour ajouter une nouvelle note */}
        <h4>Add a Rating</h4>
        <form onSubmit={handleSubmitRating}>
            <input type="number" name="rating" min="0" max="5" />
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default Detail;