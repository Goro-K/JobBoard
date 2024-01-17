// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementControl');
const authentification = require('../middleware/auth')

// Define routes and link them to controller functions
router.get('/advertisement', advertisementController.getAllAdvertisements);
router.post('/advertisement', authentification, advertisementController.postAdvertisement);

module.exports = router;