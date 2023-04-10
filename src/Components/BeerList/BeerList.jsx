/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

// The beer list page will display a directory of beers, with each beer showing its name and a thumbnail image. Users will be able to click on a beer to go to the beer detail page. To add a new beer, only an admin user will be able to access a special page that will allow them to add the beer's details.

export default function BeerList() {
  const [beers, setBeers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [addBeer, setAddBeer] = React.useState(false);
  const api = 'http://127.0.0.1:8000/webservice/php/biere/';

  React.useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecoded.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);
  React.useEffect(() => {
    if (isAdmin) {
      setAddBeer(true);
    } else {
      setAddBeer(false);
    }
  }, [isAdmin]);

  // Get the login data from the Header component
  const handleLogin = (data) => {
    setIsLogin(data);
  };

  // Get the admin data from the Header component to display the add beer button
  const handleAdmin = (data) => {
    setIsAdmin(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  } if (beers.length === 0) {
    return <div>No beers found</div>;
  }
  return (
    <div className="BeerList w-full h-full sm:w-sm md:w-md lg:w-lg px-3 md:px-16 lg:px-24 pt-32 flex flex-col justify-start items-center">
      <h1 className="text-4xl font-bold text-[#53147a]">Beer List</h1>
      <p className="text-[#53147a] text-center">Here is a list of all the beers in our catalog.</p>
      <div className="flex justify-center items-center">
        {addBeer && (
        <Link to="/AddBeer" type="button" className="bg-[#53147a] text-white font-bold py-2 px-4 rounded-full mt-4">
          Add Beer
        </Link>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {beers.data.map((beer) => (
          <div key={beer.id_biere} id={beer.id_biere} className="flex flex-col justify-center items-center">
            <p>
              {beer.nom}
            </p>
            <p>
              {beer.description}
            </p>
            <Link to={`/Details/${beer.id_biere}`} key={beer.id_biere} type="button" className="bg-[#53147a] text-white font-bold py-2 px-4 rounded-full mt-4 w-full">
              {beer.nom}
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
