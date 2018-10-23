import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InstantSearch,
  Configure,
  Hits,
  Highlight,
  connectSearchBox,
} from 'react-instantsearch-dom';
import AutoComplete from './AutoComplete';
import './App.css';

const VirtalSearchBox = connectSearchBox(() => null);

class App extends Component {
  state = {
    query: '',
  };

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState({
      query: suggestion.name,
    });
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;

    return (
      <div className="container">
        <h1>React InstantSearch - Results page with autocomplete</h1>
        <InstantSearch
          appId="B1G2GM9NG0"
          apiKey="aadef574be1f9252bb48d4ea09b5cfe5"
          indexName="demo_ecommerce"
          onSearchStateChange={this.onAutoCompleteStateChange}
        >
          <Configure hitsPerPage={5} />
          <AutoComplete
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionCleared={this.onSuggestionCleared}
          />
        </InstantSearch>

        <InstantSearch
          appId="B1G2GM9NG0"
          apiKey="aadef574be1f9252bb48d4ea09b5cfe5"
          indexName="demo_ecommerce"
        >
          <VirtalSearchBox defaultRefinement={query} />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <Highlight attribute="name" hit={props.hit} />
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
