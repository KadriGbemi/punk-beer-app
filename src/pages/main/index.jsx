import React from 'react';

import Header from '../../component/header';
import BeerList from '../../component/section/list';

import './main.scss';

function Main() {
  return (
    <div className="main">
      <div className="main__header">
        <Header />
      </div>
      <div className="main__body">
        <BeerList />
      </div>
    </div>
  );
}

export default Main;
