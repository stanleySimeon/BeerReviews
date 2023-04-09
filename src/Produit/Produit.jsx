import React from "react";
import { Link } from "react-router-dom";
import './Produit.css';

export default function Produit(props) {
    
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
    const {id_biere, prix, nom, description, brasserie, note_moyenne, note_nombre, connecter } = props;
    function afficherPrix(){
        let elementPrix = <p>Prix : Non disponible</p>;
        if(prix > 0){
            elementPrix = <p>Prix : {prix}</p>;
        } else if(connecter){
            elementPrix = <p>Prix : {prix}</p>;
        }
        return elementPrix;
    }

    function ajouterCommentaire() {
		// check if comment and email are valid
		if (comment) {
			// send request to backend to add comment
			console.log(`Added comment "${comment}" for user ${props.courriel}`);
			setComment("");
		}
	}

	function ajouterNote() {
		// check if rating and email are valid
		if (rating > 0 && props.courrielValide) {
			// send request to backend to add rating
			console.log(`Added rating ${rating} for user ${props.courriel}`);
			setRating(0);
		}
	}

    return(
        <article className="unProduit">
            <h2>Nom: {nom}</h2>
            <p>Description: {description}</p>
            <p>Brasserie : {brasserie}</p>
            <p>Note moyenne : {note_moyenne}</p>
            <p>Nombre de notes : {note_nombre}</p>
            <p>Commentaire : {comment}</p>
            <p>Note : {rating}</p>
            {afficherPrix()}
        </article>
    )
}