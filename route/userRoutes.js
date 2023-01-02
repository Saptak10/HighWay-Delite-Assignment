const express = require('express')
const router = express.Router();

const { registerUser, getRegisteredUser, loginUser } = require('../controller/userController')

const protect = require('../middleware/authMiddleware')

router.route('/register')
    .post(registerUser)
    .get(protect, getRegisteredUser)
    
router.post('/login', loginUser)

module.exports = router;