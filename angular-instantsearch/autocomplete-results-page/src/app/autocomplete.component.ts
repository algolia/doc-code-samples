import {
  Component,
  Inject,
  forwardRef,
  Input,
  Output,
  EventEmitter, Optional
} from "@angular/core";
import {BaseWidget, NgAisIndex, NgAisInstantSearch, TypedBaseWidget} from "angular-instantsearch";
import { connectAutocomplete } from "instantsearch.js/es/connectors";
import { AutocompleteWidgetDescription, AutocompleteConnectorParams } from "instantsearch.js/es/connectors/autocomplete/connectAutocomplete";

@Component({
  selector: "app-autocomplete",
  template: `
    <div>
      <input
        matInput
        [matAutocomplete]="auto"
        (keyup)="handleChange($event)"
        style="width: 100%; padding: 10px"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
      >
        <div *ngFor="let index of state.indices || []">
          <mat-option
            *ngFor="let option of index.hits"
            [value]="option.name"
            (click)="onQuerySuggestionClick.emit({ query: option.name })"
          >
            {{ option.name }}
          </mat-option>
        </div>
      </mat-autocomplete>
    </div>
  `
})
export class AutocompleteComponent extends TypedBaseWidget<AutocompleteWidgetDescription, AutocompleteConnectorParams> {
  state: AutocompleteWidgetDescription['renderState'] = {
    currentRefinement: "",
    refine: () => null,
    indices: []
  };

  @Output() onQuerySuggestionClick = new EventEmitter<{ query : string }>();

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('SearchBox');
    this!.createWidget(connectAutocomplete as any, {});

  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    super.ngOnInit();
  }
}
