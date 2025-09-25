const db = require('./db.config');
const bcrypt = require('bcrypt');

// Function to handle user registration
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, residentialAddress } = req.body;
    const { idCard, selfie } = req.files;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !password || !residentialAddress || !idCard || !selfie) {
      return res.status(400).json({ message: 'All fields and documents are required.' });
    }

    // Check if user already exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database (status: pending)
    const newUser = await db.query(
      `INSERT INTO users (full_name, email, phone_number, password_hash, residential_address, kyc_status, id_card_path, selfie_path)
       VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7) RETURNING id, email`,
      [fullName, email, phoneNumber, hashedPassword, residentialAddress, idCard[0].path, selfie[0].path]
    );

    res.status(201).json({
      message: 'Registration request submitted successfully. Awaiting admin approval.',
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

const cryptoApiService = require('./cryptoApi.service');

// Function to approve a user registration request
const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Update user status to 'active' in the database
    const updatedUser = await db.query(
      "UPDATE users SET kyc_status = 'approved' WHERE id = $1 RETURNING id, email",
      [userId]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 2. Generate crypto addresses for the user
    // 2. Generate crypto addresses for the user
    const btcAddress = await cryptoApiService.generateNewAddress('bitcoin', 'testnet');
    const ethAddress = await cryptoApiService.generateNewAddress('ethereum', 'goerli');
    // For USDT (TRC20), we'd use the Tron network
    const usdtTrc20Address = await cryptoApiService.generateNewAddress('tron', 'nile');

    // 3. Save the generated addresses to the database
    // This assumes a table `user_wallets` exists with `user_id`, `blockchain`, `address`.
    await db.query(
      'INSERT INTO user_wallets (user_id, blockchain, address) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7)',
      [userId, 'BTC', btcAddress, 'ETH', ethAddress, 'USDT_TRC20', usdtTrc20Address]
    );

    res.status(200).json({ message: 'User approved and wallets created successfully.' });

  } catch (error) {
    console.error('User Approval Error:', error);
    res.status(500).json({ message: 'Server error during user approval.' });
  }
};


// Function to get all users with pending KYC status
const getPendingUsers = async (req, res) => {
  try {
    // Note: The real table would need a creation timestamp. Assuming it exists.
    const pendingUsers = await db.query("SELECT id, full_name, email, kyc_status, TO_CHAR(created_at, 'YYYY-MM-DD') as date, id_card_path, selfie_path FROM users WHERE kyc_status = 'pending' ORDER BY created_at DESC");
    res.status(200).json(pendingUsers.rows);
  } catch (error) {
    console.error('Error fetching pending users:', error);
    res.status(500).json({ message: 'Server error while fetching pending users.' });
  }
};

// Function to reject a user registration request
const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await db.query(
      "UPDATE users SET kyc_status = 'rejected' WHERE id = $1 RETURNING id",
      [userId]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Optional: Add logic to notify the user about the rejection.
    res.status(200).json({ message: 'User rejected successfully.' });

  } catch (error) {
    console.error('User Rejection Error:', error);
    res.status(500).json({ message: 'Server error during user rejection.' });
  }
};

module.exports = {
  registerUser,
  approveUser,
  getPendingUsers,
  rejectUser,
};