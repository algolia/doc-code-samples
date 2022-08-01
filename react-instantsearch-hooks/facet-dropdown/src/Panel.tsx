import {
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
} from 'react';
import type { SearchResults } from 'algoliasearch-helper';
import type { UiState } from 'instantsearch.js';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

import { cx } from './utils';

export type PanelProps = Omit<ComponentProps<'div'>, 'hidden'> &
  PropsWithChildren<{
    header?: string | ReactNode;
    footer?: string | ReactNode;
    hidden?: (options: PanelFnOptions) => boolean;
    collapsed?: (options: PanelFnOptions) => boolean;
    classNames?: Partial<PanelClassNames>;
  }>;

export type PanelFnOptions = { results: SearchResults; uiState: UiState };

export type PanelClassNames = {
  root: string;
  noRefinementRoot: string;
  collapsibleRoot: string;
  collapsedRoot: string;
  collapseButton: string;
  collapseIcon: string;
  header: string;
  body: string;
  footer: string;
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      header,
      footer,
      hidden = () => false,
      collapsed,
      className,
      classNames = {},
      ...props
    },
    ref
  ) => {
    const { results, uiState } = useInstantSearch();
    const isHidden = hidden({ results, uiState });

    const isCollapsible = typeof collapsed === 'function';
    const isCollapsedCustom = isCollapsible && collapsed({ results, uiState });
    const prevIsCollapsedCustom = useRef(isCollapsedCustom);
    const [isCollapsed, setIsCollapsed] = useState(isCollapsedCustom);

    if (prevIsCollapsedCustom.current !== isCollapsedCustom) {
      prevIsCollapsedCustom.current = isCollapsedCustom;
      setIsCollapsed(isCollapsedCustom);
    }

    return (
      <div
        {...props}
        className={cx(
          'ais-Panel',
          classNames.root,
          isHidden &&
            cx('ais-Panel--noRefinement', classNames.noRefinementRoot),
          isCollapsible &&
            cx('ais-Panel--collapsible', classNames.collapsibleRoot),
          isCollapsed && cx('ais-Panel--collapsed', classNames.collapsedRoot),
          className
        )}
        hidden={isHidden}
        ref={ref}
      >
        {header && (
          <div className={cx('ais-Panel-header', classNames.header)}>
            <span>{header}</span>
            {isCollapsible && (
              <button
                aria-expanded={!isCollapsed}
                onClick={() => setIsCollapsed((v) => !v)}
                className={cx(
                  'ais-Panel-collapseButton',
                  classNames.collapseButton
                )}
              >
                <svg
                  className={cx(
                    'ais-Panel-collapseIcon',
                    classNames.collapseIcon
                  )}
                  style={{ transform: isCollapsed ? '' : 'rotate(-90deg)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="1.2em"
                  height="1.2em"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={cx('ais-Panel-body', classNames.body)}>{children}</div>
        {footer && (
          <div className={cx('ais-Panel-footer', classNames.footer)}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);
