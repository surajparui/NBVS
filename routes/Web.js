const express = require('express');
const authController = require('../src/Controllers/authController');
const homepage = require('../src/Controllers/homeControllers');
const router = express.Router();
router.get('/',homepage().index);
router.get('/about',homepage().about);
router.get('/projects',homepage().projects);
router.get('/work',homepage().work);
router.get('/contact',homepage().contact);

// Here is our Auth Router
router.post('/signup',authController().signup);
router.post('/login',authController().login);
module.exports = router;