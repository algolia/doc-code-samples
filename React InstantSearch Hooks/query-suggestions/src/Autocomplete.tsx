import { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { autocomplete } from '@algolia/autocomplete-js';

import type { AutocompleteOptions } from '@algolia/autocomplete-js';
import type { BaseItem } from '@algolia/autocomplete-core';

import '@algolia/autocomplete-theme-classic';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>>;

export function Autocomplete(props: AutocompleteProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const instance = autocomplete({
      ...props,
      container: container.current,
      renderer: { createElement, Fragment, render },
    });

    return () => instance.destroy();
  }, [props]);

  return <div ref={container} />;
}
