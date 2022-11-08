import { Component, Inject, forwardRef, Optional } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex,
} from 'angular-instantsearch';
import connectGeoSearch, {
  GeoSearchConnectorParams,
  GeoSearchWidgetDescription,
} from 'instantsearch.js/es/connectors/geo-search/connectGeoSearch';

@Component({
  selector: 'ais-geo-search',
  template: `
    <google-map [center]="center" [zoom]="7" width="100%">
      <map-marker
        *ngFor="let item of state.items"
        [position]="item._geoloc"
      ></map-marker>
    </google-map>
  `,
})
export class GeoSearchComponent extends TypedBaseWidget<
  GeoSearchWidgetDescription,
  GeoSearchConnectorParams
> {
  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('GeoSearch');
  }

  public state: GeoSearchWidgetDescription['renderState'] = {
    items: [],
  } as any;

  public ngOnInit() {
    this.createWidget(connectGeoSearch, {});
    super.ngOnInit();
  }

  get center() {
    if (this.state.items && this.state.items.length > 0) {
      const [first] = this.state.items;
      return first._geoloc || { lat: 0, lng: 0 };
    }
    return { lat: 0, lng: 0 };
  }
}
