import { Component, Inject, forwardRef, ViewChild } from "@angular/core";
import { BaseWidget, NgAisInstantSearch } from "angular-instantsearch";
import { connectGeoSearch } from "instantsearch.js/es/connectors";
import {} from "@types/googlemaps";

@Component({
  selector: "ais-geo-hits",
  template: '<div #mapInner id="mapInner"></div>'
})
export class GeoHits extends BaseWidget {
  @ViewChild("mapInner") mapElement: any;
  map: google.maps.Map;

  state: { items: any };
  markers = [];
  infoWindows = [];

  updateState = state => this.updateMarkers(state.items);

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super("GeoHits");
  }

  public ngOnInit() {
    this.createWidget(connectGeoSearch);
    super.ngOnInit();
  }

  public ngOnDestroy() {
    this.removeMarkersFromMap();
  }

  private updateMarkers(items) {
    this.markers = [];

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      streetViewControl: false,
      mapTypeControl: false,
      zoom: 4,
      minZoom: 3,
      maxZoom: 7,
      styles: [{ stylers: [{ hue: "#3596D2" }] }]
    });

    items.forEach(hit => {
      const marker = new google.maps.Marker({
        position: { lat: hit._geoloc.lat, lng: hit._geoloc.lng },
        map: this.map
      });

      this.markers.push(marker);
      this.attachInfoWindow(marker, hit);
    });

    this.fitMapToMarkers();
  }

  private attachInfoWindow(marker, hit) {
    const infowindow = new google.maps.InfoWindow({
      content: `${hit.name} - ${hit.name === hit.city ? "" : `${hit.city}, `}${
        hit.country
      }<br>${hit.nb_airline_liaisons} liaisons`
    });

    this.infoWindows.push(infowindow);

    marker.addListener("click", () => {
      this.infoWindows.forEach(infowindow => infowindow.close());
      infowindow.open(this.map, marker);
    });
  }

  private removeMarkersFromMap() {
    this.markers.forEach(marker => marker.setMap(null));
  }

  private fitMapToMarkers() {
    const mapBounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => mapBounds.extend(marker.getPosition()));
    this.map.fitBounds(mapBounds);
  }
}
