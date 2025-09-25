package com.sypay.wallet

import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.widget.Toast
import com.sypay.wallet.databinding.ActivityKycBinding

class KycActivity : AppCompatActivity() {

    private lateinit var binding: ActivityKycBinding
    private var idCardUri: Uri? = null
    private var selfieUri: Uri? = null

    companion object {
        private const val ID_CARD_REQUEST_CODE = 100
        private const val SELFIE_REQUEST_CODE = 101
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityKycBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.title = "Identity Verification"

        binding.buttonUploadId.setOnClickListener {
            openFileChooser(ID_CARD_REQUEST_CODE)
        }

        binding.buttonUploadSelfie.setOnClickListener {
            openFileChooser(SELFIE_REQUEST_CODE)
        }

        binding.buttonSubmitKyc.setOnClickListener {
            if (idCardUri == null || selfieUri == null) {
                Toast.makeText(this, "Please select both documents", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // TODO: Implement the actual API call to register the user
            // 1. Get user data from the intent extras
            // 2. Create multipart request body with user data and files (idCardUri, selfieUri)
            // 3. Use Retrofit to send the request to the backend
            // 4. On success, show a "Pending approval" message and navigate to login
            // 5. On failure, show an error message

            Toast.makeText(this, "Submitting for review...", Toast.LENGTH_LONG).show()
        }
    }

    private fun openFileChooser(requestCode: Int) {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "image/*"
        startActivityForResult(intent, requestCode)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && data != null && data.data != null) {
            when (requestCode) {
                ID_CARD_REQUEST_CODE -> {
                    idCardUri = data.data
                    binding.textViewIdStatus.text = "ID Card selected"
                }
                SELFIE_REQUEST_CODE -> {
                    selfieUri = data.data
                    binding.textViewSelfieStatus.text = "Selfie selected"
                }
            }
        }
    }
}