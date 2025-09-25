package com.sypay.wallet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.sypay.wallet.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Set the title for the action bar
        supportActionBar?.title = "Login"

        // Handle click on the "Sign Up" text
        binding.textViewGoToRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        // Handle click on the login button
        binding.buttonLogin.setOnClickListener {
            // TODO: Implement login logic
            // 1. Get email and password from EditTexts
            // 2. Validate input
            // 3. Call the login API
            // 4. On success, navigate to the main wallet screen
        }
    }
}