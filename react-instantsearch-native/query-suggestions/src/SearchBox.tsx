import React, { useEffect, useRef, useState } from 'react';
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
  const [value, setValue] = useState(query);
  const inputRef = useRef<TextInput>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== value) {
      refine(value);
    }
    // We don't want to track when the InstantSearch query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, refine]);

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (!inputRef.current?.isFocused() && query !== value) {
      setValue(query);
    }
    // We don't want to track when the React state value changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onChangeText={(newValue) => {
            setValue(newValue);
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
            setValue(value);
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
