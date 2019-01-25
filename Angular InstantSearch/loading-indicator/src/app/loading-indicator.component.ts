import { Component, Inject, forwardRef, OnInit } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";

const connectSearchMetaData = (renderFn, unmountFn) => (widgetParams = {}) => ({
  init() {
    renderFn({ searchMetadata: {} }, true);
  },
  render({ searchMetadata }) {
    renderFn({ searchMetadata }, false);
  },
  dispose() {
    unmountFn();
  }
});

@Component({
  selector: "app-loading-indicator",
  template: `
    <div>
      <div *ngIf="state.searchMetadata && state.searchMetadata.isSearchStalled">
        Loading...
      </div>
    </div>
  `
})
export class LoadingIndicator extends BaseWidget implements OnInit {
  state: {
    searchMetadata: object;
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("LoadingIndicator");
  }

  public ngOnInit() {
    this.createWidget(connectSearchMetaData as any, {});
    super.ngOnInit();
  }
}
