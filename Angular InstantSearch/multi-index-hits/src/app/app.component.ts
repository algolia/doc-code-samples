import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private query : string = "";

  public configProducts = {
    indexName: 'players',
    searchClient,
  };

  public configActors = {
    indexName: 'actors',
    searchClient,
  };

  onQuery($event) {
    this.query = $event.target.value
  }

  get searchParameters() {
    return {
      query: this.query
    }
  }
}
