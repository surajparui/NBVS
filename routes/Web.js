const express = require('express');
const audioController = require('../src/Controllers/audioController');
const authController = require('../src/Controllers/authController');
const homeController = require('../src/Controllers/homeControllers');
const otpController = require('../src/Controllers/otpController');
const router = express.Router();
router.get('/',homeController().index);
router.get('/index',homeController().index);
router.get('/about',homeController().about);
router.get('/projects',homeController().projects);
router.get('/work',homeController().work);
router.get('/contact',homeController().contact);
router.get('/favourites',homeController().favourites);
router.get('/nft',homeController().nft);
// Here is our Auth Router
router.post('/signup',authController().signup);
router.post('/login',authController().login);
router.get('/otp',otpController().otp);
router.post('/verify',otpController().verifyOtp);
router.get('/register',homeController().register);
router.get('/login',homeController().login);
// Here is the route for the API
router.get('/audio',audioController().music);
module.exports = router;