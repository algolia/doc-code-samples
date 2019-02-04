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
            (click)="this.onQuerySuggestionClick.emit({query: hit.query, category: hasCategory(hit) ? getCategory(hit) : null })"
          >
            {{ hit.query }}
            <span>
              in
              <em *ngIf="hasCategory(hit)"> {{ getCategory(hit) }} </em>
              <em *ngIf="!hasCategory(hit)"> All categories </em>
            </span>
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

  hasCategory(hit) {
    return (
      hit.instant_search &&
      hit.instant_search.facets &&
      hit.instant_search.facets.exact_matches &&
      hit.instant_search.facets.exact_matches.categories &&
      hit.instant_search.facets.exact_matches.categories.length
    );
  }

  getCategory(hit) {
    const [category] = hit.instant_search.facets.exact_matches.categories;
    return category.value;
  }

  public handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  public ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
