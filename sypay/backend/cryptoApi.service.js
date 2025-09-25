const axios = require('axios');
require('dotenv').config();

const CRYPTOAPIS_API_KEY = process.env.CRYPTOAPIS_API_KEY;
const API_BASE_URL = 'https://rest.cryptoapis.io/v2';

/**
 * Generates a new receiving address for a specified blockchain and network.
 * This is a placeholder function. The actual endpoint and payload will depend on
 * the specifics of the "Derive And Sync New Receiving Addresses" endpoint.
 *
 * @param {string} blockchain - e.g., 'bitcoin', 'ethereum'.
 * @param {string} network - e.g., 'mainnet', 'testnet'.
 * @returns {Promise<string>} - The newly generated address.
 */
const generateNewAddress = async (blockchain, network) => {
  // This endpoint is based on the "Derive And Sync New Receiving Addresses" functionality.
  // The actual walletId must be created in your CryptoAPIs account and stored as an environment variable.
  const walletId = process.env.CRYPTOAPIS_HD_WALLET_ID;
  if (!walletId) {
    throw new Error('CRYPTOAPIS_HD_WALLET_ID is not set in environment variables.');
  }

  const endpoint = `/wallet-as-a-service/wallets/${walletId}/${blockchain}/${network}/addresses`;
  const url = `${API_BASE_URL}${endpoint}`;

  // The label is a user-friendly name for the address, e.g., the user's ID or email.
  const payload = {
    data: {
      item: {
        label: `user_${Date.now()}` // A unique label is often required.
      }
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CRYPTOAPIS_API_KEY
      }
    });

    // The actual path to the address in the response might differ.
    const address = response.data.data.item.address;
    console.log(`Successfully generated new address: ${address} for ${blockchain}`);
    return address;

  } catch (error) {
    console.error(`Error generating address from CryptoAPIs for ${blockchain}:`, error.response ? error.response.data : error.message);
    throw new Error('Failed to generate crypto address.');
  }
};

module.exports = {
  generateNewAddress,
};