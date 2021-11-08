import { Component, Inject, forwardRef, Optional } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import connectMenu, {
  MenuConnectorParams,
  MenuWidgetDescription,
} from 'instantsearch.js/es/connectors/menu/connectMenu';

@Component({
  selector: 'ais-menu-select',
  template: `
    <select class="menu-select" (change)="onChange($event)">
      <option
        *ngFor="let item of state.items"
        [value]="item.value"
        [selected]="item.isRefined"
      >
        {{ item.label }}
      </option>
    </select>
  `,
})
export class MenuSelect extends TypedBaseWidget<
  MenuWidgetDescription,
  MenuConnectorParams
> {
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('MenuSelect');
  }

  public state: MenuWidgetDescription['renderState'] = {
    items: [],
    refine: () => {},
    createURL: () => '#',
    canRefine: false,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: () => {},
    sendEvent: () => {},
  };

  public ngOnInit() {
    this.createWidget(connectMenu, { attribute: 'categories' });
    super.ngOnInit();
  }

  public onChange(event: Event) {
    this.state.refine((event.target as HTMLInputElement).value);
  }
}
