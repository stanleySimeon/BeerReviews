import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="flex flex-col space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center">
        {beers.data.map((beer) => (
          <div key={beer.id_biere} id={beer.id_biere} className="w-full md:w-80 flex flex-col space-y-2 bg-white shadow-gray-50 shadow-xl rounded-lg px-1 pt-1 pb-4">
            <div className="flex flex-row space-x-4">
              <img src={beer.image} alt={beer.nom} onError={this.handleImageError} className="rounded-t-md" />
            </div>
            <h2 className="text-md font-bold text-[#26bdc4]">
              {beer.nom}
            </h2>
            <Link to={`/Details/${beer.id_biere}`} type="button" className="text-[#ff7100] w-28">
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
      <div className="bg-[#f8f8f8] BeerList w-full h-full sm:w-sm md:w-md lg:w-lg px-3 md:px-16 lg:px-24 pt-6 md:pt-12 flex flex-col space-y-8 justify-start pb-8">
        <h1 className="text-2xl md:text-4xl font-medium text-[#ff7100]">Liste bière</h1>
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
