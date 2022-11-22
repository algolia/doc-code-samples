import React from 'react';
import {
  useCurrentRefinements,
  CurrentRefinements,
} from 'react-instantsearch-hooks-web';
import { Panel } from './Panel';

export function CustomCurrentRefinements() {
  const { canRefine } = useCurrentRefinements();

  if (!canRefine) {
    return null;
  }

  return (
    <Panel header="applied filters">
      <CurrentRefinements />
    </Panel>
  );
}
