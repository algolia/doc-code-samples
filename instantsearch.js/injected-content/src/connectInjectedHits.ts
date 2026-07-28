import { InjectedHitsConnector } from './types';

export const connectInjectedHits: InjectedHitsConnector =
  (renderFn, unmountFn) => (widgetParams) => {
    const widget = widgetParams.connector(
      () => {},
      () => {}
    )(widgetParams);

    return {
      ...widget,
      $$type: 'ais.injectedHits',
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
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        renderFn(
          {
            ...this.getWidgetRenderState(renderOptions),
            instantSearchInstance: renderOptions.instantSearchInstance,
          },
          false
        );

        widgetRenderState.sendEvent?.(
          'view',
          // infinite hits
          widgetRenderState.currentPageHits ||
            // other widgets
            widgetRenderState.hits
        );
      },
      getWidgetRenderState(renderOptions) {
        const widgetRenderState = widget.getWidgetRenderState(renderOptions);

        const injectedHits = widgetRenderState.hits
          .map((hit, position) => {
            // Wrap main hits and injected hits into a common format
            // for easier templating
            const hitFromMainIndex = {
              type: 'item',
              props: { hit },
            };

            return widgetParams
              .slots({ scopedResults: renderOptions.scopedResults })
              .reverse()
              .reduce(
                (acc, { injectAt, getHits = () => [null] }) => {
                  const slotScopeProps = {
                    position,
                    scopedResults: renderOptions.scopedResults,
                  };
                  const shouldInject =
                    typeof injectAt === 'function'
                      ? injectAt({
                          ...slotScopeProps,
                          hit,
                        })
                      : position === injectAt;

                  if (!shouldInject) {
                    return acc;
                  }

                  const hitsFromSlotIndex = getHits({
                    ...slotScopeProps,
                    hit,
                  });

                  // Merge injected and main hits
                  return [
                    ...hitsFromSlotIndex.map((hitFromSlotIndex) => ({
                      type: 'injected',
                      props: {
                        ...slotScopeProps,
                        hit: hitFromSlotIndex,
                      },
                    })),
                    ...acc,
                  ];
                },
                [hitFromMainIndex]
              );
          })
          .flat();

        return {
          ...widgetRenderState,
          widgetParams,
          injectedHits,
        };
      },
      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          injectedHits: this.getWidgetRenderState(renderOptions),
        };
      },
    };
  };
