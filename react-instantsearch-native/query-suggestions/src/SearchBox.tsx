import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-core';
import { Suggestions } from './Suggestions';

type SearchBoxProps = UseSearchBoxProps & {
  onChange: (newValue: string) => void;
  suggestionsIndexName: string;
};

export function SearchBox({
  onChange,
  suggestionsIndexName,
  ...props
}: SearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<TextInput>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={inputValue}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onChangeText={(newValue) => {
            setQuery(newValue);
            onChange(newValue);
          }}
          onFocus={() => setShowSuggestions(true)}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
          placeholder="Search for products..."
        />
      </View>
      {showSuggestions && (
        <Suggestions
          indexName={suggestionsIndexName}
          onSelect={(value) => {
            setQuery(value);
            inputRef.current?.blur();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252b33',
    padding: 18,
    zIndex: 1,
  },
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
