import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="Home w-full h-full sm:w-sm md:w-md lg:w-lg px-3 md:px-16 lg:px-24 pt-32 flex flex-col justify-start items-center">
      <h1 className="text-4xl font-bold text-[#53147a]">Welcome to BeerMe!</h1>
      <p className="text-[#53147a] text-center">BeerMe is a beer catalog application that allows users to view a list of beers, as well as add new beers to the catalog. Users can also view a list of breweries, and add new breweries to the catalog.</p>
      <div className="flex justify-center items-center">
        <Link to="/List" type="button" className="bg-[#53147a] text-white font-bold py-2 px-4 rounded-full mt-4">
          View Beers
        </Link>
      </div>
    </div>
  );
}
