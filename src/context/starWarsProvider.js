import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from '../services/FetchAPI';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    FetchAPI('https://swapi.dev/api/planets/')
      .then((data) => {
        const dataResults = data.results;
        // console.log(dataResults);
        setPlanets(dataResults);
      });
  }, []);

  const context = {
    planets,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
