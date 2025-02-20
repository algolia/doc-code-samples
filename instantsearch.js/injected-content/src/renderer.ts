import type {
  InjectedHitsRenderState,
  InjectedInfiniteHitsWidgetParams,
  RendererCreator,
} from './types';
import { render } from 'preact';
import { html } from 'htm/preact';
import { InfiniteHitsRenderState } from 'instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits';

export const createRenderer: RendererCreator = ({ container, templates }) => {
  const containerNode: Element =
    typeof container === 'string'
      ? document.querySelector(container)!
      : container;

  const root = document.createElement('div');

  return {
    render(renderOptions, isFirstRender) {
      if (isFirstRender) {
        containerNode.appendChild(root);
      }
      render(Rendering({ ...renderOptions, templates }), root);
    },
    dispose() {
      containerNode.removeChild(root);
    },
  };
};

function Rendering({
  injectedHits,
  isLastPage,
  showMore,
  templates,
}: InjectedHitsRenderState &
  InfiniteHitsRenderState &
  Pick<InjectedInfiniteHitsWidgetParams, 'templates'>) {
  return html` <div className="ais-InfiniteHits">
    <ul className="ais-InfiniteHits-list">
      ${injectedHits.map(({ props, type }, index) => {
        return html`<li
          key=${index}
          className=${`ais-InfiniteHits-item ${type}`}
        >
          <${Template}
            data=${props}
            templateKey=${type}
            templates=${templates}
          />
        </li>`;
      })}
    </ul>
    ${!isLastPage
      ? html`<button className="ais-InfiniteHits-loadMore" onClick=${showMore}>
          Load more
        </button>`
      : null}
  </div>`;
}

function Template({
  templates,
  templateKey,
  data,
}: Pick<InjectedInfiniteHitsWidgetParams, 'templates'> & {
  templateKey: string;
  data: any;
}) {
  const template = templates[templateKey] || FallbackTemplate;
  return template(data, { html });
}

function FallbackTemplate(data) {
  return html`<div style=${{ wordBreak: 'break-all' }}>
    ${JSON.stringify(data).slice(0, 100)}…
  </div>`;
}
