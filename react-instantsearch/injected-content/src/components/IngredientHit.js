import React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';

export function IngredientHit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="title" hit={props.hit} />
      </h1>
      <p>
        <Snippet attribute="summary" hit={props.hit} />
      </p>
      {props.hit.pageId ? (
        <p>
          <a
            href={`http://en.wikipedia.org/?curid=${props.hit.pageId}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            More on Wikipedia
          </a>
        </p>
      ) : null}
    </article>
  );
}
