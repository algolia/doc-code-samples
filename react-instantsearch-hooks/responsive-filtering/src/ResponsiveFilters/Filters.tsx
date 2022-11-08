import React, { useRef, useEffect } from 'react';
import {
  ToggleRefinement,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import {
  HierarchicalMenu,
  RefinementList,
} from 'react-instantsearch-hooks-web';

import { Panel } from './Panel';

export function Filters() {
  const { uiState, setUiState } = useInstantSearch();
  const uiStateRef = useRef(uiState);

  // Keep up to date uiState in a reference
  useEffect(() => {
    uiStateRef.current = uiState;
  }, [uiState]);

  // Apply latest uiState to InstantSearch as the component is unmounted
  useEffect(() => {
    return () => {
      setTimeout(() => setUiState(uiStateRef.current));
    };
  }, [setUiState]);

  return (
    <>
      <Panel header="category">
        <HierarchicalMenu
          attributes={[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
            'hierarchicalCategories.lvl3',
          ]}
        />
      </Panel>
      <Panel header="brand">
        <RefinementList attribute="brand" />
      </Panel>
      <Panel header="price">
        <ToggleRefinement attribute="free_shipping" label="Free shipping" />
      </Panel>
    </>
  );
}
