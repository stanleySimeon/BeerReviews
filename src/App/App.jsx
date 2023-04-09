import './App.css'
import Entete from '../Entete/Entete';
import Liste from '../Liste/Liste';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Detail from '../Detail/Detail';

function App() {
  let [sTitre, setTitre] = useState("Le titre de la page");
  let [courriel, setCourriel] = useState("");
  let [connecter, setConnecter] = useState(false);

  //let sTitre = "Le titre de la page";
  const uneProp = {
    prop1 : "allo",
    prop2 : "le",
    prop3 : "monde"
  };

  // setTimeout(()=>{
  //   console.log(sTitre);
  //   setTitre("Nouveau titre")
  //   console.log(sTitre);
  // } , 5000);

  return (
      <Router>
        <Entete setConnecter={setConnecter} connecter={connecter} setCourriel={setCourriel} courriel={courriel} />
        <Routes>
          <Route path="/" element={<h1>Accueil</h1>} />
          <Route path="/liste" element={<Liste connecter={connecter} {...uneProp} titre={sTitre} nbMax="5" tri="nom" ordre="ASC" test={uneProp} />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='*' element={<h1>Non trouvé - 404</h1>} />
        </Routes>
        
        <div className="piedPage">
          {sTitre}
        </div>
    </Router>
  )
}

export default App
