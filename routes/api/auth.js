const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../../controllers/api/authControllerApi');

router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/facebook_token', passport.authenticate('facebook-token'), authController.authFacebookToken);

module.exports = router;