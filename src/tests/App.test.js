import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const timeOut = delay => 
  new Promise(resolve => setTimeout(resolve, delay)
);
//Fonte do código que utiliza o setTimeOut para aguardar que a Promise se resolva: https://www.30secondsofcode.org/articles/s/javascript-await-timeout

describe("Testes na aplicação Star Wars Planet Search", () => {
  it('Verifica se os elementos são renderizados corretamente na página inicial', () => {
    render(<App />);

    const nameInput = screen.getByTestId('name-filter');
    const categorySelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(nameInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

  });

  it('Verifica se a tabela foi renderizada com a quantidade correta de linhas e colunas', async () => {
    render(<App />);

    await timeOut(2000);

    const allRows = screen.getAllByRole('row');
    const allHeaders = screen.getAllByRole('columnheader')

    expect(allRows.length).toBe(11);
    expect(allHeaders.length).toBe(13);

  });

  it('Verifica se o filtro por nome está funcionando', async () => {
    render(<App />);

    await timeOut(2000);

    const nameInput = screen.getByTestId('name-filter');

    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, 'da');

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

  })

  it('Verifica se o filtro por nome está funcionando', async () => {
    render(<App />);

    await timeOut(2000);

    const nameInput = screen.getByTestId('name-filter');

    expect(nameInput).toBeInTheDocument();

    userEvent.type(nameInput, 'da');


    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

  })

  it('Verifica se o filtro de comparação está funcionando', async () => {
    render(<App />);

    await timeOut(2000);

    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(comparisonSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    userEvent.selectOptions(comparisonSelect, 'maior que');
    userEvent.type(valueInput, '2000000000')
    userEvent.click(filterButton);

    const coruscant = screen.getByRole('cell', { name: /coruscant/i });
    expect(coruscant).toBeInTheDocument();
  })
});
