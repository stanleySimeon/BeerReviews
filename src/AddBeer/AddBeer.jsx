import React, { Component } from 'react';
import './addbeer.css';

export default class AddBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beer: {},
      addBeer: false,
    };
    this.entetes = new Headers();
    this.entetes.append('Authorization', `Basic ${btoa('biero:biero')}`);
  }

  handleAddBeer = async () => {
    const { beer } = this.state;
    const data = {
      nom: document.querySelector('#nom').value,
      brasserie: document.querySelector('#brasserie').value,
      description: document.querySelector('#description').value,
      image: document.querySelector('#image').value,
      courriel: localStorage.getItem('courriel'),
    };
    const res = await fetch('http://127.0.0.1:8000/webservice/php/biere', {
      method: 'PUT',
      headers: this.entetes,
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    this.setState({
      beer: { ...beer, biere: newData.data.biere },
      addBeer: false,
    });
  };

  pushBeer = () => {
    const { addBeer } = this.state;
    if (addBeer) {
      this.handleAddBeer();
    } else {
      this.setState({ addBeer: true });
    }
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ image: URL.createObjectURL(event.target.files[0]) });
    }
  }

  render() {
    const { image } = this.state;
    return (
      <div className="add_beer_container">
        <h1 className="title">Ajouter une bière</h1>
        <form className="form">
          <div className="content">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" className="input" />
          </div>
          <div className="content">
            <label htmlFor="brasserie">Brasserie</label>
            <input type="text" id="brasserie" className="input" />
          </div>
          <div className="content">
            <label htmlFor="description">Description</label>
            <textarea id="description" className="input" />
          </div>
          <div className="content">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" className="input" onChange={this.onImageChange} />
            <img alt="" src={image} />
          </div>
          <button type="button" className="add-beer-btn" onClick={this.pushBeer}>
            Ajouter
          </button>
        </form>
      </div>
    );
  }
}
