import connectInfiniteHits from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';
import { connectInjectedHits } from './connectInjectedHits';
import { createRenderer } from './renderer';
import type {
  WidgetCreator,
  InjectedHitsConnectorParams,
  InjectedInfiniteHitsWidgetParams,
} from './types';

/*
 * Widget creator
 * Returns a widget instance
 */
export const injectedInfiniteHits: WidgetCreator = function (widgetParams) {
  const rendererWidgetParams: InjectedInfiniteHitsWidgetParams = {
    container: widgetParams.container,
    templates: widgetParams.templates,
  };

  const connector = connectInfiniteHits;

  const { render, dispose } = createRenderer(rendererWidgetParams);

  const createWidget = connectInjectedHits(render, dispose);

  const connectorParams: InjectedHitsConnectorParams = {
    connector,
    slots: widgetParams.slots,
  };

  return {
    ...createWidget(connectorParams),
    $$widgetType: 'ais.injectedInfiniteHits',
  };
};
