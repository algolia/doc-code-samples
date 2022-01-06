import React from 'react';

import { InterspersedHits } from './pages/InterspersedHits';

export const routes = [
  {
    path: '/',
    label: 'Hits from other index',
    element: () => <></>,
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
