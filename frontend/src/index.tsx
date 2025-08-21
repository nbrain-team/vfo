import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { seedMockDataIfEmpty } from './adminData';

seedMockDataIfEmpty();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
