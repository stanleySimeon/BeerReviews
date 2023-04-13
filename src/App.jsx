/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import BeerList from './Components/BeerList/BeerList';
import Details from './Components/Details/Details';
import AddBeer from './Components/AddBeer/AddBeer';

export default function App() {
  const [connected, setConnected] = React.useState(false);
  const [courriel, setCourriel] = React.useState('');

  return (
    <Router>
      <Header connected={connected} setConnected={setConnected} courriel={courriel} setCourriel={setCourriel} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<BeerList />} />
        <Route path="/Details/:id" element={<Details />} />
        <Route path="/AddBeer" element={<AddBeer />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </Router>
  );
}
