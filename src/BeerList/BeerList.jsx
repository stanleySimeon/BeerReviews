import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './beerlist.css';

class BeerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      loading: true,
      defaultImage: 'https://thumbs.dreamstime.com/z/bottles-famous-global-beer-brands-poznan-pol-mar-including-heineken-becks-bud-miller-corona-stella-artois-san-miguel-143170440.jpg',
    };

    this.api = 'http://127.0.0.1:8000/webservice/php/biere/';

    this.handleImageError = this.handleImageError.bind(this);
    this.showBeers = this.showBeers.bind(this);
  }

  componentDidMount() {
    fetch(this.api)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ beers: data, loading: false });
      });
  }

  handleImageError(e) {
    const { defaultImage } = this.state;
    e.target.src = defaultImage;
  }

  showBeers() {
    const { beers } = this.state;
    return (
      <div className="beer_container">
        {beers.data.map((beer) => (
          <div key={beer.id_biere} id={beer.id_biere} className="card">
            <div className="img-container">
              <img src={beer.image} alt={beer.nom} onError={this.handleImageError} className="img" />
            </div>
            <h2 className="name">
              {beer.nom}
            </h2>
            <p className="description_text">
              {beer.description}
            </p>
            <Link to={`/biere/${beer.id_biere}`} type="button" className="link-to-details">
              Details
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="list">
        <h1 className="title">Liste bière</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          this.showBeers()
        )}
      </div>
    );
  }
}

export default BeerList;
