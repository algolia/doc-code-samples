import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';
import Filters from './src/Filters';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const VirtualRefinementList = connectRefinementList(() => null);

class App extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  state = {
    isModalOpen: false,
    searchState: {},
  };

  toggleModal = () =>
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));

  onSearchStateChange = searchState =>
    this.setState(() => ({
      searchState,
    }));

  render() {
    const { isModalOpen, searchState } = this.state;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="demo_ecommerce"
            root={this.root}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
          >
            <VirtualRefinementList attribute="brand" />

            <Filters
              isModalOpen={isModalOpen}
              searchClient={searchClient}
              searchState={searchState}
              toggleModal={this.toggleModal}
              onSearchStateChange={this.onSearchStateChange}
            />

            <SearchBox />
            <Button
              title="Filters"
              color="#252b33"
              onPress={this.toggleModal}
            />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
