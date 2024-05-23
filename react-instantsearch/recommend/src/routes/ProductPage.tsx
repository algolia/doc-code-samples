import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react';
import { InstantSearch } from 'react-instantsearch';

import { useApplicationContext } from './Root';
import {
  Hit,
  BundleItem,
  BundleView,
  ComparisonChartView,
} from '../components';
import { ComparisonChartItem } from '../components/ComparisonChartItem';
import { indexName, searchClient } from '../config';
import {
  CustomFrequentlyBoughtTogether,
  CustomLookingSimilar,
  CustomRelatedProducts,
} from '../widgets';

import type { ProductHit } from '../types';

const index = searchClient.initIndex(indexName);

export function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [{ insights, selectedProduct, setSelectedProduct }] =
    useApplicationContext();

  useEffect(() => {
    if (!selectedProduct && id !== undefined) {
      index
        .search<ProductHit>('', { filters: `objectID:${id}` })
        .then(({ hits }) => {
          setSelectedProduct(hits[0]);
        });
    } else if (!selectedProduct && id === undefined) {
      navigate('/');
    }
  }, [id, navigate, selectedProduct, setSelectedProduct]);

  if (!selectedProduct) {
    return <div>Loading</div>;
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div style={{ padding: '1rem 0' }}>
        <div
          className="Hit"
          style={{ gridTemplateColumns: '150px 1fr', gap: '1rem' }}
        >
          <div className="Hit-Image" style={{ maxWidth: 150 }}>
            <img
              src={selectedProduct.image_urls[0]}
              alt={selectedProduct.name}
            />
          </div>

          <div className="Hit-Content">
            <div className="Hit-Name">{selectedProduct.name}</div>
            <div className="Hit-Description">{selectedProduct.objectID}</div>
            <footer className="Hit-Footer">
              <span className="Hit-Price">${selectedProduct.price.value}</span>
            </footer>
          </div>
        </div>
      </div>
      <CustomLookingSimilar<ProductHit>
        objectIDs={[selectedProduct.objectID]}
        itemComponent={({ item }) => (
          <Hit hit={item} insights={insights} onSelect={setSelectedProduct} />
        )}
        limit={10}
        threshold={75}
        queryParameters={{
          analytics: true,
          clickAnalytics: true,
        }}
      />
      <CustomFrequentlyBoughtTogether<ProductHit>
        objectIDs={[selectedProduct.objectID]}
        containerComponent={({ itemComponent, items }) => (
          <BundleView
            currentItem={selectedProduct}
            itemComponent={itemComponent}
            items={items}
          />
        )}
        itemComponent={({ item }) => (
          <BundleItem
            item={item}
            onSelect={setSelectedProduct}
            insights={insights}
          />
        )}
        limit={2}
        queryParameters={{
          analytics: true,
          clickAnalytics: true,
        }}
        fallbackComponent={() => (
          <CustomRelatedProducts<ProductHit>
            objectIDs={[selectedProduct.objectID]}
            containerComponent={({ items, itemComponent }) => (
              <HorizontalSlider items={items} itemComponent={itemComponent} />
            )}
            itemComponent={({ item }) => (
              <Hit
                hit={item}
                insights={insights}
                onSelect={setSelectedProduct}
              />
            )}
            limit={10}
            title="Related Products (fallback)"
            queryParameters={{
              analytics: true,
              clickAnalytics: true,
              facetFilters: [
                `hierarchical_categories.lvl0:${selectedProduct.hierarchical_categories.lvl0}`,
              ],
            }}
            fallbackParameters={{
              facetFilters: [
                `hierarchical_categories.lvl2:${selectedProduct.hierarchical_categories.lvl2}`,
              ],
            }}
          />
        )}
      />
      <CustomRelatedProducts<ProductHit>
        objectIDs={[selectedProduct.objectID]}
        containerComponent={({ items, itemComponent }) => (
          <HorizontalSlider items={items} itemComponent={itemComponent} />
        )}
        itemComponent={({ item }) => (
          <Hit hit={item} insights={insights} onSelect={setSelectedProduct} />
        )}
        limit={10}
        queryParameters={{
          analytics: true,
          clickAnalytics: true,
          facetFilters: [
            `hierarchical_categories.lvl0:${selectedProduct.hierarchical_categories.lvl0}`,
          ],
        }}
        fallbackParameters={{
          facetFilters: [
            `hierarchical_categories.lvl2:${selectedProduct.hierarchical_categories.lvl2}`,
          ],
        }}
      />
      <CustomRelatedProducts<ProductHit>
        objectIDs={[selectedProduct.objectID]}
        containerComponent={({ items, itemComponent }) => (
          <ComparisonChartView
            currentItem={selectedProduct}
            itemComponent={itemComponent}
            items={items}
          />
        )}
        itemComponent={({ item }) => (
          <ComparisonChartItem
            item={item}
            insights={insights}
            onSelect={setSelectedProduct}
          />
        )}
        limit={3}
        title="Comparison Chart"
        fallbackParameters={{
          facetFilters: [
            `hierarchical_categories.lvl2:${selectedProduct.hierarchical_categories.lvl2}`,
          ],
        }}
      />
    </InstantSearch>
  );
}
