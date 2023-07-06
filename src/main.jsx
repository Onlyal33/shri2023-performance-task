import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import Main from './App.jsx'
import Header from './Header.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <Header />
    <Main />
  </StrictMode>,
)
