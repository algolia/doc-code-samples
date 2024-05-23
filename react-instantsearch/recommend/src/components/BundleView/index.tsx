import React, { useEffect, useMemo, useState } from 'react';

import { BaseObject, BundleViewTranslations } from '../../types';

import './style.css';

function getAmountDefault<TObject extends BaseObject>(items: TObject[]) {
  return items.reduce((sum, current) => sum + current.price.value, 0);
}

function formatPriceDefault(price: number) {
  return `$${price}`;
}

type BundleViewProps<TObject> = {
  currentItem: TObject;
  formatPrice?: (price: number) => string;
  getAmount?(items: TObject[]): number;
  itemComponent({ item }): JSX.Element;
  items: TObject[];
  translations?: BundleViewTranslations;
};

export function BundleView<TObject extends BaseObject>(
  props: BundleViewProps<TObject>
): JSX.Element {
  const items = Array.from(new Set([props.currentItem, ...props.items]));
  const formatPrice = props.formatPrice || formatPriceDefault;
  const getAmount = props.getAmount || getAmountDefault;

  const [selectedItems, setSelectedItems] = useState(() => items);
  const [price, setPrice] = useState(() => getAmount(selectedItems));
  const translations = useMemo(
    () => ({
      totalPrice: 'Total price',
      thisArticle: 'This article',
      addToCart: (count: number) => {
        if (count === 1) {
          return `Add ${count} product to cart`;
        }

        return `Add ${count} products to cart`;
      },
      ...props.translations,
    }),
    [props.translations]
  );

  useEffect(() => {
    setPrice(getAmount(selectedItems));
  }, [selectedItems, getAmount]);

  return (
    <div className="uic-BundleView-container">
      <div className="uic-BundleView-items">
        <ol className="uic-BundleView-list">
          {items.map((item, index) => {
            const isSelected = Boolean(
              selectedItems.find((x) => x.objectID === item.objectID)
            );

            function onChange(event: React.ChangeEvent<HTMLInputElement>) {
              setSelectedItems((items) =>
                event.target.checked
                  ? [...items, item]
                  : items.filter((x) => x.objectID !== item.objectID)
              );
            }

            return (
              <li
                key={item.objectID}
                className={[
                  'uic-BundleView-item',
                  isSelected && 'uic-BundleView-item--selected',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="uic-BundleView-itemContainer">
                  <div className="uic-BundleView-itemContainer-hit">
                    <props.itemComponent item={item} />
                  </div>
                  {index < items.length - 1 && (
                    <div className="uic-BundleView-plus">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect
                          width="24"
                          height="24"
                          rx="12"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.54169C12.3452 5.54169 12.625 5.82151 12.625 6.16669V17.8334C12.625 18.1785 12.3452 18.4584 12 18.4584C11.6548 18.4584 11.375 18.1785 11.375 17.8334V6.16669C11.375 5.82151 11.6548 5.54169 12 5.54169Z"
                          fill="#fff"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.54166 12C5.54166 11.6548 5.82148 11.375 6.16666 11.375H17.8333C18.1785 11.375 18.4583 11.6548 18.4583 12C18.4583 12.3452 18.1785 12.625 17.8333 12.625H6.16666C5.82148 12.625 5.54166 12.3452 5.54166 12Z"
                          fill="#fff"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <label className="uic-BundleView-label">
                  <input
                    className="uic-BundleView-checkbox"
                    type="checkbox"
                    defaultChecked={isSelected}
                    onChange={onChange}
                  />
                  {item.objectID === props.currentItem.objectID && (
                    <span className="uic-BundleView-label-currentArticle">
                      {translations.thisArticle}:
                    </span>
                  )}
                  <span className="uic-BundleView-label-name">{item.name}</span>
                  <span className="uic-BundleView-label-price">
                    {formatPrice(item.price.value)}
                  </span>
                </label>
              </li>
            );
          })}
        </ol>
      </div>

      {selectedItems.length > 0 && (
        <div className="uic-BundleView-cart">
          <div>
            {translations.totalPrice}:{' '}
            <span className="uic-BundleView-label-price">
              {formatPrice(price)}
            </span>
          </div>
          <button className="uic-BundleView-addToCart">
            {translations.addToCart(selectedItems.length)}
          </button>
        </div>
      )}
    </div>
  );
}
