import { useEffect, useState } from 'react';
import {
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  useConnector,
} from 'react-instantsearch-hooks-web';
import connectRange from 'instantsearch.js/es/connectors/range/connectRange';
import * as Slider from '@radix-ui/react-slider';
import algoliasearch from 'algoliasearch/lite';

import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

function App() {
  return (
    <div className="container">
      <InstantSearch
        searchClient={searchClient}
        indexName="demo_ecommerce"
        insights={true}
      >
        <div className="search-panel">
          <div className="search-panel__filters">
            <RefinementList attribute="brand" />
            <RangeSlider attribute="price" />
          </div>

          <div className="search-panel__results">
            <SearchBox className="searchbox" placeholder="Search" />
            <Hits />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

function useRangeSlider(props) {
  return useConnector(connectRange, props);
}

function RangeSlider(props) {
  const { start, range, canRefine, refine } = useRangeSlider(props);
  const { min, max } = range;
  const [value, setValue] = useState([min, max]);

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

  useEffect(() => {
    setValue([from, to]);
  }, [from, to]);

  return (
    <Slider.Root
      className="slider-root"
      min={min}
      max={max}
      value={value}
      onValueChange={setValue}
      onValueCommit={refine}
      disabled={!canRefine}
    >
      <Slider.Track className="slider-track">
        <Slider.Range className="slider-range" />
      </Slider.Track>
      <Slider.Thumb className="slider-thumb" />
      <Slider.Thumb className="slider-thumb" />
    </Slider.Root>
  );
}

export default App;
