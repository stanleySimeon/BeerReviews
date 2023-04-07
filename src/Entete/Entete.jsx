import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Entete.css';

export default function Entete(props){
    //let [courriel, setCourriel] = useState("");
    //let [connecter, setConnecter] = useState(false);
    console.log(props)
    const {setConnecter, setCourriel, courriel, connecter} = props;
    const [courrielValide, setCourrielValide] = useState(false);
    
    function verifierCourriel(){
        console.log(courriel);
        if(courriel && !connecter){
            setConnecter(true);
        }
        else if(courriel && connecter){
            setConnecter(false);
        }

        // Mais comment lire le champ input?
    }

    function validerCourriel(sCourriel){
        
        setCourriel(sCourriel);
        if(sCourriel.length > 3) {
            setCourrielValide(true);
        }
        else{
            setCourrielValide(false);
        }
    }

   function etatConnection()
   {
        let html = <p>Pas connecté</p>;
        if(connecter){
            html = <p>Est connecté</p>;
        }
        return html
   }
    function btnConnection(){
        let chaine = "Se connecter";
        if(connecter){
            html = "Se déconnecter";
        }
        return chaine;
    }
    return (
        <header id='entete' className='entete'>    
            <h1>Titre de page</h1>
            <span className='spacer'></span>
            <nav>
                Courriel<input disabled={connecter} value={courriel} onChange={(e)=>{validerCourriel(e.target.value)}} type="text"></input>
                <button disabled={!courrielValide} onClick={(e)=>{ verifierCourriel()}}>{(!connecter ? "Se connecter" : "Se déconnecter" )}</button>
                {etatConnection()}
                <Link to="/">Accueil</Link>
                <NavLink to="/">Accueil</NavLink>
                <Link to="/liste">Liste</Link>
                <NavLink to="/liste">Liste</NavLink>
            </nav>
        </header>
    );

}