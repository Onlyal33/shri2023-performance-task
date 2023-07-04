import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './App.jsx'
import Header from './Header.jsx'
//import './reset.css'
//import './styles.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>,
)
