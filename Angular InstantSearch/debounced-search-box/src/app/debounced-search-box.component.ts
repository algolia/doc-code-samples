import { Component, Inject, forwardRef, Input } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectSearchBox } from "instantsearch.js/es/connectors";

@Component({
  selector: "app-debounced-search-box",
  template: `
    <input
      class="ais-SearchBox"
      type="text"
      #input
      (keyup)="onChangeDebounced(input.value)"
      [value]="this.state.query"
    />
  `
})
export class DebouncedSearchBox extends BaseWidget {
  private timerId = null;
  state: {
    query: string;
    refine: Function;
  };

  @Input() delay: number = 0;

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("DebouncedSearchBox");
  }

  public onChangeDebounced(value) {
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.state.refine(value), this.delay);
  }

  public ngOnInit() {
    this.createWidget(connectSearchBox, {});
    super.ngOnInit();
  }
}
