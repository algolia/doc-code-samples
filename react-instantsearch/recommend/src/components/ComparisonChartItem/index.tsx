import React from 'react';
import './style.css';
import { InsightsClient } from 'search-insights';

import { indexName } from '../../config';
import { ProductHit, ProductReviews } from '../../types';
import { ButtonComponent } from '../common';

type ChartItemProps<TObject> = {
  item: TObject;
  insights: InsightsClient;
  onSelect(item: TObject): void;
};

type ChartItemReviews = {
  reviews: ProductReviews;
};

export const StarRating: React.FC<ChartItemReviews> = ({
  reviews,
}): JSX.Element => {
  const { rating, count } = reviews;

  return (
    <div className="uic-StarRating-container">
      <div>
        {[...Array(rating)].map((star, index) => (
          <span key={index} className="uic-StarRating-star">
            &#9733;
          </span>
        ))}
        {[...Array(5 - rating)].map((star, index) => (
          <span key={index} className="uic-StarRating-star">
            &#9734;
          </span>
        ))}
      </div>

      <div>({count})</div>
    </div>
  );
};

export const ComparisonChartItem: React.FC<ChartItemProps<ProductHit>> = ({
  item,
  onSelect,
  insights,
}): JSX.Element => {
  return (
    <div className="uic-ComparisonChart-itemContainer">
      <div className="uic-ComparisonChart-itemHeading">
        <a
          className="Hit Item-link"
          href={item.url}
          onClick={(event) => {
            event.preventDefault();

            onSelect(item);
            insights('clickedObjectIDs', {
              objectIDs: [item.objectID],
              eventName: 'Product Clicked',
              index: indexName,
            });
          }}
        >
          <div className="uic-ComparisonChart-itemImageContainer">
            <img
              className="uic-ComparisonChart-itemImage"
              src={item.image_urls[0]}
              alt={item.name}
            />
          </div>
          <div className="uic-ButtonComponent-container">
            <ButtonComponent
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                insights('convertedObjectIDsAfterSearch', {
                  eventName: 'Product Added To Cart',
                  objectIDs: [item.objectID],
                  index: indexName,
                  queryID: item.__queryID,
                });
              }}
              label="Add to cart"
            />
          </div>
        </a>
      </div>
      <div className="uic-ComparisonChart-item">{item.name}</div>
      <div className="uic-ComparisonChart-item">{item.brand}</div>
      <div className="uic-ComparisonChart-item">${item.price.value}</div>
      <div className="uic-ComparisonChart-item">{item.gender}</div>
      <div className="uic-ComparisonChart-item">{item.color.original_name}</div>
      <div className="uic-ComparisonChart-item">
        <StarRating reviews={item.reviews} />
      </div>
    </div>
  );
};
