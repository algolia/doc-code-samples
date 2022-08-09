import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { SearchResults } from 'algoliasearch-helper';
import type {
  CurrentRefinementsConnectorParamsRefinement,
  CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import type { UiState } from 'instantsearch.js';
import {
  useCurrentRefinements,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';

import { Panel } from './Panel';
import { useCloseDropdown } from '../hooks/useCloseDropdown';
import { useLockedBody } from '../hooks/useLockedBody';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { capitalize, cx, getFirstChildPropValue } from '../utils';

import './Dropdown.css';

export type DropdownProps = PropsWithChildren<{
  buttonText?: string | ((options: DropdownButtonTextOptions) => string);
  classNames?: Partial<DropdownClassNames>;
  closeOnChange?: boolean | (() => boolean);
}>;

export type DropdownButtonTextOptions = {
  results: SearchResults;
  uiState: UiState;
  refinements: CurrentRefinementsConnectorParamsRefinement[];
};

export type DropdownClassNames = {
  button: string;
  buttonRefined: string;
  closeButton: string;
  mobileTitle: string;
};

type MiddlewareProps = Pick<DropdownProps, 'closeOnChange'> & {
  isOpened: boolean;
  close: () => void;
};

function getAttributeRefinements(
  attribute: string,
  items: CurrentRefinementsRenderState['items']
) {
  const item = items.find((item) => item.attribute === attribute);
  return item?.refinements || [];
}

function DropdownMiddleware({
  isOpened,
  closeOnChange,
  close,
}: MiddlewareProps) {
  const { use } = useInstantSearch();

  useEffect(() =>
    use(() => ({
      onStateChange() {
        const shouldCloseOnChange =
          closeOnChange === true ||
          (typeof closeOnChange === 'function' && closeOnChange() === true);

        // Close the dropdown if it's opened and `closeOnChange` is true
        if (isOpened && shouldCloseOnChange) {
          close();
        }
      },
    }))
  );

  return null;
}

export function Dropdown({
  children,
  buttonText,
  closeOnChange,
  classNames = {},
}: DropdownProps) {
  const { results, uiState } = useInstantSearch();
  const { items } = useCurrentRefinements();
  const [isOpened, setIsOpened] = useState(false);
  const panelRef = useRef(null);

  // Close the dropdown when click outside or press the Escape key
  const close = useCallback(() => setIsOpened(false), []);
  useCloseDropdown(panelRef, close, isOpened);

  // Prevent scrolling on mobile when the dropdown is opened
  const isMobile = useMediaQuery('(max-width: 375px)');
  useLockedBody(isOpened && isMobile);

  // Get the attribute(s) of the first child widget
  const attributeProp = getFirstChildPropValue(children, (props) =>
    'attributes' in props ? 'attributes' : 'attribute'
  );
  if (!attributeProp) {
    throw new Error(
      '<Dropdown> widget only supports InstantSearch widgets with an `attribute` or `attributes` prop.'
    );
  }

  // Get the refinements for the attribute
  const attribute =
    typeof attributeProp === 'string' ? attributeProp : attributeProp[0];
  const refinements = getAttributeRefinements(attribute, items);
  const isRefined = refinements.length > 0;
  const isDisabled = results.hits.length === 0;

  // Get the header button text
  let text;
  if (typeof buttonText === 'string') {
    text = buttonText;
  } else if (typeof buttonText === 'function') {
    text = buttonText({ results, uiState, refinements });
  } else if (typeof attribute === 'string') {
    text = isRefined
      ? `${capitalize(attribute)} (${refinements.length})`
      : capitalize(attribute);
  }

  const header = (
    <button
      type="button"
      className={cx(
        'ais-Dropdown-button',
        classNames.button,
        isRefined &&
          cx('ais-Dropdown-button--refined', classNames.buttonRefined),
        isDisabled && 'ais-Dropdown-button--disabled'
      )}
      disabled={isDisabled}
      onClick={() => setIsOpened((opened) => !opened)}
    >
      {text}
    </button>
  );

  const footer = (
    <button
      className={cx(
        'ais-Dropdown-close ais-Dropdown-button',
        classNames.closeButton
      )}
      onClick={close}
    >
      Apply
    </button>
  );

  return (
    <Panel
      header={header}
      footer={footer}
      className={cx('ais-Dropdown', isOpened && 'ais-Dropdown--opened')}
      ref={panelRef}
    >
      <DropdownMiddleware
        isOpened={isOpened}
        closeOnChange={closeOnChange}
        close={close}
      />
      <h2 className={cx('ais-Dropdown-mobileTitle', classNames.mobileTitle)}>
        {text}
      </h2>
      {children}
    </Panel>
  );
}
