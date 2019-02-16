import React, { Component } from 'react';
import axios from 'axios';

class FavoriteBreweries extends Component {
    state = {
        breweries: [],
    }

    componentWillReceiveProps(props){
        Promise.all(props.favoriteBrewery.map(id => (
            axios.get('https://api.openbrewerydb.org/breweries/' + id)
            .then( response => response.data)
        )))
            .then (breweries => {
                this.setState(breweries);
            })
    }

    render () {
        
        return (
            <div>
                {JSON.stringify(this.props.favoriteBrewery, null, 4)}
            </div>
        )
    }
}

export default FavoriteBreweries;