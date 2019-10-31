import React, { useState } from 'react';
import './App.css';
import SignInSide from './components/SignInSide.js';
import ContextApi from './Context'

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

import Home from './components/Home'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('token');

// Create a WebSocket link :
const link = new WebSocketLink({
  uri: `ws://graphql-chatapp-api.herokuapp.com/graphql`,
  options: {
    reconnect: true,
  }
})


const subscriptionMiddleware = {
  applyMiddleware: async (options, next) => {
    options.token = `Bearer ${token}`
    next()
  },
}

link.subscriptionClient.use([subscriptionMiddleware])


const cache = new InMemoryCache();
// const link = wsLink
const client = new ApolloClient({
  link,
  cache
})

function App() {  
  const [ stateToken, setTokenFromApp ] = useState(token)

  return (
    <ApolloProvider client={client}>
      <ContextApi.Provider value={token}>
        <div className="App">
          <header className="App-header">
          {
            stateToken ? <Home setTokenFromApp={setTokenFromApp} /> : <SignInSide setTokenFromApp={setTokenFromApp}/>
          }
          <ToastContainer />
          </header>
        </div>
      </ContextApi.Provider>
    </ApolloProvider>
  );
}

export default App;
