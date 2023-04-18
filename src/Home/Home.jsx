import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './home.css';

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
      <div className="home-container">
        <div className="home">
          <img src={this.beerBgImage} alt="Beer" className="bg-img" />
          <div className="overlay" />
          <div className="content w-full">
            <div className="content-item">
              <h1 className="title">Biero!</h1>
              <p className="description">Biero is a beer catalog application that allows users to view a list of beers, as well as add new beers to the catalog. Users can also view a list of breweries, and add new breweries to the catalog.</p>
              <div className="call-to-action-btn-container">
                <Link to="/bieres" type="button" className="call-to-action-btn">
                  View Beers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="top5-beers-container">
          <h1>Top 5 beers</h1>
          <div className="beers-card">
            {topRating.map((beer) => (
              <div key={beer.id_biere} id={beer.id_biere} className="card">
                <img src={beer.image} alt={beer.nom} onError={this.handleImageError} className="card-img" />
                <div className="stars">
                  {this.starsLevel(beer.note)}
                </div>
                <div className="name">
                  <h2 className="">
                    {beer.nom}
                  </h2>
                  <p className="">
                    {beer.description}
                  </p>
                </div>
                <Link to={`/biere/${beer.id_biere}`} type="button" className="show-details-btn">
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
