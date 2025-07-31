package com.example.searchApp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.example.searchApp.ui.theme.SearchAppTheme

class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SearchAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Search(
                        modifier = Modifier.padding(innerPadding),
                        searchBoxState = viewModel.searchBoxState,
                        paginator = viewModel.hitsPaginator,
                        statsText = viewModel.statsText,
                        facetList = viewModel.facetList,
                    )
                }
            }
        }
    }
}
