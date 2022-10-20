import type {
  Renderer,
  Connector,
  WidgetFactory,
  ScopedResult,
} from 'instantsearch.js/es';
import type { InfiniteHitsWidgetDescription } from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';
import type { html } from 'htm/preact';

/*
 * Parameters send only to the widget creator function
 * These parameters will be used by the widget creator to create the widget renderer and factory
 */
export type InjectedInfiniteHitsWidgetParams = {
  container: Element | string;
  templates: {
    [key: string]: (
      data: any,
      opts: { html: typeof html }
    ) => ReturnType<typeof html>;
  };
};

/*
 * Parameters send to the widget creator function
 * These parameters will be used by the widget creator to manage the widget logic
 */
export type InjectedHitsConnectorParams = {
  connector: Connector<
    { renderState: { hits: any[] }; indexRenderState: any; $$type: any },
    any
  >;
  slots: (params: { scopedResults: ScopedResult[] }) => Array<{
    injectAt:
      | boolean
      | number
      | ((params: {
          position: number;
          scopedResults: ScopedResult[];
          hit: any;
        }) => boolean | number);
    getHits(params: {
      position: number;
      scopedResults: ScopedResult[];
      hit: any;
    }): any[];
    slotComponent: any;
  }>;
};

export type InjectedHitsRenderState = {
  injectedHits: any[];
};

type InjectedHitsWidgetDescription = {
  $$type: 'ais.injectedHits';
  renderState: InjectedHitsRenderState;
  indexRenderState: {
    injectedHits: InjectedHitsRenderState;
  };
};

/*
 * Connector type, constructed from the Renderer and Connector parameters
 */
export type InjectedHitsConnector = Connector<
  InjectedHitsWidgetDescription,
  InjectedHitsConnectorParams
>;

/*
 * Renderer type, constructed from the Renderer and Connector parameters
 */
export type RendererCreator = (
  widgetParams: InjectedInfiniteHitsWidgetParams
) => {
  render: Renderer<
    InjectedHitsWidgetDescription['renderState'] &
      InfiniteHitsWidgetDescription['renderState'],
    InjectedHitsConnectorParams
  >;
  dispose: () => void;
};

/*
 * Widget type, constructed from the Renderer, Connector and Widget parameters
 */
export type WidgetCreator = WidgetFactory<
  InjectedHitsWidgetDescription & {
    $$widgetType: 'ais.injectedInfiniteHits';
  },
  InjectedHitsConnectorParams,
  InjectedInfiniteHitsWidgetParams
>;
