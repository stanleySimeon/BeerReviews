import React, { useState, useEffect } from 'react';

const Home = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/webservice/php/biere')
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const topBeers = beers
    .sort((a, b) => b.average - a.average)
    .slice(0, 5)
    .map((beer) => (
      <li key={beer.id}>
        <h2>{beer.name}</h2>
        <p>
          Brewery:
          {' '}
          {beer.brewery}
        </p>
        <p>
          Average rating:
          {' '}
          {beer.average}
        </p>
        <p>
          Number of ratings:
          {' '}
          {beer.number}
        </p>
      </li>
    ));

  return (
    <div>
      <h1>Top 5 Beers</h1>
      <ul>{topBeers}</ul>
    </div>
  );
};

export default Home;
