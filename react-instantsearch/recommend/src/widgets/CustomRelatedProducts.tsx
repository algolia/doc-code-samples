import React from 'react';

import {
  UseRelatedProductsProps,
  useRelatedProducts,
} from 'react-instantsearch';

import type { BaseHit } from 'instantsearch.js';

type CustomRelatedProductsProps<THit extends BaseHit> =
  UseRelatedProductsProps<THit> & {
    containerComponent: (props: {
      items: THit[];
      itemComponent: CustomRelatedProductsProps<THit>['itemComponent'];
    }) => JSX.Element;
    itemComponent: (props: { item: THit }) => JSX.Element;
    title?: string;
  };

export function CustomRelatedProducts<THit extends BaseHit>({
  containerComponent: ContainerComponent,
  itemComponent: ItemComponent,
  title = 'Related Products',
  ...props
}: CustomRelatedProductsProps<THit>) {
  const { items } = useRelatedProducts<THit>(props);

  return (
    <section className="ais-RelatedProducts">
      <h2 className="ais-RelatedProducts-title">{title}</h2>
      <div className="ais-RelatedProducts-container">
        <ContainerComponent items={items} itemComponent={ItemComponent} />
      </div>
    </section>
  );
}
