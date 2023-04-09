import React from 'react';
import BeerItem from './BeerItem';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topBeers: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/webservice/php/biere')
      .then((response) => response.json())
      .then((data) => {
        const topBeers = data.sort((a, b) => b.moyenne_note - a.moyenne_note).slice(0, 5);
        this.setState({ topBeers });
      });
  }

  render() {
    const { topBeers } = this.state;

    return (
      <div>
        <h1>Top 5 Beers</h1>
        {topBeers.map((beer) => (
          <BeerItem key={beer.id} beer={beer} />
        ))}
      </div>
    );
  }
}

export default HomePage;
