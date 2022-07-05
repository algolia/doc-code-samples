import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import connectSearchBox, {
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams,
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';

@Component({
  selector: 'app-debounced-search-box',
  template: `
    <div class="ais-SearchBox">
      <form class="ais-SearchBox-form" novalidate>
        <input
          type="text"
          class="ais-SearchBox-input"
          #input
          (keyup)="onChangeDebounced(input.value)"
          [value]="this.state.query"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          placeholder="Search for products"
          spellcheck="false"
          maxlength="512"
        />
      </form>
    </div>
  `,
})
export class DebouncedSearchBoxComponent extends TypedBaseWidget<
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams
> {
  private timerId: ReturnType<typeof setTimeout> | null = null;
  @Input() delay: number = 0;
  public state: SearchBoxWidgetDescription['renderState'] = {
    clear(): void {},
    isSearchStalled: false,
    query: '',
    refine(value: string): void {},
  };

  // Rendering options
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('SearchBox');
  }

  public onChangeDebounced(value: string) {
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.state.refine(value), this.delay);
  }

  ngOnInit() {
    this.createWidget(connectSearchBox, {
      // instance options
    });
    super.ngOnInit();
  }
}
