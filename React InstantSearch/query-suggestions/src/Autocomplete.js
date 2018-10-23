import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  createMostReleventHitForAllCategories(hit) {
    return {
      ...hit,
      // eslint-disable-next-line
      instant_search: {
        ...hit.instant_search,
        facets: {
          ...hit.instant_search.facets,
          // eslint-disable-next-line
          exact_matches: {
            ...hit.instant_search.facets.exact_matches,
            categories: [{ value: 'ALL_CATEGORIES' }],
          },
        },
      },
    };
  }

  onChange = (_, { newValue }) => {
    if (!newValue) {
      this.props.onSuggestionCleared();
    }

    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.query;
  }

  renderSuggestion(hit) {
    const [category] = hit.instant_search.facets.exact_matches.categories;

    return (
      <span>
        <Highlight attribute="query" hit={hit} tagName="mark" /> in{' '}
        <i>
          {category.value !== 'ALL_CATEGORIES'
            ? category.value
            : 'All categories'}
        </i>
      </span>
    );
  }

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search for a product...',
      onChange: this.onChange,
      value,
    };

    const [hit] = hits;
    const hitWithAllCategories = hit
      ? [this.createMostReleventHitForAllCategories(hit)]
      : [];

    return (
      <AutoSuggest
        suggestions={hitWithAllCategories.concat(hits)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
