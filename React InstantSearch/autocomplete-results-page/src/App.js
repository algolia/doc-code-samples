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
    value: '',
  };

  onValueChange = value => {
    this.setState(() => ({
      value,
    }));
  };

  render() {
    const { value } = this.state;

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
          <AutoComplete onValueChange={this.onValueChange} />
        </InstantSearch>

        <InstantSearch
          appId="B1G2GM9NG0"
          apiKey="aadef574be1f9252bb48d4ea09b5cfe5"
          indexName="demo_ecommerce"
        >
          <VirtalSearchBox defaultRefinement={value} />
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
