import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInSide from './components/SignInSide.js';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <SignInSide />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
