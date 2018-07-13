import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const Hit = ({ hit }) => (
  <div>
    <img src={hit.image} align="left" alt={hit.name} />
    <div className="hit-name">
      <Highlight attribute="name" hit={hit} />
    </div>
    <div className="hit-description">
      <Highlight attribute="description" hit={hit} />
    </div>
    <div className="hit-price">${hit.price}</div>
  </div>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
