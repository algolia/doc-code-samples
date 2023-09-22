import React, { useRef } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch } from 'react-instantsearch-core';

import { InfiniteHits } from './src/InfiniteHits';
import { SearchBox } from './src/SearchBox';
import { Highlight } from './src/Highlight';
import { ProductHit } from './types/ProductHit';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export default function App() {
  const listRef = useRef<FlatList>(null);
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="instant_search">
          <Configure highlightPreTag="<mark>" highlightPostTag="</mark>" />
          <SearchBox
            onChange={() =>
              listRef.current?.scrollToOffset({ animated: false, offset: 0 })
            }
            suggestionsIndexName="instant_search_demo_query_suggestions"
          />
          <InfiniteHits ref={listRef} hitComponent={Hit} />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
}

type HitProps = {
  hit: ProductHit;
};

function Hit({ hit }: HitProps) {
  return (
    <Text>
      <Highlight hit={hit} attribute="name" />
    </Text>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
    // @ts-ignore 100vh is valid but not recognized by react-native
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
});
