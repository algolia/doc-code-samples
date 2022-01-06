import { createConnector } from 'react-instantsearch-core';

export const connectInjectedHits = createConnector({
  displayName: 'InjectedHits',
  getProvidedProps(props, _, searchResults) {
    const { slots, hits, hitComponent, contextValue } = props;

    const { mainTargetedIndex } = contextValue;
    const results = searchResults.results || [];
    const isSingleIndex = Array.isArray(results.hits);

    // Group results by index name for easier access
    const resultsByIndex = isSingleIndex
      ? { [mainTargetedIndex]: { ...results, hits } }
      : Object.entries(results).reduce((acc, [indexName, indexResults]) => {
          const isMainIndex = indexName === mainTargetedIndex;

          return {
            ...acc,
            [indexName]: isMainIndex ? { ...indexResults, hits } : indexResults,
          };
        }, {});

    const mainIndexHits =
      (resultsByIndex[mainTargetedIndex] &&
        resultsByIndex[mainTargetedIndex].hits) ||
      [];

    // Loop through main hits and inject slots
    const injectedHits = mainIndexHits
      .map((hit, position) => {
        // Wrap main hits and injected hits into a common format
        // for easier templating
        const hitFromMainIndex = {
          type: 'item',
          props: { hit },
          Hit: hitComponent,
        };

        return slots({ resultsByIndex })
          .reverse()
          .reduce(
            (
              acc,
              {
                injectAt,
                getHits = () => [null],
                slotComponent,
                className = '',
              }
            ) => {
              const slotScopeProps = { position, resultsByIndex };
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

              const hitsFromSlotIndex = getHits({ ...slotScopeProps, hit });

              // Merge injected and main hits
              return [
                ...hitsFromSlotIndex.map(hitFromSlotIndex => ({
                  type: 'injected',
                  props: {
                    ...slotScopeProps,
                    hit: hitFromSlotIndex,
                    className,
                  },
                  Hit: slotComponent,
                })),
                ...acc,
              ];
            },
            [hitFromMainIndex]
          );
      })
      .flat();

    return {
      injectedHits,
    };
  },
});
