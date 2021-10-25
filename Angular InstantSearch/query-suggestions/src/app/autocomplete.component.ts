import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Optional,
  Output,
} from '@angular/core';
import {
  NgAisIndex,
  NgAisInstantSearch,
  TypedBaseWidget,
} from 'angular-instantsearch';
import connectAutocomplete, {
  AutocompleteWidgetDescription,
  AutocompleteConnectorParams,
} from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';

export type QuerySuggestion = {
  query: string;
  category: string | null;
};

@Component({
  selector: 'app-autocomplete',
  template: `
    <input matInput [matAutocomplete]="auto" (keyup)="handleChange($event)" />
    <mat-autocomplete #auto="matAutocomplete">
      <ng-container *ngFor="let index of state?.indices || []">
        <mat-option
          *ngFor="let hit of index.hits"
          [value]="hit.query"
          (click)="
            onQuerySuggestionClick.emit({
              query: hit.query,
              category: hasCategory(hit) ? getCategory(hit) : null
            })
          "
        >
          {{ hit.query }}
          <span>
            in
            <em *ngIf="hasCategory(hit)">{{ getCategory(hit) }}</em>
            <em *ngIf="!hasCategory(hit)">All categories</em>
          </span>
        </mat-option>
      </ng-container>
    </mat-autocomplete>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      input {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
      }
    `,
  ],
})
export class AutocompleteComponent extends TypedBaseWidget<
  AutocompleteWidgetDescription,
  AutocompleteConnectorParams
> {
  state?: AutocompleteWidgetDescription['renderState'];

  @Output() onQuerySuggestionClick = new EventEmitter<QuerySuggestion>();

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('AutocompleteComponent');
  }

  hasCategory(hit: any) {
    return !!hit?.instant_search?.facets?.exact_matches?.categories?.length;
  }

  getCategory(hit: any) {
    const [category] = hit.instant_search.facets.exact_matches.categories;
    return category.value;
  }

  handleChange(event: Event) {
    this.state?.refine((event.target as HTMLInputElement).value);
  }

  ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
