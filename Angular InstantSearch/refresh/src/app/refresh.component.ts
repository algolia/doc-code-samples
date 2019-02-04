import { Component, Inject, forwardRef, OnInit } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";

const connectRefresh = (renderFn, unmountFn) => (widgetParams = {}) => ({
  init() {
    renderFn({ refresh() {} }, true);
  },
  render({ instantSearchInstance }) {
    const refresh = instantSearchInstance.refresh.bind(instantSearchInstance);
    renderFn({ refresh }, false);
  },
  dispose() {
    unmountFn();
  }
});

@Component({
  selector: "app-refresh",
  template: `
    <button (click)="state.refresh()">Refresh</button>
  `
})
export class Refresh extends BaseWidget implements OnInit {
  state: {
    refresh: Function;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("Refresh");
  }

  public ngOnInit() {
    this.createWidget(connectRefresh as any, {});
    super.ngOnInit();
  }
}
