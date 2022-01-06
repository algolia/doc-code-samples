import React from 'react';

import { HitsFromIndex } from './pages/HitsFromIndex';
import { InterspersedHits } from './pages/InterspersedHits';

export const routes = [
  {
    path: '/',
    label: 'Hits from other index',
    element: HitsFromIndex,
  },
  {
    path: '/rule',
    label: 'Hits from a Rule',
    element: () => <></>,
  },
  {
    path: '/third-party',
    label: 'Third-party hits',
    element: () => <></>,
  },
  {
    path: '/interspersed-hits',
    label: 'Interspersed hits',
    element: InterspersedHits,
  },
];
