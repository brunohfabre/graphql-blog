import React from 'react';
import { ApolloProvider } from '@apollo/client';

import client from './services/graphql';

import GlobalStyle from './styles/global';

import Routes from './routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle></GlobalStyle>
      <Routes />
    </ApolloProvider>
  )
}

export default App;