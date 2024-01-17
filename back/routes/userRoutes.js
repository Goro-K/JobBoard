// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentification = require('../middleware/auth')

// Define routes and link them to controller functions
router.post('/signupUser', userController.signupUser);
router.post('/loginUser', userController.loginUser)
router.get('/user', authentification, userController.getOneUser)
// Add more routes as needed
module.exports = router;