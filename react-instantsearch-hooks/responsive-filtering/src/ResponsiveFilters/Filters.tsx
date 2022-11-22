import React, { useRef, useEffect } from 'react';
import {
  ToggleRefinement,
  useInstantSearch,
  HierarchicalMenu,
  RefinementList,
} from 'react-instantsearch-hooks-web';

import { CustomCurrentRefinements } from './CustomCurrentRefinements';
import { Panel } from './Panel';

export function Filters() {
  const { uiState, setUiState } = useInstantSearch();
  const uiStateRef = useRef(uiState);

  // Keep up-to-date `uiState` in a ref
  useEffect(() => {
    uiStateRef.current = uiState;
  }, [uiState]);

  // Apply latest `uiState` to InstantSearch as the component is unmounted
  useEffect(() => {
    return () => {
      setTimeout(() => setUiState(uiStateRef.current));
    };
  }, [setUiState]);

  return (
    <>
      <CustomCurrentRefinements />
      <Panel header="category" collapsible>
        <HierarchicalMenu
          attributes={[
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
            'hierarchicalCategories.lvl3',
          ]}
        />
      </Panel>
      <Panel header="brand" collapsible collapsedByDefault>
        <RefinementList attribute="brand" />
      </Panel>
      <Panel header="Free shipping">
        <ToggleRefinement attribute="free_shipping" label="Free shipping" />
      </Panel>
    </>
  );
}
