-- This script initializes the database schema for the Sypay application.
-- It's designed for PostgreSQL.

-- Drop tables if they exist to ensure a clean setup
DROP TABLE IF EXISTS user_wallets;
DROP TABLE IF EXISTS users;

-- Create the users table
-- This table stores user information and their KYC status.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    residential_address TEXT NOT NULL,
    kyc_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- e.g., pending, approved, rejected
    id_card_path VARCHAR(255),
    selfie_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_wallets table
-- This table stores the cryptocurrency addresses for each user.
CREATE TABLE user_wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blockchain VARCHAR(50) NOT NULL, -- e.g., BTC, ETH, USDT_TRC20
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blockchain) -- Ensures a user has only one address per blockchain
);

-- Optional: Create an index for faster lookups on user_id in the wallets table
CREATE INDEX idx_user_wallets_user_id ON user_wallets(user_id);

-- Optional: Create an index for faster lookups on email in the users table
CREATE INDEX idx_users_email ON users(email);

-- A simple trigger to update the 'updated_at' timestamp on any change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();