import algoliasearch from 'algoliasearch/lite';
import React, { useRef, useState } from 'react';
import {
  Highlight,
  InstantSearch,
  useAutocomplete,
  useInstantSearch,
} from 'react-instantsearch';
import getCaretCoordinates from 'textarea-caret';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

// The word under the caret, with its [start, end] range in the text.
function getActiveToken(input, cursor) {
  const re = /\S+/g;
  let match;

  while ((match = re.exec(input))) {
    const start = match.index;
    const end = start + match[0].length;

    if (start <= cursor && cursor <= end) {
      return { word: match[0], range: [start, end] };
    }
  }

  return null;
}

// A mention is "@" followed by 1–15 word characters.
const isMention = (word) => /^@\w{1,15}$/.test(word);

function Mentions() {
  const { indices, refine } = useAutocomplete();
  const { status } = useInstantSearch();
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [activeToken, setActiveToken] = useState(null);

  const hits = indices[0]?.hits ?? [];
  const isMentionActive = Boolean(activeToken && isMention(activeToken.word));
  const isLoading = isMentionActive && status === 'stalled';
  const isOpen = isMentionActive && (hits.length > 0 || isLoading);
  const caret =
    inputRef.current && activeToken
      ? getCaretCoordinates(inputRef.current, activeToken.range[0])
      : { top: 0, left: 0, height: 0 };

  // Only search when the caret sits inside a mention.
  function onInput() {
    const cursor = inputRef.current?.selectionEnd ?? 0;
    const token = getActiveToken(inputRef.current?.value ?? '', cursor);

    setActiveToken(token);

    if (token && isMention(token.word)) {
      refine(token.word.slice(1));
    }
  }

  // Replace the active mention with the chosen handle.
  function onSelect(hit) {
    if (!activeToken) return;

    const [start, end] = activeToken.range;
    const replacement = `@${hit.handle} `;
    const caretPosition = start + replacement.length;

    setValue(value.slice(0, start) + replacement + value.slice(end));
    setActiveToken(null);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(caretPosition, caretPosition);
    });
  }

  return (
    <div className="mentions">
      <textarea
        ref={inputRef}
        placeholder="What's happening?"
        maxLength={280}
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          onInput();
        }}
        onClick={onInput}
        onKeyUp={onInput}
      />
      {isOpen && (
        <ul
          className="mentions-panel"
          style={{ top: caret.top + caret.height, left: caret.left }}
        >
          {isLoading && hits.length === 0 ? (
            <li className="account-loading">Searching…</li>
          ) : (
            hits.map((hit) => (
              <li key={hit.handle}>
                <button
                  type="button"
                  className="account-item"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onSelect(hit);
                  }}
                >
                  <img src={hit.image} alt="" />
                  <span>
                    <span className="account-name">
                      <Highlight hit={hit} attribute="name" />
                    </span>
                    <span className="account-handle">@{hit.handle}</span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

function App() {
  return (
    <main className="page">
      <h1 className="page-title">Headless mentions (React)</h1>
      <p className="page-subtitle">
        A custom text box with "@" mention suggestions, built with the{' '}
        <code>useAutocomplete</code> connector. Type "@" followed by a few
        letters.
      </p>

      <InstantSearch
        indexName="autocomplete_twitter_accounts"
        searchClient={searchClient}
      >
        <Mentions />
      </InstantSearch>
    </main>
  );
}

export default App;
