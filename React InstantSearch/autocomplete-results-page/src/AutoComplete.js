import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  timeoutId = null;

  state = {
    value: this.props.currentRefinement,
  };

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId);
  }

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue,
    });

    const delay = newValue ? 500 : 0;
    window.clearTimeout(this.timeoutId);
    this.timeoutId = window.setTimeout(() => {
      this.props.onValueChange(newValue);
    }, delay);
  };

  onSuggestionSelected = (_, { suggestionValue }) => {
    window.clearTimeout(this.timeoutId);
    this.props.onValueChange(suggestionValue);
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.name;
  }

  renderSuggestion(hit) {
    return <Highlight attribute="name" hit={hit} tagName="mark" />;
  }

  render() {
    const { hits } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search for a product...',
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
