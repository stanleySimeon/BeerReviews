import { useState, useEffect } from "react";
import Produit from "../Produit/Produit";
import "./Liste.css";
export default function Liste(props){
    let [miseAJour, setMiseAJour] = useState(false);
    console.log("liste")
    //prop.titre = "test";
    let aProduits=[];
    for(let i = 0; i< 15; i++){
        aProduits.push({
            id : (i+1),
            nom : " Item " + i,
            brasserie : "Fab " +i,
        });
    }
    let [produits, setProduits] = useState(aProduits);
    useEffect(()=>{
        getBieres();
    }, [miseAJour]);

    
    const htmlProduit = produits.map((unProduit, index)=>{
        return (
                <Produit key={index} connecter={props.connecter} unProduit={unProduit} {...unProduit}/>
            );
    })

    function getBieres()
    {
        fetch("//127.0.0.1:8000/webservice/php/biere")
            .then(data=>data.json())
            .then(data=>{
                setProduits(data.data);
                setMiseAJour(false);
            })
    }

    function ajouterProduit(){

        let item = {
            nom : " Item 100",
            fabricant : "Fab 100",
            prix : Math.floor(Math.random()*50)
        };
        setProduits(produits.concat(item));
        //console.log(aProduits);
    }

    return (
        <>
            <h1 className="">{props.titre}</h1>
            <button onClick={()=>{ ajouterProduit()}}>AjouterProduit</button>
            <section className="catalogue">
            {htmlProduit}
            </section>
        </>
    )

}