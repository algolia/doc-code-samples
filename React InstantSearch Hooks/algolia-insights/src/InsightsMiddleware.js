import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import { useLayoutEffect } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

export function InsightsMiddleware() {
  const { use } = useInstantSearch();

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: window.aa,
    });

    return use(middleware);
  }, [use]);

  return null;
}
