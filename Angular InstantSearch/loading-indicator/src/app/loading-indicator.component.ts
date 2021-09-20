import { Component, Inject, forwardRef, Optional } from '@angular/core';
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
  selector: 'app-loading-indicator',
  template: `
    <div *ngIf="state.isSearchStalled && state.isSearchStalled">Loading...</div>
  `,
})
export class LoadingIndicatorComponent extends TypedBaseWidget<
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams
> {
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

  ngOnInit() {
    this.createWidget(connectSearchBox, {
      // instance options
    });
    super.ngOnInit();
  }
}
