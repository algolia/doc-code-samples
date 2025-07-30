package com.example.searchApp

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListState
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.paging.compose.LazyPagingItems
import androidx.paging.compose.collectAsLazyPagingItems
import com.algolia.instantsearch.android.paging3.Paginator
import com.algolia.instantsearch.android.paging3.flow
import com.algolia.instantsearch.compose.filter.facet.FacetListState
import com.algolia.instantsearch.compose.highlighting.toAnnotatedString
import com.algolia.instantsearch.compose.item.StatsState
import com.algolia.instantsearch.compose.searchbox.SearchBoxState
import com.algolia.instantsearch.core.selectable.list.SelectableItem
import com.algolia.search.model.search.Facet
import kotlinx.coroutines.launch

@Composable
fun ProductsList(
    modifier: Modifier = Modifier,
    pagingHits: LazyPagingItems<Product>,
    listState: LazyListState
) {
    LazyColumn(modifier, listState) {
        items(count = pagingHits.itemCount, key = {
            index -> pagingHits[index]?.objectID?.raw ?: index
        }) { index ->
            val item = pagingHits[index] ?: return@items

            TextAnnotated(
                modifier = modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                annotatedString = item.highlightedName?.toAnnotatedString(),
                default = item.name,
                style = MaterialTheme.typography.bodyLarge
            )
            HorizontalDivider(
                modifier = modifier
                    .fillMaxWidth()
                    .width(1.dp)
            )
        }
    }
}

@Composable
fun TextAnnotated(
    modifier: Modifier,
    annotatedString: AnnotatedString?,
    default: String,
    style: TextStyle
) {
    if (annotatedString != null) {
        Text(modifier = modifier, text = annotatedString, style = style)
    } else {
        Text(modifier = modifier, text = default, style = style)
    }
}

@Composable
fun SearchBox(
    modifier: Modifier = Modifier,
    searchBoxState: SearchBoxState = SearchBoxState(),
    onValueChange: (String) -> Unit = {}
) {
    TextField(
        modifier = modifier.padding(bottom = 12.dp),
        singleLine = true,
        value = searchBoxState.query,
        onValueChange = {
            searchBoxState.setText(it)
            onValueChange(it)
        },
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
        keyboardActions = KeyboardActions(
            onSearch = { searchBoxState.setText(searchBoxState.query, true) }
        )
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Search(
    modifier: Modifier = Modifier,
    searchBoxState: SearchBoxState,
    paginator: Paginator<Product>,
    statsText: StatsState<String>,
    facetList: FacetListState,
) {
    val scope = rememberCoroutineScope()
    val pagingHits = paginator.flow.collectAsLazyPagingItems()
    val listState = rememberLazyListState()
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    var showSheet by remember { mutableStateOf(false) }

    if (showSheet) {
        ModalBottomSheet(
            onDismissRequest = {
                scope.launch {
                    sheetState.hide()
                    showSheet = false
                }
            },
            sheetState = sheetState
        ) {
            FacetList(facetList = facetList)
        }
    }

    Column(modifier) {
        Row(Modifier.fillMaxWidth()) {
            SearchBox(
                modifier = Modifier
                    .weight(1f)
                    .padding(top = 12.dp, start = 12.dp),
                searchBoxState = searchBoxState,
                onValueChange = { scope.launch { listState.scrollToItem(0) }}
            )
            Card(Modifier.padding(top = 12.dp, end = 12.dp, start = 8.dp)) {
                Icon(
                    modifier = Modifier
                        .clickable {
                            showSheet = true
                            scope.launch { sheetState.show() }
                        }
                        .padding(horizontal = 12.dp)
                        .height(56.dp),
                    imageVector = Icons.Default.FilterList,
                    contentDescription = null
                )
            }
        }
        Stats(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp, start = 12.dp, end = 12.dp),
            stats = statsText.stats
        )
        ProductsList(
            modifier = Modifier.fillMaxSize(),
            pagingHits = pagingHits,
            listState = listState
        )
    }
}

@Composable
fun Stats(modifier: Modifier = Modifier, stats: String) {
    Text(
        modifier = modifier,
        text = stats,
        style = MaterialTheme.typography.bodySmall,
        maxLines = 1
    )
}

@Composable
fun FacetRow(
    modifier: Modifier = Modifier,
    selectableFacet: SelectableItem<Facet>
) {
    val (facet, isSelected) = selectableFacet
    Row(
        modifier = modifier.height(56.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(modifier = Modifier.weight(1f)) {
            Text(
                modifier = Modifier.alignByBaseline(),
                text = facet.value,
                style = MaterialTheme.typography.bodyLarge
            )
            Text(
                modifier = Modifier
                    .padding(start = 8.dp)
                    .alignByBaseline(),
                text = facet.count.toString(),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.2f)
            )
        }
        if (isSelected) {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
            )
        }
    }
}

@Composable
fun FacetList(
    modifier: Modifier = Modifier,
    facetList: FacetListState
) {
    Column(modifier) {
        Text(
            text = "Categories",
            style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(14.dp)
        )
        LazyColumn(Modifier.background(MaterialTheme.colorScheme.background)) {
            items(count = facetList.items.count(), key = {
                    index -> facetList.items[index].first.value
            }) { index ->
                val item = facetList.items[index]
                FacetRow(
                    modifier = Modifier
                        .clickable { facetList.onSelection?.invoke(item.first) }
                        .padding(horizontal = 14.dp),
                    selectableFacet = item,
                )
                HorizontalDivider(
                    modifier = Modifier
                        .fillMaxWidth()
                        .width(1.dp)
                )
            }
        }
    }
}
