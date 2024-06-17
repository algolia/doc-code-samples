import { Component } from '@angular/core';
import {
  connectConfigure,
  connectHits,
  connectRelatedProducts,
} from 'instantsearch.js/es/connectors';
import { PlainSearchParameters } from 'algoliasearch-helper';
import { InstantSearchService } from '../instant-search.service';
import { Hit, Widget } from 'instantsearch.js';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  hit?: Hit;
  relatedItems?: Hit[];
  refine?: (searchParameters: PlainSearchParameters) => void;
  widgets: Array<Widget> = [];
  objectID?: string;

  constructor(
    private route: ActivatedRoute,
    private InstantSearchService: InstantSearchService
  ) {
    const objectID = route.snapshot.queryParamMap.get('objectID');
    if (!objectID) {
      throw new Error('objectID is required');
    }

    this.replaceWidgets(objectID);
  }

  replaceWidgets(objectID: string) {
    if (this.objectID === objectID) {
      return;
    }
    this.objectID = objectID;
    this.InstantSearchService.removeWidgets(this.widgets);
    this.widgets = [
      connectConfigure(() => {})({
        searchParameters: {
          filters: `objectID:${objectID}`,
        } as PlainSearchParameters,
      }),
      connectHits(({ items }) => {
        this.hit = items[0];
      })({}),
      connectRelatedProducts(({ items }) => {
        this.relatedItems = items;
      })({ objectIDs: [objectID] }),
    ];
    this.InstantSearchService.addWidgets(this.widgets);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.replaceWidgets(params.objectID);
    });
  }

  ngAfterContentInit() {
    this.InstantSearchService.start();
  }

  ngOnDestroy() {
    this.InstantSearchService.dispose();
  }
}
