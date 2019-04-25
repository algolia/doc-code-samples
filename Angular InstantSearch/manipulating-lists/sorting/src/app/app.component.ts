import { Component } from '@angular/core';
import { sortBy } from 'lodash';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  config = {
    indexName: 'demo_ecommerce',
    searchClient
  };
  sortByLabel(items) {
    return sortBy(items, [item => item.label.toLowerCase(), 'label'], 'asc');
  }
}
