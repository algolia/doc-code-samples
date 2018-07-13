import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import Hit from './Hit';

class InfiniteHits extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    minHitsPerPage: PropTypes.number.isRequired,
    refine: PropTypes.func.isRequired,
  };

  sentinel = null;

  onReachThreshold = entries => {
    const { hits, minHitsPerPage, refine } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hits.length >= minHitsPerPage) {
        refine();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onReachThreshold);

    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { hits } = this.props;

    return (
      <div className="ais-InfiniteHits">
        <ul className="ais-InfiniteHits-list">
          {hits.map(hit => (
            <li key={hit.objectID} className="ais-InfiniteHits-item">
              <Hit hit={hit} />
            </li>
          ))}
          <li
            className="ais-InfiniteHits-sentinel"
            ref={c => (this.sentinel = c)}
          />
        </ul>
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
