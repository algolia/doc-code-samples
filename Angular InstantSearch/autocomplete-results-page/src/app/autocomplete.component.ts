import {
  Component,
  Inject,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectAutocomplete } from "instantsearch.js/es/connectors";

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
        style="margin-top: 30px; max-height: 600px"
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
export class AutocompleteComponent extends BaseWidget {
  state: {
    query: string;
    refine: Function;
    indices: object[];
  };

  @Output() onQuerySuggestionClick = new EventEmitter<{ query : string }>();

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("AutocompleteComponent");
  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
