import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import BeerList from './Components/BeerList/BeerList';

export default function App() {
  const [connected, setConnected] = React.useState(false);
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Header connected={connected} setConnected={setConnected} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<BeerList />} />
      </Routes>
    </Router>
  );
}
