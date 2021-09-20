import { Component, Inject, forwardRef, Optional, Input } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import { Connector } from 'instantsearch.js/es/types';

type RefreshWidgetDescription = {
  $$type: 'custom.referesh',
  renderState: {
    refresh(): void;
  };
};
type RefreshConnectorParams = {};

type RefreshConnector = Connector<
  RefreshWidgetDescription,
  RefreshConnectorParams
>;

const connectRefresh: RefreshConnector =
  (renderFn, unmountFn) => (widgetParams) => ({
    $$type: 'custom.referesh',
    init: function ({ instantSearchInstance }) {
      renderFn(
        {
          refresh() {},
          widgetParams,
          instantSearchInstance,
        },
        true
      );
    },
    render({ instantSearchInstance }) {
      const refresh = instantSearchInstance.refresh.bind(instantSearchInstance);
      renderFn({ refresh, widgetParams, instantSearchInstance }, false);
    },
    dispose() {
      if (unmountFn) {
        unmountFn();
      }
    },
  });

@Component({
  selector: 'app-refresh',
  template: ` <button (click)="state.refresh()">Refresh</button> `,
})
export class RefreshComponent extends TypedBaseWidget<
  RefreshWidgetDescription,
  RefreshConnectorParams
> {
  public state: RefreshWidgetDescription['renderState'] = {
    refresh(): void {},
  };

  // Rendering options
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Refresh');
  }

  ngOnInit() {
    this.createWidget(connectRefresh, {
      // instance options
    });
    super.ngOnInit();
  }
}
