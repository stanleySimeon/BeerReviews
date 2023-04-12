import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      defaultImage: 'https://images.unsplash.com/photo-1599419685838-28e405ea05b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGVpbmVrZW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    };
    this.beerBgImage = 'https://img.freepik.com/free-photo/tasty-american-beer-composition_23-2148907577.jpg';
    this.api = 'http://127.0.0.1:8000/webservice/php/biere';
  }

  componentDidMount() {
    fetch(this.api)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ beers: data.data });
      });
  }

  handleImageError = (e) => {
    const { defaultImage } = this.state;
    e.target.src = defaultImage;
  };

  starsLevel = (note) => {
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      if (i < note) {
        stars.push(<FontAwesomeIcon icon={faStar} className="text-[#c2c2c2]" />);
      } else {
        stars.push(<FontAwesomeIcon icon={faStar} className="text-[#ff7100]" />);
      }
    }
    return stars;
  };

  render() {
    const { beers } = this.state;
    const topRating = beers.sort((a, b) => b.note - a.note).slice(0, 5);

    return (
      <div className="relative w-full h-auto flex flex-col">
        <div className="Home relative w-full container-fluid h-5/6 md:h-4/6 sm:w-sm md:w-md lg:w-lg flex flex-col justify-center items-center">
          <img src={this.beerBgImage} alt="Beer" className="w-full h-screen -z-30" />
          <div className="absolute top-0 left-0 right-0 w-full h-full bg-[#000000] opacity-80 -z-20" />
          <div className="w-full h-full absolute top-0 flex flex-col px-3 md:px-16 lg:px-24 justify-center items-start rounded-3xl">
            <div className="md:w-8/12 lg:w-6/12 flex flex-col justify-center items-start space-y-1">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#26bdc4]">Biero!</h1>
              <p className="text-[#ebebeb] text-justify text-sm md:text-lg font-thin md:font-light">Biero is a beer catalog application that allows users to view a list of beers, as well as add new beers to the catalog. Users can also view a list of breweries, and add new breweries to the catalog.</p>
              <div className="flex justify-center items-center">
                <Link to="/List" type="button" className="bg-[#26bdc4] text-white py-2 px-4 rounded-full mt-4">
                  View Beers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#eeeeee] w-full h-screen sm:w-sm md:w-md lg:w-lg px-3 md:px-16 lg:px-24 pt-4 md:pt-12 flex flex-col space-y-4 md:space-y-12 justify-start items-start">
          <h1 className="text-2xl md:text-4xl font-medium text-[#ff7100]">Top 5 beers</h1>
          <div className="w-full md:flex md:space-x-8 space-y-10 md:space-y-0 pb-16">
            {topRating.map((beer) => (
              <div key={beer.id_biere} id={beer.id_biere} className="w-full md:w-52 flex flex-col space-y-2 bg-white shadow-gray-50 shadow-xl rounded-lg px-1 pt-1 pb-4">
                <img src={beer.image} alt={beer.nom} onError={this.handleImageError} className="h-44 object-cover rounded-t-md" />
                <div className="flex space-x-1 justify-start items-center">
                  {this.starsLevel(beer.note)}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-md font-bold text-[#26bdc4]">
                    {beer.nom}
                  </h2>
                  <p className="text-[#585858]">
                    {beer.description}
                  </p>
                </div>
                <Link to={`/Details/${beer.id_biere}`} type="button" className="text-[#ff7100] w-28">
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
