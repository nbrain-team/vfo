import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { seedMockDataIfEmpty } from './adminData';
import GoogleAuthProviderWrapper from './providers/GoogleAuthProvider';

seedMockDataIfEmpty();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleAuthProviderWrapper>
      <App />
    </GoogleAuthProviderWrapper>
  </React.StrictMode>,
)
