import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from '../services/FetchAPI';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    FetchAPI()
      .then((data) => {
        setPlanets(data);
      });
  }, []);

  useEffect(() => {
    const verifyFilterName = () => {
      const planetsFilteredByName = planets
        .filter((planet) => (planet.name).toLowerCase()
          .includes((inputName).toLowerCase()));
      setFilteredPlanets(planetsFilteredByName);
    };

    if (inputName) {
      verifyFilterName();
    } else {
      setFilteredPlanets(planets);
    }
  }, [planets, inputName]);

  const context = useMemo(() => ({
    filteredPlanets,
    filterByNumericValues,
    setInputName,
    setFilterByNumericValues,
    setFilteredPlanets,
  }), [
    filteredPlanets,
    filterByNumericValues,
  ]);

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
