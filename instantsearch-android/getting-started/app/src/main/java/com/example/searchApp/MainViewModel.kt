package com.example.searchApp

import androidx.lifecycle.ViewModel
import androidx.paging.PagingConfig
import com.algolia.instantsearch.android.paging3.Paginator
import com.algolia.instantsearch.android.paging3.facet.connectPaginator
import com.algolia.instantsearch.android.paging3.searchbox.connectPaginator
import com.algolia.instantsearch.compose.filter.facet.FacetListState
import com.algolia.instantsearch.compose.item.StatsTextState
import com.algolia.instantsearch.compose.searchbox.SearchBoxState
import com.algolia.instantsearch.core.connection.ConnectionHandler
import com.algolia.instantsearch.core.selectable.list.SelectionMode
import com.algolia.instantsearch.filter.facet.FacetListConnector
import com.algolia.instantsearch.filter.facet.connectView
import com.algolia.instantsearch.filter.state.FilterState
import com.algolia.instantsearch.searchbox.SearchBoxConnector
import com.algolia.instantsearch.searchbox.connectView
import com.algolia.instantsearch.searcher.connectFilterState
import com.algolia.instantsearch.searcher.facets.FacetsSearcher
import com.algolia.instantsearch.searcher.hits.HitsSearcher

import com.algolia.instantsearch.stats.DefaultStatsPresenter
import com.algolia.instantsearch.stats.StatsConnector
import com.algolia.instantsearch.stats.connectView
import com.algolia.search.client.ClientSearch
import com.algolia.search.logging.LogLevel
import com.algolia.search.model.APIKey
import com.algolia.search.model.ApplicationID
import com.algolia.search.model.Attribute
import com.algolia.search.model.IndexName

class MainViewModel: ViewModel() {
    private val client = ClientSearch(
        ApplicationID("latency"),
        APIKey("1f6fd3a6fb973cb08419fe7d288fa4db"),
        LogLevel.All
    )
    private val indexName = IndexName("instant_search")
    private val searcher = HitsSearcher(client, indexName)

    // Search Box
    val searchBoxState = SearchBoxState()
    private val searchBoxConnector = SearchBoxConnector(searcher)

    // Hits
    val hitsPaginator = Paginator(
        searcher,
        PagingConfig(pageSize = 50, initialLoadSize = 50)
    ) { it.deserialize(Product.serializer()) }

    // Stats
    val statsText = StatsTextState()
    private val statsConnector = StatsConnector(searcher)

    // Filters
    val facetList = FacetListState()
    private val filterState = FilterState()
    private val categories = Attribute("categories")
    private val searcherForFacet = FacetsSearcher(client, indexName, categories)
    private val facetListConnector = FacetListConnector(
        searcher = searcherForFacet,
        filterState = filterState,
        attribute = categories,
        selectionMode = SelectionMode.Multiple
    )

    private val connections = ConnectionHandler(searchBoxConnector, statsConnector, facetListConnector)

    init {
        connections += searchBoxConnector.connectView(searchBoxState)
        connections += statsConnector.connectView(statsText, DefaultStatsPresenter())
        connections += searcher.connectFilterState(filterState)
        connections += facetListConnector.connectView(facetList)
        connections += facetListConnector.connectPaginator(hitsPaginator)
        connections += searchBoxConnector.connectPaginator(hitsPaginator)

        searcherForFacet.query.maxFacetHits = 100
        searcherForFacet.searchAsync()
    }

    override fun onCleared() {
        super.onCleared()
        searcher.cancel()
        connections.clear()
        searcherForFacet.cancel()
    }
}