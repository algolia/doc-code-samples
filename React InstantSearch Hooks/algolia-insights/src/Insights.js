import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';
import { useEffect } from 'react';
import { useConnector } from 'react-instantsearch-hooks-web';

const connectMiddleware = (renderFn, unmountFn) => (widgetParams) => ({
  init(initOptions) {
    renderFn(
      {
        ...this.getWidgetRenderState(initOptions),
        instantSearchInstance: initOptions.instantSearchInstance,
      },
      true
    );
  },

  render(renderOptions) {
    const renderState = this.getWidgetRenderState(renderOptions);

    renderFn(
      {
        ...renderState,
        instantSearchInstance: renderOptions.instantSearchInstance,
      },
      false
    );
  },

  getWidgetRenderState(renderOptions) {
    return {
      use: (...args) => renderOptions.instantSearchInstance.use(...args),
      unuse: (...args) => renderOptions.instantSearchInstance.unuse(...args),
      widgetParams,
    };
  },

  dispose() {
    unmountFn();
  },
});

export function Insights() {
  const { use, unuse } = useConnector(connectMiddleware);

  useEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: window.aa,
    });

    use(middleware);

    return () => unuse(middleware);
  }, [use, unuse]);

  return null;
}
