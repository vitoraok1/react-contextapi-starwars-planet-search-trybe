import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/starWarsContext';
import Trash from '../icons/trash';

export default function NameFilter() {
  const categoryOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const comparisionOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const {
    setInputName,
    setFilterByNumericValues,
    filterByNumericValues,
  } = useContext(StarWarsContext);

  const [inputValues, setInputValues] = useState({
    category: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [filterValues, setFilterValues] = useState(categoryOptions);

  const handleChange = ({ target }) => {
    const { value } = target;

    if (target.id === 'input-name') setInputName(value);

    if (target.id === 'select-column') {
      setInputValues({ ...inputValues, category: value });
    }

    if (target.id === 'select-comparison') {
      setInputValues({ ...inputValues, comparison: value });
    }

    if (target.id === 'input-value') {
      setInputValues({ ...inputValues, value });
    }
  };

  const handleSearch = () => {
    setFilterByNumericValues([...filterByNumericValues, inputValues]);
    const actualArray = filterValues.filter((value) => value !== inputValues.category);
    setFilterValues(actualArray);
    setInputValues({ ...inputValues, category: actualArray[0] });
  };

  const handleDelete = (index) => {
    const filters = filterByNumericValues
      .filter((_filter, filterIndex) => filterIndex !== index);
    setFilterByNumericValues(filters);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Procure um planeta"
        id="input-name"
        onChange={ handleChange }
      />

      <select
        data-testid="column-filter"
        id="select-column"
        onChange={ handleChange }
      >
        { filterValues.map((option, index) => (
          <option value={ option } key={ index }>{ option }</option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        id="select-comparison"
        onChange={ handleChange }
      >
        { comparisionOptions.map((option, index) => (
          <option value={ option } key={ index }>{ option }</option>
        )) }
      </select>

      <input
        type="number"
        data-testid="value-filter"
        placeholder="Insira um número"
        id="input-value"
        value={ inputValues.value }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSearch }
      >
        Filtrar
      </button>

      { filterByNumericValues.length > 0 && (
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover Filtros
        </button>
      )}
      { filterByNumericValues.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <button
            type="button"
            onClick={ () => handleDelete(index) }
          >
            <Trash />
          </button>
          {' '}
          <span>{ filter.category }</span>
          {' '}
          <span>{ filter.comparison }</span>
          {' '}
          <span>{ filter.value }</span>
        </div>
      ))}
    </div>
  );
}
