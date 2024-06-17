import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InstantSearchService } from '../instant-search.service';
import { connectHits, connectSearchBox } from 'instantsearch.js/es/connectors';
import { Hit } from 'instantsearch.js';
import { FacetsComponent } from '../facets/facets.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FacetsComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public hits?: Hit[];
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

  handleInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.search!(event.target.value);
    }
  }

  ngAfterContentInit() {
    this.InstantSearchService.start();
  }

  ngOnDestroy() {
    this.InstantSearchService.dispose();
  }
}
