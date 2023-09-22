import { Hit as AlgoliaHit } from '@algolia/client-search';
import { Configure, Index, useHits } from 'react-instantsearch-core';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Highlight } from './Highlight';

type SuggestionHit = AlgoliaHit<{
  indexName: string;
  query: string;
}>;

type SuggestionsProps = {
  indexName: string;
  onSelect: (value: string) => void;
};

export function Suggestions({ indexName, onSelect }: SuggestionsProps) {
  return (
    <View style={styles.overlay}>
      <Index indexName={indexName}>
        <Configure hitsPerPage={5} />
        <View style={styles.list}>
          <Text style={styles.listTitle}>Suggestions</Text>
          <List onSelect={onSelect} />
        </View>
      </Index>
    </View>
  );
}

type ListProps = {
  onSelect: (value: string) => void;
};

function List({ onSelect }: ListProps) {
  const { hits } = useHits();

  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      renderItem={({ item }) => (
        <Suggestion hit={item as unknown as SuggestionHit} onPress={onSelect} />
      )}
      keyboardShouldPersistTaps="always"
    ></FlatList>
  );
}

type SuggestionProps = {
  hit: SuggestionHit;
  onPress: (value: string) => void;
};

function Suggestion({ hit, onPress }: SuggestionProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={() => onPress(hit.query)}
    >
      <Icon name="search" size={13} style={styles.itemIcon} />
      <Highlight
        hit={hit}
        attribute="query"
        highlightedStyle={styles.highlighted}
        nonHighlightedStyle={styles.nonHighlighted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 84,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000aa',
    zIndex: 1,
  },
  list: {
    backgroundColor: '#ffffff',
    padding: 9,
  },
  listTitle: {
    fontSize: 18,
    padding: 9,
    paddingBottom: 9,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    paddingLeft: 9,
    borderRadius: 8,
  },
  itemIcon: {
    marginRight: 9,
  },
  itemPressed: {
    backgroundColor: '#f0f0f0',
  },
  highlighted: {
    fontWeight: 'normal',
    color: 'black',
  },
  nonHighlighted: {
    fontWeight: 'bold',
    color: 'black',
  },
});
