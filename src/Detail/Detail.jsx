import { Link, useParams } from "react-router-dom"

export default function Detail(){
    const {id} = useParams();   // Paramètres du routeur

    return(
        <>
            <h1>Les détails ({id})</h1>
            <p>Nom : </p>
            <p>Fabricant : </p>
            <Link to={"/detail/"+(parseInt(id)+1)}>Prochain</Link>
        </>

    )
}