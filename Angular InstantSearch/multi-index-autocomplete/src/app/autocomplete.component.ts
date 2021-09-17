import {
  Component,
  Inject,
  forwardRef,
  Output,
  EventEmitter, Optional
} from "@angular/core";
import {NgAisIndex, NgAisInstantSearch, TypedBaseWidget} from "angular-instantsearch";
import {connectAutocomplete} from "instantsearch.js/es/connectors";
import {
  AutocompleteWidgetDescription,
  AutocompleteConnectorParams
} from "instantsearch.js/es/connectors/autocomplete/connectAutocomplete";

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
          <mat-autocomplete #auto="matAutocomplete" style="height: 800px">
              <div *ngFor="let index of state.indices.slice(1) || []">
                  <mat-optgroup>{{index.indexName}}</mat-optgroup>
                  <mat-option
                          *ngFor="let option of index.hits"
                          [value]="option.name"
                          (click)="onQuerySuggestionClick.emit({ query: option.name })"
                  >
                      <ais-highlight [hit]="option" attribute="name"></ais-highlight>
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

  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Autocomplete');
    this!.createWidget(connectAutocomplete, {});

  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    super.ngOnInit();
  }
}
