import React from 'react';
import { createClassNames, connectInfiniteHits } from 'react-instantsearch-dom';

import { connectInjectedHits } from './connectInjectedHits';

const cx = createClassNames('Hits');

export const InjectedInfiniteHits = connectInfiniteHits(
  connectInjectedHits(({ injectedHits, hasMore, refineNext }) => (
    <div className={cx('')}>
      <ul className={cx('list')}>
        {injectedHits.map(({ props, type, Hit }, index) => {
          return (
            <li
              key={index}
              className={[...new Set([cx('item'), cx(type)])].join(' ')}
            >
              <Hit {...props} />
            </li>
          );
        })}
      </ul>
      {hasMore ? (
        <button className={cx('loadMore')} onClick={refineNext}>
          Load more
        </button>
      ) : null}
    </div>
  ))
);
