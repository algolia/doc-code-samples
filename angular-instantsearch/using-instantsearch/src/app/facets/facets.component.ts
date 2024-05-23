import { Component } from '@angular/core';
import { InstantSearchService } from '../instant-search.service';
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { BaseHit, Hit } from 'instantsearch.js';
import index from 'instantsearch.js/es/widgets/index/index';
import {
  connectSearchBox,
  connectHits,
  connectRefinementList,
} from 'instantsearch.js/es/connectors';

@Component({
  selector: 'app-facets',
  standalone: true,
  imports: [],
  templateUrl: './facets.component.html',
})
export class FacetsComponent {
  public brands?: RefinementListItem[];
  public refineBrands?: (value: string) => void;
  public refineQuery?: (value: string) => void;
  public querySuggestions?: string[];

  constructor(private InstantSearchService: InstantSearchService) {
    this.InstantSearchService.addWidgets([
      connectRefinementList(({ items, refine }) => {
        this.brands = items;
        this.refineBrands = refine;
      })({ attribute: 'brand' }),
      connectSearchBox(({ refine }) => {
        this.refineQuery = refine;
      })({}),
      index({ indexName: 'instant_search_demo_query_suggestions' }).addWidgets([
        connectHits(({ hits }) => {
          this.querySuggestions = (
            hits as Array<Hit<BaseHit & { query: string }>>
          ).map((hit) => hit.query);
        })({}),
      ]),
    ]);
  }
}
