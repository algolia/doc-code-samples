//
//  SearchAppApp.swift
//  SearchApp
//
//  Created by Algolia on 01/08/2025.
//

import SwiftUI

@main
struct SearchAppApp: App {
    private var algoliaController = AlgoliaController()
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                ContentView(searchBoxController: algoliaController.searchBoxController,
                            hitsController: algoliaController.hitsController,
                            statsController: algoliaController.statsController,
                            facetListController: algoliaController.facetListController)
            }
            .onAppear {
                algoliaController.searcher.search()
            }
        }
    }
}
