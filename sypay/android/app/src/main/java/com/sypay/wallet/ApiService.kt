package com.sypay.wallet

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {

    @Multipart
    @POST("/api/users/register")
    suspend fun registerUser(
        @Part("fullName") fullName: RequestBody,
        @Part("email") email: RequestBody,
        @Part("phoneNumber") phoneNumber: RequestBody,
        @Part("password") password: RequestBody,
        @Part("residentialAddress") residentialAddress: RequestBody,
        @Part idCard: MultipartBody.Part,
        @Part selfie: MultipartBody.Part
    ): Response<Unit> // Assuming the server returns a simple success/fail response
}