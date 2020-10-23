import React from 'react';

// component imports
import { AllData } from './AllData';
import { Selector } from './Selector';

import { Fetch } from './Fetch';
import { GraphQL } from './GraphQL';

import '../styles/styles.scss';

function App () {
  return (
    <div className="App">
      <h1>Data fetching managment</h1>
      <div className='control'>
        <AllData />
        <Selector />
      </div>
      <div className='data'>
        <Fetch />
        <GraphQL />
      </div>
    </div>
  );
}

export default App;
