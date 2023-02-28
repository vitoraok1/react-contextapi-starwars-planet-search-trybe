import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import FetchAPI from '../services/FetchAPI';
import StarWarsContext from './starWarsContext';

function StarWarsProvider({ children }) {
  const filterColumnTypes = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterComparisonTypes = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState(filterColumnTypes);
  const [
    filterComparisonOptions,
    setFilterComparisonOptions,
  ] = useState(filterComparisonTypes);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    FetchAPI('https://swapi.dev/api/planets/')
      .then((data) => {
        const dataResults = data.results;
        setPlanets(dataResults);
      });
  }, []);

  const numericValuesFilter = useCallback(() => {
    let editablePlanets = planets;

    filterByNumericValues.forEach((element) => {
      switch (element.comparison) {
      case 'maior que':
        editablePlanets = planets.filter((planet) => (
          Number(planet[element.column]) > Number(element.value)
        ));
        break;
      case 'menor que':
        editablePlanets = planets.filter((planet) => (
          Number(planet[element.column]) < Number(element.value)
        ));
        break;
      case 'igual a':
        editablePlanets = planets.filter((planet) => (
          Number(planet[element.column]) === Number(element.value)
        ));
        break;
      default:
        break;
      }
    });

    return editablePlanets;
  }, [planets, filterByNumericValues]);

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

  useEffect(() => {
    setFilteredPlanets(numericValuesFilter());
  }, [numericValuesFilter]);

  const context = {
    planets,
    filteredPlanets,
    inputName,
    selectedCategory,
    columnOptions,
    filterComparisonOptions,
    selectedComparison,
    inputValue,
    filterByNumericValues,
    setInputName,
    setFilteredPlanets,
    setSelectedCategory,
    setColumnOptions,
    setFilterComparisonOptions,
    setSelectedComparison,
    setInputValue,
    setFilterByNumericValues,
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
