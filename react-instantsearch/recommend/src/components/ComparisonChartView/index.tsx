import React from 'react';

import './style.css';
import { BaseObject } from '../../types';

type ComparisonChartViewProps<TObject> = {
  currentItem: TObject;
  itemComponent({ item }): JSX.Element;
  items: TObject[];
};

const formatProperties = (properties: string[]) => {
  return properties.map((property: string) => {
    const upper = property.charAt(0).toUpperCase() + property.slice(1);
    return upper.split('_').join(' ');
  });
};

export function ComparisonChartView<TObject extends BaseObject>(
  props: ComparisonChartViewProps<TObject>
): JSX.Element {
  const items = Array.from(new Set([props.currentItem, ...props.items]));
  const properties = formatProperties([
    'name',
    'brand',
    'price',
    'gender',
    'color',
    'reviews',
  ]);
  return (
    <div className="uic-ComparisonChart-container">
      <div className="uic-ComparisonChart-propertiesColumn">
        <div className="uic-ComparisonChart-heading">Overview</div>
        <div>
          {properties.map((property, index) => (
            <div key={index} className="uic-ComparisonChart-property">
              {property}
            </div>
          ))}
        </div>
      </div>
      {items.map((item, index) => (
        <div key={index}>
          <props.itemComponent item={item} />
        </div>
      ))}
    </div>
  );
}
