import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import FavoriteBreweries from './components/FavoriteBreweries/FavoriteBreweries';
import Header from './components/Header/Header';

const baseUrl = 'http://localhost:3002';

class App extends Component {
  state = {
    breweries: [],
    favoriteBreweryIds: [],
    query: '',
  }

  componentWillMount() {
    axios.get(`${baseUrl}/api/favorites`)
    .then(response => {
      this.setState({
        favoriteBreweryIds: response.data})
    })
  }

  render() {
  const breweries = this.state.breweries
      .map(brewery => (
        <li key = {brewery.id}>
          {brewery.name} {brewery.phone} {brewery.website_url}
          <button type='button' onClick={() => this.addToFavorites(brewery.id)}> ❤ </button>
        </li>
      ));

      return (
        <div className="App">
        <Header />

      <form onSubmit={event => this.search(event)}>
        <input 
          type= "text" 
          value = {this.state.query} 
          onChange = {event => this.handleSearchChange(event)}/>
        <button type = 'submit'>Search</button>
      </form>

      <ul>
        {breweries}
      </ul>
      
      <FavoriteBreweries 
        favoriteBrewery = {this.state.favoriteBreweryIds}
        onBreweryDelete = {id => this.state.deleteFromFavorites}/>
      </div>
    );
  }

  handleSearchChange(event) {
    this.setState({
      query: event.target.value,
    })
  }

  search(event) {
    event.preventDefault(); //prevents browser default actions such as reloading

    axios.get(`https://api.openbrewerydb.org/breweries?by_name=${this.state.query}`)
    .then(response =>{
      this.setState({
        breweries: response.data,
      })
    })

    

  }

  addToFavorites(id) {
    axios.post('https://localhost:3002/api/favorites', {id})
    .then(response => {
      this.setState({favoriteBreweryIds: response.data,
      })
    })
  }

  deleteFromFavorites(id) {
    axios.delete(`baseUrl/api/favorites/${id}`)
    .then (response => {
      this.setState(
        {favoriteBreweryIds: response.data}
    )})
  }
}

export default App;
