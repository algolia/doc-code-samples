import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

export function RecipeHit(props) {
  return (
    <article className="Block-1/2 sm:Block-full">
      <div>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
          <span className="badge">{props.hit.course}</span>
        </h1>
        <p>
          {props.hit.state && <Highlight attribute="state" hit={props.hit} />}{' '}
          {props.hit.region && <Highlight attribute="region" hit={props.hit} />}
        </p>
      </div>
      <p>
        <strong>Ingredients:</strong>{' '}
        <Highlight attribute="ingredients" hit={props.hit} />
      </p>
    </article>
  );
}
