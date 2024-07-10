import React from 'react';
import ReactDOM from 'react-dom';
import { liteClient as algoliasearch } from 'algoliasearch-v5/lite';
import App from './App';
import './index.css';

const SERVER_DATA = window.SERVER_DATA;

delete window.SERVER_DATA;

const searchClient = algoliasearch('B1G2GM9NG0', SERVER_DATA.ALGOLIA_API_KEY);

ReactDOM.render(
  <App searchClient={searchClient} />,
  document.getElementById('root')
);
