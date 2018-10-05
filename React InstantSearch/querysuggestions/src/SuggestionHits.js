import React from 'react';
import PropTypes from 'prop-types';
import { connectHits, Highlight } from 'react-instantsearch-dom';

const Item = ({
  hit,
  onPressItem,
  category = null,
  withCategoryLabel = false,
}) => {
  let categoryLabel = '';
  if (withCategoryLabel) {
    categoryLabel = category ? (
      <span> in {category}</span>
    ) : (
      <span> in all our categories</span>
    );
  }
  const onClick = () => {
    onPressItem(hit.query, category);
  };
  return (
    <div className="suggestions--item" onClick={onClick}>
      <Highlight
        attribute="query"
        hit={hit}
        highlightProperty="_highlightResult"
        inverted
      />
      {categoryLabel}
    </div>
  );
};

Item.propTypes = {
  hit: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
  category: PropTypes.string,
  withCategoryLabel: PropTypes.bool,
};

const ItemAllCategories = ({ hit, onPressItem }) => (
  <Item onPressItem={onPressItem} hit={hit} withCategoryLabel={true} />
);

ItemAllCategories.propTypes = {
  hit: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const ItemSingleCategory = ({ hit, onPressItem }) => (
  <Item
    onPressItem={onPressItem}
    category={hit.instant_search.facets.exact_matches.categories[0].value}
    hit={hit}
    withCategoryLabel={true}
  />
);

ItemSingleCategory.propTypes = {
  hit: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

const ItemOtherSuggetion = ({ hit, onPressItem }) => (
  <Item
    onPressItem={onPressItem}
    category={hit.instant_search.facets.exact_matches.categories[0].value}
    hit={hit}
    withCategoryLabel={true}
  />
);

ItemOtherSuggetion.propTypes = {
  hit: PropTypes.object.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default connectHits(({ hits, onPressItem }) => {
  if (hits.length === 0) return null;
  const items = [
    <ItemAllCategories hit={hits[0]} key="=2" onPressItem={onPressItem} />,
  ];
  items.push(
    <ItemSingleCategory hit={hits[0]} key="-1" onPressItem={onPressItem} />
  );
  hits.slice(1).forEach((hit, idx) => {
    items.push(
      <ItemOtherSuggetion hit={hit} key={idx} onPressItem={onPressItem} />
    );
  });

  return <div>{items}</div>;
});
