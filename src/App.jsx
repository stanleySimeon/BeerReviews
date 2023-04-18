import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import BeerList from './BeerList/BeerList';
import Details from './Details/Details';
import AddBeer from './AddBeer/AddBeer';

export default function App() {
  const [connected, setConnected] = React.useState(false);
  const [courriel, setCourriel] = React.useState('');

  return (
    <Router>
      <Header connected={connected} setConnected={setConnected} courriel={courriel} setCourriel={setCourriel} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bieres" element={<BeerList />} />
        <Route path="/biere/:id" element={<Details />} />
        <Route path="/AddBeer" element={<AddBeer />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}
