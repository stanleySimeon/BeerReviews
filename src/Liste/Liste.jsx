import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Liste.css";

export default function Liste(props) {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/webservice/php/biere"
        );
        const data = await response.json();
        setProduits(data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchProduits();
  }, []);

	return (
		<>
			<h1 className="text-xl text-white">Liste des bières</h1>
			<section className="grid grid-cols-3 gap-4">
				{produits.map((produit) => (
					<div key={produit.name} className="bg-white p-4">
						<p className="text-xl">Nom: {produit.nom}</p>
						<Link to={`/detail/${produit.id}`}>Détails</Link>
					</div>
				))}
			</section>
		</>
	);
}

// import { useState, useEffect } from "react";
// import Detail from "../Detail/Detail";
// import Comments from "../Detail/Comments";
// import CommentForm from "../Detail/CommentForm";

// export default function Biere() {
//   const [beers, setBeers] = useState([]);
//   const [selectedBeer, setSelectedBeer] = useState(null);

//   // fetch beers data and update state
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/webservice/php/biere")
//       .then(response => response.json())
//       .then(data => setBeers(data))
//       .catch(error => console.log(error));
//   }, []);

//   // handle selecting a beer
//   const handleSelectBeer = beer => {
//     setSelectedBeer(beer);
//   };

//   return (
//     <div>
//       <h2>Beers</h2>
// 			<ul>
// 				{beers && Array.isArray(beers) && beers.length > 0 && beers.map(beer => (
// 					<li key={beer.id}>
// 						<button onClick={() => handleSelectBeer(beer)}>
// 							{beer.name}
// 						</button>
// 					</li>
// 				))}
// 			</ul>
//       {selectedBeer && (
//         <div>
//           <Detail beer={selectedBeer} />
//           <Comments beer={selectedBeer} />
//           <CommentForm beer={selectedBeer} />
//         </div>
//       )}
//     </div>
//   );
// }
