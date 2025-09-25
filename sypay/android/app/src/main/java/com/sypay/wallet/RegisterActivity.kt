package com.sypay.wallet

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.sypay.wallet.databinding.ActivityRegisterBinding

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.title = "Create Account"

        // Handle click on the "Login" text
        binding.textViewGoToLogin.setOnClickListener {
            finish() // Go back to the previous activity (Login)
        }

        // Handle click on the "Continue" button
        binding.buttonRegister.setOnClickListener {
            // TODO: Validate user input first

            val intent = Intent(this, KycActivity::class.java).apply {
                // Pass user data to the KYC activity
                putExtra("fullName", binding.editTextFullName.text.toString())
                putExtra("email", binding.editTextEmailRegister.text.toString())
                putExtra("phone", binding.editTextPhone.text.toString())
                putExtra("password", binding.editTextPasswordRegister.text.toString())
                putExtra("address", binding.editTextAddress.text.toString())
            }
            startActivity(intent)
        }
    }
}