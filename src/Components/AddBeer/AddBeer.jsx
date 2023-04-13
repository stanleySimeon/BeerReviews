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
      <div className="container w-full flex flex-col items-center justify-center px-3 md:px-16 lg:px-24 pt-4 md:pt-24 space-y-8">
        <h1 className="title text-2xl md:text-4xl font-light text-center">Ajouter une bière</h1>
        <form className="form flex flex-col space-y-2 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" className="border-gray-400 border rounded-md p-2" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="brasserie">Brasserie</label>
            <input type="text" id="brasserie" className="border-gray-400 border rounded-md p-2" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Description</label>
            <textarea id="description" className="border-gray-400 border rounded-md p-2" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" className="border-gray-400 border rounded-md p-2" onChange={this.onImageChange} />
            <img alt="" src={image} />
          </div>
          <button type="button" className="w-full bg-[#26bdc4] text-white font-light py-2 px-4 rounded-full text-center" onClick={this.pushBeer}>
            Ajouter
          </button>
        </form>
      </div>
    );
  }
}
