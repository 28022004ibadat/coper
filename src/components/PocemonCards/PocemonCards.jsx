import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PocemonCards.scss';  

const PocemonCards = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')  
      .then(response => {
        const results = response.data.results;
        const fetches = results.map(result => axios.get(result.url));
        Promise.all(fetches)
          .then(responses => {
            setPokemons(responses.map(res => res.data));
          });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PocemonCards;



