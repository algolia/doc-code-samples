import { HitsFromIndex } from './pages/HitsFromIndex';
import { HitsFromRule } from './pages/HitsFromRule';
import { InterspersedHits } from './pages/InterspersedHits';
import { Recommend } from './pages/Recommend';
import { ThirdPartyHits } from './pages/ThirdPartyHits';

export const routes = [
  {
    path: '/',
    label: 'Hits from index',
    element: HitsFromIndex,
  },
  {
    path: '/rule',
    label: 'Hits from a Rule',
    element: HitsFromRule,
  },
  {
    path: '/third-party',
    label: 'Third-party hits',
    element: ThirdPartyHits,
  },
  {
    path: '/interspersed',
    label: 'Interspersed hits',
    element: InterspersedHits,
  },
  {
    path: '/recommend',
    label: 'Recommend',
    element: Recommend,
  },
];
