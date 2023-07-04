import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import { MapContainer, TileLayer } from 'react-leaflet';
import './env';

import { Airports } from './Airports';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export function App() {
  return (
    <>
      <header className="header">
        <h1 className="header-title">
          <a href="/">geo-search</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/react-instantsearch">
            React InstantSearch Hooks
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="airports"
          insights={true}
        >
          <SearchBox
            placeholder="Search for airports..."
            className="searchbox"
          />
          <MapContainer
            className="map"
            center={[48.85, 2.35]}
            zoom={10}
            minZoom={4}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Airports />
          </MapContainer>
        </InstantSearch>
      </div>
    </>
  );
}
