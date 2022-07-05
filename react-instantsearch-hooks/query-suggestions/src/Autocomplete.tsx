import { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { autocomplete } from '@algolia/autocomplete-js';

import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import type { BaseItem } from '@algolia/autocomplete-core';

import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>>;

export function Autocomplete(props: AutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search = autocomplete({
      ...props,
      container: containerRef.current,
      renderer: { createElement, Fragment, render },
    });

    return () => search.destroy();
  }, [props]);

  return <div ref={containerRef} />;
}
