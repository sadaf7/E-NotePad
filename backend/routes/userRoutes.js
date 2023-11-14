const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const router = express.Router();

// ROUTE:1 -- creating users
router.route('/').post(registerUser)

// ROUTE:2 -- login
router.route('/login').post(authUser)


module.exports = router;