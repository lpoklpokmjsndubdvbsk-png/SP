package com.sypay.wallet

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.sypay.wallet.databinding.ActivityWalletBinding

class WalletActivity : AppCompatActivity() {

    private lateinit var binding: ActivityWalletBinding
    // In a real app, you would have a proper adapter and data model
    // private lateinit var assetAdapter: AssetAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWalletBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.title = "My Wallet"

        setupRecyclerView()
        loadDummyData()
    }

    private fun setupRecyclerView() {
        binding.recyclerViewAssets.layoutManager = LinearLayoutManager(this)
        // TODO: Initialize and set a real adapter
        // assetAdapter = AssetAdapter(emptyList())
        // binding.recyclerViewAssets.adapter = assetAdapter
    }

    private fun loadDummyData() {
        // TODO: Fetch real asset data from the API
        // For now, we are just showing the designed layout.
        // In a real implementation, you would update the adapter with real data here.
    }
}