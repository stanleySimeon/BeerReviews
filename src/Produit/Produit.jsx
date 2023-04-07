import { Link } from "react-router-dom";
import './Produit.css';

export default function Produit(props) {

    const {id, prix, nom, fabricant, connecter, unProduit} = props;

    function afficherPrix(){
        let elementPrix = <p>Prix : Non disponible</p>;
        if(props.connecter){
            elementPrix = <p>Prix : {prix}</p>
        }
        return elementPrix;
    }
    return(
        <article className="unProduit">
            <p>Nom : {nom}</p>
            <p>Fabricant : {fabricant}</p>
            {afficherPrix()}
            <Link to={"/detail/"+id}>Voir détails</Link>
        </article>
    )
}