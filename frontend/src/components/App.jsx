import React, { createContext, useMemo, useState } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// component imports
import { AllData } from './AllData';
import { Selector } from './Selector';
import { Fetch } from './Fetch';
import { GraphQL } from './GraphQL';

import '../styles/styles.scss';

const client = new ApolloClient({
  uri: `${ process.env.REACT_APP_FETCH_URI }/graphql`
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
    </ApolloProvider>
  );
};
