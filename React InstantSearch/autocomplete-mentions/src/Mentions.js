import React from 'react';
import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
import Mention from 'antd/lib/mention';
import 'antd/lib/mention/style/index.css';

const Mentions = ({ hits, refine }) => (
  <Mention
    style={{ width: '100%', height: 100 }}
    suggestions={hits.map(hit => hit.name)}
    placeholder="Give someone an @-mention"
    notFoundContent="No suggestions"
    onSearchChange={name => refine(name)}
    multiLines
  />
);

Mentions.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectAutoComplete(Mentions);
