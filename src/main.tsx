import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './assets/index.css'

const client = new ApolloClient({
  uri: 'https://gateway.kotini.co/graphql',
  cache: new InMemoryCache(),
})


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
