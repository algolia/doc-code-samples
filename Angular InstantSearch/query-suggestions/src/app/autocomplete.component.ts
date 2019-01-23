import {
  Component,
  Inject,
  forwardRef,
  EventEmitter,
  Output
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
            *ngFor="let hit of index.hits"
            [value]="hit.query"
            (click)="this.onQuerySuggestionClick.emit(hit.query)"
          >
            {{ hit.query }}
              {{hit.instant_search.facets.exact_matches.categories | json}}
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

  @Output() onQuerySuggestionClick: EventEmitter<any> = new EventEmitter();

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
