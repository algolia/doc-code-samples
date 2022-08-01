import {
  ComponentProps,
  CSSProperties,
  PropsWithChildren,
  TransitionEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { cx } from './utils';

export type CollapseProps = ComponentProps<'div'> &
  PropsWithChildren<{
    isCollapsed: boolean;
    transition?: string;
    disableAnimation?: boolean;
  }>;

enum Status {
  COLLAPSED,
  COLLAPSING,
  EXPANDING,
  EXPANDED,
}

type State = { status: Status; style: CSSProperties };

export function Collapse({
  children,
  className,
  style,
  transition = 'height 0.4s cubic-bezier(.16, 1, .3, 1)',
  isCollapsed,
  disableAnimation,
  ...props
}: CollapseProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const { current: state } = useRef<State>({
    status: isCollapsed ? Status.COLLAPSED : Status.EXPANDED,
    style: {
      height: isCollapsed ? '0px' : '',
      visibility: isCollapsed ? 'hidden' : 'visible',
    },
  });

  function setCollapsed() {
    if (!elementRef.current) return;
    state.status = Status.COLLAPSED;

    state.style = {
      height: '0px',
      visibility: 'hidden',
    };
    forceUpdate();
  }

  function setCollapsing() {
    if (!elementRef.current) return;

    if (disableAnimation) {
      return setCollapsed();
    }

    state.status = Status.COLLAPSING;

    state.style = {
      height: getElementHeight(),
      visibility: 'visible',
    };
    forceUpdate();

    requestAnimationFrame(() => {
      if (state.status !== Status.COLLAPSING) return;
      state.style = {
        height: '0px',
        visibility: 'visible',
      };
      forceUpdate();
    });
  }

  function setExpanding() {
    if (!elementRef.current) return;

    if (disableAnimation) {
      return setExpanded();
    }

    state.status = Status.EXPANDING;

    if (state.status !== Status.EXPANDING) return;
    state.style = {
      height: getElementHeight(),
      visibility: 'visible',
    };
    forceUpdate();
  }

  function setExpanded() {
    if (!elementRef.current) return;
    state.status = Status.EXPANDED;

    state.style = {
      height: '',
      visibility: 'visible',
    };
    forceUpdate();
  }

  function getElementHeight() {
    return `${elementRef.current?.scrollHeight || 0}px`;
  }

  function onTransitionEnd({
    target,
    propertyName,
  }: TransitionEvent<HTMLDivElement>) {
    if (target === elementRef.current && propertyName === 'height') {
      const styleHeight = (target as HTMLDivElement).style.height;

      switch (state.status) {
        case Status.EXPANDING:
          if (styleHeight !== '' && styleHeight !== '0px') setExpanded();
          break;
        case Status.COLLAPSING:
          if (styleHeight !== '' && styleHeight === '0px') setCollapsed();
          break;
      }
    }
  }

  const didOpen =
    state.status === Status.COLLAPSED || state.status === Status.COLLAPSING;
  if (!didOpen && isCollapsed) setCollapsing();
  if (didOpen && !isCollapsed) setExpanding();

  const computedStyle = {
    overflow: 'hidden',
    transition,
    ...style,
    ...state.style,
  };

  return (
    <div
      {...props}
      ref={elementRef}
      className={cx('ais-Collapse', className)}
      style={computedStyle}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
}
