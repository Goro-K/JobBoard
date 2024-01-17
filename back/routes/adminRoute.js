const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/getUser', adminController.getUser)

router.get('/getCompanies', adminController.getCompanies);



module.exports = router