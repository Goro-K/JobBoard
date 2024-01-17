
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authentification = require('../middleware/auth')

// Define routes and link them to controller functions
router.post('/signupCompany', companyController.signupCompany);
router.post('/loginCompany', companyController.loginCompany)
router.get('/company', authentification, companyController.getOneCompany)
// Add more routes as needed
module.exports = router;