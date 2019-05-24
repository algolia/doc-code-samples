import { connectHitInsights, Highlight } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import React from 'react';

function Hit({ hit, insights }) {
  return (
    <div>
      <img src={hit.image} align="left" alt={hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={hit} />
      </div>
      <div className="hit-price">${hit.price}</div>
      <button
        className="hit-action"
        onClick={() => {
          insights('clickedObjectIDsAfterSearch', {
            eventName: 'Add to favorite',
          });
        }}
      >
        Send click
      </button>
      <button
        className="hit-action"
        onClick={() => {
          insights('convertedObjectIDsAfterSearch', {
            eventName: 'Add to basket',
          });
        }}
      >
        Send conversion
      </button>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  insights: PropTypes.func.isRequired,
};

export const HitWithInsights = connectHitInsights(window.aa)(Hit);
