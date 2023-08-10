import type { ComponentProps, ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';
import { useInstantSearch } from 'react-instantsearch';

type ScrollToProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function ScrollTo({ children, ...props }: ScrollToProps) {
  const { addMiddlewares } = useInstantSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return addMiddlewares(() => {
      return {
        onStateChange() {
          const isFiltering = document.body.classList.contains('filtering');
          const isTyping =
            document.activeElement?.tagName === 'INPUT' &&
            document.activeElement?.getAttribute('type') === 'search';

          if (isFiltering || isTyping) {
            return;
          }

          containerRef.current!.scrollIntoView();
        },
      };
    });
  }, [addMiddlewares]);

  return (
    <div {...props} ref={containerRef}>
      {children}
    </div>
  );
}
