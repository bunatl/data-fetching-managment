import React, { createContext, useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

// component imports
import { AllData } from './AllData';
import { Selector } from './Selector';
import { Fetch } from './Fetch';
import { GraphQL } from './GraphQL';

import '../styles/styles.scss';
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache()
});

export const SelectContext = createContext('');
export const App = () => {
  const [ selectValue, setSelectValue ] = useState('Whole DB');
  const providerValue = useMemo(() => ({ selectValue, setSelectValue }), [ selectValue ]);

  return (
    <ApolloProvider client={ client }>
      <SelectContext.Provider value={ providerValue }>
        <div className="App">
          <h1>Data fetching managment</h1>
          {/* <div className='control'> */ }
          <Selector />
          {/* </div> */ }
          <div className='data'>
            <AllData />
            <Fetch />
            <GraphQL />
          </div>
        </div>
      </SelectContext.Provider>
    </ApolloProvider>
  );
};
