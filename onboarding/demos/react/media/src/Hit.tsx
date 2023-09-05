import React, { useState } from 'react'
import { Highlight, Snippet } from 'react-instantsearch-hooks-web'
import type { Hit } from 'instantsearch.js'

type HitProps = {
  hit: Hit
}

export function Hit({ hit }: HitProps) {
  const [image, setImage] = useState(hit.image)
  return (
    <div>
      <article>
        <div className="post-img">
          <a href={hit.permalink}>
            <img
              src={image}
              onError={() =>
                setImage('https://fakeimg.pl/400x200?text=Preview&font=noto')
              }
            />
          </a>
        </div>
        <div className="post-content">
          <div className="post-date">{hit.post_date_formatted}</div>
          <h2 className="entry-title">
            <a href={hit.permalink} rel="bookmark">
              <Highlight
                attribute="post_title"
                hit={hit}
                highlightedTagName="em"
              />
            </a>
          </h2>
          <div className="post-excerpt">
            <Snippet attribute="content" hit={hit} />
          </div>
          <div className="entry-meta clear">
            <div className="author-gravatar">
              <img src={hit.author_image_url} width="40" height="40" />
            </div>
            <div className="entry-author-content">
              <div className="author-name">
                <Highlight
                  attribute="author_name"
                  hit={hit}
                  highlightedTagName="em"
                />
              </div>
              <div className="post-meta-info">
                {hit.time_to_read} min read in{' '}
                <Highlight
                  attribute="categories"
                  hit={hit}
                  highlightedTagName="em"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
