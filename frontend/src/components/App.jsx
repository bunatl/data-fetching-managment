import React, { createContext, useMemo } from 'react';

// component imports
import { AllData } from './AllData';
import { Selector } from './Selector';

import { Fetch } from './Fetch';
import { GraphQL } from './GraphQL';

import '../styles/styles.scss';
import { useState } from 'react';

export const SelectContext = createContext('');
export const App = () => {
  const [ selectValue, setSelectValue ] = useState('Whole DB');
  const providerValue = useMemo(() => ({ selectValue, setSelectValue }), [ selectValue ]);

  return (
    <SelectContext.Provider value={ providerValue }>
      <div className="App">
        <h1>Data fetching managment</h1>
        <div className='data'>
          <Fetch />
          <GraphQL />
        </div>
        <div className='control'>
          <AllData />
          <Selector />
        </div>
      </div>
    </SelectContext.Provider>
  );
};
