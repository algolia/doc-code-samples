import type { Hit } from '@algolia/client-search';
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

type QuerySuggestionHit = Hit<{
  instant_search?: {
    facets?: {
      exact_matches?: {
        categories?: ReadonlyArray<{ value: string; count: number }>;
      };
    };
  };
}>;

@Component({
  selector: 'app-autocomplete',
  template: `
    <input matInput [matAutocomplete]="auto" (keyup)="handleKeyUp($event)" />
    <mat-autocomplete
      [displayWith]="getOptionLabel"
      (optionSelected)="onQuerySuggestionClick.emit($event.option.value)"
      #auto="matAutocomplete"
    >
      <ng-container *ngFor="let index of state?.indices || []">
        <mat-option
          *ngFor="let hit of index.hits"
          [value]="{
            query: hit.query,
            category: hasCategory(hit) ? getCategory(hit) : null
          }"
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

  hasCategory(hit: QuerySuggestionHit) {
    return !!hit.instant_search?.facets?.exact_matches?.categories?.length;
  }

  getCategory(hit: QuerySuggestionHit) {
    const [category] =
      hit.instant_search?.facets?.exact_matches?.categories || [];
    return category.value;
  }

  getOptionLabel(querySuggestion: QuerySuggestion) {
    return querySuggestion.query;
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.state?.refine((event.target as HTMLInputElement).value);
  }

  ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();
  }
}
