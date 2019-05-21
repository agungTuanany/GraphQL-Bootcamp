import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Booklist from './components/Booklist';
import AddBook from './components/AddBook';

/* apollo client setup */
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'

});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1> GraphQL BOOTCAMP</h1>
        <Booklist />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
