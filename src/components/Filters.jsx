import React, { useContext } from 'react';
import StarWarsContext from '../context/starWarsContext';

export default function NameFilter() {
  const {
    setInputName,
    setSelectedCategory,
    setSelectedComparison,
    setInputValue,
    setFilterByNumericValues,
    setColumnOptions,
    columnOptions,
    filterComparisonOptions,
    selectedCategory,
    selectedComparison,
    inputValue,
    filterByNumericValues,
  } = useContext(StarWarsContext);

  const handleChange = ({ target }) => {
    const { value } = target;

    if (target.id === 'input-name') setInputName(value);

    if (target.id === 'select-column') setSelectedCategory(value);

    if (target.id === 'select-comparison') setSelectedComparison(value);

    if (target.id === 'input-value') setInputValue(value);
  };

  const handleSearch = () => {
    const infosFromFilter = {
      column: selectedCategory,
      comparison: selectedComparison,
      value: inputValue,
    };

    const resultFilter = filterByNumericValues
      .find((filter) => filter.column === selectedCategory);

    if (!resultFilter) {
      setColumnOptions(columnOptions.filter((item) => item !== selectedCategory));
      setFilterByNumericValues((previousState) => [...previousState, infosFromFilter]);
    }
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
        { columnOptions.map((option, index) => (
          <option value={ option } key={ index }>{ option }</option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        id="select-comparison"
        onChange={ handleChange }
      >
        { filterComparisonOptions.map((option, index) => (
          <option value={ option } key={ index }>{ option }</option>
        )) }
      </select>

      <input
        type="number"
        data-testid="value-filter"
        placeholder="Insira um número"
        id="input-value"
        value={ inputValue }
        onChange={ handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSearch }
      >
        Filtrar
      </button>
    </div>
  );
}
