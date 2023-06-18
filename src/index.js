import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const API_Link='https://648845e70e2469c038fd615e.mockapi.io/AdminDashboard'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

