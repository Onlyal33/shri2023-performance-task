import { createRoot } from 'react-dom/client';
import MainDevices from './App.jsx';
import Header from './Header.jsx';

createRoot(document.getElementById('main')).render(
    <MainDevices />
)

createRoot(document.getElementById('header')).render(
    <Header />
)