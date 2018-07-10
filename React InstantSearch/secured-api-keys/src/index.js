import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const SERVER_DATA = window.SERVER_DATA;

delete window.SERVER_DATA;

ReactDOM.render(
  <App apiKey={SERVER_DATA.ALGOLIA_API_KEY} />,
  document.getElementById('root')
);
