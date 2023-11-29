const express = require('express');
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// ROUTE:1 -- creating users
router.route('/').post(registerUser)

// ROUTE:2 -- login
router.route('/login').post(authUser)

// ROUTE:3 -- profile
router.route('/profile').post(protect,updateUserProfile)


module.exports = router;