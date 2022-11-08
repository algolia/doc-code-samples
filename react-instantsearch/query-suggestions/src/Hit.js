import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch-dom';

const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
