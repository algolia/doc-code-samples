import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { history as historyRouter } from "instantsearch.js/es/lib/routers";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
    constructor(
        private route: ActivatedRoute,
    ) {

    }
  config = {
    appId: "B1G2GM9NG0",
    apiKey: "aadef574be1f9252bb48d4ea09b5cfe5",
    indexName: "demo_ecommerce",
    routing: {
      router: historyRouter({
        windowTitle(routeState) {
          return `Website / Find ${routeState.q} in ${
            routeState.brands
          } brands`;
        },
        createURL({ routeState, location }) {
          let baseUrl = location.href.split(/\/search\/?/)[0];
          if (
            !routeState.q &&
            routeState.brands === "all" &&
            routeState.p === 1
          )
            return baseUrl;
          if (baseUrl[baseUrl.length - 1] !== "/") baseUrl += "/";
          let routeStateArray = [
            "q",
            encodeURIComponent(routeState.q),
            "brands",
            encodeURIComponent(routeState.brands),
            "p",
            routeState.p
          ];
          // console.log('>>>>>>>>', `${baseUrl}search/${routeStateArray.join("/")}`)

          return `${baseUrl}search/${routeStateArray.join("/")}`;
        },
        parseURL({ location }) {
          let routeStateString = location.href.split(/\/search\/?/)[1];
          if (routeStateString === undefined) return {};
          const routeStateValues = routeStateString.match(
            /^q\/(.*?)\/brands\/(.*?)\/p\/(.*?)$/
          );
          return {
            q: decodeURIComponent(routeStateValues[1]),
            brands: decodeURIComponent(routeStateValues[2]),
            p: routeStateValues[3]
          };
        }
      }),
      stateMapping: {
        stateToRoute(uiState) {
          return {
            q: uiState.query || "",
            brands:
              (uiState.refinementList &&
                uiState.refinementList.brand &&
                uiState.refinementList.brand.join("~")) ||
              "all",
            p: uiState.page || 1
          };
        },
        routeToState(routeState) {
          if (routeState.brands === "all") routeState.brands = undefined;

          return {
            query: routeState.q,
            refinementList: {
              brand: routeState.brands && routeState.brands.split("~")
            },
            page: routeState.p
          };
        }
      }
    }
  };
  ngOnInit() {
    console.log('>>>>>>>>>>>>>>>>>>>')
    //   window.paramMap  = this.route.paramMap
    // window.route  = this.route
    console.log(this.route.snapshot.paramMap)

    console.log('>>>>>>>>>>>>>>>>>>>')
    // this.hero$ = this.route.paramMap.pipe(
    //     switchMap((params: ParamMap) =>
    //         this.service.getHero(params.get('id')))
    // );
  }
}
