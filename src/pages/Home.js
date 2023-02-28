import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import Filters from '../components/Filters';

function Home() {
  return (
    <div>
      <Header />
      <Filters />
      <Table />
    </div>
  );
}

export default Home;
