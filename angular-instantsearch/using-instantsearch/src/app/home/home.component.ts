import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InstantSearchService } from '../instant-search.service';
import { connectHits, connectSearchBox } from 'instantsearch.js/es/connectors';
import { BaseHit } from 'instantsearch.js';
import { FacetsComponent } from '../facets/facets.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FacetsComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public hits?: BaseHit[];
  public query?: string;
  public search?: (value: string) => void;

  constructor(private InstantSearchService: InstantSearchService) {
    this.InstantSearchService.addWidgets([
      connectSearchBox(({ refine, query }) => {
        this.search = refine;
        this.query = query;
      })({
        // ...widgetParams
      }),
      connectHits(({ hits }) => {
        this.hits = hits;
      })({}),
    ]);
  }

  ngAfterContentInit() {
    this.InstantSearchService.start();
  }
}
