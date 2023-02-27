import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from '../services/FetchAPI';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredByName, setFilterByName] = useState('');

  useEffect(() => {
    FetchAPI('https://swapi.dev/api/planets/')
      .then((data) => {
        const dataResults = data.results;
        // console.log(dataResults);
        setPlanets(dataResults);
      });
  }, []);

  useEffect(() => {
    if (filteredByName === '') {
      setFilteredPlanets(planets);
    } else {
      const planetsFilteredByName = planets
        .filter((planet) => planet.name
          .includes((filteredByName)));
      setFilteredPlanets(planetsFilteredByName);
    }
  }, [planets, filteredByName]);

  const context = {
    planets,
    filteredPlanets,
    filteredByName,
    setFilterByName,
    setFilteredPlanets,
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
