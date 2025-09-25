const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerUser, approveUser, getPendingUsers, rejectUser } = require('./user.controller');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Due to environment limitations, we save to a top-level 'uploads' directory
    // In a real setup, this would be 'sypay/backend/uploads'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Define the registration route
// It expects form-data with fields for user info and two files: 'idCard' and 'selfie'
router.post(
  '/register',
  upload.fields([{ name: 'idCard', maxCount: 1 }, { name: 'selfie', maxCount: 1 }]),
  registerUser
);

// Define the user approval route
router.put('/approve/:userId', approveUser);

// Define the route to get pending users
router.get('/pending', getPendingUsers);

// Define the user rejection route
router.put('/reject/:userId', rejectUser);

module.exports = router;