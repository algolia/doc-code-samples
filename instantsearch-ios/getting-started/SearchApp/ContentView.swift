//
//  ContentView.swift
//  SearchApp
//
//  Created by Algolia on 01/08/2025.
//

import InstantSearchCore
import InstantSearchSwiftUI
import SwiftUI

struct Product: Codable {
    let name: String
}

class AlgoliaController {
    let searcher: HitsSearcher
    
    let searchBoxInteractor: SearchBoxInteractor
    let searchBoxController: SearchBoxObservableController
    
    let hitsInteractor: HitsInteractor<Product>
    let hitsController: HitsObservableController<Product>
    
    let statsInteractor: StatsInteractor
    let statsController: StatsTextObservableController
    
    let filterState: FilterState

    let facetListInteractor: FacetListInteractor
    let facetListController: FacetListObservableController
    
    init() {
        self.searcher = HitsSearcher(appID: "latency",
                                     apiKey: "1f6fd3a6fb973cb08419fe7d288fa4db",
                                     indexName: "bestbuy")
        self.searchBoxInteractor = .init()
        self.searchBoxController = .init()
        self.hitsInteractor = .init()
        self.hitsController = .init()
        self.statsInteractor = .init()
        self.statsController = .init()
        self.filterState = .init()
        self.facetListInteractor = .init()
        self.facetListController = .init()

        setupConnections()
    }
    
    func setupConnections() {
        searchBoxInteractor.connectSearcher(searcher)
        searchBoxInteractor.connectController(searchBoxController)
        hitsInteractor.connectSearcher(searcher)
        hitsInteractor.connectController(hitsController)
        statsInteractor.connectSearcher(searcher)
        statsInteractor.connectController(statsController)
        searcher.connectFilterState(filterState)
        facetListInteractor.connectSearcher(searcher, with: "manufacturer")
        facetListInteractor.connectFilterState(filterState, with: "manufacturer", operator: .or)
        facetListInteractor.connectController(facetListController, with: FacetListPresenter(sortBy: [.isRefined, .count(order: .descending)]))
    }
}

struct ContentView: View {
    @ObservedObject var searchBoxController: SearchBoxObservableController
    @ObservedObject var hitsController: HitsObservableController<Product>
    @ObservedObject var statsController: StatsTextObservableController
    @ObservedObject var facetListController: FacetListObservableController
    
    @State private var isEditing = false
    @State private var isPresentingFacets = false
    
    var body: some View {
        VStack(spacing: 7) {
            Text(statsController.stats)
                .fontWeight(.medium)
            HitsList(hitsController) { hit, _ in
                VStack(alignment: .leading, spacing: 10) {
                    Text(hit?.name ?? "")
                        .padding(.all, 10)
                    Divider()
                }
            } noResults: {
                Text("No Results")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .padding(.horizontal)
        .padding(.top, 10)
        .searchable(text: $searchBoxController.query)
        .navigationBarTitle("Algolia & SwiftUI")
        .navigationBarItems(trailing: facetsButton())
        .sheet(isPresented: $isPresentingFacets, content: facets)
    }
    
    @ViewBuilder
    private func facets() -> some View {
        NavigationView {
            ScrollView {
                FacetList(facetListController) { facet, isSelected in
                    VStack {
                        FacetRow(facet: facet, isSelected: isSelected)
                            .padding()
                        Divider()
                    }
                } noResults: {
                    Text("No facet found")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
            }
            .navigationBarTitle("Brand")
        }
    }
    
    private func facetsButton() -> some View {
        Button(action: {
            isPresentingFacets.toggle()
        }, label: {
            Image(systemName: "line.horizontal.3.decrease.circle")
                .font(.title)
        })
    }
    
    
}

struct ContentView_Previews: PreviewProvider {
    static let algoliaController = AlgoliaController()
    static var previews: some View {
        NavigationView {
            ContentView(searchBoxController: algoliaController.searchBoxController,
                        hitsController: algoliaController.hitsController,
                        statsController: algoliaController.statsController,
                        facetListController: algoliaController.facetListController)
        }.onAppear {
            algoliaController.searcher.search()
        }
    }
}
